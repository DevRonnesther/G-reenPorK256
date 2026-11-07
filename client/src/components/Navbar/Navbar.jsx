import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../cart/CartContext";
import {
  X, Home, Store, Info, Phone, Clock,
  ShoppingCart, UserCircle, ArrowRight, Sparkles
} from "lucide-react";
import GreenPorkIcon from "../../assets/Greenore.png";

const BRAND = "Green Pork";
const PHONE = "256776464823";
const DISPLAY_PHONE = "+256 776 464 823";
const HOURS = "10:00 AM – 10:00 PM";

// Aligned Brand Identity Palette
const BRAND_COLOR = "#D9FF00"; // Electric Lime
const DARK_COLOR = "#2E0101";  // Dark Brand Maroon/Black
const ALERT_COLOR = "#E11D1D"; // Warm Red
const WORD_RED = "#FFC2B3";    // Muted Red Tint

const WHITE_BG_ROUTES = ["/Products", "/cart", "/account", "/aboutUs", "/contactUs", "/Cart", "/returnPolicy"];

const NAV_LINKS = [
  { label: "Home", to: "/", desc: "Start Here", icon: Home, tag: "01" },
  { label: "Menu", to: "/Products", desc: "Order Food & Cuts", icon: Store, tag: "02" },
  { label: "About Us", to: "/aboutUs", desc: "Our Craft & Story", icon: Info, tag: "03" },
  { label: "Contact", to: "/contactUs", desc: "Say Hello", icon: Phone, tag: "04" },
];

const cx = (...classes) => classes.filter(Boolean).join(" ");
const spring = { type: "spring", stiffness: 220, damping: 26 };
const ease = [0.16, 1, 0.3, 1];

function Logo({ isDark, onClick }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      aria-label="GreenPork home"
      className="group flex shrink-0 select-none items-center gap-2"
    >
      <img
        src={GreenPorkIcon}
        alt="GreenPork"
        className="block h-9 w-auto max-w-[120px] object-contain transition-transform duration-300 group-hover:scale-105 sm:h-10 sm:max-w-[140px] md:h-11 md:max-w-[180px] lg:h-12 lg:max-w-[260px]"
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
  const useDarkText = isScrolled || isWhiteBgRoute;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setIsOpen(false), [location.pathname]);

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
      ? "bg-[#2E0101]/5 text-[#2E0101] hover:bg-[#2E0101]/10"
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
          isScrolled ? "py-3 bg-white/80 backdrop-blur-md" : "py-5 bg-transparent"
        )}
      >
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-4 md:px-12">
          <Logo isDark={useDarkText} />

          {/* Center pill links (Desktop Navigation) */}
          <nav
            className="hidden items-center gap-1 rounded-full p-1 lg:flex"
            aria-label="Main"
            style={{
              backgroundColor: useDarkText ? "rgba(46, 1, 1, 0.04)" : "rgba(255, 255, 255, 0.1)",
              backdropFilter: useDarkText ? "none" : "blur(12px)"
            }}
          >
            {NAV_LINKS.map(({ label, to }) => {
              const isActive = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  className="rounded-full px-5 py-2 text-xs font-bold transition-colors duration-300"
                  style={{
                    backgroundColor: isActive ? "#FFFFFF" : "transparent",
                    color: isActive ? (useDarkText ? "#000" : "#2E0101") : (useDarkText ? "rgba(46,1,1,0.7)" : "rgba(255,255,255,0.9)")
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
              className="hidden items-center justify-center rounded-full px-5 py-2.5 text-xs font-extrabold uppercase tracking-wide transition-transform hover:scale-105 active:scale-95 sm:inline-flex"
              style={{ backgroundColor: BRAND_COLOR, color: DARK_COLOR }}
            >
              Order now
            </Link>

            <Link to="/cart" className={cx(circleBtn, "group")} aria-label="Cart">
              <ShoppingCart size={18} className="transition-transform group-hover:-rotate-12" />
              {totalItems > 0 && (
                <span
                  className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-black text-white transition-transform group-hover:scale-110"
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
                  <div className={cx("h-[2px] w-4 rounded-full", useDarkText ? "bg-[#2E0101]" : "bg-white")} />
                  <div className="h-[2px] w-2.5 rounded-full" style={{ backgroundColor: BRAND_COLOR }} />
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE SPLIT-SCREEN MAGAZINE OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.7, ease }}
            className="fixed inset-0 z-[60] flex h-[100dvh] flex-col bg-white font-display text-[#2E0101] overflow-y-auto"
          >
            {/* Top Bar inside Overlay */}
            <div className="flex shrink-0 items-center justify-between px-6 pt-6">
              <Logo isDark={true} onClick={() => setIsOpen(false)} />
              <motion.button
                type="button"
                onClick={() => setIsOpen(false)}
                whileHover={{ scale: 1.08, rotate: 90 }}
                whileTap={{ scale: 0.92 }}
                transition={spring}
                className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-[#2E0101]/5 transition-colors hover:bg-[#2E0101]/10"
                aria-label="Close menu"
              >
                <X size={20} />
              </motion.button>
            </div>

            {/* Split Content Body */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 px-6 py-6 lg:py-12 gap-8 items-center max-w-[1500px] mx-auto w-full">

              {/* Left Column: Brand Statement & Context */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#2E0101]/5 px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-[#2E0101] mb-4">
                    <Sparkles size={13} style={{ color: ALERT_COLOR }} /> Navigation Hub
                  </span>
                  <h2 className="text-3xl md:text-6xl font-black uppercase tracking-[-0.04em] leading-[0.9]">
                    Crave <br />
                    <span style={{ color: ALERT_COLOR }}>The Difference</span>
                  </h2>
                  <p className="mt-3 text-xs md:text-base font-semibold text-[#2E0101]/70 max-w-sm leading-relaxed">
                    Explore our artisanal wood-smoked menu, learn our farm-to-table philosophy, or get in touch instantly.
                  </p>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-[#2E0101]/60">
                    <Clock size={16} style={{ color: ALERT_COLOR }} /> {HOURS}
                  </div>
                  <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-[#2E0101]/60">
                    <Phone size={16} style={{ color: ALERT_COLOR }} /> <a href={`tel:+${PHONE}`}>{DISPLAY_PHONE}</a>
                  </div>
                </div>
              </div>

              {/* Right Column: Staggered Magazine Nav Links */}
              <div className="lg:col-span-7 flex flex-col gap-3">
                {NAV_LINKS.map((item, i) => {
                  const isActive = location.pathname === item.to;
                  return (
                    <motion.div
                      key={item.to}
                      initial={{ opacity: 0, x: 40, filter: "blur(6px)" }}
                      animate={{ opacity: 1, x: 0, filter: "blur(0px)", transition: { delay: 0.2 + (i * 0.1), ease } }}
                    >
                      <NavLink
                        to={item.to}
                        onClick={() => setIsOpen(false)}
                        className={cx(
                          "group relative flex items-center justify-between rounded-[2rem] p-5 md:p-8 transition-all duration-300 hover:scale-[1.01]",
                          isActive ? "bg-[#2E0101] text-white" : "bg-[#2E0101]/[0.02] hover:bg-[#2E0101]/[0.05]"
                        )}
                      >
                        <div className="flex items-center gap-5">
                          <span className={cx("text-xs font-bold uppercase tracking-widest opacity-40", isActive ? "text-[#D9FF00]" : "")}>
                            {item.tag}
                          </span>
                          <div>
                            <h3 className="text-xl md:text-4xl font-black uppercase tracking-tight leading-none group-hover:translate-x-2 transition-transform duration-300">
                              {item.label}
                            </h3>
                            <p className={cx("mt-1 text-[10px] md:text-xs font-bold uppercase tracking-wider opacity-60", isActive ? "text-white/70" : "text-[#2E0101]/60")}>
                              {item.desc}
                            </p>
                          </div>
                        </div>

                        <div className={cx(
                          "flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1",
                          isActive ? "bg-[#D9FF00] text-[#2E0101]" : "bg-white text-[#2E0101]"
                        )}>
                          <ArrowRight size={18} strokeWidth={2.5} />
                        </div>
                      </NavLink>
                    </motion.div>
                  );
                })}
              </div>

            </div>

            {/* Bottom Footer bar in Overlay */}
            <div className="shrink-0 border-t border-[#2E0101]/5 px-6 py-4 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] font-bold uppercase tracking-widest text-[#2E0101]/60">
              <p>© {new Date().getFullYear()} {BRAND}. All rights reserved.</p>
              <div className="flex items-center gap-4">
                <Link to="/cart" onClick={() => setIsOpen(false)} className="hover:text-[#2E0101]">
                  Cart ({totalItems})
                </Link>
                <Link to="/register" onClick={() => setIsOpen(false)} className="hover:text-[#2E0101]">
                  Account
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}