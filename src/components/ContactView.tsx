import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { PageType, ProjectFormData } from '../types';

interface ContactViewProps {
  onNavigate: (page: PageType) => void;
  preselectedService?: string;
  preselectedBudget?: string;
}

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

export default function ContactView({ onNavigate, preselectedService = '', preselectedBudget = '' }: ContactViewProps) {
  const [formData, setFormData] = useState<ProjectFormData>({
    fullName: '',
    email: '',
    businessName: '',
    interestedService: 'Select a service',
    budget: '',
    message: ''
  });

  const [formError, setFormError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync preselected data if passed
  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({
        ...prev,
        interestedService: preselectedService
      }));
    }
  }, [preselectedService]);

  // Frequently Asked Questions State
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const toggleFaq = (faqId: string) => {
    setOpenFaq(openFaq === faqId ? null : faqId);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    setFormError('');
  };

  const handleBudgetChange = (amount: string) => {
    setFormData((prev) => ({
      ...prev,
      budget: amount
    }));
    setFormError('');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Quick validation
    if (!formData.fullName.trim()) {
      setFormError('Please enter your full name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setFormError('Please enter a valid email address.');
      return;
    }
    if (formData.interestedService === 'Select a service') {
      setFormError('Please select an interested service.');
      return;
    }
    if (!formData.message.trim()) {
      setFormError('Please add a brief sentence about your project.');
      return;
    }

    setFormError('');
    setIsSubmitting(true);

    try {
      const accessKey = (import.meta as any).env.VITE_WEB3FORMS_ACCESS_KEY || "YOUR_ACCESS_KEY_HERE";
      
      const payload = {
        access_key: accessKey,
        name: formData.fullName,
        email: formData.email,
        subject: `New Project Brief - ${formData.interestedService}`,
        from_name: "JYdigitalservices",
        replyto: formData.email,
        businessName: formData.businessName,
        interestedService: formData.interestedService,
        message: formData.message
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
        setIsSubmitted(true);
      } else {
        setFormError(result.message || "Failed to submit the form via Web3Forms. Please check your access key or try again later.");
      }
    } catch (error) {
      setFormError("An error occurred while submitting the form. Please check your connection and try again.");
      console.error("Web3Forms Submission Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqs = [
    {
      id: 'faq-1',
      question: 'What is the typical project timeline?',
      answer: 'Most projects range from 4 to 12 weeks depending on complexity. Small websites or brand refreshes take less time, while complex e-commerce or custom software solutions require deep discovery and testing phases.'
    },
    {
      id: 'faq-2',
      question: 'How many revisions do I get?',
      answer: 'We typically include two major rounds of revisions in our standard contracts. This ensures we stay on schedule while allowing for your feedback to be fully integrated into the final product.'
    },
    {
      id: 'faq-3',
      question: 'Can you build custom AI chatbots?',
      answer: 'Absolutely. We specialize in integrating advanced AI models tailored to your specific business data. Our chatbots can handle customer support, lead qualification, and even complex internal automation tasks.'
    },
    {
      id: 'faq-4',
      question: 'Do you offer full brand identity services?',
      answer: 'Yes, our creative team handles everything from logo design and color palettes to typography systems and brand voice guidelines. We ensure your brand feels cohesive across all digital and physical touchpoints.'
    },
    {
      id: 'faq-5',
      question: 'Can you design merchandise and print assets?',
      answer: 'While we are digital-first, we provide print-ready designs for merchandise, packaging, and business collateral as part of our branding packages or as standalone design projects.'
    }
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <header className="pt-16 pb-10 px-4 md:px-12 max-w-7xl mx-auto text-center">
        <h1 className="font-display text-4xl md:text-5xl text-[#001f41] font-extrabold mb-4 leading-tight">
          Let's Build Something Amazing
        </h1>
        <p className="font-sans text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Tell us about your project, your goals, and your vision. We're here to turn your digital dreams into high-performance reality.
        </p>
      </header>

      {/* Main Contact Section */}
      <section className="py-10 px-4 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left info column */}
          <div className="lg:col-span-4 space-y-6">
            <div className="glass-panel p-8 rounded-[24px] shadow-sm flex flex-col justify-between border border-gray-100">
              <div>
                <h2 className="font-display text-2xl text-[#001f41] font-bold mb-6">Get in Touch</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4 group cursor-pointer">
                    <div className="p-3.5 rounded-xl bg-[#001f41]/10 text-[#001f41] group-hover:bg-[#001f41] group-hover:text-white transition-all duration-300">
                      <span className="material-symbols-outlined text-xl">mail</span>
                    </div>
                    <div>
                      <p className="font-sans font-semibold text-xs text-gray-400 uppercase tracking-wider mb-1">Email Us</p>
                      <p className="font-sans font-bold text-[#001f41] hover:underline break-all block">Jydigitalservices@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right form column */}
          <div className="lg:col-span-8">
            <div className="glass-panel p-8 md:p-12 rounded-[24px] shadow-sm border border-gray-100">
              
              {isSubmitted ? (
                <div className="py-12 text-center space-y-6">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                    <span className="material-symbols-outlined text-4xl">check_circle</span>
                  </div>
                  <h3 className="font-display text-3xl text-[#001f41] font-extrabold">Brief Submitted Successfully!</h3>
                  <p className="font-sans text-gray-600 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong>{formData.fullName}</strong>. We have received your request for <strong>{formData.interestedService}</strong>. Our lead consultant will reach out via <strong>{formData.email}</strong> shortly.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        fullName: '',
                        email: '',
                        businessName: '',
                        interestedService: 'Select a service',
                        budget: '',
                        message: ''
                      });
                    }}
                    className="bg-[#001f41] text-white px-8 py-3 rounded-xl font-sans font-bold hover:bg-[#002f5a] transition-all"
                  >
                    Submit Another Brief
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {formError && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl text-xs font-semibold flex items-center gap-2">
                      <span className="material-symbols-outlined text-lg">error</span>
                      {formError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="font-sans font-bold text-xs text-gray-500 uppercase tracking-wider block">Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full bg-[#faf9fd] border border-gray-200 focus:border-[#001f41] focus:ring-1 focus:ring-[#001f41] rounded-xl px-4 py-3 transition-all duration-200 text-sm outline-none text-gray-800"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="font-sans font-bold text-xs text-gray-500 uppercase tracking-wider block">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-[#faf9fd] border border-gray-200 focus:border-[#001f41] focus:ring-1 focus:ring-[#001f41] rounded-xl px-4 py-3 transition-all duration-200 text-sm outline-none text-gray-800"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="font-sans font-bold text-xs text-gray-500 uppercase tracking-wider block">Business Name</label>
                      <input
                        type="text"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleInputChange}
                        className="w-full bg-[#faf9fd] border border-gray-200 focus:border-[#001f41] focus:ring-1 focus:ring-[#001f41] rounded-xl px-4 py-3 transition-all duration-200 text-sm outline-none text-gray-800"
                        placeholder="Enter your business name (optional)"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="font-sans font-bold text-xs text-gray-500 uppercase tracking-wider block">Interested Service</label>
                      <select
                        name="interestedService"
                        value={formData.interestedService}
                        onChange={handleInputChange}
                        className="w-full bg-[#faf9fd] border border-gray-200 focus:border-[#001f41] focus:ring-1 focus:ring-[#001f41] rounded-xl px-4 py-3 transition-all duration-200 text-sm outline-none text-gray-800"
                      >
                        <option value="Select a service">Select a service</option>
                        {formData.interestedService !== 'Select a service' && !standardServices.includes(formData.interestedService) && (
                          <option value={formData.interestedService}>
                            {formData.interestedService}
                          </option>
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
                  </div>

                  <div className="space-y-2">
                    <label className="font-sans font-bold text-xs text-gray-500 uppercase tracking-wider block">Project Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full bg-[#faf9fd] border border-gray-200 focus:border-[#001f41] focus:ring-1 focus:ring-[#001f41] rounded-xl px-4 py-3 transition-all duration-200 text-sm outline-none text-gray-800"
                      placeholder="Tell us about your goals, timelines, or integration wishes..."
                      rows={4}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full md:w-auto px-10 py-4 rounded-xl font-sans font-bold uppercase tracking-widest text-[#1A1A2E] bg-[#EFC07B] transition-all duration-200 text-xs text-center cursor-pointer ${
                      isSubmitting ? 'opacity-60 cursor-not-allowed' : 'hover:shadow-[0px_0px_20px_rgba(239,192,123,0.5)]'
                    }`}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Brief'}
                  </button>
                </form>
              )}

            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions Section */}
      <section className="py-24 px-4 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-5xl text-[#001f41] font-bold mb-4">Frequently Asked Questions</h2>
          <p className="font-sans text-lg text-gray-600">Everything you need to know about starting your project with us.</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq) => {
            const isOpen = openFaq === faq.id;
            return (
              <div key={faq.id} className="glass-panel rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/40 transition-colors duration-200"
                >
                  <span className="font-display text-base md:text-lg font-bold text-[#001f41]">{faq.question}</span>
                  <span
                    className={`material-symbols-outlined text-[#001f41] transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : 'rotate-0'
                    }`}
                  >
                    expand_more
                  </span>
                </button>
                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    isOpen ? 'max-h-52 opacity-100 border-t border-gray-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 py-5 font-sans text-sm text-gray-600 leading-relaxed bg-white/10">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
