import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  ShoppingBasket,
  Check,
  Clock,
  Star,
  Flame,
  ArrowRight,
} from "lucide-react";
import { useCart } from "../components/cart/CartContext";

import PorkStake from "../assets/ChatGPT Image Jun 18, 2026, 03_34_25 PM.png";
import Burger from "../assets/Burger.png";
import Pizza from "../assets/pizza(17).png";
import Chicken from "../assets/fullchicken.png";

/* ───────────── CONFIG + DESIGN TOKENS ───────────── */
const BRAND_NAME = "Greenpork";
const SLOGAN = "Eat Fresh. Live Happy.";
const AUTOPLAY_MS = 5500;

const PALETTE = {
  red: "#E11D1D",
  lime: "#D9FF00",
  orange: "#E65C00",
  ink: "#111111",
  charcoal: "#2A2A2A",
  muted: "#4A4A4A",
  surface: "#F5F5F5",
  surfaceHover: "#EFEFEF",
  white: "#FFFFFF",
  success: "#059669",
};

const GLOW =
  "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 60%)";
const WORD_STYLE =
  "font-display flex flex-col font-black uppercase tracking-[-0.04em]";

/* ───────────── HELPERS ───────────── */
const fmt = (v) => Number(v).toLocaleString();

function savePct(price, oldPrice) {
  if (!oldPrice || oldPrice <= price) return 0;
  return Math.round(((oldPrice - price) / oldPrice) * 100);
}

const EASE = [0.16, 1, 0.3, 1];
const SPRING = { type: "spring", stiffness: 220, damping: 26 };

const hoverTap = (hover = 1.04, tap = 0.96) => ({
  whileHover: { scale: hover },
  whileTap: { scale: tap },
  transition: SPRING,
});

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20, filter: "blur(6px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: EASE, delay },
  },
  exit: {
    opacity: 0,
    y: -12,
    filter: "blur(6px)",
    transition: { duration: 0.25 },
  },
});

const imageVariants = {
  enter: (dir) => ({
    opacity: 0,
    x: dir === "right" ? 90 : -90,
    scale: 0.72,
    rotate: dir === "right" ? -8 : 8,
    filter: "blur(10px)",
  }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
    rotate: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE },
  },
  exit: (dir) => ({
    opacity: 0,
    x: dir === "right" ? -70 : 70,
    scale: 0.8,
    rotate: dir === "right" ? 6 : -6,
    filter: "blur(10px)",
    transition: { duration: 0.4 },
  }),
};

const cx = (...classes) => classes.filter(Boolean).join(" ");

const pillClass =
  "flex items-center gap-1.5 sm:gap-2 rounded-full border-0 px-3.5 py-2 sm:px-4 sm:py-2.5 text-[11px] sm:text-xs font-bold uppercase tracking-wide transition-colors duration-500";
const tabClass =
  "cursor-pointer rounded-full border-0 px-3 py-2 md:px-3.5 md:py-1.5 text-[10px] font-bold uppercase tracking-wide transition-colors duration-300";
const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--fg)]";

/* ───────────── SLIDES DATA ───────────── */
const SLIDES = [
  {
    id: "pork-skewer",
    short: "Pork",
    words: ["ROASTED", "PORK"],
    category: "Wood-Fired Pork · Gulu City",
    image: PorkStake,
    price: 6000,
    oldPrice: 8000,
    rating: 4.9,
    prepTime: "12 min",
    tags: ["extra cassava", "salads"],
    bg: PALETTE.red,
    word: "#FFC2B3",
    fg: PALETTE.white,
    line: "rgba(255,255,255,0.45)",
    glass: "rgba(17,17,17,0.28)",
    bubble: PALETTE.ink,
    bubbleText: PALETTE.white,
    accent: PALETTE.lime,
    accentText: PALETTE.ink,
  },
  {
    id: "angus-burger",
    short: "Burger",
    words: ["CHEESY", "BURGER"],
    category: "Juicy Burgers · Gulu City",
    image: Burger,
    price: 10000,
    oldPrice: 12000,
    rating: 4.9,
    prepTime: "10 min",
    tags: ["100% Angus", "Extra Cheese"],
    bg: PALETTE.ink,
    word: PALETTE.red,
    fg: PALETTE.white,
    line: "rgba(255,255,255,0.45)",
    glass: "rgba(255,255,255,0.14)",
    bubble: PALETTE.red,
    bubbleText: PALETTE.white,
    accent: PALETTE.lime,
    accentText: PALETTE.ink,
  },
  {
    id: "chicken-pizza",
    short: "Pizza",
    words: ["FIRED", "PIZZA"],
    category: "Stone-Baked Pizza · Gulu City",
    image: Pizza,
    price: 10000,
    oldPrice: 12000,
    rating: 4.8,
    prepTime: "18 min",
    tags: ["Stone-Baked", "Fresh Mozzarella"],
    bg: PALETTE.orange,
    word: PALETTE.lime,
    fg: PALETTE.ink,
    line: "rgba(17,17,17,0.38)",
    glass: "rgba(255,255,255,0.42)",
    bubble: PALETTE.ink,
    bubbleText: PALETTE.white,
    accent: PALETTE.ink,
    accentText: PALETTE.lime,
  },
  {
    id: "roasted-chicken",
    short: "Chicken",
    words: ["GOLDEN", "CHICKEN"],
    category: "Fire-Roasted Chicken · Gulu City",
    image: Chicken,
    price: 55000,
    oldPrice: 78000,
    rating: 4.9,
    prepTime: "25 min",
    tags: ["Fire Roasted", "Farm Fresh"],
    bg: PALETTE.white,
    word: PALETTE.surface,
    fg: PALETTE.ink,
    line: "rgba(17,17,17,0.25)",
    glass: PALETTE.surface,
    bubble: PALETTE.red,
    bubbleText: PALETTE.white,
    accent: PALETTE.lime,
    accentText: PALETTE.ink,
  },
];

/* ───────────── HERO COMPONENT ───────────── */
export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState("right");
  const [isPaused, setIsPaused] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const shouldReduceMotion = useReducedMotion();
  const touchStartX = useRef(null);
  const { addToCart } = useCart();

  const total = SLIDES.length;
  const slide = SLIDES[current];
  const discount = savePct(slide.price, slide.oldPrice);
  const outlineStyle = { boxShadow: `inset 0 0 0 1px ${slide.line}` };

  function goTo(i) {
    if (i === current) return;
    setDirection(i > current ? "right" : "left");
    setCurrent(i);
  }

  function next() {
    setDirection("right");
    setCurrent((c) => (c + 1) % total);
  }

  function prev() {
    setDirection("left");
    setCurrent((c) => (c === 0 ? total - 1 : c - 1));
  }

  useEffect(() => {
    if (isPaused || isAdded) return;
    const t = setTimeout(next, AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [current, isPaused, isAdded, total]);

  useEffect(() => {
    function handleKey(e) {
      const tag = e.target.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    setQuantity(1);
    setIsAdded(false);
  }, [slide.id]);

  function handleTouchStart(e) {
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  }

  function handleTouchEnd(e) {
    setIsPaused(false);
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(diff) < 45) return;
    if (diff < 0) next();
    else prev();
  }

  function handleAddToCart() {
    addToCart({
      id: slide.id,
      name: slide.category,
      category: slide.category,
      price: slide.price,
      image: slide.image,
      quantity,
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  }

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured gallery"
      className="relative flex min-h-[100dvh] w-full select-none flex-col justify-between overflow-x-clip border-0 px-4 pt-[max(1.25rem,env(safe-area-inset-top))] pb-[max(1.25rem,env(safe-area-inset-bottom))] transition-colors duration-700 sm:px-6 md:h-[100dvh] md:overflow-hidden md:py-6 lg:px-12 lg:pt-8"
      style={{ backgroundColor: slide.bg, "--fg": slide.fg }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@600;700;800;900&family=Inter:wght@400;500;600;700&display=swap');
        .font-display { font-family: 'Archivo', sans-serif; }
        .font-body { font-family: 'Inter', sans-serif; }
      `}</style>

      {/* Ambient Glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: GLOW }}
      />

      {/* Top Header */}
      <div className="relative z-20 flex w-full items-center justify-between gap-2 md:justify-center">
        
        <span
          className="font-display shrink-0 rounded-full border-0 px-3 py-2 text-[10px] font-extrabold tabular-nums tracking-wider md:block hidden"
          style={{ backgroundColor: slide.glass, color: slide.fg }}
        >
          0{current + 1}/0{total}
        </span>
      </div>

      {/* Stage & Editorial Typography */}
      <div
        className="relative z-10 my-auto flex min-h-0 flex-1 flex-col items-center justify-center py-2 md:flex-row md:py-0"
        aria-live="polite"
      >
        <AnimatePresence mode="wait">
          <motion.h1
            key={`words-${slide.id}`}
            {...fadeUp(0.05)}
            className={cx(
              WORD_STYLE,
              "pointer-events-none absolute inset-x-0 top-20 items-start text-left leading-[0.84] md:inset-0 md:items-center md:justify-center md:text-center md:leading-[0.82]"
            )}
            style={{
              color: slide.word,
              fontSize: "clamp(3.35rem, 18vw, 16rem)",
            }}
          >
            <span>{slide.words[0]}</span>
            <span>{slide.words[1]}</span>
          </motion.h1>
        </AnimatePresence>

        <div className="relative flex w-full flex-1 items-center justify-center pt-6 md:h-full md:pt-0">
          <AnimatePresence mode="popLayout" custom={direction}>
            <motion.div
              key={slide.id}
              custom={direction}
              variants={imageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="relative z-10 flex h-[41vh] max-h-[400px] w-full items-center justify-center sm:h-[45vh] sm:max-h-[450px] md:h-[50vh] md:max-h-none lg:h-[60vh]"
            >
              <motion.img
                src={slide.image}
                alt={slide.category}
                animate={shouldReduceMotion ? {} : { y: [0, -8, 0] }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="pointer-events-none h-full max-w-[92vw] object-contain md:max-w-[80vw] lg:max-w-[48rem]"
              />
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={`bubble-${slide.id}`}
              {...fadeUp(0.3)}
              className="font-display pointer-events-none absolute bottom-2 left-1 z-20 -rotate-3 rounded-2xl border-0 px-3.5 py-1.5 text-[10px] font-extrabold uppercase sm:left-4 sm:px-4 sm:py-2 sm:text-[11px] md:bottom-[14%] md:left-[8%] lg:bottom-[18%] lg:left-[22%] lg:px-5 lg:py-2.5 lg:text-sm"
              style={{
                backgroundColor: slide.bubble,
                color: slide.bubbleText,
              }}
            >
              {slide.tags[0]}
              <span
                className="absolute -bottom-1 left-5 h-2.5 w-2.5 rotate-45 sm:left-6 sm:h-3 sm:w-3"
                style={{ backgroundColor: slide.bubble }}
              />
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={`badge-${slide.id}`}
              {...fadeUp(0.4)}
              className="font-display pointer-events-none absolute right-1 top-8 z-20 rotate-3 rounded-full border-0 px-3.5 py-1.5 text-[10px] font-extrabold uppercase sm:right-4 sm:px-4 sm:py-2 sm:text-[11px] md:right-[8%] md:top-[52%] md:rotate-0 lg:right-[22%] lg:top-[55%] lg:px-5 lg:py-2.5 lg:text-sm"
              style={{
                backgroundColor: slide.accent,
                color: slide.accentText,
              }}
            >
              {slide.tags[1]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Desktop Side Arrows */}
        {[
          {
            label: "Previous",
            side: "left-0",
            onClick: prev,
            Icon: ChevronLeft,
          },
          { label: "Next", side: "right-0", onClick: next, Icon: ChevronRight },
        ].map(({ label, side, onClick, Icon }) => (
          <motion.button
            key={label}
            type="button"
            aria-label={label}
            onClick={onClick}
            {...hoverTap(1.1, 0.9)}
            className={cx(
              "absolute top-1/2 z-30 hidden h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border-0 md:flex lg:h-11 lg:w-11",
              side,
              focusRing
            )}
            style={{ backgroundColor: slide.glass, color: slide.fg }}
          >
            <Icon size={18} strokeWidth={2.5} />
          </motion.button>
        ))}
      </div>

      {/* Bottom Dock */}
      <div className="relative z-20 mx-auto flex w-full max-w-lg flex-col items-center gap-2.5 md:max-w-none md:gap-3">
        {/* Desktop Metadata & CTA Strip */}
        <div
          className="font-display flex w-full flex-wrap items-center justify-start gap-1.5 md:w-auto md:justify-center md:gap-3"
          style={{ color: slide.fg }}
        >
          {discount > 0 && (
            <span
              className={pillClass}
              style={{
                backgroundColor: slide.accent,
                color: slide.accentText,
              }}
            >
              Save {discount}%
              <s className="font-semibold tabular-nums opacity-65">
                {fmt(slide.oldPrice * quantity)}
              </s>
            </span>
          )}

          <span className={pillClass} style={outlineStyle}>
            <Clock size={13} strokeWidth={2.5} /> {slide.prepTime}
          </span>

          <span className={pillClass} style={outlineStyle}>
            <Star size={13} strokeWidth={2.5} fill="currentColor" />{" "}
            {slide.rating}
          </span>

          <span className={cx(pillClass, "hidden md:flex")} style={outlineStyle}>
            <button
              type="button"
              aria-label="Reduce quantity"
              className={cx("cursor-pointer rounded-full border-0", focusRing)}
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Minus size={13} strokeWidth={3} />
            </button>
            <span className="w-4 text-center tabular-nums">{quantity}</span>
            <button
              type="button"
              aria-label="Increase quantity"
              className={cx("cursor-pointer rounded-full border-0", focusRing)}
              onClick={() => setQuantity(quantity + 1)}
            >
              <Plus size={13} strokeWidth={3} />
            </button>
          </span>

          <motion.button
            type="button"
            onClick={handleAddToCart}
            {...hoverTap()}
            className={cx(pillClass, "hidden cursor-pointer md:flex", focusRing)}
            style={{
              backgroundColor: isAdded ? PALETTE.success : slide.accent,
              color: isAdded ? PALETTE.white : slide.accentText,
            }}
          >
            {isAdded ? (
              <Check size={14} strokeWidth={3} />
            ) : (
              <ShoppingBasket size={14} strokeWidth={2.5} />
            )}
            <span className="tabular-nums">
              {isAdded
                ? "Added"
                : `Order now · ${fmt(slide.price * quantity)} UGX`}
            </span>
          </motion.button>

          <motion.div
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            transition={SPRING}
            className="hidden md:flex"
          >
            <Link
              to="/Products"
              className={cx(pillClass, focusRing)}
              style={{ ...outlineStyle, color: slide.fg }}
            >
              Menu <ArrowRight size={13} strokeWidth={2.5} />
            </Link>
          </motion.div>
        </div>

        {/* Mobile Conversion Row */}
        <div
          className="font-display flex w-full items-center gap-1.5 md:hidden"
          style={{ color: slide.fg }}
        >
          <div
            className="flex h-11 shrink-0 items-center gap-1.5 rounded-full border-0 px-2.5"
            style={outlineStyle}
          >
            <button
              type="button"
              aria-label="Reduce quantity"
              className={cx(
                "flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border-0",
                focusRing
              )}
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Minus size={13} strokeWidth={3} />
            </button>
            <span className="w-4 text-center text-xs font-extrabold tabular-nums">
              {quantity}
            </span>
            <button
              type="button"
              aria-label="Increase quantity"
              className={cx(
                "flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border-0",
                focusRing
              )}
              onClick={() => setQuantity(quantity + 1)}
            >
              <Plus size={13} strokeWidth={3} />
            </button>
          </div>

          <motion.button
            type="button"
            onClick={handleAddToCart}
            whileTap={{ scale: 0.96 }}
            transition={SPRING}
            className={cx(
              "flex h-11 flex-1 cursor-pointer items-center justify-center gap-2 rounded-full border-0 px-3 text-[11px] font-extrabold uppercase tracking-wide",
              focusRing
            )}
            style={{
              backgroundColor: isAdded ? PALETTE.success : slide.accent,
              color: isAdded ? PALETTE.white : slide.accentText,
            }}
          >
            {isAdded ? (
              <Check size={14} strokeWidth={3} />
            ) : (
              <ShoppingBasket size={14} strokeWidth={2.5} />
            )}
            <span className="truncate tabular-nums">
              {isAdded
                ? "Added"
                : `Order · ${fmt(slide.price * quantity)} UGX`}
            </span>
          </motion.button>

          <Link
            to="/Products"
            aria-label="Browse full menu"
            className={cx(
              "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-0",
              focusRing
            )}
            style={{ ...outlineStyle, color: slide.fg }}
          >
            <ArrowRight size={16} strokeWidth={2.5} />
          </Link>
        </div>

        {/* Category Dish Selector Tabs */}
        <div className="flex w-full items-center gap-1.5 md:w-auto">
          <motion.button
            type="button"
            aria-label="Previous"
            onClick={prev}
            whileTap={{ scale: 0.88 }}
            transition={SPRING}
            className={cx(
              "flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border-0 md:hidden",
              focusRing
            )}
            style={{ backgroundColor: slide.glass, color: slide.fg }}
          >
            <ChevronLeft size={17} strokeWidth={2.5} />
          </motion.button>

          <div
            role="tablist"
            aria-label="Choose a dish"
            className="font-display grid flex-1 grid-cols-4 gap-1 md:flex md:flex-initial md:flex-wrap md:items-center md:justify-center md:gap-2"
          >
            {SLIDES.map((s, i) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={i === current}
                onClick={() => goTo(i)}
                className={cx(
                  tabClass,
                  "truncate px-1.5 text-center text-[9px] sm:text-[10px] md:px-3.5",
                  focusRing
                )}
                style={
                  i === current
                    ? { backgroundColor: slide.fg, color: slide.bg }
                    : {
                        backgroundColor: "transparent",
                        color: slide.fg,
                        boxShadow: `inset 0 0 0 1px ${slide.line}`,
                      }
                }
              >
                {s.short}
              </button>
            ))}
          </div>

          <motion.button
            type="button"
            aria-label="Next"
            onClick={next}
            whileTap={{ scale: 0.88 }}
            transition={SPRING}
            className={cx(
              "flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border-0 md:hidden",
              focusRing
            )}
            style={{ backgroundColor: slide.glass, color: slide.fg }}
          >
            <ChevronRight size={17} strokeWidth={2.5} />
          </motion.button>
        </div>

        <Link
          to="/returnPolicy"
          className={cx(
            "rounded-full border-0 text-[10px] font-bold uppercase tracking-widest opacity-80 transition-opacity hover:opacity-100",
            focusRing
          )}
          style={{ color: slide.fg }}
        >
          © {new Date().getFullYear()} {BRAND_NAME} · {SLOGAN} · Return Policy
        </Link>
      </div>
    </section>
  );
}