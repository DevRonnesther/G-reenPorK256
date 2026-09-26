import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Eye, EyeOff, User, Mail, Lock, ArrowRight, ShieldCheck, Check, PhoneCall, Flame,
} from "lucide-react";
import BgImage from "../assets/PorkBg.png";

const BRAND = "Green Pork";
const PHONE = "+256 776 464 823";

// Same tokens as Hero.jsx / Navbar.jsx / ProductsView.jsx / About.jsx
const DARK = "#2E0101";
const BRAND_COLOR = "#D9FF00";
const RED = "#E11D1D";
const WORD_RED = "#FFC2B3";

const ease = [0.16, 1, 0.3, 1];

// Same rings used across the rest of the site — visible on keyboard focus, not just hover.
const focusRing = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E0101] focus-visible:ring-offset-2";
const focusRingOnDark = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#2E0101]";

function Reveal({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.6, ease, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  }

  function validate() {
    let newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password && formData.password.length < 6) newErrors.password = "Minimum 6 characters";
    if (!formData.confirmPassword) newErrors.confirmPassword = "Confirm your password";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    if (!agreeTerms) newErrors.terms = "You must agree to the terms";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (validate()) {
      console.log("REGISTER DATA:", formData);
    }
  }

  // Base input style with NO focus ring baked in — the ring color depends on
  // whether the field has an error, so it's applied conditionally below.
  // (Previously a red ring was hard-coded here and a second, conflicting ring
  // was appended per-field, so valid fields could randomly show a red ring
  // depending on Tailwind's generated class order. Only one ring class now.)
  const inputBaseClass = "w-full pl-12 pr-12 py-3.5 bg-[#2E0101]/[0.03] rounded-2xl text-[#2E0101] placeholder:text-[#2E0101]/30 font-medium text-sm outline-none transition-all duration-300 focus:bg-white";
  const errorRing = "focus:ring-4 focus:ring-[#E11D1D]/30 bg-[#E11D1D]/5";
  const normalRing = "focus:ring-4 focus:ring-[#2E0101]/10";

  return (
    <div className="font-display flex h-[100dvh] w-full select-none overflow-hidden bg-white selection:bg-[#D9FF00] selection:text-[#2E0101]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700;800;900&display=swap');
        .font-display { font-family: 'Archivo', sans-serif; }
      `}</style>

      {/* LEFT VERTICAL PANEL */}
      <aside className="relative hidden h-full w-[40%] flex-col justify-between overflow-hidden p-10 text-white lg:flex xl:w-[35%] xl:p-12" style={{ backgroundColor: DARK }}>
        <motion.img
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 15, ease: "linear" }}
          src={BgImage}
          alt="Premium wood-smoked roasted pork"
          className="absolute inset-0 h-full w-full object-cover brightness-[0.45]"
        />

        <div className="pointer-events-none absolute left-1/4 top-1/4 h-96 w-96 rounded-full opacity-20 blur-[120px]" style={{ backgroundColor: RED }} />

        <div className="relative z-10 flex h-full flex-col justify-between">
          {/* Branding */}
          <div className="space-y-6">
            <Link to="/" className={`group flex w-fit items-center gap-3 rounded-full ${focusRingOnDark}`}>
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-xs font-black backdrop-blur-md transition-transform group-hover:scale-105">
                GP
              </div>
              <span className="text-sm font-black uppercase tracking-[0.15em] text-white">
                {BRAND}
              </span>
            </Link>

            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-[11px] font-bold uppercase tracking-wide backdrop-blur-md">
              <ShieldCheck size={13} strokeWidth={2.5} />
              Premium Farm Fresh
            </span>
          </div>

          {/* Center Copy */}
          <div className="my-auto space-y-4">
            <h2 className="text-3xl font-black uppercase leading-[0.85] tracking-[-0.04em] xl:text-4xl">
              One Bite.<br />
              <span style={{ color: WORD_RED }}>Good Mood.</span>
            </h2>
            <p className="max-w-xs text-xs font-medium leading-relaxed text-white/70 xl:text-sm">
              Crafted for sharing, feasting, and instant good vibes. Join the inner circle of pork lovers.
            </p>
          </div>

          {/* Stats */}
          <div className="space-y-4 pt-6">
            <div className="h-px w-full bg-white/15" />
            {[
              { value: "10K+", label: "Active Customers" },
              { value: "30m", label: "Lightning Dispatch" },
              { value: "4.9★", label: "Avg. User Rating" },
            ].map((stat) => (
              <div key={stat.label} className="group flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-white/50">
                  {stat.label}
                </span>
                <span className="text-xl font-black tracking-tight transition-transform duration-300 group-hover:translate-x-1 xl:text-2xl">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* RIGHT FORM CANVAS */}
      <main className="relative flex h-full flex-1 flex-col justify-center overflow-hidden p-6 sm:p-10 xl:p-16">
        {/* Ghost Background Text — same giant-word device as the Hero */}
        <div className="pointer-events-none absolute right-0 top-0 select-none opacity-[0.03]" style={{ color: DARK }}>
          <span className="font-black text-[12rem] leading-none tracking-tighter xl:text-[16rem]">
            JOIN
          </span>
        </div>

        {/* Centered Form Container */}
        <div className="relative z-10 mx-auto w-full max-w-3xl">
          <Reveal delay={0.1}>
            <div className="mb-8 lg:mb-10">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#2E0101]/10 px-4 py-2 text-[11px] font-bold uppercase tracking-wide text-[#2E0101]">
                <Flame size={13} strokeWidth={2.5} />
                Get Started
              </span>
              <h2 className="font-black uppercase leading-[0.85] tracking-[-0.04em]" style={{ color: DARK, fontSize: "clamp(2.2rem, 5vw, 4rem)" }}>
                Join the<br />
                <span style={{ color: RED }}>Pork Revolt.</span>
              </h2>
              <p className="mt-3 max-w-sm text-xs font-medium leading-relaxed text-[#2E0101]/60 sm:text-sm">
                Fill in your details to start ordering wood-smoked premium cuts.
              </p>
            </div>
          </Reveal>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 gap-x-6 sm:grid-cols-2" noValidate>
            {/* NAME */}
            <Reveal delay={0.15} className="sm:col-span-2">
              <label htmlFor="name" className="mb-1.5 block text-[11px] font-black uppercase tracking-widest text-[#2E0101]/80">
                Full Name
              </label>
              <div className="relative">
                <User className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#2E0101]/30" size={18} strokeWidth={2.2} />
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className={`${inputBaseClass} ${errors.name ? errorRing : normalRing}`}
                />
              </div>
              {errors.name && <p id="name-error" className="mt-1.5 text-xs font-medium" style={{ color: RED }}>{errors.name}</p>}
            </Reveal>

            {/* EMAIL */}
            <Reveal delay={0.2}>
              <label htmlFor="email" className="mb-1.5 block text-[11px] font-black uppercase tracking-widest text-[#2E0101]/80">
                Email Address
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#2E0101]/30" size={18} strokeWidth={2.2} />
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={`${inputBaseClass} ${errors.email ? errorRing : normalRing}`}
                />
              </div>
              {errors.email && <p id="email-error" className="mt-1.5 text-xs font-medium" style={{ color: RED }}>{errors.email}</p>}
            </Reveal>

            {/* PASSWORD */}
            <Reveal delay={0.25}>
              <label htmlFor="password" className="mb-1.5 block text-[11px] font-black uppercase tracking-widest text-[#2E0101]/80">
                Password
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#2E0101]/30" size={18} strokeWidth={2.2} />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? "password-error" : undefined}
                  className={`${inputBaseClass} ${errors.password ? errorRing : normalRing}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-4 top-1/2 -translate-y-1/2 rounded-full text-[#2E0101]/40 transition-colors hover:text-[#2E0101] ${focusRing}`}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} strokeWidth={2.2} /> : <Eye size={18} strokeWidth={2.2} />}
                </button>
              </div>
              {errors.password && <p id="password-error" className="mt-1.5 text-xs font-medium" style={{ color: RED }}>{errors.password}</p>}
            </Reveal>

            {/* CONFIRM PASSWORD */}
            <Reveal delay={0.3} className="sm:col-span-2">
              <label htmlFor="confirmPassword" className="mb-1.5 block text-[11px] font-black uppercase tracking-widest text-[#2E0101]/80">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#2E0101]/30" size={18} strokeWidth={2.2} />
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  aria-invalid={!!errors.confirmPassword}
                  aria-describedby={errors.confirmPassword ? "confirmPassword-error" : undefined}
                  className={`${inputBaseClass} ${errors.confirmPassword ? errorRing : normalRing}`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className={`absolute right-4 top-1/2 -translate-y-1/2 rounded-full text-[#2E0101]/40 transition-colors hover:text-[#2E0101] ${focusRing}`}
                  aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                >
                  {showConfirmPassword ? <EyeOff size={18} strokeWidth={2.2} /> : <Eye size={18} strokeWidth={2.2} />}
                </button>
              </div>
              {errors.confirmPassword && <p id="confirmPassword-error" className="mt-1.5 text-xs font-medium" style={{ color: RED }}>{errors.confirmPassword}</p>}
            </Reveal>

            {/* ACTION ROW */}
            <Reveal delay={0.35} className="mt-2 flex flex-col items-center justify-between gap-4 sm:flex-row sm:items-end sm:col-span-2">
              <div className="flex w-full items-start gap-3 sm:w-auto sm:max-w-[50%]">
                <button
                  type="button"
                  onClick={() => setAgreeTerms(!agreeTerms)}
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md transition-all duration-300 ${focusRing} ${agreeTerms ? "bg-[#D9FF00]" : "bg-[#2E0101]/10 hover:bg-[#2E0101]/20"}`}
                  role="checkbox"
                  aria-checked={agreeTerms}
                  aria-describedby={errors.terms ? "terms-error" : undefined}
                >
                  {agreeTerms && <Check size={12} strokeWidth={3} className="text-[#2E0101]" />}
                </button>
                <p className="text-xs font-medium leading-relaxed text-[#2E0101]/60">
                  I agree to the{" "}
                  <Link to="/returnPolicy" className={`rounded font-bold underline text-[#2E0101] ${focusRing}`}>
                    Terms & Policy
                  </Link>
                  .
                </p>
              </div>
              {errors.terms && <p id="terms-error" className="w-full text-xs font-medium sm:w-auto" style={{ color: RED }}>{errors.terms}</p>}

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 220, damping: 26 }}
                className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-full py-3.5 px-6 text-xs font-black uppercase tracking-wide shadow-lg sm:w-auto sm:min-w-[240px] ${focusRing}`}
                style={{ backgroundColor: BRAND_COLOR, color: DARK }}
              >
                Create Account <ArrowRight size={14} strokeWidth={2.5} />
              </motion.button>
            </Reveal>
          </form>

          {/* FOOTER */}
          <Reveal delay={0.4} className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="h-px w-full bg-[#2E0101]/10 sm:hidden" />
            <p className="text-center text-xs font-medium text-[#2E0101]/60 sm:text-left">
              Already have an account?{" "}
              <Link to="/login" className={`ml-1 rounded font-black uppercase tracking-wider underline text-[#2E0101] ${focusRing}`}>
                Sign In
              </Link>
            </p>
            <a
              href={`tel:+${PHONE.replace(/\s/g, "")}`}
              className={`group flex items-center gap-2 rounded-full text-xs font-black uppercase tracking-widest text-[#2E0101]/80 transition-colors ${focusRing}`}
            >
              <PhoneCall size={14} strokeWidth={2.5} className="transition-transform group-hover:scale-110" style={{ color: RED }} />
              {PHONE}
            </a>
          </Reveal>
        </div>
      </main>
    </div>
  );
}