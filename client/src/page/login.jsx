import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Eye, EyeOff, Mail, Lock, ArrowRight, ShieldCheck, Check, Flame,
} from "lucide-react";
import BgImage from "../assets/pngwing.com (19).png";

const BRAND = "Green Pork";

// Standardized Colors
const BRAND_COLOR = "#D9FF00";
const DARK = "#4A0A0A";
const RED = "#E11D1D";
const WORD_RED = "#FFC2B3";

const ease = [0.16, 1, 0.3, 1];

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

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      console.log("LOGIN DATA:", data);
      await new Promise((resolve) => setTimeout(resolve, 800));
      navigate("/layout");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const inputBaseClass = "w-full pl-12 pr-12 py-3.5 bg-[#4A0A0A]/[0.03] rounded-2xl text-[#4A0A0A] placeholder:text-[#4A0A0A]/30 font-medium text-sm outline-none transition-all duration-300 focus:bg-white focus:ring-4 focus:ring-[#E11D1D]/20";
  const errorClass = "ring-4 ring-[#E11D1D]/20 bg-[#E11D1D]/5";
  const normalClass = "focus:ring-[#4A0A0A]/10";

  return (
    <div className="font-display flex h-[100dvh] w-full select-none overflow-hidden bg-white selection:bg-[#D9FF00] selection:text-[#4A0A0A]">
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
          {/* Top Branding */}
          <div className="space-y-6">
            <Link to="/" className="group flex w-fit items-center gap-3">
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

          {/* Middle Call To Action */}
          <div className="my-auto space-y-4">
            <h2 className="text-3xl font-black uppercase leading-[0.85] tracking-[-0.04em] xl:text-4xl">
              One Bite.<br />
              <span style={{ color: WORD_RED }}>Good Mood.</span>
            </h2>
            <p className="max-w-xs text-xs font-medium leading-relaxed text-white/70 xl:text-sm">
              Crafted for sharing, feasting, and instant good vibes. Continue your culinary journey.
            </p>
          </div>

          {/* Bottom Stats */}
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
        {/* Floating Decorative Background Text */}
        <div className="pointer-events-none absolute right-0 top-0 select-none opacity-[0.03]" style={{ color: DARK }}>
          <span className="font-black text-[12rem] leading-none tracking-tighter xl:text-[16rem]">
            LOGIN
          </span>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-3xl">
          {/* HEADER */}
          <Reveal delay={0.1}>
            <div className="mb-8 lg:mb-10">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#4A0A0A]/10 px-4 py-2 text-[11px] font-bold uppercase tracking-wide text-[#4A0A0A]">
                <Flame size={13} strokeWidth={2.5} />
                Access Account
              </span>
              <h2 className="font-black uppercase leading-[0.85] tracking-[-0.04em]" style={{ color: DARK, fontSize: "clamp(2.2rem, 5vw, 4rem)" }}>
                Welcome<br />
                <span style={{ color: RED }}>Back.</span>
              </h2>
              <p className="mt-3 max-w-sm text-xs font-medium leading-relaxed text-[#4A0A0A]/60 sm:text-sm">
                Sign in to continue ordering premium cuts.
              </p>
            </div>
          </Reveal>

          {/* FORM GRID */}
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4 gap-x-6 sm:grid-cols-2">
            {/* EMAIL */}
            <Reveal delay={0.15} className="sm:col-span-2">
              <label className="mb-1.5 block text-[11px] font-black uppercase tracking-widest text-[#4A0A0A]/80">
                Email Address
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#4A0A0A]/30" size={18} strokeWidth={2.2} />
                <input
                  type="email"
                  placeholder="you@example.com"
                  {...register("email", { required: "Email is required" })}
                  className={`${inputBaseClass} ${errors.email ? errorClass : normalClass}`}
                />
              </div>
              {errors.email && <p className="mt-1.5 text-xs font-medium" style={{ color: RED }}>{errors.email.message}</p>}
            </Reveal>

            {/* PASSWORD */}
            <Reveal delay={0.2} className="sm:col-span-2">
              <label className="mb-1.5 block text-[11px] font-black uppercase tracking-widest text-[#4A0A0A]/80">
                Password
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#4A0A0A]/30" size={18} strokeWidth={2.2} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password", { required: "Password is required" })}
                  className={`${inputBaseClass} ${errors.password ? errorClass : normalClass}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#4A0A0A]/40 transition-colors hover:text-[#4A0A0A]"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={18} strokeWidth={2.2} /> : <Eye size={18} strokeWidth={2.2} />}
                </button>
              </div>
              {errors.password && <p className="mt-1.5 text-xs font-medium" style={{ color: RED }}>{errors.password.message}</p>}
            </Reveal>

            {/* ACTION ROW */}
            <Reveal delay={0.25} className="mt-2 flex flex-col items-center justify-between gap-4 sm:flex-row sm:items-end sm:col-span-2">
              <div className="flex w-full items-start gap-3 sm:w-auto">
                <button
                  type="button"
                  onClick={() => setRememberMe(!rememberMe)}
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md transition-all duration-300 ${rememberMe ? "bg-[#D9FF00]" : "bg-[#4A0A0A]/10 hover:bg-[#4A0A0A]/20"}`}
                  aria-pressed={rememberMe}
                >
                  {rememberMe && <Check size={12} strokeWidth={3} className="text-[#4A0A0A]" />}
                </button>
                <p className="text-xs font-medium leading-relaxed text-[#4A0A0A]/60">
                  Remember me on this device
                </p>
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 220, damping: 26 }}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full py-3.5 px-6 text-xs font-black uppercase tracking-wide shadow-lg disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-[240px]"
                style={{ backgroundColor: BRAND_COLOR, color: DARK }}
              >
                {loading ? "Authenticating..." : "Sign In"}
                {!loading && <ArrowRight size={14} strokeWidth={2.5} />}
              </motion.button>
            </Reveal>
          </form>

          {/* FOOTER LINKS */}
          <Reveal delay={0.3} className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="h-px w-full bg-[#4A0A0A]/10 sm:hidden" />
            <p className="text-center text-xs font-medium text-[#4A0A0A]/60 sm:text-left">
              Don't have an account?{" "}
              <Link to="/Register" className="ml-1 font-black uppercase tracking-wider underline text-[#4A0A0A]">
                Create Account
              </Link>
            </p>
            <Link to="/forgot-password" className="font-black uppercase tracking-widest text-[#4A0A0A]/60 text-xs underline transition-colors hover:text-[#E11D1D]">
              Forgot Password?
            </Link>
          </Reveal>
        </div>
      </main>
    </div>
  );
}