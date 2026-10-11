/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, Clock, User, Phone, Mail, Award, CheckCircle, FileText, ChevronLeft, Sparkles, ChevronDown, Check } from "lucide-react";
import { servicesData, teamData } from "../data";

interface CustomSelectProps {
  id: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (val: string) => void;
}

function CustomSelect({ id, value, options, onChange }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find((o) => o.value === value) || options[0];

  return (
    <div className="relative w-full z-30" id={id}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-[#fdfcf7] text-[#3d3d3d] border border-[#e8e4d8] focus:border-[#5A5A40] hover:border-[#5A5A40] outline-none p-3.5 text-xs uppercase tracking-wider font-sans rounded-xl transition-all duration-300 flex justify-between items-center cursor-pointer text-left font-medium"
      >
        <span>{selectedOption?.label}</span>
        <ChevronDown size={14} className={`text-[#8a8a6b] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop target to close dropdown */}
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
              className="absolute left-0 right-0 mt-1.5 max-h-60 overflow-y-auto bg-[#fdfcf7] border border-[#e8e4d8] rounded-xl shadow-xl z-50 py-1 divide-y divide-[#f7f5ee]"
            >
              {options.map((opt) => {
                const isSelected = opt.value === value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      onChange(opt.value);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left p-3.5 text-xs uppercase tracking-wider font-sans transition-all duration-150 flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? "bg-[#5A5A40] text-white font-bold"
                        : "text-[#3d3d3d] hover:bg-[#5A5A40]/10 hover:text-[#5A5A40] font-medium"
                    }`}
                  >
                    <span>{opt.label}</span>
                    {isSelected && (
                      <Check size={12} className="text-white flex-shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function BookingForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    serviceId: servicesData[0]?.id || "",
    stylistId: "any", // default any
    date: "",
    time: "",
    notes: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Time slots list as per updated hours (9:30 AM - 9:30 PM)
  const timeSlots = [
    "09:30 AM", "10:30 AM", "11:30 AM", "12:30 PM",
    "01:30 PM", "02:30 PM", "03:30 PM", "04:30 PM",
    "05:30 PM", "06:30 PM", "07:30 PM", "08:30 PM"
  ];

  const handleInputChange = (field: string, val: string) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateStep = (currentStep: number) => {
    const errs: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.serviceId) errs.serviceId = "Please select a premium service";
    }

    if (currentStep === 2) {
      if (!formData.date) {
        errs.date = "Please pick a reservation date";
      } else {
        const [year, month, day] = formData.date.split("-").map(Number);
        const localDate = new Date(year, month - 1, day);
        if (localDate.getDay() === 2) {
          errs.date = "We are closed on Tuesdays. Please pick another day.";
        }
      }
      if (!formData.time) errs.time = "Please choose a preferred time slot";
    }

    if (currentStep === 3) {
      if (!formData.fullName.trim()) errs.fullName = "Full name is required";
      if (!formData.phone.trim()) {
        errs.phone = "Phone number is required";
      } else if (!/^[0-9+() -]{10,15}$/.test(formData.phone.trim())) {
        errs.phone = "Please provide a valid contact number";
      }
      if (!formData.email.trim()) {
        errs.email = "Email address is required";
      } else if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
        errs.email = "Please provide a valid email address";
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(step)) {
      setStep((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateStep(3)) {
      // Simulate submission & save to localStorage to persist state
      const existingBookings = JSON.parse(localStorage.getItem("royal_bookings") || "[]");
      const completeBooking = {
        ...formData,
        id: "BOOK-" + Math.floor(100000 + Math.random() * 900000),
        timestamp: new Date().toISOString()
      };
      existingBookings.push(completeBooking);
      localStorage.setItem("royal_bookings", JSON.stringify(existingBookings));

      setBookingSuccess(true);
    }
  };

  const activeService = servicesData.find((s) => s.id === formData.serviceId);
  const activeStylist = teamData.find((t) => t.id === formData.stylistId);

  return (
    <section id="book" className="relative z-10 py-24 md:py-32 px-6 bg-[#fdfcf7]/20 border-t border-[#e8e4d8]">
      <div className="max-w-3xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-[#5A5A40] font-semibold mb-2 block">Throne Room</span>
          <h2
            className="text-3xl md:text-5xl font-display font-medium text-[#2d2d2d] tracking-tight uppercase"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Reserve Your Royal Throne
          </h2>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#5A5A40] to-transparent mt-4 mb-3" />
          <p className="text-sm text-[#5a5a5a] uppercase tracking-widest font-mono">
            "Your transformation is just one click away."
          </p>
        </div>

        {bookingSuccess ? (
          // SUCCESS ROYAL VOUCHER SCREEN
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="border-2 border-[#5A5A40] bg-white p-8 md:p-12 text-center relative shadow-lg overflow-hidden rounded-3xl"
          >
            {/* Visual borders */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#5A5A40] via-[#8a8a6b] to-[#5A5A40]" />
            <div className="absolute -right-16 -top-16 w-32 h-32 bg-[radial-gradient(circle,rgba(90,90,64,0.15),transparent_70%)] pointer-events-none" />

            <div className="flex justify-center mb-6 text-[#5A5A40]">
              <CheckCircle size={56} className="animate-bounce" />
            </div>

            <h3
              className="text-2xl md:text-3xl font-display text-[#2d2d2d] mb-3 uppercase tracking-widest"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Booking Confirmed
            </h3>
            
            <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-[#5a5a5a] max-w-md mx-auto mb-8 font-mono leading-relaxed">
              "Your throne awaits! We'll confirm your appointment within 2 hours via WhatsApp or call."
            </p>

            {/* Custom Voucher Receipt details */}
            <div className="border border-[#e8e4d8] bg-[#fdfcf7] p-6 text-left max-w-md mx-auto mb-8 relative font-sans rounded-2xl">
              <div className="absolute top-0 inset-x-0 h-[1px] bg-[#e8e4d8]" />
              <div className="text-[9px] font-mono tracking-widest text-[#8a8a6b] uppercase flex justify-between mb-4 font-semibold">
                <span>Voucher Receipt</span>
                <span>ID: ROYAL-{(Math.floor(Math.random() * 8999) + 1000)}</span>
              </div>

              <div className="space-y-3.5 text-sm">
                <div className="flex justify-between items-center border-b border-[#e8e4d8] pb-2">
                  <span className="text-[#8a8a6b] text-xs uppercase tracking-widest font-mono font-medium">Client</span>
                  <span className="text-[#2d2d2d] font-semibold uppercase font-sans tracking-wide text-xs">{formData.fullName}</span>
                </div>

                <div className="flex justify-between items-center border-b border-[#e8e4d8] pb-2">
                  <span className="text-[#8a8a6b] text-xs uppercase tracking-widest font-mono font-medium">Service</span>
                  <span className="text-[#5A5A40] font-bold text-xs uppercase tracking-wide">{activeService?.name}</span>
                </div>

                <div className="flex justify-between items-center border-b border-[#e8e4d8] pb-2">
                  <span className="text-[#8a8a6b] text-xs uppercase tracking-widest font-mono font-medium">Stylist</span>
                  <span className="text-[#3d3d3d] text-xs uppercase tracking-wide font-medium">{activeStylist?.name || "Any Available Master Stylist"}</span>
                </div>

                <div className="flex justify-between items-center border-b border-[#e8e4d8] pb-2">
                  <span className="text-[#8a8a6b] text-xs uppercase tracking-widest font-mono font-medium">Date</span>
                  <span className="text-[#3d3d3d] text-xs tracking-wide font-medium">{formData.date}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-[#8a8a6b] text-xs uppercase tracking-widest font-mono font-medium">Slot Time</span>
                  <span className="text-[#3d3d3d] text-xs tracking-wide font-medium">{formData.time}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setBookingSuccess(false);
                setStep(1);
                setFormData({
                  fullName: "",
                  phone: "",
                  email: "",
                  serviceId: servicesData[0]?.id || "",
                  stylistId: "any",
                  date: "",
                  time: "",
                  notes: ""
                });
              }}
              className="px-6 py-3 bg-[#5A5A40] hover:bg-[#8a8a6b] text-white font-sans font-medium text-[10px] uppercase tracking-widest transition-all duration-300 cursor-pointer rounded-full border-none shadow-md shadow-[#5A5A40]/20"
            >
              Book Another Session
            </button>
          </motion.div>
        ) : (
          // MULTI STEP FORM CONTAINER
          <form
            onSubmit={handleSubmit}
            className="border border-[#e8e4d8] bg-white p-6 md:p-10 shadow-md relative rounded-3xl"
          >
            {/* Steps Progress Header Indicator */}
            <div className="flex justify-between items-center mb-10 border-b border-[#f0ede4] pb-6">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <div
                    className={`w-7 h-7 flex items-center justify-center font-mono text-xs font-bold transition-all duration-300 rounded-full ${
                      step === s
                        ? "bg-[#5A5A40] text-white shadow-[0_0_10px_rgba(90,90,64,0.3)] scale-110"
                        : step > s
                        ? "bg-transparent border border-[#5A5A40] text-[#5A5A40]"
                        : "bg-transparent border border-stone-200 text-stone-400"
                    }`}
                  >
                    {s}
                  </div>
                  <span
                    className={`text-[9px] uppercase tracking-widest hidden sm:inline ${
                      step === s ? "text-[#5A5A40] font-semibold" : "text-stone-400"
                    }`}
                  >
                    {s === 1 ? "Service" : s === 2 ? "Schedule" : "Personal"}
                  </span>
                </div>
              ))}
            </div>

            {/* ERROR SUMMARY MESSAGE */}
            {Object.keys(errors).length > 0 && (
              <div className="mb-6 p-3 bg-red-950/20 border-l-2 border-red-500 text-red-400 text-xs uppercase tracking-wider font-mono">
                Please complete all required fields correctly.
              </div>
            )}

            {/* STEPS LAYOUT SWITCHER */}
            <div className="min-h-[250px]">
              {/* STEP 1: SERVICE & STYLIST SELECT */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-2 border-b border-[#f0ede4] pb-2 text-[#5A5A40]">
                    <Sparkles size={16} />
                    <span className="text-xs font-mono uppercase tracking-[0.2em]">Select Your Transformation</span>
                  </div>

                  {/* Dropdown for Services */}
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="form-service"
                      className="text-[10px] font-mono tracking-widest text-[#8a8a6b] uppercase font-semibold"
                    >
                      Select Service *
                    </label>
                    <CustomSelect
                      id="form-service"
                      value={formData.serviceId}
                      onChange={(val) => handleInputChange("serviceId", val)}
                      options={servicesData.map((s) => ({
                        value: s.id,
                        label: `[${s.category.toUpperCase()}] ${s.name} (${s.duration})`
                      }))}
                    />
                    {errors.serviceId && <span className="text-red-500 text-[10px] font-mono mt-1">{errors.serviceId}</span>}
                  </div>

                  {/* Dropdown for Stylist */}
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="form-stylist"
                      className="text-[10px] font-mono tracking-widest text-[#8a8a6b] uppercase font-semibold"
                    >
                      Preferred Stylist (Optional)
                    </label>
                    <CustomSelect
                      id="form-stylist"
                      value={formData.stylistId}
                      onChange={(val) => handleInputChange("stylistId", val)}
                      options={[
                        { value: "any", label: "Any Available Master Stylist" },
                        ...teamData.map((t) => ({
                          value: t.id,
                          label: `${t.name} — ${t.role.split(" & ")[0]}`
                        })),
                        { value: "darshan_valand", label: "Mr Darshan Valand" },
                        { value: "bablu_sharma", label: "Mr Bablu Sharma" },
                        { value: "bhadresh_gondaliya", label: "Mr Bhadresh Gondaliya" },
                        { value: "samir_gondaliya", label: "Mr Samir Gondaliya" },
                        { value: "yuvi_valand", label: "Mr Yuvi Valand" },
                        { value: "anil_nai", label: "Mr Anil Nai" },
                        { value: "manish_mundotiya", label: "Mr Manish Mundotiya" },
                        { value: "vansh_sisangiya", label: "Mr Vansh Sisangiya" },
                        { value: "arshan_manshuri", label: "Mr Arshan Manshuri" },
                        { value: "sangita_koted", label: "Ms Sangita Koted" },
                        { value: "anita_patel", label: "Ms Anita Patel" },
                        { value: "janvi_prajapati", label: "Ms Janvi Prajapati" }
                      ]}
                    />
                  </div>
                </motion.div>
              )}

              {/* STEP 2: DATE & TIME slots SELECT */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-2 border-b border-[#f0ede4] pb-2 text-[#5A5A40]">
                    <Calendar size={16} />
                    <span className="text-xs font-mono uppercase tracking-[0.2em]">Select Preferred Time</span>
                  </div>

                  {/* Date Pick */}
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="form-date"
                      className="text-[10px] font-mono tracking-widest text-[#8a8a6b] uppercase font-semibold"
                    >
                      Pick Date *
                    </label>
                    <input
                      id="form-date"
                      type="date"
                      min={new Date().toISOString().split("T")[0]}
                      value={formData.date}
                      onChange={(e) => handleInputChange("date", e.target.value)}
                      className="w-full bg-[#fdfcf7] text-[#3d3d3d] border border-[#e8e4d8] focus:border-[#5A5A40] outline-none p-3.5 text-xs uppercase tracking-widest font-sans dark:[color-scheme:light] rounded-xl transition-all duration-300"
                    />
                    <span className="text-[9px] text-[#8a8a6b] font-mono uppercase tracking-widest">Note: Closed on Tuesdays. Operating hours: 9:30 AM - 9:30 PM.</span>
                    {errors.date && <span className="text-red-500 text-[10px] font-mono mt-1">{errors.date}</span>}
                  </div>

                  {/* Time slots pills picker */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-mono tracking-widest text-[#8a8a6b] uppercase font-semibold">
                      Select Time Slot *
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 pt-2">
                      {timeSlots.map((time) => {
                        const isSelected = formData.time === time;
                        return (
                          <button
                            key={time}
                            type="button"
                            onClick={() => handleInputChange("time", time)}
                            className={`py-2 px-1 text-center text-[10px] focus:outline-none transition-all duration-300 font-sans cursor-pointer rounded-xl font-medium border ${
                              isSelected
                                ? "bg-[#5A5A40] text-white border-[#5A5A40] font-bold shadow-md shadow-[#5A5A40]/10"
                                : "bg-[#fdfcf7] text-[#3d3d3d] border-[#e8e4d8] hover:border-[#5A5A40]"
                            }`}
                          >
                            {time}
                          </button>
                        );
                      })}
                    </div>
                    {errors.time && <span className="text-red-500 text-[10px] font-mono mt-2">{errors.time}</span>}
                  </div>
                </motion.div>
              )}

              {/* STEP 3: PERSONAL DETAILS CONFIRM */}
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-5"
                >
                  <div className="flex items-center gap-2 border-b border-[#f0ede4] pb-2 text-[#5A5A40]">
                    <User size={16} />
                    <span className="text-xs font-mono uppercase tracking-[0.2em]">Personal Details</span>
                  </div>

                  {/* Grid Name / Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="form-name"
                        className="text-[10px] font-mono tracking-widest text-[#8a8a6b] uppercase font-semibold"
                      >
                        Full Name *
                      </label>
                      <input
                        id="form-name"
                        type="text"
                        placeholder="e.g. Priya Sharma"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange("fullName", e.target.value)}
                        className="w-full bg-[#fdfcf7] text-[#3d3d3d] border border-[#e8e4d8] focus:border-[#5A5A40] outline-none p-3.5 text-xs uppercase tracking-wider font-sans rounded-xl transition-all duration-300"
                      />
                      {errors.fullName && <span className="text-red-500 text-[10px] font-mono mt-1">{errors.fullName}</span>}
                    </div>

                    {/* Phone Number */}
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="form-phone"
                        className="text-[10px] font-mono tracking-widest text-[#8a8a6b] uppercase font-semibold"
                      >
                        Phone Number *
                      </label>
                      <input
                        id="form-phone"
                        type="tel"
                        placeholder="e.g. +91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="w-full bg-[#fdfcf7] text-[#3d3d3d] border border-[#e8e4d8] focus:border-[#5A5A40] outline-none p-3.5 text-xs uppercase tracking-wider font-sans rounded-xl transition-all duration-300"
                      />
                      {errors.phone && <span className="text-red-500 text-[10px] font-mono mt-1">{errors.phone}</span>}
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="form-email"
                      className="text-[10px] font-mono tracking-widest text-[#8a8a6b] uppercase font-semibold"
                    >
                      Email Address *
                    </label>
                    <input
                      id="form-email"
                      type="email"
                      placeholder="e.g. priya@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="w-full bg-[#fdfcf7] text-[#3d3d3d] border border-[#e8e4d8] focus:border-[#5A5A40] outline-none p-3.5 text-xs uppercase tracking-wider font-sans rounded-xl transition-all duration-300"
                    />
                    {errors.email && <span className="text-red-500 text-[10px] font-mono mt-1">{errors.email}</span>}
                  </div>

                  {/* Notes Area */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="form-notes"
                      className="text-[10px] font-mono tracking-widest text-[#8a8a6b] uppercase font-semibold"
                    >
                      Special Requests / Notes (Optional)
                    </label>
                    <textarea
                      id="form-notes"
                      rows={3}
                      placeholder="Any instructions about density, allergies, style guidelines..."
                      value={formData.notes}
                      onChange={(e) => handleInputChange("notes", e.target.value)}
                      className="w-full bg-[#fdfcf7] text-[#3d3d3d] border border-[#e8e4d8] focus:border-[#5A5A40] outline-none p-3.5 text-xs uppercase tracking-wider font-sans rounded-xl transition-all duration-300 resize-none"
                    />
                  </div>
                </motion.div>
              )}
            </div>

            {/* BUTTON CONTROLS FOOTER */}
            <div className="flex justify-between items-center mt-10 pt-6 border-t border-[#f0ede4]">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-6 py-2.5 border border-[#5A5A40]/30 bg-transparent text-[#5A5A40] hover:bg-[#5A5A40]/5 font-sans font-medium text-[10px] uppercase tracking-widest flex items-center gap-1.5 cursor-pointer rounded-full transition-colors"
                >
                  <ChevronLeft size={12} />
                  <span>Previous</span>
                </button>
              ) : (
                <div />
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-6 py-3 bg-[#5A5A40] hover:bg-[#8a8a6b] text-white font-sans font-bold text-[10px] uppercase tracking-widest ml-auto transition-colors duration-300 cursor-pointer rounded-full shadow-md shadow-[#5A5A40]/10"
                >
                  Confirm & Continue
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-8 py-3.5 bg-[#5A5A40] hover:bg-[#8a8a6b] text-white font-sans font-bold text-[10px] uppercase tracking-[0.2em] ml-auto transition-opacity cursor-pointer rounded-full shadow-md shadow-[#5A5A40]/20"
                >
                  Confirm My Royal Booking
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
