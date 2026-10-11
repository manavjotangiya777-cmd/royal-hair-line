/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Maximize2, Play, Eye, Sliders, ChevronRight } from "lucide-react";
import { galleryData } from "../data";
import { GalleryItem } from "../types";

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);
  
  // Before/after toggle state for comparison items
  const [beforeAfterValues, setBeforeAfterValues] = useState<Record<string, number>>({
    gal_trans_1: 50,
    gal_trans_2: 50
  });

  const filters = [
    { id: "all", label: "All Work" },
    { id: "transformation", label: "Before / After" },
    { id: "ambiance", label: "Salon Interior" },
    { id: "team_at_work", label: "Behind the Scenes" },
    { id: "bridal", label: "Bridal Specials" }
  ];

  const filteredItems = galleryData.filter(
    (item) => activeFilter === "all" || item.category === activeFilter
  );

  const displayedItems = filteredItems.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  const handleSliderChange = (id: string, val: number) => {
    setBeforeAfterValues((prev) => ({
      ...prev,
      [id]: val
    }));
  };

  return (
    <section id="gallery" className="relative z-10 py-24 md:py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <span className="text-xs uppercase tracking-[0.3em] text-[#5A5A40] font-semibold mb-2 block">Our Artistry</span>
          <h2
            className="text-3xl md:text-5xl font-display font-medium text-[#2d2d2d] tracking-tight uppercase"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            The Royal Gallery
          </h2>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#5A5A40] to-transparent mt-4 mb-6" />
          <p
            className="text-sm md:text-base text-[#5a5a5a] max-w-xl font-sans italic"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.25rem" }}
          >
            "Witness the transformations. Every frame tells a story of excellence."
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {filters.map((fil) => {
            const isActive = activeFilter === fil.id;
            return (
              <button
                key={fil.id}
                onClick={() => {
                  setActiveFilter(fil.id);
                  setVisibleCount(6); // reset
                }}
                className={`px-5 py-2.5 text-[10px] md:text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 relative rounded-full cursor-pointer border ${
                  isActive
                    ? "bg-[#5A5A40] border-[#5A5A40] text-white"
                    : "bg-white/60 border-[#e8e4d8] text-[#3d3d3d]/80 hover:text-[#5A5A40] hover:border-[#5A5A40]"
                }`}
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {fil.label}
              </button>
            );
          })}
        </div>

        {/* Masonry-like Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
        >
          {displayedItems.map((item) => {
            const isTransformation = item.category === "transformation" && item.beforeUrl && item.afterUrl;
            const sliderVal = beforeAfterValues[item.id] !== undefined ? beforeAfterValues[item.id] : 50;

            return (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative flex flex-col border border-[#e8e4d8] bg-white p-4 group overflow-hidden shadow-md rounded-2xl"
              >
                {/* Immersive Comparison Slider / Visual Image Case */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-black select-none">
                  {isTransformation ? (
                    // Interactive split slider comparison
                    <div className="absolute inset-0 select-none">
                      {/* After view (Base) */}
                      <img
                        src={item.afterUrl}
                        alt="Transformation After"
                        className="absolute inset-0 w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />

                      {/* Before view (Cropped overlay) */}
                      <div
                        className="absolute inset-y-0 left-0 overflow-hidden"
                        style={{ width: `${sliderVal}%` }}
                      >
                        <img
                          src={item.beforeUrl}
                          alt="Transformation Before"
                          className="absolute inset-y-0 left-0 h-full object-cover max-w-none"
                          style={{ height: "100%", width: "auto" }} // trick to allow absolute aspect scale tracking
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Slider Control Line Handle */}
                      <div
                        className="absolute inset-y-0 w-1 bg-[#5A5A40] cursor-ew-resize shadow-[0_0_10px_rgba(90,90,64,0.5)]"
                        style={{ left: `${sliderVal}%` }}
                      >
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border-2 border-[#5A5A40] text-[#5A5A40] flex items-center justify-center font-mono text-[9px] pointer-events-none shadow-xl select-none uppercase">
                          ↔
                        </div>
                      </div>

                      {/* Input range overlays */}
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={sliderVal}
                        onChange={(e) => handleSliderChange(item.id, parseFloat(e.target.value))}
                        className="absolute inset-0 opacity-0 cursor-ew-resize z-20 w-full h-full"
                      />

                      {/* Labels badges */}
                      <div className="absolute bottom-3 left-3 z-10 bg-[#f0ede4]/90 text-[9px] font-mono tracking-widest text-[#3d3d3d] px-2 py-0.5 border border-[#e8e4d8] rounded-full">
                        Before
                      </div>
                      <div className="absolute bottom-3 right-3 z-10 bg-[#5A5A40]/90 text-[9px] font-mono tracking-widest text-white px-2 py-0.5 border border-[#5A5A40]/30 animate-pulse rounded-full">
                        After
                      </div>
                    </div>
                  ) : item.type === "video" ? (
                    // Video Item Autoplay on Hover
                    <div className="absolute inset-0">
                      <video
                        src={item.videoUrl}
                        poster={item.url}
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        onMouseEnter={(e) => {
                          e.currentTarget.play().catch(() => {});
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.pause();
                        }}
                      />
                      <div className="absolute inset-0 bg-[#000000]/20 pointer-events-none group-hover:bg-transparent transition-colors duration-300" />
                      
                      {/* Video overlay icon */}
                      <div className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-[#f0ede4]/90 border border-[#e8e4d8] flex items-center justify-center text-[#5A5A40] pointer-events-none group-hover:bg-[#5A5A40] group-hover:text-white transition-all duration-300">
                        <Play size={14} className="fill-current pl-0.5" />
                      </div>
                      
                      {/* Hint bubble */}
                      <div className="absolute bottom-3 left-3 bg-[#f5f2ed]/90 text-[8px] font-mono tracking-widest text-[#5A5A40] px-2 py-1 uppercase rounded-full">
                        Hover to play reel ✦
                      </div>
                    </div>
                  ) : (
                    // Regular Static Image with 3D Scale Effect
                    <div className="absolute inset-0">
                      <img
                        src={item.url}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none" />
                    </div>
                  )}

                  {/* Lightbox Trigger Icon for everything */}
                  {!isTransformation && (
                    <button
                      onClick={() => setLightboxItem(item)}
                      className="absolute top-3 left-3 z-10 w-8 h-8 rounded-full bg-[#f0ede4]/95 border border-[#e8e4d8] text-[#5A5A40] hover:bg-[#5A5A40] hover:text-white flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 cursor-pointer"
                      title="Enlarge Image"
                    >
                      <Maximize2 size={12} />
                    </button>
                  )}
                </div>

                {/* Card meta data details */}
                <div className="pt-4 flex flex-col justify-between">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <span className="text-[10px] font-mono tracking-widest text-[#5A5A40] uppercase block">
                        {item.category.replace("_", " ")}
                      </span>
                      <h3
                        className="text-base font-display font-medium text-[#2d2d2d] tracking-wide mt-1 uppercase"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {item.title}
                      </h3>
                    </div>
                  </div>
                  
                  <p className="text-xs text-[#5a5a5a] mt-2 font-sans font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Load More Button */}
        {filteredItems.length > visibleCount && (
          <div className="flex justify-center mt-12 md:mt-16">
            <button
              onClick={handleLoadMore}
              className="px-6 py-3 border border-[#5A5A40]/30 bg-transparent text-[#5A5A40] hover:bg-[#5A5A40] hover:text-white font-sans font-semibold text-xs tracking-[0.2em] uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer rounded-full"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              <span>Load More Masterpieces</span>
              <ChevronRight size={14} />
            </button>
          </div>
        )}
      </div>

      {/* Lightbox Portal overlay */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxItem(null)}
            className="fixed inset-0 z-9999 bg-[#000000]/95 backdrop-blur-sm flex items-center justify-center p-6 cursor-zoom-out"
          >
            {/* Soft inner glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(10,10,10,0.5),rgba(0,0,0,0.95))]" />

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[85vh] w-full flex flex-col justify-center select-none"
            >
              {/* Media Container */}
              <div className="relative aspect-[4/3] w-full max-h-[70vh] bg-stone-950 overflow-hidden border border-[#B8860B]/30 shadow-2xl">
                {lightboxItem.type === "video" ? (
                  <video
                    src={lightboxItem.videoUrl}
                    controls
                    autoPlay
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <img
                    src={lightboxItem.url}
                    alt={lightboxItem.title}
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                )}
              </div>

               {/* Caption metadata */}
              <div className="pt-4 text-center">
                <span className="text-[10px] font-mono tracking-[0.3em] text-[#8a8a6b] uppercase block">
                  {lightboxItem.category.replace("_", " ")}
                </span>
                <h4
                  className="text-lg font-display text-[#FDF8F0] mt-1 uppercase tracking-widest"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {lightboxItem.title}
                </h4>
                <p className="text-xs text-[#FDF8F0]/75 font-sans mt-2 max-w-lg mx-auto font-light">
                  {lightboxItem.description}
                </p>
              </div>

              {/* Close triggers label */}
              <button
                onClick={() => setLightboxItem(null)}
                className="absolute -top-12 right-0 bg-transparent border-none text-[#FDF8F0]/75 hover:text-[#8a8a6b] font-sans text-xs uppercase tracking-widest cursor-pointer"
              >
                ✕ Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
