// components/homepage/FeaturedProject.js - Premium Project Showcase
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function FeaturedProject() {
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
      {/* Vertical edge labels */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 -rotate-90 origin-center">
        <p className="text-gray-400 text-xs tracking-[0.3em] uppercase">
          Featured Project
        </p>
      </div>

      <div className="absolute right-8 top-1/2 -translate-y-1/2 rotate-90 origin-center">
        <p className="text-gray-400 text-xs tracking-[0.3em] uppercase">
          Now Selling
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-[#5c8a75] text-sm tracking-[0.3em] uppercase mb-6">
            Now Available
          </p>
          <h2 className="text-5xl md:text-7xl font-light text-gray-900 mb-6">
            PalmCrest Residences
            <br />
            <span className="italic">Phase 1</span>
          </h2>
          <p className="text-xl text-gray-600 font-light">
            Malindi, Kilifi County
          </p>
        </div>

        {/* Split Layout */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Images */}
          <div
            className={`space-y-4 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="aspect-[16/10] rounded-sm overflow-hidden">
              <img
                src="/images/palmcrest-aerial.jpg"
                alt="PalmCrest Residences aerial view"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square rounded-sm overflow-hidden">
                <img
                  src="/images/palmcrest-plot.jpg"
                  alt="Plot details"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="aspect-square rounded-sm overflow-hidden">
                <img
                  src="/images/palmcrest-palms.jpg"
                  alt="Palm trees"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>

          {/* Right: Details */}
          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <div className="space-y-8">
              {/* Description */}
              <p className="text-lg text-[#4a6f5f] leading-relaxed">
                An exclusive gated community of 16 plots, each measuring 1/8 of
                an acre (50x100), set on a serene 2-acre property. Surrounded by
                graceful palm trees and well-manicured lawns.
              </p>

              {/* Key Details */}
              <div className="space-y-6 py-8 border-t border-b border-gray-200">
                <div className="flex justify-between items-baseline">
                  <span className="text-gray-600">Plot Size</span>
                  <span className="text-xl font-light text-gray-900">
                    1/8 Acre (50×100)
                  </span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-gray-600">Available Plots</span>
                  <span className="text-xl font-light text-gray-900">
                    16 Plots on 2 Acres
                  </span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-gray-600">Starting From</span>
                  <span className="text-3xl font-light text-[#5c8a75]">
                    KES 299,000
                  </span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-gray-600">Beach Access</span>
                  <span className="text-xl font-light text-gray-900">
                    100 Meters
                  </span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3 text-[#4a6f5f]">
                <li className="flex items-start gap-3">
                  <span className="text-[#5c8a75] mt-1">•</span>
                  <span>Water and electricity on site</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#5c8a75] mt-1">•</span>
                  <span>Individual titles ready for transfer</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#5c8a75] mt-1">•</span>
                  <span>Solar-lit beach access</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#5c8a75] mt-1">•</span>
                  <span>30% deposit, 90 days to complete</span>
                </li>
              </ul>

              {/* CTA */}
              <Link
                href="/register"
                className="inline-block w-full text-center border-2 border-[#5c8a75] text-[#5c8a75] hover:bg-[#5c8a75] hover:text-white px-8 py-4 text-sm font-medium tracking-wider uppercase transition-all duration-300 mt-8"
              >
                View Available Plots →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
