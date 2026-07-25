import React, { useState, useEffect, useCallback } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../cart/CartContext";
import {
  Menu, X, Home, UserCircle, Store, Info, Phone,
  ShoppingBasket, Clock, Heart, ArrowRight
} from "lucide-react";

/* ── Design Tokens (Synced with Hero.jsx) ─────────────────────────────── */
const GREEN = "#0edb0e";
const GOLD = "#facc15";
const cx = (...c) => c.filter(Boolean).join(" ");

const WHATSAPP_NUMBER = "256776464823";
const PHONE_DISPLAY = "+256 776 464 823";
const BRAND_NAME = "GreenPork";

const NAV_LINKS = [
  { icon: Home, label: "Home", to: "/", desc: "Go to homepage" },
  { icon: Store, label: "Menu", to: "/Products", desc: "Browse delicious pork" },
  { icon: Info, label: "About", to: "/aboutUs", desc: "Our story & history" },
  { icon: Phone, label: "Contact", to: "/contactUs", desc: "Get in touch with us" },
];

/* ── Typography Injector ──────────────────────────────────────────────── */
const FontFace = React.memo(function FontFace() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Inter:wght@400;500;600&family=Poppins:wght@500;600;700&display=swap');
      .font-display { font-family: 'Montserrat', sans-serif; }
      .font-ui { font-family: 'Poppins', sans-serif; }
      .font-body { font-family: 'Inter', sans-serif; }
    `}</style>
  );
});

/* ── Brand Mark ─────────────────────────────────────────────────────── */
const Logo = React.memo(function Logo({ size = 28, textClass = "text-lg", isHero = false }) {
  return (
    <Link to="/" className="flex items-center gap-2.5 group" aria-label={`${BRAND_NAME} home`}>
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true" className="transition-transform duration-300 group-hover:scale-110">
        <circle cx="16" cy="16" r="14.5" stroke={GREEN} strokeWidth="1.5" />
        <path d="M9 12 L12.5 8.5 M23 12 L19.5 8.5" stroke={GREEN} strokeWidth="1.5" strokeLinecap="round" />
        <ellipse cx="16" cy="18" rx="7" ry="5.5" fill={GREEN} />
        <circle cx="13.2" cy="18" r="1.1" fill="#000" />
        <circle cx="18.8" cy="18" r="1.1" fill="#000" />
      </svg>
      <span className={`font-display font-black tracking-wide ${isHero ? "text-white" : "text-stone-900"} ${textClass} transition-colors duration-300`}>
        Green<span style={{ color: GREEN }}>Pork</span>
      </span>
    </Link>
  );
});

/* ── Main Navbar Component ────────────────────────────────────────────── */
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { totalItems } = useCart() || { totalItems: 0 };
  const location = useLocation();

  // Explicitly check if we are on the Hero route to trigger the dark glass style
  const isHeroRoute = location.pathname === "/";

  // Auto-close mobile drawer on route changes
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Lock body scroll under active modal overlays
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const closeMenu = useCallback(() => setOpen(false), []);

  return (
    <div>
      <FontFace />

      {/* ════════════════════════════════════════════════════════════════════════
          PREMIUM FLOATING HEADER (Transparent Outer) 
      ════════════════════════════════════════════════════════════════════════ */}
      <header className="fixed top-0 z-40 w-full px-4 sm:px-6 pt-4 pointer-events-none">
        <div className="max-w-[1400px] mx-auto pointer-events-auto">
          {/* 
            Outer container is completely transparent. 
          */}
          <div className="flex items-center justify-between px-5 sm:px-7 py-3 transition-colors duration-300">

            <Logo isHero={isHeroRoute} />

            {/* ── Desktop Navigation Links (Frosted White Glass Pill) ── */}
            <nav
              className="hidden lg:flex items-center gap-1 p-1.5 rounded-full transition-colors duration-300 backdrop-blur-xl bg-white/60 shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
              aria-label="Primary Nav"
            >
              {NAV_LINKS.map(({ icon: Icon, label, to }) => (
                <NavLink
                  key={to}
                  to={to}
                  className="relative flex items-center gap-2 px-5 py-2 rounded-full text-[11px] font-ui font-semibold tracking-widest uppercase transition-colors duration-300 z-10"
                >
                  {({ isActive }) => (
                    <>
                      <span className={cx(
                        "relative z-10 flex items-center gap-2 transition-colors duration-300",
                        isActive
                          ? "text-stone-950"
                          : "text-stone-500 hover:text-stone-900"
                      )}>
                        <Icon size={14} aria-hidden="true" />
                        {label}
                      </span>

                      {isActive && (
                        <motion.span
                          layoutId="activeNavTrack"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          className="absolute inset-0 bg-white rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* ── Desktop Actions ── */}
            <div className="hidden lg:flex items-center gap-3 select-none">
              <Link
                to="/cart"
                className={cx(
                  "relative w-11 h-11 rounded-full flex items-center justify-center transition-colors duration-300",
                  isHeroRoute
                    ? "text-stone-700 hover:text-stone-900 hover:bg-white/80 backdrop-blur-md bg-white/60"
                    : "text-stone-600 hover:text-stone-900 hover:bg-stone-100 border border-transparent"
                )}
                aria-label="View cart"
              >
                <ShoppingBasket size={18} aria-hidden="true" />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-[#0edb0e] text-stone-950 text-[9px] font-black flex items-center justify-center shadow-[0_0_10px_rgba(14,219,14,0.6)]">
                    {totalItems}
                  </span>
                )}
              </Link>

              {/* Hidden below xl, kept as requested */}
              <motion.button
                type="button"
                aria-label="View profile"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                className={cx(
                  "hidden xl:flex relative h-11 w-11 rounded-full items-center justify-center transition-colors duration-300",
                  isHeroRoute
                    ? "text-stone-700 hover:text-stone-900 hover:bg-white/80 backdrop-blur-md bg-white/60"
                    : "text-stone-600 hover:text-stone-900 hover:bg-stone-100 border border-transparent"
                )}
              >
                <UserCircle size={18} aria-hidden="true" />
              </motion.button>

              <div className={cx("h-5 w-px transition-colors duration-300", isHeroRoute ? "bg-stone-300/50" : "bg-stone-200")} />

              <a
                href={`tel:+${WHATSAPP_NUMBER}`}
                className={cx(
                  "flex items-center gap-2 text-[11px] font-ui font-semibold uppercase tracking-widest transition-colors pl-2",
                  isHeroRoute
                    ? "text-stone-600 hover:text-stone-900"
                    : "text-stone-500 hover:text-stone-900"
                )}
              >
                <Phone className="text-[#0edb0e]" size={13} aria-hidden="true" style={{ filter: 'drop-shadow(0 0 6px rgba(14,219,14,0.6))' }} />
                {PHONE_DISPLAY}
              </a>
            </div>

            {/* ── Mobile Actions ── */}
            <div className="flex lg:hidden items-center gap-2 select-none">
              <Link
                to="/cart"
                className={cx(
                  "relative w-11 h-11 rounded-full flex items-center justify-center transition-colors duration-300",
                  isHeroRoute
                    ? "text-stone-700 hover:text-stone-900 hover:bg-white/80 backdrop-blur-md bg-white/60"
                    : "text-stone-600 hover:text-stone-900 hover:bg-stone-100 border border-transparent"
                )}
                aria-label="View cart"
              >
                <ShoppingBasket size={18} aria-hidden="true" />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-[#0edb0e] text-stone-950 text-[9px] font-black flex items-center justify-center shadow-[0_0_10px_rgba(14,219,14,0.6)]">
                    {totalItems}
                  </span>
                )}
              </Link>

              <motion.button
                onClick={() => setOpen((prev) => !prev)}
                whileTap={{ scale: 0.95 }}
                className="h-11 w-11 rounded-full flex items-center justify-center text-black shadow-[0_8px_22px_rgba(14,219,14,0.4)] transition-colors"
                style={{ background: `linear-gradient(135deg, ${GREEN}, #0bb00b)` }}
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
              >
                {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
              </motion.button>
            </div>

          </div>
        </div>
      </header>

      {/* ════════════════════════════════════════════════════════════════════════
          PREMIUM DARK GLASS BOTTOM SHEET DRAWER
      ════════════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop Blur Overlay */}
            <motion.div
              key="nav-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              onClick={closeMenu}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-md lg:hidden"
              aria-hidden="true"
            />

            {/* Sliding Sheet Drawer Container (Always Dark) */}
            <motion.div
              key="nav-sheet"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed bottom-0 left-0 right-0 z-50 flex flex-col bg-[#080808] rounded-t-[2.5rem] shadow-[0_-20px_60px_rgba(0,0,0,0.6)] lg:hidden max-h-[88vh] select-none overflow-hidden border-t border-white/[0.05]"
              role="dialog"
              aria-label="Navigation drawer"
            >
              {/* Ambient Watermark Icon (Matches Hero.jsx aesthetic) */}
              <Store className="absolute -top-8 -right-8 text-white/[0.03] pointer-events-none" size={240} strokeWidth={1} />

              {/* Drag handle block */}
              <div className="py-4 shrink-0 cursor-pointer flex justify-center group relative z-10" onClick={closeMenu}>
                <div className="w-12 h-1.5 bg-white/15 group-hover:bg-white/25 rounded-full transition-colors duration-200" />
              </div>

              {/* Drawer Header */}
              <div className="flex items-center justify-between px-6 pb-4 pt-1 shrink-0 relative z-10">
                <div>
                  <h2 className="font-display text-2xl font-black text-white tracking-tight">Navigation</h2>
                  <p className="text-white/40 text-xs mt-1 font-body font-medium">Where would you like to go today?</p>
                </div>
                <motion.button
                  onClick={closeMenu}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/[0.1] transition-all duration-200 backdrop-blur-md border border-white/[0.05]"
                  aria-label="Close menu"
                >
                  <X size={18} aria-hidden="true" />
                </motion.button>
              </div>

              {/* Drawer Grid Navigation */}
              <motion.nav
                className="flex-1 px-6 py-2 overflow-y-auto relative z-10"
                aria-label="Mobile Navigation Drawer"
                variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.1 } } }}
                initial="hidden"
                animate="show"
              >
                <div className="grid grid-cols-2 gap-3.5">
                  {NAV_LINKS.map(({ label, to, icon: Icon, desc }) => {
                    const MotionNavLink = motion(NavLink);

                    return (
                      <MotionNavLink
                        key={to}
                        to={to}
                        onClick={closeMenu}
                        variants={{ hidden: { opacity: 0, y: 20, scale: 0.95 }, show: { opacity: 1, y: 0, scale: 1 } }}
                        className={({ isActive }) =>
                          cx(
                            "flex flex-col items-start p-4 rounded-2xl transition-all duration-300 text-left relative overflow-hidden group border border-white/[0.05] backdrop-blur-md",
                            isActive
                              ? "bg-white/[0.1] shadow-[0_8px_24px_rgba(14,219,14,0.15)]"
                              : "bg-white/[0.03] hover:bg-white/[0.07]"
                          )
                        }
                      >
                        {/* Decorative dynamic ambient glow corner */}
                        <span className="absolute top-0 right-0 w-16 h-16 rounded-bl-3xl bg-gradient-to-br from-[#0edb0e]/20 to-transparent group-hover:scale-150 transition-transform duration-500 ease-out" />

                        <span className="p-2.5 rounded-xl bg-white/[0.08] text-[#0edb0e] mb-4 inline-block shrink-0 shadow-lg backdrop-blur-sm">
                          <Icon size={16} aria-hidden="true" />
                        </span>

                        <span className="font-ui font-bold text-sm tracking-tight text-white block">
                          {label}
                        </span>

                        <span className="text-[10px] text-white/40 mt-1 font-body font-medium line-clamp-1">
                          {desc}
                        </span>
                      </MotionNavLink>
                    );
                  })}
                </div>

                {/* Operations Info Card */}
                <motion.div
                  variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                  className="mt-4 p-4 rounded-2xl flex items-center gap-3.5 bg-gradient-to-r from-[#0edb0e]/10 to-transparent border border-white/[0.05] backdrop-blur-md"
                >
                  <div className="p-2.5 rounded-xl text-[#0edb0e] shrink-0 bg-white/[0.05]">
                    <Clock size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] font-ui font-bold uppercase tracking-wider text-[#0edb0e]">Service Hours</p>
                    <p className="text-sm font-display font-black text-white">Open Daily · 10 AM – 10 PM</p>
                  </div>
                </motion.div>
              </motion.nav>

              {/* Action Sheet Footer */}
              <div className="p-6 bg-black/40 backdrop-blur-xl shadow-[0_-5px_20px_rgba(0,0,0,0.3)] flex flex-col sm:flex-row gap-3 shrink-0 relative z-10 border-t border-white/[0.05]">
                <Link
                  to="/favorites"
                  onClick={closeMenu}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.12] text-white font-ui font-semibold text-xs uppercase tracking-widest transition-all duration-150 border border-white/[0.05]"
                >
                  <Heart size={14} className="text-red-500 fill-red-500" aria-hidden="true" />
                  Favorites
                </Link>

                <motion.a
                  href={`tel:+${WHATSAPP_NUMBER}`}
                  whileTap={{ scale: 0.97 }}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-stone-950 font-ui font-bold text-xs uppercase tracking-widest transition-all duration-150"
                  style={{ background: `linear-gradient(135deg, ${GREEN}, #0bb00b)`, boxShadow: "0 10px 28px rgba(14, 219, 14, 0.35)" }}
                >
                  <Phone size={14} aria-hidden="true" />
                  Call Now
                  <ArrowRight size={12} className="opacity-80" />
                </motion.a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;