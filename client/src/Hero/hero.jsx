import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Star,
  StarHalf,
  ShoppingBasket,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Twitter,
  Facebook,
} from "lucide-react";
import { FaTiktok } from "react-icons/fa6";

import Navbar from "../components/Navbar/Navbar";
import green from "../assets/Evergrill.png";
import FreshPork from "../assets/freshporke.png";
import PorkStake from "../assets/ChatGPT Image Jun 18, 2026, 03_34_25 PM.png";
import Burger from "../assets/Burger.png";
import Pizza from "../assets/pizza(17).png";
import Chicken from "../assets/pngwing.com (25).png";

// ─── Config ──────────────────────────────────────────────────────────────
const WHATSAPP_NUMBER = "256776464823";
const AUTOPLAY_INTERVAL_MS = 5000;

const COLORS = {
  primary: "#F97316",
  secondary: "#DC2626",
  accent: "#FACC15",
  success: "#0EDB0E",
};

/**
 * Slide data lives outside the component so it is never recreated on render.
 * Each slide is a self-contained product offer.
 */
const SLIDES = [
  {
    id: "pork-skewer",
    title: "Pork Skewer",
    image: PorkStake,
    price: "UGX 6,000",
    oldPrice: "UGX 8,000",
    rating: 4.4,
    slogan: "Smoky in every taste.",
    description: "Roasted pork with fried cassava, salad, chapati, and bananas.",
  },
  {
    id: "beef-burger",
    title: "Classic Beef Burger",
    image: Burger,
    price: "UGX 10,000",
    oldPrice: "UGX 12,000",
    rating: 4.7,
    slogan: "Bold, tasty bite.",
    description: "Juicy grilled beef patty with fresh lettuce, cheese, tomato and creamy sauce.",
  },
  {
    id: "chicken-pizza",
    title: "Classic Chicken Pizza",
    image: Pizza,
    price: "UGX 10,000",
    oldPrice: "UGX 12,000",
    rating: 4.7,
    slogan: "Crust. Cheese. Joy.",
    description: "Hand-tossed crust topped with grilled chicken, mozzarella and house tomato sauce.",
  },
  {
    id: "fresh-pork",
    title: "Fresh Organic Pork",
    image: FreshPork,
    price: "UGX 16,000",
    oldPrice: "UGX 18,000",
    rating: 4.5,
    slogan: "Pure. Fresh. Trusted.",
    description: "Premium farm-fresh pork cuts, hygienically prepared and ready for your recipes.",
  },
  {
    id: "spicy-chicken",
    title: "Crispy Spicy Chicken",
    image: Chicken,
    price: "UGX 55,000",
    oldPrice: "UGX 78,000",
    rating: 4.5,
    slogan: "Crispy. Juicy. Bold.",
    description: "Double-fried spiced chicken pieces, finished with our signature hot glaze.",
  },
];

// ─── Animation variants ─────────────────────────────────────────────────
const imageVariants = {
  enter: (direction) => ({
    opacity: 0,
    x: direction === "right" ? 80 : -80,
    scale: 0.85,
    rotate: direction === "right" ? 6 : -6,
  }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
    rotate: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
  exit: (direction) => ({
    opacity: 0,
    x: direction === "right" ? -60 : 60,
    scale: 0.9,
    transition: { duration: 0.3, ease: "easeIn" },
  }),
};

const floatAnimation = {
  y: [0, -14, 0],
  transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
};

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] } },
});

// ─── Subcomponents ──────────────────────────────────────────────────────

/** Product image stage with glow, drag-free crossfade/slide transition. */
function SlideVisual({ slide, direction }) {
  return (
    <div className="relative flex items-center justify-center h-72 sm:h-80 md:h-[28rem]">
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(249,115,22,0.25) 0%, transparent 70%)",
        }}
      />
      <AnimatePresence mode="wait" custom={direction}>
        <motion.img
          key={slide.id}
          src={slide.image}
          alt={slide.title}
          custom={direction}
          variants={imageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          style={{ filter: "drop-shadow(0 20px 40px rgba(249,115,22,0.35))" }}
          className="w-64 h-64 sm:w-80 sm:h-80 md:w-[30rem] md:h-[30rem] object-contain"
        />
      </AnimatePresence>
      {/* Continuous idle float, decoupled from the slide-change transition */}
      <motion.div className="absolute inset-0 pointer-events-none" animate={floatAnimation} />
    </div>
  );
}

/** Text content: slogan, rating, description, price, CTA. */
function SlideContent({ slide }) {
  const whatsappHref = useMemo(() => {
    const message = `I want to order ${slide.title} at ${slide.price}`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }, [slide.title, slide.price]);

  return (
    <div className="flex flex-col items-center md:items-start text-center md:text-left gap-3 px-6 md:px-0 max-w-md">
      <motion.h3
        key={`slogan-${slide.id}`}
        {...fadeUp(0.05)}
        className="text-xl sm:text-2xl font-extrabold font-serif"
        style={{ color: COLORS.success }}
      >
        # {slide.slogan}
      </motion.h3>

      <motion.h1
        key={`title-${slide.id}`}
        {...fadeUp(0.1)}
        className="text-3xl sm:text-4xl font-serif font-extrabold uppercase text-stone-900"
      >
        {slide.title}
      </motion.h1>

      <motion.div
        key={`rating-${slide.id}`}
        {...fadeUp(0.15)}
        className="flex items-center gap-2"
      >
        <span className="flex" role="img" aria-label={`Rated ${slide.rating} out of 5`}>
          {[...Array(4)].map((_, i) => (
            <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
          ))}
          <StarHalf className="w-5 h-5 text-yellow-400 fill-yellow-400" />
        </span>
        <span className="text-stone-700 font-medium">{slide.rating}</span>
        <span
          className="text-white text-xs font-bold px-2 py-1 rounded-full"
          style={{ backgroundColor: COLORS.secondary }}
        >
          -20% off
        </span>
      </motion.div>

      <motion.p
        key={`desc-${slide.id}`}
        {...fadeUp(0.2)}
        className="text-stone-600 leading-relaxed hidden sm:block"
      >
        {slide.description}
      </motion.p>

      <motion.div
        key={`price-${slide.id}`}
        {...fadeUp(0.28)}
        className="flex items-baseline gap-3 mt-1"
      >
        <span className="text-3xl sm:text-4xl font-black text-stone-900">{slide.price}</span>
        <span className="text-lg text-stone-400 line-through">{slide.oldPrice}</span>
      </motion.div>

      <motion.a
        key={`cta-${slide.id}`}
        {...fadeUp(0.36)}
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Order ${slide.title} on WhatsApp`}
        className="group mt-2 bg-white rounded-full pl-2 pr-5 py-2 flex items-center gap-3 shadow-xl hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 border border-stone-200"
      >
        <span
          className="h-11 w-11 rounded-full flex items-center justify-center group-hover:rotate-6 transition-transform duration-300"
          style={{ backgroundColor: COLORS.primary }}
        >
          <ShoppingBasket size={20} className="text-white" aria-hidden="true" />
        </span>
        <span className="flex flex-col items-start leading-tight">
          <span className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold">
            Fast delivery
          </span>
          <span className="text-base font-extrabold" style={{ color: COLORS.primary }}>
            Order now
          </span>
        </span>
        <ArrowRight
          size={18}
          style={{ color: COLORS.primary }}
          className="group-hover:translate-x-1 transition-transform duration-300"
          aria-hidden="true"
        />
      </motion.a>
    </div>
  );
}

/** Prev/next arrows + dot pagination. */
function CarouselControls({ slides, current, onSelect, onPrev, onNext }) {
  return (
    <>
      <div className="hidden md:flex gap-3 absolute right-6 bottom-8 z-20">
        <button
          type="button"
          onClick={onPrev}
          aria-label="Previous slide"
          className="bg-white/70 hover:bg-white text-stone-900 p-3 rounded-full shadow-lg backdrop-blur-md transition-colors duration-300"
        >
          <ChevronLeft size={26} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={onNext}
          aria-label="Next slide"
          className="bg-white/70 hover:bg-white text-stone-900 p-3 rounded-full shadow-lg backdrop-blur-md transition-colors duration-300"
        >
          <ChevronRight size={26} aria-hidden="true" />
        </button>
      </div>

      <div
        className="flex md:flex-col gap-2 absolute bottom-4 md:bottom-auto md:top-1/2 md:-translate-y-1/2 left-1/2 md:left-6 -translate-x-1/2 md:translate-x-0 z-20"
        role="tablist"
        aria-label="Featured products"
      >
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            role="tab"
            aria-selected={current === index}
            aria-label={`Show ${slide.title}`}
            onClick={() => onSelect(index)}
            className="w-8 h-1.5 md:w-1.5 md:h-8 rounded-full transition-colors duration-300"
            style={{ backgroundColor: current === index ? COLORS.accent : "rgba(0,0,0,0.15)" }}
          />
        ))}
      </div>
    </>
  );
}

/** Bottom brand bar: logo, social links, copyright. */
function BrandFooterBar({ year }) {
  return (
    <footer className="relative z-10 w-full">
      <div
        className="mx-auto max-w-3xl rounded-t-[2.5rem] px-6 sm:px-12 py-4 flex items-center justify-between gap-4"
        style={{ backgroundColor: COLORS.accent }}
      >
        <Link to="/" className="shrink-0" aria-label="EverGrill home">
          <img src={green} alt="EverGrill" className="w-24 sm:w-28" />
        </Link>

        <div className="hidden sm:block bg-white h-8 w-px rounded-full" aria-hidden="true" />

        <nav aria-label="Social media" className="flex items-center gap-3">
          <a
            href="#"
            aria-label="EverGrill on Twitter"
            className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center hover:scale-110 transition-transform"
          >
            <Twitter size={18} aria-hidden="true" />
          </a>
          <a
            href="#"
            aria-label="EverGrill on Facebook"
            className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center hover:scale-110 transition-transform"
          >
            <Facebook size={18} aria-hidden="true" />
          </a>
          <a
            href="#"
            aria-label="EverGrill on TikTok"
            className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center hover:scale-110 transition-transform"
          >
            <FaTiktok size={18} aria-hidden="true" />
          </a>
        </nav>

        <div className="hidden sm:block bg-white h-8 w-px rounded-full" aria-hidden="true" />

        <p className="text-stone-900/80 font-semibold text-xs sm:text-sm whitespace-nowrap">
          &copy; {year} EverGrill
        </p>
      </div>
    </footer>
  );
}

// ─── Main component ─────────────────────────────────────────────────────
export default function Hero() {
  const year = useMemo(() => new Date().getFullYear(), []);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState("right");
  const [isPaused, setIsPaused] = useState(false);

  const goTo = useCallback(
    (index) => {
      setDirection(index > current ? "right" : "left");
      setCurrent(index);
    },
    [current]
  );

  const next = useCallback(() => {
    setDirection("right");
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prev = useCallback(() => {
    setDirection("left");
    setCurrent((prevIndex) => (prevIndex === 0 ? SLIDES.length - 1 : prevIndex - 1));
  }, []);

  // Respect reduced-motion preference: skip autoplay entirely if requested.
  const prefersReducedMotion = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches,
    []
  );

  useEffect(() => {
    if (isPaused || prefersReducedMotion) return undefined;
    const interval = setInterval(next, AUTOPLAY_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [isPaused, prefersReducedMotion, next]);

  const slide = SLIDES[current];

  return (
    <section
      aria-label="Featured products"
      className="relative w-full min-h-screen bg-white overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <Navbar />

      <div className="relative flex flex-col md:flex-row items-center justify-center md:justify-between max-w-6xl mx-auto px-6 md:px-12 pt-28 md:pt-32 pb-40 gap-8">
        <div className="order-2 md:order-1">
          <SlideContent slide={slide} />
        </div>
        <div className="order-1 md:order-2 flex-1 flex justify-center">
          <SlideVisual slide={slide} direction={direction} />
        </div>
      </div>

      <CarouselControls
        slides={SLIDES}
        current={current}
        onSelect={goTo}
        onPrev={prev}
        onNext={next}
      />

      <div className="absolute bottom-0 left-0 right-0">
        <BrandFooterBar year={year} />
      </div>
    </section>
  );
}