/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion } from "motion/react";
import { Award, Star } from "lucide-react";
import { teamData } from "../data";
import { TeamMember } from "../types";

function TeamCard({ member }: { member: TeamMember; key?: string | number }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="relative w-full aspect-[3/4] max-w-[340px] mx-auto cursor-pointer group select-none"
      style={{ perspective: "1200px" }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="w-full h-full relative"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* FRONT SIDE */}
        <div
          className="absolute inset-0 w-full h-full bg-white border border-[#e8e4d8] p-4 flex flex-col justify-between shadow-md rounded-2xl"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Stylist Image Frame */}
          <div className="relative w-full flex-grow overflow-hidden border border-[#e8e4d8] rounded-xl bg-stone-50">
            <img
              src={member.photoUrl}
              alt={member.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
              style={{ objectPosition: member.objectPosition || "center" }}
              referrerPolicy="no-referrer"
            />
            {/* Visual gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-65" />
            
            {/* Floating badge */}
            <div className="absolute top-3 right-3 bg-[#5A5A40] px-2.5 py-1 text-[8px] font-mono tracking-widest text-white uppercase rounded-full font-bold shadow-sm">
              {member.experience} EXP
            </div>
          </div>

          {/* Core Info */}
          <div className="pt-3 flex-none">
            <div className="flex items-center justify-between text-[#8a8a6b] text-[9px] font-mono tracking-widest uppercase mb-1">
              <span>{member.role.split(" & ")[0]}</span>
              <span className="flex items-center gap-0.5 text-[#5A5A40]">
                <Star size={8} className="fill-current" />
                <Star size={8} className="fill-current" />
                <Star size={8} className="fill-current" />
                <Star size={8} className="fill-current" />
                <Star size={8} className="fill-current" />
              </span>
            </div>
            
            <h3
              className="text-lg md:text-xl font-display text-[#2d2d2d] tracking-wide uppercase leading-tight group-hover:text-[#5A5A40] transition-colors duration-300"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {member.name}
            </h3>
            
            <span className="text-[10px] font-sans tracking-widest uppercase text-[#5A5A40] block mt-1 font-medium">
              Hover to meet
            </span>
          </div>
        </div>

        {/* BACK BACK SIDE */}
        <div
          className="absolute inset-0 w-full h-full bg-[#fcfbf7] border border-[#5A5A40]/30 p-6 flex flex-col justify-between shadow-md rounded-2xl"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {/* Header */}
          <div>
            <div className="flex items-center gap-1.5 text-[#5A5A40] font-mono text-[9px] tracking-widest uppercase mb-2">
              <Award size={12} />
              <span>Master Artist Bio</span>
            </div>
            
            <h3
              className="text-xl font-display text-[#5A5A40] uppercase tracking-wider mb-1"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {member.name}
            </h3>
            <span className="text-xs text-stone-500 uppercase tracking-widest font-mono block mb-4 border-b border-[#e8e4d8] pb-2">
              {member.role}
            </span>

            {/* Short Bio */}
            <p className="text-xs text-stone-600 font-sans leading-relaxed font-light italic mb-4">
              "{member.bio}"
            </p>
          </div>

          {/* Specialties list */}
          <div>
            <span className="text-[10px] font-mono tracking-widest text-[#5A5A40] uppercase block mb-2">
              Master Specialties
            </span>
            <div className="flex flex-wrap gap-1.5">
              {member.specialty.map((spec) => (
                <span
                  key={spec}
                  className="bg-[#5A5A40]/10 border border-[#5A5A40]/20 text-[#5A5A40] text-[8px] uppercase tracking-wider px-2.5 py-1 rounded-full"
                >
                  {spec}
                </span>
              ))}
            </div>

            {/* CTA action indicator */}
            <span className="text-[9px] font-mono tracking-widest text-stone-400 block mt-6 text-center border-t border-[#e8e4d8] pt-3 uppercase">
              Click to return
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Team() {
  return (
    <section id="team" className="relative z-10 py-24 md:py-32 px-6 bg-[#fdfcf7]/20 border-t border-[#e8e4d8]">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <span className="text-xs uppercase tracking-[0.3em] text-[#5A5A40] font-semibold mb-2 block">Our Crown Jewel</span>
          <h2
            className="text-3xl md:text-5xl font-display font-medium text-[#2d2d2d] tracking-tight uppercase"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Meet Your Royal Stylists
          </h2>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#5A5A40] to-transparent mt-4 mb-6" />
          <p
            className="text-sm md:text-base text-[#5a5a5a] max-w-xl font-sans italic"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.25rem" }}
          >
            "Our team is our crown jewel. Each stylist is a master of their craft."
          </p>
        </div>

        {/* Stylist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {teamData.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}
