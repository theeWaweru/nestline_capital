// components/homepage/HowItWorks.js
"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: "01",
    title: "Browse",
    description:
      "Explore available plots on our platform. View sizes, prices, and exact locations.",
  },
  {
    number: "02",
    title: "Register Interest",
    description:
      "Create an account and select your preferred plot. Receive payment instructions via email.",
  },
  {
    number: "03",
    title: "Secure Your Plot",
    description:
      "Pay 30% or more to book your plot. It's held exclusively for you.",
  },
  {
    number: "04",
    title: "Complete Payment",
    description:
      "You have 90 days to clear the balance. Track progress from your dashboard.",
  },
  {
    number: "05",
    title: "Receive Your Title",
    description:
      "Once paid in full, your title deed is processed and transferred to your name.",
  },
];

export default function HowItWorks() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-32 px-6 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            How It Works
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Your journey to coastal land ownership in five simple steps
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-5 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Step number */}
              <div className="text-[#5c8a75] font-bold text-6xl md:text-7xl mb-4 leading-none">
                {step.number}
              </div>

              {/* Connecting line (hidden on mobile, hidden on last item) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block h-0.5 bg-[#5c8a75]/30 w-full my-8" />
              )}

              {/* Step content */}
              <h3 className="text-xl font-bold text-white mb-3">
                {step.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile connecting line visualization */}
        <div className="md:hidden mt-12 flex justify-center">
          <div className="w-1 h-32 bg-gradient-to-b from-[#5c8a75] to-transparent" />
        </div>
      </div>
    </section>
  );
}
