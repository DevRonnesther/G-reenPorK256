import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { ImWhatsapp } from "react-icons/im";
import green from "../../assets/file_0000000082847246b4bc227a74036a02.jpg";
// import green from "../../assets/GreenBrandLogo.png";
import {
  Menu, X, Home, Store, Info, Phone,
  ShoppingCart, Flame,
} from "lucide-react";

const NAV_LINKS = [
  { icon: <Home size={15} />, label: "Home", to: "/" },
  { icon: <Store size={15} />, label: "Menu", to: "/menu" },
  { icon: <Info size={15} />, label: "About", to: "/aboutUs" },
  { icon: <Phone size={15} />, label: "Contact", to: "/contactUs" },
];

const CART_COUNT = 2; // wire to real cart state when ready

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50">
        <div
          className={`transition-all duration-500 ${scrolled ? "bg-black/30 backdrop-blur-2xl shadow-lg shadow-black/20" : "bg-transparent"
            }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between h-16 sm:h-20">

              {/* ── Logo ── */}
              <Link to="/" className="flex items-center gap-2 group shrink-0">
                <div>
                  <img src={green} alt="" className="w-80 hidden" srcset="" />
                </div>
                <div className="w-8 h-8 rounded-xl hidden// bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-md shadow-red-900/40 group-hover:scale-105 transition-transform duration-200">
                  <Flame size={16} className="text-white" />
                </div>
                <span className="text-white hidden// font-black text-xl tracking-tight leading-none">
                  GREEN<span className="text-orange-400">Bites</span>
                </span>
              </Link>

              {/* ── Desktop nav pill ── */}
              <nav className="hidden lg:flex items-center gap-1 bg-white/10 border border-white/15 backdrop-blur-xl px-2 py-1.5 rounded-full">
                {NAV_LINKS.map(({ icon, label, to }) => (
                  <NavLink
                    key={to}
                    to={to}
                    className={({ isActive }) =>
                      `flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide transition-all duration-200 ${isActive
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-white/80 hover:text-white hover:bg-white/10"
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
                {/* Cart */}
                <Link
                  to="/cart"
                  className="relative w-10 h-10 rounded-xl bg-white/10 border border-white/15 hover:bg-white/20 flex items-center justify-center transition-all duration-200"
                  aria-label="Cart"
                >
                  <ShoppingCart size={18} className="text-white" />
                  {CART_COUNT > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-black flex items-center justify-center leading-none">
                      {CART_COUNT}
                    </span>
                  )}
                </Link>

                {/* WhatsApp order CTA */}
                <a
                  href="https://wa.me/+256776464823"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-xs font-black uppercase tracking-wide px-4 py-2.5 rounded-full transition-all duration-200 shadow-lg shadow-green-900/30 hover:scale-[1.02]"
                >
                  <ImWhatsapp size={15} />
                  Order Now
                </a>
              </div>

              {/* ── Mobile: cart + hamburger ── */}
              <div className="flex lg:hidden items-center gap-2">
                <Link
                  to="/cart"
                  className="relative w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center"
                  aria-label="Cart"
                >
                  <ShoppingCart size={18} className="text-white" />
                  {CART_COUNT > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-black flex items-center justify-center leading-none">
                      {CART_COUNT}
                    </span>
                  )}
                </Link>

                <button
                  onClick={() => setOpen((v) => !v)}
                  className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center hover:bg-white/20 transition-all duration-200"
                  aria-label={open ? "Close menu" : "Open menu"}
                >
                  {open
                    ? <X size={20} className="text-white" />
                    : <Menu size={20} className="text-white" />
                  }
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile full-screen overlay ─────────────────────────────────────────── */}
      <div
        className={`fixed inset-0 z-40 lg:hidden flex flex-col transition-all duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        style={{
          background: "linear-gradient(160deg, #1a0000 0%, #3d0000 45%, #7c1010 80%, #c0392b 100%)",
        }}
      >
        {/* Top bar inside overlay */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
              <Flame size={15} className="text-white" />
            </div>
            <span className="text-white font-black text-lg">
              GREEN<span className="text-orange-400">Bites</span>
            </span>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all"
            aria-label="Close menu"
          >
            <X size={20} className="text-white" />
          </button>
        </div>

        {/* Nav links — large and tap-friendly */}
        <nav className="flex-1 flex flex-col justify-center px-6 gap-2">
          {NAV_LINKS.map(({ icon, label, to }, i) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              style={{ animationDelay: `${i * 60}ms` }}
              className={({ isActive }) =>
                `flex items-center gap-4 px-5 py-4 rounded-2xl text-base font-black uppercase tracking-wide transition-all duration-200 ${isActive
                  ? "bg-white text-gray-900"
                  : "text-white/80 hover:text-white hover:bg-white/10"
                }`
              }
            >
              <span className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                // tint icon bg on active is handled by parent, static version:
                "bg-white/10"
                }`}>
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
            href="tel:0776464823"
            className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-white/10 border border-white/15 text-white font-bold text-sm hover:bg-white/20 transition-all duration-200"
          >
            <Phone size={16} className="text-white/60" />
            (0) 77-6464-823
          </a>

          {/* WhatsApp CTA */}
          <a
            href="https://wa.me/+256776464823"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-green-500 hover:bg-green-600 text-white font-black text-base shadow-xl shadow-green-900/40 transition-all duration-200 hover:scale-[1.01]"
          >
            <ImWhatsapp size={20} />
            Order via WhatsApp
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;