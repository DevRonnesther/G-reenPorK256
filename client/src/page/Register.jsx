import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, ArrowRight, Check, Loader2, Flame } from "lucide-react";

import Logo from "../assets/Greenore.png";
import BgImage from "../assets/PorkBg.png";

const BRAND = "greenpork";
const BRAND_NAME = "Greenpork";
const SLOGAN = "Crave the difference";

const PALETTE = {
  ink: "#111111",
  charcoal: "#2A2A2A",
  muted: "#4A4A4A",
  surface: "#F5F5F5",
  surfaceHover: "#EFEFEF",
  red: "#E11D1D",
  lime: "#D9FF00",
  white: "#FFFFFF",
};

const EASE = [0.16, 1, 0.3, 1];
const SPRING = { type: "spring", stiffness: 240, damping: 28 };

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111]";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE, delay },
  },
});

export default function RegisterForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  }

  function validate() {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Minimum 6 characters required";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!agreeTerms) newErrors.terms = "You must agree to the terms";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 850));
      navigate("/layout");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="font-display flex h-[100dvh] w-full select-none overflow-hidden border-0 bg-white text-[#111111] selection:bg-[#D9FF00] selection:text-[#111111]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@600;700;800;900&family=Inter:wght@400;500;600;700&display=swap');
        .font-display { font-family: 'Archivo', sans-serif; }
        .font-body { font-family: 'Inter', sans-serif; }
      `}</style>

      {/* ═══════════════════════════════════════════════════════════
         LEFT: EDITORIAL BRAND STAGE (BORDERLESS DARK SURFACE)
         ═══════════════════════════════════════════════════════════ */}
      <aside
        className="relative hidden h-full w-1/2 flex-col justify-between overflow-hidden border-0 p-16 text-white lg:flex xl:p-24"
        style={{ backgroundColor: PALETTE.ink }}
      >
        <img
          src={BgImage}
          alt={BRAND_NAME}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(160deg, rgba(17,17,17,0.88) 0%, rgba(17,17,17,0.72) 55%, rgba(225,29,29,0.28) 100%)",
          }}
        />

        {/* TOP BRAND IDENTITY */}
        <div className="relative z-10 flex items-center gap-4">
          <Link
            to="/"
            className={`flex items-center gap-3 rounded-full border-0 ${focusRing}`}
          >
            <img
              src={Logo}
              alt={BRAND_NAME}
              className="h-20 w-auto object-contain"
            />
          </Link>
        </div>

        {/* CENTER EDITORIAL TITLE */}
        <div className="relative z-10 my-auto">
          <span
            className="mb-5 inline-flex items-center gap-2 rounded-full border-0 px-4 py-2 text-[11px] font-black uppercase tracking-wide"
            style={{ backgroundColor: PALETTE.lime, color: PALETTE.ink }}
          >
            <Flame size={13} strokeWidth={2.5} />
            {SLOGAN}
          </span>
          <h2 className="text-6xl font-black uppercase leading-[0.9] tracking-[-0.04em] text-white xl:text-7xl">
            Join The <br />
            <span style={{ color: PALETTE.red }}>Kitchen.</span>
          </h2>
          <p className="mt-6 max-w-sm font-body text-sm font-medium leading-relaxed text-white/85">
            Create your {BRAND_NAME} account for quick ordering across pork,
            burgers, pizza, and chicken in Gulu City.
          </p>
        </div>

        {/* FOOTER METRICS */}
        <div className="relative z-10 flex items-center gap-10 text-xs font-semibold text-white/80">
          <div>
            <span className="block font-display text-sm font-black uppercase text-[#D9FF00]">
              30 MINS
            </span>
            <span>Gulu City Dispatch</span>
          </div>
          <div>
            <span className="block font-display text-sm font-black uppercase text-white">
              4.9 ★
            </span>
            <span>Customer Rating</span>
          </div>
        </div>
      </aside>

      {/* ═══════════════════════════════════════════════════════════
         RIGHT: BORDERLESS FLAT FORM CANVAS
         ═══════════════════════════════════════════════════════════ */}
      <main className="relative flex h-full w-full flex-col justify-between overflow-y-auto border-0 bg-white p-8 text-[#111111] sm:p-14 lg:w-1/2 lg:p-20 xl:p-24">
        {/* MOBILE TOP BAR */}
        <div className="flex items-center justify-between lg:hidden">
          <Link
            to="/"
            className={`flex items-center gap-2 rounded-full border-0 ${focusRing}`}
          >
            <img
              src={Logo}
              alt={BRAND_NAME}
              className="h-9 w-auto object-contain"
            />
            <span className="text-base font-black uppercase tracking-wider text-[#111111]">
              {BRAND_NAME}
            </span>
          </Link>
          <Link
            to="/Products"
            className={`rounded-full border-0 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#2A2A2A] hover:text-[#111111] ${focusRing}`}
          >
            Menu
          </Link>
        </div>

        {/* FORM CONTAINER */}
        <div className="mx-auto my-auto w-full max-w-md py-6">
          <motion.div {...fadeUp(0.05)} className="mb-8">
            <h1 className="text-4xl font-black uppercase tracking-[-0.03em] text-[#111111] sm:text-5xl">
              Register
            </h1>
            <p className="mt-2 font-body text-xs font-medium text-[#4A4A4A] sm:text-sm">
              Enter your details to create a {BRAND_NAME} account.
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* FULL NAME */}
            <motion.div {...fadeUp(0.1)}>
              <label
                htmlFor="name"
                className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#111111]"
              >
                Full Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
                className="h-14 w-full rounded-2xl border-0 bg-[#F5F5F5] px-5 font-body text-sm font-medium text-[#111111] placeholder:text-[#666666] outline-none ring-0 transition-colors focus:bg-[#EFEFEF]"
              />
              <AnimatePresence>
                {errors.name && (
                  <motion.p
                    id="name-error"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-1.5 pl-1 text-xs font-bold text-[#E11D1D]"
                  >
                    {errors.name}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* EMAIL */}
            <motion.div {...fadeUp(0.15)}>
              <label
                htmlFor="email"
                className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#111111]"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                className="h-14 w-full rounded-2xl border-0 bg-[#F5F5F5] px-5 font-body text-sm font-medium text-[#111111] placeholder:text-[#666666] outline-none ring-0 transition-colors focus:bg-[#EFEFEF]"
              />
              <AnimatePresence>
                {errors.email && (
                  <motion.p
                    id="email-error"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-1.5 pl-1 text-xs font-bold text-[#E11D1D]"
                  >
                    {errors.email}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* PASSWORD GRID */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* PASSWORD */}
              <motion.div {...fadeUp(0.2)}>
                <label
                  htmlFor="password"
                  className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#111111]"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    aria-invalid={!!errors.password}
                    aria-describedby={
                      errors.password ? "password-error" : undefined
                    }
                    className="h-14 w-full rounded-2xl border-0 bg-[#F5F5F5] pl-5 pr-11 font-body text-sm font-medium text-[#111111] placeholder:text-[#666666] outline-none ring-0 transition-colors focus:bg-[#EFEFEF]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className={`absolute right-3.5 top-1/2 -translate-y-1/2 cursor-pointer rounded-full border-0 p-1.5 text-[#4A4A4A] transition-colors hover:text-[#111111] ${focusRing}`}
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <AnimatePresence>
                  {errors.password && (
                    <motion.p
                      id="password-error"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-1.5 pl-1 text-xs font-bold text-[#E11D1D]"
                    >
                      {errors.password}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* CONFIRM PASSWORD */}
              <motion.div {...fadeUp(0.25)}>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#111111]"
                >
                  Confirm
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    aria-invalid={!!errors.confirmPassword}
                    aria-describedby={
                      errors.confirmPassword
                        ? "confirm-password-error"
                        : undefined
                    }
                    className="h-14 w-full rounded-2xl border-0 bg-[#F5F5F5] pl-5 pr-11 font-body text-sm font-medium text-[#111111] placeholder:text-[#666666] outline-none ring-0 transition-colors focus:bg-[#EFEFEF]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className={`absolute right-3.5 top-1/2 -translate-y-1/2 cursor-pointer rounded-full border-0 p-1.5 text-[#4A4A4A] transition-colors hover:text-[#111111] ${focusRing}`}
                    aria-label="Toggle confirm password visibility"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>
                </div>
                <AnimatePresence>
                  {errors.confirmPassword && (
                    <motion.p
                      id="confirm-password-error"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-1.5 pl-1 text-xs font-bold text-[#E11D1D]"
                    >
                      {errors.confirmPassword}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* AGREE TERMS CHECKBOX */}
            <motion.div {...fadeUp(0.3)} className="pt-1">
              <label className="group flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="peer sr-only"
                />
                <div
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-lg border-0 transition-colors ${focusRing} ${
                    agreeTerms
                      ? "bg-[#D9FF00] text-[#111111]"
                      : "bg-[#F5F5F5] text-transparent"
                  }`}
                >
                  <Check size={12} strokeWidth={3.5} />
                </div>
                <span className="font-body text-xs font-medium text-[#2A2A2A]">
                  I agree to the{" "}
                  <Link
                    to="/returnPolicy"
                    className={`rounded font-bold text-[#E11D1D] hover:underline ${focusRing}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    Terms &amp; Privacy Policy
                  </Link>
                </span>
              </label>
              <AnimatePresence>
                {errors.terms && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-1.5 pl-1 text-xs font-bold text-[#E11D1D]"
                  >
                    {errors.terms}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* SUBMIT BUTTON */}
            <motion.div {...fadeUp(0.35)} className="pt-3">
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                transition={SPRING}
                className={`flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border-0 font-display text-xs font-black uppercase tracking-wider transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 ${focusRing}`}
                style={{ backgroundColor: PALETTE.lime, color: PALETTE.ink }}
              >
                {loading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <>
                    Create Account
                    <ArrowRight size={16} strokeWidth={2.5} />
                  </>
                )}
              </motion.button>
            </motion.div>
          </form>

          {/* FOOTER SWITCH NOTE */}
          <motion.div {...fadeUp(0.4)} className="mt-8 text-center sm:text-left">
            <p className="font-body text-xs font-medium text-[#4A4A4A]">
              Already have an account?{" "}
              <Link
                to="/login"
                className={`rounded font-display font-black uppercase tracking-wider text-[#E11D1D] hover:underline ${focusRing}`}
              >
                Sign In
              </Link>
            </p>
          </motion.div>
        </div>

        {/* BOTTOM LEGAL ROW */}
        <div className="py-2 text-center sm:text-left">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#4A4A4A]">
            © {new Date().getFullYear()} {BRAND_NAME} · {SLOGAN}
          </p>
        </div>
      </main>
    </div>
  );
}