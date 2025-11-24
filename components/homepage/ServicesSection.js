// components/homepage/ServicesSection.js - Premium Services Accordion
"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";

const services = [
  {
    number: "001",
    title: "Property Viewings",
    description:
      "Guided tours of all available coastal properties with detailed market analysis and growth potential assessment. Professional site inspections with surveying insights and infrastructure development timelines.",
  },
  {
    number: "002",
    title: "Investment Consultation",
    description:
      "Personalized one-on-one sessions to match your financial goals with optimal property opportunities. Comprehensive portfolio planning with risk assessment and return projections tailored to your situation.",
  },
  {
    number: "003",
    title: "Market Research",
    description:
      "In-depth coastal market analysis including infrastructure projects, tourism development, and appreciation trends. Exclusive insights into upcoming opportunities and timing strategies for maximum returns.",
  },
  {
    number: "004",
    title: "Legal Support",
    description:
      "Complete legal assistance from purchase to title transfer with trusted local advocates and surveyors. Full documentation support including due diligence, compliance verification, and ownership protection.",
  },
];

export default function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleItem = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="min-h-screen bg-[#f7f4ef] py-32 relative">
      {/* Vertical edge labels */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 -rotate-90 origin-center">
        <p className="text-gray-400 text-xs tracking-[0.3em] uppercase">
          Explore Opportunities
        </p>
      </div>

      <div className="absolute right-8 top-1/2 -translate-y-1/2 rotate-90 origin-center">
        <p className="text-gray-400 text-xs tracking-[0.3em] uppercase">
          Nestline Capital
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left: Featured Image */}
          <div className="lg:sticky lg:top-32 h-fit">
            <div className="aspect-[3/4] rounded-sm overflow-hidden">
              <img
                src="/images/gateway-path.jpg"
                alt="Investment pathway"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-12">
              <h2 className="text-5xl md:text-6xl font-light text-gray-900 mb-8 leading-[1.1]">
                Elevate your
                <br />
                <span className="italic">Investment Journey</span>
              </h2>
              <p className="text-lg text-[#4a6f5f] leading-relaxed">
                Our investment experience provides the ultimate in personalized
                guidance and market insight. Enjoy expert consultation,
                exclusive property access, and comprehensive market analysis as
                you build wealth in our carefully selected coastal settings with
                your financial future and family.
              </p>
            </div>
          </div>

          {/* Right: Accordion */}
          <div className="space-y-0 border-t border-gray-300">
            {services.map((item, index) => (
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
                    <p className="text-[#4a6f5f] text-lg leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
