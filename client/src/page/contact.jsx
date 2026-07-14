import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import {
  MapPin, Mail, Phone,
  Send, Clock3, Facebook, Instagram,
  MessageCircle, ArrowRight,
} from "lucide-react";

// ─── CONFIGURATION ───────────────────────────────────────────────────────────
const WHATSAPP_NUMBER = "256776464823";
const PHONE_DISPLAY = "+256 776-464-823";
const EMAIL = "greenporkie@gmail.com";
const BRAND_NAME = "GreenPork";

// ─── LOCAL SUB-COMPONENTS ────────────────────────────────────────────────────
const Eyebrow = ({ children }) => (
  <p className="inline-flex items-center gap-2 text-[#0edb0e] text-xs font-bold uppercase tracking-[0.15em] mb-4">
    <span className="w-1.5 h-1.5 rounded-full bg-[#0edb0e]" aria-hidden="true" />
    {children}
  </p>
);

const InfoRow = ({ icon, iconBg, iconColor, label, value, href }) => {
  const Inner = (
    <div className="flex items-center gap-4">
      <div className={`w-11 h-11 rounded-xl ${iconBg} flex items-center justify-center ${iconColor} shrink-0`}>
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#1F2937]/50 mb-0.5">{label}</p>
        <p className="font-extrabold text-[#1F2937] text-sm leading-tight truncate">{value}</p>
      </div>
      {href && <ArrowRight size={14} className="text-[#1F2937]/35 ml-auto shrink-0 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />}
    </div>
  );

  const cls = "block group bg-[#F8FAFC] hover:bg-[#E5E7EB]/40 border border-[#E5E7EB]/50 rounded-2xl px-4 py-3.5 transition-all duration-200 shadow-sm shadow-[#E5E7EB]/10";

  return href ? (
    <a href={href} className={cls}>{Inner}</a>
  ) : (
    <div className={cls}>{Inner}</div>
  );
};

// ─── MAIN CONTACT COMPONENT ──────────────────────────────────────────────────
const Contact = () => {
  const year = useMemo(() => new Date().getFullYear(), []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    alert("Message sent! We'll get back to you shortly.");
    reset();
  };

  // Modern input classes relying on flat background transitions with brand focus highlights
  const inputBase =
    "w-full px-5 py-4 rounded-2xl bg-[#F8FAFC] focus:bg-white text-[#1F2937] outline-none border border-[#E5E7EB]/70 focus:border-[#0edb0e] focus:ring-4 focus:ring-[#0edb0e]/10 placeholder:text-[#1F2937]/40 text-sm font-medium transition-all duration-200";

  return (
    <div className="min-h-screen bg-white text-[#1F2937] overflow-hidden relative">

      {/* Background Decorative Blobs */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-[#0edb0e]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FACC15]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* ── LEFT COLUMN: STICKY CONSOLE (Col Span 5) ── */}
          <div className="lg:col-span-5 lg:sticky lg:top-12 space-y-8">

            {/* Header Content */}
            <div className="space-y-4">
              <Eyebrow>Contact Us</Eyebrow>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#1F2937] leading-[1.1] tracking-tight">
                We'd Love to Hear <span className="text-[#0edb0e]">From You</span>
              </h1>
              <p className="text-[#1F2937]/75 text-base leading-relaxed max-w-sm">
                Questions, feedback, or custom catering requests — reach out and
                our team will get back to you immediately.
              </p>
            </div>

            {/* Direct Information panel */}
            <div className="space-y-3">
              <InfoRow
                icon={<Phone size={16} aria-hidden="true" />}
                iconBg="bg-[#F97316]/10" iconColor="text-[#F97316]"
                label="Phone" value={PHONE_DISPLAY}
                href={`tel:${WHATSAPP_NUMBER}`}
              />
              <InfoRow
                icon={<Mail size={16} aria-hidden="true" />}
                iconBg="bg-[#0edb0e]/10" iconColor="text-[#0edb0e]"
                label="Email" value={EMAIL}
                href={`mailto:${EMAIL}`}
              />
              <InfoRow
                icon={<MapPin size={16} aria-hidden="true" />}
                iconBg="bg-[#FACC15]/10" iconColor="text-[#FACC15]"
                label="Location" value="Njeru, Uganda"
              />
              <InfoRow
                icon={<Clock3 size={16} aria-hidden="true" />}
                iconBg="bg-[#F8FAFC]" iconColor="text-[#1F2937]/60"
                label="Hours" value="Mon – Sun · 10 AM – 10 PM"
              />
            </div>

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between bg-[#1F2937] hover:bg-[#1F2937]/90 text-white rounded-[1.5rem] px-6 py-4.5 shadow-2xl shadow-[#1F2937]/10 hover:scale-[1.01] transition-all duration-200"
            >
              <div>
                <p className="text-[10px] uppercase tracking-widest text-white/50 mb-0.5">Fastest way to order</p>
                <p className="font-extrabold text-lg">Chat on WhatsApp</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <ArrowRight size={18} className="text-[#FACC15]" aria-hidden="true" />
              </div>
            </a>

            {/* Unified Brand Socials */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#1F2937]/50">Follow Our Updates</h4>
              <div className="flex gap-3">
                {[
                  { href: "#", Icon: Facebook, label: "Facebook" },
                  { href: "#", Icon: Instagram, label: "Instagram" },
                  { href: "#", Icon: MessageCircle, label: "WhatsApp" },
                ].map(({ href, Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={`${BRAND_NAME} on ${label}`}
                    className="w-11 h-11 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB]/40 hover:bg-[#0edb0e]/10 text-[#1F2937]/60 hover:text-[#0edb0e] flex items-center justify-center transition-all duration-200"
                  >
                    <Icon size={18} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>

          </div>

          {/* ── RIGHT COLUMN: INTERACTIVE FORM (Col Span 7) ── */}
          <div className="lg:col-span-7 bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-[#E5E7EB]/50 border border-[#E5E7EB]/30">
            <div className="mb-10">
              <Eyebrow>Send a Message</Eyebrow>
              <h2 className="text-3xl font-extrabold text-[#1F2937] tracking-tight">Let's Talk</h2>
              <p className="text-[#1F2937]/50 mt-2 text-sm leading-relaxed">Fill in the fields below and we'll reply as soon as possible.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>

              {/* Name fields */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="firstName" className="block text-xs font-bold uppercase tracking-widest text-[#1F2937]/50 mb-2.5">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    placeholder="John"
                    aria-invalid={errors.firstName ? "true" : "false"}
                    className={`${inputBase} ${errors.firstName ? "bg-[#F97316]/5 border-[#F97316]/50 focus:ring-[#F97316]/20 focus:border-[#F97316]" : ""}`}
                    {...register("firstName", { required: "Required" })}
                  />
                  {errors.firstName && <p className="mt-1.5 text-xs text-[#F97316] font-semibold">{errors.firstName.message}</p>}
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-xs font-bold uppercase tracking-widest text-[#1F2937]/50 mb-2.5">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    aria-invalid={errors.lastName ? "true" : "false"}
                    className={`${inputBase} ${errors.lastName ? "bg-[#F97316]/5 border-[#F97316]/50 focus:ring-[#F97316]/20 focus:border-[#F97316]" : ""}`}
                    {...register("lastName", { required: "Required" })}
                  />
                  {errors.lastName && <p className="mt-1.5 text-xs text-[#F97316] font-semibold">{errors.lastName.message}</p>}
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-xs font-bold uppercase tracking-widest text-[#1F2937]/50 mb-2.5">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="johndoe@gmail.com"
                  aria-invalid={errors.email ? "true" : "false"}
                  className={`${inputBase} ${errors.email ? "bg-[#F97316]/5 border-[#F97316]/50 focus:ring-[#F97316]/20 focus:border-[#F97316]" : ""}`}
                  {...register("email", {
                    required: "Required",
                    pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email" },
                  })}
                />
                {errors.email && <p className="mt-1.5 text-xs text-[#F97316] font-semibold">{errors.email.message}</p>}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-xs font-bold uppercase tracking-widest text-[#1F2937]/50 mb-2.5">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Write your message here..."
                  aria-invalid={errors.message ? "true" : "false"}
                  className={`${inputBase} resize-none ${errors.message ? "bg-[#F97316]/5 border-[#F97316]/50 focus:ring-[#F97316]/20 focus:border-[#F97316]" : ""}`}
                  {...register("message", {
                    required: "Required",
                    minLength: { value: 10, message: "At least 10 characters" },
                  })}
                />
                {errors.message && <p className="mt-1.5 text-xs text-[#F97316] font-semibold">{errors.message.message}</p>}
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="group inline-flex items-center justify-center gap-3 bg-[#0edb0e] hover:bg-[#0edb0e]/90 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold px-8 py-4 rounded-2xl shadow-xl hover:scale-[1.01] transition-all duration-200 shadow-[#0edb0e]/20 w-full sm:w-auto"
              >
                {isSubmitting ? "Sending…" : "Send Message"}
                <Send size={15} className="group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="py-10 px-6 bg-white relative z-10 border-t border-[#E5E7EB]/40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#1F2937]/50 text-xs font-medium">© {year} {BRAND_NAME}. All rights reserved.</p>
          <Link to="/returnPolicy" className="text-xs font-bold text-[#0edb0e] hover:text-[#0edb0e]/80 transition-colors">
            Return Policy
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Contact;