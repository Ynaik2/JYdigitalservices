import { useState } from 'react';
import { PageType } from '../types';

interface PortfolioViewProps {
  onNavigate: (page: PageType) => void;
  onOpenConsultation: (service?: string) => void;
}

interface PortfolioItem {
  title: string;
  category: string; // 'web' | 'branding' | 'ai' | 'merch' | 'ui'
  categoryLabel: string;
  image: string;
  alt: string;
  description: string;
  link?: string;
}

export default function PortfolioView({ onNavigate, onOpenConsultation }: PortfolioViewProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'web' | 'ai' | 'branding' | 'merch'>('all');

  const portfolioItems: PortfolioItem[] = [
    {
      title: 'Yashas Naik Portfolio',
      category: 'web',
      categoryLabel: 'Featured Live Project',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFRXASRRVZE4IoaTnD1G-8RdRI2MMpSH9SC85D3pejap3HLmDFnGjaAUdYuqgsPq4He5NX8ik2QaOTg5K4txP_iHipVYe1StVJvSiIrTeLErHEe0APYGm_vGPvWtKp1ZKBwnV9hQnlHwYR6bW4ANBCGx6pzzgoW8xzFGpTZa6ojBmnC0MLZzrowUmFDug00LVQH3spTOXRks-8ztHVwZiEIcv52VwmyAVzpM5dC_Tkg5Y2oq61os-A_mGtpOj_mnpZdGjyL5NltJpp',
      alt: 'Yashas Naik Personal Portfolio Site',
      description: 'A dynamic, high-performance personal developer portfolio showcasing modern design excellence, deep technical integrations, and fluid user interactions.',
      link: 'https://yashasnaik.vercel.app/'
    }
  ];

  const filteredItems = activeFilter === 'all'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeFilter);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4 md:px-12 max-w-7xl mx-auto text-center">
        <h1 className="font-display text-4xl md:text-6xl text-[#001f41] font-extrabold mb-6 leading-tight tracking-tight">
          Crafting <span className="text-[#7b581d]">Digital Excellence</span>
        </h1>
        <p className="font-sans text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Explore our curated selection of high-impact digital solutions, from immersive web experiences to intelligent AI chatbots.
        </p>
      </section>

      {/* Interactive Category Filter Menu */}
      <section className="px-4 md:px-12 max-w-7xl mx-auto mb-12">
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 border-b border-gray-100 pb-6">
          {[
            { id: 'all', label: 'All Projects' },
            { id: 'web', label: 'Websites & Apps' },
            { id: 'ai', label: 'AI Chatbots' },
            { id: 'branding', label: 'Branding Assets' },
            { id: 'merch', label: 'Merchandise' },
          ].map(btn => (
            <button
              key={btn.id}
              onClick={() => setActiveFilter(btn.id as any)}
              className={`px-5 py-2.5 rounded-full font-sans text-xs font-bold uppercase tracking-wider transition-all duration-200 active:scale-95 ${
                activeFilter === btn.id
                  ? 'bg-[#001f41] text-white shadow'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </section>

      {/* Portfolio Gallery Grid */}
      <section className="pb-24 px-4 md:px-12 max-w-7xl mx-auto">
        {filteredItems.length === 0 ? (
          <div className="max-w-2xl mx-auto glass-panel p-12 md:p-16 rounded-[32px] text-center border-dashed border-[#7b581d]/30 bg-amber-50/10">
            <span className="material-symbols-outlined text-4xl text-[#7b581d] mb-4">
              construction
            </span>
            <p className="font-sans text-gray-600 text-base md:text-lg leading-relaxed">
              We’re currently building our first client projects. Check back soon to see real work.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item, index) => (
              <div
                key={index}
                className="glass-panel rounded-[24px] overflow-hidden group hover:border-[#7b581d]/30 transition-all duration-300 shadow-sm flex flex-col justify-between"
              >
                <div className="relative overflow-hidden aspect-[4/3] bg-gray-50">
                  <img
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500"
                    src={item.image}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-[#001f41]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
                
                <div className="p-8">
                  {item.link ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-display text-xl text-[#001f41] font-bold mb-4 hover:text-[#7b581d] transition-colors cursor-pointer"
                    >
                      {item.title}
                      <span className="material-symbols-outlined text-[16px] text-[#7b581d] opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-[-1px]">
                        open_in_new
                      </span>
                    </a>
                  ) : (
                    <h3 className="font-display text-xl text-[#001f41] font-bold mb-4">
                      {item.title}
                    </h3>
                  )}
                  <p className="text-gray-600 font-sans text-sm leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-[#001f41] py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-3xl md:text-5xl text-white font-extrabold mb-6 leading-tight">
            Ready to start your journey?
          </h2>
          <p className="font-sans text-lg text-blue-100 max-w-xl mx-auto mb-8 leading-relaxed">
            Let's collaborate to build something that elevates your brand and delivers real results.
          </p>
          <button
            onClick={() => onOpenConsultation()}
            className="bg-[#EFC07B] text-[#1A1A2E] px-10 py-4 rounded-full font-sans font-bold hover:shadow-[0px_0px_20px_rgba(239,192,123,0.5)] hover:-translate-y-0.5 active:scale-95 transition-all duration-200 uppercase tracking-widest text-xs"
          >
            Start Your Project
          </button>
        </div>
      </section>
    </div>
  );
}
