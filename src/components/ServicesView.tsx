import { PageType } from '../types';

interface ServicesViewProps {
  onNavigate: (page: PageType) => void;
  onNavigateToPricing?: (category: 'ai' | 'standard' | 'brand', sub?: 'employees' | 'marketing' | 'ops' | 'identity' | 'merch') => void;
  onOpenConsultation: (service?: string) => void;
}

export default function ServicesView({ onNavigate, onNavigateToPricing, onOpenConsultation }: ServicesViewProps) {

  const serviceItems = [
    {
      title: 'Website Design & Development',
      icon: 'desktop_windows',
      bgColor: 'bg-blue-50 text-[#001f41]',
      description: 'Custom-crafted, lightning-fast interfaces designed to turn traffic into paying users, optimized for desktop and mobile devices.',
      actionLabel: 'Build Custom Website',
      serviceId: 'Website Design',
      tag: 'Core Platform',
      pricingCategory: 'standard' as const
    },
    {
      title: 'Web Hosting & Maintenance',
      icon: 'dns',
      bgColor: 'bg-indigo-50 text-indigo-700',
      description: 'Secure, high-availability production deployment pipelines combined with domain routing, SSL administration, and continuous maintenance.',
      actionLabel: 'Set Up Web Hosting',
      serviceId: 'Web Hosting',
      tag: 'Infrastructure',
      pricingCategory: 'standard' as const
    },
    {
      title: 'AI Employees',
      icon: 'smart_toy',
      bgColor: 'bg-amber-50 text-[#7b581d]',
      description: 'Deploy highly trained conversational virtual agents that work 24/7 to pre-qualify incoming leads, answer support queries, and automate appointments.',
      actionLabel: 'Hire AI Employees',
      serviceId: 'AI Employees',
      tag: 'Best Seller',
      primaryBtn: true,
      pricingCategory: 'ai' as const,
      pricingSub: 'employees' as const
    },
    {
      title: 'AI Sales & Marketing',
      icon: 'trending_up',
      bgColor: 'bg-rose-50 text-rose-700',
      description: 'Empower your outreach and conversion channels with smart CRM pipelines, auto-replies, and highly optimized marketing campaigns.',
      actionLabel: 'Automate Sales System',
      serviceId: 'Sales and Marketing AI',
      tag: 'Grow Business',
      pricingCategory: 'ai' as const,
      pricingSub: 'marketing' as const
    },
    {
      title: 'Operations & Analytics',
      icon: 'settings_suggest',
      bgColor: 'bg-emerald-50 text-emerald-800',
      description: 'Replace tedious labor with trigger-based background workflow automations, beautiful metrics dashboards, and operations reporting.',
      actionLabel: 'Deploy Workflows',
      serviceId: 'Operations and Workflows',
      tag: 'Efficiency',
      pricingCategory: 'ai' as const,
      pricingSub: 'ops' as const
    },
    {
      title: 'Brand Identity',
      icon: 'brush',
      bgColor: 'bg-purple-50 text-purple-700',
      description: 'Build an elegant, professional presence from day one with high-contrast logos, comprehensive corporate style guides, and master design guidelines.',
      actionLabel: 'Rebrand Your Presence',
      serviceId: 'Brand Identity Design',
      tag: 'Creative Identity',
      pricingCategory: 'brand' as const,
      pricingSub: 'identity' as const
    },
    {
      title: 'Branded Merchandise',
      icon: 'apparel',
      bgColor: 'bg-cyan-50 text-cyan-800',
      description: 'Design, sell, or distribute custom-branded merchandise worldwide via smooth print-on-demand merch integrations requiring zero upfront inventory.',
      actionLabel: 'Launch Branded Merch',
      serviceId: 'Custom Merchandise Production',
      tag: 'Passive Revenue',
      pricingCategory: 'brand' as const,
      pricingSub: 'merch' as const
    }
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative pt-16 pb-12 px-4 md:px-12 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="font-display text-4xl md:text-6xl text-[#001f41] leading-tight font-extrabold tracking-tight">
              Elevating Brands through <span className="text-[#a08250]">Digital Transformation.</span>
            </h1>
            <p className="text-gray-600 text-base md:text-lg max-w-xl leading-relaxed font-sans">
              From elite-speed web architectures and conversational AI assistants to streamlined background operations & custom print merchandise, we design systems that let you scale autonomously.
            </p>
          </div>
          <div className="hidden lg:block relative">
            <div className="absolute -inset-4 bg-[#7b581d]/10 rounded-full blur-3xl opacity-30 pointer-events-none"></div>
            <img
              alt="Digital Services Hero"
              className="rounded-[2rem] shadow-2xl relative z-10 border border-gray-100 max-h-[380px] w-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmiz4qA7TsZioFtsTnu8ZxtCdaryJ5EY6ggfVuuz0aobDK7C2Y9zFfseHjlSWE-_fSk6Lq1jYm7PpFRo-UFFO2iHZ3P3M4ooIXvQS3Jxocc0ImfQY_o-bMnYhu0kx4nXF3A-nDjjCE3cpQ0yoHeD3Sgp-DUMv2mXpdNS8ePN2x320KhXdR3W_E-9elJDOGaDuBPDbVpuUaTVXhUH09iWyF4XePuWVO1CPT29zdXr8ldtW0Ize2M9rUkBZdqQx0kVM4V-ogSxJgJYiG"
            />
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="font-display text-3xl md:text-5xl text-[#001f41] font-bold tracking-tight">
            Comprehensive Service Suite
          </h2>
          <div className="w-24 h-1.5 bg-[#EFC07B] mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {serviceItems.map((svc, i) => (
            <div
              key={i}
              className="glass-panel p-8 md:p-10 rounded-[32px] flex flex-col justify-between hover:border-[#7b581d]/40 hover:-translate-y-1 transition-all duration-300 shadow-sm bg-white relative"
            >
              <div className="absolute top-8 right-8">
                <span className="bg-gray-100 text-gray-500 font-sans text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full border border-gray-200">
                  {svc.tag}
                </span>
              </div>

              <div>
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-3xl shrink-0 ${svc.bgColor}`}>
                  <span className="material-symbols-outlined">{svc.icon}</span>
                </div>
                <h3 className="font-display text-2xl lg:text-3xl text-[#001f41] mb-4 font-extrabold tracking-tight">
                  {svc.title}
                </h3>
                <p className="text-gray-500 mb-8 text-sm leading-relaxed font-sans">
                  {svc.description}
                </p>
                <div className="h-px bg-gray-100 mb-6"></div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  onClick={() => onOpenConsultation(svc.serviceId)}
                  className={`flex-1 py-3.5 rounded-xl font-sans font-bold text-xs uppercase tracking-wider transition-all duration-200 active:scale-95 cursor-pointer ${
                    svc.primaryBtn
                      ? 'bg-[#EFC07B] text-[#1A1A2E] cta-glow hover:scale-[102]'
                      : 'bg-[#001f41] text-white hover:bg-[#002f5a]'
                  }`}
                >
                  {svc.actionLabel}
                </button>
                <button
                  onClick={() => {
                    if (onNavigateToPricing) {
                      onNavigateToPricing(svc.pricingCategory, svc.pricingSub);
                    } else {
                      onNavigate('pricing');
                    }
                  }}
                  className="px-4 py-3.5 rounded-xl font-sans font-semibold text-xs text-gray-500 hover:text-[#001f41] hover:bg-gray-50 border border-gray-250 transition-colors cursor-pointer"
                >
                  View Tier Pricing
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

