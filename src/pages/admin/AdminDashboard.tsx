import React, { useState, useEffect } from 'react';
import {
  Users,
  Eye,
  Inbox,
  Clock,
  Search,
  Download,
  Trash2,
  Mail,
  MessageCircle,
  ExternalLink,
  LogOut,
  Sparkles,
  Settings,
  Layers,
  Calendar,
  Smartphone,
  Monitor,
  ShieldCheck,
  Check,
} from 'lucide-react';
import {
  subscribeToInquiries,
  updateInquiryStatus,
  deleteInquiry,
  createInquiry,
  type ClientInquiry,
  type InquiryStatus,
} from '../../services/inquiryService';
import {
  subscribeToVisitorMetrics,
  type VisitorMetrics,
} from '../../services/analyticsService';
import {
  logoutAdmin,
  updateAdminCredentials,
} from '../../services/adminAuthService';

interface AdminDashboardProps {
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<'inquiries' | 'analytics' | 'settings'>('inquiries');

  // Firestore real-time state
  const [inquiries, setInquiries] = useState<ClientInquiry[]>([]);
  const [metrics, setMetrics] = useState<VisitorMetrics>({
    totalVisits: 0,
    uniqueVisitors: 0,
    visitsByDate: {},
    pageCounts: {},
    deviceCounts: { desktop: 0, mobile: 0, tablet: 0 },
  });
  const [isFirestoreConnected, setIsFirestoreConnected] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState<ClientInquiry | null>(null);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  // Settings State
  const [announcementText, setAnnouncementText] = useState(
    () => localStorage.getItem('adgenx_announcement') || 'Your next digital idea starts here. Start a Project'
  );
  const [savedSettingsNotice, setSavedSettingsNotice] = useState(false);
  const [newAdminUser, setNewAdminUser] = useState('');
  const [newAdminPass, setNewAdminPass] = useState('');
  const [credUpdateMessage, setCredUpdateMessage] = useState('');

  // 1. Subscribe to Live Inquiries
  useEffect(() => {
    const unsubscribe = subscribeToInquiries(
      (data) => {
        setInquiries(data);
        setIsFirestoreConnected(true);
      },
      () => {
        setIsFirestoreConnected(false);
      }
    );
    return () => unsubscribe();
  }, []);

  // 2. Subscribe to Live Visitor Analytics
  useEffect(() => {
    const unsubscribe = subscribeToVisitorMetrics(
      (data) => {
        setMetrics(data);
      },
      () => {}
    );
    return () => unsubscribe();
  }, []);

  // Filtered Inquiries
  const filteredInquiries = inquiries.filter((inq) => {
    const matchesSearch =
      inq.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (inq.phone && inq.phone.includes(searchQuery)) ||
      inq.serviceCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (inq.message && inq.message.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === 'all' || inq.status === statusFilter;
    const matchesType = typeFilter === 'all' || inq.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const newInquiriesCount = inquiries.filter((i) => i.status === 'new').length;

  const handleStatusChange = async (id: string, newStatus: InquiryStatus) => {
    try {
      await updateInquiryStatus(id, newStatus);
      if (selectedInquiry && selectedInquiry.id === id) {
        setSelectedInquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
    } catch (err) {
      alert('Could not update status: ' + err);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this client inquiry?')) {
      try {
        await deleteInquiry(id);
        if (selectedInquiry?.id === id) {
          setSelectedInquiry(null);
        }
      } catch (err) {
        alert('Could not delete inquiry: ' + err);
      }
    }
  };

  const handleExportCsv = () => {
    if (inquiries.length === 0) {
      alert('No inquiries to export.');
      return;
    }
    const headers = [
      'ID',
      'Full Name',
      'Email',
      'Phone',
      'Business',
      'Service',
      'Type',
      'Budget',
      'Status',
      'Message',
      'Created At',
    ];
    const rows = inquiries.map((i) => [
      `"${i.id}"`,
      `"${i.fullName.replace(/"/g, '""')}"`,
      `"${i.email}"`,
      `"${i.phone || ''}"`,
      `"${(i.businessName || '').replace(/"/g, '""')}"`,
      `"${(i.serviceCategory || '').replace(/"/g, '""')}"`,
      `"${i.type}"`,
      `"${i.budget || ''}"`,
      `"${i.status}"`,
      `"${(i.message || '').replace(/"/g, '""')}"`,
      `"${i.createdAtIso || ''}"`,
    ]);
    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `adgenx_enquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSendTestInquiry = async () => {
    try {
      await createInquiry({
        fullName: 'Test Client (AdGenX System)',
        email: 'client.test@adgenx.agency',
        phone: '+91 98765 43210',
        businessName: 'NextGen Ventures',
        serviceCategory: 'Web & Mobile Applications',
        budget: '$5,000 - $10,000',
        timeline: '1-2 Months',
        message: 'This is an automatic test submission to verify live Firestore persistence and admin sync.',
        type: 'project',
      });
      alert('Test inquiry created in Firestore! Check the list below.');
    } catch (err) {
      alert('Error creating test inquiry: ' + err);
    }
  };

  const handleSaveSettings = () => {
    localStorage.setItem('adgenx_announcement', announcementText);
    setSavedSettingsNotice(true);
    setTimeout(() => setSavedSettingsNotice(false), 3000);
  };

  const handleUpdateCreds = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdminUser.trim() || !newAdminPass.trim()) {
      setCredUpdateMessage('Please specify both new username and password.');
      return;
    }
    setCredUpdateMessage('Updating credentials in Firestore...');
    const res = await updateAdminCredentials(newAdminUser, newAdminPass);
    if (res.success) {
      setCredUpdateMessage('Credentials saved to Firestore successfully! Use these credentials next time you log in.');
      setNewAdminUser('');
      setNewAdminPass('');
    } else {
      setCredUpdateMessage(res.error || 'Failed to update credentials in Firestore.');
    }
    setTimeout(() => setCredUpdateMessage(''), 5000);
  };

  return (
    <div className="min-h-screen bg-[#070914] text-white flex flex-col font-body selection:bg-brand-blue selection:text-white">
      {/* ============================================================== */}
      {/* 1. TOP NAV / ADMIN HEADER BAR                                  */}
      {/* ============================================================== */}
      <header className="sticky top-0 z-40 bg-[#090c20]/95 backdrop-blur-xl border-b border-white/[0.08] px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="relative w-10 h-10 rounded-full p-[2px] bg-gradient-to-tr from-brand-blue via-brand-violet to-brand-electric shadow-glow-sm">
            <img
              src="/adgenx-logo.png"
              alt="LetsGo AdGenX"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-base sm:text-lg text-white tracking-tight">
                LetsGo<span className="text-brand-electric">AdGenX</span>
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-brand-blue/20 text-brand-electric border border-brand-blue/30 font-semibold">
                Control Hub
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-brand-muted">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{isFirestoreConnected ? 'Firebase Firestore Live' : 'Connecting to Firestore...'}</span>
            </div>
          </div>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-heading font-medium text-brand-muted hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] transition-all"
          >
            <span>Live Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={() => {
              logoutAdmin();
              onLogout();
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-heading font-medium text-red-300 hover:text-white bg-red-500/10 hover:bg-red-500/20 border border-red-500/25 transition-all"
            title="Log out from Admin Dashboard"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* ============================================================== */}
      {/* 2. DASHBOARD BODY                                              */}
      {/* ============================================================== */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* Top Summary Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* Card 1: Total User Visits */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-[#0c102b] to-[#080b20] border border-cyan-400/20 shadow-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-heading font-semibold text-brand-muted uppercase tracking-wider">
                Total Page Visits
              </span>
              <div className="p-2 rounded-xl bg-cyan-400/15 text-brand-electric border border-cyan-400/25">
                <Eye className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-heading font-extrabold text-white tracking-tight">
                {metrics.totalVisits.toLocaleString()}
              </span>
              <span className="text-[11px] text-emerald-400 font-mono">Live Counter</span>
            </div>
            <p className="mt-1 text-xs text-brand-muted/80">Total views recorded across all pages</p>
          </div>

          {/* Card 2: Unique Visitors */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-[#0c102b] to-[#080b20] border border-brand-blue/20 shadow-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/10 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-heading font-semibold text-brand-muted uppercase tracking-wider">
                Unique Visitors
              </span>
              <div className="p-2 rounded-xl bg-brand-blue/15 text-sky-400 border border-brand-blue/25">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-heading font-extrabold text-white tracking-tight">
                {metrics.uniqueVisitors.toLocaleString()}
              </span>
              <span className="text-[11px] text-brand-lavender font-mono">Unique Devices</span>
            </div>
            <p className="mt-1 text-xs text-brand-muted/80">Tracked by unique browser sessions</p>
          </div>

          {/* Card 3: Total Inquiries */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-[#0c102b] to-[#080b20] border border-brand-violet/20 shadow-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-violet/10 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-heading font-semibold text-brand-muted uppercase tracking-wider">
                Total Enquiries
              </span>
              <div className="p-2 rounded-xl bg-brand-violet/15 text-brand-lavender border border-brand-violet/25">
                <Inbox className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-heading font-extrabold text-white tracking-tight">
                {inquiries.length}
              </span>
              <span className="text-[11px] text-cyan-300 font-mono">In Firestore</span>
            </div>
            <p className="mt-1 text-xs text-brand-muted/80">Client requests & photoshoot bookings</p>
          </div>

          {/* Card 4: New / Unread Inquiries */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-[#0c102b] to-[#080b20] border border-amber-500/25 shadow-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-heading font-semibold text-brand-muted uppercase tracking-wider">
                New Actionable
              </span>
              <div className="p-2 rounded-xl bg-amber-500/15 text-amber-300 border border-amber-500/30">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-heading font-extrabold text-amber-300 tracking-tight">
                {newInquiriesCount}
              </span>
              {newInquiriesCount > 0 ? (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-amber-500/20 text-amber-200 border border-amber-500/30 font-semibold animate-pulse">
                  Needs Review
                </span>
              ) : (
                <span className="text-[11px] text-brand-muted font-mono">Up to date</span>
              )}
            </div>
            <p className="mt-1 text-xs text-brand-muted/80">New client inquiries awaiting response</p>
          </div>
        </div>

        {/* Tab Selection Bar */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('inquiries')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-heading font-semibold transition-all ${
                activeTab === 'inquiries'
                  ? 'bg-brand-blue/20 text-white border border-brand-blue/40 shadow-sm'
                  : 'text-brand-muted hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              Client Enquiries ({inquiries.length})
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-heading font-semibold transition-all ${
                activeTab === 'analytics'
                  ? 'bg-brand-blue/20 text-white border border-brand-blue/40 shadow-sm'
                  : 'text-brand-muted hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              Traffic & Page Views
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-heading font-semibold transition-all ${
                activeTab === 'settings'
                  ? 'bg-brand-blue/20 text-white border border-brand-blue/40 shadow-sm'
                  : 'text-brand-muted hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              Web Control & Settings
            </button>
          </div>

          {activeTab === 'inquiries' && (
            <div className="flex items-center gap-2">
              <button
                onClick={handleSendTestInquiry}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-heading font-medium text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/25 transition-all"
                title="Create a sample test client inquiry in Firestore"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>+ Test Inquiry</span>
              </button>
              <button
                onClick={handleExportCsv}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-heading font-medium text-brand-muted hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] transition-all"
                title="Download enquiries as CSV spreadsheet"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Export CSV</span>
              </button>
            </div>
          )}
        </div>

        {/* ============================================================== */}
        {/* TAB 1: CLIENT ENQUIRIES TABLE & DETAILS                        */}
        {/* ============================================================== */}
        {activeTab === 'inquiries' && (
          <div className="space-y-4">
            {/* Search and Filter Row */}
            <div className="p-4 rounded-2xl bg-[#0a0d24]/80 border border-white/[0.08] flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
              {/* Search input */}
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-muted" />
                <input
                  type="text"
                  placeholder="Search inquiries..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.1] text-xs sm:text-sm text-white placeholder-brand-muted/50 focus:outline-none focus:border-brand-blue"
                />
              </div>

              {/* Status and Type filter pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.1] text-xs text-white focus:outline-none focus:border-brand-blue"
                >
                  <option value="all" className="bg-[#0b0e26]">All Statuses</option>
                  <option value="new" className="bg-[#0b0e26]">New (Unread)</option>
                  <option value="contacted" className="bg-[#0b0e26]">Contacted</option>
                  <option value="in_progress" className="bg-[#0b0e26]">In Progress</option>
                  <option value="completed" className="bg-[#0b0e26]">Completed</option>
                  <option value="archived" className="bg-[#0b0e26]">Archived</option>
                </select>

                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.1] text-xs text-white focus:outline-none focus:border-brand-blue"
                >
                  <option value="all" className="bg-[#0b0e26]">All Inquiry Types</option>
                  <option value="project" className="bg-[#0b0e26]">Digital Projects</option>
                  <option value="photography" className="bg-[#0b0e26]">Photography Bookings</option>
                </select>
              </div>
            </div>

            {/* Inquiries Table */}
            <div className="rounded-2xl bg-[#0a0d24]/90 border border-white/[0.08] overflow-hidden shadow-2xl">
              {filteredInquiries.length === 0 ? (
                <div className="p-12 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-white/[0.04] border border-white/[0.08] mx-auto flex items-center justify-center text-brand-muted">
                    <Inbox className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-heading font-semibold text-white">No inquiries found</h4>
                  <p className="text-xs text-brand-muted max-w-sm mx-auto">
                    {inquiries.length === 0
                      ? 'No client submissions stored in Firestore yet. Submit a form on /contact or click "+ Test Inquiry" above.'
                      : 'No inquiries match your active search or status filter.'}
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-white/[0.03] border-b border-white/[0.08] text-[11px] font-heading font-semibold text-brand-muted uppercase tracking-wider">
                      <tr>
                        <th className="py-3 px-4">Client</th>
                        <th className="py-3 px-4">Service & Budget</th>
                        <th className="py-3 px-4">Type</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4">Date</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.05]">
                      {filteredInquiries.map((inq) => {
                        const dateFormatted = inq.createdAtIso
                          ? new Date(inq.createdAtIso).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })
                          : 'Just now';

                        return (
                          <tr
                            key={inq.id}
                            className={`hover:bg-white/[0.03] transition-colors cursor-pointer ${
                              inq.status === 'new' ? 'bg-brand-blue/[0.04]' : ''
                            }`}
                            onClick={() => setSelectedInquiry(inq)}
                          >
                            <td className="py-3.5 px-4">
                              <div className="font-heading font-semibold text-white flex items-center gap-2">
                                <span>{inq.fullName}</span>
                                {inq.status === 'new' && (
                                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                                )}
                              </div>
                              <div className="text-xs text-brand-muted font-body mt-0.5">{inq.email}</div>
                              {inq.phone && (
                                <div className="text-[11px] text-brand-lavender font-mono mt-0.5">
                                  {inq.phone}
                                </div>
                              )}
                            </td>

                            <td className="py-3.5 px-4">
                              <div className="font-medium text-brand-electric line-clamp-1">
                                {inq.serviceCategory}
                              </div>
                              <div className="text-xs text-brand-muted font-mono mt-0.5">
                                Budget: {inq.budget || 'Flexible'}
                              </div>
                            </td>

                            <td className="py-3.5 px-4">
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider ${
                                  inq.type === 'photography'
                                    ? 'bg-amber-400/15 text-amber-300 border border-amber-400/25'
                                    : 'bg-brand-blue/15 text-brand-electric border border-brand-blue/25'
                                }`}
                              >
                                {inq.type}
                              </span>
                            </td>

                            <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                              <select
                                value={inq.status}
                                onChange={(e) => handleStatusChange(inq.id, e.target.value as InquiryStatus)}
                                className={`px-2.5 py-1 rounded-lg text-xs font-semibold focus:outline-none border transition-all ${
                                  inq.status === 'new'
                                    ? 'bg-amber-500/20 text-amber-200 border-amber-500/40'
                                    : inq.status === 'contacted'
                                    ? 'bg-cyan-500/20 text-cyan-200 border-cyan-500/40'
                                    : inq.status === 'in_progress'
                                    ? 'bg-indigo-500/20 text-indigo-200 border-indigo-500/40'
                                    : inq.status === 'completed'
                                    ? 'bg-emerald-500/20 text-emerald-200 border-emerald-500/40'
                                    : 'bg-white/[0.05] text-brand-muted border-white/[0.1]'
                                }`}
                              >
                                <option value="new" className="bg-[#0b0e26] text-white">New</option>
                                <option value="contacted" className="bg-[#0b0e26] text-white">Contacted</option>
                                <option value="in_progress" className="bg-[#0b0e26] text-white">In Progress</option>
                                <option value="completed" className="bg-[#0b0e26] text-white">Completed</option>
                                <option value="archived" className="bg-[#0b0e26] text-white">Archived</option>
                              </select>
                            </td>

                            <td className="py-3.5 px-4 text-xs text-brand-muted font-mono whitespace-nowrap">
                              {dateFormatted}
                            </td>

                            <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                              <div className="flex items-center justify-end gap-1.5">
                                {inq.phone && (
                                  <a
                                    href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                                      `Hi ${inq.fullName}, thank you for reaching out to LetsGo AdGenX regarding ${inq.serviceCategory}!`
                                    )}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/25 transition-all"
                                    title="Open WhatsApp chat with client"
                                  >
                                    <MessageCircle className="w-3.5 h-3.5" />
                                  </a>
                                )}
                                <a
                                  href={`mailto:${inq.email}?subject=${encodeURIComponent(
                                    `LetsGo AdGenX - Regarding your ${inq.serviceCategory} inquiry`
                                  )}`}
                                  className="p-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-brand-muted hover:text-white border border-white/[0.08] transition-all"
                                  title="Send Email"
                                >
                                  <Mail className="w-3.5 h-3.5" />
                                </a>
                                <button
                                  onClick={() => handleDelete(inq.id)}
                                  className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/25 text-red-400 border border-red-500/25 transition-all"
                                  title="Delete inquiry"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: VISITOR TRAFFIC & PAGE VIEWS                            */}
        {/* ============================================================== */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Daily Visits Table / Chart */}
              <div className="lg:col-span-2 p-6 rounded-2xl bg-[#0a0d24]/90 border border-white/[0.08] shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-heading font-semibold text-white flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-brand-electric" />
                    <span>Daily Visitors Traffic</span>
                  </h3>
                  <span className="text-xs text-brand-muted font-mono">Past Days Recorded</span>
                </div>

                {Object.keys(metrics.visitsByDate).length === 0 ? (
                  <div className="py-12 text-center text-xs text-brand-muted">
                    No date logs recorded yet. Visit any page on the website to see real-time visits!
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {Object.entries(metrics.visitsByDate)
                      .sort(([a], [b]) => b.localeCompare(a))
                      .slice(0, 10)
                      .map(([date, count]) => {
                        const maxCount = Math.max(...Object.values(metrics.visitsByDate), 1);
                        const pct = Math.min(100, Math.round((count / maxCount) * 100));

                        return (
                          <div key={date} className="space-y-1">
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-mono text-white/90">{date}</span>
                              <span className="font-mono text-cyan-300 font-semibold">{count} visits</span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-white/[0.05] overflow-hidden">
                              <div
                                className="h-full rounded-full bg-gradient-to-r from-brand-blue to-cyan-400 transition-all duration-500"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                  </div>
                )}
              </div>

              {/* Devices Breakdown */}
              <div className="p-6 rounded-2xl bg-[#0a0d24]/90 border border-white/[0.08] shadow-xl space-y-5">
                <h3 className="text-base font-heading font-semibold text-white flex items-center gap-2">
                  <Monitor className="w-4 h-4 text-brand-electric" />
                  <span>Device Distribution</span>
                </h3>

                <div className="space-y-4 pt-2">
                  {/* Desktop */}
                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-brand-blue/20 text-brand-electric">
                        <Monitor className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-heading font-semibold text-white">Desktop</div>
                        <div className="text-[11px] text-brand-muted">Laptops & PCs</div>
                      </div>
                    </div>
                    <span className="text-lg font-heading font-bold text-white font-mono">
                      {metrics.deviceCounts.desktop}
                    </span>
                  </div>

                  {/* Mobile */}
                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-brand-violet/20 text-brand-lavender">
                        <Smartphone className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-heading font-semibold text-white">Mobile</div>
                        <div className="text-[11px] text-brand-muted">Smartphones</div>
                      </div>
                    </div>
                    <span className="text-lg font-heading font-bold text-white font-mono">
                      {metrics.deviceCounts.mobile}
                    </span>
                  </div>

                  {/* Tablet */}
                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-cyan-400/20 text-cyan-300">
                        <Layers className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-heading font-semibold text-white">Tablet</div>
                        <div className="text-[11px] text-brand-muted">iPads & Tablets</div>
                      </div>
                    </div>
                    <span className="text-lg font-heading font-bold text-white font-mono">
                      {metrics.deviceCounts.tablet}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Popular Pages Section */}
            <div className="p-6 rounded-2xl bg-[#0a0d24]/90 border border-white/[0.08] shadow-xl space-y-4">
              <h3 className="text-base font-heading font-semibold text-white flex items-center gap-2">
                <Eye className="w-4 h-4 text-cyan-400" />
                <span>Page Breakdown & Most Visited URLs</span>
              </h3>

              {Object.keys(metrics.pageCounts).length === 0 ? (
                <div className="py-8 text-center text-xs text-brand-muted">
                  No page views captured yet. Click through the website to generate telemetry data!
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {Object.entries(metrics.pageCounts)
                    .sort(([, a], [, b]) => b - a)
                    .map(([rawKey, count]) => {
                      const displayPath = rawKey === 'home' ? '/' : '/' + rawKey.replace(/_/g, '/');
                      return (
                        <div
                          key={rawKey}
                          className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between"
                        >
                          <span className="text-xs font-mono text-white/90 truncate max-w-[200px]" title={displayPath}>
                            {displayPath}
                          </span>
                          <span className="px-2 py-0.5 rounded-md bg-cyan-500/15 text-cyan-300 text-xs font-mono font-semibold border border-cyan-500/20">
                            {count} views
                          </span>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: WEB CONTROL & ADMIN SETTINGS                            */}
        {/* ============================================================== */}
        {activeTab === 'settings' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Announcement Banner Controller */}
            <div className="p-6 rounded-2xl bg-[#0a0d24]/90 border border-white/[0.08] shadow-xl space-y-4">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-brand-electric" />
                <h3 className="text-base font-heading font-semibold text-white">
                  Top Announcement Strip
                </h3>
              </div>
              <p className="text-xs text-brand-muted">
                Control the announcement ticker displayed at the very top of all public pages.
              </p>

              <div className="space-y-3 pt-2">
                <textarea
                  value={announcementText}
                  onChange={(e) => setAnnouncementText(e.target.value)}
                  rows={3}
                  className="w-full p-3 rounded-xl bg-white/[0.04] border border-white/[0.1] text-xs sm:text-sm text-white focus:outline-none focus:border-brand-blue"
                  placeholder="Enter top strip announcement message..."
                />

                <div className="flex items-center justify-between">
                  <button
                    onClick={handleSaveSettings}
                    className="px-4 py-2 rounded-xl text-xs font-heading font-semibold bg-brand-blue hover:bg-brand-blue/90 text-white transition-all shadow-md shadow-brand-blue/30"
                  >
                    Save Changes
                  </button>
                  {savedSettingsNotice && (
                    <span className="text-xs text-emerald-400 font-mono flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5" /> Saved!
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Change Admin Password */}
            <div className="p-6 rounded-2xl bg-[#0a0d24]/90 border border-white/[0.08] shadow-xl space-y-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-brand-electric" />
                <h3 className="text-base font-heading font-semibold text-white">
                  Admin Credentials & Security
                </h3>
              </div>
              <p className="text-xs text-brand-muted">
                Update the ID and password used to access this Admin Portal.
              </p>

              {credUpdateMessage && (
                <div className="p-3 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-200 text-xs">
                  {credUpdateMessage}
                </div>
              )}

              <form onSubmit={handleUpdateCreds} className="space-y-3 pt-2">
                <div>
                  <label className="block text-[11px] font-heading font-semibold text-brand-muted mb-1">
                    New Admin ID / Email
                  </label>
                  <input
                    type="text"
                    placeholder="Enter new admin ID or email"
                    value={newAdminUser}
                    onChange={(e) => setNewAdminUser(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.1] text-xs text-white focus:outline-none focus:border-brand-blue"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-heading font-semibold text-brand-muted mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter new password"
                    value={newAdminPass}
                    onChange={(e) => setNewAdminPass(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.1] text-xs text-white focus:outline-none focus:border-brand-blue"
                  />
                </div>

                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-heading font-semibold bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.1] text-white transition-all"
                >
                  Update Credentials
                </button>
              </form>
            </div>
          </div>
        )}
      </main>

      {/* ============================================================== */}
      {/* 3. INQUIRY DETAIL MODAL / DRAWER                               */}
      {/* ============================================================== */}
      {selectedInquiry && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in"
          onClick={() => setSelectedInquiry(null)}
        >
          <div
            className="w-full max-w-2xl bg-[#0c102a] border border-white/[0.15] rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 overflow-y-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-white/[0.08] pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-heading font-bold text-white">
                    {selectedInquiry.fullName}
                  </h3>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase ${
                      selectedInquiry.status === 'new'
                        ? 'bg-amber-500/20 text-amber-200 border border-amber-500/40'
                        : 'bg-brand-blue/20 text-cyan-200 border border-brand-blue/40'
                    }`}
                  >
                    {selectedInquiry.status}
                  </span>
                </div>
                <div className="text-xs text-brand-muted mt-1">{selectedInquiry.email}</div>
                {selectedInquiry.phone && (
                  <div className="text-xs text-brand-lavender font-mono">{selectedInquiry.phone}</div>
                )}
              </div>

              <button
                onClick={() => setSelectedInquiry(null)}
                className="p-1.5 rounded-xl text-brand-muted hover:text-white bg-white/[0.04] hover:bg-white/[0.08]"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <span className="text-brand-muted text-[11px] block">Service Requested</span>
                  <span className="font-semibold text-brand-electric">
                    {selectedInquiry.serviceCategory}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <span className="text-brand-muted text-[11px] block">Budget</span>
                  <span className="font-semibold text-white">{selectedInquiry.budget || 'Flexible'}</span>
                </div>
              </div>

              {selectedInquiry.type === 'photography' && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <span className="text-brand-muted text-[11px] block">Preferred Date</span>
                    <span className="font-semibold text-white">{selectedInquiry.shootDate || 'TBD'}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <span className="text-brand-muted text-[11px] block">Location</span>
                    <span className="font-semibold text-white">{selectedInquiry.location || 'TBD'}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <span className="text-brand-muted text-[11px] block">Duration</span>
                    <span className="font-semibold text-white">{selectedInquiry.duration || 'Flexible'}</span>
                  </div>
                </div>
              )}

              {/* Message Box */}
              <div>
                <label className="text-[11px] font-heading font-semibold text-brand-muted uppercase tracking-wider block mb-1.5">
                  Client Message / Project Scope
                </label>
                <div className="p-4 rounded-xl bg-black/40 border border-white/[0.08] text-white/90 leading-relaxed whitespace-pre-wrap font-body">
                  {selectedInquiry.message || 'No detailed description provided.'}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <label className="text-xs text-brand-muted">Update Status:</label>
                  <select
                    value={selectedInquiry.status}
                    onChange={(e) => handleStatusChange(selectedInquiry.id, e.target.value as InquiryStatus)}
                    className="px-3 py-1.5 rounded-lg text-xs bg-white/[0.08] border border-white/[0.15] text-white focus:outline-none"
                  >
                    <option value="new" className="bg-[#0b0e26]">New</option>
                    <option value="contacted" className="bg-[#0b0e26]">Contacted</option>
                    <option value="in_progress" className="bg-[#0b0e26]">In Progress</option>
                    <option value="completed" className="bg-[#0b0e26]">Completed</option>
                    <option value="archived" className="bg-[#0b0e26]">Archived</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  {selectedInquiry.phone && (
                    <a
                      href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                        `Hi ${selectedInquiry.fullName}, this is LetsGo AdGenX following up on your ${selectedInquiry.serviceCategory} inquiry.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/30 hover:bg-[#25D366]/30 text-xs font-heading font-semibold inline-flex items-center gap-1.5 transition-all"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp Client</span>
                    </a>
                  )}

                  <a
                    href={`mailto:${selectedInquiry.email}?subject=${encodeURIComponent(
                      `LetsGo AdGenX // Regarding your ${selectedInquiry.serviceCategory} inquiry`
                    )}`}
                    className="px-3 py-1.5 rounded-xl bg-brand-blue hover:bg-brand-blue/90 text-white text-xs font-heading font-semibold inline-flex items-center gap-1.5 transition-all shadow-md shadow-brand-blue/25"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Send Email</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
