/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Sparkles, ShieldCheck, Stars, Compass, Landmark, Flame } from "lucide-react";

export default function About() {
  const brandPillars = [
    {
      icon: <Flame className="w-5 h-5 text-[#5A5A40]" />,
      title: "Artistry",
      desc: "Our master artists blend time-honored techniques with cutting-edge modern trends, turning hair care into custom canvas designs."
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#5A5A40]" />,
      title: "Hygiene",
      desc: "100% sterilized medical-grade safety standards. Sanity, fresh tools, and single-use protective linen for every single royalty guests."
    },
    {
      icon: <Landmark className="w-5 h-5 text-[#5A5A40]" />,
      title: "Respect",
      desc: "We treat every client walks through our luxury doors with undivided attention. We actively listen, we understand, and we create."
    }
  ];

  const benefits = [
    "Premium international hair products only",
    "Hygienic, sanitized tools for every client",
    "Trained stylists updated with global trends",
    "Relaxing, luxurious ambiance"
  ];

  return (
    <section id="about" className="relative z-10 py-24 md:py-32 px-6 overflow-hidden bg-white">
      {/* Background radial soft light */}
      <div className="absolute top-[10%] right-0 w-[40vw] h-[40vw] bg-[radial-gradient(circle,rgba(90,90,64,0.04),transparent_60%)] pointer-events-none" />
      <div className="absolute bottom-[10%] left-0 w-[40vw] h-[40vw] bg-[radial-gradient(circle,rgba(90,90,64,0.04),transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Heading with Mask Slide Effect or elegant fade-up */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <div className="flex items-center gap-2 mb-2 text-[#5A5A40]">
            <span className="text-xs uppercase tracking-[0.3em] font-sans font-bold">The Salon Difference</span>
          </div>
          <h2
            className="text-3xl md:text-5xl font-display font-medium text-[#2d2d2d] tracking-tight uppercase"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            The Royal Difference
          </h2>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#5A5A40] to-transparent mt-4" />
        </div>

        {/* Brand Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center mb-20">
          <div className="lg:col-span-7 space-y-6">
            <h3
              className="text-2xl sm:text-3xl font-display text-[#5A5A40] italic font-medium"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              "We don't just cut hair — we craft identities."
            </h3>
            
            <p className="text-base text-stone-600 font-sans leading-relaxed tracking-wide font-light">
              At Royal Hair Line, our salon is a sanctuary where artistry meets precision, where every client is treated with the attention of royalty. We was born from a singular vision: to create a space where every client walks out feeling like royalty. We believe great hair is not a luxury — it is a right.
            </p>
            
            <p className="text-base text-stone-500 font-sans leading-relaxed tracking-wide font-light">
              Whether you are stepping in for a sharp gentleman's cut, a bridal transformation, or a color revolution — at Royal Hair Line, your hair is our canvas and excellence is our only standard.
            </p>

            {/* Core Pillars List */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-center gap-3 text-xs md:text-sm text-stone-600 font-sans tracking-wide">
                  <div className="w-5 h-5 rounded-full bg-[#5A5A40]/10 border border-[#5A5A40]/20 flex items-center justify-center text-[#5A5A40] flex-shrink-0 shadow-sm">
                    <Stars className="w-3 h-3" />
                  </div>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Side Origin Stat Display */}
          <div className="lg:col-span-5 p-8 md:p-10 border border-[#e8e4d8] bg-white relative group overflow-hidden rounded-3xl shadow-md">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle,rgba(90,90,64,0.1),transparent_70%)] pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-[#5A5A40] to-transparent" />
            
            <span className="text-xs font-mono uppercase tracking-widest text-[#5A5A40] block mb-4 font-bold">Our Origin</span>
            <h4
              className="text-2xl font-display text-[#2d2d2d] mb-4 uppercase tracking-widest"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Born of Passion
            </h4>
            <p className="text-sm text-stone-500 leading-relaxed mb-6 font-sans font-light">
              Royal Hair Line was founded with a dream — to bring luxury hair care to everyone, regardless of gender. We believed that feeling confident and beautiful should never be a privilege. Our doors opened as a small studio, driven by passion and precision. Today, we stand as the city's most trusted name in premium grooming.
            </p>

            <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-[#5A5A40] uppercase font-semibold">
              <Compass className="w-4 h-4 animate-spin-slow" />
              <span>Sanctuary of Confidence</span>
            </div>
          </div>
        </div>

        {/* Sacred Principles Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
          {brandPillars.map((pillar, idx) => (
            <motion.div
              key={pillar.title}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              whileHover={{ y: -6, borderColor: "#5A5A40" }}
              className="p-8 border border-[#e8e4d8] bg-white relative flex flex-col group transition-all duration-300 rounded-3xl shadow-sm"
            >
              {/* Corner accent */}
              <div className="absolute top-4 right-4 text-[#5A5A40] text-[8px] font-bold">
                ◆
              </div>

              <div className="w-10 h-10 rounded-full border border-[#5A5A40]/20 bg-[#fdfcf7] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 text-[#5A5A40]">
                {pillar.icon}
              </div>

              <h4
                className="text-xl font-display text-[#2d2d2d] uppercase tracking-widest mb-3"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {pillar.title}
              </h4>
              <p className="text-xs sm:text-sm text-stone-500 font-sans leading-relaxed font-light">
                {pillar.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
