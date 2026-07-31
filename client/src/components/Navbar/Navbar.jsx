import React, { useState, useEffect, useCallback } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../cart/CartContext";
import {
  Menu, X, Home, UserCircle, Store, Info, Phone,
  ShoppingBasket, Clock, Heart, ArrowRight, ShoppingCart
} from "lucide-react";
import GreenPorkIcon from "../../assets/greenpork-icon.png";

const BRAND_GREEN = "#D4FF00"; // Match Hero CTA color
const BRAND_NAME = "GreenPork";
const WHATSAPP_NUMBER = "256776464823";
const PHONE_DISPLAY = "+256 776 464 823";

const NAV_LINKS = [
  { icon: Home, label: "Home", to: "/" },
  { icon: Store, label: "Menu", to: "/Products" },
  { icon: Info, label: "About", to: "/aboutUs" },
  { icon: Phone, label: "Contact", to: "/contactUs" },
];

// Re-added the missing cx utility
const cx = (...c) => c.filter(Boolean).join(" ");

const FontFace = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@500;700;900&family=Inter:wght@400;500;600&display=swap');
    .font-display { font-family: 'Archivo', sans-serif; letter-spacing: -0.04em; }
    .font-ui { font-family: 'Inter', sans-serif; }
  `}</style>
);

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { totalItems } = useCart() || { totalItems: 0 };
  const location = useLocation();

  useEffect(() => { setOpen(false); }, [location.pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const closeMenu = useCallback(() => setOpen(false), []);

  return (
    <>
      <FontFace />

      {/* ── Brutalist Transparent Header ── */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full px-6 md:px-10 py-5 pointer-events-none select-none font-ui">
        <div className="max-w-[1500px] mx-auto flex items-center justify-between pointer-events-auto">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group relative" aria-label={`${BRAND_NAME} homepage`}>
            <span className="absolute inset-0 rounded-full blur-md opacity-40 group-hover:opacity-80 transition-opacity pointer-events-none" style={{ backgroundColor: BRAND_GREEN }} />
            <span className="font-display  flex items-center gap-1 text-xl font-black tracking-tight text-white drop-shadow-lg">
              Green
              <img src={GreenPorkIcon} alt="" width={36} height={36} className="relative h-9 w-9 object-contain pointer-events-none transition-transform duration-500 group-hover:rotate-6" draggable={false} />
              <span style={{ color: BRAND_GREEN }}>Pork</span>
            </span>
          </Link>

          {/* ── Desktop Nav Links ── */}
          <nav className="hidden lg:flex items-center gap-1 border border-white/20 backdrop-blur-md bg-black/30 p-1" aria-label="Primary Navigation">
            {NAV_LINKS.map(({ icon: Icon, label, to }) => (
              <NavLink key={to} to={to} className="relative flex items-center gap-2 px-4 py-2 text-xs font-display font-bold uppercase tracking-wider transition-all focus:outline-none">
                {({ isActive }) => (
                  <>
                    <span className={cx("relative z-10 flex items-center gap-2 transition-colors", isActive ? "text-black" : "text-white/80 hover:text-white")}>
                      <Icon size={14} /> {label}
                    </span>
                    {isActive && (
                      <motion.span layoutId="activeNavTab" transition={{ type: "spring", stiffness: 380, damping: 30 }} className="absolute inset-0 bg-white" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* ── Desktop Action Buttons ── */}
          <div className="hidden lg:flex items-center gap-4">
            <Link to="/cart" className="relative h-10 w-10 flex items-center justify-center bg-black/30 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-black transition-colors" aria-label="View Cart">
              <ShoppingCart size={18} />
              {totalItems > 0 && <span className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-[10px] font-black bg-[#D4FF00] text-black rounded-full">{totalItems}</span>}
            </Link>

            <button type="button" className="h-10 w-10 flex items-center justify-center bg-black/30 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-black transition-colors" aria-label="User Profile">
              <UserCircle size={18} />
            </button>

            <motion.a
              href={`tel:+${WHATSAPP_NUMBER}`}
              whileHover={{ scale: 1.02, backgroundColor: "#E4FF4D" }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 text-xs font-display font-black uppercase tracking-wide text-black px-5 py-3 shadow-xl"
              style={{ backgroundColor: BRAND_GREEN, clipPath: "polygon(0 0, 100% 0, 96% 100%, 0% 100%)" }}
            >
              <Phone size={15} strokeWidth={2.5} />
              <span>{PHONE_DISPLAY}</span>
            </motion.a>
          </div>

          {/* ── Mobile Controls ── */}
          <div className="flex lg:hidden items-center gap-3">
            <Link to="/cart" className="relative h-10 w-10 flex items-center justify-center bg-black/30 backdrop-blur-md border border-white/20 text-white" aria-label="View Cart">
              <ShoppingBasket size={18} />
              {totalItems > 0 && <span className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-[10px] font-black bg-[#D4FF00] text-black rounded-full">{totalItems}</span>}
            </Link>

            <button
              onClick={() => setOpen((prev) => !prev)}
              className="h-10 w-10 flex items-center justify-center bg-black/30 backdrop-blur-md border border-white/20 text-white focus:outline-none"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span key={open ? "close" : "open"} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  {open ? <X size={22} /> : <Menu size={22} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Dark Drawer ── */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeMenu} className="fixed inset-0 z-40 bg-black/80 backdrop-blur-md lg:hidden" />

            <motion.div
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed bottom-0 left-0 right-0 z-50 flex flex-col bg-[#0A0A0A] text-white lg:hidden max-h-[85vh] select-none overflow-hidden border-t border-white/10"
              role="dialog" aria-label="Navigation Menu"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-6 pb-4 pt-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <img src={GreenPorkIcon} alt="" className="h-8 w-8 object-contain" />
                  <h2 className="font-display text-xl font-black tracking-tight">Green<span style={{ color: BRAND_GREEN }}>Pork</span></h2>
                </div>
                <button onClick={closeMenu} className="w-9 h-9 flex items-center justify-center bg-white/10 text-white hover:bg-white/20 transition-colors">
                  <X size={18} />
                </button>
              </div>

              {/* Drawer Links */}
              <nav className="flex-1 px-6 py-6 overflow-y-auto space-y-2">
                {NAV_LINKS.map(({ label, to, icon: Icon }) => (
                  <NavLink key={to} to={to} onClick={closeMenu} className={({ isActive }) => cx("flex items-center gap-4 p-4 border-l-2 font-display font-bold text-lg uppercase tracking-tight transition-all", isActive ? "border-[#D4FF00] text-white bg-white/5" : "border-transparent text-white/50 hover:text-white")}>
                    <Icon size={18} /> {label}
                  </NavLink>
                ))}

                <div className="p-4 border-l-2 border-white/10 flex items-center gap-4 mt-6">
                  <Clock size={18} className="text-[#D4FF00]" />
                  <div>
                    <p className="text-[10px] font-ui font-bold uppercase tracking-widest text-white/40">Service Hours</p>
                    <p className="text-sm font-display font-bold text-white">10:00 AM – 10:00 PM</p>
                  </div>
                </div>
              </nav>

              {/* Drawer Footer Actions */}
              <div className="p-6 bg-black border-t border-white/10 flex gap-3">
                <Link to="/cart" onClick={closeMenu} className="flex-1 flex items-center justify-center gap-2 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-display font-bold text-xs uppercase tracking-wide transition-colors">
                  <Heart size={14} className="text-white/50" /> Saved
                </Link>

                <motion.a
                  href={`tel:+${WHATSAPP_NUMBER}`} whileTap={{ scale: 0.98 }}
                  className="flex-1 flex items-center justify-center gap-2 py-4 font-display font-black text-xs uppercase tracking-wide text-black shadow-xl"
                  style={{ backgroundColor: BRAND_GREEN, clipPath: "polygon(0 0, 100% 0, 96% 100%, 0% 100%)" }}
                >
                  <Phone size={14} strokeWidth={2.5} /> Call Now
                </motion.a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}