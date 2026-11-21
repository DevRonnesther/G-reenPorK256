import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useCart } from "../cart/CartContext";
import {
  X,
  Phone,
  Clock,
  ShoppingCart,
  UserCircle,
  ArrowRight,
  MapPin,
} from "lucide-react";
import GreenPorkIcon from "../../assets/Greenore.png";

/* ───────────── CONFIG + DESIGN TOKENS ───────────── */
const BRAND = "Greenpork";
const SLOGAN = "Eat Fresh. Live Happy";
const PHONE = "256776464823";
const DISPLAY_PHONE = "+256 776 464 823";
const HOURS = "10:00 AM – 10:00 PM";

const PALETTE = {
  red: "#E11D1D",
  lime: "#D9FF00",
  ink: "#111111",
  charcoal: "#2A2A2A",
  muted: "#4A4A4A",
  surface: "#F5F5F5",
  surfaceHover: "#EFEFEF",
  white: "#FFFFFF",
};

const NAV_LINKS = [
  { label: "Home", to: "/home", desc: "Start Here", tag: "01" },
  {
    label: "Menu",
    to: "/Products",
    desc: "Pork, Burgers, Pizza & Chicken",
    tag: "02",
  },
  { label: "About Us", to: "/aboutUs", desc: "Our Craft & Story", tag: "03" },
  { label: "Contact", to: "/contactUs", desc: "Say Hello", tag: "04" },
];

const cx = (...classes) => classes.filter(Boolean).join(" ");
const spring = { type: "spring", stiffness: 240, damping: 24 };
const ease = [0.16, 1, 0.3, 1];
const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111]";

function Logo({ onClick }) {
  return (
    <Link
      to="/home"
      onClick={onClick}
      aria-label={`${BRAND} home`}
      className={cx(
        "group flex shrink-0 select-none items-center gap-2.5 rounded-full border-0",
        focusRing
      )}
    >
      <img
        src={GreenPorkIcon}
        alt={BRAND}
        className="block h-9 w-auto max-w-[120px] object-contain transition-transform duration-300 group-hover:scale-105 sm:h-10 sm:max-w-[140px] md:h-11 md:max-w-[180px]"
      />
    </Link>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { totalItems = 0 } = useCart() || {};
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();
  const year = new Date().getFullYear();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const circleBtn = cx(
    "relative flex h-10 w-10 md:h-11 md:w-11 cursor-pointer items-center justify-center rounded-full border-0 bg-[#FFFFFF] text-[#111111] transition-transform duration-200 hover:scale-105 active:scale-95",
    focusRing
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap');
        .font-display { font-family: 'Archivo', sans-serif; }
        .font-body { font-family: 'Inter', sans-serif; }
      `}</style>

      {/* SPLIT EDITORIAL HEADER BAR */}
      <header
        className={cx(
          "fixed inset-x-0 top-0 z-50 border-0 font-display transition-all duration-300",
          isScrolled ? "bg-[#FFFFFF]/90 py-3 backdrop-blur-md" : "bg-transparent py-5"
        )}
      >
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-4 md:px-12">
          {/* Left: Brand & Hub */}
          <Logo />

          {/* Center: Desktop Quick-Nav Rail */}
          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-1 rounded-full border-0 bg-[#F5F5F5] p-1.5 md:flex//"
          >
            {NAV_LINKS.map((item) => {
              const isActive =
                location.pathname.toLowerCase() === item.to.toLowerCase();
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={cx(
                    "rounded-full border-0 px-4 py-2 text-[11px] font-black uppercase tracking-wider transition-colors duration-200",
                    focusRing,
                    isActive
                      ? "bg-[#111111] text-[#D9FF00]"
                      : "text-[#111111] hover:bg-[#EFEFEF]"
                  )}
                >
                  {item.label}
                </NavLink>
              );
            })}
          </nav>

          {/* Right: Order CTA, Cart, Account & Menu Drawer */}
          <div className="flex items-center gap-2 md:gap-3">
            <Link
              to="/Products"
              className={cx(
                "hidden items-center justify-center rounded-full border-0 px-5 py-2.5 text-xs font-black uppercase tracking-wider transition-transform duration-200 hover:scale-105 active:scale-95 sm:inline-flex",
                focusRing
              )}
              style={{ backgroundColor: PALETTE.lime, color: PALETTE.ink }}
            >
              Order now
            </Link>

            <Link
              to="/cart"
              className={cx(circleBtn, "group")}
              aria-label="Cart"
            >
              <ShoppingCart
                size={18}
                className="transition-transform duration-200 group-hover:-rotate-12"
              />
              {totalItems > 0 && (
                <span
                  className="font-display absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full border-0 text-[10px] font-black tabular-nums text-[#FFFFFF] transition-transform duration-200 group-hover:scale-110"
                  style={{ backgroundColor: PALETTE.red }}
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
              onClick={() => setIsOpen((prev) => !prev)}
              className={cx(
                circleBtn,
                "flex flex-col items-center justify-center gap-[3px]"
              )}
              aria-expanded={isOpen}
              aria-label="Toggle navigation"
            >
              {isOpen ? (
                <X size={18} />
              ) : (
                <>
                  <div className="h-[2px] w-4 rounded-full bg-[#111111]" />
                  <div
                    className="h-[2px] w-2.5 rounded-full"
                    style={{ backgroundColor: PALETTE.red }}
                  />
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* FULL-SCREEN EDITORIAL OVERLAY MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={
              shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: "-100%" }
            }
            animate={
              shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }
            }
            exit={
              shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: "-100%" }
            }
            transition={{ duration: 0.65, ease }}
            className="fixed inset-0 z-[60] flex h-[100dvh] w-full flex-col justify-between overflow-hidden border-0 bg-[#FFFFFF] font-display text-[#111111]"
          >
            {/* Top Bar */}
            <div className="mx-auto flex w-full max-w-[1500px] shrink-0 items-center justify-between px-6 pt-5 md:px-12">
              <Logo onClick={() => setIsOpen(false)} />
              <motion.button
                type="button"
                onClick={() => setIsOpen(false)}
                whileHover={
                  shouldReduceMotion ? {} : { scale: 1.08, rotate: 90 }
                }
                whileTap={shouldReduceMotion ? {} : { scale: 0.92 }}
                transition={spring}
                className={cx(
                  "flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-0 bg-[#111111] text-[#FFFFFF] md:h-11 md:w-11",
                  focusRing
                )}
                aria-label="Close menu"
              >
                <X size={20} />
              </motion.button>
            </div>

            {/* Split Content */}
            <div className="mx-auto grid w-full max-w-[1500px] flex-1 grid-cols-1 items-center gap-6 overflow-y-auto px-6 py-4 lg:grid-cols-12 lg:py-6">
              <div className="flex flex-col justify-center lg:col-span-5">
                <div>
                  <span
                    className="mb-3 inline-block rounded-full border-0 px-4 py-1.5 text-[11px] font-black uppercase tracking-widest"
                    style={{ backgroundColor: PALETTE.lime, color: PALETTE.ink }}
                  >
                    {SLOGAN} · Gulu City
                  </span>
                  <h2 className="text-3xl font-black uppercase leading-[0.9] tracking-[-0.04em] text-[#111111] md:text-6xl">
                    Eat Bold. <br />
                    <span style={{ color: PALETTE.red }}>Crave More.</span>
                  </h2>
                  <p className="mt-3 max-w-sm font-body text-xs font-medium leading-relaxed text-[#2A2A2A] md:text-sm">
                    Freshly prepared pork, burgers, pizza, and chicken in Gulu
                    City, delivered hot right to your doorstep.
                  </p>
                </div>

                <div className="mt-5 space-y-2 pt-2">
                  <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-[#111111]">
                    <MapPin size={15} style={{ color: PALETTE.red }} />
                    <span>Gulu City, Uganda</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-[#111111]">
                    <Clock size={15} style={{ color: PALETTE.red }} />
                    <span>{HOURS}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-[#111111]">
                    <Phone size={15} style={{ color: PALETTE.red }} />
                    <a
                      href={`tel:+${PHONE}`}
                      className={cx("rounded-full hover:underline", focusRing)}
                    >
                      {DISPLAY_PHONE}
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2.5 lg:col-span-7">
                {NAV_LINKS.map((item, i) => {
                  const isActive =
                    location.pathname.toLowerCase() === item.to.toLowerCase();
                  return (
                    <motion.div
                      key={item.to}
                      initial={
                        shouldReduceMotion
                          ? { opacity: 0 }
                          : { opacity: 0, x: 40, filter: "blur(6px)" }
                      }
                      animate={{
                        opacity: 1,
                        x: 0,
                        filter: "blur(0px)",
                        transition: { delay: 0.15 + i * 0.08, ease },
                      }}
                    >
                      <NavLink
                        to={item.to}
                        onClick={() => setIsOpen(false)}
                        className={cx(
                          "group relative flex items-center justify-between rounded-[2rem] border-0 p-4 transition-all duration-300 hover:scale-[1.01] md:p-6",
                          focusRing,
                          isActive
                            ? "bg-[#111111] text-[#FFFFFF]"
                            : "bg-[#F5F5F5] text-[#111111] hover:bg-[#EFEFEF]"
                        )}
                      >
                        <div className="flex items-center gap-4">
                          <span
                            className={cx(
                              "text-xs font-bold uppercase tracking-widest",
                              isActive ? "text-[#D9FF00]" : "text-[#E11D1D]"
                            )}
                          >
                            {item.tag}
                          </span>
                          <div>
                            <h3
                              className={cx(
                                "text-lg font-black uppercase leading-none tracking-tight transition-transform duration-300 group-hover:translate-x-2 md:text-3xl",
                                isActive ? "text-[#FFFFFF]" : "text-[#111111]"
                              )}
                            >
                              {item.label}
                            </h3>
                            <p
                              className={cx(
                                "mt-1 text-[10px] font-bold uppercase tracking-wider md:text-xs",
                                isActive ? "text-[#FFFFFF]/75" : "text-[#4A4A4A]"
                              )}
                            >
                              {item.desc}
                            </p>
                          </div>
                        </div>

                        <div
                          className={cx(
                            "flex h-9 w-9 items-center justify-center rounded-full border-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 md:h-11 md:w-11",
                            isActive
                              ? "bg-[#D9FF00] text-[#111111]"
                              : "bg-[#111111] text-[#FFFFFF]"
                          )}
                        >
                          <ArrowRight size={16} strokeWidth={2.5} />
                        </div>
                      </NavLink>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Footer Bar */}
            <div className="mx-auto flex w-full max-w-[1500px] shrink-0 flex-col items-center justify-between gap-3 border-0 px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#2A2A2A] sm:flex-row md:px-12">
              <p>
                © {year} {BRAND}. {SLOGAN}. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                <Link
                  to="/cart"
                  onClick={() => setIsOpen(false)}
                  className={cx(
                    "rounded-full px-2 py-0.5 tabular-nums transition-colors hover:text-[#E11D1D]",
                    focusRing
                  )}
                >
                  Cart ({totalItems})
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className={cx(
                    "rounded-full px-2 py-0.5 transition-colors hover:text-[#E11D1D]",
                    focusRing
                  )}
                >
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