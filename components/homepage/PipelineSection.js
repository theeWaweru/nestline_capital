// components/homepage/PipelineSection.js - Premium Project Pipeline
"use client";

import { useEffect, useRef, useState } from "react";

export default function PipelineSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen bg-white py-32 relative">
      {/* Content */}
      <div className="max-w-7xl mx-auto px-6">
        {/* Intro Text */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-light text-gray-900 mb-12">
            <span className="italic">Imagine yourself</span> looking over
            <br />
            the horizon as the sun falls
            <br />
            below the ocean
          </h2>
          <p className="text-lg text-[#4a6f5f] leading-relaxed max-w-2xl mx-auto">
            Our properties provide the ultimate in coastal beauty and investment
            returns. We ensure no two opportunities are ever the same.
          </p>
        </div>

        {/* Project Grid - Magazine Gallery Style */}
        <div
          className={`grid md:grid-cols-3 gap-6 mb-20 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* PalmCrest Phase 2 */}
          <div className="group relative aspect-[3/4] overflow-hidden">
            <img
              src="/images/palmcrest-phase2.jpg"
              alt="PalmCrest Phase 2"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <p className="text-sm tracking-[0.3em] uppercase mb-3 text-white/80">
                Coming Soon
              </p>
              <h3 className="text-3xl font-light mb-3">
                PalmCrest
                <br />
                Residences 2
              </h3>
              <p className="text-sm text-white/90 mb-4">
                64 plots • 8.5 acres
                <br />
                Clubhouse & Pool
              </p>
              <button className="text-sm border border-white px-6 py-2 hover:bg-white hover:text-gray-900 transition-all">
                Learn More →
              </button>
            </div>
          </div>

          {/* Large Center Image */}
          <div className="group relative aspect-[3/4] overflow-hidden">
            <img
              src="/images/malindi-beach-aerial.jpg"
              alt="Coastal view"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-5xl font-light text-white text-center drop-shadow-lg">
                Explore
                <br />
                <span className="italic">Our properties</span>
              </h3>
            </div>
          </div>

          {/* AzureDune */}
          <div className="group relative aspect-[3/4] overflow-hidden">
            <img
              src="/images/azuredune-beach.jpg"
              alt="AzureDune Developments"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <p className="text-sm tracking-[0.3em] uppercase mb-3 text-white/80">
                Coming Soon
              </p>
              <h3 className="text-3xl font-light mb-3">
                AzureDune
                <br />
                Developments
              </h3>
              <p className="text-sm text-white/90 mb-4">
                Direct beachfront access
                <br />
                Premium ocean views
              </p>
              <button className="text-sm border border-white px-6 py-2 hover:bg-white hover:text-gray-900 transition-all">
                Get Notified →
              </button>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <a
            href="/register"
            className="inline-block border-2 border-gray-300 text-gray-700 hover:border-[#5c8a75] hover:text-[#5c8a75] px-8 py-3 text-sm font-medium tracking-wider uppercase transition-all duration-300"
          >
            View All Opportunities →
          </a>
        </div>
      </div>
    </section>
  );
}
