import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { ImWhatsapp } from "react-icons/im";
import green from "../../assets/GreenBrandLogo.png";

import {
  Menu,
  X,
  Home,
  Store,
  Info,
  Phone,
  ShoppingCart,
  User,
  PiggyBank,
} from "lucide-react";

const HeaderLinks = [
  {
    Icon: <Home className="w-4 h-4" />,
    Display: "HOME",
    Link: "/",
  },
  {
    Icon: <Store className="w-4 h-4" />,
    Display: "PRODUCT",
    Link: "/menu",
  },
  {
    Icon: <Info className="w-4 h-4" />,
    Display: "WHO WE ARE",
    Link: "/aboutUs",
  },
  {
    Icon: <Phone className="w-4 h-4" />,
    Display: "CONTACT",
    Link: "/contactUs",
  },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${isScrolled
          ? "bg-none backdrop-blur-2xl shadow-2xl"
          : "bg-none backdrop-blur-xl"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* NAVBAR */}
        <div className="flex items-center justify-between h-[85px]">

          {/* LOGO */}
          <Link
            to="/"
            className="flex items-center group shrink-0"
          >
            <img
              src={green}
              alt="Green Pork"
              className="w-32 sm:w-40 md:w-60 object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden lg:flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-2 rounded-full backdrop-blur-xl">

            {HeaderLinks.map((item, index) => (
              <NavLink
                key={index}
                to={item.Link}
                className={({ isActive }) =>
                  `relative flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${isActive
                    ? "bg-[#0edb0e] text-white shadow-lg"
                    : "text-white hover:bg-white/10 hover:text-[#FACC15]"
                  }`
                }
              >
                {item.Icon}
                {item.Display}
              </NavLink>
            ))}
          </nav>

          {/* DESKTOP ACTIONS */}
          <div className="hidden lg:flex items-center gap-5">

            {/* CART */}
            <Link
              to="/cart"
              className="relative p-2 rounded-full bg-white/5 hover:bg-white/10 transition"
            >
              <ShoppingCart className="w-6 h-6 text-white" />

              <span className="absolute -top-1 -right-1 bg-[#0edb0e] text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border border-black">
                2
              </span>
            </Link>

            {/* LOGIN */}
            <Link
              to="/login"
              className="flex items-center gap-2 text-white hover:text-[#0edb0e] transition font-medium"
            >
              <User className="w-5 h-5" />
              LOGIN
            </Link>

            {/* WHATSAPP */}
            <div className="flex flex-col leading-tight">
              <a
                href="https://wa.me/+256776464823"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#FACC15] text-sm font-semibold hover:text-[#0edb0e] transition"
              >
                <ImWhatsapp className="w-5 h-5" />
                Call & Order
              </a>

              <a
                href="tel:0776464823"
                className="text-white font-bold text-lg hover:text-[#0edb0e] transition"
              >
                (0)77-6464-823
              </a>
            </div>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden flex items-center justify-center w-11 h-11 rounded-xl bg-white/10 border border-white/10 backdrop-blur-xl transition hover:bg-white/20"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>

        {/* MOBILE MENU */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ${isMobileMenuOpen
              ? "max-h-[700px] opacity-100 pb-6"
              : "max-h-0 opacity-0"
            }`}
        >
          <div className="mt-2 rounded-3xl bg-black/90 backdrop-blur-2xl border border-white/10 p-4 shadow-2xl">

            {/* MOBILE LINKS */}
            <nav className="flex flex-col gap-2">

              {HeaderLinks.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.Link}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-4 rounded-2xl text-sm font-semibold transition-all duration-300 ${isActive
                      ? "bg-[#0edb0e] text-white"
                      : "text-white hover:bg-white/10"
                    }`
                  }
                >
                  {item.Icon}
                  {item.Display}
                </NavLink>
              ))}

              {/* CART */}
              <Link
                to="/cart"
                className="flex items-center gap-3 px-4 py-4 rounded-2xl text-white hover:bg-white/10 transition"
              >
                <ShoppingCart className="w-5 h-5" />
                Cart
              </Link>

              {/* LOGIN */}
              <Link
                to="/login"
                className="flex items-center gap-3 px-4 py-4 rounded-2xl text-white hover:bg-white/10 transition"
              >
                <User className="w-5 h-5" />
                Login
              </Link>

              {/* CTA */}
              <a
                href="https://wa.me/+256776464823"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 bg-[#0edb0e] hover:bg-green-600 transition-all duration-300 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 shadow-xl"
              >
                <ImWhatsapp className="w-5 h-5" />
                Order via WhatsApp
              </a>

              {/* PHONE */}
              <a
                href="tel:0776464823"
                className="text-center text-[#FACC15] font-semibold pt-3"
              >
                Call: (0)77-6464-823
              </a>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;