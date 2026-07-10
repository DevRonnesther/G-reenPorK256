import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import {
  MapPin, Mail, Phone,
  Send, Clock3, Facebook, Instagram,
  MessageCircle, ArrowRight,
} from "lucide-react";

// ─── Config — kept in sync with Hero.jsx / Navbar.jsx / About.jsx ────────────
const WHATSAPP_NUMBER = "256776464823";
const PHONE_DISPLAY = "+256 776-464-823";
const EMAIL = "greenporkie@gmail.com";
const BRAND_NAME = "EverGrill";

// ─── Eyebrow label (matches About page pattern) ───────────────────────────────
const Eyebrow = ({ children }) => (
  <p className="inline-flex items-center gap-1.5 text-orange-600 text-xs font-black uppercase tracking-[3px] mb-3">
    <span className="w-4 h-0.5 bg-orange-600 rounded-full" aria-hidden="true" />
    {children}
    <span className="w-4 h-0.5 bg-orange-600 rounded-full" aria-hidden="true" />
  </p>
);

// ─── Reusable contact info row ─────────────────────────────────────────────────
const InfoRow = ({ icon, iconBg, iconColor, label, value, href }) => {
  const Inner = (
    <div className="flex items-center gap-4">
      <div className={`w-11 h-11 rounded-2xl ${iconBg} flex items-center justify-center ${iconColor} shrink-0`}>
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5">{label}</p>
        <p className="font-bold text-gray-900 text-sm leading-tight truncate">{value}</p>
      </div>
      {href && <ArrowRight size={14} className="text-gray-300 ml-auto shrink-0" aria-hidden="true" />}
    </div>
  );

  const cls = "block bg-gray-50 hover:bg-gray-100 border border-gray-100 rounded-2xl px-4 py-3.5 transition-all duration-200";

  return href ? (
    <a href={href} className={cls}>{Inner}</a>
  ) : (
    <div className={cls}>{Inner}</div>
  );
};

const Contact = () => {
  const year = useMemo(() => new Date().getFullYear(), []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    // TODO: wire to the EverGrill/Life Tabernacle backend
    // (lifetabernaclebackend.onrender.com or its EverGrill sibling) instead of
    // alert(); this is a placeholder so the form has visible feedback for now.
    console.log(data);
    alert("Message sent! We'll get back to you shortly.");
    reset();
  };

  // Shared input classes
  const inputBase =
    "w-full px-5 py-4 rounded-2xl border bg-gray-50 text-gray-900 outline-none transition-all duration-200 focus:ring-4 focus:ring-orange-100 focus:border-orange-400 placeholder:text-gray-400 text-sm font-medium";

  return (
    <div className="min-h-screen bg-white overflow-hidden">

      {/* ──────────────────────────────────────────────────────────────────────────
          INTRO — flat white section, no dark gradient banner. Headline + a thin
          yellow rule, same restrained energy as About's intro.
      ────────────────────────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-4 text-center">
        <Eyebrow>Contact Us</Eyebrow>
        <h1 className="text-4xl hidden sm:text-5xl md:text-6xl font-black text-stone-900 leading-tight mb-4">
          We'd Love to Hear{" "}
          <span className="text-orange-600">From You</span>
        </h1>
        <p className="text-stone-500 text-lg max-w-xl mx-auto leading-relaxed">
          Questions, feedback, or a quick order — reach out and
          we'll get back to you fast.
        </p>
      </div>

      {/* ──────────────────────────────────────────────────────────────────────────
          MAIN CONTENT
      ────────────────────────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* ── CONTACT FORM (2/3 width) ── */}
          <div className="lg:col-span-2 bg-white border border-gray-100 shadow-xl rounded-3xl p-8 md:p-12">
            <div className="mb-8">
              <Eyebrow>Send a Message</Eyebrow>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900">Let's Talk</h2>
              <p className="text-gray-400 mt-2 text-sm">Fill in the form and we'll reply as soon as possible.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>

              {/* Name row */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="firstName" className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    placeholder="John"
                    aria-invalid={errors.firstName ? "true" : "false"}
                    className={`${inputBase} ${errors.firstName ? "border-red-400" : "border-gray-200"}`}
                    {...register("firstName", { required: "Required" })}
                  />
                  {errors.firstName && <p className="mt-1.5 text-xs text-red-500 font-semibold">{errors.firstName.message}</p>}
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    aria-invalid={errors.lastName ? "true" : "false"}
                    className={`${inputBase} ${errors.lastName ? "border-red-400" : "border-gray-200"}`}
                    {...register("lastName", { required: "Required" })}
                  />
                  {errors.lastName && <p className="mt-1.5 text-xs text-red-500 font-semibold">{errors.lastName.message}</p>}
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="johndoe@gmail.com"
                  aria-invalid={errors.email ? "true" : "false"}
                  className={`${inputBase} ${errors.email ? "border-red-400" : "border-gray-200"}`}
                  {...register("email", {
                    required: "Required",
                    pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email" },
                  })}
                />
                {errors.email && <p className="mt-1.5 text-xs text-red-500 font-semibold">{errors.email.message}</p>}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={6}
                  placeholder="Write your message here..."
                  aria-invalid={errors.message ? "true" : "false"}
                  className={`${inputBase} resize-none ${errors.message ? "border-red-400" : "border-gray-200"}`}
                  {...register("message", {
                    required: "Required",
                    minLength: { value: 10, message: "At least 10 characters" },
                  })}
                />
                {errors.message && <p className="mt-1.5 text-xs text-red-500 font-semibold">{errors.message.message}</p>}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="group inline-flex items-center gap-3 bg-stone-900 hover:bg-stone-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-black px-8 py-4 rounded-2xl shadow-xl hover:scale-[1.02] transition-all duration-200"
              >
                {isSubmitting ? "Sending…" : "Send Message"}
                <Send size={16} className="group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
              </button>
            </form>
          </div>

          {/* ── SIDEBAR ── */}
          <div className="flex flex-col gap-6">

            {/* Contact info card */}
            <div className="bg-white border border-gray-100 shadow-xl rounded-3xl p-7">
              <Eyebrow>Reach Us</Eyebrow>
              <h3 className="text-2xl font-black text-gray-900 mb-5">Contact Info</h3>
              <div className="space-y-3">
                <InfoRow
                  icon={<Phone size={17} aria-hidden="true" />}
                  iconBg="bg-emerald-100" iconColor="text-emerald-600"
                  label="Phone" value={PHONE_DISPLAY}
                  href={`tel:+${WHATSAPP_NUMBER}`}
                />
                <InfoRow
                  icon={<Mail size={17} aria-hidden="true" />}
                  iconBg="bg-orange-100" iconColor="text-orange-600"
                  label="Email" value={EMAIL}
                  href={`mailto:${EMAIL}`}
                />
                <InfoRow
                  icon={<MapPin size={17} aria-hidden="true" />}
                  iconBg="bg-amber-100" iconColor="text-amber-500"
                  label="Location" value="Gulu City, Uganda"
                />
                <InfoRow
                  icon={<Clock3 size={17} aria-hidden="true" />}
                  iconBg="bg-gray-100" iconColor="text-gray-600"
                  label="Hours" value="Mon – Sun · 10 AM – 10 PM"
                />
              </div>
            </div>

            {/* WhatsApp CTA — most direct conversion path */}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between bg-stone-900 hover:bg-stone-800 text-white rounded-3xl px-7 py-5 shadow-xl hover:scale-[1.01] transition-all duration-200"
            >
              <div>
                <p className="text-[10px] uppercase tracking-widest text-white/60 mb-0.5">Fastest way to order</p>
                <p className="font-black text-lg">Chat on WhatsApp</p>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center">
                <ArrowRight size={18} aria-hidden="true" />
              </div>
            </a>

            {/* Socials */}
            <div className="bg-white border border-gray-100 shadow-xl rounded-3xl p-7">
              <h3 className="text-lg font-black text-gray-900 mb-4">Follow Us</h3>
              <div className="flex gap-3">
                {[
                  { href: "#", Icon: Facebook, label: "Facebook", bg: "bg-blue-50 hover:bg-blue-100", color: "text-blue-600" },
                  { href: "#", Icon: Instagram, label: "Instagram", bg: "bg-pink-50 hover:bg-pink-100", color: "text-pink-600" },
                  { href: "#", Icon: MessageCircle, label: "WhatsApp", bg: "bg-green-50 hover:bg-green-100", color: "text-green-600" },
                ].map(({ href, Icon, label, bg, color }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={`${BRAND_NAME} on ${label}`}
                    className={`w-12 h-12 rounded-2xl ${bg} flex items-center justify-center hover:scale-110 transition-all duration-200`}
                  >
                    <Icon size={19} className={color} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-100 py-7 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm font-medium">© {year} {BRAND_NAME}. All rights reserved.</p>
          <Link to="/returnPolicy" className="text-sm font-bold text-orange-600 hover:text-orange-700 transition-colors">
            Return Policy
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Contact;