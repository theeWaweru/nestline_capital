// components/homepage/TrustBuilders.js
"use client";

import { useEffect, useRef, useState } from "react";
import { FileCheck, MapPin, Calendar } from "lucide-react";

const trustPoints = [
  {
    icon: FileCheck,
    title: "Title Deeds Ready",
    description:
      "Every plot comes with a clean, verified title deed. No waiting. No disputes.",
  },
  {
    icon: MapPin,
    title: "Surveyed & Beaconed",
    description:
      "Physical boundary markers and GPS coordinates. You'll know exactly what you own.",
  },
  {
    icon: Calendar,
    title: "90-Day Payment",
    description:
      "Secure with 30% deposit. Complete your payment at your pace within 90 days.",
  },
];

export default function TrustBuilders() {
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
    <section ref={sectionRef} className="py-20 md:py-32 px-6 bg-sage-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {trustPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <div
                key={index}
                className={`bg-white p-8 rounded-xl shadow-lg transition-all duration-700 hover:shadow-xl hover:-translate-y-1 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="w-14 h-14 bg-[#5c8a75] rounded-lg flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {point.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {point.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
