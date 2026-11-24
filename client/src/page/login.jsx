import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  ShieldCheck,
  UserCheck,
  Flame,
} from "lucide-react";

import Logo from "../assets/Greenore01.png";
import BG_IMAGE from "../assets/bgimage.png";

const BRAND = "greenpork";
const BRAND_NAME = "Greenpork";
const SLOGAN = "Eat Fresh. Live Happy.";

const DEMO_USERS = {
  admin: {
    email: "admin@greenpork.com",
    password: "password123",
  },
  customer: {
    email: "customer@greenpork.com",
    password: "password123",
  },
};

const PALETTE = {
  red: "#E11D1D",
  lime: "#D9FF00",
  ink: "#111111",
  charcoal: "#2A2A2A",
  muted: "#4A4A4A",
  white: "#FFFFFF",
};

const EASE = [0.16, 1, 0.3, 1];
const SPRING = { type: "spring", stiffness: 240, damping: 28 };

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 14, filter: "blur(4px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: EASE, delay },
  },
  exit: {
    opacity: 0,
    y: -8,
    filter: "blur(4px)",
    transition: { duration: 0.2 },
  },
});

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111]";

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeRole, setActiveRole] = useState("admin");

  const [formData, setFormData] = useState({
    email: DEMO_USERS.admin.email,
    password: DEMO_USERS.admin.password,
  });

  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (authError) setAuthError("");
  }

  function fillCredentials(type) {
    const user = DEMO_USERS[type];
    setActiveRole(type);
    setFormData({
      email: user.email,
      password: user.password,
    });
    setErrors({});
    setAuthError("");
  }

  function validate() {
    const newErrors = {};
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      setAuthError("");
      await new Promise((resolve) => setTimeout(resolve, 550));

      const matchedUser = Object.values(DEMO_USERS).find(
        (u) =>
          u.email.toLowerCase() === formData.email.trim().toLowerCase() &&
          u.password === formData.password
      );

      if (!matchedUser) {
        setAuthError("Invalid credentials. Use the quick demo toggles above.");
        return;
      }

      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userEmail", formData.email);
      localStorage.setItem(
        "userRole",
        formData.email.includes("admin") ? "admin" : "customer"
      );

      navigate("/home");
    } catch (err) {
      console.error(err);
      setAuthError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="font-display flex h-[100dvh] w-full select-none overflow-hidden border-0 bg-[#111111] text-white selection:bg-[#D9FF00] selection:text-[#111111]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@700;800;900&family=Inter:wght@400;500;600;700&display=swap');
        .font-display { font-family: 'Archivo', sans-serif; }
        .font-body { font-family: 'Inter', sans-serif; }
      `}</style>

      {/* ═══════════════════════════════════════════════════════════
         LEFT: EDITORIAL BRAND HERO STAGE (BORDERLESS DARK SURFACE)
         ═══════════════════════════════════════════════════════════ */}
      <aside className="relative z-10 hidden h-full w-1/2 flex-col justify-between overflow-hidden border-0 bg-[#111111] p-16 lg:flex xl:p-24">
        <img
          src={BG_IMAGE}
          alt={BRAND}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-35"
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

        {/* CENTER TYPOGRAPHY */}
        <div className="relative z-10 my-auto">
          <motion.div {...fadeUp(0)}>
            <span
              className="mb-6 inline-flex items-center gap-2 rounded-full border-0 px-4 py-2 text-[11px] font-black uppercase tracking-wide"
              style={{ backgroundColor: PALETTE.lime, color: PALETTE.ink }}
            >
              <Flame size={13} strokeWidth={2.5} />
              {SLOGAN}
            </span>
          </motion.div>

          <motion.h1
            {...fadeUp(0.04)}
            className="font-display text-6xl font-black uppercase leading-[0.88] tracking-[-0.04em] text-white xl:text-7xl"
          >
            SIGN IN <br />
            <span style={{ color: PALETTE.red }}>TO ORDER.</span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.08)}
            className="mt-6 max-w-sm font-body text-sm font-medium leading-relaxed text-white/85"
          >
            Order freshly prepared pork, burgers, pizza, and chicken in Gulu
            City, track orders, and manage your {BRAND_NAME} account.
          </motion.p>
        </div>

        {/* FOOTER METRICS */}
        <motion.div
          {...fadeUp(0.12)}
          className="relative z-10 flex items-center gap-10 text-xs font-semibold text-white/80"
        >
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
        </motion.div>
      </aside>

      {/* ═══════════════════════════════════════════════════════════
         RIGHT: BORDERLESS FLAT FORM CANVAS (WHITE SURFACE)
         ═══════════════════════════════════════════════════════════ */}
      <main className="relative z-10 flex h-full w-full flex-col justify-between overflow-y-auto border-0 bg-white p-6 text-[#111111] sm:p-12 lg:w-1/2 lg:p-20 xl:p-24">
        {/* MOBILE HEADER */}
        <div className="flex items-center justify-between lg:hidden">
          <Link
            to="/"
            className={`flex items-center gap-2 rounded-full border-0 ${focusRing}`}
          >
            <img
              src={Logo}
              alt={BRAND_NAME}
              className="h-10 w-auto object-contain"
            />
            <span className="text-base font-black uppercase tracking-wider text-[#111111]">
              {BRAND_NAME}
            </span>
          </Link>
        </div>

        {/* FORM CONTAINER */}
        <div className="mx-auto my-auto w-full max-w-md py-6">
          <motion.div {...fadeUp(0.04)} className="mb-7">
            <h2 className="text-4xl font-black uppercase tracking-[-0.03em] text-[#111111] sm:text-5xl">
              Sign In
            </h2>
            <p className="mt-2 font-body text-xs font-medium text-[#4A4A4A] sm:text-sm">
              Enter your account credentials to proceed.
            </p>
          </motion.div>

          {/* FLAT SEGMENTED DEMO SWITCHER */}
          <motion.div
            {...fadeUp(0.06)}
            className="mb-7 rounded-2xl border-0 bg-[#F5F5F5] p-1.5"
          >
            <div className="grid grid-cols-2 gap-1.5">
              <button
                type="button"
                onClick={() => fillCredentials("admin")}
                className={`flex cursor-pointer items-center justify-center gap-1.5 rounded-xl border-0 py-3 font-display text-[11px] font-bold uppercase tracking-wider transition-colors ${focusRing} ${
                  activeRole === "admin"
                    ? "bg-[#111111] text-[#D9FF00]"
                    : "bg-transparent text-[#2A2A2A] hover:bg-white hover:text-[#111111]"
                }`}
              >
                <ShieldCheck size={14} />
                As Admin
              </button>
              <button
                type="button"
                onClick={() => fillCredentials("customer")}
                className={`flex cursor-pointer items-center justify-center gap-1.5 rounded-xl border-0 py-3 font-display text-[11px] font-bold uppercase tracking-wider transition-colors ${focusRing} ${
                  activeRole === "customer"
                    ? "bg-[#111111] text-[#D9FF00]"
                    : "bg-transparent text-[#2A2A2A] hover:bg-white hover:text-[#111111]"
                }`}
              >
                <UserCheck size={14} />
                As Customer
              </button>
            </div>
          </motion.div>

          {/* AUTH ERROR ALERT */}
          <AnimatePresence>
            {authError && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="mb-5 rounded-2xl border-0 bg-[#E11D1D]/10 px-4 py-3 font-body text-xs font-bold text-[#E11D1D]"
              >
                {authError}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* EMAIL */}
            <motion.div {...fadeUp(0.08)}>
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

            {/* PASSWORD */}
            <motion.div {...fadeUp(0.1)}>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-xs font-bold uppercase tracking-wider text-[#111111]"
                >
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className={`rounded text-xs font-bold uppercase tracking-wide text-[#E11D1D] transition-opacity hover:opacity-75 ${focusRing}`}
                >
                  Forgot?
                </Link>
              </div>
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
                  className="h-14 w-full rounded-2xl border-0 bg-[#F5F5F5] pl-5 pr-12 font-body text-sm font-medium text-[#111111] placeholder:text-[#666666] outline-none ring-0 transition-colors focus:bg-[#EFEFEF]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className={`absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer rounded-full border-0 p-2 text-[#4A4A4A] transition-colors hover:text-[#111111] ${focusRing}`}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
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

            {/* SUBMIT BUTTON */}
            <motion.div {...fadeUp(0.12)} className="pt-3">
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
                    Sign In
                    <ArrowRight size={16} strokeWidth={2.5} />
                  </>
                )}
              </motion.button>
            </motion.div>
          </form>

          {/* FOOTER SWITCH NOTE */}
          <motion.div {...fadeUp(0.14)} className="mt-8 text-center sm:text-left">
            <p className="font-body text-xs font-medium text-[#4A4A4A]">
              Don't have an account?{" "}
              <Link
                to="/register"
                className={`rounded font-display font-black uppercase tracking-wider text-[#E11D1D] hover:underline ${focusRing}`}
              >
                Register Now
              </Link>
            </p>
          </motion.div>
        </div>

        {/* LEGAL ROW */}
        <div className="py-2 text-center sm:text-left">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#4A4A4A]">
            © {new Date().getFullYear()} {BRAND_NAME} · {SLOGAN}
          </p>
        </div>
      </main>
    </div>
  );
}