import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle, Sparkles, Layers, Cpu, TrendingUp, ArrowUpRight, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { SectionHeading } from '../components/ui/SectionHeading';
import { HeroVisual } from '../components/hero/HeroVisual';
import { ServiceCard } from '../components/services/ServiceCard';
import { ServiceModal } from '../components/services/ServiceModal';
import { ProjectCard } from '../components/portfolio/ProjectCard';
import { ProjectModal } from '../components/portfolio/ProjectModal';
import { HomePhotographySection } from '../components/home/HomePhotographySection';
import { DynamicIcon } from '../components/ui/DynamicIcon';
import { SERVICES, type ServiceItem } from '../data/services';
import { PROJECTS, type ProjectCategory, type ProjectItem } from '../data/projects';
import { PROCESS_STEPS } from '../data/process';
import { INDUSTRIES } from '../data/industries';
import { WHY_CHOOSE_US } from '../data/whyUs';
import { SITE_CONFIG } from '../config/site';
import { getWhatsAppUrl } from '../config/contact';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All');

  const filteredProjects = activeCategory === 'All'
    ? PROJECTS.slice(0, 6)
    : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <div className="relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] subtle-radial-bg pointer-events-none" />
      <div className="absolute top-[800px] right-0 w-[500px] h-[500px] purple-radial-bg pointer-events-none" />

      {/* SECTION B: HERO */}
      <section className="relative pt-2 sm:pt-4 lg:pt-3 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-6 text-center lg:text-left space-y-4 lg:space-y-5">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="primary" icon={<Sparkles className="w-3.5 h-3.5" />}>
                TECHNOLOGY × CREATIVITY × GROWTH
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3.5xl sm:text-4.5xl lg:text-5xl xl:text-6xl font-heading font-extrabold text-white tracking-tight leading-[1.12]"
            >
              We Build Digital Experiences That{' '}
              <span className="text-gradient">Grow Businesses.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm sm:text-base lg:text-lg text-brand-muted max-w-xl mx-auto lg:mx-0 font-body leading-relaxed"
            >
              Software, design, and digital marketing — everything your business needs to stand out and move forward.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="pt-1 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5"
            >
              <Button
                to="/contact"
                variant="primary"
                size="lg"
                iconRight={<ArrowRight className="w-4 h-4" />}
                className="w-full sm:w-auto"
              >
                Start a Project
              </Button>

              <Button
                to="/work"
                variant="secondary"
                size="lg"
                iconRight={<ArrowUpRight className="w-4 h-4" />}
                className="w-full sm:w-auto"
              >
                Explore Our Work
              </Button>
            </motion.div>
          </div>

          {/* Hero Right Visual (Borderless & Floating Seamlessly) */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <HeroVisual />
          </div>
        </div>

        {/* Hero Bottom Trust Metrics Bar (From Reference Design) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6 sm:mt-8 lg:mt-10 pt-5 sm:pt-6 border-t border-white/[0.08] grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-blue/15 border border-brand-blue/30 flex items-center justify-center text-brand-electric shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-base sm:text-lg font-heading font-extrabold text-white">100+</div>
              <div className="text-xs text-brand-muted font-body">Projects & Designs</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-violet/15 border border-brand-violet/30 flex items-center justify-center text-brand-lavender shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm sm:text-base font-heading font-bold text-white">All-in-One</div>
              <div className="text-xs text-brand-muted font-body">Digital Partner</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-electric/15 border border-brand-electric/30 flex items-center justify-center text-brand-electric shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm sm:text-base font-heading font-bold text-white">Custom Solutions</div>
              <div className="text-xs text-brand-muted font-body">For Your Business</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm sm:text-base font-heading font-bold text-white">Ongoing Support</div>
              <div className="text-xs text-brand-muted font-body">Even After Launch</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* SECTION C: TRUST AND CAPABILITIES */}
      <section className="py-20 bg-brand-surface/40 border-y border-white/[0.06] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Unified Digital Partner"
            title="One Creative Technology Partner."
            highlight="Multiple Ways to Grow."
            description="We bridge the gap between engineering rigor, unforgettable visual branding, and measurable customer acquisition. You no longer need to manage three separate agencies."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {SITE_CONFIG.disciplines.map((d, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl glass-card border border-white/[0.08] hover:border-brand-violet/40 transition-all duration-300 relative group"
              >
                <div className="w-12 h-12 rounded-2xl bg-brand-blue/15 text-brand-electric border border-brand-blue/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {idx === 0 && <Cpu className="w-6 h-6" />}
                  {idx === 1 && <Layers className="w-6 h-6" />}
                  {idx === 2 && <TrendingUp className="w-6 h-6" />}
                </div>

                <div className="text-xs uppercase font-heading font-semibold text-brand-lavender tracking-wider mb-1">
                  {d.subtitle}
                </div>
                <h3 className="text-2xl font-heading font-bold text-white mb-3">
                  {d.title}
                </h3>
                <p className="text-sm text-brand-muted leading-relaxed font-body">
                  {d.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION D: SERVICES OVERVIEW */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SectionHeading
          badge="Full-Service Capabilities"
          title="Everything You Need to"
          highlight="Go Digital."
          description="From the first idea to the final launch, we bring the right technology and creativity together to build and grow your presence."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onExplore={(s) => setSelectedService(s)}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button
            to="/services"
            variant="outline"
            size="md"
            iconRight={<ArrowRight className="w-4 h-4" />}
          >
            View Complete Services Directory & Pricing Scope
          </Button>
        </div>
      </section>

      {/* DEDICATED VISUAL SECTION: PHOTOGRAPHY & VISUAL PRODUCTION */}
      <HomePhotographySection />

      {/* SECTION E: FEATURED WORK */}
      <section className="py-24 bg-brand-surface/30 border-y border-white/[0.06] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Selected Works"
            title="Ideas Turned Into"
            highlight="Experiences."
            description="Explore the kinds of digital products and creative work we build. Clearly labelled concept studies and design explorations demonstrate our technical and aesthetic standards."
          />

          {/* Category Filter Chips */}
          <div className="flex items-center justify-center flex-wrap gap-2 mb-12">
            {(
              [
                'All',
                'Websites',
                'Mobile Applications',
                'Web Applications',
                'Branding',
                'Graphic Design',
                'Video and Marketing',
              ] as ProjectCategory[]
            ).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-heading font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-brand-blue text-white shadow-glow-sm border border-brand-electric/40'
                    : 'bg-white/[0.03] text-brand-muted hover:text-white hover:bg-white/[0.08] border border-white/[0.06]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Project Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onView={(p) => setSelectedProject(p)}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button
              to="/work"
              variant="secondary"
              size="md"
              iconRight={<ArrowRight className="w-4 h-4" />}
            >
              Browse All Case Studies & Prototypes
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION F: WHY CHOOSE LETSGOADGENX? */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SectionHeading
          badge="The AdGen-X Advantage"
          title="More Than a Service Provider."
          highlight="A Digital Growth Partner."
          description="We take pride in transparent collaboration, clean execution, and building digital solutions engineered for your business objectives."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_CHOOSE_US.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl glass-card border border-white/[0.07] hover:border-brand-violet/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-brand-violet/15 text-brand-lavender border border-brand-violet/20 flex items-center justify-center mb-4">
                  <DynamicIcon name={item.iconName} className="w-5 h-5" />
                </div>
                <h3 className="text-base font-heading font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-brand-muted leading-relaxed font-body">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION G: OUR PROCESS */}
      <section className="py-24 bg-brand-surface/40 border-y border-white/[0.06] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Proven Methodology"
            title="From First Idea to"
            highlight="Final Launch."
            description="Our structured 5-step framework keeps deliverables transparent, timelines predictable, and quality uncompromising."
          />

          {/* Desktop & Mobile Responsive Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
            {PROCESS_STEPS.map((step, idx) => (
              <div
                key={step.step}
                className="relative p-6 rounded-3xl glass-card border border-white/[0.08] hover:border-brand-electric/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-heading font-extrabold text-2xl sm:text-3xl text-gradient">
                      {step.step}
                    </span>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-brand-lavender/70 bg-white/[0.04] px-2 py-0.5 rounded border border-white/5">
                      Stage {idx + 1}
                    </span>
                  </div>

                  <h3 className="text-lg font-heading font-bold text-white mb-1 group-hover:text-brand-electric transition-colors">
                    {step.title}
                  </h3>
                  <div className="text-xs text-brand-lavender font-medium mb-3">
                    {step.subtitle}
                  </div>

                  <p className="text-xs text-brand-muted leading-relaxed font-body mb-4">
                    {step.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/[0.06] space-y-1">
                  {step.details.slice(0, 2).map((d, dIdx) => (
                    <div key={dIdx} className="text-[11px] text-white/70 flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-brand-electric shrink-0" />
                      <span className="line-clamp-1">{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/process"
              className="text-xs font-heading font-semibold text-brand-lavender hover:text-white inline-flex items-center gap-1.5 transition-colors"
            >
              Explore our complete working process and delivery standards <ArrowRight className="w-3.5 h-3.5 text-brand-electric" />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION H: INDUSTRIES WE SERVE */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SectionHeading
          badge="Domain Expertise"
          title="Industries We"
          highlight="Empower."
          description="We tailor digital platforms, brand strategies, and campaigns for diverse modern sectors."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {INDUSTRIES.map((ind, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl glass-card border border-white/[0.06] hover:border-brand-blue/30 transition-all flex items-start gap-4"
            >
              <div className="p-3 rounded-xl bg-brand-blue/15 text-brand-electric border border-brand-blue/20 shrink-0">
                <DynamicIcon name={ind.iconName} className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-heading font-bold text-white mb-1">
                  {ind.name}
                </h3>
                <p className="text-xs text-brand-muted leading-relaxed font-body">
                  {ind.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION I: COLLABORATIVE COMMITMENT (TESTIMONIALS REPLACEMENT) */}
      <section className="py-20 bg-brand-surface/30 border-y border-white/[0.06] relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <Badge variant="purple">Our Collaboration Standard</Badge>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white">
            Built Around <span className="text-gradient">Your Goals.</span>
          </h2>
          <p className="text-base sm:text-lg text-brand-muted leading-relaxed max-w-2xl mx-auto font-body">
            As a fast-moving modern startup, we earn your trust through transparent milestones, direct communication with builders, and delivering high-caliber work that helps your business scale.
          </p>

          <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
              <div className="text-xl font-heading font-bold text-brand-electric mb-1">100% Direct</div>
              <div className="text-xs text-brand-muted">Talk straight to designers & developers</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
              <div className="text-xl font-heading font-bold text-brand-lavender mb-1">Honest Scopes</div>
              <div className="text-xs text-brand-muted">Itemized deliverables & agreed milestones</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
              <div className="text-xl font-heading font-bold text-emerald-400 mb-1">Post-Launch</div>
              <div className="text-xs text-brand-muted">Warranty and ongoing growth support</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION J: FINAL HIGH-IMPACT CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
        <div className="relative rounded-3xl overflow-hidden p-8 sm:p-14 md:p-16 bg-gradient-to-br from-[#121638] via-[#0E1025] to-[#1a1236] border border-brand-violet/30 shadow-2xl text-center">
          {/* Ambient Lighting Accents */}
          <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-brand-blue/30 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-brand-violet/30 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <Badge variant="cyan" icon={<Sparkles className="w-3.5 h-3.5" />}>
              Start The Conversation
            </Badge>

            <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
              Have an Idea? <br />
              <span className="text-gradient">Let's Make It Real.</span>
            </h2>

            <p className="text-base sm:text-lg text-brand-muted leading-relaxed font-body">
              Tell us what you want to build, design, or grow. Let's discuss the next step for your business.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                to="/contact"
                variant="primary"
                size="lg"
                iconRight={<ArrowRight className="w-4 h-4" />}
                className="w-full sm:w-auto"
              >
                Start a Project
              </Button>

              <Button
                href={getWhatsAppUrl('general')}
                variant="whatsapp"
                size="lg"
                target="_blank"
                rel="noopener noreferrer"
                icon={<MessageCircle className="w-5 h-5" />}
                className="w-full sm:w-auto"
              >
                Chat on WhatsApp
              </Button>
            </div>

            <div className="pt-2 text-xs text-white/50">
              Immediate response • All inquiries handled under mutual confidentiality
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Modals */}
      <ServiceModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
};
