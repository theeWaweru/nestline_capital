// components/homepage/ComingSoon.js
"use client";

import { useEffect, useRef, useState } from "react";
import { Bell, Waves } from "lucide-react";

export default function ComingSoon() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [activeWaitlist, setActiveWaitlist] = useState(null);
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

  const handleWaitlist = (project) => {
    setActiveWaitlist(project);
    // Handle waitlist signup logic here
  };

  return (
    <section ref={sectionRef} className="py-20 md:py-32 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-[#5c8a75] font-semibold uppercase tracking-wider text-sm mb-4">
            Coming Soon
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            More Opportunities on the Way
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Be the first to know when our new projects launch
          </p>
        </div>

        {/* Project Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* PalmCrest Phase 2 */}
          <div
            className={`relative h-96 rounded-2xl overflow-hidden shadow-2xl group transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {/* Background Image */}
            <div className="absolute inset-0 bg-gradient-to-br from-sage-800 to-sage-900">
              <div className="absolute inset-0 bg-[url('/images/palmcrest-phase2-bg.jpg')] bg-cover bg-center opacity-30" />
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

            {/* Content */}
            <div className="relative h-full p-8 flex flex-col justify-end text-white">
              <div className="mb-6">
                <div className="inline-block bg-[#5c8a75] text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
                  COMING SOON
                </div>
                <h3 className="text-3xl font-bold mb-4">
                  PalmCrest Residences — Phase 2
                </h3>
                <div className="space-y-2 text-white/90">
                  <p>• 64 Plots on 8.5 Acres</p>
                  <p>• Clubhouse & Swimming Pool</p>
                  <p>• Gated Community</p>
                </div>
              </div>

              <button
                onClick={() => handleWaitlist("phase2")}
                className="w-full bg-white text-gray-900 hover:bg-sage-50 px-6 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 group-hover:scale-105"
              >
                <Bell className="w-5 h-5" />
                Join Waitlist
              </button>
            </div>
          </div>

          {/* AzureDune Developments */}
          <div
            className={`relative h-96 rounded-2xl overflow-hidden shadow-2xl group transition-all duration-700 delay-200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {/* Background Image */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-cyan-900">
              <div className="absolute inset-0 bg-[url('/images/azuredune-bg.jpg')] bg-cover bg-center opacity-30" />
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

            {/* Content */}
            <div className="relative h-full p-8 flex flex-col justify-end text-white">
              <div className="mb-6">
                <div className="inline-block bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
                  COMING SOON
                </div>
                <h3 className="text-3xl font-bold mb-4">
                  AzureDune Developments
                </h3>
                <div className="space-y-2 text-white/90">
                  <p>• Direct Beachfront Access</p>
                  <p>• Premium Coastal Plots</p>
                  <p>• Unparalleled Ocean Views</p>
                </div>
              </div>

              <button
                onClick={() => handleWaitlist("azuredune")}
                className="w-full bg-white text-gray-900 hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 group-hover:scale-105"
              >
                <Waves className="w-5 h-5" />
                Get Notified
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
