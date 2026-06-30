import React, { useState, useEffect, useCallback } from "react";
import { Link, NavLink } from "react-router-dom";
import { ImWhatsapp } from "react-icons/im";
import green from "../../assets/Evergrill.png";
import {
  Menu, X, Home, Store, Info, Phone,
  ShoppingCart, Flame,
} from "lucide-react";

// ─── Config — kept in sync with Hero.jsx / About.jsx / Contact.jsx ───────────
const WHATSAPP_NUMBER = "256776464823";
const PHONE_DISPLAY = "+256 776 464 823";
const BRAND_NAME = "EverGrill";

const NAV_LINKS = [
  { icon: <Home size={15} aria-hidden="true" />, label: "Home", to: "/" },
  { icon: <Store size={15} aria-hidden="true" />, label: "Menu", to: "/menu" },
  { icon: <Info size={15} aria-hidden="true" />, label: "About", to: "/aboutUs" },
  { icon: <Phone size={15} aria-hidden="true" />, label: "Contact", to: "/contactUs" },
];

// Matches the brand gradient used in About.jsx / Contact.jsx hero panels.
const BRAND_GRADIENT = "linear-gradient(145deg, #1c1917 0%, #7c2d12 35%, #c2410c 70%, #f59e0b 100%)";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on resize to desktop, and lock body scroll while open.
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
      <header className="sticky top-0 z-50">
        <div
          className={`transition-all duration-500 ${
            scrolled ? "bg-stone-900/80 backdrop-blur-2xl shadow-lg shadow-black/20" : "bg-transparent"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between h-16 sm:h-20">

              {/* ── Logo ── */}
              <Link to="/" className="flex items-center gap-2 group shrink-0" aria-label={`${BRAND_NAME} home`}>
                <img src={green} alt={BRAND_NAME} className="h-10 sm:h-12 w-auto" />
              </Link>

              {/* ── Desktop nav pill ── */}
              <nav className="hidden lg:flex items-center gap-1 px-2 py-1.5 rounded-full" aria-label="Primary">
                {NAV_LINKS.map(({ icon, label, to }) => (
                  <NavLink
                    key={to}
                    to={to}
                    className={({ isActive }) =>
                      `flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide transition-all duration-200 ${
                        isActive
                          ? "bg-orange-500 text-white shadow-sm"
                          : scrolled
                          ? "text-white/80 hover:text-white hover:bg-white/10"
                          : "text-stone-900 hover:text-stone-900 hover:bg-stone-900/5"
                      }`
                    }
                  >
                    {icon}
                    {label}
                  </NavLink>
                ))}
              </nav>

              {/* ── Desktop right actions ── */}
              <div className="hidden lg:flex items-center gap-3">
                {/* Phone CTA */}
                <a
                  href={`tel:+${WHATSAPP_NUMBER}`}
                  className={`flex items-center gap-2 text-xs font-black uppercase tracking-wide px-4 py-2.5 rounded-full transition-all duration-200 hover:scale-[1.02] ${
                    scrolled ? "text-white" : "text-stone-900"
                  }`}
                >
                  <Phone className="text-orange-500" size={18} aria-hidden="true" />
                  {PHONE_DISPLAY}
                </a>

                {/* Cart */}
                <Link
                  to="/cart"
                  className="relative w-10 h-10 rounded-xl bg-white/10 border border-white/15 hover:bg-white/20 flex items-center justify-center transition-all duration-200"
                  aria-label="View cart"
                >
                  <ShoppingCart size={18} className={scrolled ? "text-white" : "text-stone-900"} aria-hidden="true" />
                </Link>
              </div>

              {/* ── Mobile: cart + hamburger ── */}
              <div className="flex lg:hidden items-center gap-2">
                <Link
                  to="/cart"
                  className="relative w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center"
                  aria-label="View cart"
                >
                  <ShoppingCart size={18} className={scrolled || open ? "text-white" : "text-stone-900"} aria-hidden="true" />
                </Link>

                <button
                  onClick={() => setOpen((v) => !v)}
                  className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center hover:bg-white/20 transition-all duration-200"
                  aria-label={open ? "Close menu" : "Open menu"}
                  aria-expanded={open}
                >
                  {open
                    ? <X size={20} className="text-white" aria-hidden="true" />
                    : <Menu size={20} className={scrolled ? "text-white" : "text-stone-900"} aria-hidden="true" />
                  }
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile full-screen overlay ─────────────────────────────────────────── */}
      <div
        style={{ background: BRAND_GRADIENT }}
        className={`fixed md:w-[420px] md:border-l border-white/10 inset-0 z-40 flex flex-col transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        {/* Top bar inside overlay */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-orange-600 flex items-center justify-center">
              <Flame size={15} className="text-white" aria-hidden="true" />
            </div>
            <span className="text-white font-black text-lg">
              EVER<span className="text-yellow-400">GRILL</span>
            </span>
          </div>
          <button
            onClick={closeMenu}
            className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all"
            aria-label="Close menu"
          >
            <X size={20} className="text-white" aria-hidden="true" />
          </button>
        </div>

        {/* Nav links — large and tap-friendly */}
        <nav className="flex-1 flex flex-col justify-center px-6 gap-2" aria-label="Mobile">
          {NAV_LINKS.map(({ icon, label, to }) => (
            <NavLink
              key={to}
              to={to}
              onClick={closeMenu}
              className={({ isActive }) =>
                `flex items-center gap-4 px-5 py-4 rounded-2xl text-base font-black uppercase tracking-wide transition-all duration-200 ${
                  isActive
                    ? "bg-white text-stone-900"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`
              }
            >
              <span className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-white/10">
                {icon}
              </span>
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Bottom action area */}
        <div className="px-6 pb-10 space-y-3">
          {/* Phone number */}
          <a
            href={`tel:+${WHATSAPP_NUMBER}`}
            className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-white/10 border border-white/15 text-white font-bold text-sm hover:bg-white/20 transition-all duration-200"
          >
            <Phone size={16} className="text-white/60" aria-hidden="true" />
            {PHONE_DISPLAY}
          </a>

          {/* WhatsApp CTA */}
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
            className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-green-500 hover:bg-green-600 text-white font-black text-base shadow-md shadow-green-600/30 transition-all duration-200 hover:scale-[1.01]"
          >
            <ImWhatsapp size={22} aria-hidden="true" />
            Order via WhatsApp
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;