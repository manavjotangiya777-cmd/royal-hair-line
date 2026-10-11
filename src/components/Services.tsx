/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Clock, Search, HelpCircle } from "lucide-react";
import { servicesData } from "../data";
import { ServiceItem } from "../types";

export default function Services() {
  const [activeTab, setActiveTab] = useState<"all" | "men" | "women" | "unisex">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", label: "All Offerings" },
    { id: "men", label: "Gentlemen" },
    { id: "women", label: "Ladies" },
    { id: "unisex", label: "Unisex & Spa" }
  ];

  // Filter based on activeTab and searchQuery
  const filteredServices = servicesData.filter((sec) => {
    const matchesTab = activeTab === "all" || sec.category === activeTab;
    const matchesSearch =
      sec.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (sec.description && sec.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTab && matchesSearch;
  });

  // Animation variants
  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section id="services" className="relative z-10 py-24 md:py-32 px-6 bg-[#fdfcf7]/20 border-t border-[#e8e4d8]">
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#fdfcf7]/50 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <span className="text-xs uppercase tracking-[0.3em] text-[#5A5A40] font-bold mb-2 block">The Royal Menu</span>
          <h2
            className="text-3xl md:text-5xl font-display font-medium text-[#2d2d2d] tracking-tight uppercase"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Our Royal Services
          </h2>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#5A5A40] to-transparent mt-4 mb-6" />
          <p
            className="text-sm md:text-base text-stone-600 max-w-xl font-sans italic font-medium"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.25rem" }}
          >
            "From bold transformations to refined grooming — every service delivered with royal precision."
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-12 border-b border-[#e8e4d8] pb-8">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => {
              const isActive = activeTab === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id as any)}
                  className={`px-5 py-2.5 text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300 relative cursor-pointer border rounded-full overflow-hidden ${
                    isActive
                      ? "text-white border-transparent"
                      : "text-stone-600 hover:text-[#5A5A40] border-[#e8e4d8] bg-white shadow-sm"
                  }`}
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {/* Text label */}
                  <span className="relative z-10">{cat.label}</span>
                  
                  {/* Sliding tab background indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeServiceTab"
                      className="absolute inset-0 bg-[#5A5A40]"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Search */}
          <div className="relative w-full max-w-xs group">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-[#5A5A40]">
              <Search size={16} />
            </span>
            <input
              type="text"
              placeholder="Search Royal Services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white text-stone-700 text-xs uppercase tracking-widest pl-10 pr-4 py-3.5 border border-[#e8e4d8] focus:border-[#5A5A40] outline-none transition-all duration-300 rounded-full placeholder-stone-400 focus:shadow-sm font-sans"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            />
          </div>
        </div>

        {/* Services List Grid */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeTab + searchQuery}
            variants={gridVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredServices.map((service) => (
              <motion.div
                key={service.id}
                variants={cardVariants}
                className="p-6 border border-[#e8e4d8] bg-white relative flex flex-col justify-between group hover:border-[#5A5A40] transition-all duration-300 overflow-hidden rounded-3xl shadow-sm"
              >
                {/* Floating shine layer */}
                <div className="absolute inset-0 bg-gradient-to-br from-stone-50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div>
                  {/* Title Header */}
                  <div className="flex justify-between items-start gap-4 mb-3 border-b border-[#e8e4d8] pb-3">
                    <h3
                      className="text-base md:text-lg font-display uppercase tracking-widest text-[#2d2d2d] group-hover:text-[#5A5A40] transition-colors duration-300 font-semibold"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {service.name}
                    </h3>
                  </div>

                  {/* Duration marker */}
                  <div className="flex items-center gap-1.5 text-[10px] font-mono tracking-widest text-stone-400 uppercase mb-4">
                    <Clock size={12} className="text-[#5A5A40]" />
                    <span>Duration: {service.duration}</span>
                  </div>

                  {/* Description */}
                  <p className="text-xs md:text-sm text-stone-500 leading-relaxed font-sans font-light mb-6">
                    {service.description || "Indulge in a premium, personalized custom service styled exactly to your royal expectations."}
                  </p>
                </div>

                {/* Card Tag Category and indicator icon */}
                <div className="flex items-center justify-between mt-auto pt-2 text-[9px] font-mono tracking-widest text-[#5A5A40] uppercase font-bold">
                  <span>Category: {service.category}</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs">◆</span>
                </div>
              </motion.div>
            ))}

            {filteredServices.length === 0 && (
              <div className="col-span-full py-16 text-center border border-dashed border-[#e8e4d8] bg-stone-50 rounded-3xl flex flex-col items-center justify-center">
                <HelpCircle className="w-10 h-10 text-stone-400 mb-3" />
                <p className="text-sm text-stone-500 uppercase tracking-widest font-sans">
                  No Royal services matched your queries
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>


      </div>
    </section>
  );
}
