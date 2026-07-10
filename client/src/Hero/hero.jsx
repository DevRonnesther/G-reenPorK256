import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Twitter, Facebook,
  ChevronLeft, ChevronRight,
} from "lucide-react";
import { useCart } from "../components/cart/CartContext"; // adjust path to match your folder structure

import FreshPork from "../assets/freshporke.png";
import PorkStake from "../assets/ChatGPT Image Jun 18, 2026, 03_34_25 PM.png";
import Burger from "../assets/Burger.png";
import Pizza from "../assets/pizza(17).png";
import Chicken from "../assets/pngwing.com (25).png";

// ─── Config ─────────────────────────────────────────────────
const WHATSAPP_NUMBER = "256776464823";
const AUTOPLAY_INTERVAL_MS = 5500;
const SPICE_LEVELS = ["Mild", "Spicy", "Hot"];

const SLIDES = [
  {
    id: "pork-skewer",
    title: "We make the smoky pork skewer.",
    category: "Pork Skewer",
    spiceLevel: "Mild",
    image: PorkStake,
    price: 6000,
    oldPrice: 8000,
    rating: 4.4,
    description: "Roasted pork with fried cassava, salad, chapati, and bananas.",
  },
  {
    id: "beef-burger",
    title: "We make the double cheesy burger.",
    category: "Classic Beef Burger",
    spiceLevel: "Spicy",
    image: Burger,
    price: 10000,
    oldPrice: 12000,
    rating: 4.7,
    description: "Juicy grilled beef patty layered with fresh lettuce, cheese, tomato and creamy sauce.",
  },
  {
    id: "chicken-pizza",
    title: "We make the cheesy classic pizza.",
    category: "Classic Chicken Pizza",
    spiceLevel: "Mild",
    image: Pizza,
    price: 10000,
    oldPrice: 12000,
    rating: 4.7,
    description: "Hand-tossed crust topped with grilled chicken, mozzarella and house tomato sauce.",
  },
  {
    id: "fresh-pork",
    title: "We make the farmhouse fresh cut.",
    category: "Fresh Organic Pork",
    spiceLevel: "Mild",
    image: FreshPork,
    price: 16000,
    oldPrice: 18000,
    rating: 4.5,
    description: "Premium farm-fresh pork cuts, hygienically prepared and ready for your recipes.",
  },
  {
    id: "spicy-chicken",
    title: "We make the firecracker chicken.",
    category: "Crispy Spicy Chicken",
    spiceLevel: "Hot",
    image: Chicken,
    price: 55000,
    oldPrice: 78000,
    rating: 4.5,
    description: "Double-fried spiced chicken pieces, finished with our signature hot glaze.",
  },
];

const fmt = (n) => Number(n).toLocaleString();

// ─── Animation variants ─────────────────────────────────────────────────
const imageVariants = {
  enter: (direction) => ({ opacity: 0, x: direction === "right" ? 70 : -70, scale: 0.9, rotate: direction === "right" ? 4 : -4 }),
  center: { opacity: 1, x: 0, scale: 1, rotate: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  exit: (direction) => ({ opacity: 0, x: direction === "right" ? -50 : 50, scale: 0.92, transition: { duration: 0.25, ease: "easeIn" } }),
};

const floatAnimation = { y: [0, -12, 0], transition: { duration: 4, repeat: Infinity, ease: "easeInOut" } };

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] } },
});

// ─── Shared hook: carousel state ────────────────────
function useSlideCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState("right");
  const [isPaused, setIsPaused] = useState(false);

  const goTo = useCallback((index) => {
    setDirection(index > current ? "right" : "left");
    setCurrent(index);
  }, [current]);

  const next = useCallback(() => {
    setDirection("right");
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prev = useCallback(() => {
    setDirection("left");
    setCurrent((prevIndex) => (prevIndex === 0 ? SLIDES.length - 1 : prevIndex - 1));
  }, []);

  const prefersReducedMotion = useMemo(
    () => typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches,
    []
  );

  useEffect(() => {
    if (isPaused || prefersReducedMotion) return undefined;
    const interval = setInterval(next, AUTOPLAY_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [isPaused, prefersReducedMotion, next]);

  const nextSlide = SLIDES[(current + 1) % SLIDES.length];

  return { current, direction, isPaused, setIsPaused, goTo, next, prev, slide: SLIDES[current], nextSlide };
}

// ─── Subcomponents ────────────────────────────────────────────────

function SpicePills({ active }) {
  return (
    <div className="flex items-center gap-2 mt-4" role="group" aria-label="Spice level">
      {SPICE_LEVELS.map((level) => {
        const isActive = level === active;
        return (
          <span
            key={level}
            aria-current={isActive}
            className={`px-3.5 py-1.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wide border transition-colors duration-200 ${isActive
              ? "bg-red-600 border-red-600 text-white"
              : "bg-white border-stone-200 text-stone-500"
              }`}
          >
            {level}
          </span>
        );
      })}
    </div>
  );
}

function DesktopThumbnails({ slides, current, onSelect, onPrev, onNext }) {
  return (
    <div className="flex items-center gap-3">
      {slides.map((s, index) => (
        <button
          key={s.id}
          type="button"
          aria-label={`Show ${s.category}`}
          aria-current={current === index}
          onClick={() => onSelect(index)}
          className={`h-12 w-12 rounded-full overflow-hidden border-2 transition-all duration-200 ${current === index ? "border-orange-500 scale-105" : "border-stone-100 opacity-70 hover:opacity-100"
            }`}
        >
          <img src={s.image} alt="" aria-hidden="true" className="h-full w-full object-cover bg-stone-50" />
        </button>
      ))}

      <button
        type="button"
        onClick={onPrev}
        aria-label="Previous product"
        className="h-10 w-10 rounded-full border border-stone-200 flex items-center justify-center hover:bg-stone-50 transition-colors ml-2"
      >
        <ChevronLeft size={16} aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={onNext}
        aria-label="Next product"
        className="h-10 w-10 rounded-full bg-stone-900 text-white flex items-center justify-center hover:bg-stone-800 transition-colors"
      >
        <ChevronRight size={16} aria-hidden="true" />
      </button>
    </div>
  );
}

/** Desktop hero — diagonal white/yellow split. */
function DesktopHero({ carousel }) {
  const BRAND_NAME = "GreenPork";
  const year = useMemo(() => new Date().getFullYear(), []);
  const { current, direction, slide, nextSlide, goTo, next, prev, setIsPaused } = carousel;
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: slide.id,
      name: slide.category,
      category: slide.category,
      price: slide.price,
      image: slide.image,
    });
  };

  return (
    <section
      aria-label="Featured products"
      className="hidden lg:block w-full h-[100vh] overflow-hidden bg-white"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Diagonal yellow panel */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-yellow-400"
        style={{ clipPath: "polygon(58% 0, 100% 0, 100% 100%, 38% 100%)" }}
      />

      <div className="relative grid grid-cols-2 min-h-[38rem]">
        {/* Left: copy */}
        <div className="flex flex-col justify-center px-16 py-16 max-w-xl">
          <AnimatePresence mode="wait">
            <motion.h1
              key={`title-${slide.id}`}
              {...fadeUp(0.05)}
              exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
              className="text-4xl xl:text-5xl font-black leading-[1.15] text-stone-900 max-w-md"
            >
              {slide.title}
            </motion.h1>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.p
              key={`desc-${slide.id}`}
              {...fadeUp(0.1)}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              className="text-stone-400 leading-relaxed mt-4 max-w-sm text-sm"
            >
              {slide.description}
            </motion.p>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div key={`spice-${slide.id}`} {...fadeUp(0.14)} exit={{ opacity: 0, transition: { duration: 0.2 } }}>
              <SpicePills active={slide.spiceLevel} />
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center gap-5 mt-7">
            <button
              type="button"
              onClick={handleAddToCart}
              aria-label={`Add ${slide.category} to cart`}
              className="inline-flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-white font-bold text-sm px-6 py-3.5 rounded-full transition-colors uppercase tracking-wide"
            >
              Add to cart
            </button>

            <AnimatePresence mode="wait">
              <motion.div key={`price-${slide.id}`} {...fadeUp(0.18)} exit={{ opacity: 0, transition: { duration: 0.2 } }}>
                <span className="text-2xl font-black text-stone-900">UGX {fmt(slide.price)}</span>
                <span className="text-xs text-red-500 line-through ml-2">UGX {fmt(slide.oldPrice)}</span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-4 mt-10">
            <a href="#" aria-label="EverGrill on Twitter" className="text-stone-400 hover:text-stone-900 transition-colors">
              <Twitter size={17} aria-hidden="true" />
            </a>
            <a href="#" aria-label="EverGrill on Facebook" className="text-stone-400 hover:text-stone-900 transition-colors">
              <Facebook size={17} aria-hidden="true" />
            </a>
          </div>

          <div className="mt-8">
            <DesktopThumbnails slides={SLIDES} current={current} onSelect={goTo} onPrev={prev} onNext={next} />
          </div>
        </div>

        {/* Right: image + peeking next image + counter */}
        <div className="flex items-center justify-center overflow-hidden">
          <img
            src={nextSlide.image}
            alt=""
            aria-hidden="true"
            className="absolute right-[4rem] top-1/2 -translate-y-1/2 w-54 h-54 object-contain opacity-90"
            style={{ filter: "drop-shadow(0 15px 25px rgba(0,0,0,0.2))" }}
          />

          <AnimatePresence mode="wait" custom={direction}>
            <motion.img
              key={slide.id}
              src={slide.image}
              alt={slide.category}
              custom={direction}
              variants={imageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              style={{ filter: "drop-shadow(0 25px 35px rgba(0,0,0,0.25))" }}
              className="w-[28rem] h-[28rem] object-contain absolute -translate-x-80 z-10"
            />
          </AnimatePresence>
          <motion.div className="absolute inset-0 pointer-events-none" animate={floatAnimation} aria-hidden="true" />

          <div className="absolute bottom-10 right-12 flex items-center gap-2 text-stone-900 font-black text-sm z-10">
            <span>{String(current + 1).padStart(2, "0")}</span>
            <span className="text-stone-900/30">/ {String(SLIDES.length).padStart(2, "0")}</span>
          </div>
        </div>

        {/* Footer */}
        <footer className="absolute bottom-10 left-10 px-6">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 tracking-leading text-sm font-medium">© {year} {BRAND_NAME}. All rights reserved.</p>
            <Link
              to="/returnPolicy"
              className="text-sm font-bold text-orange-600 hover:text-orange-700 transition-colors"
            >
              Return Policy
            </Link>
          </div>
        </footer>
      </div>
    </section>
  );
}

/** Mobile/Tablet Hero - Full stack responsive layout. */
function MobileHero({ carousel }) {
  const BRAND_NAME = "GreenPork";
  const year = useMemo(() => new Date().getFullYear(), []);
  const { current, direction, slide, goTo, next, prev, setIsPaused } = carousel;
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: slide.id,
      name: slide.category,
      category: slide.category,
      price: slide.price,
      image: slide.image,
    });
  };

  return (
    <section
      aria-label="Featured products"
      className="block lg:hidden w-full bg-white relative pt-24 pb-12 px-6 overflow-hidden min-h-screen flex flex-col justify-between"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Soft background yellow blob for visual accent */}
      <div
        aria-hidden="true"
        className="absolute -top-12 -right-12 w-64 h-64 bg-yellow-400 rounded-full blur-3xl opacity-30 pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-24 -left-12 w-48 h-48 bg-yellow-400 rounded-full blur-2xl opacity-20 pointer-events-none"
      />

      <div className="relative flex flex-col flex-grow z-10">
        {/* Copy Header Block */}
        <div className="text-left">
          <AnimatePresence mode="wait">
            <motion.h1
              key={`m-title-${slide.id}`}
              {...fadeUp(0.05)}
              exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
              className="text-3xl sm:text-4xl font-black leading-[1.2] text-stone-900 max-w-sm"
            >
              {slide.title}
            </motion.h1>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.p
              key={`m-desc-${slide.id}`}
              {...fadeUp(0.1)}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              className="text-stone-500 leading-relaxed mt-2 max-w-md text-xs sm:text-sm"
            >
              {slide.description}
            </motion.p>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div key={`m-spice-${slide.id}`} {...fadeUp(0.14)} exit={{ opacity: 0, transition: { duration: 0.2 } }}>
              <SpicePills active={slide.spiceLevel} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Center: Image Frame with soft flat contrast backing */}
        <div className="relative my-8 flex items-center justify-center w-full h-64 sm:h-80 select-none">
          <div aria-hidden="true" className="absolute w-44 h-44 sm:w-56 sm:h-56 bg-yellow-400 rounded-full opacity-90" />
          
          <AnimatePresence mode="wait" custom={direction}>
            <motion.img
              key={slide.id}
              src={slide.image}
              alt={slide.category}
              custom={direction}
              variants={imageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              style={{ filter: "drop-shadow(0 15px 25px rgba(0,0,0,0.15))" }}
              className="w-56 h-56 sm:w-64 sm:h-64 object-contain z-10"
            />
          </AnimatePresence>
          <motion.div className="absolute inset-0 pointer-events-none" animate={floatAnimation} aria-hidden="true" />
        </div>

        {/* Bottom Block: Pricing, Cart Trigger, & Controls */}
        <div className="mt-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <AnimatePresence mode="wait">
              <motion.div key={`m-price-${slide.id}`} {...fadeUp(0.18)} exit={{ opacity: 0, transition: { duration: 0.2 } }} className="text-left">
                <span className="text-2xl font-black text-stone-900 block leading-none">UGX {fmt(slide.price)}</span>
                <span className="text-xs text-red-500 line-through mt-1 block">UGX {fmt(slide.oldPrice)}</span>
              </motion.div>
            </AnimatePresence>

            <button
              type="button"
              onClick={handleAddToCart}
              aria-label={`Add ${slide.category} to cart`}
              className="w-full sm:w-auto text-center justify-center inline-flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs sm:text-sm px-6 py-4 rounded-full transition-colors uppercase tracking-wide focus:outline-none"
            >
              Add to cart
            </button>
          </div>

          {/* Pagination & Navigation controls */}
          <div className="flex items-center justify-between pt-4 border-t border-stone-100">
            {/* Slide Dots Indicator */}
            <div className="flex gap-1.5" role="group" aria-label="Slide indicators">
              {SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => goTo(idx)}
                  className={`h-2 rounded-full transition-all duration-300 focus:outline-none ${
                    current === idx ? "w-6 bg-orange-500" : "w-2 bg-stone-200 hover:bg-stone-300"
                  }`}
                  aria-label={`Go to product ${idx + 1}`}
                />
              ))}
            </div>

            {/* Tactical arrows */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous product"
                className="h-10 w-10 rounded-full border border-stone-200 flex items-center justify-center bg-white text-stone-900 hover:bg-stone-50 transition-colors focus:outline-none"
              >
                <ChevronLeft size={16} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next product"
                className="h-10 w-10 rounded-full bg-stone-900 text-white flex items-center justify-center hover:bg-stone-800 transition-colors focus:outline-none"
              >
                <ChevronRight size={16} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer block */}
      <footer className="mt-12 pt-6 border-t border-stone-100 z-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p className="text-stone-400 text-xs font-medium">© {year} {BRAND_NAME}. All rights reserved.</p>
          <Link
            to="/returnPolicy"
            className="text-xs font-bold text-orange-600 hover:text-orange-700 transition-colors"
          >
            Return Policy
          </Link>
        </div>
      </footer>
    </section>
  );
}

// ─── Main component ─────────────────────────────────────────────────────
export default function Hero() {
  const carousel = useSlideCarousel();

  return (
    <div className="w-full min-h-screen">
      <DesktopHero carousel={carousel} />
      <MobileHero carousel={carousel} />
    </div>
  );
}