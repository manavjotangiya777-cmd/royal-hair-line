/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "motion/react";

interface StatItemProps {
  number: string;
  label: string;
  suffix?: string;
  duration?: number;
}

function StatCard({ number, label, suffix = "+", duration = 1500 }: StatItemProps) {
  const [count, setCount] = useState(0);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  const targetValue = parseInt(number.replace(/[^0-9]/g, ""), 10) || 0;

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = targetValue;
    if (end === 0) return;

    const totalFrames = 60;
    const frameDuration = duration / totalFrames;
    let frame = 0;

    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      // Ease out quad
      const easedProgress = progress * (2 - progress);
      const currentVal = Math.round(start + easedProgress * (end - start));
      setCount(currentVal);

      if (frame >= totalFrames) {
        setCount(end);
        clearInterval(counter);
      }
    }, frameDuration);

    return () => clearInterval(counter);
  }, [isInView, targetValue, duration]);

  return (
    <div
      ref={cardRef}
      className="flex flex-col items-center justify-center p-6 md:p-8 border border-[#e8e4d8] bg-white relative group rounded-3xl shadow-sm overflow-hidden"
    >
      {/* Background tint on hover */}
      <div className="absolute inset-x-0 bottom-0 h-0 bg-[#5A5A40]/5 group-hover:h-full transition-all duration-500" />
      {/* Visual top border line */}
      <div className="absolute top-0 inset-x-4 h-[1px] bg-gradient-to-r from-transparent via-[#5A5A40]/40 to-transparent" />

      <h3
        className="text-4xl md:text-5xl font-display font-bold text-[#5A5A40] mb-2 tracking-tight select-none"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        {count.toLocaleString()}
        <span>{suffix}</span>
      </h3>
      <p
        className="text-[10px] md:text-xs font-sans font-semibold uppercase tracking-[0.2em] text-stone-500 text-center select-none"
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        {label}
      </p>
    </div>
  );
}

export default function Stats() {
  return (
    <section id="stats-strip" className="relative z-10 py-12 md:py-16 bg-[#fdfcf7]/20 border-y border-[#e8e4d8]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <StatCard number="25" label="Years of Experience" />
          <StatCard number="100" label="Happy Client Rate" suffix="%" />
          <StatCard number="15" label="Master Stylists" />
          <StatCard number="50" label="Premium Services" />
        </div>
      </div>
    </section>
  );
}
