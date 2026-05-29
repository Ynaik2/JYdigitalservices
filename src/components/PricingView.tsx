import { useState, useEffect } from 'react';
import { PageType } from '../types';

interface PricingViewProps {
  onNavigate: (page: PageType) => void;
  onOpenConsultation: (service?: string, budget?: string) => void;
  preselectedCategory?: 'ai' | 'standard' | 'brand';
  preselectedAiSub?: 'employees' | 'marketing' | 'ops';
  preselectedBrandSub?: 'identity' | 'merch';
}

export default function PricingView({
  onNavigate,
  onOpenConsultation,
  preselectedCategory,
  preselectedAiSub,
  preselectedBrandSub
}: PricingViewProps) {
  // Toggle between 'ai' (default), 'standard' and 'brand' website/merch packages
  const [activeCategory, setActiveCategory] = useState<'ai' | 'standard' | 'brand'>(preselectedCategory || 'ai');
  const [activeAiSub, setActiveAiSub] = useState<'employees' | 'marketing' | 'ops'>(preselectedAiSub || 'employees');
  const [activeBrandSub, setActiveBrandSub] = useState<'identity' | 'merch'>(preselectedBrandSub || 'identity');

  // Sync props to state if they change
  useEffect(() => {
    if (preselectedCategory) {
      setActiveCategory(preselectedCategory);
    }
  }, [preselectedCategory]);

  useEffect(() => {
    if (preselectedAiSub) {
      setActiveAiSub(preselectedAiSub);
    }
  }, [preselectedAiSub]);

  useEffect(() => {
    if (preselectedBrandSub) {
      setActiveBrandSub(preselectedBrandSub);
    }
  }, [preselectedBrandSub]);

  // Hover states for temporary preview logic
  const [hoveredCategory, setHoveredCategory] = useState<'ai' | 'standard' | 'brand' | null>(null);
  const [hoveredAiSub, setHoveredAiSub] = useState<'employees' | 'marketing' | 'ops' | null>(null);
  const [hoveredBrandSub, setHoveredBrandSub] = useState<'identity' | 'merch' | null>(null);

  // Computed views and preview statuses
  const displayCategory = hoveredCategory || activeCategory;
  const isCategoryPreview = hoveredCategory !== null && hoveredCategory !== activeCategory;

  const displayAiSub = hoveredAiSub || activeAiSub;
  const isAiSubPreview = hoveredAiSub !== null && hoveredAiSub !== activeAiSub;

  const displayBrandSub = hoveredBrandSub || activeBrandSub;
  const isBrandSubPreview = hoveredBrandSub !== null && hoveredBrandSub !== activeBrandSub;

  // Toggle state for 'Includes' list on all cards
  const [expandedIncludes, setExpandedIncludes] = useState<Record<string, boolean>>({});

  const toggleIncludes = (serviceId: string) => {
    setExpandedIncludes(prev => ({
      ...prev,
      [serviceId]: !prev[serviceId]
    }));
  };

  // Calculator State
  const [tierSelection, setTierSelection] = useState<'basic' | 'plus' | 'platinum'>('plus');
  const [extraPages, setExtraPages] = useState<number>(0); // 0 to 10
  const [includeMaintenance, setIncludeMaintenance] = useState<boolean>(true);
  const [timelinePriority, setTimelinePriority] = useState<'standard' | 'express'>('standard');

  // Calculate live project estimate
  const calculateEstimate = () => {
    let price = 0;

    if (tierSelection === 'basic') price += 250;
    if (tierSelection === 'plus') price += 500;
    if (tierSelection === 'platinum') price += 1200;

    // Extra page cost
    price += extraPages * 50;

    // Premium timeline adjustment
    if (timelinePriority === 'express') {
      price = Math.round(price * 1.35); // 35% express delivery markup
    }

    return price;
  };

  const pricingPackages = [
    {
      name: 'Basic',
      price: '250',
      emoji: '🌐',
      desc: 'Perfect for individuals & small businesses just getting online',
      popular: false,
      features: [
        '3 page website',
        'Custom domain setup',
        'Mobile responsive design',
        '1 design and layout revisions',
        'Standard support'
      ],
      includes: [
        'Initial static layout setup',
        'Lightweight design handoffs',
        'Direct server file configuration'
      ],
      serviceId: 'Basic Website Setup',
      budgetId: 'Under $5k'
    },
    {
      name: 'Plus',
      price: '500',
      emoji: '⭐',
      desc: 'Perfect for businesses that want to capture leads',
      popular: true,
      features: [
        'Everything in Basic, plus:',
        'Contact / quote form (straight to your email)',
        'Google Analytics installed',
        'Basic SEO setup',
        'Cookie consent banner',
        '2 design and layout revisions',
        'Standard support'
      ],
      includes: [
        'Google Analytics property tracking configuration',
        'DNS and primary custom domain mapping assistance',
        'Professional contact feedback processing forms'
      ],
      serviceId: 'Plus Website & Leads',
      budgetId: 'Under $5k'
    },
    {
      name: 'Platinum',
      price: '1,200',
      emoji: '💎',
      desc: 'Perfect for businesses that want to sell & take bookings automatically',
      popular: false,
      features: [
        'Everything in Plus, plus:',
        'Up to 10 pages',
        'Booking & appointment system',
        'Speed & performance optimization',
        'Google Analytics advanced setup',
        'WhatsApp chat button',
        '3 design and layout revisions',
        'Priority support',
        '1 month free maintenance after launch'
      ],
      includes: [
        'Stripe payment and Calendly automatic integration checks',
        'Uptime audit + mobile layouts precision optimizations',
        '30 days post-launch priority support and revisions'
      ],
      serviceId: 'Platinum E-Commerce',
      budgetId: 'Under $5k'
    }
  ];

  const aiEmployees = [
    {
      name: 'Basic',
      price: '300',
      period: 'Setup + Monthly Usage',
      emoji: '🤖',
      desc: 'Perfect for small businesses wanting basic automation.',
      popular: false,
      features: [
        'AI Website Chatbot',
        'Lead Capture Integration'
      ],
      includes: [
        'Initial chatbot training',
        'Basic conversation flows',
        'Email lead notifications'
      ],
      serviceId: 'AI Employee Solutions - Basic',
      budgetId: 'Under $5k'
    },
    {
      name: 'Advanced',
      price: '700',
      period: 'Setup + Monthly Usage',
      emoji: '⭐',
      desc: 'For businesses that want the AI to actively qualify and book leads.',
      popular: true,
      features: [
        'Everything in Basic',
        'AI Appointment Booking',
        'Lead Qualification Questions'
      ],
      includes: [
        'Calendar integration',
        'Lead scoring',
        'Automated follow-up messages'
      ],
      serviceId: 'AI Employee Solutions - Advanced',
      budgetId: 'Under $5k'
    },
    {
      name: 'Platinum',
      price: '1500',
      period: 'Setup + Monthly Usage',
      emoji: '👑',
      desc: 'A complete AI employee handling customers 24/7.',
      popular: false,
      features: [
        'Everything in Advanced',
        'AI Voice Receptionist',
        'Multi-Channel Messaging (WhatsApp, Facebook, SMS)',
        'Up to 20,000 messages/month'
      ],
      includes: [
        'Voice calling',
        'Appointment booking',
        'Lead qualification',
        'CRM synchronization'
      ],
      serviceId: 'AI Employee Solutions - Platinum',
      budgetId: 'Under $10k'
    }
  ];

  const marketingAutomation = [
    {
      name: 'Basic',
      price: '200',
      period: 'Setup + Monthly Usage',
      emoji: '📈',
      desc: 'Setup and structure for streamlined CRM organization and metrics tracking.',
      popular: false,
      features: [
        'CRM Setup & Organization',
        'Basic Email Automation triggers'
      ],
      includes: [
        'Lead organization',
        'Welcome email sequence',
        'Basic reporting'
      ],
      serviceId: 'Sales & Marketing Automation - Basic',
      budgetId: 'Under $5k'
    },
    {
      name: 'Advanced',
      price: '500',
      period: 'Setup + Monthly Usage',
      emoji: '⚡',
      desc: 'Drive better follow-up with active CRM pipelines and email campaign triggers.',
      popular: true,
      features: [
        'Everything in Basic',
        'Advanced CRM Pipelines',
        'Email Campaign Automation'
      ],
      includes: [
        'Lead nurturing sequences',
        'Sales pipeline setup',
        'Monthly performance reports'
      ],
      serviceId: 'Sales & Marketing Automation - Advanced',
      budgetId: 'Under $5k'
    },
    {
      name: 'Platinum',
      price: '100',
      period: 'Setup + Monthly Usage',
      emoji: '🏆',
      desc: 'The complete automated lead-generation ecosystem across multiple channels.',
      popular: false,
      features: [
        'Everything in Advanced',
        'Multi-Channel Marketing Automation',
        'Customer Segmentation Engine',
        'Automated Re-engagement Campaigns'
      ],
      includes: [
        'Social media automation',
        'Email marketing automation',
        'Customer lifecycle automation',
        'Conversion tracking'
      ],
      serviceId: 'Sales & Marketing Automation - Platinum',
      budgetId: 'Under $10k'
    }
  ];

  const businessOps = [
    {
      name: 'Basic',
      price: '250',
      period: 'Setup',
      emoji: '⚙️',
      desc: 'Streamline single flow automations and check essential metrics dashboards.',
      popular: false,
      features: [
        '1 Workflow Automation',
        'Basic Analytics Dashboard'
      ],
      includes: [
        'Simple task automation',
        'Lead tracking dashboard',
        'Business metrics overview'
      ],
      serviceId: 'Business Operations & Analytics - Basic',
      budgetId: 'Under $5k'
    },
    {
      name: 'Advanced',
      price: '700',
      period: 'Setup',
      emoji: '📊',
      desc: 'Build multiple key operational integrations for cohesive team performance.',
      popular: true,
      features: [
        'Up to 5 Workflow Automations',
        'Custom Analytics Dashboard',
        'Team Productivity Integration'
      ],
      includes: [
        'CRM integrations',
        'Automated notifications',
        'Team productivity tracking'
      ],
      serviceId: 'Business Operations & Analytics - Advanced',
      budgetId: 'Under $5k'
    },
    {
      name: 'Platinum',
      price: '1,500',
      period: 'Setup',
      emoji: '🔬',
      desc: 'Department-wide custom automations and complete KPI analytical control desks.',
      popular: false,
      features: [
        '10 Workflow Automations',
        'Executive Analytics Dashboard',
        'Custom Integrations',
        'Dedicated Operational Support'
      ],
      includes: [
        'Multi-system integrations',
        'Advanced reporting & KPI monitoring',
        'Department-wide automation',
      ],
      serviceId: 'Business Operations & Analytics - Platinum',
      budgetId: 'Under $10k'
    }
  ];

  const optionalAddons = [
    { item: 'Chatbot Training With Updated Data', price: '100' },
    { item: 'AI support in WhatsApp', price: '10/month' },
    { item: 'AI support in Facebook', price: '10/month'  },
    { item: 'AI support in Telegram', price: '10/month' },
    { item: 'AI support in SMS', price: '10/month'},
    { item: 'Trained Live Human Support Agent', price: '25/hour of support'}
  ];

  const brandIdentity = [
    {
      name: 'Brand Ready',
      price: '50',
      period: 'Setup',
      emoji: '🎨',
      desc: 'For businesses that need a professional starting point.',
      popular: false,
      features: [
        'Logo Design',
        'Brand Color Palette'
      ],
      includes: [
        'Initial discovery meeting',
        'Vector files for all formats',
        'Standard design revision cycle'
      ],
      serviceId: 'Brand Identity - Brand Ready',
      budgetId: 'Under $5k'
    },
    {
      name: 'Brand Enhanced',
      price: '300',
      period: 'Setup',
      emoji: '✨',
      desc: 'For businesses looking to strengthen and modernize their brand.',
      popular: true,
      features: [
        'Everything in Brand Ready',
        'Social Media Branding Kit',
        'Marketing Material Templates'
      ],
      includes: [
        'High resolution source files',
        'Social media layout assets',
        'Print-ready PDF guidelines'
      ],
      serviceId: 'Brand Identity - Brand Enhanced',
      budgetId: 'Under $5k'
    },
    {
      name: 'Brand Dominance',
      price: '500',
      period: 'Setup',
      emoji: '👑',
      desc: 'A complete brand transformation designed for market impact.',
      popular: false,
      features: [
        'Everything in Brand Enhanced',
        'Full Brand Audit & Makeover',
        'Website Branding Alignment',
        'Brand Style Guide'
      ],
      includes: [
        'Dedicated branding strategist',
        'All raw asset formats & guides',
        'Post-[#7b581d] support desk'
      ],
      serviceId: 'Brand Identity - Brand Dominance',
      budgetId: 'Under $5k'
    }
  ];

  const promotionalMerch = [
    {
      name: 'Print-Ready Kit',
      price: '300',
      period: 'Setup',
      emoji: '👕',
      desc: 'For businesses or creators who want simple, clean merch designs ready for printing.',
      popular: false,
      features: [
        '1–3 custom product designs (T-shirts, hoodies, mugs, etc.)',
        'Print-ready file setup (correct sizing, DPI, formats)'
      ],
      includes: [
        'Best for: Small brands testing merchandise or launching their first product line',
        'Print production preparation configuration',
        'High-resolution final source assets'
      ],
      serviceId: 'Promo Merchandise - Starter',
      budgetId: 'Under $5k'
    },
    {
      name: 'Merch Collection Package',
      price: '700',
      period: 'Setup',
      emoji: '⚡',
      desc: 'For brands building a proper merchandise lineup with multiple products and cohesive design style.',
      popular: true,
      features: [
        'Everything in Starter',
        '5–10 product designs across multiple items',
        'Professional mockups (lifestyle + catalog style)'
      ],
      includes: [
        'Best for: Brands launching campaigns or expanding their merch presence',
        'Catalog layouts & lifestyle presentation proofs',
        'Cohesive digital master template packages'
      ],
      serviceId: 'Promo Merchandise - Growth',
      budgetId: 'Under $10k'
    },
    {
      name: 'Full Merch Brand System',
      price: '1400',
      period: 'Setup',
      emoji: '🏆',
      desc: 'For brands that want a complete, structured merchandise identity system ready',
      popular: false,
      features: [
        'Everything in Growth',
        '10–30+ product designs as a full catalog',
        'Cohesive merch identity system across items',
        'Campaign-based collections (drops & promotions)'
      ],
      includes: [
        'Best for: Established brands, businesses, or agencies running merch as part of their identity',
        'Full seasonal campaign planning drops',
        'Organized digital design registry & ongoing setup support'
      ],
      serviceId: 'Promo Merchandise - Pro',
      budgetId: 'Under $10k'
    }
  ];

  return (
    <div className="animate-fade-in">
      {/* Header / Intro */}
      <section className="relative pt-16 pb-12 px-4 md:px-12 max-w-7xl mx-auto text-center space-y-6">
        <h1 className="font-display text-4xl md:text-6xl text-[#001f41] leading-tight font-extrabold tracking-tight">
          Flexible Packages, <span className="text-[#7b581d]">Unmatched Value.</span>
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
          Transparent pricing structure suited for boutique startups to growing brands. Connect with elite digital workflows easily.
        </p>

        {/* Pricing Category Toggle */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto pt-6 text-left">
          {/* ✨ AI Add-ons & Automation */}
          <button
            onClick={() => setActiveCategory('ai')}
            onMouseEnter={() => setHoveredCategory('ai')}
            onMouseLeave={() => setHoveredCategory(null)}
            className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between text-left ${
              activeCategory === 'ai'
                ? 'border-[#001f41] bg-gradient-to-br from-gray-50/70 to-blue-50/25 ring-2 ring-[#001f41]/5 shadow-sm'
                : hoveredCategory === 'ai'
                ? 'border-[#001f41]/50 bg-gradient-to-br from-gray-50/35 to-blue-50/12 ring-2 ring-[#001f41]/[0.025] shadow-sm opacity-80'
                : 'border-transparent bg-white shadow-sm'
            }`}
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-display text-base font-bold text-[#001f41]">AI Add-ons &amp; Automation</span>
              </div>
              <h3 className="font-sans text-xs font-semibold text-gray-800 leading-tight mb-2">
                Extend your business with AI that handles real tasks
              </h3>
            </div>
            <div className="pt-2 border-t border-gray-100 mt-2 w-full">
              <p className="font-sans text-[10px] text-gray-550 leading-normal">
                Custom AI features, integrations, and smart assistants
              </p>
            </div>
          </button>

          {/* 🎨 Brand & Merchandise */}
          <button
            onClick={() => setActiveCategory('brand')}
            onMouseEnter={() => setHoveredCategory('brand')}
            onMouseLeave={() => setHoveredCategory(null)}
            className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between text-left ${
              activeCategory === 'brand'
                ? 'border-[#001f41] bg-gradient-to-br from-gray-50/70 to-blue-50/25 ring-2 ring-[#001f41]/5 shadow-sm text-left'
                : hoveredCategory === 'brand'
                ? 'border-[#001f41]/50 bg-gradient-to-br from-gray-50/35 to-blue-50/12 ring-2 ring-[#001f41]/[0.025] shadow-sm opacity-80'
                : 'border-transparent bg-white shadow-sm'
            }`}
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-display text-base font-bold text-[#001f41]">Brand &amp; Merchandise</span>
              </div>
              <h3 className="font-sans text-xs font-semibold text-gray-800 leading-tight mb-2">
                Build a strong brand and turn it into physical presence
              </h3>
            </div>
            <div className="pt-2 border-t border-gray-100 mt-2 w-full">
              <p className="font-sans text-[10px] text-gray-550 leading-normal">
                Branding, design systems, and Merch-on-demand
              </p>
            </div>
          </button>

          {/* 🌐 Website Packages */}
          <button
            onClick={() => setActiveCategory('standard')}
            onMouseEnter={() => setHoveredCategory('standard')}
            onMouseLeave={() => setHoveredCategory(null)}
            className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between text-left ${
              activeCategory === 'standard'
                ? 'border-[#001f41] bg-gradient-to-br from-gray-50/70 to-blue-50/25 ring-2 ring-[#001f41]/5 shadow-sm'
                : hoveredCategory === 'standard'
                ? 'border-[#001f41]/50 bg-gradient-to-br from-gray-50/35 to-blue-50/12 ring-2 ring-[#001f41]/[0.025] shadow-sm opacity-80'
                : 'border-transparent bg-white shadow-sm'
            }`}
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-display text-base font-bold text-[#001f41]">Website Packages</span>
              </div>
              <h3 className="font-sans text-xs font-semibold text-gray-800 leading-tight mb-2">
                Get a fast, modern website that actually converts visitors
              </h3>
            </div>
            <div className="pt-2 border-t border-gray-100 mt-2 w-full">
              <p className="font-sans text-[10px] text-gray-550 leading-normal">
                Landing pages, business sites, and full website builds
              </p>
            </div>
          </button>
        </div>
      </section>

      {/* Main Container */}
      <section className="pb-20 px-4 md:px-12 max-w-7xl mx-auto">
        <div className={`transition-all duration-300 ${isCategoryPreview ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
          {displayCategory === 'ai' ? (
            /* ========================================================= */
            /* AI OFFERINGS TAB PAGE (ASSUMED TO BE SEEN FIRST / DEFAULT) */
            /* ========================================================= */
            <div className="space-y-12">
              <div className="text-center max-w-2xl mx-auto space-y-3">
                <h2 className="font-display text-3xl md:text-4xl font-extrabold text-[#001f41]">AI Add-ons &amp; Automation</h2>
                <p className="text-gray-500 font-sans text-xs leading-relaxed max-w-lg mx-auto">
                  Supercharge operations, elevate marketing channels, and leverage intelligent virtual employees acting around the clock.
                </p>
              </div>

              {/* Sub-categories Navigator */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto pt-4 pb-4">
                {/* Option 1: AI Employees */}
                <button
                  onClick={() => setActiveAiSub('employees')}
                  onMouseEnter={() => setHoveredAiSub('employees')}
                  onMouseLeave={() => setHoveredAiSub(null)}
                  className={`text-left p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                    activeAiSub === 'employees'
                      ? 'border-[#001f41] bg-gradient-to-br from-gray-50/70 to-blue-50/25 ring-2 ring-[#001f41]/5 shadow-sm'
                      : hoveredAiSub === 'employees'
                      ? 'border-[#001f41]/50 bg-gradient-to-br from-gray-50/35 to-blue-50/12 ring-2 ring-[#001f41]/[0.025] shadow-sm opacity-80'
                      : 'border-transparent bg-white shadow-sm'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-display text-base font-bold text-[#001f41]">1. AI Employees</span>
                    </div>
                    <h3 className="font-sans text-xs font-semibold text-gray-800 leading-tight mb-2">
                      Turn visitors into customers automatically
                    </h3>
                  </div>
                  <div className="pt-2 border-t border-gray-100 mt-2 w-full">
                    <p className="font-sans text-[10px] text-gray-550 leading-normal">
                      Chatbots, AI calls, bookings &amp; lead handling
                    </p>
                  </div>
                </button>

                {/* Option 2: Sales & Marketing */}
                <button
                  onClick={() => setActiveAiSub('marketing')}
                  onMouseEnter={() => setHoveredAiSub('marketing')}
                  onMouseLeave={() => setHoveredAiSub(null)}
                  className={`text-left p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                    activeAiSub === 'marketing'
                      ? 'border-[#001f41] bg-gradient-to-br from-gray-50/70 to-blue-50/25 ring-2 ring-[#001f41]/5 shadow-sm'
                      : hoveredAiSub === 'marketing'
                      ? 'border-[#001f41]/50 bg-gradient-to-br from-gray-50/35 to-blue-50/12 ring-2 ring-[#001f41]/[0.025] shadow-sm opacity-80'
                      : 'border-transparent bg-white shadow-sm'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-display text-base font-bold text-[#001f41]">2. Sales &amp; Marketing</span>
                    </div>
                    <h3 className="font-sans text-xs font-semibold text-gray-800 leading-tight mb-2">
                      Get more leads and convert them faster
                    </h3>
                  </div>
                  <div className="pt-2 border-t border-gray-100 mt-2 w-full">
                    <p className="font-sans text-[10px] text-gray-550 leading-normal">
                      CRM, emails, campaigns, social automation
                    </p>
                  </div>
                </button>

                {/* Option 3: Operations & Analytics */}
                <button
                  onClick={() => setActiveAiSub('ops')}
                  onMouseEnter={() => setHoveredAiSub('ops')}
                  onMouseLeave={() => setHoveredAiSub(null)}
                  className={`text-left p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                    activeAiSub === 'ops'
                      ? 'border-[#001f41] bg-gradient-to-br from-gray-50/70 to-blue-50/25 ring-2 ring-[#001f41]/5 shadow-sm'
                      : hoveredAiSub === 'ops'
                      ? 'border-[#001f41]/50 bg-gradient-to-br from-gray-50/35 to-blue-50/12 ring-2 ring-[#001f41]/[0.025] shadow-sm opacity-80'
                      : 'border-transparent bg-white shadow-sm'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-display text-base font-bold text-[#001f41]">3. Operations &amp; Analytics</span>
                    </div>
                    <h3 className="font-sans text-xs font-semibold text-gray-800 leading-tight mb-2">
                      Run your business on autopilot
                    </h3>
                  </div>
                  <div className="pt-2 border-t border-gray-100 mt-2 w-full">
                    <p className="font-sans text-[10px] text-gray-550 leading-normal">
                      Workflows, dashboards, reporting, automation
                    </p>
                  </div>
                </button>
              </div>

              {/* AI Columns Section */}
              <div className={`transition-all duration-300 ${
                isAiSubPreview ? 'opacity-30 pointer-events-none' : 'opacity-100'
              }`}>
                <div className="grid md:grid-cols-3 gap-8 items-stretch pt-2 animate-fade-in">
                  {(displayAiSub === 'employees' 
                    ? aiEmployees 
                    : displayAiSub === 'marketing' 
                    ? marketingAutomation 
                    : businessOps
                  ).map((pkg, i) => (
                <div
                  key={i}
                  className={`glass-panel p-8 rounded-[32px] flex flex-col justify-between transition-all duration-300 relative ${
                    pkg.popular
                      ? 'border-[#7b581d] bg-white ring-2 ring-[#7b581d]/10 md:scale-105 z-10 shadow-md'
                      : 'bg-white shadow-sm hover:border-[#7b581d]/30'
                  }`}
                >
                  {pkg.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#7b581d] text-white font-sans text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full whitespace-nowrap shadow-sm">
                      Popular Choice
                    </span>
                  )}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{pkg.emoji}</span>
                      <h3 className="font-display text-lg text-[#001f41] font-bold tracking-tight">
                        {pkg.name}
                      </h3>
                    </div>
                    <div className="flex items-baseline gap-1 mb-3">
                      <span className="font-display text-4xl font-extrabold text-[#001f41]">
                        {pkg.price}
                      </span>
                      <span className="font-sans text-[10px] text-gray-400 font-semibold uppercase tracking-wider">
                        / {pkg.period}
                      </span>
                    </div>
                    <p className="text-gray-500 font-sans text-[11px] leading-relaxed mb-6">
                      {pkg.desc}
                    </p>

                    <div className="h-px bg-gray-100 mb-6"></div>

                    <ul className="space-y-2.5 mb-6">
                      {pkg.features.map((feature, fi) => (
                        <li key={fi} className="flex items-start gap-2.5">
                          <span className="material-symbols-outlined text-sm text-[#7b581d] translate-y-[2px]">
                            settings_suggest
                          </span>
                          <span className="font-sans text-[11px] text-gray-750 font-medium leading-normal">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* Collapsible Includes Dropdown Section */}
                    <div className="mt-5 pt-4 border-t border-dashed border-gray-150">
                      <button
                        type="button"
                        onClick={() => toggleIncludes(pkg.serviceId)}
                        className="w-full flex items-center justify-between text-left text-[10px] uppercase tracking-wider font-bold text-gray-400 group cursor-pointer hover:text-[#7b581d] transition-colors"
                      >
                        <span className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[14px]">
                            {expandedIncludes[pkg.serviceId] ? 'unfold_less' : 'unfold_more'}
                          </span>
                          Show offerings
                        </span>
                        <span className={`material-symbols-outlined text-[14px] transition-transform duration-200 ${
                          expandedIncludes[pkg.serviceId] ? 'rotate-180 text-[#7b581d]' : ''
                        }`}>
                          expand_more
                        </span>
                      </button>

                      {expandedIncludes[pkg.serviceId] && (
                        <ul className="space-y-2 mt-3 pl-1 animate-fade-in">
                          {pkg.includes.map((inc, ii) => (
                            <li key={ii} className="flex items-start gap-2 text-[11px] text-gray-650 font-medium font-sans leading-relaxed">
                              <span className="material-symbols-outlined text-xs text-emerald-500 shrink-0 translate-y-[2px]">check</span>
                              <span className="text-left">{inc}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => onOpenConsultation(pkg.serviceId)}
                    className={`w-full py-3.5 rounded-xl font-sans font-bold text-xs uppercase tracking-wider transition-all duration-200 mt-6 cursor-pointer ${
                      pkg.popular
                        ? 'bg-[#EFC07B] text-[#1A1A2E] cta-glow hover:scale-105 active:scale-95'
                        : 'border border-[#001f41] text-[#001f41] hover:bg-[#001f41] hover:text-white'
                    }`}
                  >
                    Acquire Setup
                  </button>
                </div>
              ))}
                </div>
              </div>

            {/* Note: Monthly usage billed separately & website hosting requirement link */}
            <div className="text-center max-w-2xl mx-auto pt-4 pb-2 animate-fade-in">
              <div className="inline-flex items-start sm:items-center gap-2 px-5 py-3 rounded-2xl bg-amber-50/60 border border-amber-200/50 text-[#7b581d] font-sans text-[11px] font-medium leading-normal text-left">
                <span className="material-symbols-outlined text-sm text-[#7b581d] shrink-0 translate-y-[1px] sm:translate-y-0">info</span>
                <span>
                  Please note: Monthly automated platform &amp; API usage is billed separately. Additionally, implementing any of these advanced AI features requires deploying on our managed web servers (billed at{' '}
                  <button
                    onClick={() => {
                      setActiveCategory('standard');
                      setTimeout(() => {
                        const el = document.getElementById('hosting-section');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}
                    className="underline font-bold text-[#001f41] hover:text-[#002f5a] cursor-pointer inline-block mx-0.5"
                  >
                    40/month
                  </button>
                  ).
                </span>
              </div>
            </div>

            {/* Seamless Visual Divider for Add-ons block */}
            <div className="flex items-center justify-center gap-4 py-4 max-w-4xl mx-auto">
              <div className="h-px bg-gray-200 flex-1"></div>
              <span className="text-[#a08250] font-sans text-[10px] font-bold uppercase tracking-widest px-4">Optional Enhancements</span>
              <div className="h-px bg-gray-200 flex-1"></div>
            </div>

            {/* Add-ons table view */}
            <div className="max-w-4xl mx-auto glass-panel p-8 md:p-10 rounded-[32px] bg-white border border-gray-150 shadow-sm relative overflow-hidden animate-fade-in">
              <div className="text-center md:text-left mb-6 space-y-1">
                <span className="bg-[#7b581d]/10 text-[#7b581d] font-sans text-[10px] font-bold uppercase tracking-widest px-3.5 py-1 rounded-full inline-block">
                  🔌 Custom Integration Enhancements
                </span>
                <h3 className="font-display text-xl text-[#001f41] font-extrabold leading-tight">
                  Modular boosters &amp; extra configurations
                </h3>
                <p className="text-gray-500 font-sans text-xs">
                  Choose dedicated scaling components to unlock maximum automation potential for your systems.
                </p>
              </div>

              <div className="overflow-x-auto rounded-xl border border-gray-150 bg-white">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-150">
                      <th className="p-4 font-sans text-xs font-bold text-[#001f41] uppercase tracking-wider">Integrative Component</th>
                      <th className="p-4 font-sans text-xs font-bold text-[#001f41] uppercase tracking-wider">Flat Pricing</th>
                      <th className="p-4 font-sans text-xs font-bold text-[#001f41] uppercase tracking-wider text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {optionalAddons.map((add, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/40 transition-colors">
                        <td className="p-4">
                          <span className="font-sans text-xs font-bold text-[#001f41] block">{add.item}</span>
                        </td>
                        <td className="p-4">
                          <span className="font-mono text-xs font-bold text-[#7b581d]">{add.price}</span>
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => onOpenConsultation(`Inquire Add-on: ${add.item}`)}
                            className="bg-gray-50 hover:bg-[#001f41] hover:text-white text-[#001f41] font-sans font-bold text-[10px] uppercase tracking-wider px-3.5 py-2 rounded-lg transition-all cursor-pointer inline-block border border-gray-200"
                          >
                            Add Setup
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Support Guarantee block */}
            <div className="max-w-3xl mx-auto bg-gray-50 border border-gray-150 rounded-[24px] p-6 text-center space-y-2">
              <span className="material-symbols-outlined text-[#7b581d] text-2xl">verified_user</span>
              <h4 className="font-sans font-bold text-xs text-[#001f41] uppercase tracking-wider">Autonomous Deployment Guarantee</h4>
              <p className="font-sans text-[11px] text-gray-550 max-w-xl mx-auto leading-relaxed">
                All automation services feature dedicated setup briefs, tailored testing integrations, and continuous support sequences. Monthly usage metrics are configured safely via secure API parameters with transparent reporting.
              </p>
            </div>
          </div>
        ) : displayCategory === 'brand' ? (
          /* ========================================================= */
          /* BRAND & MERCHANDISE TAB PAGE */
          /* ========================================================= */
          <div className="space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <h2 className="font-display text-3xl md:text-4xl font-extrabold text-[#001f41]">Brand &amp; Merchandise</h2>
              <p className="text-gray-500 font-sans text-xs leading-relaxed max-w-lg mx-auto">
                Elevate your professional image with standard-setting branding assets and high-end merchandise.
              </p>
            </div>

            {/* Sub-categories Navigator */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto pt-4 pb-4">
              {/* Option 1: Brand Identity */}
              <button
                onClick={() => setActiveBrandSub('identity')}
                onMouseEnter={() => setHoveredBrandSub('identity')}
                onMouseLeave={() => setHoveredBrandSub(null)}
                className={`text-left p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  activeBrandSub === 'identity'
                    ? 'border-[#001f41] bg-gradient-to-br from-gray-50/70 to-blue-50/25 ring-2 ring-[#001f41]/5 shadow-sm'
                    : hoveredBrandSub === 'identity'
                    ? 'border-[#001f41]/50 bg-gradient-to-br from-gray-50/35 to-blue-50/12 ring-2 ring-[#001f41]/[0.025] shadow-sm opacity-80'
                    : 'border-transparent bg-white shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-display text-base font-bold text-[#001f41]">Brand Identity</span>
                  </div>
                  <h3 className="font-sans text-xs font-semibold text-gray-800 leading-tight mb-2">
                    Look like a real, established brand from day one
                  </h3>
                </div>
                <div className="pt-2 border-t border-gray-100 mt-2 w-full">
                  <p className="font-sans text-[10px] text-gray-550 leading-normal">
                    Logo design, brand makeover, style guides, visuals
                  </p>
                </div>
              </button>

              {/* Option 2: Branded Merchandise */}
              <button
                onClick={() => setActiveBrandSub('merch')}
                onMouseEnter={() => setHoveredBrandSub('merch')}
                onMouseLeave={() => setHoveredBrandSub(null)}
                className={`text-left p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  activeBrandSub === 'merch'
                    ? 'border-[#001f41] bg-gradient-to-br from-gray-50/70 to-blue-50/25 ring-2 ring-[#001f41]/5 shadow-sm'
                    : hoveredBrandSub === 'merch'
                    ? 'border-[#001f41]/50 bg-gradient-to-br from-gray-50/35 to-blue-50/12 ring-2 ring-[#001f41]/[0.025] shadow-sm opacity-80'
                    : 'border-transparent bg-white shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-display text-base font-bold text-[#001f41]">Branded Merchandise</span>
                  </div>
                  <h3 className="font-sans text-xs font-semibold text-gray-800 leading-tight mb-2">
                    Turn your brand into physical products people remember
                  </h3>
                </div>
                <div className="pt-2 border-t border-gray-100 mt-2 w-full">
                  <p className="font-sans text-[10px] text-gray-550 leading-normal">
                    Merch-on-demand setup, merch design
                  </p>
                </div>
              </button>
            </div>

            {/* Brand Columns Section */}
            <div className={`transition-all duration-300 ${
              isBrandSubPreview ? 'opacity-30 pointer-events-none' : 'opacity-100'
            }`}>
              <div className="grid md:grid-cols-3 gap-8 items-stretch pt-2 animate-fade-in">
                {(displayBrandSub === 'identity' 
                  ? brandIdentity 
                  : promotionalMerch
                ).map((pkg, i) => (
                <div
                  key={i}
                  className={`glass-panel p-8 rounded-[32px] flex flex-col justify-between transition-all duration-300 relative ${
                    pkg.popular
                      ? 'border-[#7b581d] bg-white ring-2 ring-[#7b581d]/10 md:scale-105 z-10 shadow-md'
                      : 'bg-white shadow-sm hover:border-[#7b581d]/30'
                  }`}
                >
                  {pkg.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#7b581d] text-white font-sans text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full whitespace-nowrap shadow-sm">
                      Recommended Choice
                    </span>
                  )}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{pkg.emoji}</span>
                      <h3 className="font-display text-lg text-[#001f41] font-bold tracking-tight">
                        {pkg.name}
                      </h3>
                    </div>
                    <div className="flex items-baseline gap-1 mb-3">
                      <span className="font-display text-4xl font-extrabold text-[#001f41]">
                        {pkg.price}
                      </span>
                      <span className="font-sans text-[10px] text-gray-400 font-semibold uppercase tracking-wider">
                        / {pkg.period}
                      </span>
                    </div>
                    <p className="text-gray-500 font-sans text-[11px] leading-relaxed mb-6">
                      {pkg.desc}
                    </p>

                    <div className="h-px bg-gray-100 mb-6"></div>

                    <ul className="space-y-2.5 mb-6">
                      {pkg.features.map((feature, fi) => (
                        <li key={fi} className="flex items-start gap-2.5">
                          <span className="material-symbols-outlined text-sm text-[#7b581d] translate-y-[2px]">
                            star_rate
                          </span>
                          <span className="font-sans text-[11px] text-gray-750 font-medium leading-normal text-left">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* Collapsible Includes Dropdown Section */}
                    <div className="mt-5 pt-4 border-t border-dashed border-gray-150">
                      <button
                        type="button"
                        onClick={() => toggleIncludes(pkg.serviceId)}
                        className="w-full flex items-center justify-between text-left text-[10px] uppercase tracking-wider font-bold text-gray-400 group cursor-pointer hover:text-[#7b581d] transition-colors"
                      >
                        <span className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[14px]">
                            {expandedIncludes[pkg.serviceId] ? 'unfold_less' : 'unfold_more'}
                          </span>
                          {displayBrandSub === 'merch' ? 'Target & Brief' : 'Expand offerings'}
                        </span>
                        <span className={`material-symbols-outlined text-[14px] transition-transform duration-200 ${
                          expandedIncludes[pkg.serviceId] ? 'rotate-180 text-[#7b581d]' : ''
                        }`}>
                          expand_more
                        </span>
                      </button>

                      {expandedIncludes[pkg.serviceId] && (
                        <ul className="space-y-2 mt-3 pl-1 animate-fade-in">
                          {pkg.includes.map((inc, ii) => (
                            <li key={ii} className="flex items-start gap-2 text-[11px] text-gray-650 font-medium font-sans leading-relaxed">
                              <span className="material-symbols-outlined text-xs text-emerald-500 shrink-0 translate-y-[2px]">check</span>
                              <span className="text-left">{inc}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => onOpenConsultation(pkg.serviceId)}
                    className={`w-full py-3.5 rounded-xl font-sans font-bold text-xs uppercase tracking-wider transition-all duration-200 mt-6 cursor-pointer ${
                      pkg.popular
                        ? 'bg-[#EFC07B] text-[#1A1A2E] cta-glow hover:scale-105 active:scale-95'
                        : 'border border-[#001f41] text-[#001f41] hover:bg-[#001f41] hover:text-white'
                    }`}
                  >
                    Acquire Setup
                  </button>
                </div>
              ))}
                </div>
              </div>

            {/* Quality Standard block / Advisory Note */}
            <div className="max-w-3xl mx-auto bg-amber-50/50 border border-amber-200/60 rounded-[24px] p-6 text-center space-y-2">
              <span className="material-symbols-outlined text-[#7b581d] text-2xl">info</span>
              <h4 className="font-sans font-bold text-xs text-[#001f41] uppercase tracking-wider">Production Setup &amp; Advisory</h4>
              <p className="font-sans text-[11px] text-gray-650 max-w-xl mx-auto leading-relaxed">
                All branding packages deliver professional print-ready layouts, full usage documentation, and raw vector assets. Please note that physical merchandise production, printing, and shipping costs are separate and dependent on market conditions and selected printer rates.
              </p>
            </div>
          </div>
        ) : (
          /* ======================================================== */
          /* STANDARD WEBSITE PACKAGES TAB + MONTHLY HOSTING IN ONE PAGE */
          /* ======================================================== */
          <div className="space-y-16 animate-fade-in">
            {/* Standard Tiers Columns */}
            <div className="grid md:grid-cols-3 gap-8 items-stretch pt-4">
              {pricingPackages.map((pkg, i) => (
                <div
                  key={i}
                  className={`glass-panel p-8 rounded-[32px] flex flex-col justify-between transition-all duration-300 relative ${
                    pkg.popular
                      ? 'border-[#7b581d] bg-white ring-2 ring-[#7b581d]/10 md:scale-105 z-10 shadow-md'
                      : 'bg-white shadow-sm hover:border-[#7b581d]/30'
                  }`}
                >
                  {pkg.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#7b581d] text-white font-sans text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full whitespace-nowrap shadow-sm">
                      Most Popular Choice
                    </span>
                  )}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{pkg.emoji}</span>
                      <h3 className="font-display text-xl text-[#001f41] font-bold tracking-tight">
                        {pkg.name}
                      </h3>
                    </div>
                    <div className="flex items-baseline gap-1 mb-4">
                      <span className="font-display text-4xl font-extrabold text-[#001f41]">
                        {pkg.price}
                      </span>
                      <span className="font-sans text-xs text-gray-400 font-semibold uppercase tracking-wider">
                        / one-time
                      </span>
                    </div>
                    <p className="text-gray-650 font-sans text-xs leading-relaxed mb-6">
                      {pkg.desc}
                    </p>

                    <div className="h-px bg-gray-150 mb-6"></div>

                    <ul className="space-y-3.5 mb-8">
                      {pkg.features.map((feature, fi) => {
                        const isHeaderLabel = feature.toLowerCase().includes('everything in');
                        return (
                          <li key={fi} className="flex items-start gap-2.5">
                            {isHeaderLabel ? (
                              <span className="material-symbols-outlined text-sm text-[#7b581d] translate-y-[2px] font-bold">
                                done_all
                              </span>
                            ) : (
                              <span className="material-symbols-outlined text-sm text-emerald-500 translate-y-[2px]">
                                check_circle
                              </span>
                            )}
                            <span className={`font-sans text-xs text-gray-700 ${isHeaderLabel ? 'font-bold text-[#7b581d]' : 'font-medium'}`}>
                              {feature}
                            </span>
                          </li>
                        );
                      })}
                    </ul>

                    {/* Collapsible Includes Dropdown Section */}
                    {pkg.includes && pkg.includes.length > 0 && (
                      <div className="mt-5 pt-4 border-t border-dashed border-gray-150">
                        <button
                          type="button"
                          onClick={() => toggleIncludes(pkg.serviceId)}
                          className="w-full flex items-center justify-between text-left text-[10px] uppercase tracking-wider font-bold text-gray-400 group cursor-pointer hover:text-[#7b581d] transition-colors"
                        >
                          <span className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[14px]">
                              {expandedIncludes[pkg.serviceId] ? 'unfold_less' : 'unfold_more'}
                            </span>
                            Expand offerings
                          </span>
                          <span className={`material-symbols-outlined text-[14px] transition-transform duration-200 ${
                            expandedIncludes[pkg.serviceId] ? 'rotate-180 text-[#7b581d]' : ''
                          }`}>
                            expand_more
                          </span>
                        </button>

                        {expandedIncludes[pkg.serviceId] && (
                          <ul className="space-y-2 mt-3 pl-1 animate-fade-in text-left">
                            {pkg.includes.map((inc, ii) => (
                              <li key={ii} className="flex items-start gap-2 text-[11px] text-gray-650 font-medium font-sans leading-relaxed">
                                <span className="material-symbols-outlined text-xs text-emerald-500 shrink-0 translate-y-[2px]">check</span>
                                <span className="text-left">{inc}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => onOpenConsultation(pkg.serviceId)}
                    className={`w-full py-3.5 rounded-xl font-sans font-bold text-xs uppercase tracking-wider transition-all duration-200 mt-4 cursor-pointer ${
                      pkg.popular
                        ? 'bg-[#EFC07B] text-[#1A1A2E] cta-glow hover:scale-105 active:scale-95'
                        : 'border border-[#001f41] text-[#001f41] hover:bg-[#001f41] hover:text-white'
                    }`}
                  >
                    Secure This Package
                  </button>
                </div>
              ))}
            </div>

            {/* Seamless Visual Divider for Maintenance block */}
            <div className="flex items-center justify-center gap-4 py-4 max-w-4xl mx-auto">
              <div className="h-px bg-gray-200 flex-1"></div>
              <span className="text-[#a08250] font-sans text-[10px] font-bold uppercase tracking-widest px-4">Required Post-Launch Protection</span>
              <div className="h-px bg-gray-200 flex-1"></div>
            </div>

            {/* MONTHLY SUBSCRIPTION HOUSING SECTION ON THE SAME PAGE */}
            <div id="hosting-section" className="max-w-4xl mx-auto glass-panel p-8 md:p-12 rounded-[36px] bg-white border border-gray-150 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#7b581d]/10 px-5 py-2 font-mono text-[9px] text-[#7b581d] font-bold rounded-bl-2xl uppercase tracking-wider">
                Managed Support Ecosystem
              </div>
              <div className="grid md:grid-cols-12 gap-8 items-center pt-3">
                <div className="md:col-span-7 space-y-5">
                  <span className="bg-[#7b581d]/10 text-[#7b581d] font-sans text-[10px] font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full inline-block">
                    🔧 Monthly Hosting &amp; Maintenance
                  </span>
                  <h3 className="font-display text-2xl text-[#001f41] font-extrabold leading-tight">
                    Keep your website live, secure and updated — even if we didn't build it
                  </h3>
                  <p className="text-gray-600 font-sans text-xs leading-relaxed">
                    Whether we hand-crafted your custom website or you're bringing us an existing one, keeping it online, secure, and bug-free requires routine vigilance. We handle server updates, monthly backups, SSL certificates, security checks, and regular copy changes for a flat monthly rate.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-[#7b581d] text-base">verified</span>
                      <span className="font-sans text-[11px] font-semibold text-gray-700">SSL Certificate Managed</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-[#7b581d] text-base">verified</span>
                      <span className="font-sans text-[11px] font-semibold text-gray-700">Monthly Code Backups</span>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-5 bg-gray-50/70 p-6 rounded-[24px] border border-gray-150 flex flex-col justify-between h-full space-y-4">
                  <div>
                    <h4 className="font-sans font-bold text-[#001f41] text-[10px] uppercase tracking-widest font-mono">Flat Rate Protection</h4>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="font-display text-3xl font-extrabold text-[#001f41]">40</span>
                      <span className="font-sans text-xs text-gray-400 font-semibold uppercase">/ month</span>
                    </div>
                  </div>

                  <ul className="space-y-1.5 text-[11px] text-gray-700">
                    <li className="flex items-center gap-2">• Secure cloud server hosting</li>
                    <li className="flex items-center gap-2">• 24/7 technical uptime checks</li>
                    <li className="flex items-center gap-2">• Text content &amp; image swaps</li>
                    <li className="flex items-center gap-2">• Priority customer support</li>
                  </ul>

                  <button
                    onClick={() => onOpenConsultation('Monthly Hosting & Maintenance')}
                    className="w-full bg-[#001f41] text-white py-3 rounded-xl font-sans font-semibold text-[11px] uppercase tracking-wider hover:bg-[#002f5a] transition-all cursor-pointer text-center"
                  >
                    Acquire Managed Hosting
                  </button>
                </div>
              </div>
            </div>

            {/* Maintenance Warning block */}
            <div className="max-w-4xl mx-auto bg-amber-50/40 border border-[#7b581d]/20 rounded-[20px] p-5 flex items-center gap-3">
              <span className="material-symbols-outlined text-[#7b581d] text-lg shrink-0">info</span>
              <p className="font-sans text-[11px] text-gray-600 leading-relaxed text-left">
                <strong>Please Note:</strong> Our Monthly Hosting &amp; Maintenance service is <strong>available for all tiers</strong>. Setting it up avoids steep developer hourly fees down the road and guarantees priority support response.
              </p>
            </div>
          </div>
        )}
        </div>
      </section>
    </div>
  );
}
