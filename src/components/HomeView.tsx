import { PageType } from '../types';

interface HomeViewProps {
  onNavigate: (page: PageType) => void;
  onOpenConsultation: (service?: string, budget?: string) => void;
}

export default function HomeView({ onNavigate, onOpenConsultation }: HomeViewProps) {

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative hero-gradient pt-16 pb-24 px-4 md:px-12 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="z-10 text-center lg:text-left">
            <h1 className="font-display text-4xl md:text-6xl text-[#001f41] mb-6 font-extrabold leading-tight tracking-tight">
              Modern Websites, AI Solutions &amp; Branding for Growing Businesses
            </h1>
            <p className="font-sans text-lg text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              We build high-converting websites, AI chatbots, logos, and merch to help your business grow online — fast and affordably.
            </p>
          </div>

          <div className="relative mt-8 lg:mt-0 hidden lg:flex justify-center">
            {/* Mockup Container */}
            <div className="relative w-full max-w-lg z-0">
              <img
                alt="Website Mockup"
                className="rounded-xl soft-lift w-full h-auto border border-gray-100"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBk5Y3O6T84e1B6OZjVv0bJjdSv0hm1dufa6t481avgFxjUvdPzM9YJExi1ELtSgmrLoBruC2l_4XA7ru-OqMtdlv1vvpaqfZUt3axIdXzBv2ooN79KEX-Y6tiZvzjI-HlXEaz7L38aTXAM4_yESfLnM7nxQnZeTqre-8SksKgQApNq_1-X-Tmw8PcqZiU7R3KJNyskgglhwkQuFmz54a8fhFwRpEPOaLCJwV7Ez1_Qz8hlvFLAkNj-LhAbeJtrYdRjMEFoU1gkPxOY"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid Preview */}
      <section className="py-24 bg-white" id="services">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
            <div>
              <h2 className="font-display text-3xl md:text-5xl text-[#001f41] font-bold mb-4">Expert Services</h2>
              <p className="font-sans text-lg text-gray-600 max-w-2xl">
                Custom digital solutions tailored for your business needs.
              </p>
            </div>
            <div>
              <button
                onClick={() => onNavigate('services')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#001f41]/5 text-[#001f41] hover:bg-[#7b581d] hover:text-white font-sans text-sm font-bold transition-all duration-300 group/all cursor-pointer whitespace-nowrap"
              >
                See All Services
                <span className="material-symbols-outlined text-lg transition-transform duration-300 group-hover/all:translate-x-1.5">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div
              onClick={() => onNavigate('services')}
              className="glass-panel p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300 group cursor-pointer hover:border-[#EFC07B] shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-xl bg-blue-50 text-[#001f41] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#001f41] group-hover:text-white transition-all duration-300">
                  <span className="material-symbols-outlined text-2xl">desktop_windows</span>
                </div>
                <h3 className="font-display text-xl text-[#001f41] mb-3 font-bold">Website Design</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  Custom-crafted, lightning-fast interfaces designed to turn traffic into paying users.
                </p>
              </div>
              <div className="inline-flex items-center gap-1 text-xs text-[#7b581d] font-semibold">
                <span className="group-hover:underline">
                  Learn more
                </span>
                <span className="material-symbols-outlined text-sm">
                  arrow_forward
                </span>
              </div>
            </div>

            {/* Service 2 */}
            <div
              onClick={() => onNavigate('services')}
              className="glass-panel p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300 group cursor-pointer hover:border-[#EFC07B] shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-indigo-750 group-hover:text-white transition-all duration-300">
                  <span className="material-symbols-outlined text-2xl">dns</span>
                </div>
                <h3 className="font-display text-xl text-[#001f41] mb-3 font-bold">Web Hosting</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  Secure, high-availability deployments, custom domain setup, routing & maintenance.
                </p>
              </div>
              <div className="inline-flex items-center gap-1 text-xs text-[#7b581d] font-semibold">
                <span className="group-hover:underline">
                  Learn more
                </span>
                <span className="material-symbols-outlined text-sm">
                  arrow_forward
                </span>
              </div>
            </div>

            {/* Service 3 */}
            <div
              onClick={() => onNavigate('services')}
              className="glass-panel p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300 group cursor-pointer hover:border-[#EFC07B] shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-xl bg-amber-50 text-[#7b581d] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#7b581d] group-hover:text-white transition-all duration-300">
                  <span className="material-symbols-outlined text-2xl">smart_toy</span>
                </div>
                <h3 className="font-display text-xl text-[#001f41] mb-3 font-bold">AI Employees</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  Highly trained conversational agents working 24/7 to pre-qualify and capture leads.
                </p>
              </div>
              <div className="inline-flex items-center gap-1 text-xs text-[#7b581d] font-semibold">
                <span className="group-hover:underline">
                  Learn more
                </span>
                <span className="material-symbols-outlined text-sm">
                  arrow_forward
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Chatbot Detail Section */}
      <section className="py-24 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="glass-panel p-8 rounded-[32px] soft-lift border border-white max-w-md mx-auto relative z-10 shadow-lg">
              <div className="flex items-center gap-4 mb-6 border-b border-gray-100 pb-4">
                <div className="w-12 h-12 rounded-full bg-[#001f41] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-white text-xl">robot_2</span>
                </div>
                <div>
                  <h4 className="font-display text-lg font-bold text-[#001f41]">Business Assistant</h4>
                  <p className="text-xs text-[#7b581d] font-medium uppercase tracking-wider">AI Automated</p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 p-3.5 rounded-2xl rounded-tl-none text-sm max-w-[85%] leading-relaxed">
                    Hello! How can I help grow your business today?
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-[#001f41] text-white p-3.5 rounded-2xl rounded-tr-none text-sm max-w-[85%] leading-relaxed">
                    I need more leads from my website.
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 p-3.5 rounded-2xl rounded-tl-none text-sm max-w-[85%] leading-relaxed">
                    I can set up an automated lead capture system. Should we start with a survey or direct integration?
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <div
                  className="flex-1 bg-white border border-gray-200 rounded-full px-4 text-sm py-2.5 text-gray-800 select-none cursor-default truncate flex items-center"
                >
                  Interactive assistant chat box
                </div>
                <div
                  className="w-11 h-11 rounded-full bg-[#001f41] text-white flex items-center justify-center shrink-0 shadow hover:bg-[#002f5a] transition-all"
                >
                  <span className="material-symbols-outlined">send</span>
                </div>
              </div>
            </div>

            {/* Decorative glows */}
            <div className="absolute -top-16 -left-16 w-64 h-64 bg-[#001f41]/5 blur-[80px] rounded-full pointer-events-none"></div>
            <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-[#7b581d]/5 blur-[80px] rounded-full pointer-events-none"></div>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="font-display text-3xl md:text-5xl text-[#001f41] font-bold mb-6">
              Intelligent Automation
            </h2>
            <p className="font-sans text-lg text-gray-600 mb-8 leading-relaxed">
              Stop losing potential customers because you're busy. Our AI chatbots handle inquiries 24/7, booking appointments and capturing leads while you sleep.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#7b581d] text-xl">check_circle</span>
                <span className="font-sans text-[#001f41] font-semibold">24/7 AI Customer Support</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#7b581d] text-xl">check_circle</span>
                <span className="font-sans text-[#001f41] font-semibold">Lead Gen Automation Briefings</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#7b581d] text-xl">check_circle</span>
                <span className="font-sans text-[#001f41] font-semibold">Seamless CRM &amp; App Integration</span>
              </li>
            </ul>
            <button
              onClick={() => onOpenConsultation('AI Chatbot')}
              className="bg-[#001f41] text-white px-8 py-3.5 rounded-lg font-sans font-bold hover:bg-[#002f5a] shadow hover:scale-105 active:scale-95 transition-all"
            >
              Get AI Consultation
            </button>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-24 bg-white" id="portfolio">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
            <div>
              <h2 className="font-display text-3xl md:text-5xl text-[#001f41] font-bold mb-4">Our Latest Work</h2>
              <p className="font-sans text-lg text-gray-600 max-w-xl">
                A glimpse into how we transform businesses through digital excellence.
              </p>
            </div>
            <button
              onClick={() => onNavigate('portfolio')}
              className="text-[#001f41] font-sans font-bold flex items-center gap-2 group hover:underline"
            >
              View All Projects{' '}
              <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
                arrow_forward
              </span>
            </button>
          </div>

          <div className="flex justify-center">
            {/* Project Card */}
            <div className="group max-w-4xl w-full glass-panel rounded-[24px] overflow-hidden hover:border-[#7b581d]/30 transition-all duration-300 shadow-sm flex flex-col md:flex-row items-stretch">
              <div className="relative overflow-hidden w-full md:w-2/5 aspect-[16/10] md:aspect-auto bg-gray-50">
                <img
                  alt="Yashas Naik Portfolio"
                  className="w-full h-full object-cover transition-transform duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFRXASRRVZE4IoaTnD1G-8RdRI2MMpSH9SC85D3pejap3HLmDFnGjaAUdYuqgsPq4He5NX8ik2QaOTg5K4txP_iHipVYe1StVJvSiIrTeLErHEe0APYGm_vGPvWtKp1ZKBwnV9hQnlHwYR6bW4ANBCGx6pzzgoW8xzFGpTZa6ojBmnC0MLZzrowUmFDug00LVQH3spTOXRks-8ztHVwZiEIcv52VwmyAVzpM5dC_Tkg5Y2oq61os-A_mGtpOj_mnpZdGjyL5NltJpp"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-[#001f41]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
              
              <div className="p-8 text-left flex flex-col justify-center w-full md:w-3/5">
                <a
                  href="https://yashasnaik.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-display text-xl text-[#001f41] font-bold mb-4 hover:text-[#7b581d] transition-colors cursor-pointer"
                >
                  Yashas Naik Portfolio
                  <span className="material-symbols-outlined text-[16px] text-[#7b581d] opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-[-1px]">
                    open_in_new
                  </span>
                </a>
                <p className="text-gray-600 font-sans text-sm leading-relaxed">
                  A dynamic, high-performance personal developer portfolio showcasing modern design excellence, deep technical integrations, and fluid user interactions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-gray-50 border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-5xl text-[#001f41] font-bold mb-4">Why Choose JY</h2>
            <p className="font-sans text-lg text-gray-600 max-w-2xl mx-auto">
              We combine technical elite-level execution with creative flair.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8">
            <div className="flex items-start gap-4">
              <div className="text-[#7b581d] shrink-0 bg-[#7b581d]/10 p-3 rounded-2xl">
                <span className="material-symbols-outlined text-3xl">bolt</span>
              </div>
              <div>
                <h4 className="font-display text-xl text-[#001f41] mb-2 font-bold">Fast Delivery</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  We value your time. Our streamlined process ensures rapid project turnaround.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="text-[#7b581d] shrink-0 bg-[#7b581d]/10 p-3 rounded-2xl">
                <span className="material-symbols-outlined text-3xl">precision_manufacturing</span>
              </div>
              <div>
                <h4 className="font-display text-xl text-[#001f41] mb-2 font-bold">AI-Powered</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Leverage the latest artificial intelligence for smarter business automation.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="text-[#7b581d] shrink-0 bg-[#7b581d]/10 p-3 rounded-2xl">
                <span className="material-symbols-outlined text-3xl">payments</span>
              </div>
              <div>
                <h4 className="font-display text-xl text-[#001f41] mb-2 font-bold">Affordable Price</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Premium quality digital services at prices that make sense for small businesses.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="text-[#7b581d] shrink-0 bg-[#7b581d]/10 p-3 rounded-2xl">
                <span className="material-symbols-outlined text-3xl">smartphone</span>
              </div>
              <div>
                <h4 className="font-display text-xl text-[#001f41] mb-2 font-bold">Mobile Optimized</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Every design is crafted to look perfect on devices of all screen sizes.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="text-[#7b581d] shrink-0 bg-[#7b581d]/10 p-3 rounded-2xl">
                <span className="material-symbols-outlined text-3xl">rocket_launch</span>
              </div>
              <div>
                <h4 className="font-display text-xl text-[#001f41] mb-2 font-bold">Modern Aesthetic</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Stay ahead of the curve with contemporary, clean, and professional designs.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="text-[#7b581d] shrink-0 bg-[#7b581d]/10 p-3 rounded-2xl">
                <span className="material-symbols-outlined text-3xl">support_agent</span>
              </div>
              <div>
                <h4 className="font-display text-xl text-[#001f41] mb-2 font-bold">Expert Support</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  We're here when you need us with reliable support and expert advice.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-white" id="pricing">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-5xl text-[#001f41] font-bold mb-4">Simple Pricing</h2>
            <p className="font-sans text-lg text-gray-600 max-w-2xl mx-auto">
              Choose the plan that's right for your business growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Basic Plan */}
            <div className="glass-panel p-8 rounded-3xl flex flex-col soft-lift shadow-sm border border-gray-100 hover:border-[#7b581d]/30 transition-all duration-300">
              <h3 className="font-display text-2xl text-[#001f41] font-bold mb-2">Basic</h3>
              <div className="mb-6">
                <span className="text-4xl font-extrabold text-[#001f41]">$250</span>
                <span className="text-gray-500 font-medium ml-1">Flat Rate</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="material-symbols-outlined text-[#7b581d] text-lg">check</span> 3 page website
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="material-symbols-outlined text-[#7b581d] text-lg">check</span> Custom domain setup
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="material-symbols-outlined text-[#7b581d] text-lg">check</span> Mobile responsive design
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="material-symbols-outlined text-[#7b581d] text-lg">check</span> 1 design and layout revisions
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="material-symbols-outlined text-[#7b581d] text-lg">check</span> Standard support
                </li>
              </ul>
              <button
                onClick={() => onOpenConsultation('Basic Web Package', '$250')}
                className="w-full py-3.5 rounded-xl border border-[#001f41] text-[#001f41] font-sans font-bold hover:bg-[#001f41] hover:text-white transition-all duration-200"
              >
                Choose Basic
              </button>
            </div>

            {/* Plus Plan */}
            <div className="bg-white border-2 border-[#7b581d] p-8 rounded-3xl flex flex-col soft-lift relative md:-translate-y-2 z-10 shadow-md">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#7b581d] text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest whitespace-nowrap">
                Most Popular
              </div>
              <h3 className="font-display text-2xl text-[#001f41] font-bold mb-2 mt-2">Plus</h3>
              <div className="mb-6">
                <span className="text-4xl font-extrabold text-[#001f41]">$500</span>
                <span className="text-gray-500 font-medium ml-1">Flat Rate</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-2 text-sm text-gray-800 font-medium">
                  <span className="material-symbols-outlined text-[#7b581d] text-lg">check</span> Everything in Basic, plus:
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="material-symbols-outlined text-[#7b581d] text-lg">check</span> Contact or quote forms
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="material-symbols-outlined text-[#7b581d] text-lg">check</span> Google Analytics installed
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="material-symbols-outlined text-[#7b581d] text-lg">check</span> Basic SEO setup
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="material-symbols-outlined text-[#7b581d] text-lg">check</span> Cookie consent banner
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="material-symbols-outlined text-[#7b581d] text-lg">check</span> 2 design and layout revisions
                </li>
              </ul>
              <button
                onClick={() => onOpenConsultation('Plus Web Package', '$500')}
                className="w-full py-3.5 rounded-xl bg-[#001f41] text-white font-sans font-bold hover:bg-[#002f5a] shadow-lg transition-all duration-200"
              >
                Choose Plus
              </button>
            </div>

            {/* Platinum Plan */}
            <div className="glass-panel p-8 rounded-3xl flex flex-col soft-lift shadow-sm border border-gray-100 hover:border-[#7b581d]/30 transition-all duration-300">
              <h3 className="font-display text-2xl text-[#001f41] font-bold mb-2">Platinum</h3>
              <div className="mb-6">
                <span className="text-4xl font-extrabold text-[#001f41]">$1,200</span>
                <span className="text-gray-500 font-medium ml-1">Flat Rate</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="material-symbols-outlined text-[#7b581d] text-lg">check</span> Everything in Plus, plus:
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="material-symbols-outlined text-[#7b581d] text-lg">check</span> Up to 10 pages
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="material-symbols-outlined text-[#7b581d] text-lg">check</span> Online store / e-commerce
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="material-symbols-outlined text-[#7b581d] text-lg">check</span> Booking &amp; appointment setup
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="material-symbols-outlined text-[#7b581d] text-lg">check</span> WhatsApp chat button
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="material-symbols-outlined text-[#7b581d] text-lg">check</span> 3 design and layout revisions
                </li>
              </ul>
              <button
                onClick={() => onOpenConsultation('Platinum Web Package', '$1,200')}
                className="w-full py-3.5 rounded-xl border border-[#001f41] text-[#001f41] font-sans font-bold hover:bg-[#001f41] hover:text-white transition-all duration-200"
              >
                Choose Platinum
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* Final CTA Banner */}
      <section className="py-24 bg-[#001f41] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(213,227,255,1),transparent)]"></div>
        </div>
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <h2 className="font-display text-3xl md:text-5xl text-white font-extrabold mb-6 leading-tight">
            Ready to Upgrade Your Business Online?
          </h2>
          <p className="font-sans text-blue-100 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Join dozens of successful businesses who have scaled their growth with JYdigitalservices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onOpenConsultation()}
              className="bg-[#EFC07B] text-[#1A1A2E] px-8 py-4 rounded-xl font-sans font-bold cta-glow shadow-lg hover:scale-105 transition-all duration-200"
            >
              Start Your Project
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-sans font-semibold hover:bg-white hover:text-[#001f41] transition-all duration-200"
            >
              Book a Free Consultation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
