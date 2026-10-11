/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { MoveRight } from "lucide-react";
import { gsap } from "gsap";
import heroBgVideo from "../assets/images/hero_background.mp4";

interface HeroProps {
  onNavClick: (sectionId: string) => void;
}

export default function Hero({ onNavClick }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  const titleText = "Where Every Cut is a Crown";
  const words = titleText.split(" ");

  useEffect(() => {
    if (!containerRef.current) return;

    // Direct, ultra-smooth premium GSAP stagger entry animation
    const timeline = gsap.timeline({ defaults: { ease: "power4.out" } });

    timeline.fromTo(
      titleRef.current,
      { y: 80, opacity: 0, rotateX: -10 },
      { y: 0, opacity: 1, rotateX: 0, duration: 1.5, delay: 0.6 }
    );

    timeline.fromTo(
      subRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 0.95, duration: 1.2 },
      "-=1.1"
    );

    timeline.fromTo(
      buttonsRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.0 },
      "-=0.9"
    );

    return () => {
      timeline.kill();
    };
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center pt-28 pb-20 px-6 overflow-hidden select-none border-b border-[#1c1c1a] bg-[#0c0c0b]"
    >
      {/* Background Video Layer optimized with web-streaming prioritizers and preload meta */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none scale-[1.1]"
        style={{
          transform: "scale(1.1) translate3d(0, 0, 0)",
          transformOrigin: "center center",
          willChange: "transform",
          backfaceVisibility: "hidden"
        }}
      >
        <source src={heroBgVideo} type="video/mp4" />
        <source src="https://assets.mixkit.co/videos/preview/mixkit-haircut-in-a-hair-styling-salon-large-preview-43187-500.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Gentle dark ambient overlay for a 3D theater depth that boosts contrast without washing out the video details */}
      <div className="absolute inset-0 bg-black/40 z-0" />
      
      {/* Subtle top dark ambient gradient to cleanly frame header area inside the theater mode */}
      <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-black/70 to-transparent pointer-events-none z-10" />

      {/* Fully centered elegant editorial wrapper */}
      <div className="relative z-10 max-w-4xl mx-auto w-full flex flex-col items-center text-center pt-4">
        
        {/* GSAP reveal displays custom title blocks with dynamic text styling */}
        <h1
          ref={titleRef}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-black leading-[1.05] mb-6 tracking-tight z-20 opacity-0 transform-gpu"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          <span className="text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)] select-none block uppercase">
            {words.map((word, wordIndex) => {
              const isAccent = word.toLowerCase() === "cut" || word.toLowerCase() === "crown";
              return (
                <span 
                  key={wordIndex} 
                  className={`inline-block whitespace-nowrap mr-2.5 sm:mr-4 ${isAccent ? "text-[#D4AF37]" : "text-white"}`}
                >
                  {Array.from(word).map((char, charIndex) => (
                    <motion.span
                      key={charIndex}
                      className="inline-block hover:text-[#D4AF37] hover:scale-110 transition-transform duration-200 cursor-default"
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              );
            })}
          </span>
        </h1>

        {/* Dynamic subtitle description with transparent background and drop shadow */}
        <p
          ref={subRef}
          className="text-sm sm:text-base md:text-lg text-stone-100 bg-transparent px-4 font-sans max-w-2xl mb-12 leading-relaxed font-normal drop-shadow-[0_3px_12px_rgba(0,0,0,0.9)] opacity-0"
          style={{ fontFamily: "'Lato', sans-serif" }}
        >
          Experience the art of transformation at Royal Hair Line — Ahmedabad's
          most distinguished unisex salon. Featuring customizable elite hair treatments, premium grooming, and a luxury Pine Emerald interior design.
        </p>

        {/* Playful GSAP animatable call-to-action bar */}
        <div
          ref={buttonsRef}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full sm:w-auto px-4 sm:px-0 z-20 opacity-0"
        >
          <button
            onClick={() => onNavClick("book")}
            className="w-full sm:w-auto px-8 py-4 bg-[#5A5A40] hover:bg-[#838360] hover:scale-103 text-white font-sans font-bold text-xs uppercase tracking-[0.25em] shadow-xl shadow-black/30 transition-all duration-300 cursor-pointer border-none rounded-full flex items-center justify-center gap-2"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            <span>Book Your Throne</span>
            <MoveRight size={14} className="mt-0.5" />
          </button>
          
          <button
            onClick={() => onNavClick("gallery")}
            className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white border-2 border-white/40 hover:border-white font-sans font-bold text-xs uppercase tracking-[0.25em] hover:scale-103 transition-all duration-300 cursor-pointer rounded-full backdrop-blur-sm"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Explore Our Work
          </button>
        </div>
      </div>
    </section>
  );
}
