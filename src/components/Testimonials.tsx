/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonialsData } from "../data";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto scroll trigger
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
    }, 5500);

    return () => clearInterval(slideInterval);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  const currentTestimonial = testimonialsData[currentIndex];

  return (
    <section id="testimonials" className="relative z-10 py-24 md:py-32 px-6 overflow-hidden">
      {/* Background visual halo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[600px] max-h-[600px] rounded-full bg-[radial-gradient(ellipse,rgba(90,90,64,0.05),transparent_70%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-20">
          <span className="text-xs uppercase tracking-[0.3em] text-[#5A5A40] font-semibold mb-2 block">Guest Diaries</span>
          <h2
            className="text-3xl md:text-5xl font-display font-medium text-[#2d2d2d] tracking-tight uppercase"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            What Our Royals Say
          </h2>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#5A5A40] to-transparent mt-4" />
        </div>

        {/* Sliding card card frame */}
        <div className="relative border border-[#e8e4d8] bg-white p-8 md:p-16 text-center select-none shadow-md overflow-hidden rounded-3xl">
          {/* Subtle side gold lines */}
          <div className="absolute left-0 inset-y-8 w-[1px] bg-gradient-to-b from-transparent via-[#5A5A40]/20 to-transparent" />
          <div className="absolute right-0 inset-y-8 w-[1px] bg-gradient-to-b from-transparent via-[#5A5A40]/20 to-transparent" />

          {/* Floating Luxury Quote Mark Icon */}
          <div className="flex justify-center mb-6 text-[#5A5A40]/30">
            <Quote size={40} className="stroke-[1.5px] rotate-180" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              {/* Star Rating */}
              <div className="flex justify-center gap-1 mb-6 text-[#5A5A40]">
                {Array.from({ length: currentTestimonial.rating }).map((_, i) => (
                  <Star key={i} size={16} className="fill-current stroke-[#5A5A40]" />
                ))}
              </div>

              {/* Quotes Content */}
              <blockquote
                className="text-lg md:text-2xl text-[#2d2d2d] font-serif max-w-2xl italic leading-relaxed mb-8 tracking-wide font-normal px-4"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                "{currentTestimonial.text}"
              </blockquote>

              {/* Guest name & position */}
              <div className="flex flex-col items-center uppercase tracking-widest text-[#5A5A40]">
                <cite className="not-italic text-sm font-semibold tracking-[0.2em] text-[#2d2d2d] font-sans" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  {currentTestimonial.name}
                </cite>
                <span className="text-[10px] font-mono tracking-widest text-stone-500 mt-1">
                  {currentTestimonial.location} — {currentTestimonial.date}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Visual Indicators Controls */}
          <div className="flex justify-between items-center mt-12 pt-8 border-t border-[#e8e4d8] max-w-xs mx-auto">
            {/* Prev button */}
            <button
              onClick={handlePrev}
              className="w-10 h-10 border border-[#e8e4d8] hover:border-[#5A5A40] hover:text-white hover:bg-[#5A5A40] bg-transparent text-[#5A5A40] flex items-center justify-center transition-all duration-300 rounded-full cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={16} />
            </button>

            {/* Navigation Dots */}
            <div className="flex gap-2">
              {testimonialsData.map((t, idx) => (
                <button
                  key={t.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-1.5 h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
                    currentIndex === idx ? "bg-[#5A5A40] w-4" : "bg-[#e8e4d8] hover:bg-[#5A5A40]"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Next button */}
            <button
              onClick={handleNext}
              className="w-10 h-10 border border-[#e8e4d8] hover:border-[#5A5A40] hover:text-white hover:bg-[#5A5A40] bg-transparent text-[#5A5A40] flex items-center justify-center transition-all duration-300 rounded-full cursor-pointer"
              aria-label="Next testimonial"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
