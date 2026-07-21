import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft, ChevronRight,
  ShoppingBasket, Leaf, Truck, ShieldCheck,
  Star, Clock, Flame, Minus, Plus, ArrowRight,
} from "lucide-react";
import { useCart } from "../components/cart/CartContext";

import FreshPork from "../assets/freshporke.png";
import PorkStake from "../assets/ChatGPT Image Jun 18, 2026, 03_34_25 PM.png";
import Burger from "../assets/Burger.png";
import Pizza from "../assets/pizza(17).png";
import Chicken from "../assets/pngwing.com (25).png";

// ─── Config & Data ─────────────────────────────────────────────────────────
const AUTOPLAY_MS = 5500;
const BRAND_NAME = "GreenPork";
const SPICE_LEVELS = ["Mild", "Spicy", "Hot"];

const FEATURES = [
  { key: "fresh", icon: Leaf, label: "100% Fresh", sub: "Ingredients" },
  { key: "delivery", icon: Truck, label: "Fast Delivery", sub: "30 Min" },
  { key: "quality", icon: ShieldCheck, label: "Best Quality", sub: "Guaranteed" },
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
    title: ["We make the", "CHEESY BURGER"],
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
    title: ["We make the", "CHEESY", "PIZZA"],
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
const calcDiscount = (price, oldPrice) => Math.round(((oldPrice - price) / oldPrice) * 100);

// ─── Animation Variants ────────────────────────────────────────────────────
const imageVariants = {
  enter: (dir) => ({ opacity: 0, x: dir === "right" ? 80 : -80, scale: 0.88, rotate: dir === "right" ? 2 : -2 }),
  center: { opacity: 1, x: 0, scale: 1, rotate: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  exit: (dir) => ({ opacity: 0, x: dir === "right" ? -60 : 60, scale: 0.92, transition: { duration: 0.28, ease: "easeIn" } }),
};

const badgeVariants = {
  initial: { opacity: 0, scale: 0.8, y: 10 },
  animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, scale: 0.92, transition: { duration: 0.2 } },
};

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.2 } },
});

// ─── Custom Hook: Carousel Logic ───────────────────────────────────────────
function useSlideCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState("right");
  const [isPaused, setIsPaused] = useState(false);
  const total = SLIDES.length;

  const goTo = useCallback((index) => {
    setDirection(index > current ? "right" : "left");
    setCurrent(index);
  }, [current]);

  const next = useCallback(() => {
    setDirection("right");
    setCurrent((prev) => (prev + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setDirection("left");
    setCurrent((i) => (i === 0 ? total - 1 : i - 1));
  }, [total]);

  const prefersReducedMotion = useMemo(
    () => typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches,
    []
  );

  // Autoplay timer
  useEffect(() => {
    if (isPaused || prefersReducedMotion) {
      return undefined;
    }
    const timeout = setTimeout(next, AUTOPLAY_MS);
    return () => clearTimeout(timeout);
  }, [isPaused, prefersReducedMotion, next, current]);

  // Keyboard Navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  return {
    current, direction, isPaused, prefersReducedMotion, setIsPaused, goTo, next, prev,
    slide: SLIDES[current], nextSlide: SLIDES[(current + 1) % total], total,
  };
}

// ─── Sub-Components ────────────────────────────────────────────────────────

function SpicePills({ active }) {
  return (
    <div className="flex items-center gap-2" role="group" aria-label="Spice level">
      {SPICE_LEVELS.map((level) => {
        const isActive = level === active;
        return (
          <span
            key={level}
            aria-current={isActive || undefined}
            className={`px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all duration-200 select-none ${isActive
                ? "bg-[#0edb0e] text-stone-950 shadow-sm shadow-[#0edb0e]/20"
                : "bg-stone-100 text-stone-400 hover:text-stone-600 hover:bg-stone-200/60"
              }`}
          >
            {level}
          </span>
        );
      })}
    </div>
  );
}

function CarouselProgress({ current, isPaused, prefersReducedMotion }) {
  const active = !isPaused && !prefersReducedMotion;
  return (
    <div className="h-[2px] w-full bg-stone-200/40 overflow-hidden" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-label="Slide progress">
      <motion.div
        key={`${current}-${active}`}
        initial={{ width: "0%" }}
        animate={{ width: active ? "100%" : "0%" }}
        transition={{ duration: active ? AUTOPLAY_MS / 1000 : 0, ease: "linear" }}
        className="h-full bg-[#0edb0e] rounded-full origin-left"
      />
    </div>
  );
}

function ProductBadge({ slide }) {
  const discount = calcDiscount(slide.price, slide.oldPrice);
  return (
    <AnimatePresence mode="wait">
      <motion.div key={slide.id} variants={badgeVariants} initial="initial" animate="animate" exit="exit" className="relative flex-shrink-0">
        <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }} className="absolute -top-3 -right-3 bg-red-500 text-white text-[10px] font-black uppercase tracking-wide px-2.5 py-1 rounded-full z-10 shadow-lg shadow-red-500/25">
          −{discount}%
        </motion.div>
        <div className="w-[7.5rem] h-[7.5rem] rounded-2xl bg-white/80// bg backdrop-blur-lg flex flex-col items-center justify-center border-none border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.06)]// p-2">
          <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-stone-400">UGX</span>
          <span className="text-xl font-black text-[#0edb0e] leading-tight mt-0.5">{fmt(slide.price)}</span>
          <div className="h-px w-8 bg-stone-200/80 my-1" aria-hidden="true" />
          <span className="text-[11px] text-stone-400 line-through">{fmt(slide.oldPrice)}</span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function FeatureHighlights() {
  return (
    <div className="flex items-center gap-8">
      {FEATURES.map(({ key, icon: Icon, label, sub }) => (
        <div key={key} className="flex items-center gap-3 group">
          <span className="h-10 w-10 rounded-xl bg-stone-100 flex items-center justify-center text-[#0edb0e] flex-shrink-0 group-hover:bg-[#0edb0e]/5 transition-colors duration-200">
            <Icon size={17} aria-hidden="true" />
          </span>
          <div className="leading-tight">
            <p className="text-[13px] font-bold text-stone-800">{label}</p>
            <p className="text-[11px] text-stone-400 font-medium">{sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function ThumbnailRail({ slides, current, onSelect, onPrev, onNext }) {
  return (
    <nav className="flex items-center gap-3 select-none" aria-label="Product navigation">
      <button type="button" onClick={onPrev} aria-label="Previous product" className="h-11 w-11 flex-shrink-0 rounded-full border border-stone-200 bg-white flex items-center justify-center hover:border-stone-300 hover:bg-stone-50 transition-all duration-200 active:scale-95">
        <ChevronLeft size={16} className="text-stone-500" aria-hidden="true" />
      </button>
      <div className="flex items-center gap-2.5">
        {slides.map((s, index) => {
          const isActive = current === index;
          return (
            <button key={s.id} type="button" aria-label={`Show ${s.category}`} aria-current={isActive || undefined} onClick={() => onSelect(index)} className={`relative h-[3.25rem] w-[3.25rem] rounded-2xl overflow-hidden bg-stone-100 transition-all duration-300 active:scale-95 ${isActive ? "ring-2 ring-[#0edb0e] ring-offset-2 scale-110 shadow-lg shadow-[#0edb0e]/10" : "opacity-50 hover:opacity-80 hover:scale-105"}`}>
              <img src={s.image} alt="" aria-hidden="true" className="h-full w-full object-cover" loading="lazy" />
            </button>
          );
        })}
      </div>
      <button type="button" onClick={onNext} aria-label="Next product" className="h-11 w-11 flex-shrink-0 rounded-full bg-stone-900 text-white flex items-center justify-center hover:bg-stone-800 transition-all duration-200 active:scale-95 shadow-md">
        <ChevronRight size={16} aria-hidden="true" />
      </button>
    </nav>
  );
}

function HeroContent({ slide, onAddToCart }) {
  return (
    <div className="flex flex-col justify-center px-14 xl:px-20 max-w-[560px] h-full">
      <AnimatePresence mode="wait">
        <motion.div key={`eyebrow-${slide.id}`} {...fadeUp(0)} className="flex items-center hidden gap-2.5 mb-5">
          <motion.span className="h-2 w-2 rounded-full bg-[#0edb0e]" aria-hidden="true" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] hidden text-stone-500">{slide.eyebrow}</span>
          <span className="h-px w-8 bg-stone-200" aria-hidden="true" />
        </motion.div>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.h1 key={`title-${slide.id}`} {...fadeUp(0.06)} className="leading-[1.05] mb-5 select-none">
          <span className="block text-base font-semibold text-stone-400 tracking-wide">{slide.title[0]}</span>
          <span className="block text-[3rem] xl:text-[4.25rem] font-black text-stone-900 leading-[0.92] tracking-tight">{slide.title[1]}</span>
          <span className="block text-[2rem] xl:text-[2.75rem] font-black text-[#0edb0e] leading-tight tracking-tight">{slide.title[2]}</span>
        </motion.h1>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.p key={`desc-${slide.id}`} {...fadeUp(0.1)} className="text-stone-400 leading-relaxed max-w-sm text-[15px]">
          {slide.description}
        </motion.p>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div key={`spice-${slide.id}`} {...fadeUp(0.14)} className="mt-5">
          <SpicePills active={slide.spiceLevel} />
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center gap-6 my-6">
        <motion.button type="button" onClick={onAddToCart} aria-label={`Add ${slide.category} to cart`} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="group inline-flex items-center gap-2 bg-[#0edb0e] hover:bg-[#0bc50b] text-stone-950 font-bold text-sm pl-2 pr-6 py-2.5 rounded-full transition-colors duration-200 uppercase tracking-wider shadow-lg shadow-[#0edb0e]/15">
          <span className="bg-stone-950 rounded-full p-2.5 text-[#0edb0e] group-hover:bg-stone-900 transition-colors duration-200">
            <ShoppingBasket size={15} aria-hidden="true" />
          </span>
          <span>Order Now</span>
          <ArrowRight size={14} className="ml-0.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" aria-hidden="true" />
        </motion.button>
        <ProductBadge slide={slide} />
      </div>

      <div className="">
        <FeatureHighlights />
      </div>
    </div>
  );
}

function ProductShowcase({ slide, nextSlide, direction, current, total }) {
  return (
    <div className="relative// h-full overflow-hidden select-none">
      <div aria-hidden="true" className="absolute left-[20%] top-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(250,204,21,0.45) 0%, rgba(250,204,21,0.08) 50%, transparent 72%)" }} />

      <motion.img src={nextSlide.image} alt="" aria-hidden="true" className="absolute right-[2.5rem] top-1/2 -translate-y-1/2 w-44 h-44 object-contain opacity-50 pointer-events-none" style={{ filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.1))" }} loading="lazy" />

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div key={slide.id} custom={direction} variants={imageVariants} initial="enter" animate="center" exit="exit" className="absolute  top-10 -translate-x-1/3 z-10">
          <motion.img src={slide.image} alt={slide.category} animate={{ y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} style={{ filter: "drop-shadow(0 30px 50px rgba(0,0,0,0.25))" }} className="w-[28rem] xl:w-[32rem] h-[28rem] xl:h-[32rem] object-contain pointer-events-none" />
        </motion.div>
      </AnimatePresence>

      <div aria-hidden="true" className="absolute left-[25%] top-1/2 -translate-y-1/2 w-[22rem] h-[22rem] rounded-full border border-white/20 pointer-events-none" />

      <div className="absolute bottom-8 right-10 flex items-baseline gap-1.5 z-10">
        <span className="text-2xl font-black text-stone-900 tabular-nums leading-none">{String(current + 1).padStart(2, "0")}</span>
        <span className="text-sm font-bold text-stone-900/20 leading-none">/ {String(total).padStart(2, "0")}</span>
      </div>
    </div>
  );
}

// ─── Desktop Hero Layout ───────────────────────────────────────────────────
function DesktopHero({ carousel }) {
  const { current, direction, prefersReducedMotion, slide, nextSlide, goTo, next, prev, setIsPaused, isPaused, total } = carousel;
  const { addToCart } = useCart();
  const year = useMemo(() => new Date().getFullYear(), []);

  const handleAddToCart = () => {
    addToCart({ id: slide.id, name: slide.category, category: slide.category, price: slide.price, image: slide.image });
  };

  return (
    <section aria-label="Featured products" className="hidden lg:block w-full h-full overflow-hidden bg-[#F8F8F5] relative" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
      <div aria-hidden="true" className="absolute inset-0 bg-[#FACC15]" style={{ clipPath: "polygon(58% 0, 100% 0, 100% 100%, 38% 100%)" }} />

      <div className="relative grid grid-cols-2 h-full">
        <HeroContent slide={slide} onAddToCart={handleAddToCart} />
        <ProductShowcase slide={slide} nextSlide={nextSlide} direction={direction} current={current} total={total} />

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
          <ThumbnailRail slides={SLIDES} current={current} onSelect={goTo} onPrev={prev} onNext={next} />
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-20">
          <CarouselProgress current={current} isPaused={isPaused} prefersReducedMotion={prefersReducedMotion} />
        </div>

        <footer className="absolute bottom-4 left-14 z-10">
          <div className="flex items-center gap-6">
            <p className="text-[11px] font-medium text-stone-500 tracking-wide">© {year} {BRAND_NAME}. All rights reserved.</p>
            <Link to="/returnPolicy" className="text-[11px] font-bold text-[#0edb0e] hover:text-[#0bc50b] transition-colors tracking-wide">Return Policy</Link>
          </div>
        </footer>
      </div>
    </section>
  );
}

// ─── Mobile Hero Layout ────────────────────────────────────────────────────
function MobileHero({ carousel }) {
  const { current, direction, slide, goTo, next, setIsPaused } = carousel;
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const discount = calcDiscount(slide.price, slide.oldPrice);

  useEffect(() => setQuantity(1), [slide.id]);

  const handleAddToCart = () => {
    addToCart({ id: slide.id, name: slide.category, category: slide.category, price: slide.price, image: slide.image, quantity });
  };

  const mobileImgVariants = {
    enter: (dir) => ({ opacity: 0, x: dir === "right" ? 60 : -60, scale: 0.9 }),
    center: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
    exit: (dir) => ({ opacity: 0, x: dir === "right" ? -40 : 40, scale: 0.95, transition: { duration: 0.25, ease: "easeIn" } }),
  };

  const mobileFadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  });

  return (
    <section aria-label="Featured products" className="flex lg:hidden w-full h-full bg-[#F8F8F5] relative flex-col overflow-hidden select-none pt-14" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
      <div className="relative z-10 flex flex-col flex-1 min-h-0 px-5 pb-5">

        {/* Product Showcase */}
        <div className="relative flex-1 flex items-center justify-center min-h-0 py-2">
          <div className="relative flex items-center justify-center w-full h-full">
            <div aria-hidden="true" className="absolute w-60 h-60 sm:w-72 sm:h-72 rounded-full bg-[#FACC15]/70" />
            <div aria-hidden="true" className="absolute w-80 h-80 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(250,204,21,0.35) 0%, transparent 68%)" }} />

            <AnimatePresence mode="wait">
              <motion.div key={`m-time-${slide.id}`} {...mobileFadeUp(0.04)} className="absolute top-0 right-0 flex items-center gap-1.5 bg-stone-900/90 text-white text-xs font-bold px-3.5 py-2 rounded-full z-20 backdrop-blur-sm shadow-lg">
                <Flame size={13} className="text-[#0edb0e]" aria-hidden="true" /> {slide.prepTime}
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div key={`m-rate-${slide.id}`} {...mobileFadeUp(0.07)} className="absolute top-0 left-0 flex items-center gap-1 bg-white/90 text-stone-900 text-xs font-bold px-3 py-2 rounded-full z-20 backdrop-blur-sm shadow-md">
                <Star size={13} className="text-[#FACC15] fill-[#FACC15]" aria-hidden="true" /> {slide.rating}
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div key={slide.id} custom={direction} variants={mobileImgVariants} initial="enter" animate="center" exit="exit" className="z-10">
                <motion.img src={slide.image} alt={slide.category} animate={{ y: [0, -7, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }} style={{ filter: "drop-shadow(0 18px 32px rgba(0,0,0,0.2))" }} className="w-60 h-60 sm:w-72 sm:h-72 object-contain" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center justify-center mb-3 flex-shrink-0">
          <div className="flex items-center gap-6 bg-white rounded-full px-5 py-2.5 shadow-sm border border-stone-100">
            <button type="button" onClick={() => setQuantity((q) => Math.max(1, q - 1))} aria-label="Decrease quantity" className="text-stone-400 hover:text-stone-600 active:scale-90 transition-all duration-150"><Minus size={15} aria-hidden="true" /></button>
            <span className="text-sm font-bold text-stone-900 w-5 text-center tabular-nums">{quantity}</span>
            <button type="button" onClick={() => setQuantity((q) => q + 1)} aria-label="Increase quantity" className="text-[#0edb0e] hover:text-[#0bc50b] active:scale-90 transition-all duration-150"><Plus size={15} aria-hidden="true" /></button>
          </div>
        </div>

        {/* Detail Card */}
        <AnimatePresence mode="wait">
          <motion.div key={`m-card-${slide.id}`} {...mobileFadeUp(0.08)} className="bg-white rounded-3xl px-5 py-5 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-stone-100/60 flex-shrink-0">
            <div className="flex items-start justify-between gap-3">
              <h1 className="text-xl font-black text-stone-900 tracking-tight leading-tight">{slide.category}</h1>
              <div className="text-right flex-shrink-0">
                <span className="text-lg font-black text-[#0edb0e] leading-none">{fmt(slide.price)}</span>
                <span className="block text-[11px] text-stone-400 line-through mt-0.5">{fmt(slide.oldPrice)}</span>
              </div>
            </div>
            <div className="mt-2">
              <span className="inline-flex items-center gap-1 bg-red-50 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                <Flame size={10} aria-hidden="true" /> Save {discount}% Today
              </span>
            </div>
            <p className="text-stone-500 leading-relaxed text-[13px] mt-2.5">{slide.description}</p>
            <div className="h-px bg-stone-100 my-3.5" aria-hidden="true" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-stone-500 text-xs font-semibold">
                <Clock size={14} className="text-stone-400" aria-hidden="true" /> {slide.prepTime} prep
              </div>
              <div className="flex items-center gap-1 text-sm font-bold text-stone-900">
                <Star size={14} className="text-[#FACC15] fill-[#FACC15]" aria-hidden="true" /> {slide.rating}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Thumbnails */}
        <div className="flex items-center justify-center gap-2.5 mt-4 flex-shrink-0">
          {SLIDES.map((s, idx) => (
            <button key={s.id} type="button" onClick={() => goTo(idx)} aria-label={`Show ${s.category}`} aria-current={current === idx || undefined} className={`h-11 w-11 rounded-xl overflow-hidden flex-shrink-0 transition-all duration-300 active:scale-95 ${current === idx ? "ring-2 ring-[#0edb0e] ring-offset-2 scale-110 shadow-md" : "opacity-50 hover:opacity-80"}`}>
              <img src={s.image} alt="" aria-hidden="true" className="h-full w-full object-cover" loading="lazy" />
            </button>
          ))}
        </div>

        {/* Checkout Bar */}
        <div className="flex items-center gap-3 mt-4 flex-shrink-0">
          <div className="flex-shrink-0 pl-1 min-w-[4.5rem]">
            <span className="text-[9px] font-bold text-stone-400 uppercase tracking-[0.15em]">UGX</span>
            <span className="block text-lg font-black text-stone-900 leading-tight tabular-nums">{fmt(slide.price * quantity)}</span>
          </div>
          <motion.button type="button" onClick={handleAddToCart} aria-label={`Add ${quantity} ${slide.category} to cart`} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} className="flex-1 inline-flex items-center justify-center gap-2 bg-[#0edb0e] hover:bg-[#0bc50b] text-stone-950 font-bold text-sm py-4 rounded-full transition-colors duration-200 uppercase tracking-wider shadow-lg shadow-[#0edb0e]/15">
            <ShoppingBasket size={16} aria-hidden="true" /> Add to cart
          </motion.button>
          <motion.button type="button" onClick={next} aria-label="Next product" whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }} className="h-14 w-14 flex-shrink-0 rounded-full bg-stone-900 hover:bg-stone-800 text-white flex items-center justify-center shadow-md transition-colors duration-200">
            <ChevronRight size={20} aria-hidden="true" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}

// ─── Main Export ───────────────────────────────────────────────────────────
export default function Hero() {
  const carousel = useSlideCarousel();

  return (
    <div className="fixed inset-0 w-screen h-[100dvh] overflow-hidden select-none bg-[#F8F8F5]">
      <DesktopHero carousel={carousel} />
      <MobileHero carousel={carousel} />
    </div>
  );
}