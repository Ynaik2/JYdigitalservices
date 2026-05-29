import { useState, useEffect, FormEvent } from 'react';
import { PageType } from './types';
import HomeView from './components/HomeView';
import ServicesView from './components/ServicesView';
import PortfolioView from './components/PortfolioView';
import ContactView from './components/ContactView';
import PricingView from './components/PricingView';

const standardServices = [
  'Basic Website Setup',
  'Plus Website & Leads',
  'Platinum E-Commerce',
  'Monthly Hosting & Maintenance',
  'AI Employee Solutions - Basic',
  'AI Employee Solutions - Advanced',
  'AI Employee Solutions - Platinum',
  'Sales & Marketing Automation - Basic',
  'Sales & Marketing Automation - Advanced',
  'Sales & Marketing Automation - Platinum',
  'Business Operations & Analytics - Basic',
  'Business Operations & Analytics - Advanced',
  'Business Operations & Analytics - Platinum',
  'Brand Identity - Brand Ready',
  'Brand Identity - Brand Enhanced',
  'Brand Identity - Brand Dominance',
  'Promo Merchandise - Starter',
  'Promo Merchandise - Growth',
  'Promo Merchandise - Pro'
];

export default function App() {
  const [activeTab, setActiveTab] = useState<PageType>('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Pricing tab deep-linking state
  const [pricingFilters, setPricingFilters] = useState<{
    category: 'ai' | 'standard' | 'brand';
    sub?: 'employees' | 'marketing' | 'ops' | 'identity' | 'merch';
  } | null>(null);

  // Sync page & pricing tab filters with URL path and query parameters
  useEffect(() => {
    const handleUrlSync = () => {
      const pathname = window.location.pathname;
      const params = new URLSearchParams(window.location.search);
      
      const segments = pathname.split('/').filter(Boolean);
      // Determine page from pathname last segment (supporting base paths like GitHub Pages repos)
      const lastSegment = segments.length > 0 ? segments[segments.length - 1].toLowerCase() : 'home';
      
      const validPages: PageType[] = ['home', 'services', 'portfolio', 'pricing', 'contact'];
      
      let targetPage: PageType = 'home';
      if (validPages.includes(lastSegment as PageType)) {
        targetPage = lastSegment as PageType;
      } else {
        const pageParam = (params.get('page') || params.get('tab'))?.toLowerCase() as PageType | null;
        if (pageParam && validPages.includes(pageParam)) {
          targetPage = pageParam;
        }
      }

      const categoryParam = params.get('category')?.toLowerCase();
      const subParam = (params.get('sub') || params.get('subcategory'))?.toLowerCase();
      const serviceParam = params.get('service')?.toLowerCase();

      if (categoryParam || subParam || serviceParam || targetPage === 'pricing') {
        const allowedCategories: ('ai' | 'standard' | 'brand')[] = ['ai', 'standard', 'brand'];
        const allowedAiSubs: ('employees' | 'marketing' | 'ops')[] = ['employees', 'marketing', 'ops'];
        const allowedBrandSubs: ('identity' | 'merch')[] = ['identity', 'merch'];

        let category: 'ai' | 'standard' | 'brand' = 'ai';
        let sub: any = undefined;

        if (categoryParam && allowedCategories.includes(categoryParam as any)) {
          category = categoryParam as any;
        }

        const targetSub = subParam || serviceParam;
        if (targetSub) {
          if (allowedAiSubs.includes(targetSub as any)) {
            category = 'ai';
            sub = targetSub;
          } else if (allowedBrandSubs.includes(targetSub as any)) {
            category = 'brand';
            sub = targetSub;
          } else if (targetSub === 'website' || targetSub === 'host' || targetSub === 'hosting' || targetSub === 'standard') {
            category = 'standard';
          }
        }

        setPricingFilters({ category, sub });
      } else {
        setPricingFilters(null);
      }

      setActiveTab(targetPage);
    };

    handleUrlSync();

    // Listen to Back/Forward navigation buttons
    window.addEventListener('popstate', handleUrlSync);
    return () => window.removeEventListener('popstate', handleUrlSync);
  }, []);

  const handleSetActiveTab = (tab: PageType, clearPricingFilters = true) => {
    if (clearPricingFilters && tab !== 'pricing') {
      setPricingFilters(null);
    }
    setActiveTab(tab);

    // Update browser URL dynamic path
    const url = new URL(window.location.href);
    const pathSegments = url.pathname.split('/').filter(Boolean);
    const defaultPages = ['home', 'services', 'portfolio', 'pricing', 'contact'];
    
    if (pathSegments.length > 0 && defaultPages.includes(pathSegments[pathSegments.length - 1])) {
      pathSegments.pop();
    }
    
    if (tab !== 'home') {
      pathSegments.push(tab);
    }
    
    url.pathname = '/' + pathSegments.join('/');

    // Clear search query parameters unless we are staying on pricing tab
    if (tab !== 'pricing') {
      url.search = '';
    }

    try {
      window.history.pushState({ tab }, '', url.toString());
    } catch (e) {
      console.warn("History pushstate skipped", e);
    }
  };

  const handleNavigateToPricing = (
    category: 'ai' | 'standard' | 'brand',
    sub?: 'employees' | 'marketing' | 'ops' | 'identity' | 'merch'
  ) => {
    setPricingFilters({ category, sub });
    setActiveTab('pricing');

    const url = new URL(window.location.href);
    const pathSegments = url.pathname.split('/').filter(Boolean);
    const defaultPages = ['home', 'services', 'portfolio', 'pricing', 'contact'];
    
    if (pathSegments.length > 0 && defaultPages.includes(pathSegments[pathSegments.length - 1])) {
      pathSegments.pop();
    }
    pathSegments.push('pricing');
    url.pathname = '/' + pathSegments.join('/');

    url.searchParams.set('category', category);
    if (sub) {
      url.searchParams.set('sub', sub);
    } else {
      url.searchParams.delete('sub');
    }

    try {
      window.history.pushState({ tab: 'pricing' }, '', url.toString());
    } catch (e) {
      console.warn("History pushstate skipped", e);
    }
  };

  // Global project modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalService, setModalService] = useState('');
  const [modalBudget, setModalBudget] = useState('');
  const [modalFullName, setModalFullName] = useState('');
  const [modalEmail, setModalEmail] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalError, setModalError] = useState('');
  const [isModalSubmitting, setIsModalSubmitting] = useState(false);

  // Handle transparent to blurred solid header on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Jump to top of window on page switch
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as any });
    setIsMobileMenuOpen(false);
  }, [activeTab]);

  const handleOpenConsultation = (service = '') => {
    setModalService(service || 'Website Design');
    setModalSuccess(false);
    setModalError('');
    setIsModalOpen(true);
  };

  const handleModalSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!modalFullName.trim()) {
      setModalError('Please enter your full name.');
      return;
    }
    if (!modalEmail.trim() || !modalEmail.includes('@')) {
      setModalError('Please enter a valid email address.');
      return;
    }
    if (!modalMessage.trim()) {
      setModalError('Please enter a brief sentence about your project goals.');
      return;
    }

    setModalError('');
    setIsModalSubmitting(true);

    try {
      const accessKey = (import.meta as any).env.VITE_WEB3FORMS_ACCESS_KEY || "YOUR_ACCESS_KEY_HERE";
      
      const payload = {
        access_key: accessKey,
        name: modalFullName,
        email: modalEmail,
        subject: `New Strategy Call Consultation - ${modalService}`,
        from_name: "JYdigitalservices",
        replyto: modalEmail,
        interestedService: modalService,
        message: modalMessage
      };

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setModalSuccess(true);
      } else {
        setModalError(result.message || "Failed to submit consultation. Please try again later.");
      }
    } catch (error) {
      setModalError("An error occurred while submitting. Please verify your connection.");
      console.error("Web3Forms Modal Submission Error:", error);
    } finally {
      setIsModalSubmitting(false);
    }
  };

  const handleQuickTabRedirect = (tab: PageType) => {
    handleSetActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#faf9fd] text-gray-950 font-sans flex flex-col justify-between selection:bg-[#fdcd86]/60">
      
      {/* Top sticky Navigation Header */}
      <header
        className={`fixed top-0 w-full z-40 transition-all duration-300 border-b ${
          isScrolled
            ? 'bg-white/80 backdrop-blur-md border-gray-200/50 shadow-sm py-3'
            : 'bg-white/40 backdrop-blur-sm border-transparent py-4'
        }`}
      >
        <nav className="flex justify-between items-center px-4 md:px-12 max-w-7xl mx-auto">
          {/* Logo Brand Title */}
          <div
            onClick={() => handleQuickTabRedirect('home')}
            className="font-display text-xl md:text-2xl font-black text-[#001f41] tracking-tight cursor-pointer inline-flex items-center gap-1 hover:opacity-85"
          >
            JYdigitalservices
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8">
            {[
              { id: 'home', label: 'Home' },
              { id: 'services', label: 'Services' },
              { id: 'portfolio', label: 'Portfolio' },
              { id: 'pricing', label: 'Pricing' },
              { id: 'contact', label: 'Contact' },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    handleSetActiveTab(tab.id as PageType, tab.id !== 'pricing');
                  }}
                  className={`relative font-sans text-xs font-bold uppercase tracking-wider py-1 transition-all duration-200 ${
                    isActive
                      ? 'text-[#7b581d] border-b-2 border-[#7b581d]'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Header Action Button */}
          <div className="hidden lg:block">
            <button
              onClick={() => handleOpenConsultation()}
              className="bg-[#001f41] text-white hover:bg-[#0f3460] px-6 py-2.5 rounded-full font-sans text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow hover:scale-105 active:scale-95"
            >
              Start Your Project
            </button>
          </div>

          {/* Mobile Hamburger Menu Toggle Trigger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            type="button"
            className="lg:hidden text-[#001f41] p-1.5 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            <span className="material-symbols-outlined text-3xl">
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </nav>
      </header>

      {/* Mobile Navigation Drawer Panel */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 pt-20 bg-white/95 backdrop-blur-md flex flex-col items-center gap-6 animate-fade-in lg:hidden border-b border-gray-100">
          {[
            { id: 'home', label: 'Home' },
            { id: 'services', label: 'Services' },
            { id: 'portfolio', label: 'Portfolio' },
            { id: 'pricing', label: 'Pricing' },
            { id: 'contact', label: 'Contact' },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  handleSetActiveTab(tab.id as PageType, tab.id !== 'pricing');
                  setIsMobileMenuOpen(false);
                }}
                className={`font-sans text-lg font-bold tracking-wider py-2 transition-all duration-200 ${
                  isActive ? 'text-[#7b581d] border-b-2 border-[#7b581d]' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              handleOpenConsultation();
            }}
            className="w-11/12 max-w-xs mt-4 bg-[#7b581d] text-white py-3.5 rounded-xl text-center font-sans font-bold uppercase tracking-widest text-xs shadow-md"
          >
            Start Your Project
          </button>
        </div>
      )}

      {/* Main Core Router View Wrapper */}
      <main className="flex-grow pt-24">
        {activeTab === 'home' && (
          <HomeView onNavigate={handleSetActiveTab} onOpenConsultation={handleOpenConsultation} />
        )}
        {activeTab === 'services' && (
          <ServicesView
            onNavigate={handleSetActiveTab}
            onNavigateToPricing={handleNavigateToPricing}
            onOpenConsultation={handleOpenConsultation}
          />
        )}
        {activeTab === 'portfolio' && (
          <PortfolioView onNavigate={handleSetActiveTab} onOpenConsultation={handleOpenConsultation} />
        )}
        {activeTab === 'pricing' && (
          <PricingView
            onNavigate={handleSetActiveTab}
            onOpenConsultation={handleOpenConsultation}
            preselectedCategory={pricingFilters?.category}
            preselectedAiSub={pricingFilters?.sub as any}
            preselectedBrandSub={pricingFilters?.sub as any}
          />
        )}

        {activeTab === 'contact' && (
          <ContactView
            onNavigate={handleSetActiveTab}
            preselectedService={modalService}
            preselectedBudget={modalBudget}
          />
        )}
      </main>

      {/* Dynamic global Action modal dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[#001f41]/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white/95 border border-gray-100 p-8 rounded-[32px] max-w-lg w-full shadow-2xl relative animate-slide-up">
            
            {/* Close modal button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-700 p-1 rounded-full cursor-pointer"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            {modalSuccess ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto animate-bounce mb-2">
                  <span className="material-symbols-outlined text-3xl">check</span>
                </div>
                <h3 className="font-display text-2xl font-extrabold text-[#001f41]">Consultation Initiated!</h3>
                <p className="font-sans text-xs text-gray-500">
                  Thanks <strong>{modalFullName}</strong>! We've preselected the <strong>{modalService}</strong> for you. Our team will read your goals and contact you at <strong>{modalEmail}</strong> shortly.
                </p>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-full bg-[#001f41] text-white py-3 rounded-xl font-sans font-bold text-xs hover:bg-[#01264c] transition-all"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleModalSubmit} className="space-y-4">
                <h3 className="font-display text-xl font-black text-[#001f41] mb-1">
                  Connect with JYdigitalservices
                </h3>
                <p className="text-xs text-gray-500 font-medium">
                  Provide a brief goal outline, and our tech leads will coordinate a live project strategy call with you.
                </p>

                {modalError && (
                  <div className="bg-red-50 text-red-500 p-3 rounded-xl text-xs font-semibold flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-base">error</span>
                    {modalError}
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Full Name</label>
                  <input
                    type="text"
                    value={modalFullName}
                    onChange={(e) => setModalFullName(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-1 focus:ring-[#001f41]"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Email Address</label>
                  <input
                    type="email"
                    value={modalEmail}
                    onChange={(e) => setModalEmail(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-1 focus:ring-[#001f41]"
                    placeholder="john@example.com"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Desired Service</label>
                  <select
                    value={modalService}
                    onChange={(e) => setModalService(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-1 focus:ring-[#001f41]"
                  >
                    <option value="">Select a service</option>
                    {modalService && !standardServices.includes(modalService) && (
                      <option value={modalService}>{modalService}</option>
                    )}
                    <optgroup label="Website Design & Hosting">
                      <option value="Basic Website Setup">Basic Website Setup</option>
                      <option value="Plus Website & Leads">Plus Website &amp; Leads</option>
                      <option value="Platinum E-Commerce">Platinum E-Commerce</option>
                      <option value="Monthly Hosting & Maintenance">Monthly Hosting &amp; Maintenance</option>
                    </optgroup>
                    <optgroup label="AI Employee Solutions">
                      <option value="AI Employee Solutions - Basic">AI Employee - Basic</option>
                      <option value="AI Employee Solutions - Advanced">AI Employee - Advanced</option>
                      <option value="AI Employee Solutions - Platinum">AI Employee - Platinum</option>
                    </optgroup>
                    <optgroup label="Sales & Marketing Automation">
                      <option value="Sales & Marketing Automation - Basic">Marketing Automation - Basic</option>
                      <option value="Sales & Marketing Automation - Advanced">Marketing Automation - Advanced</option>
                      <option value="Sales & Marketing Automation - Platinum">Marketing Automation - Platinum</option>
                    </optgroup>
                    <optgroup label="Business Operations & Analytics">
                      <option value="Business Operations & Analytics - Basic">Business Ops &amp; Analytics - Basic</option>
                      <option value="Business Operations & Analytics - Advanced">Business Ops &amp; Analytics - Advanced</option>
                      <option value="Business Operations & Analytics - Platinum">Business Ops &amp; Analytics - Platinum</option>
                    </optgroup>
                    <optgroup label="Branding & Visual Identity">
                      <option value="Brand Identity - Brand Ready">Brand Ready Identity</option>
                      <option value="Brand Identity - Brand Enhanced">Brand Enhanced Identity</option>
                      <option value="Brand Identity - Brand Dominance">Brand Dominance System</option>
                    </optgroup>
                    <optgroup label="Promotional Merchandise (POD)">
                      <option value="Promo Merchandise - Starter">Starter — "Print-Ready Kit"</option>
                      <option value="Promo Merchandise - Growth">Growth — "Merch Collection Package"</option>
                      <option value="Promo Merchandise - Pro">Pro — "Full Merch Brand System"</option>
                    </optgroup>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Your Project Goals</label>
                  <textarea
                    value={modalMessage}
                    onChange={(e) => setModalMessage(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-1 focus:ring-[#001f41]"
                    placeholder="e.g. Scaling checkout conversions, automated custom service bot, etc."
                    rows={3}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isModalSubmitting}
                  className={`w-full py-4 rounded-xl font-sans font-bold uppercase tracking-widest text-[#1a1c1f] bg-[#EFC07B] text-xs transition-all cursor-pointer ${
                    isModalSubmitting ? 'opacity-60 cursor-not-allowed' : 'hover:shadow-lg'
                  }`}
                >
                  {isModalSubmitting ? 'Sending...' : 'Initialize Consultation'}
                </button>
              </form>
            )}

          </div>
        </div>
      )}

      {/* Premium Footer */}
      <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 md:px-12 flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
          <div className="space-y-4">
            <div
              onClick={() => handleQuickTabRedirect('home')}
              className="font-display text-xl md:text-2xl font-black text-[#001f41] tracking-tight cursor-pointer hover:opacity-85"
            >
              JYdigitalservices
            </div>
          </div>

          <div className="md:text-right">
            <h4 className="font-sans font-extrabold text-[#001f41] text-xs uppercase tracking-widest mb-4">Contact Info</h4>
            <p className="text-[#001f41] text-sm font-bold mb-3 break-words">
              Jydigitalservices@gmail.com
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-12 py-6 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-center">
          <p className="text-gray-400 text-[11px] font-medium uppercase tracking-wider">
            © 2026 JYdigitalservices. All rights reserved.
          </p>
          <div className="flex gap-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            <span className="hover:text-gray-600 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-gray-600 cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
