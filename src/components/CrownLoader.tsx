/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import logo from "../assets/images/logo.PNG";

export default function CrownLoader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check if loaded in this session to make repeat visits seamless but keep the luxury animation
    const hasVisited = sessionStorage.getItem("royal_hair_line_visited");
    if (hasVisited) {
      setIsVisible(false);
      return;
    }

    const timer = setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem("royal_hair_line_visited", "true");
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          id="royal-page-loader"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.8, ease: "easeInOut" }
          }}
          className="fixed inset-0 bg-[#fdfcf7] z-9999 flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Subtle noise pattern overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(90,90,64,0.08),rgba(253,252,247,0))] pointer-events-none" />

          <div className="relative flex flex-col items-center max-w-sm px-6 text-center">
            {/* Crown & Laurel Icon SVG */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: [0.8, 1.05, 1],
                opacity: 1,
              }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="w-24 h-24 mb-6 relative text-[#5A5A40] flex items-center justify-center"
            >
              {/* Outer Golden Laurel Circle */}
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full animate-spin-slow text-[#5A5A40] absolute inset-0"
                style={{ animationDuration: "25s" }}
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  d="M 50,5 A 45,45 0 1,1 49.9,5"
                />
                {/* Visual nodes or diamond separators */}
                {Array.from({ length: 8 }).map((_, i) => {
                  const angle = (i * Math.PI) / 4;
                  const x = 50 + Math.cos(angle) * 45;
                  const y = 50 + Math.sin(angle) * 45;
                  return (
                    <polygon
                      key={i}
                      points={`${x},${y-3} ${x+3},${y} ${x},${y+3} ${x-3},${y}`}
                      fill="currentColor"
                    />
                  );
                })}
              </svg>

              {/* Inner Logo Image */}
              <div className="absolute inset-0 flex items-center justify-center p-2.5">
                <motion.img
                  src={logo}
                  alt="Royal Hair Line Logo"
                  className="w-13 h-13 object-contain opacity-100 mix-blend-multiply"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 1.2, ease: "easeOut" }}
                />
              </div>
            </motion.div>

            {/* Glowing Brand Text */}
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="text-3xl font-display uppercase tracking-[0.25em] text-[#2d2d2d] mb-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Royal Hair Line
            </motion.h1>

            {/* Custom Golden Separator with Diamond Ornament */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "100px", opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.8 }}
              className="flex items-center justify-center my-3 text-[#5A5A40]"
            >
              <div className="h-[1px] bg-gradient-to-r from-transparent to-[#5A5A40] flex-1" />
              <span className="mx-2 text-xs">◆</span>
              <div className="h-[1px] bg-gradient-to-l from-transparent to-[#5A5A40] flex-1" />
            </motion.div>

            {/* Quote Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ delay: 1.6, duration: 0.8 }}
              className="text-xs uppercase tracking-[0.3em] text-[#3d3d3d]/70 italic mt-1 font-serif"
              style={{ fontFamily: "'Great Vibes', cursive" }}
            >
              "Where Every Cut is a Crown"
            </motion.p>
          </div>

          {/* Background overlay bars for custom transition effect */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 0 }}
            exit={{ 
              scaleY: 1,
              transition: { duration: 0.4, ease: "easeIn" }
            }}
            className="absolute bottom-0 left-0 right-0 bg-[#B8860B] origin-bottom z-10 hidden"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
