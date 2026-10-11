/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Crown } from "lucide-react";
import logo from "../assets/images/logo.PNG";

interface HeaderProps {
  activeSection: string;
  onNavClick: (sectionId: string) => void;
}

export default function Header({ activeSection, onNavClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Nav Links
  const navLinks = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Services", id: "services" },
    { label: "Gallery", id: "gallery" },
    { label: "Our Team", id: "team" },
    { label: "Testimonials", id: "testimonials" },
    { label: "Book Appointment", id: "book" },
    { label: "Contact", id: "contact" }
  ];

  // Scroll effect to change background opacity
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavClick(id);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? "bg-[#fdfcf7]/95 backdrop-blur-md border-b border-[#e8e4d8] py-2 md:py-3 shadow-md"
            : "bg-transparent py-4 md:py-6"
        }`}
      >
        <div className="max-w-[1500px] mx-auto px-6 xl:px-10 min-h-[4.5rem] md:min-h-[5.5rem] flex items-center justify-between gap-4">
          {/* Logo Brand Brand */}
          <button
            onClick={() => handleLinkClick("home")}
            className="flex items-center gap-3.5 md:gap-4 text-left bg-transparent border-none cursor-pointer focus:outline-none group flex-none"
          >
            <div className="relative flex-none">
              <img
                src={logo}
                alt="Royal Hair Line Logo"
                className={`w-12 h-12 md:w-16 md:h-16 object-contain transition-all duration-500 ease-out opacity-100 ${
                  isScrolled ? "mix-blend-multiply" : "brightness-0 invert drop-shadow-[0_2px_12px_rgba(255,255,255,0.5)]"
                }`}
              />
            </div>
            <div className="flex flex-col min-w-fit">
              <span
                className={`text-lg md:text-xl font-display font-semibold tracking-[0.18em] uppercase leading-tight transition-colors duration-300 whitespace-nowrap ${
                  isScrolled ? "text-[#2d2d2d]" : "text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
                }`}
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Royal Hair Line
              </span>
              <span className={`text-[9px] md:text-[10px] font-mono tracking-[0.25em] uppercase mt-0.5 font-bold transition-colors duration-300 whitespace-nowrap ${
                isScrolled ? "text-[#5A5A40]" : "text-[#D4AF37] drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]"
              }`}>
                Premium Unisex Salon
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-0.5 xl:space-x-1.5 flex-none">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`relative px-2.5 xl:px-3.5 py-2 font-sans text-[11px] md:text-xs uppercase tracking-[0.14em] xl:tracking-[0.18em] transition-all duration-300 bg-transparent border-none focus:outline-none cursor-pointer whitespace-nowrap ${
                    isActive 
                      ? (isScrolled ? "text-[#5A5A40] font-bold" : "text-white font-bold drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]") 
                      : (isScrolled ? "text-[#3d3d3d]/70 hover:text-[#5A5A40]/90" : "text-white/85 hover:text-[#D4AF37] drop-shadow-[0_1px_4px_rgba(0,0,0,0.3)]")
                  }`}
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  <span className="relative z-10">{link.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="activeNavBackground"
                      className={`absolute bottom-1 left-2.5 right-2.5 h-[1.5px] ${
                        isScrolled ? "bg-[#5A5A40]" : "bg-[#D4AF37]"
                      }`}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}

            {/* Quick Action Book Button */}
            <button
              onClick={() => handleLinkClick("book")}
              className={`ml-3 xl:ml-5 px-4 xl:px-5 py-2 md:py-2.5 rounded-full border font-sans font-semibold text-[11px] xl:text-xs uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer shadow-md whitespace-nowrap ${
                isScrolled 
                  ? "bg-[#5A5A40] border-[#5A5A40]/10 hover:bg-[#8a8a6b] text-white shadow-[#5A5A40]/10" 
                  : "bg-white border-white hover:bg-[#D4AF37] hover:text-white text-[#2d2d2d] hover:border-[#D4AF37]"
              }`}
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Reserve Throne
            </button>
          </nav>

          {/* Mobile Menu Trigger */}
          <div className="flex lg:hidden items-center gap-4">
            <button
              onClick={() => handleLinkClick("book")}
              className={`px-3 py-2 border font-sans font-medium text-[10px] uppercase tracking-[0.15em] transition-all duration-300 rounded-full ${
                isScrolled
                  ? "border-[#5A5A40]/30 text-[#5A5A40] hover:bg-[#5A5A40] hover:text-white"
                  : "border-white/50 text-white hover:bg-white hover:text-[#2d2d2d] bg-black/20"
              }`}
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Book
            </button>
            <button
              onClick={() => setMobileMenuOpen(true)}
              className={`p-1 bg-transparent border-none focus:outline-none cursor-pointer transition-colors duration-300 ${
                isScrolled ? "text-[#3d3d3d] hover:text-[#5A5A40]" : "text-white hover:text-[#D4AF37]"
              }`}
              aria-label="Open navigation menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Full-screen mobile overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 bg-[#fdfcf7] flex flex-col justify-between overflow-y-auto"
          >
            {/* Top Bar inside menu */}
            <div className="py-5 flex items-center justify-between px-6 border-b border-[#e8e4d8]">
              <div className="flex items-center gap-3">
                <img
                  src={logo}
                  alt="Royal Hair Line Logo"
                  className="w-14 h-14 object-contain opacity-100 mix-blend-multiply"
                />
                <div className="flex flex-col">
                  <span
                    className="text-lg font-display tracking-[0.18em] text-[#2d2d2d] uppercase font-bold"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Royal Hair Line
                  </span>
                  <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#5A5A40] mt-0.5 font-bold">
                    Premium Unisex Salon
                  </span>
                </div>
              </div>

              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#3d3d3d] hover:text-[#5A5A40] p-1 bg-transparent border-none focus:outline-none cursor-pointer"
                aria-label="Close navigation menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* Middle Nav Links Overlay with Stagger */}
            <div className="flex-1 flex flex-col items-center justify-center py-10">
              <nav className="flex flex-col items-center space-y-6">
                {navLinks.map((link, idx) => {
                  const isActive = activeSection === link.id;
                  return (
                    <motion.button
                      key={link.id}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: idx * 0.05, duration: 0.5, ease: "easeOut" }}
                      onClick={() => handleLinkClick(link.id)}
                      className="group flex flex-col items-center relative bg-transparent border-none focus:outline-none cursor-pointer"
                    >
                      <span
                        className={`text-lg md:text-xl uppercase tracking-[0.25em] transition duration-300 font-sans ${
                          isActive ? "text-[#5A5A40] font-semibold" : "text-[#3d3d3d]/80 group-hover:text-[#5A5A40]"
                        }`}
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        {link.label}
                      </span>
                      {/* Stylized separator diamond */}
                      <span
                        className={`text-[9px] mt-1 text-[#5A5A40] transition-opacity duration-300 ${
                          isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                        }`}
                      >
                        ◆
                      </span>
                    </motion.button>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Panel inside menu */}
            <div className="py-8 border-t border-[#e8e4d8] flex flex-col items-center gap-4 px-6 bg-[#fdfcf7]">
              <button
                onClick={() => handleLinkClick("book")}
                className="w-full max-w-xs py-3 text-center bg-[#5A5A40] hover:bg-[#8a8a6b] text-white font-semibold text-xs uppercase tracking-[0.25em] rounded-full shadow-md shadow-[#5A5A40]/10 transition-colors"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Book Your Throne
              </button>
              <span className="text-[10px] font-mono tracking-widest text-stone-400 uppercase font-semibold">
                "Where Every Cut is a Crown"
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
