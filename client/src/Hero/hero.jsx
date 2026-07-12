import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft, ChevronRight, ChevronDown,
  ShoppingBasket, Leaf, Truck, ShieldCheck,
  Star, Clock, Flame, Minus, Plus,
  MoreVertical, Heart, ArrowUpRight,
} from "lucide-react";
import { useCart } from "../components/cart/CartContext";

import FreshPork from "../assets/freshporke.png";
import PorkStake from "../assets/ChatGPT Image Jun 18, 2026, 03_34_25 PM.png";
import Burger from "../assets/Burger.png";
import Pizza from "../assets/pizza(17).png";
import Chicken from "../assets/pngwing.com (25).png";

// ─── CONFIGURATION ───────────────────────────────────────────────────────────
const WHATSAPP_NUMBER = "256776464823";
const AUTOPLAY_INTERVAL_MS = 5500;
const SPICE_LEVELS = ["Mild", "Spicy", "Hot"];
const SPICE_SHORT = { Mild: "M", Spicy: "S", Hot: "H" };

// Brand palette
// White      #FFFFFF  — backgrounds
// Grill Orange #F97316 — primary brand color, buttons, highlights
// Golden Yellow #FFC107 — offers, badges, special items

const FEATURES = [
  { icon: Leaf, label: "100% Fresh", sub: "Ingredients" },
  { icon: Truck, label: "Fast Delivery", sub: "30 Min" },
  { icon: ShieldCheck, label: "Best Quality", sub: "Guaranteed" },
];

const SLIDES = [
  {
    id: "pork-skewer",
    eyebrow: "Premium Quality",
    title: ["We make the", "SMOKY", "PORK SKEWER"],
    category: "Pork Skewer",
    spiceLevel: "Mild",
    image: PorkStake,
    price: 6000,
    oldPrice: 8000,
    rating: 4.4,
    prepTime: "12 min",
    description: "Roasted pork with fried cassava, salad, chapati, and bananas.",
  },
  {
    id: "beef-burger",
    eyebrow: "Premium Quality",
    title: ["We make the", "DOUBLE", "CHEESY BURGER"],
    category: "Classic Beef Burger",
    spiceLevel: "Spicy",
    image: Burger,
    price: 10000,
    oldPrice: 12000,
    rating: 4.7,
    prepTime: "10 min",
    description: "Juicy grilled beef patty layered with fresh lettuce, cheese, tomato and creamy sauce.",
  },
  {
    id: "chicken-pizza",
    eyebrow: "Premium Quality",
    title: ["We make the", "CHEESY", "CLASSIC PIZZA"],
    category: "Classic Chicken Pizza",
    spiceLevel: "Mild",
    image: Pizza,
    price: 10000,
    oldPrice: 12000,
    rating: 4.7,
    prepTime: "18 min",
    description: "Hand-tossed crust topped with grilled chicken, mozzarella and house tomato sauce.",
  },
  {
    id: "fresh-pork",
    eyebrow: "Premium Quality",
    title: ["We make the", "FARMHOUSE", "FRESH CUT"],
    category: "Fresh Organic Pork",
    spiceLevel: "Mild",
    image: FreshPork,
    price: 16000,
    oldPrice: 18000,
    rating: 4.5,
    prepTime: "8 min",
    description: "Premium farm-fresh pork cuts, hygienically prepared and ready for your recipes.",
  },
  {
    id: "spicy-chicken",
    eyebrow: "Premium Quality",
    title: ["We make the", "FIRECRACKER", "CHICKEN"],
    category: "Crispy Spicy Chicken",
    spiceLevel: "Hot",
    image: Chicken,
    price: 55000,
    oldPrice: 78000,
    rating: 4.5,
    prepTime: "15 min",
    description: "Double-fried spiced chicken pieces, finished with our signature hot glaze.",
  },
];

const fmt = (n) => Number(n).toLocaleString();

// ─── MOTION VARIANTS ─────────────────────────────────────────────────────────
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

// ─── SHARED HOOK: CAROUSEL STATE ─────────────────────────────────────────────
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

// ─── LOCAL SUB-COMPONENTS ────────────────────────────────────────────────────
function SpicePills({ active }) {
  return (
    <div className="flex items-center gap-2 mt-4" role="group" aria-label="Spice level">
      {SPICE_LEVELS.map((level) => {
        const isActive = level === active;
        return (
          <span
            key={level}
            aria-current={isActive}
            className={`px-3.5 py-1.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wide transition-colors duration-200 ${isActive
              ? "bg-[#F97316] text-white"
              : "bg-stone-50 text-stone-500"
              }`}
          >
            {level}
          </span>
        );
      })}
    </div>
  );
}

function DesktopThumbnailRail({ slides, current, onSelect, onPrev, onNext }) {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={onPrev}
        aria-label="Previous product"
        className="h-11 w-11 flex-shrink-0 rounded-full bg-stone-50 hover:bg-stone-100 flex items-center justify-center text-stone-900 transition-colors"
      >
        <ChevronLeft size={16} aria-hidden="true" />
      </button>

      <div className="flex items-center gap-3">
        {slides.map((s, index) => {
          const isActive = current === index;
          return (
            <button
              key={s.id}
              type="button"
              aria-label={`Show ${s.category}`}
              aria-current={isActive}
              onClick={() => onSelect(index)}
              className={`h-14 w-14 rounded-2xl overflow-hidden bg-stone-50 transition-all duration-200 ${isActive ? "ring-2 ring-[#FFC107] scale-105 shadow-md" : "opacity-70 hover:opacity-100"
                }`}
            >
              <img src={s.image} alt="" aria-hidden="true" className="h-full w-full object-cover" />
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={onNext}
        aria-label="Next product"
        className="h-11 w-11 flex-shrink-0 rounded-full bg-stone-900 text-white flex items-center justify-center hover:bg-stone-800 transition-colors"
      >
        <ChevronRight size={16} aria-hidden="true" />
      </button>
    </div>
  );
}

// ─── DESKTOP HERO VIEW ───────────────────────────────────────────────────────
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
      className="hidden lg:block w-full h-screen overflow-hidden bg-white"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Diagonal golden-yellow panel */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[#FFC107]"
        style={{ clipPath: "polygon(58% 0, 100% 0, 100% 100%, 38% 100%)" }}
      />

      <div className="relative grid grid-cols-2 min-h-[38rem] h-full">

        {/* Left: copy */}
        <div className="flex flex-col justify-center px-16 py-16 max-w-xl">
          {/* Eyebrow tag */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`eyebrow-${slide.id}`}
              {...fadeUp(0)}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              className="flex items-center gap-2 mb-4"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#F97316]" aria-hidden="true" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-stone-500">
                {slide.eyebrow}
              </span>
              <span className="h-px w-10 bg-stone-200" aria-hidden="true" />
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.h1
              key={`title-${slide.id}`}
              {...fadeUp(0.05)}
              exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
              className="leading-[1.05] max-w-md animate-none"
            >
              <span className="block text-lg font-semibold text-stone-500">{slide.title[0]}</span>
              <span className="block text-5xl xl:text-6xl font-black text-stone-900 tracking-tight">{slide.title[1]}</span>
              <span className="block text-3xl xl:text-4xl font-black text-[#F97316] tracking-tight">{slide.title[2]}</span>
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

          {/* CTA row: Order Now + Circular price badge */}
          <div className="flex items-center gap-5 mt-7">
            <button
              type="button"
              onClick={handleAddToCart}
              aria-label={`Add ${slide.category} to cart`}
              className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-sm px-2.5 py-2.5 rounded-full transition-colors uppercase tracking-wide"
            >
              <div className="bg-white rounded-full mr-2 p-2 text-[#F97316]">
                <ShoppingBasket size={18} />
              </div>
              Order Now
            </button>

            <AnimatePresence mode="wait">
              <motion.div
                key={`price-badge-${slide.id}`}
                {...fadeUp(0.15)}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                className="z-20 h-28 w-28 rounded-full bg-white flex flex-col items-center justify-center shadow-2xl shadow-stone-200/50"
              >
                <span className="text-[10px] font-bold uppercase tracking-wide text-stone-400">Only</span>
                <span className="text-[10px] font-bold uppercase tracking-wide text-stone-400 -mt-0.5">UGX</span>
                <span className="text-md font-black text-[#F97316] leading-tight mt-0.5">{fmt(slide.price)}</span>
                <span className="text-[10px] text-stone-400 line-through">{fmt(slide.oldPrice)}</span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Feature icons row */}
          <div className="flex items-center gap-6 mt-9">
            {FEATURES.map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-center gap-2">
                <span className="h-9 w-9 rounded-full bg-stone-50 flex items-center justify-center text-[#F97316] flex-shrink-0">
                  <Icon size={16} aria-hidden="true" />
                </span>
                <div className="leading-tight">
                  <p className="text-xs font-bold text-stone-900">{label}</p>
                  <p className="text-[11px] text-stone-400">{sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Thumbnail rail */}
          <div className="mt-9 absolute bottom-5 right-0 -translate-x-1/2">
            <DesktopThumbnailRail slides={SLIDES} current={current} onSelect={goTo} onPrev={prev} onNext={next} />
          </div>
        </div>

        {/* Right: image + peeking next image */}
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

          <div className="absolute bottom-5 right-12 flex items-center gap-2 text-stone-900 font-black text-sm z-10">
            <span>{String(current + 1).padStart(2, "0")}</span>
            <span className="text-stone-900/30">/ {String(SLIDES.length).padStart(2, "0")}</span>
          </div>
        </div>

        {/* Footer */}
        <footer className="absolute bottom-5 left-10 px-6">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-black text-xs font-medium">© {year} {BRAND_NAME}. All rights reserved.</p>
            <Link
              to="/returnPolicy"
              className="text-xs font-bold text-[#F97316] hover:text-[#EA580C] transition-colors"
            >
              Return Policy
            </Link>
          </div>
        </footer>
      </div>
    </section>
  );
}

// ─── MOBILE HERO VIEW ────────────────────────────────────────────────────────
// Layout matches the reference design 1:1 (back / menu bar, hero image on a
// backdrop circle with a floating info pill, quantity pill, detail card,
// delivery/rating row, related-item thumbnails, sticky checkout bar) but
// re-skinned entirely in the EverGrill brand palette: white surfaces,
// golden-yellow backdrop, grill-orange accents.
function MobileHero({ carousel }) {
  const { current, direction, slide, goTo, next, prev, setIsPaused } = carousel;
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setQuantity(1);
  }, [slide.id]);

  const handleAddToCart = () => {
    addToCart({
      id: slide.id,
      name: slide.category,
      category: slide.category,
      price: slide.price,
      image: slide.image,
      quantity,
    });
  };

  return (
    <section
      aria-label="Featured products"
      className="flex lg:hidden w-full h-[90vh]  bg-white relative// absolute top-14 flex-col overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative z-10 flex flex-col h-full px-5 pt-5 pb-5">



        {/* Product image showcase */}
        <div className="relative flex-1 flex items-center justify-center min-h-0">
          <div className="relative w-full h-full flex items-center justify-center select-none">
            {/* Backdrop circle */}
            <div aria-hidden="true" className="absolute w-56 h-56 sm:w-64 sm:h-64 bg-[#FFC107] rounded-full" />

            {/* Floating info pill */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`m-badge-${slide.id}`}
                {...fadeUp(0.05)}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                className="absolute top-2 right-2 flex items-center gap-1.5 bg-stone-900 text-white text-xs font-bold px-3.5 py-2 rounded-full z-20"
              >
                <Flame size={13} className="text-[#F97316]" aria-hidden="true" />
                {slide.prepTime} Prep
              </motion.div>
            </AnimatePresence>

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
                style={{ filter: "drop-shadow(0 20px 35px rgba(0,0,0,0.18))" }}
                className="w-64 h-64 sm:w-72 sm:h-72 object-contain z-10"
              />
            </AnimatePresence>
            <motion.div className="absolute inset-0 pointer-events-none" animate={floatAnimation} aria-hidden="true" />
          </div>
        </div>

        {/* Quantity pill */}
        <div className="flex items-center justify-center flex-shrink-0 mb-4">
          <div className="flex items-center gap-5 bg-stone-50 rounded-full px-5 py-2.5">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              aria-label="Decrease quantity"
              className="text-stone-500"
            >
              <Minus size={15} aria-hidden="true" />
            </button>
            <span className="text-sm font-bold text-stone-900 w-4 text-center">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              aria-label="Increase quantity"
              className="text-[#F97316]"
            >
              <Plus size={15} aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Detail card: title, description, delivery/rating */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`m-card-${slide.id}`}
            {...fadeUp(0.08)}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            className="bg-stone-50 rounded-3xl px-5 py-5 flex-shrink-0"
          >
            <h1 className="text-xl font-black text-stone-900 tracking-tight leading-tight">{slide.category}</h1>
            <p className="text-stone-400 leading-relaxed text-xs mt-2">{slide.description}</p>

            <div className="h-px bg-stone-200 my-4" aria-hidden="true" />

            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-stone-900">Delivery Time</p>
                <div className="flex items-center gap-1.5 text-stone-500 text-xs font-semibold mt-1">
                  <Clock size={13} aria-hidden="true" />
                  30 Minutes
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center justify-end gap-1.5 text-sm font-bold text-stone-900">
                  <Star size={14} className="text-[#FFC107] fill-[#FFC107]" aria-hidden="true" />
                  {slide.rating}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Related thumbnails + show more */}
        <div className="flex items-center justify-center gap-3 mt-4 flex-shrink-0">
          {SLIDES.map((s, idx) => (
            <button
              key={s.id}
              type="button"
              onClick={() => goTo(idx)}
              aria-label={`Show ${s.category}`}
              aria-current={current === idx}
              className={`h-11 w-11 rounded-full overflow-hidden bg-stone-50 flex-shrink-0 transition-all duration-200 ${current === idx ? "ring-2 ring-[#F97316] scale-105" : "opacity-70"
                }`}
            >
              <img src={s.image} alt="" aria-hidden="true" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>


        {/* Sticky checkout bar */}
        <div className="flex items-center gap-3 mt-4 flex-shrink-0">
          <div className="flex-shrink-0">
            <span className="block text-lg font-black text-stone-900">UGX {fmt(slide.price)}</span>

          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            aria-label={`Add ${quantity} ${slide.category} to cart`}
            className="flex-1 inline-flex items-center justify-center gap-2 bg-[#F97316] hover:bg-[#EA580C] text-white font-extrabold text-sm py-4 rounded-full transition-colors uppercase tracking-wide"
          >
            <ShoppingBasket size={16} aria-hidden="true" />
            Add to cart
          </button>

          <button
            type="button"
            onClick={next}
            aria-label="Next product"
            className="h-14 w-14 flex-shrink-0 rounded-full bg-[#FFC107] text-stone-900 flex items-center justify-center"
          >
            <ChevronRight size={20} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── MAIN CAROUSEL COMPONENT ─────────────────────────────────────────────────
export default function Hero() {
  const carousel = useSlideCarousel();

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden select-none bg-white">
      <DesktopHero carousel={carousel} />
      <MobileHero carousel={carousel} />
    </div>
  );
}