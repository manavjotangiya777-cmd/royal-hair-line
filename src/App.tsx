/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import ThreeCanvas from "./components/ThreeCanvas";
import CrownLoader from "./components/CrownLoader";
import Cursor from "./components/Cursor";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import About from "./components/About";
import Services from "./components/Services";
import Gallery from "./components/Gallery";
import Team from "./components/Team";
import Testimonials from "./components/Testimonials";
import BookingForm from "./components/BookingForm";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import logo from "./assets/images/logo.PNG";

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [showWatermark, setShowWatermark] = useState(false);

  // Smooth scroll anchor trigger
  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      // Offset navbar height
      const offset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Switch watermark logo in background when scrolled past Hero
  useEffect(() => {
    const handleScroll = () => {
      // Past 350px is when the Hero is scrolling away andStats/About are coming in
      if (window.scrollY > 350) {
        setShowWatermark(true);
      } else {
        setShowWatermark(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initial trigger
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keep active section in sync with scroll position using IntersectionObserver
  useEffect(() => {
    const sections = [
      "home",
      "about",
      "services",
      "gallery",
      "team",
      "testimonials",
      "book",
      "contact"
    ];

    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -40% 0px", // Trigger when section occupies the center
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div id="royal-root-container" className="min-h-screen bg-[#fdfcf7] text-[#3d3d3d] select-none relative selection:bg-[#5A5A40]/20 selection:text-[#5A5A40] overflow-x-hidden font-sans">
      {/* 3D Immersive rotating background particles & bokeh orbs canvas */}
      <ThreeCanvas />

      {/* Royal crown first-visit splash loader */}
      <CrownLoader />

      {/* Gold custom cursor trail on desktop only */}
      <Cursor />

      {/* Luxury sticky layout header */}
      <Header activeSection={activeSection} onNavClick={handleNavClick} />

      {/* Static brand watermark in background behind all pages/sections after hero */}
      <div 
        className="fixed inset-0 pointer-events-none flex items-center justify-center z-0 transition-all duration-1000 ease-out select-none"
        style={{ 
          opacity: showWatermark ? 0.09 : 0,
          transform: showWatermark ? "scale(1.02)" : "scale(0.92)",
        }}
      >
        <img 
          src={logo} 
          alt="Royal Hair Line Crest Watermark" 
          className="w-[85vw] h-[85vw] max-w-[600px] max-h-[600px] object-contain select-none opacity-100 mix-blend-multiply"
          style={{ transform: "rotate(-5deg)" }}
        />
      </div>

      {/* Sections layout with subtle parallax layers */}
      <main className="relative z-10">
        {/* HERO SECTION */}
        <Hero onNavClick={handleNavClick} />

        {/* STATS STRIP SECTION WITH COUNTUP ANIMATION */}
        <Stats />

        {/* ABOUT & THE ROYAL DIFFERENCE */}
        <About />

        {/* FILTERABLE INTERACTIVE PRICING MENU */}
        <Services />

        {/* MASONRY PICTURES & VIDEO COMPARISON GALLERY GRID */}
        <Gallery />

        {/* FLIPPING TEAM CARDS PREVIEW */}
        <Team />

        {/* AUTO-SCROLL TESTIMONIALS SLIDER SECTION */}
        <Testimonials />

        {/* ACTIVE MULTI STEP BOOKING DESK */}
        <BookingForm />

        {/* GEOLOCATION DIRECTIONS MAPS IFRAME SECTION */}
        <Contact />
      </main>

      {/* footer section */}
      <Footer onNavClick={handleNavClick} />

      {/* FLOATING CONTACTS LINE WHATSAPP PULSER BUTTON */}
      <WhatsAppButton />
    </div>
  );
}
