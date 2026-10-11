/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Star } from "lucide-react";

export default function Contact() {
  const addressDetails = {
    full: "Royal Hair Line, Near Karnavati Dabeli, Opposite Hirabhai Tower, Maninagar",
    cityState: "Ahmedabad, Gujarat, India - 380008",
    booking: "+91 96623 94141",
    customerCare: "+91 96384 04141",
    email: "royalhairline41@gmail.com",
    hoursWeekday: "Wed–Mon: 9:30 AM – 9:30 PM",
    hoursSunday: "Tuesday: Closed",
    instagram: "@royal_hairline",
    instagramUrl: "https://www.instagram.com/royal_hairline?igsh=MWVza3Y5ZHVpeWNxZw==",
    googleProfileUrl: "https://maps.app.goo.gl/JG5VNF3JQ7RMe5K48",
    facebook: "Royal Hair Line"
  };

  return (
    <section id="contact" className="relative z-10 py-24 md:py-32 px-6 overflow-hidden bg-[#fdfcf7]/20 border-t border-[#e8e4d8]">
      <div className="absolute top-[30%] left-0 w-[50vw] h-[50vw] bg-[radial-gradient(circle,rgba(90,90,64,0.03),transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <span className="text-xs uppercase tracking-[0.3em] text-[#5A5A40] font-semibold mb-2 block">Reach Out</span>
          <h2
            className="text-3xl md:text-5xl font-display font-medium text-[#2d2d2d] tracking-tight uppercase"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Find Your Royal Destination
          </h2>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#5A5A40] to-transparent mt-4" />
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Left panel: Info Details details */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8 p-8 border border-[#e8e4d8] bg-white relative rounded-3xl shadow-md">
            <div className="absolute top-4 right-4 p-3 text-stone-400 text-[10px] font-mono select-none font-medium">
              COORD // 22.9975° N, 72.6102° E
            </div>

            <div className="pt-4">
              <span className="text-[10px] font-mono tracking-widest text-[#5A5A40] uppercase block mb-6 font-bold">Salon Details</span>
              
              <div className="space-y-6">
                {/* Address details */}
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full border border-[#5A5A40]/30 bg-[#fdfcf7] flex items-center justify-center text-[#5A5A40] flex-shrink-0 shadow-sm">
                    <MapPin size={14} />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-mono tracking-widest text-[#5A5A40] uppercase font-bold">Our Address</h4>
                    <p className="text-xs md:text-sm text-[#2d2d2d] font-sans font-light mt-1 leading-relaxed">
                      {addressDetails.full} <br />
                      <span className="text-stone-400 font-medium">{addressDetails.cityState}</span>
                    </p>
                  </div>
                </div>

                {/* Contacts Details */}
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full border border-[#5A5A40]/30 bg-[#fdfcf7] flex items-center justify-center text-[#5A5A40] flex-shrink-0 shadow-sm">
                    <Phone size={14} />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-mono tracking-widest text-[#5A5A40] uppercase font-bold">Booking Details</h4>
                    <p className="text-xs md:text-sm text-[#2d2d2d] font-sans font-medium mt-1 leading-relaxed">
                      Call / WhatsApp: <a href="https://wa.me/919662394141" target="_blank" rel="noopener noreferrer" className="text-[#5A5A40] hover:underline font-bold">{addressDetails.booking}</a> <br />
                      Customer Care: <a href="tel:+919638404141" className="text-[#5A5A40] hover:underline font-bold">{addressDetails.customerCare}</a>
                    </p>
                  </div>
                </div>

                {/* Email details */}
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full border border-[#5A5A40]/30 bg-[#fdfcf7] flex items-center justify-center text-[#5A5A40] flex-shrink-0 shadow-sm">
                    <Mail size={14} />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-mono tracking-widest text-[#5A5A40] uppercase font-bold">Support Inbox</h4>
                    <p className="text-xs md:text-sm text-[#2d2d2d] font-sans font-light mt-1">
                      {addressDetails.email}
                    </p>
                  </div>
                </div>

                {/* Operating Hours details */}
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full border border-[#5A5A40]/30 bg-[#fdfcf7] flex items-center justify-center text-[#5A5A40] flex-shrink-0 shadow-sm">
                    <Clock size={14} />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-mono tracking-widest text-[#5A5A40] uppercase font-bold">Operating Hours</h4>
                    <p className="text-xs md:text-sm text-[#2d2d2d] font-sans font-light mt-1 leading-relaxed">
                      {addressDetails.hoursWeekday} <br />
                      <span className="text-stone-500">{addressDetails.hoursSunday}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social handles links panel */}
            <div className="border-t border-[#e8e4d8] pt-6">
              <span className="text-[10px] font-mono tracking-[0.2em] text-[#5A5A40] uppercase block mb-4 font-bold">Follow Royalty</span>
              <div className="flex flex-wrap gap-4">
                <a
                  href={addressDetails.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-4 py-2 bg-[#fdfcf7] border border-[#e8e4d8] rounded-xl text-xs text-[#3d3d3d] hover:bg-[#5A5A40] hover:text-white hover:border-[#5A5A40] tracking-wider uppercase font-sans font-medium transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer group hover:-translate-y-0.5"
                >
                  <Instagram size={14} className="text-[#5A5A40] group-hover:text-white transition-colors duration-300 animate-pulse" />
                  <span className="group-hover:text-white transition-colors duration-300">{addressDetails.instagram}</span>
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-4 py-2 bg-[#fdfcf7] border border-[#e8e4d8] rounded-xl text-xs text-[#3d3d3d] hover:bg-[#5A5A40] hover:text-white hover:border-[#5A5A40] tracking-wider uppercase font-sans font-medium transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer group hover:-translate-y-0.5"
                >
                  <Facebook size={14} className="text-[#5A5A40] group-hover:text-white transition-colors duration-300" />
                  <span className="group-hover:text-white transition-colors duration-300">{addressDetails.facebook}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right panel: Premium Custom Map Embed layout with directions */}
          <div className="lg:col-span-7 border border-[#e8e4d8] bg-white p-5 relative flex flex-col justify-between overflow-hidden group shadow-md rounded-3xl">
            {/* Visual borders */}
            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-[#5A5A40] to-transparent" />

            <div className="relative w-full h-[280px] border border-[#e8e4d8] bg-stone-50 overflow-hidden select-none rounded-2xl shadow-inner group">
              {/* Styled dark google map iframe embed to show Maninagar Ahmedabad beautifully! */}
              <iframe
                src="https://maps.google.com/maps?q=Royal%20Hair%20Line,%20Near%20Karnavati%20Dabeli,%20Opposite%20Hirabhai%20Tower,%20Maninagar,%20Ahmedabad&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(1) invert(0.1) contrast(1.1)" }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Royal Hair Line Maninagar Ahmedabad Salon Location Map"
              />
              
              {/* Link overlay */}
              <a 
                href={addressDetails.googleProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 bg-[#5A5A40]/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white z-20 pointer-events-auto"
                aria-label="Open location on Google Maps"
              >
                <span className="bg-[#5A5A40] text-white px-4 py-2 rounded-full shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 font-mono text-[10px] tracking-widest uppercase font-bold">Open Map Location ↗</span>
              </a>

              {/* Dynamic Map Coordinates Float */}
              <div className="absolute bottom-4 right-4 bg-white/95 border border-[#5A5A40]/30 px-3 py-1.5 text-[9px] font-mono tracking-widest text-[#5A5A40] uppercase z-10 pointer-events-none rounded-full shadow-sm">
                📍 Maninagar, Ahmedabad
              </div>
            </div>

            {/* Google Profile reviews & ratings block */}
            <div className="mt-4 pt-4 border-t border-[#e8e4d8] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono tracking-widest text-[#5A5A40] uppercase font-bold">Google Reviews</span>
                  <div className="flex text-amber-500 gap-0.5">
                    <Star size={11} className="fill-current" />
                    <Star size={11} className="fill-current" />
                    <Star size={11} className="fill-current" />
                    <Star size={11} className="fill-current" />
                    <Star size={11} className="fill-current" />
                  </div>
                </div>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-xl md:text-2xl font-bold font-display text-[#2d2d2d]" style={{ fontFamily: "'Playfair Display', serif" }}>
                    4.9 / 5.0
                  </span>
                  <span className="text-[10px] font-mono tracking-wider text-stone-500 uppercase">
                    (180+ Royal Reviews)
                  </span>
                </div>
                <p className="text-[10px] font-sans text-stone-400 mt-1">
                  Ahmedabad's luxury hub for premium hair, bridal, and modern styling beauty rituals.
                </p>
              </div>

              <div className="flex flex-row gap-2 w-full sm:w-auto">
                <a
                  href={addressDetails.googleProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none px-4 py-2.5 bg-[#5A5A40] hover:bg-[#8a8a6b] text-white text-[10px] font-mono tracking-widest uppercase transition-all duration-300 rounded-full text-center flex items-center justify-center gap-1.5 font-bold shadow-sm"
                >
                  Write Review
                </a>
                <a
                  href={addressDetails.googleProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none px-4 py-2.5 border border-[#e8e4d8] hover:border-[#5A5A40] hover:bg-[#5A5A40] hover:text-white text-[#5A5A40] text-[10px] font-mono tracking-widest uppercase transition-all duration-300 rounded-full text-center flex items-center justify-center gap-1.5 font-bold"
                >
                  View Profile
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
