// components/homepage/FinalCTA.js - Premium CTA and Footer
"use client";

import Link from "next/link";
import Image from "next/image";

export default function FinalCTA() {
  return (
    <>
      {/* Final CTA with Beach Background */}
      <section className="relative min-h-[80vh] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/images/malindi-beach-wide.jpg"
            alt="Malindi coastline"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#5c8a75]/90 via-[#5c8a75]/70 to-[#5c8a75]/50" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full py-32 px-6">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-5xl md:text-7xl font-light mb-8 leading-[1.1]">
              Plan a visit for your
              <br />
              <span className="italic">next investment</span>
            </h2>
            <p className="text-xl mb-12 font-light leading-relaxed max-w-2xl mx-auto text-white/90">
              We are more than happy to have you visit us as we guide your next
              steps.
            </p>
            <Link
              href="/register"
              className="inline-block border-2 border-white text-white hover:bg-white hover:text-[#5c8a75] px-10 py-4 text-sm font-medium tracking-wider uppercase transition-all duration-300"
            >
              Schedule a Visit →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <svg
                  className="w-6 h-6 text-[#5c8a75]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
                </svg>
                <span className="text-2xl font-light text-gray-900">
                  nestline
                </span>
              </div>
              <p className="text-[#4a6f5f] leading-relaxed mb-6 max-w-md">
                Making coastal land ownership accessible to everyone,
                everywhere. Building wealth through trusted investment
                solutions.
              </p>
              <div className="flex gap-6">
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#5c8a75] transition-colors"
                  aria-label="Instagram"
                >
                  <span className="text-xs tracking-widest">IG</span>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#5c8a75] transition-colors"
                  aria-label="Facebook"
                >
                  <span className="text-xs tracking-widest">FB</span>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#5c8a75] transition-colors"
                  aria-label="Twitter"
                >
                  <span className="text-xs tracking-widest">TW</span>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#5c8a75] transition-colors"
                  aria-label="LinkedIn"
                >
                  <span className="text-xs tracking-widest">IN</span>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-6 tracking-wider uppercase">
                Explore
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/"
                    className="text-[#4a6f5f] hover:text-[#5c8a75] transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/register"
                    className="text-[#4a6f5f] hover:text-[#5c8a75] transition-colors"
                  >
                    Projects
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-[#4a6f5f] hover:text-[#5c8a75] transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/login"
                    className="text-[#4a6f5f] hover:text-[#5c8a75] transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-6 tracking-wider uppercase">
                Contact
              </h4>
              <ul className="space-y-3 text-[#4a6f5f]">
                <li>
                  <a
                    href="mailto:admin@nestlinecapital.com"
                    className="hover:text-[#5c8a75] transition-colors"
                  >
                    admin@nestlinecapital.com
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+254726162738"
                    className="hover:text-[#5c8a75] transition-colors"
                  >
                    +254 726 162738
                  </a>
                </li>
                <li>Malindi, Kenya</li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Nestline Capital. All Rights
              Reserved.
            </p>
            <div className="flex gap-8 text-sm">
              <Link
                href="/privacy"
                className="text-gray-500 hover:text-[#5c8a75] transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-gray-500 hover:text-[#5c8a75] transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
