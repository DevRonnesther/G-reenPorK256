import React, { useState, useEffect, useCallback } from "react";
import { Link, NavLink } from "react-router-dom";
import green from "../../assets/GreenBrandLogo.png";
import { useCart } from "../cart/CartContext"; // adjust path to match your folder structure
import {
  Menu, X, Home, UserCircle, Store, Info, Phone,
  ShoppingCart, Heart,
} from "lucide-react";

const WHATSAPP_NUMBER = "256776464823";
const PHONE_DISPLAY = "+256 776 464 823";
const BRAND_NAME = "EverGrill";

const NAV_LINKS = [
  { icon: <Home size={15} aria-hidden="true" />, label: "Home", to: "/" },
  { icon: <Store size={15} aria-hidden="true" />, label: "Menu", to: "/Products" },
  { icon: <Info size={15} aria-hidden="true" />, label: "About", to: "/aboutUs" },
  { icon: <Phone size={15} aria-hidden="true" />, label: "Contact", to: "/contactUs" },
];

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
      <header className="sticky top-0 bg-white/0 z-50">
        <div
          className={`bg-transparent transition-shadow duration-300 ${scrolled ? "shadow-[0_2px_20px_rgba(0,0,0,0.06)]" : ""
            }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between h-16 sm:h-20">

              {/* Logo */}
              <Link to="/" className="flex items-center gap-2 group shrink-0" aria-label={`${BRAND_NAME} home`}>
                <img src={green} alt={BRAND_NAME} className="w-auto h-48" />
              </Link>

              {/* Desktop nav pill */}
              <nav className="hidden lg:flex items-center gap-1 px-2 py-1.5 rounded-full" aria-label="Primary">
                {NAV_LINKS.map(({ icon, label, to }) => (
                  <NavLink
                    key={to}
                    to={to}
                    className={({ isActive }) =>
                      `flex items-center gap-1.5 px-4 py-2 rounded-none text-xs font-bold uppercase tracking-wide transition-all duration-200 ${isActive
                        ? "border-orange-500 border-b-2 text-orange-500"
                        : "text-stone-900 hover:bg-stone-100"
                      }`
                    }
                  >
                    {icon}
                    {label}
                  </NavLink>
                ))}
              </nav>

              {/* Desktop right actions */}
              <div className="hidden lg:flex items-center gap-3">
                <Link
                  to="/cartitems"
                  className="relative w-10 h-10 rounded-xl bg-white/80 backdrop-blur-xl border border-white/80 hover:bg-stone-100 flex items-center justify-center transition-all duration-200"
                  aria-label="View cart"
                >
                  <ShoppingCart size={18} className="text-stone-900" aria-hidden="true" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 h-4.5 min-w-[1.125rem] px-1 rounded-full bg-orange-600 text-white text-[10px] font-bold flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </Link>

                {/* FIXED: Added missing opening tag here */}
                <a
                  href={`tel:+${WHATSAPP_NUMBER}`}
                  className="flex items-center gap-2 text-xs font-black uppercase tracking-wide px-4 py-3 text-stone-900 transition-all duration-200 hover:scale-[1.02]"
                >
                  <Phone className="text-orange-500 fill-orange-500" size={18} aria-hidden="true" />
                  {PHONE_DISPLAY}
                </a>

                <Link
                  to="/profile"
                  className="relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200"
                  aria-label="View profile"
                >
                  <UserCircle size={26} aria-hidden="true" />
                </Link>
              </div>

              {/* Mobile: cart + hamburger */}
              <div className="flex lg:hidden items-center gap-2">
                <Link
                  to="/cart"
                  className="relative w-10 h-10 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-center"
                  aria-label="View cart"
                >
                  <ShoppingCart size={18} className="text-stone-900" aria-hidden="true" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 h-4.5 min-w-[1.125rem] px-1 rounded-full bg-orange-600 text-white text-[10px] font-bold flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </Link>

                <button
                  onClick={() => setOpen((v) => !v)}
                  className="w-10 h-10 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-center hover:bg-stone-100 transition-all duration-200"
                  aria-label={open ? "Close menu" : "Open menu"}
                  aria-expanded={open}
                >
                  {open
                    ? <X size={20} className="text-stone-900" aria-hidden="true" />
                    : <Menu size={20} className="text-stone-900" aria-hidden="true" />
                  }
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile full-screen overlay */}
      <div
        className={`fixed inset-0 z-40 flex flex-col bg-white transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        aria-hidden={!open}
      >
        <div className="flex items-start justify-between px-6 pt-7 pb-5 border-b border-stone-100">
          <div>
            <h2 className="text-2xl font-black text-stone-900">Menu</h2>
            <p className="text-stone-400 text-sm mt-0.5">Explore {BRAND_NAME}</p>
          </div>
          <button
            onClick={closeMenu}
            className="w-9 h-9 flex items-center justify-center text-stone-900 hover:text-stone-500 transition-colors"
            aria-label="Close menu"
          >
            <X size={24} aria-hidden="true" />
          </button>
        </div>

        <nav className="flex-1 px-6 pt-2" aria-label="Mobile">
          {NAV_LINKS.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              onClick={closeMenu}
              className={({ isActive }) =>
                `block py-4 border-b border-stone-100 text-lg transition-colors duration-200 ${isActive ? "font-black text-stone-900" : "font-medium text-stone-500 hover:text-stone-900"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="px-6 pb-10 pt-2 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Link
              to="/favorites"
              onClick={closeMenu}
              className="flex items-center justify-center gap-2 py-3.5 rounded-full border border-stone-200 text-stone-900 font-bold text-sm hover:bg-stone-50 transition-colors duration-200"
            >
              <Heart size={16} aria-hidden="true" />
              Favorites
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
