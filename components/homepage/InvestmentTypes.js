// components/homepage/InvestmentTypes.js - Premium Accordion Section
"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";

const investmentTypes = [
  {
    number: "001",
    title: "Land Banking",
    description:
      "Nestline Capital offers strategic land acquisition opportunities in Malindi's highest-potential corridors. Our research-driven approach identifies prime undeveloped parcels before infrastructure development drives exponential appreciation. Every plot comes with full due diligence, clear title documentation, and ongoing market analysis.",
  },
  {
    number: "002",
    title: "Diaspora Investments",
    description:
      "Simplified overseas investment designed specifically for Kenyans living abroad. We handle everything from site selection and legal documentation to ongoing property management and progress reporting. Invest in Kenya's coastal growth from anywhere in the world with complete confidence and transparency.",
  },
  {
    number: "003",
    title: "Gated Communities",
    description:
      "Exclusive residential developments combining modern amenities with coastal lifestyle. Our planned communities feature premium infrastructure, 24/7 security, and strategic locations near Malindi's growth centers. Each development is carefully planned to deliver both lifestyle enhancement and strong capital appreciation.",
  },
  {
    number: "004",
    title: "Commercial Ventures",
    description:
      "High-yield commercial real estate opportunities in Malindi's expanding tourism and business sectors. From beachfront hospitality projects to retail developments, we structure joint ventures that capitalize on the region's economic transformation. Professional management ensures optimal returns and reduced investor risk.",
  },
];

export default function InvestmentTypes() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleItem = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="min-h-screen bg-[#f7f4ef] py-32 px-6 relative">
      {/* Vertical edge labels */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 -rotate-90 origin-center">
        <p className="text-gray-400 text-xs tracking-[0.3em] uppercase">
          Explore Opportunities
        </p>
      </div>

      <div className="absolute right-8 top-1/2 -translate-y-1/2 rotate-90 origin-center">
        <p className="text-gray-400 text-xs tracking-[0.3em] uppercase">
          Premium Investments
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-20">
          {/* Left: Heading */}
          <div>
            <h2 className="text-5xl md:text-6xl font-light text-gray-900 leading-[1.1]">
              Premium
              <br />
              investments
              <br />
              for every goal
            </h2>
          </div>

          {/* Right: Intro text */}
          <div>
            <p className="text-lg text-[#4a6f5f] leading-relaxed">
              Built on institutional expertise and deep coastal market insight,
              Nestline Capital brings professional-grade investment
              opportunities to discerning investors and wealth builders alike.
            </p>
          </div>
        </div>

        {/* Accordion Items */}
        <div className="max-w-5xl mx-auto space-y-0 border-t border-gray-300">
          {investmentTypes.map((item, index) => (
            <div
              key={index}
              className="border-b border-gray-300 transition-all"
            >
              {/* Accordion Header */}
              <button
                onClick={() => toggleItem(index)}
                className="w-full flex items-center justify-between py-8 group hover:bg-[#5c8a75]/5 px-6 transition-colors"
              >
                <div className="flex items-center gap-8">
                  <span className="text-sm text-gray-400 font-light">
                    {item.number}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-light text-gray-900 text-left">
                    {item.title}
                  </h3>
                </div>

                {/* Toggle Icon */}
                <div className="w-10 h-10 flex items-center justify-center">
                  {activeIndex === index ? (
                    <X className="w-6 h-6 text-gray-600" />
                  ) : (
                    <Plus className="w-6 h-6 text-gray-600" />
                  )}
                </div>
              </button>

              {/* Accordion Content */}
              <div
                className={`overflow-hidden transition-all duration-500 ${
                  activeIndex === index
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-8 pl-32">
                  <p className="text-[#4a6f5f] text-lg leading-relaxed max-w-3xl">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
