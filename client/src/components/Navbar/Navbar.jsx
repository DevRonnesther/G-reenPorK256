import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../cart/CartContext";
import {
  X, Home, Store, Info, Phone, Clock,
  ShoppingCart, UserCircle, ArrowUpRight
} from "lucide-react";
import GreenPorkIcon from "../../assets/ChatGPT Image Sep 25, 2026, 09_20_20 PM.png";

const BRAND = "Green Pork";
const PHONE = "256776464823";
const DISPLAY_PHONE = "+256 776 464 823";
const HOURS = "10:00 AM – 10:00 PM";

// Standardized Colors
const BRAND_COLOR = "#D9FF00";
const DARK_COLOR = "#4A0A0A";
const ALERT_COLOR = "#E11D1D";
const ACCENT_ORANGE = "#E8590C";

// Routes where the header background is white, requiring dark default text
const WHITE_BG_ROUTES = ["/Products", "/cart", "/account", "/aboutUs", "/contactUs", "/Cart", "/returnPolicy"];

// Mobile gets a clean 2x2 grid. Desktop (md:) gets the asymmetric Bento layout.
const MENU_CARDS = [
  {
    label: "Home", to: "/", desc: "Start Here", sweep: ALERT_COLOR,
    hoverText: "group-hover:text-white", activeText: "text-white",
    icon: Home, span: "md:col-span-2 md:row-span-1"
  },
  {
    label: "Menu", to: "/Products", desc: "Order Food", sweep: BRAND_COLOR,
    hoverText: "group-hover:text-[#4A0A0A]", activeText: "text-[#4A0A0A]",
    icon: Store, span: "md:col-span-1 md:row-span-2"
  },
  {
    label: "About", to: "/aboutUs", desc: "Our Story", sweep: DARK_COLOR,
    hoverText: "group-hover:text-white", activeText: "text-white",
    icon: Info, span: "md:col-span-1 md:row-span-1"
  },
  {
    label: "Contact", to: "/contactUs", desc: "Say Hello", sweep: ACCENT_ORANGE,
    hoverText: "group-hover:text-white", activeText: "text-white",
    icon: Phone, span: "md:col-span-1 md:row-span-1"
  },
];

const cx = (...classes) => classes.filter(Boolean).join(" ");

const spring = { type: "spring", stiffness: 220, damping: 26 };
const ease = [0.16, 1, 0.3, 1];

function Logo({ isDark, onClick }) {
  const textColor = isDark ? "text-[#4A0A0A]" : "text-white";
  const subColor = isDark ? "text-[#4A0A0A]/60" : "text-white/70";

  return (

    <Link
      to="/"
      onClick={onClick}
      aria-label="GreenPork home"
      className="group flex shrink-0 select-none items-center gap-2
             "
    >
      <img
        src={GreenPorkIcon}
        alt="GreenPork"
        className="block h-9 w-auto max-w-[120px]
               object-contain
               transition-transform duration-300
               group-hover:scale-105
               sm:h-10 sm:max-w-[140px]
               md:h-11 md:max-w-[160px]
               lg:h-12 lg:max-w-[180px]"
      />
    </Link>

  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { totalItems = 0 } = useCart() || {};
  const location = useLocation();

  const isWhiteBgRoute = WHITE_BG_ROUTES.includes(location.pathname);
  const useDarkText = isWhiteBgRoute && !isScrolled;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setIsOpen(false), [location.pathname]);

  // Robust scroll lock for fullscreen menu
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      if (scrollY) window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    }
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const circleBtn = cx(
    "relative flex h-10 w-10 md:h-11 md:w-11 cursor-pointer items-center justify-center rounded-full transition-all focus:outline-none",
    useDarkText
      ? "bg-[#4A0A0A]/5 text-[#4A0A0A] hover:bg-[#4A0A0A]/10"
      : "bg-white/10 text-white backdrop-blur-md hover:bg-white/20"
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700;800;900&display=swap');
        .font-display { font-family: 'Archivo', sans-serif; }
      `}</style>

      {/* HEADER BAR */}
      <header
        className={cx(
          "fixed inset-x-0 top-0 z-50 font-display transition-all duration-300",
          isScrolled ? "py-3 bg-[#fff]/80 backdrop-blur-md shadow-lg" : "py-5 bg-transparent"
        )}
      >
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-4 md:px-12">
          <Logo isDark={useDarkText} />

          {/* Center pill links (Desktop) */}
          <nav
            className="hidden items-center gap-1 rounded-full p-1 lg:flex"
            aria-label="Main"
            style={{
              backgroundColor: useDarkText ? "rgba(74, 10, 10, 0.04)" : "rgba(255, 255, 255, 0.1)",
              backdropFilter: useDarkText ? "none" : "blur(12px)"
            }}
          >
            {MENU_CARDS.map(({ label, to }) => {
              const isActive = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  className="rounded-full px-5 py-2 text-xs font-bold transition-colors duration-300"
                  style={{
                    backgroundColor: isActive ? "#FFFFFF" : "transparent",
                    color: isActive ? DARK_COLOR : (useDarkText ? "rgba(74,10,10,0.7)" : "rgba(255,255,255,0.9)"),
                    boxShadow: isActive ? "0 2px 5px rgba(0,0,0,0.05)" : "none"
                  }}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2 md:gap-3">
            <Link
              to="/Products"
              className="hidden items-center justify-center rounded-full px-5 py-2.5 text-xs font-extrabold uppercase tracking-wide shadow-lg transition-transform hover:scale-105 active:scale-95 sm:inline-flex"
              style={{ backgroundColor: BRAND_COLOR, color: DARK_COLOR }}
            >
              Order now
            </Link>

            <Link to="/cart" className={cx(circleBtn, "group")} aria-label="Cart">
              <ShoppingCart size={18} className="transition-transform group-hover:-rotate-12" />
              {totalItems > 0 && (
                <span
                  className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-black text-white shadow-md transition-transform group-hover:scale-110"
                  style={{ backgroundColor: ALERT_COLOR }}
                >
                  {totalItems}
                </span>
              )}
            </Link>

            <Link to="/register" className={circleBtn} aria-label="Account">
              <UserCircle size={18} />
            </Link>

            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className={cx(circleBtn, "flex flex-col items-center justify-center gap-[3px]")}
              aria-expanded={isOpen}
              aria-label="Toggle navigation"
            >
              {isOpen ? (
                <X size={18} />
              ) : (
                <>
                  <div className={cx("h-[2px] w-4 rounded-full", useDarkText ? "bg-[#4A0A0A]" : "bg-white")} />
                  <div className="h-[2px] w-2.5 rounded-full" style={{ backgroundColor: BRAND_COLOR }} />
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* FULL SCREEN MENU - Perfected Fit Layout (h-[100dvh]) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.6, ease }}
            className="fixed inset-0 z-[60] flex h-[100dvh] flex-col bg-white p-4 font-display text-[#4A0A0A] md:p-8"
          >
            {/* Top Bar (Shrink-0 so it doesn't compress) */}
            <div className="flex shrink-0 items-center justify-between">
              <Logo isDark={true} onClick={() => setIsOpen(false)} />
              <motion.button
                type="button"
                onClick={() => setIsOpen(false)}
                whileHover={{ scale: 1.08, rotate: 90 }}
                whileTap={{ scale: 0.92 }}
                transition={spring}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#4A0A0A]/5 transition-colors hover:bg-[#4A0A0A]/10 md:h-12 md:w-12"
                aria-label="Close menu"
              >
                <X size={20} />
              </motion.button>
            </div>

            {/* Main Grid Area 
                Mobile: Symmetrical 2x2 Grid. 
                Desktop: Asymmetric Bento Box (3 cols, 2 rows). */}
            <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-3 py-4 min-h-0 md:grid-cols-3 md:gap-4">
              {MENU_CARDS.map((card, i) => {
                const isActive = location.pathname === card.to;
                return (
                  <motion.div
                    key={card.to}
                    initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)", transition: { delay: 0.2 + (i * 0.1), ease } }}
                    exit={{ opacity: 0, y: 20, transition: { duration: 0.2 } }}
                    // min-h-0 is crucial for grid children to allow them to shrink and fit the screen
                    className={cx("min-h-0", card.span)}
                  >
                    <NavLink
                      to={card.to}
                      onClick={() => setIsOpen(false)}
                      className={cx(
                        "group relative flex h-full w-full flex-col justify-between overflow-hidden rounded-[1.5rem] p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] md:rounded-[2rem] md:p-6",
                        isActive ? "bg-transparent" : "bg-[#4A0A0A]/[0.02] hover:bg-transparent"
                      )}
                    >
                      {/* Hover Sweep Background */}
                      <div
                        className="absolute inset-0 origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                        style={{ backgroundColor: card.sweep }}
                      />

                      {/* Active Indicator */}
                      {isActive && (
                        <div className="absolute inset-0" style={{ backgroundColor: card.sweep }} />
                      )}

                      {/* Ambient Ghost Icon (Contained neatly inside) */}
                      <div className="pointer-events-none absolute right-0 top-0 p-2 opacity-[0.05] transition-all duration-500 group-hover:opacity-10 group-hover:rotate-12">
                        {/* Scaled down slightly for mobile to ensure it doesn't overwhelm the card */}
                        <card.icon className="h-20 w-20 md:h-32 md:w-32" strokeWidth={1} />
                      </div>

                      {/* Top Row: Index & Live Icon */}
                      <div className="relative z-10 flex items-start justify-between">
                        <span
                          className={cx(
                            "text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 md:text-xs",
                            isActive ? cx(card.activeText, "opacity-50") : cx("text-[#4A0A0A]/50", card.hoverText, "group-hover:opacity-70")
                          )}
                        >
                          0{i + 1}
                        </span>
                        <card.icon
                          className={cx(
                            "h-5 w-5 opacity-40 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110 group-hover:opacity-100 md:h-6 md:w-6",
                            isActive ? card.activeText : cx("text-[#4A0A0A]", card.hoverText)
                          )}
                          strokeWidth={2}
                        />
                      </div>

                      {/* Bottom Row: Title & Desc */}
                      <div className="relative z-10">
                        <h3
                          className={cx(
                            "font-black uppercase leading-none tracking-tight transition-colors duration-300",
                            "text-xl md:text-4xl lg:text-5xl",
                            isActive ? card.activeText : cx("text-[#4A0A0A]", card.hoverText)
                          )}
                        >
                          {card.label}
                        </h3>
                        <p
                          className={cx(
                            "mt-1.5 flex items-center gap-2 text-[9px] font-bold uppercase tracking-wider transition-colors duration-300 md:mt-2 md:text-xs",
                            isActive ? cx(card.activeText, "opacity-70") : cx("text-[#4A0A0A]/70", card.hoverText)
                          )}
                        >
                          {card.desc}
                          <ArrowUpRight size={12} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 md:size-14" />
                        </p>
                      </div>
                    </NavLink>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom Footer (Shrink-0 so it doesn't compress) */}
            <div className="flex shrink-0 flex-col items-center justify-between gap-4 border-t border-[#4A0A0A]/5 pt-4 md:flex-row md:pt-6">
              <div className="flex items-center gap-4 md:gap-6">
                <div className="flex items-center gap-2 text-[10px] font-medium text-[#4A0A0A]/60 md:text-xs">
                  <Clock size={14} strokeWidth={2.5} style={{ color: ALERT_COLOR }} />
                  <span className="uppercase tracking-widest">{HOURS}</span>
                </div>
                <a href={`tel:+${PHONE}`} className="hidden text-xs font-bold uppercase tracking-widest text-[#4A0A0A]/60 hover:text-[#4A0A0A] md:block">
                  {DISPLAY_PHONE}
                </a>
              </div>

              <div className="flex items-center gap-2 md:gap-3">
                <Link
                  to="/cart"
                  className="flex items-center gap-2 rounded-full bg-[#4A0A0A]/5 px-4 py-2 text-[10px] font-black uppercase tracking-wide transition-colors hover:bg-[#4A0A0A]/10"
                >
                  <ShoppingCart size={12} strokeWidth={2.5} /> Cart ({totalItems})
                </Link>
                <Link
                  to="/register"
                  className="flex items-center gap-2 rounded-full px-4 py-2 text-[10px] font-black uppercase tracking-wide transition-transform hover:scale-105"
                  style={{ backgroundColor: BRAND_COLOR, color: DARK_COLOR }}
                >
                  <UserCircle size={12} strokeWidth={2.5} /> Account
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}