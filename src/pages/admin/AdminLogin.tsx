import React, { useState } from 'react';
import { Lock, User, Eye, EyeOff, ShieldCheck, ArrowRight, AlertCircle } from 'lucide-react';
import { verifyAdminLogin } from '../../services/adminAuthService';

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Please enter both Admin ID and Password.');
      return;
    }

    setIsLoading(true);

    try {
      const result = await verifyAdminLogin(username, password);
      setIsLoading(false);

      if (result.success) {
        onLoginSuccess();
      } else {
        setError(result.error || 'Invalid Admin ID or Password. Please try again.');
      }
    } catch {
      setIsLoading(false);
      setError('Authentication failed. Please verify your Firestore connection.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-[#060813] relative overflow-hidden selection:bg-brand-blue selection:text-white">
      {/* Background Ambient Lighting */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-blue/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-violet/25 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8 space-y-3">
          <div className="inline-flex items-center justify-center p-1.5 rounded-full bg-gradient-to-tr from-brand-blue via-brand-violet to-brand-electric shadow-glow-md mb-2">
            <img
              src="/adgenx-logo.png"
              alt="LetsGo AdGenX"
              className="w-14 h-14 object-cover rounded-full"
            />
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white tracking-tight">
            LetsGo <span className="text-brand-electric">AdGenX</span>
          </h1>
          <p className="text-xs sm:text-sm text-brand-muted font-body">
            Management Portal & Live Analytics Command Center
          </p>
        </div>

        {/* Login Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0a0d24]/90 border border-white/[0.12] shadow-2xl backdrop-blur-2xl relative overflow-hidden">
          {/* Subtle Top Glow Bar */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-brand-blue via-cyan-400 to-brand-violet" />

          <div className="flex items-center gap-2 text-xs font-mono font-medium text-brand-electric uppercase tracking-wider mb-6">
            <ShieldCheck className="w-4 h-4 text-brand-electric" />
            <span>Cloud Firestore Verified Access</span>
          </div>

          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs sm:text-sm flex items-start gap-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
              <span className="leading-snug">{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-heading font-semibold text-brand-muted mb-1.5 uppercase tracking-wider">
                Admin ID / Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-muted">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your ID"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white placeholder-brand-muted/50 text-sm focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all"
                  autoComplete="username"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-heading font-semibold text-brand-muted mb-1.5 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-muted">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white placeholder-brand-muted/50 text-sm focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-brand-muted hover:text-white transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3 px-4 rounded-xl font-heading font-semibold text-sm text-white bg-gradient-to-r from-brand-blue via-indigo-600 to-brand-violet hover:from-brand-blue/90 hover:to-brand-violet/90 shadow-lg shadow-brand-blue/25 hover:shadow-brand-blue/40 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Access Dashboard</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Return to website */}
        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-xs text-brand-muted hover:text-white transition-colors underline decoration-brand-muted/50 underline-offset-4"
          >
            ← Back to LetsGo AdGenX Website
          </a>
        </div>
      </div>
    </div>
  );
};
