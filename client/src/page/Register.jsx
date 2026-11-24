import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
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
const AUTH_DELAY_MS = 900;

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
const SPRING = { type: "spring", stiffness: 260, damping: 24, mass: 0.9 };
const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111]";

export default function LoginForm() {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeRole, setActiveRole] = useState("admin");
  const [focusedField, setFocusedField] = useState(null);

  const [formData, setFormData] = useState({
    email: DEMO_USERS.admin.email,
    password: DEMO_USERS.admin.password,
  });

  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState("");

  const mountedRef = useRef(true);
  const progressRafRef = useRef(null);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
      if (progressRafRef.current) {
        cancelAnimationFrame(progressRafRef.current);
      }
    };
  }, []);

  // Live 60fps progress bar driven during simulated authentication
  useEffect(() => {
    if (!loading) {
      setProgress(0);
      if (progressRafRef.current) {
        cancelAnimationFrame(progressRafRef.current);
      }
      return undefined;
    }

    const startTime = performance.now();

    const tick = (now) => {
      const elapsed = now - startTime;
      // Smoothly advance up to 92% while awaiting response, then snap to 100% on completion
      const easedRatio = 1 - Math.exp(-elapsed / (AUTH_DELAY_MS * 0.45));
      const nextProgress = Math.min(92, Math.round(easedRatio * 92));
      setProgress(nextProgress);

      if (elapsed < AUTH_DELAY_MS * 2.5) {
        progressRafRef.current = requestAnimationFrame(tick);
      }
    };

    progressRafRef.current = requestAnimationFrame(tick);

    return () => {
      if (progressRafRef.current) {
        cancelAnimationFrame(progressRafRef.current);
      }
    };
  }, [loading]);

  const fadeUp = (delay = 0) => ({
    initial: shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, y: 14, filter: "blur(4px)" },
    animate: shouldReduceMotion
      ? { opacity: 1 }
      : {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.5, ease: EASE, delay },
      },
    exit: shouldReduceMotion
      ? { opacity: 0 }
      : {
        opacity: 0,
        y: -8,
        filter: "blur(3px)",
        transition: { duration: 0.18 },
      },
  });

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
    const trimmedEmail = formData.email.trim();

    if (!trimmedEmail) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
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
    if (loading || !validate()) return;

    try {
      setLoading(true);
      setAuthError("");

      await new Promise((resolve) => window.setTimeout(resolve, AUTH_DELAY_MS));

      const normalizedEmail = formData.email.trim().toLowerCase();
      const matchedUser = Object.values(DEMO_USERS).find(
        (u) =>
          u.email.toLowerCase() === normalizedEmail &&
          u.password === formData.password
      );

      if (!matchedUser) {
        if (mountedRef.current) {
          setAuthError("Invalid credentials. Use the quick demo toggles above.");
        }
        return;
      }

      setProgress(100);
      await new Promise((resolve) => window.setTimeout(resolve, 140));

      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userEmail", formData.email.trim());
      localStorage.setItem(
        "userRole",
        normalizedEmail.includes("admin") ? "admin" : "customer"
      );

      navigate("/home");
    } catch (err) {
      console.error(err);
      if (mountedRef.current) {
        setAuthError("Something went wrong. Please try again.");
      }
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  }

  return (
    <div className="font-display relative flex h-[100dvh] w-full overflow-hidden border-0 bg-[#111111] text-white selection:bg-[#D9FF00] selection:text-[#111111]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@700;800;900&family=Inter:wght@400;500;600;700&display=swap');
        .font-display { font-family: 'Archivo', sans-serif; }
        .font-body { font-family: 'Inter', sans-serif; }
      `}</style>

      {/* LIVE 60FPS TOP PROGRESS BAR DURING AUTHENTICATION */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            aria-hidden="true"
            className="pointer-events-none fixed inset-x-0 top-0 z-50 h-1 border-0 bg-black/10"
          >
            <motion.div
              animate={{ scaleX: progress / 100 }}
              transition={{ duration: 0.08, ease: "linear" }}
              style={{ transformOrigin: "left", backgroundColor: PALETTE.red }}
              className="h-full w-full will-change-transform"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════════════
         LEFT: EDITORIAL BRAND HERO STAGE (BORDERLESS DARK SURFACE)
         ═══════════════════════════════════════════════════════════ */}
      <aside className="relative z-10 hidden h-full w-1/2 flex-col justify-between overflow-hidden border-0 bg-[#111111] p-16 lg:flex xl:p-24">
        <motion.img
          src={BG_IMAGE}
          alt={BRAND}
          initial={shouldReduceMotion ? false : { scale: 1.06, opacity: 0.25 }}
          animate={{ scale: 1, opacity: 0.35 }}
          transition={{ duration: 1.1, ease: EASE }}
          className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover object-center will-change-transform"
        />
        <div
          className="pointer-events-none absolute inset-0 border-0"
          style={{
            background:
              "linear-gradient(160deg, rgba(17,17,17,0.88) 0%, rgba(17,17,17,0.72) 55%, rgba(225,29,29,0.28) 100%)",
          }}
        />

        {/* TOP BRAND IDENTITY */}
        <div className="relative z-10 flex items-center gap-4">
          <motion.div
            whileHover={shouldReduceMotion ? undefined : { scale: 1.03 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
            transition={SPRING}
          >
            <Link
              to="/"
              className={`flex items-center gap-3 rounded-full border-0 ${focusRing}`}
            >
              <img
                src={Logo}
                alt={BRAND_NAME}
                className="h-20 w-auto select-none object-contain"
              />
            </Link>
          </motion.div>
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
            {...fadeUp(0.05)}
            className="font-display text-6xl font-black uppercase leading-[0.88] tracking-[-0.04em] text-white xl:text-7xl"
          >
            SIGN IN <br />
            <span style={{ color: PALETTE.red }}>TO ORDER.</span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.1)}
            className="mt-6 max-w-sm font-body text-sm font-medium leading-relaxed text-white/85"
          >
            Order freshly prepared pork, burgers, pizza, and chicken in Gulu
            City, track orders, and manage your {BRAND_NAME} account.
          </motion.p>
        </div>

        {/* FOOTER METRICS */}
        <motion.div
          {...fadeUp(0.15)}
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
              className="h-10 w-auto select-none object-contain"
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

          {/* SLIDING PILL DEMO ROLE SWITCHER */}
          <motion.div
            {...fadeUp(0.07)}
            role="group"
            aria-label="Quick demo role selector"
            className="mb-7 rounded-2xl border-0 bg-[#F5F5F5] p-1.5"
          >
            <div className="relative grid grid-cols-2 gap-1.5">
              {[
                { id: "admin", label: "As Admin", Icon: ShieldCheck },
                { id: "customer", label: "As Customer", Icon: UserCheck },
              ].map(({ id, label, Icon }) => {
                const isActive = activeRole === id;
                return (
                  <button
                    key={id}
                    type="button"
                    aria-pressed={isActive}
                    disabled={loading}
                    onClick={() => fillCredentials(id)}
                    className={`relative z-10 flex cursor-pointer items-center justify-center gap-1.5 rounded-xl border-0 py-3 font-display text-[11px] font-bold uppercase tracking-wider transition-colors disabled:cursor-not-allowed ${focusRing} ${isActive
                        ? "text-[#D9FF00]"
                        : "text-[#2A2A2A] hover:text-[#111111]"
                      }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activeRolePill"
                        transition={SPRING}
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 -z-10 rounded-xl border-0 bg-[#111111]"
                      />
                    )}
                    <Icon size={14} className="relative z-10" />
                    <span className="relative z-10">{label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* AUTH ERROR ALERT */}
          <AnimatePresence mode="wait">
            {authError && (
              <motion.div
                role="alert"
                aria-live="assertive"
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.98 }}
                animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.98 }}
                transition={{ duration: 0.2, ease: EASE }}
                className="mb-5 rounded-2xl border-0 bg-[#E11D1D]/10 px-4 py-3 font-body text-xs font-bold text-[#E11D1D]"
              >
                {authError}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* EMAIL */}
            <motion.div {...fadeUp(0.1)}>
              <label
                htmlFor="email"
                className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#111111]"
              >
                Email Address
              </label>
              <motion.div
                animate={
                  shouldReduceMotion
                    ? undefined
                    : { scale: focusedField === "email" ? 1.008 : 1 }
                }
                transition={SPRING}
              >
                <input
                  id="email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  disabled={loading}
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="you@example.com"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className="h-14 w-full rounded-2xl border-0 bg-[#F5F5F5] px-5 font-body text-sm font-medium text-[#111111] placeholder:text-[#666666] outline-none ring-0 transition-colors focus:bg-[#EFEFEF] disabled:opacity-60"
                />
              </motion.div>
              <AnimatePresence>
                {errors.email && (
                  <motion.p
                    id="email-error"
                    role="alert"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.16 }}
                    className="mt-1.5 pl-1 text-xs font-bold text-[#E11D1D]"
                  >
                    {errors.email}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* PASSWORD */}
            <motion.div {...fadeUp(0.13)}>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-xs font-bold uppercase tracking-wider text-[#111111]"
                >
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className={`rounded border-0 text-xs font-bold uppercase tracking-wide text-[#E11D1D] transition-opacity hover:opacity-75 ${focusRing}`}
                >
                  Forgot?
                </Link>
              </div>
              <motion.div
                animate={
                  shouldReduceMotion
                    ? undefined
                    : { scale: focusedField === "password" ? 1.008 : 1 }
                }
                transition={SPRING}
                className="relative"
              >
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  disabled={loading}
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="••••••••"
                  aria-invalid={!!errors.password}
                  aria-describedby={
                    errors.password ? "password-error" : undefined
                  }
                  className="h-14 w-full rounded-2xl border-0 bg-[#F5F5F5] pl-5 pr-12 font-body text-sm font-medium text-[#111111] placeholder:text-[#666666] outline-none ring-0 transition-colors focus:bg-[#EFEFEF] disabled:opacity-60"
                />
                <motion.button
                  type="button"
                  disabled={loading}
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.88 }}
                  onClick={() => setShowPassword((prev) => !prev)}
                  className={`absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer rounded-full border-0 p-2 text-[#4A4A4A] transition-colors hover:text-[#111111] disabled:cursor-not-allowed ${focusRing}`}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </motion.button>
              </motion.div>
              <AnimatePresence>
                {errors.password && (
                  <motion.p
                    id="password-error"
                    role="alert"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.16 }}
                    className="mt-1.5 pl-1 text-xs font-bold text-[#E11D1D]"
                  >
                    {errors.password}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* SUBMIT BUTTON */}
            <motion.div {...fadeUp(0.16)} className="pt-3">
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={loading || shouldReduceMotion ? undefined : { scale: 1.012, y: -1 }}
                whileTap={loading || shouldReduceMotion ? undefined : { scale: 0.985, y: 0 }}
                transition={SPRING}
                className={`group flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border-0 font-display text-xs font-black uppercase tracking-wider transition-opacity hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60 ${focusRing}`}
                style={{ backgroundColor: PALETTE.lime, color: PALETTE.ink }}
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Signing In · {progress}%</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight
                      size={16}
                      strokeWidth={2.5}
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </>
                )}
              </motion.button>
            </motion.div>
          </form>

          {/* FOOTER SWITCH NOTE */}
          <motion.div {...fadeUp(0.19)} className="mt-8 text-center sm:text-left">
            <p className="font-body text-xs font-medium text-[#4A4A4A]">
              Don't have an account?{" "}
              <Link
                to="/register"
                className={`rounded border-0 font-display font-black uppercase tracking-wider text-[#E11D1D] hover:underline ${focusRing}`}
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