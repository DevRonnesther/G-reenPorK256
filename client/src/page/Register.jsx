import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════
    DESIGN TOKENS — Synchronized with GreenPork Brand Standards
   ═══════════════════════════════════════════════════════════ */
const BRAND = {
  primary: "#D90404",
  primaryHover: "#B80303",
  dark: "#120202",
  accent: "#D9FF00",
};

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email";
    }
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password && formData.password.length < 6) {
      newErrors.password = "Minimum 6 characters";
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm your password";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("REGISTER DATA:", formData);
    }
  };

  return (
    <div className="w-full relative overflow-hidden font-sans min-h-screen bg-white text-zinc-900 selection:bg-[#D9FF00] selection:text-black flex items-center justify-center px-4 py-10">

      {/* ─── FONT LOADER ─── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@500;700;900&family=Inter:wght@400;500;600;700;800&family=Fraunces:ital,wght@1,500;1,600&display=swap');
        .font-display { font-family: 'Archivo', sans-serif; letter-spacing: -0.04em; }
        .font-body { font-family: 'Inter', sans-serif; }
        .font-accent { font-family: 'Fraunces', serif; font-style: italic; }
      `}</style>

      {/* ─── BACKGROUND EFFECTS ─── */}
      <div
        className="absolute -top-32 -left-32 w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: BRAND.primary, opacity: 0.1 }}
      />
      <div
        className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: BRAND.accent, opacity: 0.15 }}
      />

      {/* ─── MAIN CARD (Editorial Border-less Structural Layout) ─── */}
      <div className="relative z-10 w-full max-w-6xl overflow-hidden rounded-none border border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.08)] bg-white grid lg:grid-cols-12">

        {/* ─── LEFT SIDE (Editorial Branding & Stats Panel) ─── */}
        <div
          className="hidden lg:flex lg:col-span-6 relative flex-col justify-between p-12 text-white overflow-hidden"
          style={{ backgroundColor: BRAND.dark }}
        >
          {/* Ambient Glow */}
          <div
            className="absolute top-0 right-0 w-80 h-80 rounded-full blur-[100px] pointer-events-none"
            style={{ backgroundColor: BRAND.primary, opacity: 0.25 }}
          />

          <div className="relative z-10">
            {/* Logo Badge */}
            <div className="w-16 h-16 bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-xl font-display font-black mb-8 tracking-tighter">
              GP
            </div>

            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 bg-white/[0.04] border border-white/10 px-4 py-2 font-display text-xs uppercase tracking-widest font-bold backdrop-blur-md text-[#D9FF00]">
              <ShieldCheck size={15} strokeWidth={2.2} />
              <span>Premium Farm Fresh Quality</span>
            </div>

            {/* Headline */}
            <h1 className="mt-8 text-5xl lg:text-6xl font-display font-black tracking-tighter uppercase leading-[0.9]">
              Join <br />
              <span style={{ color: BRAND.accent }}>GreenPork</span>
            </h1>

            {/* Description */}
            <p className="mt-6 text-zinc-300 font-body text-sm sm:text-base leading-relaxed max-w-md font-medium">
              Create your account and enjoy lightning-fast cold-chain dispatch, wood-smoked mastery, and exclusive culinary privileges.
            </p>
          </div>

          {/* Stats Section */}
          <div className="relative z-10 grid grid-cols-3 gap-3 mt-12">
            {[
              { value: "10K+", label: "Customers" },
              { value: "30m", label: "Dispatch" },
              { value: "4.9★", label: "Rating" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-start p-4 bg-white/5 border border-white/10 transition-colors hover:bg-white/10"
              >
                <span className="text-2xl font-display font-black tracking-tighter text-white">{stat.value}</span>
                <span className="text-[10px] font-display font-bold uppercase tracking-widest mt-1 text-zinc-400">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ─── RIGHT SIDE (Form Panel) ─── */}
        <div className="lg:col-span-6 p-6 sm:p-10 lg:p-14 flex items-center justify-center bg-white">
          <div className="w-full max-w-md">

            {/* HEADER */}
            <div className="mb-8">
              <span className="text-xs font-display font-bold uppercase tracking-widest block mb-2" style={{ color: BRAND.primary }}>
                // GET STARTED
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tighter uppercase text-zinc-900">
                Create Account
              </h2>
              <p className="font-body text-sm text-zinc-600 mt-2 font-medium leading-relaxed">
                Fill in your details to start ordering premium cuts from GreenPork.
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* NAME */}
              <div>
                <label className="text-[11px] font-display font-bold uppercase tracking-widest text-zinc-700 block mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
                    size={18}
                    strokeWidth={2}
                  />
                  <input
                    type="text"
                    name="name"
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full pl-12 pr-4 py-3.5 bg-[#F4F4F5] border border-transparent text-zinc-900 placeholder:text-zinc-400 font-medium text-sm outline-none transition-all duration-300 focus:bg-white focus:border-zinc-900"
                  />
                </div>
                {errors.name && (
                  <p className="text-red-600 text-xs mt-1.5 font-medium">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* EMAIL */}
              <div>
                <label className="text-[11px] font-display font-bold uppercase tracking-widest text-zinc-700 block mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
                    size={18}
                    strokeWidth={2}
                  />
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full pl-12 pr-4 py-3.5 bg-[#F4F4F5] border border-transparent text-zinc-900 placeholder:text-zinc-400 font-medium text-sm outline-none transition-all duration-300 focus:bg-white focus:border-zinc-900"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-600 text-xs mt-1.5 font-medium">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* PASSWORD */}
              <div>
                <label className="text-[11px] font-display font-bold uppercase tracking-widest text-zinc-700 block mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
                    size={18}
                    strokeWidth={2}
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-12 py-3.5 bg-[#F4F4F5] border border-transparent text-zinc-900 placeholder:text-zinc-400 font-medium text-sm outline-none transition-all duration-300 focus:bg-white focus:border-zinc-900"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-900 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} strokeWidth={2} /> : <Eye size={18} strokeWidth={2} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-600 text-xs mt-1.5 font-medium">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* CONFIRM PASSWORD */}
              <div>
                <label className="text-[11px] font-display font-bold uppercase tracking-widest text-zinc-700 block mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
                    size={18}
                    strokeWidth={2}
                  />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-12 py-3.5 bg-[#F4F4F5] border border-transparent text-zinc-900 placeholder:text-zinc-400 font-medium text-sm outline-none transition-all duration-300 focus:bg-white focus:border-zinc-900"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-900 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff size={18} strokeWidth={2} /> : <Eye size={18} strokeWidth={2} />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-600 text-xs mt-1.5 font-medium">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                className="group relative w-full mt-3 py-4 font-display font-black text-xs uppercase tracking-widest text-white shadow-xl overflow-hidden transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                style={{
                  backgroundColor: BRAND.primary,
                  clipPath: "polygon(0 0, 100% 0, 99% 100%, 0% 100%)",
                }}
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none" />
                <span className="relative z-10 flex items-center gap-2">
                  Create Account <ArrowRight size={15} strokeWidth={2.5} className="transition-transform group-hover:translate-x-1" />
                </span>
              </button>
            </form>

            {/* FOOTER LINK */}
            <p className="text-center text-xs font-medium text-zinc-500 mt-8">
              Already have an account?{" "}
              <a
                href="/login"
                className="font-display font-bold uppercase tracking-wider text-zinc-900 hover:text-[#D90404] transition-colors ml-1"
              >
                Sign In
              </a>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;