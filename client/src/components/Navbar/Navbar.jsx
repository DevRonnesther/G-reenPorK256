import React, { useState, useEffect, memo } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../cart/CartContext";
import {
  X,
  Home,
  Store,
  Info,
  Phone,
  Clock,
  ShoppingCart,
  UserCircle,
  ArrowUpRight,
} from "lucide-react";
import GreenPorkIcon from "../../assets/favicon.png";

// ==========================================
// DESIGN TOKENS & CONFIGURATION
// ==========================================
const CONFIG = {
  BRAND: "Green Pork",
  PRIMARY_LIME: "#D9FF00", // Hero Accent Lime
  ACCENT_RED: "#D90404",   // Controlled accent for badges/urgency
  DEEP_DARK: "#2E0101",    // Deep brand dark for contrast & structures
  PHONE: "256776464823",
  DISPLAY_PHONE: "+256 776 464 823",
  HOURS: "10:00 AM – 10:00 PM",
};

// Solid White Background for Modal
const MODAL_BG = {
  bg: "#FFFFFF",
  text: "#2E0101",
  textSoft: "rgba(46, 1, 1, 0.75)",
  textFaint: "rgba(46, 1, 1, 0.5)",
  cardBg: "rgba(46, 1, 1, 0.03)",
};

const NAV_LINKS = [
  { label: "Home", to: "/", desc: "Main landing page", icon: Home },
  { label: "Menu", to: "/Products", desc: "Our signature roasted pork & fast food", icon: Store },
  { label: "About", to: "/aboutUs", desc: "The Green Pork story", icon: Info },
  { label: "Contact", to: "/contactUs", desc: "Get in touch with us", icon: Phone },
];

const butterySpring = { type: "spring", stiffness: 220, damping: 26, mass: 1 };

const FontFace = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@500;700;900&family=Inter:wght@400;500;600&display=swap');
    .font-display { font-family: 'Archivo', sans-serif; letter-spacing: -0.04em; }
    .font-body { font-family: 'Inter', sans-serif; }
  `}</style>
);

// ==========================================
// SUB-COMPONENTS
// ==========================================
const BrandLogo = memo(({ isScrolled = false }) => (
  <Link to="/" className="flex items-center gap-3 select-none group focus:outline-none">
    <img
      src={GreenPorkIcon}
      alt="GreenPork Logo"
      className="h-9 w-9 md:h-10 md:w-10 object-contain transition-transform duration-500 group-hover:scale-105"
    />
    <div className="flex flex-col leading-none">
      <div className="flex items-baseline gap-1">
        <span className={`font-display text-lg md:text-xl font-black tracking-tight transition-colors duration-300 ${isScrolled ? "text-white" : "text-white"}`}>
          Green
        </span>
        <span className="font-display text-lg md:text-xl font-black tracking-tight" style={{ color: CONFIG.PRIMARY_LIME }}>
          Pork
        </span>
      </div>
      <span className={`text-[8px] md:text-[9px] tracking-[0.1em] font-bold mt-.5 transition-colors duration-300 ${isScrolled ? "text-white/60" : "text-white/60"}`}>
        One Bite. Instant Mood.
      </span>
    </div>
  </Link>
));

BrandLogo.displayName = "BrandLogo";

const ActionButton = ({ to, onClick, label, children }) => {
  // No borders, pure glass blur
  const baseStyle = `h-10 w-10 md:h-11 md:w-11 flex items-center justify-center backdrop-blur-xl transition-all duration-300 relative group focus:outline-none bg-white/5 hover:bg-white/10 text-white`;
  const buttonStyle = { clipPath: "polygon(0 0, 100% 0, 90% 100%, 0% 100%)" };

  if (to) {
    return (
      <Link to={to} className={baseStyle} style={buttonStyle} aria-label={label}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className={baseStyle} style={buttonStyle} aria-label={label}>
      {children}
    </button>
  );
};

// ==========================================
// MAIN NAVBAR COMPONENT
// ==========================================
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { totalItems = 0 } = useCart() || {};
  const location = useLocation();

  const whiteBgRoutes = ["/Products", "/cart", "/account", "/aboutUs", "/contactUs", "/Cart"];
  const isLightRoute = whiteBgRoutes.includes(location.pathname);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const showSolidNav = isScrolled || isLightRoute;

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      }
    }
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <FontFace />

      {/* Header Bar */}
      <header
        className={`fixed top-0 inset-x-0 z-50 px-4 md:px-12 transition-all duration-500 font-body pointer-events-none ${showSolidNav
          ? "py-3 md:py-4 bg-[#2E0101]/80 backdrop-blur-2xl shadow-xl shadow-black/20"
          : "py-4 md:py-6 bg-transparent"
          }`}
      >
        <div className="max-w-8xl mx-auto flex items-center justify-between pointer-events-auto">
          <BrandLogo isScrolled={showSolidNav} />

          {/* Desktop Center Navigation Links */}
          <nav
            className="hidden lg:flex/// items-center gap-8 backdrop-blur-xl px-6 py-2.5 transition-colors duration-300 shadow-lg bg-white/5"
            style={{ clipPath: "polygon(0 0, 100% 0, 95% 100%, 5% 100%)" }}
          >
            {NAV_LINKS.map(({ label, to }) => {
              const isActive = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  className={`font-display text-xs uppercase tracking-wider font-extrabold transition-colors duration-200 ${isActive ? "text-[#D9FF00]" : "text-white hover:text-[#D9FF00]"
                    }`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2.5 md:gap-3">
            <Link
              to="/Products"
              className="hidden sm:inline-flex items-center justify-center px-4 py-2.5 font-display text-xs font-black uppercase tracking-wider shadow-lg transition-transform hover:scale-105 active:scale-95"
              style={{ backgroundColor: CONFIG.PRIMARY_LIME, color: CONFIG.DEEP_DARK, clipPath: "polygon(0 0, 100% 0, 92% 100%, 0% 100%)" }}
            >
              Order Now
            </Link>

            <ActionButton to="/cart" label="Cart">
              <ShoppingCart size={18} className="md:w-5 md:h-5 transition-transform group-hover:scale-110 text-white" />
              {totalItems > 0 && (
                <span
                  className="absolute -top-1 -right-1 h-4 w-4 md:h-5 md:w-5 font-display bg-[#D90404] text-[9px] md:text-[10px] font-black flex items-center justify-center shadow-md text-white"
                  style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
                >
                  {totalItems}
                </span>
              )}
            </ActionButton>

            <ActionButton to="/register" label="Account">
              <UserCircle size={18} className="md:w-5 md:h-5 transition-transform group-hover:scale-110 text-white" />
            </ActionButton>

            <button
              type="button"
              onClick={toggleMenu}
              className="h-10 w-10 md:h-11 md:w-11 flex flex-col items-center justify-center backdrop-blur-xl transition-all duration-300 focus:outline-none group bg-white/5 hover:bg-white/10"
              style={{ clipPath: "polygon(0 0, 100% 0, 90% 100%, 0% 100%)" }}
              aria-expanded={isOpen}
              aria-label="Toggle Navigation"
            >
              {isOpen ? (
                <X size={18} className="md:w-5 md:h-5 group-hover:rotate-90 transition-transform duration-300 text-white" />
              ) : (
                <div className="flex flex-col space-y-1.5 items-center">
                  <div className="w-4 md:w-5 h-[2px] bg-white" />
                  <div className="w-2.5 md:w-3 h-[2px]" style={{ backgroundColor: CONFIG.PRIMARY_LIME }} />
                </div>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Immersive Navigation Modal (White Background, Sharp Edges, No Borders) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 flex flex-col font-body select-none overflow-y-auto lg:overflow-hidden shadow-none"
            style={{ backgroundColor: MODAL_BG.bg, color: MODAL_BG.text }}
          >
            {/* Background Glow Effects - Subtle dark/lime glow on white */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45rem] lg:w-[80rem] h-[45rem] lg:h-[80rem] pointer-events-none blur-[140px]" style={{ background: `radial-gradient(circle, rgba(217, 4, 4, 0.08) 0%, rgba(0,0,0,0) 70%)` }} />

            {/* Massive Ghost Typography - Dark on white */}
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.04, scale: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-1/4 left-1/2 -translate-x-1/2 pointer-events-none font-display font-black text-[30vw] lg:text-[24rem] text-[#2E0101] tracking-tighter select-none whitespace-nowrap z-0"
            >
              MENU
            </motion.span>

            {/* Modal Header Bar */}
            <div className="max-w-7xl w-full mx-auto px-4 md:px-12 py-4 md:py-6 flex items-center justify-between relative z-10 shrink-0">
              <Link to="/" className="flex items-center gap-3 select-none group focus:outline-none" onClick={closeModal}>
                <img
                  src={GreenPorkIcon}
                  alt="GreenPork Logo"
                  className="h-9 w-9 md:h-10 md:w-10 object-contain transition-transform duration-500 group-hover:scale-105"
                />
                <div className="flex flex-col leading-none">
                  <div className="flex items-baseline gap-1">
                    <span className="font-display text-lg md:text-xl font-black tracking-tight text-[#2E0101]">
                      Green
                    </span>
                    <span className="font-display text-lg md:text-xl font-black tracking-tight text-[#2E0101]">
                      Pork
                    </span>
                  </div>
                  <span className="text-[8px] md:text-[9px] tracking-[0.1em] font-bold mt-.5 text-[#2E0101]/60">
                    One Bite. Instant Mood.
                  </span>
                </div>
              </Link>

              <motion.button
                type="button"
                onClick={closeModal}
                whileHover={{ scale: 1.05, rotate: 90 }}
                whileTap={{ scale: 0.95 }}
                transition={butterySpring}
                className="h-10 w-10 md:h-11 md:w-11 flex items-center justify-center bg-[#2E0101]/5 hover:bg-[#2E0101]/10 text-[#2E0101] transition-all duration-300 shadow-sm"
                style={{ clipPath: "polygon(0 0, 100% 0, 90% 100%, 0% 100%)" }}
                aria-label="Close menu"
              >
                <X size={18} className="md:w-5 md:h-5 text-[#2E0101]" />
              </motion.button>
            </div>

            {/* Modal Content Grid Container */}
            <div className="max-w-7xl w-full mx-auto px-4 md:px-12 py-4 md:py-8 my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center flex-1 relative z-10">

              {/* Left Brand Panel */}
              <div className="lg:col-span-5 space-y-6 md:space-y-8">
                <div className="space-y-3 md:space-y-4">
                  <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95] text-[#2E0101]">
                    ONE BITE. <br />
                    <span
                      className="px-3 py-1 inline-block mt-1 md:mt-2 shadow-sm"
                      style={{
                        backgroundColor: CONFIG.DEEP_DARK,
                        color: CONFIG.PRIMARY_LIME,
                        clipPath: "polygon(0 0, 100% 0, 96% 100%, 0% 100%)",
                      }}
                    >
                      instant MOOD.
                    </span>
                  </h1>
                  <p className="text-xs sm:text-sm md:text-base leading-relaxed max-w-md font-medium" style={{ color: MODAL_BG.textSoft }}>
                    Uganda's boldest roasted pork and fast-food brand, crafted for sharing, feasting, and instant good vibes.
                  </p>
                </div>

                {/* Floating Glass UI Card - Subtle dark tint on white */}
                <div className="p-4 md:p-5 bg-[#2E0101]/[0.03] backdrop-blur-md flex items-center gap-4 max-w-sm shadow-sm">
                  <div className="h-10 w-10 md:h-12 md:w-12 flex items-center justify-center bg-[#2E0101] text-[#D9FF00] flex-shrink-0" style={{ clipPath: "polygon(0 0, 100% 0, 90% 100%, 0% 100%)" }}>
                    <Clock size={20} className="md:w-[22px] md:h-[22px]" />
                  </div>
                  <div>
                    <span className="text-[9px] md:text-[10px] uppercase tracking-wider font-bold block" style={{ color: MODAL_BG.textFaint }}>Open Hours</span>
                    <span className="font-display font-bold text-xs md:text-sm mt-0.5 block text-[#2E0101]">{CONFIG.HOURS}</span>
                  </div>
                </div>

                <div>
                  <motion.a
                    href={`tel:+${CONFIG.PHONE}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={butterySpring}
                    className="group relative inline-flex items-center gap-3 px-5 py-3.5 md:px-6 md:py-4 font-display text-xs uppercase tracking-widest overflow-hidden shadow-xl"
                    style={{
                      backgroundColor: CONFIG.DEEP_DARK,
                      color: CONFIG.PRIMARY_LIME,
                      clipPath: "polygon(0 0, 100% 0, 95% 100%, 0% 100%)",
                    }}
                  >
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none" />
                    <Phone size={15} className="md:w-4 md:h-4 relative z-10" />
                    <span className="relative z-10 font-black">{CONFIG.DISPLAY_PHONE}</span>
                  </motion.a>
                </div>
              </div>

              {/* Right Navigation Links Grid */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 pb-6 lg:pb-0">
                {NAV_LINKS.map(({ label, to, desc, icon: Icon }) => {
                  const isActive = location.pathname === to;
                  return (
                    <motion.div key={to} whileHover={{ scale: 1.02, y: -2 }} transition={butterySpring}>
                      <NavLink
                        to={to}
                        onClick={closeModal}
                        style={{
                          backgroundColor: isActive ? CONFIG.DEEP_DARK : MODAL_BG.cardBg,
                          color: isActive ? "#FFFFFF" : MODAL_BG.text,
                          clipPath: "polygon(0 0, 100% 0, 95% 100%, 0% 100%)",
                        }}
                        className={`group relative flex flex-col justify-between p-5 md:p-7 transition-all duration-300 min-h-[140px] sm:min-h-[185px] backdrop-blur-md ${isActive ? "shadow-2xl shadow-black/20" : "hover:bg-[#2E0101]/[0.06]"
                          }`}
                      >
                        <div className="flex items-start justify-between w-full">
                          <Icon
                            size={26}
                            className={`md:w-8 md:h-8 transition-transform duration-300 group-hover:scale-110 ${isActive ? "text-[#D9FF00]" : "text-[#2E0101]"
                              }`}
                          />
                          <div
                            className="h-8 w-8 md:h-9 md:w-9 flex items-center justify-center transition-all shadow-sm"
                            style={{
                              backgroundColor: isActive ? "rgba(212,255,0,0.15)" : "rgba(46,1,1,0.06)",
                              color: isActive ? CONFIG.PRIMARY_LIME : CONFIG.DEEP_DARK,
                              clipPath: "polygon(0 0, 100% 0, 85% 100%, 0% 100%)",
                            }}
                          >
                            <ArrowUpRight size={15} className="md:w-4 md:h-4" />
                          </div>
                        </div>

                        <div className="mt-4 sm:mt-8">
                          <span className="font-display text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight block">
                            {label}
                          </span>
                          <span
                            className={`text-[11px] sm:text-xs font-medium block mt-1 line-clamp-1 ${isActive ? "text-white/80" : "text-[#2E0101]/60"
                              }`}
                          >
                            {desc}
                          </span>
                        </div>
                      </NavLink>
                    </motion.div>
                  );
                })}
              </div>

            </div>

            {/* Modal Footer */}
            <div className="max-w-7xl w-full mx-auto px-4 md:px-12 py-4 md:py-6 text-center text-xs font-medium relative z-10 shrink-0" style={{ color: MODAL_BG.textFaint }}>
              © {new Date().getFullYear()} {CONFIG.BRAND}. All rights reserved.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}