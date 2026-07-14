import React, { useState, useEffect, useCallback } from "react";
import { Link, NavLink } from "react-router-dom";
import green from "../../assets/ChatGPT Image Jul 12, 2026, 04_17_26 PM.png";
import { useCart } from "../cart/CartContext";
import {
  Menu, X, Home, UserCircle, Store, Info, Phone,
  ShoppingBasket, Heart,
  Hamburger,
} from "lucide-react";

// ─── CONFIGURATION ───────────────────────────────────────────────────────────
const WHATSAPP_NUMBER = "256776464823";
const PHONE_DISPLAY = "+256 776 464 823";
const BRAND_NAME = "GreenPork";

const NAV_LINKS = [
  { icon: <Home size={15} aria-hidden="true" />, label: "Home", to: "/" },
  { icon: <Store size={15} aria-hidden="true" />, label: "Menu", to: "/Products" },
  { icon: <Info size={15} aria-hidden="true" />, label: "About", to: "/aboutUs" },
  { icon: <Phone size={15} aria-hidden="true" />, label: "Contact", to: "/contactUs" },
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

              {/* Desktop Nav Pill — Modern Text Indicator (No borders) */}
              <nav className="hidden lg:flex items-center gap-1.5" aria-label="Primary Nav">
                {NAV_LINKS.map(({ icon, label, to }) => (
                  <NavLink
                    key={to}
                    to={to}
                    className={({ isActive }) =>
                      `flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${isActive
                        ? "text-[##F97316] bg-[##F97316]/10"
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
                    <span className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-orange-500 border-2 md:border-yellow-400 text-white text-[10px] font-bold flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </Link>

                {/* Telephone Action Link */}
                <a
                  href={`tel:+${WHATSAPP_NUMBER}`}
                  className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#01060e] transition-all duration-200 hover:scale-[1.02]"
                >
                  <Phone className="text-orange-500" size={16} aria-hidden="true" />
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

              {/* Mobile Trigger Hub (Zero Border Frames) */}
              <div className="flex lg:hidden items-center gap-2">
                <Link
                  to="/cart"
                  className="relative w-11 h-11 rounded-xl bg-[#F8FAFC] flex items-center justify-center"
                  aria-label="View cart"
                >
                  <ShoppingBasket size={18} className="text-[#01060e]" aria-hidden="true" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-[#F97316] text-white text-[10px] font-bold flex items-center justify-center">
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
                    : <Hamburger size={24} className="text-[#01060e]" aria-hidden="true" />
                  }
                </button>
              </div>

            </div>
          </div>
        </div>
      </header>

      {/* Mobile full-screen overlay */}
      <div
        className={`fixed inset-0 z-50 flex flex-col bg-white backdrop-blur-md transition-all duration-300 ease-in-out ${open
          ? "translate-x-0 opacity-100 pointer-events-auto"
          : "translate-x-full opacity-0 pointer-events-none"
          }`}
        aria-hidden={!open}
      >
        {/* Mobile Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-5 sm:px-8 sm:pt-8">
          <div>
            <h2 className="text-2xl font-black text-[#01060e] tracking-tight">Menu</h2>
            <p className="text-[#01060e]/50 text-xs mt-0.5">Explore {BRAND_NAME}</p>
          </div>

          <button
            onClick={closeMenu}
            className="w-11 h-11 rounded-xl bg-[#F8FAFC] flex items-center justify-center text-[#01060e] hover:text-[#01060e]/70 hover:bg-[#E5E7EB] transition-colors focus:outline-none focus:ring-2 focus:ring-[#E5E7EB]"
            aria-label="Close menu"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        {/* Mobile Link Track */}
        <nav className="flex-1 px-6 sm:px-8 pt-4 space-y-1.5 overflow-y-auto" aria-label="Mobile Navigation">
          {NAV_LINKS.map(({ label, to, icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={closeMenu}
              className={({ isActive }) =>
                `flex items-center gap-4 py-3 px-4 rounded-xl text-xl font-extrabold tracking-tight transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0edb0e]/30 ${isActive
                  ? "text-[##F97316] bg-[##F97316]/10"
                  : "text-[#01060e]/75 hover:text-[#01060e] hover:bg-[#F8FAFC]"
                }`
              }
            >
              <span className="shrink-0 text-[#01060e]/40" aria-hidden="true">
                {icon}
              </span>
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Mobile Footer Actions */}
        <div className="px-6 sm:px-8 pb-10 pt-4 bg-[#F8FAFC]/50 border-t border-[#E5E7EB]/50">
          <Link
            to="/favorites"
            onClick={closeMenu}
            className="flex items-center justify-center gap-2.5 py-3.5 w-full rounded-xl bg-[#01060e] text-white font-bold text-sm hover:opacity-90 active:scale-[0.98] transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#01060e]"
          >
            <Heart size={16} className="text-[#F97316] fill-[#F97316]" aria-hidden="true" />
            Favorites List
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;