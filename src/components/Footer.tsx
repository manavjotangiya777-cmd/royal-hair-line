/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Crown, Sparkles, Send } from "lucide-react";
import logo from "../assets/images/logo.PNG";

interface FooterProps {
  onNavClick: (sectionId: string) => void;
}

export default function Footer({ onNavClick }: FooterProps) {
  const handleLogoClick = () => {
    onNavClick("home");
  };

  return (
    <footer className="relative z-10 bg-[#fdfcf7] text-stone-600 border-t border-[#e8e4d8] overflow-hidden select-none">
      {/* Absolute top glowing bar */}
      <div className="h-[1.5px] bg-gradient-to-r from-transparent via-[#5A5A40]/45 to-transparent w-full" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-[#e8e4d8] pb-16">
          {/* Col 1: Brand details info */}
          <div className="md:col-span-5 space-y-6">
            <button
              onClick={handleLogoClick}
              className="flex items-center gap-3 text-left bg-transparent border-none cursor-pointer focus:outline-none group"
            >
              <img
                src={logo}
                alt="Royal Hair Line Logo"
                className="w-14 h-14 object-contain opacity-100 mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
              />
              <div className="flex flex-col">
                <span
                  className="text-lg font-display tracking-[0.2em] text-[#2d2d2d] uppercase leading-none"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Royal Hair Line
                </span>
                <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-[#5A5A40] mt-0.5 font-bold">
                  Premium Unisex Salon
                </span>
              </div>
            </button>
            
            <p className="text-xs sm:text-sm text-stone-500 font-sans leading-relaxed max-w-sm font-light">
              Experience absolute luxury hair transformations, styling, and premium grooming services in our modern, state-of-the-art beauty sanctuary.
            </p>
            
            <span
              className="font-serif italic text-lg text-[#5A5A40] block mt-4 font-semibold"
              style={{ fontFamily: "'Great Vibes', cursive" }}
            >
              "Where Every Cut is a Crown"
            </span>
          </div>

          {/* Col 2: Useful Quick Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-[10px] font-mono tracking-widest text-[#5A5A40] uppercase font-bold">Quick Access</h4>
            <ul className="space-y-2 text-xs font-sans font-semibold text-stone-500">
              <li>
                <button onClick={() => onNavClick("about")} className="hover:text-[#5A5A40] transition-colors cursor-pointer bg-transparent border-none">
                  About the Salon
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick("services")} className="hover:text-[#5A5A40] transition-colors cursor-pointer bg-transparent border-none">
                  Premium Services
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick("gallery")} className="hover:text-[#5A5A40] transition-colors cursor-pointer bg-transparent border-none">
                  The Royal Gallery
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick("team")} className="hover:text-[#5A5A40] transition-colors cursor-pointer bg-transparent border-none">
                  Meet Our Masters
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick("book")} className="hover:text-[#5A5A40] transition-colors cursor-pointer bg-transparent border-none">
                  Online Booking Desk
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Newsletters */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-[10px] font-mono tracking-widest text-[#5A5A40] uppercase font-bold">The Majestic Club</h4>
            <p className="text-xs text-stone-500 font-sans font-light leading-relaxed">
              Subscribe to receive exclusive royal invitations, hair care guides, and premium salon offers directly to your inbox.
            </p>

            {/* Mock input newsletter form */}
            <form onSubmit={(e) => e.preventDefault()} className="relative flex group max-w-sm pt-2 overflow-hidden rounded-full border border-[#e8e4d8] bg-white shadow-sm pr-1">
              <input
                type="email"
                required
                placeholder="YOUR ROYAL EMAIL..."
                className="w-full bg-transparent text-stone-700 text-[10px] font-mono tracking-wider px-4 py-3 border-none outline-none placeholder-stone-400 font-sans"
              />
              <button
                type="submit"
                className="bg-[#5A5A40] hover:bg-[#8a8a6b] text-white px-5 rounded-full transition-all flex items-center justify-center cursor-pointer border-none"
                aria-label="Subscribe to newsletter"
              >
                <Send size={12} />
              </button>
            </form>
          </div>
        </div>

        {/* Crowning credits copyright and legal */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-[10px] font-mono tracking-widest text-stone-400 uppercase gap-4 text-center sm:text-left font-semibold">
          <div className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} ROYAL HAIR LINE. ALL RIGHTS RESERVED.</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#5A5A40]">
            <Sparkles size={10} className="animate-spin-slow" />
            <span>"Crafted with Artistry & Precision"</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
