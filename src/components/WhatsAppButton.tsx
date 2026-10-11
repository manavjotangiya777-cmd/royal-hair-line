/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const number = "919662394141";
  const text = encodeURIComponent("Hello Royal Hair Line! I would like to inquire about a luxury grooming session.");
  const url = `https://wa.me/${number}?text=${text}`;

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact Royal Hair Line on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-white border-2 border-[#5A5A40] text-[#5A5A40] hover:text-white hover:bg-[#5A5A40] transition-all duration-300 shadow-md cursor-pointer group"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 3, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ 
        scale: 1.1,
        boxShadow: "0 0 25px rgba(90, 90, 64, 0.4)",
      }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Pulse Ripple Effect */}
      <span className="absolute inset-0 rounded-full border border-[#5A5A40] animate-ping-slow pointer-events-none opacity-40" />

      <MessageCircle size={24} className="relative z-10" />

      {/* Tooltip */}
      <div className="absolute right-16 bg-white text-xs text-[#5A5A40] font-sans border border-[#e8e4d8] px-3 py-1.5 rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 uppercase tracking-widest pointer-events-none transition-all duration-300 scale-90 origin-right translate-x-2 shadow-md md:block hidden">
        Reserve Desk
      </div>
    </motion.a>
  );
}
