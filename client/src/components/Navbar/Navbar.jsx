import React, { useState, useEffect, useCallback } from "react";
import { Link, NavLink } from "react-router-dom";
import green from "../../assets/ChatGPT Image Jul 12, 2026, 04_17_26 PM.png";
import { useCart } from "../cart/CartContext";
import {
  Menu, X, Home, UserCircle,Hamburger, Store, Info, Phone,
  
  ShoppingBasket, Heart,
} from "lucide-react";
import { AlignJustify } from "lucide-react";

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
          className={`transition-all duration-300 ${
            scrolled 
              ? "bg-white/85 backdrop-blur-lg shadow-md shadow-stone-100/40 py-1" 
              : "bg-white/0 py-3"
          }`}
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between h-16 sm:h-20">

              {/* Logo (Seamless margin block adjustment) */}
              <Link to="/" className="flex items-center gap-2 group shrink-0" aria-label={`${BRAND_NAME} home`}>
                <img src={green} alt={BRAND_NAME} className="w-auto h-38 md:h-40" />
              </Link>

              {/* Desktop Nav Pill — Modern Text Indicator (No borders) */}
              <nav className="hidden lg:flex items-center gap-1.5" aria-label="Primary Nav">
                {NAV_LINKS.map(({ icon, label, to }) => (
                  <NavLink
                    key={to}
                    to={to}
                    className={({ isActive }) =>
                      `flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${isActive
                        ? "text-red-600 bg-red-50/50"
                        : "text-stone-600 hover:text-stone-900 hover:bg-stone-50"
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
                  className="relative w-11 h-11 rounded-xl bg-stone-50 hover:bg-stone-100 flex items-center justify-center transition-colors"
                  aria-label="View cart"
                >
                  <ShoppingBasket size={18} className="text-stone-900" aria-hidden="true" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </Link>

                {/* Telephone Action Link */}
                <a
                  href={`tel:+${WHATSAPP_NUMBER}`}
                  className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-stone-900 transition-all duration-200 hover:scale-[1.02]"
                >
                  <Phone className="text-red-600" size={16} aria-hidden="true" />
                  {PHONE_DISPLAY}
                </a>

                {/* Profile Icon link */}
                <Link
                  to="/profile"
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-stone-500 hover:text-stone-900 hover:bg-stone-50 transition-colors"
                  aria-label="View profile"
                >
                  <UserCircle size={24} aria-hidden="true" />
                </Link>
              </div>

              {/* Mobile Trigger Hub (Zero Border Frames) */}
              <div className="flex lg:hidden items-center gap-2">
                <Link
                  to="/cart"
                  className="relative w-11 h-11 rounded-xl bg-stone-50 flex items-center justify-center"
                  aria-label="View cart"
                >
                  <ShoppingBasket size={18} className="text-stone-900" aria-hidden="true" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </Link>

                <button
                  onClick={() => setOpen((v) => !v)}
                  className="w-11 h-11 rounded-xl bg-stone-50 flex items-center justify-center hover:bg-stone-100 transition-all duration-200"
                  aria-label={open ? "Close menu" : "Open menu"}
                  aria-expanded={open}
                >
                  {open
                    ? <X size={18} className="text-stone-900" aria-hidden="true" />
                    : <Hamburger size={24} className="text-stone-900" aria-hidden="true" />
                  }
                </button>
              </div>

            </div>
          </div>
        </div>
      </header>

      {/* Mobile full-screen overlay */}
      <div
        className={`fixed inset-0 z-50 flex flex-col bg-white/95 backdrop-blur-md transition-all duration-300 ease-in-out ${open
            ? "translate-x-0 opacity-100 pointer-events-auto"
            : "translate-x-full opacity-0 pointer-events-none"
          }`}
        aria-hidden={!open}
      >
        {/* Mobile Header (No border dividers) */}
        <div className="flex items-center justify-between px-6 pt-6 pb-5 sm:px-8 sm:pt-8">
          <div>
            <h2 className="text-2xl font-black text-stone-900 tracking-tight">Menu</h2>
            <p className="text-stone-400 text-xs mt-0.5">Explore {BRAND_NAME}</p>
          </div>

          {/* Close Button (Fixed: Removed "hidden" utility) */}
          <button
            onClick={closeMenu}
            className="w-11 h-11 rounded-xl bg-stone-50 flex items-center justify-center text-stone-900 hover:text-stone-500 hover:bg-stone-100 transition-colors focus:outline-none focus:ring-2 focus:ring-stone-200"
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
                `flex items-center gap-4 py-3 px-4 rounded-xl text-xl font-extrabold tracking-tight transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-100 ${isActive
                  ? "text-red-600 bg-red-50/50"
                  : "text-stone-600 hover:text-stone-900 hover:bg-stone-50"
                }`
              }
            >
              <span className="shrink-0 text-stone-400" aria-hidden="true">
                {icon}
              </span>
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Mobile Footer Actions */}
        <div className="px-6 sm:px-8 pb-10 pt-4 bg-stone-50/30 border-t border-stone-100/50">
          <Link
            to="/favorites"
            onClick={closeMenu}
            className="flex items-center justify-center gap-2.5 py-3.5 w-full rounded-xl bg-stone-900 text-white font-bold text-sm hover:bg-stone-850 active:scale-[0.98] transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-900"
          >
            <Heart size={16} aria-hidden="true" />
            Favorites List
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;