import React, { useState, useEffect, useCallback } from "react";
import { Link, NavLink } from "react-router-dom";
import green from "../../assets/ChatGPT Image Jul 12, 2026, 04_17_26 PM.png";
import { useCart } from "../cart/CartContext";
import {
  Menu, X, Home, UserCircle, Store, Info, Phone,
  ShoppingBasket, Heart, Clock
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

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const closeMenu = useCallback(() => setOpen(false), []);

  return (
    <>
      <header className="sticky top-0 z-50 transition-all duration-300">
        <div
          className={`transition-all duration-300 ${scrolled
            ? "bg-white/95 backdrop-blur-lg shadow-md shadow-[#E5E7EB]/50 py-1"
            : "bg-white/0 py-3"
            }`}
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between h-16 sm:h-20">

              {/* Logo */}
              <Link to="/" className="flex items-center gap-2 group shrink-0" aria-label={`${BRAND_NAME} home`}>
                <img src={green} alt={BRAND_NAME} className="w-auto h-34 sm:h-14 md:h-44 object-contain" />
              </Link>

              {/* Desktop Nav Pill */}
              <nav className="hidden lg:flex items-center gap-1.5" aria-label="Primary Nav">
                {NAV_LINKS.map(({ icon, label, to }) => (
                  <NavLink
                    key={to}
                    to={to}
                    className={({ isActive }) =>
                      `flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${isActive
                        ? "text-[#0edb0e] bg-[#0edb0e]/10"
                        : "text-[#01060e]/70 hover:text-[#01060e] hover:bg-[#F8FAFC]"
                      }`
                    }
                  >
                    {icon}
                    {label}
                  </NavLink>
                ))}
              </nav>

              {/* Desktop Actions */}
              <div className="hidden lg:flex items-center gap-4">

                {/* Cart Button */}
                <Link
                  to="/cart"
                  className="relative w-11 h-11 rounded-xl bg-[#F8FAFC] hover:bg-[#E5E7EB] flex items-center justify-center transition-colors"
                  aria-label="View cart"
                >
                  <ShoppingBasket size={18} className="text-[#01060e]" aria-hidden="true" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-red-600 border-2 border-yellow-400 text-white text-[10px] font-bold flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </Link>

                {/* Telephone Action Link */}
                <a
                  href={`tel:+${WHATSAPP_NUMBER}`}
                  className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#01060e] transition-all duration-200 hover:scale-[1.02]"
                >
                  <Phone className="text-[#0edb0e]" size={16} aria-hidden="true" />
                  {PHONE_DISPLAY}
                </a>

                {/* Profile Icon link */}
                <Link
                  to="/profile"
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-[#01060e]/60 hover:text-[#01060e] hover:bg-[#F8FAFC] transition-colors"
                  aria-label="View profile"
                >
                  <UserCircle size={24} aria-hidden="true" />
                </Link>
              </div>

              {/* Mobile Trigger Hub */}
              <div className="flex lg:hidden items-center gap-2">
                <Link
                  to="/cart"
                  className="relative w-11 h-11 rounded-xl bg-[#F8FAFC] flex items-center justify-center"
                  aria-label="View cart"
                >
                  <ShoppingBasket size={18} className="text-[#01060e]" aria-hidden="true" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </Link>

                <button
                  onClick={() => setOpen((v) => !v)}
                  className="w-11 h-11 rounded-xl bg-[#F8FAFC] flex items-center justify-center hover:bg-[#E5E7EB] transition-all duration-200"
                  aria-label={open ? "Close menu" : "Open menu"}
                  aria-expanded={open}
                >
                  {open
                    ? <X size={18} className="text-[#01060e]" aria-hidden="true" />
                    : <Menu size={22} className="text-[#01060e]" aria-hidden="true" />
                  }
                </button>
              </div>

            </div>
          </div>
        </div>
      </header>

      {/* Glassmorphic overlay background */}
      <div
        className={`fixed inset-0 z-40 bg-[#01060e]/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Unique Mobile Bottom-Sheet Bento Drawer */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 flex flex-col bg-white rounded-t-[2.5rem] shadow-2xl transition-all duration-500 ease-out lg:hidden max-h-[85vh] ${open ? "translate-y-0" : "translate-y-full"
          }`}
        aria-hidden={!open}
      >
        {/* Pull-down indicator bar representing mobile-native sheet styling */}
        <div className="w-12 h-1.5 bg-[#E5E7EB] rounded-full mx-auto mt-4 mb-2 shrink-0" onClick={closeMenu} />

        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 pb-4 pt-2">
          <div>
            <h2 className="text-xl font-black text-[#01060e] tracking-tight">Navigation</h2>
            <p className="text-[#01060e]/50 text-[11px] mt-0.5">Where would you like to go today?</p>
          </div>
          <button
            onClick={closeMenu}
            className="w-9 h-9 rounded-full bg-[#F8FAFC] flex items-center justify-center text-[#01060e] hover:bg-[#E5E7EB] transition-colors"
            aria-label="Close menu"
          >
            <X size={16} aria-hidden="true" />
          </button>
        </div>

        {/* Bento Grid Layout Navigation Links */}
        <nav className="flex-1 px-6 py-2 overflow-y-auto" aria-label="Mobile Navigation">
          <div className="grid grid-cols-2 gap-3.5">
            {NAV_LINKS.map(({ label, to, icon, desc }) => (
              <NavLink
                key={to}
                to={to}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `flex flex-col items-start p-4 rounded-2xl border transition-all duration-200 text-left relative overflow-hidden group ${isActive
                    ? "border-[#0edb0e]/30 bg-[#0edb0e]/5 text-[#0edb0e]"
                    : "border-[#E5E7EB]/60 bg-[#F8FAFC] text-[#01060e]/75 active:bg-[#E5E7EB]/40"
                  }`
                }
              >
                {/* Decorative corner accent block */}
                <span className="absolute top-0 right-0 w-8 h-8 rounded-bl-2xl bg-yellow-400/10 group-hover:bg-yellow-400/20 transition-all duration-200" />

                <span className="p-2.5 rounded-xl bg-white shadow-sm text-[#0edb0e] mb-4 inline-block shrink-0">
                  {icon}
                </span>

                <span className="font-extrabold text-sm tracking-tight block">
                  {label}
                </span>

                <span className="text-[10px] text-[#01060e]/40 mt-1 line-clamp-1">
                  {desc}
                </span>
              </NavLink>
            ))}
          </div>

          {/* Quick-reach delivery state block */}
          <div className="mt-5 p-4 rounded-2xl bg-yellow-400/10 border border-yellow-400/20 flex items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-white text-yellow-600 shrink-0">
              <Clock size={16} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-yellow-700">Service Hours</p>
              <p className="text-xs font-black text-[#01060e]">Open Daily · 10 AM – 10 PM</p>
            </div>
          </div>
        </nav>

        {/* Tactile Bottom Actions Strip */}
        <div className="p-6 bg-[#F8FAFC] border-t border-[#E5E7EB]/60 flex flex-col sm:flex-row gap-3">
          <Link
            to="/favorites"
            onClick={closeMenu}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#01060e] text-white font-extrabold text-xs uppercase tracking-wider hover:opacity-90 active:scale-[0.98] transition-all duration-150"
          >
            <Heart size={14} className="text-[#0edb0e] fill-[#0edb0e] animate-pulse" aria-hidden="true" />
            Favorites List
          </Link>

          <a
            href={`tel:+${WHATSAPP_NUMBER}`}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl border border-[#0edb0e] text-[#0edb0e] font-extrabold text-xs uppercase tracking-wider bg-white hover:bg-[#0edb0e]/5 active:scale-[0.98] transition-all duration-150"
          >
            <Phone size={14} aria-hidden="true" />
            Call Now
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;