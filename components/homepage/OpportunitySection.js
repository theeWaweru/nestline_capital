// components/homepage/OpportunitySection.js - Split Screen Editorial Layout
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function OpportunitySection() {
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
    <section ref={sectionRef} className="min-h-screen bg-[#f7f4ef] relative">
      {/* Vertical edge labels */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 -rotate-90 origin-center">
        <p className="text-gray-400 text-xs tracking-[0.3em] uppercase">
          Our Approach
        </p>
      </div>

      <div className="absolute right-8 top-1/2 -translate-y-1/2 rotate-90 origin-center">
        <p className="text-gray-400 text-xs tracking-[0.3em] uppercase">
          Coastal Opportunities
        </p>
      </div>

      {/* Split Screen Layout */}
      <div className="grid lg:grid-cols-2 min-h-screen">
        {/* Left: Content */}
        <div
          className={`flex flex-col justify-center px-12 md:px-20 py-20 transition-all duration-1000 ${
            isVisible
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-10"
          }`}
        >
          <h2 className="text-5xl md:text-7xl font-light text-gray-900 mb-12 leading-[1.1]">
            We create
            <br />
            <span className="italic">Generational</span> Wealth
          </h2>

          <div className="space-y-8 text-lg text-[#4a6f5f] leading-relaxed max-w-xl">
            <p>
              Our investment philosophy allows you to experience what it&apos;s
              like to build lasting prosperity through Kenya&apos;s coastal
              transformation.
            </p>
            <p>
              With our carefully selected properties, positioned during peak
              growth periods, you can secure your family&apos;s financial future
              against landscapes as far as an eye can see.
            </p>
            <p>
              With premium locations and strategic timing, your investment will
              become a legacy that lasts for generations.
            </p>
          </div>
        </div>

        {/* Right: Image */}
        <div
          className={`relative min-h-[500px] lg:min-h-full transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
          }`}
        >
          <Image
            src="/images/malindi-coastline.jpg"
            alt="Malindi coastal aerial view"
            fill
            className="w-full h-full object-cover relative"
          />
        </div>
      </div>
    </section>
  );
}
