import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Minus, Plus, ShoppingBasket, Check, Clock, Star, Flame } from "lucide-react";
import { useCart } from "../components/cart/CartContext";

import PorkStake from "../assets/ChatGPT Image Jun 18, 2026, 03_34_25 PM.png";
import Burger from "../assets/Burger.png";
import Pizza from "../assets/pizza(17).png";
import Chicken from "../assets/fullchicken.png";

const BRAND_NAME = "Green Pork";
const AUTOPLAY_MS = 5500;

// Same palette as About.jsx: red, lime, deep red, white. No orange or gold.
const RED = "#E11D1D";
const LIME = "#D9FF00";
const PIZZA = "#E65C00";
const DARK = "#2E0101";
const WHITE = "#FFFFFF";
const SUCCESS_COLOR = "#059669";

// Each slide carries its own colors so text, pills and arrows stay readable on every background.
const SLIDES = [
  {
    id: "pork-skewer",
    short: "Skewers",
    words: ["SMOKY", "PORK"],
    category: "Premium Wood-Fired Pork Skewers",
    image: PorkStake,
    price: 6000,
    oldPrice: 8000,
    rating: 4.9,
    prepTime: "12 min",
    tags: ["extra cassava", "salads"],
    bg: RED,
    word: "#FFC2B3",
    fg: WHITE,
    line: "rgba(255,255,255,0.7)",
    glass: "rgba(255,255,255,0.25)",
    bubble: DARK,
    bubbleText: WHITE,
    accent: LIME,
    accentText: DARK,
  },
  {
    id: "angus-burger",
    short: "Burger",
    words: ["CHEESY", "BURGER"],
    category: "Premium Angus Beef Burger",
    image: Burger,
    price: 10000,
    oldPrice: 12000,
    rating: 4.9,
    prepTime: "10 min",
    tags: ["100% Angus", "Extra Cheese"],
    bg: DARK,
    word: RED,
    fg: WHITE,
    line: "rgba(255,255,255,0.7)",
    glass: "rgba(255,255,255,0.18)",
    bubble: RED,
    bubbleText: WHITE,
    accent: LIME,
    accentText: DARK,
  },
  {
    id: "chicken-pizza",
    short: "Pizza",
    words: ["FIRED", "PIZZA"],
    category: "Premium Chicken Pizza",
    image: Pizza,
    price: 10000,
    oldPrice: 12000,
    rating: 4.8,
    prepTime: "18 min",
    tags: ["Stone-Baked", "Fresh Mozzarella"],
    bg: PIZZA,
    word: "#F1FF9A",
    fg: DARK,
    line: "rgba(46,1,1,0.5)",
    glass: "rgba(46,1,1,0.1)",
    bubble: DARK,
    bubbleText: WHITE,
    accent: DARK,
    accentText: LIME,
  },
  {
    id: "roasted-chicken",
    short: "Chicken",
    words: ["GOLDEN", "CHICKEN"],
    category: "Premium Fire-Roasted Chicken",
    image: Chicken,
    price: 55000,
    oldPrice: 78000,
    rating: 4.9,
    prepTime: "25 min",
    tags: ["Fire Roasted", "Farm Fresh"],
    bg: WHITE,
    word: "#FFE3DC",
    fg: DARK,
    line: "rgba(46,1,1,0.4)",
    glass: "rgba(46,1,1,0.07)",
    bubble: RED,
    bubbleText: WHITE,
    accent: LIME,
    accentText: DARK,
  },
];

const fmt = (v) => Number(v).toLocaleString();
const savePct = (p, o) => Math.round(((o - p) / o) * 100);

const ease = [0.16, 1, 0.3, 1];
const spring = { type: "spring", stiffness: 220, damping: 26 };

const fadeUp = (d = 0) => ({
  initial: { opacity: 0, y: 20, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease, delay: d } },
  exit: { opacity: 0, y: -12, filter: "blur(6px)", transition: { duration: 0.25 } },
});

const imgVar = {
  enter: (d) => ({ opacity: 0, x: d === "right" ? 90 : -90, scale: 0.7, rotate: d === "right" ? -8 : 8, filter: "blur(12px)" }),
  center: { opacity: 1, x: 0, scale: 1, rotate: 0, filter: "blur(0px)", transition: { duration: 0.85, ease } },
  exit: (d) => ({ opacity: 0, x: d === "right" ? -70 : 70, scale: 0.8, rotate: d === "right" ? 6 : -6, filter: "blur(12px)", transition: { duration: 0.4 } }),
};

const pill = "flex items-center gap-2 rounded-full px-4 py-2.5 text-[11px] sm:text-xs font-bold uppercase tracking-wide transition-colors duration-700";
const tab = "cursor-pointer rounded-full border px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wide transition-colors duration-300";
const focusRing = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--fg)]";

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState("right");
  const [isPaused, setIsPaused] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const touchStartX = useRef(null);

  const { addToCart } = useCart();

  const total = SLIDES.length;
  const slide = SLIDES[current];

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

  // Autoplay
  useEffect(() => {
    if (isPaused) return;
    const t = setTimeout(next, AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [current, isPaused]);

  // Arrow keys (ignored while typing in a field)
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

  // Reset quantity when the dish changes
  useEffect(() => {
    setQuantity(1);
  }, [slide.id]);

  // Swipe on touch screens
  function handleTouchStart(e) {
    touchStartX.current = e.touches[0].clientX;
  }
  function handleTouchEnd(e) {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(diff) < 50) return;
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
      quantity: quantity,
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  }

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Food gallery"
      className="relative flex min-h-[100dvh] max-h-[100dvh] w-full select-none flex-col overflow-hidden px-4 pb-5 pt-6 transition-colors duration-700 lg:px-12 lg:pt-8"
      style={{ backgroundColor: slide.bg, "--fg": slide.fg }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@700;800;900&display=swap');
        .font-display { font-family: 'Archivo', sans-serif; }
      `}</style>

      {/* Soft light in the center */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 60%)" }}
      />

      {/* Category eyebrow */}
      <div className="relative z-20 flex justify-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={`cat-${slide.id}`}
            {...fadeUp(0)}
            className="font-display hidden inline-flex// items-center gap-2 rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-wide backdrop-blur-md"
            style={{ backgroundColor: slide.glass, color: slide.fg }}
          >
            <Flame size={13} strokeWidth={2.5} />
            {slide.category}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Stage: giant words + product + badges */}
      <div className="relative z-10 flex min-h-0 flex-1 items-center justify-center" aria-live="polite">
        {/* Giant background words */}
        <AnimatePresence mode="wait">
          <motion.h1
            key={`w-${slide.id}`}
            {...fadeUp(0.05)}
            className="font-display pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center font-black uppercase leading-[0.82] tracking-[-0.04em]"
            style={{ color: slide.word, fontSize: "clamp(4.5rem, 21vw, 17rem)" }}
          >
            <span>{slide.words[0]}</span>
            <span>{slide.words[1]}</span>
          </motion.h1>
        </AnimatePresence>

        {/* Product image */}
        <AnimatePresence mode="popLayout" custom={direction}>
          <motion.div
            key={slide.id}
            custom={direction}
            variants={imgVar}
            initial="enter"
            animate="center"
            exit="exit"
            className="relative z-10 flex h-[46vh] w-full items-center justify-center sm:h-[46vh] lg:h-[64vh]"
          >
            <img
              src={slide.image}
              alt={slide.category}
              className="pointer-events-none h-full max-w-[90vw] object-contain lg:max-w-[50rem]"
              style={{ filter: "drop-shadow(0 30px 30px rgba(0,0,0,0.35))" }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Speech bubble (left) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`b1-${slide.id}`}
            {...fadeUp(0.3)}
            className="font-display absolute bottom-[14%] left-[3%] z-20 -rotate-3 rounded-2xl px-4 py-2 text-[11px] font-extrabold uppercase lg:bottom-[20%] lg:left-[24%] lg:px-5 lg:py-2.5 lg:text-sm"
            style={{ backgroundColor: slide.bubble, color: slide.bubbleText }}
          >
            {slide.tags[0]}
            <span className="absolute -bottom-1 left-6 h-3 w-3 rotate-45" style={{ backgroundColor: slide.bubble }} />
          </motion.div>
        </AnimatePresence>

        {/* Accent pill (right) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`b2-${slide.id}`}
            {...fadeUp(0.4)}
            className="font-display absolute right-[3%] top-[55%] z-20 rounded-full px-4 py-2 text-[11px] font-extrabold uppercase shadow-lg lg:right-[22%] lg:px-5 lg:py-2.5 lg:text-sm"
            style={{ backgroundColor: slide.accent, color: slide.accentText }}
          >
            {slide.tags[1]}
          </motion.div>
        </AnimatePresence>

        {/* Side arrows */}
        <motion.button
          type="button"
          onClick={prev}
          aria-label="Previous"
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.88 }}
          transition={spring}
          className={`absolute left-0 top-1/2 z-30 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full backdrop-blur-md lg:h-11 lg:w-11 ${focusRing}`}
          style={{ backgroundColor: slide.glass, color: slide.fg }}
        >
          <ChevronLeft size={18} strokeWidth={2.5} />
        </motion.button>
        <motion.button
          type="button"
          onClick={next}
          aria-label="Next"
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.88 }}
          transition={spring}
          className={`absolute right-0 top-1/2 z-30 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full backdrop-blur-md lg:h-11 lg:w-11 ${focusRing}`}
          style={{ backgroundColor: slide.glass, color: slide.fg }}
        >
          <ChevronRight size={18} strokeWidth={2.5} />
        </motion.button>
      </div>

      {/* Bottom area */}
      <div className="relative z-20 flex flex-col items-center gap-3">
        {/* Pill row */}
        <div className="font-display flex flex-wrap items-center justify-center gap-2 sm:gap-3" style={{ color: slide.fg }}>
          {/* Save pill, with the old price crossed out */}
          <span className={`${pill} shadow-sm`} style={{ backgroundColor: slide.accent, color: slide.accentText }}>
            Save {savePct(slide.price, slide.oldPrice)}%
            <s className="font-semibold opacity-60">{fmt(slide.oldPrice * quantity)}</s>
          </span>

          <span className={`${pill} border`} style={{ borderColor: slide.line }}>
            <Clock size={13} strokeWidth={2.5} /> {slide.prepTime}
          </span>

          <span className={`${pill} border`} style={{ borderColor: slide.line }}>
            <Star size={13} strokeWidth={2.5} fill="currentColor" /> {slide.rating}
          </span>

          {/* Quantity */}
          <span className={`${pill} border`} style={{ borderColor: slide.line }}>
            <button
              type="button"
              aria-label="Reduce quantity"
              className={`cursor-pointer rounded-full ${focusRing}`}
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Minus size={13} strokeWidth={3} />
            </button>
            <span className="w-4 text-center">{quantity}</span>
            <button
              type="button"
              aria-label="Increase quantity"
              className={`cursor-pointer rounded-full ${focusRing}`}
              onClick={() => setQuantity(quantity + 1)}
            >
              <Plus size={13} strokeWidth={3} />
            </button>
          </span>

          {/* Main CTA */}
          <motion.button
            type="button"
            onClick={handleAddToCart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={spring}
            className={`${pill} cursor-pointer shadow-lg ${focusRing}`}
            style={{
              backgroundColor: isAdded ? SUCCESS_COLOR : slide.accent,
              color: isAdded ? WHITE : slide.accentText,
            }}
          >
            {isAdded ? <Check size={14} strokeWidth={3} /> : <ShoppingBasket size={14} strokeWidth={2.5} />}
            {isAdded ? "Added" : `Order now · ${fmt(slide.price * quantity)} UGX`}
          </motion.button>
        </div>

        {/* Dish tabs */}
        <div role="tablist" aria-label="Choose a dish" className="font-display flex flex-wrap items-center justify-center gap-2">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={i === current}
              onClick={() => goTo(i)}
              className={`${tab} ${focusRing}`}
              style={
                i === current
                  ? { backgroundColor: slide.fg, borderColor: slide.fg, color: slide.bg }
                  : { backgroundColor: "transparent", borderColor: slide.line, color: slide.fg }
              }
            >
              {s.short}
            </button>
          ))}
        </div>

        <Link
          to="/returnPolicy"
          className={`rounded-full text-[10px] font-semibold uppercase tracking-widest opacity-70 transition-opacity hover:opacity-100 ${focusRing}`}
          style={{ color: slide.fg }}
        >
          © {new Date().getFullYear()} {BRAND_NAME} · Return Policy
        </Link>
      </div>
    </section>
  );
}