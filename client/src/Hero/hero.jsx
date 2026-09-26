import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Minus, Plus, ShoppingBasket, Check, Clock, Star } from "lucide-react";
import { useCart } from "../components/cart/CartContext";

import PorkStake from "../assets/ChatGPT Image Jun 18, 2026, 03_34_25 PM.png";
import Burger from "../assets/Burger.png";
import Pizza from "../assets/pizza(17).png";
import Chicken from "../assets/fullchicken.png";

const BRAND_NAME = "Green Pork";
const AUTOPLAY_MS = 5500;
const BRAND_COLOR = "#D9FF00"; // Standardized Brand Color
const SUCCESS_COLOR = "#059669"; // Standardized Success Color

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
    bg: "#E11D1D",
    word: "#FFC2B3",
    dark: "#4A0A0A",
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
    bg: "#F5A31A",
    word: "#FFF1BF",
    dark: "#4A2508",
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
    bg: "#E8590C",
    word: "#FFD6B0",
    dark: "#4A1A05",
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
    bg: "#E0A100",
    word: "#FFF4B8",
    dark: "#3D2C04",
  },
];

const fmt = (v) => Number(v).toLocaleString();
const savePct = (p, o) => Math.round(((o - p) / o) * 100);

const spring = { type: "spring", stiffness: 220, damping: 26 };

const fadeUp = (d = 0) => ({
  initial: { opacity: 0, y: 20, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: d } },
  exit: { opacity: 0, y: -12, filter: "blur(6px)", transition: { duration: 0.25 } },
});

const imgVar = {
  enter: (d) => ({ opacity: 0, x: d === "right" ? 90 : -90, scale: 0.7, rotate: d === "right" ? -8 : 8, filter: "blur(12px)" }),
  center: { opacity: 1, x: 0, scale: 1, rotate: 0, filter: "blur(0px)", transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
  exit: (d) => ({ opacity: 0, x: d === "right" ? -70 : 70, scale: 0.8, rotate: d === "right" ? 6 : -6, filter: "blur(12px)", transition: { duration: 0.4 } }),
};

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState("right");
  const [isPaused, setIsPaused] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const { addToCart } = useCart();

  const total = SLIDES.length;
  const slide = SLIDES[current];

  function goTo(i) {
    setDirection(i > current ? "right" : "left");
    setCurrent(i);
  }
  function next() {
    setDirection("right");
    setCurrent((current + 1) % total);
  }
  function prev() {
    setDirection("left");
    setCurrent(current === 0 ? total - 1 : current - 1);
  }

  useEffect(() => {
    if (isPaused) return;
    const t = setTimeout(next, AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [current, isPaused]);

  useEffect(() => {
    function handleKey(e) {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [current]);

  useEffect(() => {
    setQuantity(1);
  }, [slide.id]);

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

  const pill = "flex items-center gap-2 rounded-full px-4 py-2.5 text-[11px] sm:text-xs font-bold uppercase tracking-wide";

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Food gallery"
      className="relative flex min-h-[100dvh] max-h-[100dvh] w-full select-none flex-col overflow-hidden px-4 pb-5 pt-6 transition-colors duration-700 lg:px-12 lg:pt-8"
      style={{ backgroundColor: slide.bg }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@700;800;900&display=swap');
        .font-display { font-family: 'Archivo', sans-serif; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Soft light in the center */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 60%)" }}
      />

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
            className="relative z-10 flex h-[52vh] w-full items-center justify-center sm:h-[50vh] lg:h-[72vh]"
          >
            <img
              src={slide.image}
              alt={slide.category}
              className="pointer-events-none h-full max-w-[90vw] object-contain lg:max-w-[50rem]"
              style={{ filter: "drop-shadow(0 30px 30px rgba(0,0,0,0.35))" }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Dark speech bubble (left) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`b1-${slide.id}`}
            {...fadeUp(0.3)}
            className="font-display absolute bottom-[14%] left-[3%] z-20 -rotate-3 rounded-2xl px-4 py-2 text-[11px] font-extrabold uppercase text-white lg:bottom-[20%] lg:left-[24%] lg:px-5 lg:py-2.5 lg:text-sm"
            style={{ backgroundColor: slide.dark }}
          >
            {slide.tags[0]}
            <span className="absolute -bottom-1 left-6 h-3 w-3 rotate-45" style={{ backgroundColor: slide.dark }} />
          </motion.div>
        </AnimatePresence>

        {/* Brand Color pill (right) - Now uses #D9FF00 as background to be visible */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`b2-${slide.id}`}
            {...fadeUp(0.4)}
            className="font-display absolute right-[3%] top-[55%] z-20 rounded-full px-4 py-2 text-[11px] font-extrabold uppercase shadow-lg lg:right-[22%] lg:px-5 lg:py-2.5 lg:text-sm"
            style={{ backgroundColor: BRAND_COLOR, color: slide.dark }}
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
          className="absolute left-0 top-1/2 z-30 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/30 text-white backdrop-blur-md lg:h-11 lg:w-11"
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
          className="absolute right-0 top-1/2 z-30 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/30 text-white backdrop-blur-md lg:h-11 lg:w-11"
        >
          <ChevronRight size={18} strokeWidth={2.5} />
        </motion.button>
      </div>

      {/* Bottom pill row */}
      <div className="relative z-20 flex flex-col items-center gap-3">
        <div className="flex flex-wrap items-center justify-center gap-2 font-display text-white sm:gap-3">

          {/* Save % Pill - Uses Brand Color as background for high visibility */}
          <span
            className={`${pill} shadow-sm`}
            style={{ backgroundColor: BRAND_COLOR, color: slide.dark }}
          >
            Save {savePct(slide.price, slide.oldPrice)}%
          </span>

          <span className={`${pill} border border-white/70`}>
            <Clock size={13} strokeWidth={2.5} /> {slide.prepTime}
          </span>

          <span className={`${pill} border border-white/70`}>
            <Star size={13} strokeWidth={2.5} fill="currentColor" /> {slide.rating}
          </span>

          {/* Quantity */}
          <span className={`${pill} border border-white/70`}>
            <button type="button" aria-label="Reduce quantity" className="cursor-pointer" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
              <Minus size={13} strokeWidth={3} />
            </button>
            <span className="w-4 text-center">{quantity}</span>
            <button type="button" aria-label="Increase quantity" className="cursor-pointer" onClick={() => setQuantity(quantity + 1)}>
              <Plus size={13} strokeWidth={3} />
            </button>
          </span>

          {/* Main CTA - Uses Brand Color (#D9FF00) as background, Dark text. Turns Green when added. */}
          <motion.button
            type="button"
            onClick={handleAddToCart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={spring}
            className={`${pill} cursor-pointer shadow-lg`}
            style={{
              backgroundColor: isAdded ? SUCCESS_COLOR : BRAND_COLOR,
              color: isAdded ? "#FFFFFF" : slide.dark
            }}
          >
            {isAdded ? <Check size={14} strokeWidth={3} /> : <ShoppingBasket size={14} strokeWidth={2.5} />}
            {isAdded ? "Added" : `Order now · ${fmt(slide.price * quantity)} UGX`}
          </motion.button>
        </div>

        <Link to="/returnPolicy" className="text-[10px] font-semibold uppercase tracking-widest text-white/70 transition-colors hover:text-white">
          © {new Date().getFullYear()} {BRAND_NAME} · Return Policy
        </Link>
      </div>
    </section>
  );
}