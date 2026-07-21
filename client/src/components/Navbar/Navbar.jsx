import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import green from "../../assets/ChatGPT Image Jul 12, 2026, 04_17_26 PM.png";
import { useCart } from "../cart/CartContext";
import {
  Menu, X, Home, UserCircle, Store, Info, Phone,
  ShoppingBasket, PiggyBank, Heart, Clock
} from "lucide-react";

// ─── CONFIGURATION ───────────────────────────────────────────────────────────
const WHATSAPP_NUMBER = "256776464823";
const PHONE_DISPLAY = "+256 776 464 823";
const BRAND_NAME = "GreenPork";

const NAV_LINKS = [
  { icon: <Home size={18} aria-hidden="true" />, label: "Home", to: "/", desc: "Go to homepage" },
  { icon: <Store size={18} aria-hidden="true" />, label: "Menu", to: "/Products", desc: "Browse delicious pork" },
  { icon: <Info size={18} aria-hidden="true" />, label: "About", to: "/aboutUs", desc: "Our story & history" },
  { icon: <Phone size={18} aria-hidden="true" />, label: "Contact", to: "/contactUs", desc: "Get in touch with us" },
];

// ─── MAIN NAVBAR COMPONENT ───────────────────────────────────────────────────
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { totalItems } = useCart();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Auto-close drawer on route change for seamless UX
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const closeMenu = useCallback(() => setOpen(false), []);

  return (
    <>
      {/* ════════════════════════════════════════════════════════════════════════
          STICKY HEADER (Both Desktop & Mobile)
      ════════════════════════════════════════════════════════════════════════ */}
      <header className="sticky top-0 z-40 transition-all duration-500">
        <div
          className={`transition-all duration-500 ${scrolled
            ? "bg-white/80 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] py-1"
            : "bg-transparent py-3"
            }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between h-16 sm:h-20">

                            {/* ── Premium Logo Layout ── */}
              <Link 
                to="/" 
                className="flex items-center gap-3 group shrink-0" 
                aria-label={`${BRAND_NAME} home`}
              >
                {/* High-end dimensional icon vessel */}
                <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-br from-[#0edb0e] to-[#0bc50b] shadow-lg shadow-[#0edb0e]/25 transition-transform duration-300 group-hover:scale-105">
                  {/* Inset light overlay for 3D depth */}
                  <div className="absolute inset-0 rounded-2xl bg-white/10" style={{ clipPath: "polygon(0 0, 100% 0, 100% 30%, 0 30%)" }} />
                  <PiggyBank className="w-5 h-5 text-white drop-shadow-sm" aria-hidden="true" />
                </div>

                {/* Premium Typography Treatment */}
                <div className="hidden sm:flex flex-col">
                  <h3 className="text-[1.35rem] font-extrabold tracking-[-0.025em] text-stone-900 leading-none flex items-baseline gap-1.5">
                    <span className="text-[#0edb0e]">Green</span>
                    <span>Pork</span>
                  </h3>
                  {/* Refined architectural accent underline */}
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="h-[2.5px] w-2 rounded-full bg-[#0edb0e]" />
                    <span className="h-[1px] w-10 bg-stone-300" />
                    <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-stone-400">Premium Cuts</span>
                  </div>
                </div>
              </Link>

              {/* ─── Desktop Nav Links (Hidden on Mobile) ─── */}
              <nav className="hidden lg:flex items-center gap-1 p-1 bg-stone-100/50 rounded-full" aria-label="Primary Nav">
                {NAV_LINKS.map(({ icon, label, to }) => (
                  <NavLink
                    key={to}
                    to={to}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all duration-300 ${isActive
                        ? "text-stone-950 bg-white shadow-[0_4px_15px_rgba(0,0,0,0.05)]"
                        : "text-stone-500 hover:text-stone-900 hover:bg-white/50"
                      }`
                    }
                  >
                    {icon}
                    {label}
                  </NavLink>
                ))}
              </nav>

              {/* ─── Desktop Actions (Hidden on Mobile) ─── */}
              <div className="hidden lg:flex items-center gap-3 select-none">
                <Link
                  to="/cart"
                  className="relative w-11 h-11 rounded-full bg-[#F8F8F5] hover:bg-white hover:shadow-sm flex items-center justify-center transition-all duration-300"
                  aria-label="View cart"
                >
                  <ShoppingBasket size={18} className="text-stone-800" aria-hidden="true" />
                  {totalItems > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-[#0edb0e] text-stone-950 text-[9px] font-black flex items-center justify-center shadow-sm shadow-[#0edb0e]/20">
                      {totalItems}
                    </span>
                  )}
                </Link>

                <Link
                  to="/profile"
                  className="w-11 h-11 rounded-full flex items-center justify-center text-stone-500 hover:text-stone-900 hover:bg-[#F8F8F5] transition-all duration-300"
                  aria-label="View profile"
                >
                  <UserCircle size={22} aria-hidden="true" />
                </Link>

                <a
                  href={`tel:+${WHATSAPP_NUMBER}`}
                  className="flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-widest text-stone-500 hover:text-stone-900 transition-all duration-300 pl-4"
                >
                  <Phone className="text-[#0edb0e]" size={14} aria-hidden="true" />
                  {PHONE_DISPLAY}
                </a>
              </div>

              {/* ─── Mobile Trigger Hub (Hidden on Desktop) ─── */}
              <div className="flex lg:hidden items-center gap-2 select-none">
                <Link
                  to="/cart"
                  className="relative w-11 h-11 rounded-full bg-[#F8F8F5] flex items-center justify-center transition-all duration-200"
                  aria-label="View cart"
                >
                  <ShoppingBasket size={18} className="text-stone-800" aria-hidden="true" />
                  {totalItems > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-[#0edb0e] text-stone-950 text-[9px] font-black flex items-center justify-center shadow-sm shadow-[#0edb0e]/20">
                      {totalItems}
                    </span>
                  )}
                </Link>

                <button
                  onClick={() => setOpen((v) => !v)}
                  className="w-11 h-11 rounded-full bg-stone-900 text-white flex items-center justify-center hover:bg-stone-800 transition-all duration-200 shadow-lg shadow-stone-900/10"
                  aria-label={open ? "Close menu" : "Open menu"}
                  aria-expanded={open}
                >
                  {open
                    ? <X size={18} aria-hidden="true" />
                    : <Menu size={20} aria-hidden="true" />
                  }
                </button>
              </div>

            </div>
          </div>
        </div>
      </header>


      {/* ════════════════════════════════════════════════════════════════════════
          TACTILE iOS-STYLE SLIDING SHEET DRAWER (Mobile Only)
      ════════════════════════════════════════════════════════════════════════ */}
      {/* ════════════════════════════════════════════════════════════════════════
          TACTILE iOS-STYLE SLIDING SHEET DRAWER (Mobile Only)
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
              className="fixed inset-0 z-40 bg-stone-950/40 backdrop-blur-md lg:hidden"
              aria-hidden="true"
            />

            {/* Sliding Sheet Drawer */}
            <motion.div
              key="nav-sheet"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 280, damping: 30 }}
              className="fixed bottom-0 left-0 right-0 z-50 flex flex-col bg-white rounded-t-[2.5rem] shadow-[0_-15px_40px_rgba(0,0,0,0.12)] border-t border-stone-100 lg:hidden max-h-[85vh] select-none overflow-hidden"
              role="dialog"
              aria-label="Navigation drawer"
            >
              {/* Pull-down indicator bar */}
              <div 
                className="py-3 shrink-0 cursor-pointer flex justify-center group" 
                onClick={closeMenu}
              >
                <div className="w-12 h-1.5 bg-stone-200 group-hover:bg-stone-300 rounded-full transition-colors duration-200" />
              </div>

              {/* Drawer Header */}
              <div className="flex items-center justify-between px-6 pb-3 pt-1 shrink-0">
                <div>
                  <h2 className="text-2xl font-black text-stone-900 tracking-tight">Navigation</h2>
                  <p className="text-stone-400 text-xs mt-0.5 font-medium">Where would you like to go today?</p>
                </div>
                <button
                  onClick={closeMenu}
                  className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center text-stone-900 hover:bg-stone-100 active:scale-95 transition-all duration-200"
                  aria-label="Close menu"
                >
                  <X size={18} aria-hidden="true" />
                </button>
              </div>

              {/* Bento Grid Layout Navigation Links with staggered animation */}
              <motion.nav 
                className="flex-1 px-6 py-2 overflow-y-auto" 
                aria-label="Mobile Navigation"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.05,
                      delayChildren: 0.05
                    }
                  }
                }}
                initial="hidden"
                animate="show"
              >
                <div className="grid grid-cols-2 gap-3.5">
                  {NAV_LINKS.map(({ label, to, icon, desc }) => {
                    // Create an animated NavLink using framer-motion
                    const MotionNavLink = motion(NavLink);
                    
                    return (
                      <MotionNavLink
                        key={to}
                        to={to}
                        onClick={closeMenu}
                        variants={{
                          hidden: { opacity: 0, y: 15, scale: 0.96 },
                          show: { opacity: 1, y: 0, scale: 1 }
                        }}
                        className={({ isActive }) =>
                          `flex flex-col items-start p-4 rounded-2xl transition-all duration-200 text-left relative overflow-hidden group border ${isActive
                            ? "bg-gradient-to-b from-[#0edb0e]/10 to-[#0edb0e]/5 border-[#0edb0e]/20 text-stone-900 shadow-sm shadow-[#0edb0e]/5"
                            : "bg-stone-50/60 border-stone-100 hover:border-stone-200 text-stone-600 active:bg-stone-100"
                          }`
                        }
                      >
                        {/* Decorative corner accent block */}
                        <span className="absolute top-0 right-0 w-12 h-12 rounded-bl-3xl bg-gradient-to-br from-[#0edb0e]/10 to-transparent group-hover:scale-110 transition-transform duration-300" />

                        <span className="p-2.5 rounded-xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] text-[#0edb0e] mb-4 inline-block shrink-0 border border-stone-100">
                          {icon}
                        </span>

                        <span className="font-extrabold text-[14px] tracking-tight block">
                          {label}
                        </span>

                        <span className="text-[10px] text-stone-400 mt-1 font-medium line-clamp-1">
                          {desc}
                        </span>
                      </MotionNavLink>
                    );
                  })}
                </div>

                {/* Quick-reach cohesive brand Hours info box */}
                <motion.div 
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    show: { opacity: 1, y: 0 }
                  }}
                  className="mt-5 p-4 rounded-2xl bg-gradient-to-r from-[#0edb0e]/8 to-[#0edb0e]/3 border border-[#0edb0e]/10 flex items-center gap-3.5"
                >
                  <div className="p-2.5 rounded-xl bg-white text-[#0edb0e] shadow-[0_2px_8px_rgba(0,0,0,0.04)] shrink-0 border border-stone-50">
                    <Clock size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#0bc50b]">Service Hours</p>
                    <p className="text-xs font-black text-stone-900">Open Daily · 10 AM – 10 PM</p>
                  </div>
                </motion.div>
              </motion.nav>

              {/* Tactile Action Strip */}
              <div className="p-6 bg-stone-50/80 backdrop-blur-sm border-t border-stone-100/60 flex flex-col sm:flex-row gap-3 shrink-0">
                <Link
                  to="/favorites"
                  onClick={closeMenu}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-white hover:bg-stone-100 text-stone-800 font-extrabold text-xs uppercase tracking-wider active:scale-[0.98] transition-all duration-150 border border-stone-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
                >
                  <Heart size={14} className="text-red-500 fill-red-500 animate-pulse" aria-hidden="true" />
                  Favorites List
                </Link>

                <a
                  href={`tel:+${WHATSAPP_NUMBER}`}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-[#0edb0e] to-[#0bc50b] hover:from-[#0bc50b] hover:to-[#09b009] text-stone-950 font-black text-xs uppercase tracking-wider active:scale-[0.98] transition-all duration-150 shadow-[0_4px_20px_rgba(14,219,14,0.15)]"
                >
                  <Phone size={14} aria-hidden="true" />
                  Call Now
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;