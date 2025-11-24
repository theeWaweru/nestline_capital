// components/homepage/HeroSection.js - Premium Video Hero
"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function HeroSection() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("Video autoplay failed:", error);
      });
    }
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        poster="/images/hero-poster.jpg"
      >
        <source src="/videos/malindi-aerial.mp4" type="video/mp4" />
      </video>

      {/* Elegant dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60" />

      {/* Vertical edge labels (matching screenshots) */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 -rotate-90 origin-center">
        <p className="text-white/60 text-sm tracking-[0.3em] uppercase font-light">
          Nestline Capital
        </p>
      </div>

      <div className="absolute right-8 top-1/2 -translate-y-1/2 rotate-90 origin-center">
        <p className="text-white/60 text-sm tracking-[0.3em] uppercase font-light">
          Karibu Malindi
        </p>
      </div>

      {/* Content - Magazine style */}
      <div className="relative z-10 h-full flex items-center justify-center px-6">
        <div className="max-w-5xl text-center">
          <h1 className="text-6xl md:text-8xl font-light text-white mb-8 tracking-tight leading-[0.95]">
            Trusted Pathways
            <br />
            to Prosperity
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-12 font-light max-w-3xl mx-auto leading-relaxed">
            Building wealth, creating value, and delivering trusted investment
            solutions that stand the test of time
          </p>
          <Link
            href="/register"
            className="inline-block border-2 border-white text-white hover:bg-white hover:text-gray-900 px-10 py-4 text-sm font-medium tracking-wider uppercase transition-all duration-300"
          >
            Explore Opportunities →
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
        <div className="w-px h-16 bg-white/30 animate-pulse" />
      </div>
    </section>
  );
}
