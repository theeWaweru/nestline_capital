// components/homepage/AboutSection.js - Premium About Section
"use client";

import { useEffect, useRef, useState } from "react";

export default function AboutSection() {
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
    <section
      ref={sectionRef}
      className="min-h-screen bg-[#f7f4ef] py-32 relative"
    >
      {/* Vertical edge labels */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 -rotate-90 origin-center">
        <p className="text-gray-400 text-xs tracking-[0.3em] uppercase">
          About Us
        </p>
      </div>

      <div className="absolute right-8 top-1/2 -translate-y-1/2 rotate-90 origin-center">
        <p className="text-gray-400 text-xs tracking-[0.3em] uppercase">
          Nestline Capital
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Header */}
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-light text-gray-900 mb-8 leading-[1.1]">
              Building
              <br />
              <span className="italic">Trusted Pathways</span>
              <br />
              to Prosperity
            </h2>
          </div>

          {/* Content Grid */}
          <div className="grid md:grid-cols-2 gap-16 mb-20">
            {/* Left Column */}
            <div className="space-y-8 text-lg text-[#4a6f5f] leading-relaxed">
              <p>
                Nestline Capital is a privately owned investment and project
                development holding company with a clear mission: to build
                trusted investment vehicles that create sustainable wealth and
                transform communities across Kenya.
              </p>
              <p>
                We bring structure, transparency, and professionalism to how
                investment capital is mobilized and deployed. Our approach is
                rooted in integrity, due diligence, and deep local insight.
              </p>
            </div>

            {/* Right Column */}
            <div className="space-y-8 text-lg text-[#4a6f5f] leading-relaxed">
              <p>
                Through our Special Purpose Vehicles (SPVs), we implement
                distinct, high-impact projects—each structured to provide
                clarity on ownership, compliance, and return on investment.
              </p>
              <p>
                From large-scale land development in coastal regions to modern
                residential concepts, our portfolio offers investors diversified
                access to Kenya&apos;s growth story.
              </p>
            </div>
          </div>

          {/* The Nestline Promise */}
          <div className="border-t border-gray-300 pt-16">
            <h3 className="text-3xl md:text-4xl font-light text-gray-900 mb-8 text-center">
              Our Name
            </h3>
            <p className="text-xl text-[#4a6f5f] leading-relaxed text-center max-w-3xl mx-auto">
              <span className="italic font-medium text-[#5c8a75]">
                &quot;Nestline&quot;
              </span>{" "}
              represents the secure and intentional growth of capital—just like
              a nest nurtures life. Our commitment is to give your money a safe,
              guided path toward meaningful return.
            </p>
          </div>

          {/* Key Differentiators */}
          <div className="grid md:grid-cols-3 gap-12 mt-20 pt-16 border-t border-gray-300">
            <div>
              <h4 className="text-xl font-medium text-gray-900 mb-4">
                Trusted Structure
              </h4>
              <p className="text-[#4a6f5f] leading-relaxed">
                All projects housed under properly governed SPVs with full
                oversight and accountability.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-medium text-gray-900 mb-4">
                Investor Focused
              </h4>
              <p className="text-[#4a6f5f] leading-relaxed">
                Tailored for both local and diaspora investors seeking security,
                growth, and clear accountability.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-medium text-gray-900 mb-4">
                Project Excellence
              </h4>
              <p className="text-[#4a6f5f] leading-relaxed">
                Every project based on sound due diligence, transparency, and
                strong value-add proposition.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
