import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft, ChevronRight, PiggyBank, ShoppingBasket, Leaf, Truck, ShieldCheck,
  Star, Clock, Drumstick, Minus, Plus, ArrowRight, Pizza as PizzaIcon,
  Instagram, Facebook, Music2, Twitter, Youtube, Hamburger, Palette,
} from "lucide-react";
import { useCart } from "../components/cart/CartContext";

import PorkStake from "../assets/ChatGPT Image Jun 18, 2026, 03_34_25 PM.png";
import Burger from "../assets/Burger.png";
import Pizza from "../assets/pizza(17).png";
import Chicken from "../assets/fullchicken.png";

const BRAND_NAME = "Green Pork";
const AUTOPLAY_MS = 5500;

const SOCIALS = [Instagram, Facebook, Music2, Twitter, Youtube];
const FEATURES = [
  { key: "fresh", icon: Leaf, label: "100% Organic", sub: "Farm Sourced" },
  { key: "delivery", icon: Truck, label: "Express Delivery", sub: "Hot & Fresh" },
  { key: "quality", icon: ShieldCheck, label: "Premium Choice", sub: "Hygienic Prep" },
];

const PRODUCT_THEMES = {
  "pork-skewer": {
    name: "Pork Red",
    primary: "#D90404",
    primaryHover: "#B80303",
    accent: "#D9FF00",
    bgFrom: "46, 1, 1",
    bgTo: "217, 4, 4",
    glow: "217, 4, 4",
  },
  "angus-burger": {
    name: "Burger Amber",
    primary: "#D97706",
    primaryHover: "#B45309",
    accent: "#FEF08A",
    bgFrom: "69, 26, 3",
    bgTo: "217, 119, 6",
    glow: "245, 158, 11",
  },
  "chicken-pizza": {
    name: "Pizza Crust",
    primary: "#C2410C",
    primaryHover: "#9A3412",
    accent: "#FED7AA",
    bgFrom: "67, 20, 7",
    bgTo: "194, 65, 12",
    glow: "234, 88, 12",
  },
  "roasted-chicken": {
    name: "Golden Roast",
    primary: "#CA8A04",
    primaryHover: "#A16207",
    accent: "#FEF9C3",
    bgFrom: "54, 39, 4",
    bgTo: "202, 138, 4",
    glow: "234, 179, 8",
  }
};

const SLIDES = [
  {
    id: "pork-skewer",
    eyebrow: "Chef's Signature",
    title: ["Slow-Roasted Perfection", "SMOKY", "PORK SKEWERS"],
    category: "Premium Wood-Fired Pork Skewers",
    image: PorkStake,
    price: 6000,
    oldPrice: 8000,
    rating: 4.9,
    prepTime: "12 min",
    description: "Juicy, flame-grilled pork skewers marinated in our signature spices and served with fresh salad, soft chapati, and sweet roasted bananas.",
    tags: ["Wood-Fired", "Farm Fresh"],
    watermark: PiggyBank,
  },
  {
    id: "angus-burger",
    eyebrow: "Customer Favorite",
    title: ["Flame-Grilled", "CHEESY", "ANGUS BURGER"],
    category: "Premium Angus Beef Burger",
    image: Burger,
    price: 10000,
    oldPrice: 12000,
    rating: 4.9,
    prepTime: "10 min",
    description: "A juicy Angus beef patty layered with melted cheddar, crisp lettuce, vine-ripened tomatoes, caramelized onions, and our signature burger sauce.",
    tags: ["100% Angus", "Melted Cheddar"],
    watermark: Hamburger,
  },
  {
    id: "chicken-pizza",
    eyebrow: "Stone Oven Fresh",
    title: ["Stone-Baked", "FIRED", "CHICKEN PIZZA"],
    category: "Premium Chicken Pizza",
    image: Pizza,
    price: 10000,
    oldPrice: 12000,
    rating: 4.8,
    prepTime: "18 min",
    description: "Hand-stretched artisan dough topped with smoked chicken, creamy mozzarella, fresh herbs, and rich slow-cooked tomato sauce.",
    tags: ["Stone-Baked", "Fresh Mozzarella"],
    watermark: PizzaIcon,
  },
  {
    id: "roasted-chicken",
    eyebrow: "Family Feast",
    title: ["Golden Crispy", "FIRE ROASTED", "WHOLE CHICKEN"],
    category: "Premium Fire-Roasted Chicken",
    image: Chicken,
    price: 55000,
    oldPrice: 78000,
    rating: 4.9,
    prepTime: "25 min",
    description: "Whole chicken slow-roasted over open flames until perfectly crisp outside and irresistibly juicy inside, seasoned with our signature herb blend.",
    tags: ["Fire Roasted", "Farm Fresh"],
    watermark: Drumstick,
  }
];

const fmt = (v) => Number(v).toLocaleString();
const savePct = (p, o) => Math.round(((o - p) / o) * 100);
const cx = (...c) => c.filter(Boolean).join(" ");

const butterySpring = { type: "spring", stiffness: 220, damping: 26, mass: 1 };
const smoothTransition = { duration: 0.8, ease: [0.16, 1, 0.3, 1] };

const fadeUp = (d = 0) => ({
  initial: { opacity: 0, y: 15, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)", transition: { ...smoothTransition, delay: d } },
  exit: { opacity: 0, y: -10, filter: "blur(6px)", transition: { duration: 0.25, ease: [0.4, 0, 1, 1] } },
});

const imgVar = {
  enter: (d) => ({
    opacity: 0,
    x: d === "right" ? 80 : -80,
    scale: 0.7,
    rotate: d === "right" ? -8 : 8,
    filter: "blur(12px)"
  }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
    rotate: -3,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] }
  },
  exit: (d) => ({
    opacity: 0,
    x: d === "right" ? -60 : 60,
    scale: 0.8,
    rotate: d === "right" ? 6 : -6,
    filter: "blur(12px)",
    transition: { duration: 0.4, ease: [0.4, 0, 1, 1] }
  }),
};

function useSlideCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState("right");
  const [isPaused, setIsPaused] = useState(false);
  const total = SLIDES.length;

  const goTo = useCallback((i) => { setDirection(i > current ? "right" : "left"); setCurrent(i); }, [current]);
  const next = useCallback(() => { setDirection("right"); setCurrent((p) => (p + 1) % total); }, [total]);
  const prev = useCallback(() => { setDirection("left"); setCurrent((p) => (p === 0 ? total - 1 : p - 1)); }, [total]);

  const reducedMotion = useMemo(() => typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches, []);

  useEffect(() => {
    if (isPaused || reducedMotion) return;
    const t = setTimeout(next, AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [isPaused, reducedMotion, next, current]);

  return { current, direction, isPaused, reducedMotion, setIsPaused, goTo, next, prev, slide: SLIDES[current], total };
}

function useQuantity(id) {
  const [q, setQ] = useState(1);
  useEffect(() => setQ(1), [id]);
  return { quantity: q, dec: () => setQ((v) => Math.max(1, v - 1)), inc: () => setQ((v) => v + 1) };
}

const FontFace = React.memo(function FontFace() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@500;700;900&family=Inter:wght@400;500;600&display=swap');
      
      .font-display { font-family: 'Archivo', sans-serif; letter-spacing: -0.04em; }
      .font-ui, .font-body { font-family: 'Inter', sans-serif; }
      
      .film-grain {
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/filter%3E%3C/svg%3E");
      }

      .no-scrollbar::-webkit-scrollbar { display: none; }
      .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    `}</style>
  );
});

const DynamicBackground = React.memo(function DynamicBackground({ slide, activeTheme }) {
  const Watermark = slide.watermark;

  const bgStyle = {
    background: `linear-gradient(155deg, rgb(${activeTheme.bgFrom}) 0%, rgb(${activeTheme.bgTo}) 100%)`
  };

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden" style={{ backgroundColor: `rgb(${activeTheme.bgTo})` }}>
      <AnimatePresence mode="popLayout">
        <motion.div
          key={`${slide.id}-${activeTheme.bgFrom}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 transition-all"
          style={bgStyle}
        >
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45rem] lg:w-[80rem] h-[45rem] lg:h-[80rem] pointer-events-none blur-[140px]"
            style={{ background: `radial-gradient(circle, rgba(${activeTheme.glow}, 0.55) 0%, rgba(0,0,0,0) 70%)` }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.45, 0.7, 0.45] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="absolute right-0 top-1/2 -translate-x-1 -translate-y-1/2 pointer-events-none opacity-10 transition-all duration-700 flex items-center justify-center">
            <Watermark className="text-white" size={480} strokeWidth={1} />
          </div>

          <div className="absolute inset-0 film-grain opacity-[0.04] pointer-events-none mix-blend-overlay"></div>
          <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(circle, transparent 35%, rgba(10, 2, 2, 0.75) 100%)` }}></div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
});

const ColorThemeToggleMode = React.memo(function ColorThemeToggleMode({ isAutoMatch, setIsAutoMatch, activeThemeName, setActiveThemeName }) {
  return (
    <div className="absolute hidden/// top-20 right-3 lg:top-20 lg:right-8 z-50 flex items-center gap-2 bg-black/40 backdrop-blur-xl p-1.5">
      <button
        type="button"
        onClick={() => setIsAutoMatch(!isAutoMatch)}
        className={cx(
          "text-[10px] font-display uppercase tracking-wider px-3.5 py-1.5 transition-all cursor-pointer flex items-center gap-1.5",
          isAutoMatch ? "bg-white text-black font-bold" : "text-white/70 hover:text-white"
        )}
      >
        <Palette size={12} /> Auto-Match Product
      </button>
      {!isAutoMatch && (
        <div className="flex items-center gap-1.5 pl-1 pr-1">
          {Object.keys(PRODUCT_THEMES).map((key) => {
            const t = PRODUCT_THEMES[key];
            const isSelected = activeThemeName === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setActiveThemeName(key)}
                title={t.name}
                className={cx(
                  "w-5 h-5 transition-transform cursor-pointer",
                  isSelected ? "scale-125 opacity-100" : "opacity-50 hover:opacity-100"
                )}
                style={{ backgroundColor: t.primary }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
});

const QuantityStepper = React.memo(function QuantityStepper({ quantity, onDec, onInc, accentColor }) {
  return (
    <div className="flex items-center gap-3 font-display font-bold text-sm lg:text-base text-white">
      <motion.button type="button" onClick={onDec} whileTap={{ scale: 0.75 }} whileHover={{ scale: 1.15, color: accentColor }} transition={butterySpring} aria-label="Reduce quantity" className="transition-all p-1 text-white/80 hover:text-white cursor-pointer">
        <Minus size={14} strokeWidth={3} />
      </motion.button>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={quantity}
          initial={{ opacity: 0, y: -10, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: 10, filter: "blur(4px)" }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-5 text-center inline-block text-white"
        >
          {quantity}
        </motion.span>
      </AnimatePresence>
      <motion.button type="button" onClick={onInc} whileTap={{ scale: 0.75 }} whileHover={{ scale: 1.15, color: accentColor }} transition={butterySpring} aria-label="Increase quantity" className="transition-all p-1 text-white/80 hover:text-white cursor-pointer">
        <Plus size={14} strokeWidth={3} />
      </motion.button>
    </div>
  );
});

const AddToCartButton = React.memo(function AddToCartButton({ onClick, className, primaryColor, primaryHoverColor }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.02, backgroundColor: primaryHoverColor }}
      whileTap={{ scale: 0.98 }}
      transition={butterySpring}
      className={cx("group relative inline-flex items-center justify-between gap-2 lg:gap-4 font-display font-black text-xs uppercase tracking-wider py-3 px-4 lg:py-3.5 lg:px-6 focus:outline-none cursor-pointer overflow-hidden", className)}
      style={{ backgroundColor: primaryColor, color: "#FFFFFF", clipPath: "polygon(0 0, 100% 0, 95% 100%, 0% 100%)" }}
    >
      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none" />
      <ShoppingBasket size={15} strokeWidth={2.5} />
      <span className="flex-1 text-left relative z-10">Add to Cart</span>
      <ArrowRight size={15} strokeWidth={2.5} className="transition-transform duration-400 group-hover:translate-x-2 relative z-10" />
    </motion.button>
  );
});

const TrustFeatures = React.memo(function TrustFeatures({ accentColor }) {
  return (
    <div className="hidden lg:flex flex-row gap-6 mt-6 relative">
      {FEATURES.map(({ key, icon: Icon, label, sub }) => (
        <motion.div
          key={key}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2.5"
        >
          <Icon size={18} strokeWidth={2.2} style={{ color: accentColor }} />
          <div className="leading-tight font-body">
            <p className="text-sm font-bold tracking-wide text-white">{label}</p>
            <p className="text-[10px] uppercase tracking-widest text-white/70">{sub}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
});

const IngredientTags = React.memo(function IngredientTags({ tags, accentColor }) {
  return (
    <div className="flex items-center gap-2.5 flex-wrap mt-2 lg:mt-3">
      {tags.map((tag) => (
        <span key={tag} className="font-display font-bold uppercase text-[10px] lg:text-[11px] tracking-widest flex items-center gap-1.5 text-white bg-white/5 backdrop-blur-md py-1 px-2.5">
          <span className="h-1.5 w-1.5" style={{ background: accentColor }} />
          {tag}
        </span>
      ))}
    </div>
  );
});

const ThumbnailRail = React.memo(function ThumbnailRail({ current, onSelect, onPrev, onNext, accentColor }) {
  return (
    <nav className="flex items-center justify-between gap-2 lg:gap-6 w-full" aria-label="Product selector">
      <motion.button type="button" onClick={onPrev} aria-label="Previous" whileHover={{ scale: 1.15, color: accentColor }} whileTap={{ scale: 0.85 }} transition={butterySpring}
        className="h-8 w-8 lg:h-10 lg:w-10 flex items-center justify-center transition-colors bg-black/30 backdrop-blur-md text-white cursor-pointer shrink-0">
        <ChevronLeft size={16} strokeWidth={2.5} />
      </motion.button>

      <div className="flex items-center gap-2.5 lg:gap-4 overflow-x-auto py-1 no-scrollbar">
        {SLIDES.map((s, i) => {
          const isActive = current === i;
          return (
            <motion.button
              key={s.id}
              type="button"
              onClick={() => onSelect(i)}
              whileHover={{ scale: isActive ? 1.1 : 1.05, y: -2 }}
              whileTap={{ scale: 0.92 }}
              animate={{
                scale: isActive ? 1.1 : 0.8,
                opacity: isActive ? 1 : 0.4,
              }}
              transition={butterySpring}
              aria-label={`Show ${s.category}`}
              className={cx(
                "relative h-8 w-8 lg:h-14 lg:w-14 cursor-pointer outline-none bg-transparent shrink-0 overflow-hidden",
                isActive ? "z-10" : ""
              )}
            >
              <motion.img
                src={s.image}
                alt=""
                className="h-full w-full object-cover outline-none bg-transparent"
              />
            </motion.button>
          );
        })}
      </div>

      <motion.button type="button" onClick={onNext} aria-label="Next" whileHover={{ scale: 1.15, color: accentColor }} whileTap={{ scale: 0.85 }} transition={butterySpring}
        className="h-8 w-8 lg:h-10 lg:w-10 flex items-center justify-center transition-all bg-black/30 backdrop-blur-md text-white cursor-pointer shrink-0">
        <ChevronRight size={16} strokeWidth={2.5} />
      </motion.button>
    </nav>
  );
});

const SocialFooter = React.memo(function SocialFooter({ accentColor }) {
  const yr = useMemo(() => new Date().getFullYear(), []);
  return (
    <footer className="flex flex-col lg:flex-row items-start lg:items-center gap-2 lg:gap-6 z-20">
      <div className="flex items-center gap-2.5 text-white/80">
        {SOCIALS.map((Icon, i) => (
          <motion.a key={i} href={`#social-${i}`} whileHover={{ scale: 1.25, color: accentColor, y: -2 }} transition={butterySpring}>
            <Icon size={15} strokeWidth={1.8} />
          </motion.a>
        ))}
      </div>
      <div className="flex items-center gap-3 text-[9px] lg:text-[10px] uppercase tracking-widest font-ui text-white/70">
        <p>© {yr} {BRAND_NAME}</p>
        <Link to="/returnPolicy" className="font-bold transition-colors text-white" onMouseEnter={(e) => (e.currentTarget.style.color = accentColor)} onMouseLeave={(e) => (e.currentTarget.style.color = "")}>Return Policy</Link>
      </div>
    </footer>
  );
});

export default function Hero() {
  const carousel = useSlideCarousel();
  const { current, direction, reducedMotion, slide, goTo, next, prev, setIsPaused } = carousel;

  const [isAutoMatch, setIsAutoMatch] = useState(true);
  const [activeThemeName, setActiveThemeName] = useState("pork-skewer");

  const activeThemeKey = isAutoMatch ? slide.id : activeThemeName;
  const activeTheme = PRODUCT_THEMES[activeThemeKey] || PRODUCT_THEMES["pork-skewer"];

  const { addToCart } = useCart();
  const { quantity, dec, inc } = useQuantity(slide.id);

  const addToCartHandler = useCallback((q) => {
    addToCart({ id: slide.id, name: slide.category, category: slide.category, price: slide.price, image: slide.image, quantity: q });
  }, [slide, addToCart]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Artisanal food gallery"
      // Added pt-20 lg:pt-24 to push content below the fixed Navbar
      className="relative w-full h-[100dvh] max-h-[100dvh] flex flex-col justify-center overflow-hidden select-none px-4 lg:px-12 pt-20 lg:pt-24 pb-4"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <FontFace />
      <ColorThemeToggleMode
        isAutoMatch={isAutoMatch}
        setIsAutoMatch={setIsAutoMatch}
        activeThemeName={activeThemeName}
        setActiveThemeName={setActiveThemeName}
      />
      <DynamicBackground slide={slide} activeTheme={activeTheme} />

      {/* Main Layout Grid */}
      <div className="relative flex-1 grid grid-cols-1 lg:grid-cols-2 max-w-[1600px] w-full mx-auto items-center gap-y-6 lg:gap-x-12 min-h-0 my-auto">

        {/* LEFT COLUMN: MASSIVE PRODUCT IMAGE */}
        <div className="relative w-full h-full min-h-0 flex items-center justify-center order-1 lg:order-1">

          {/* Magical Ghost Typography behind image */}
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.04, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute pointer-events-none font-display font-black text-[24vw] lg:text-[18rem] text-white tracking-tighter select-none whitespace-nowrap z-0"
          >
            {slide.title[1]}
          </motion.span>

          {/* Floating Rating Badge */}
          <motion.div
            className="absolute top-2 right-2 lg:top-8 lg:right-8 z-20 bg-black/40 backdrop-blur-xl px-3 py-2 flex items-center gap-2"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Star size={16} strokeWidth={2} style={{ fill: activeTheme.accent, color: activeTheme.accent }} />
            <span className="text-white text-xs font-display font-bold">{slide.rating}</span>
          </motion.div>

          {/* Floating Prep Time Badge */}
          <motion.div
            className="absolute bottom-2 left-2 lg:bottom-12 lg:left-8 z-20 bg-black/40 backdrop-blur-xl px-3 py-2 flex items-center gap-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <Clock size={16} strokeWidth={2} style={{ color: activeTheme.accent }} />
            <span className="text-white text-xs font-display font-bold">{slide.prepTime}</span>
          </motion.div>

          {/* The Big, Bold Image */}
          <AnimatePresence mode="popLayout" custom={direction}>
            <motion.div
              key={slide.id}
              custom={direction}
              variants={imgVar}
              initial="enter"
              animate="center"
              exit="exit"
              className="relative z-10 w-[65vw] sm:w-[55vw] lg:w-full max-w-[40rem] h-full flex items-center justify-center"
            >
              <motion.img
                src={slide.image}
                alt={slide.category}
                animate={reducedMotion ? {} : { y: [0, -12, 0], rotate: [-3, 0, -3] }}
                transition={reducedMotion ? {} : { duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="w-full h-full object-contain pointer-events-none"
                style={{
                  filter: `drop-shadow(0 20px 30px rgba(0,0,0,0.6)) drop-shadow(0 0 35px rgba(${activeTheme.glow}, 0.5))`
                }}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* RIGHT COLUMN: DETAILS & ACTIONS */}
        <div className="relative w-full flex flex-col justify-center gap-3 lg:gap-4 order-2 lg:order-2 px-2 lg:px-0 pb-2">

          <div className="flex flex-col gap-2 lg:gap-3">
            <AnimatePresence mode="wait">
              <motion.div key={`hdr-${slide.id}`} {...fadeUp(0.02)}>
                <span className="font-display text-[10px] font-bold tracking-[0.3em] uppercase mb-1 px-3 py-1 inline-block text-black" style={{ backgroundColor: activeTheme.accent }}>
                  {slide.eyebrow}
                </span>
                <h1 className="select-none mt-2">
                  <span className="block font-display text-3xl sm:text-4xl lg:text-6xl font-black leading-[0.9] tracking-tighter text-white">
                    {slide.title[1]} <span className="text-white/90">{slide.title[2]}</span>
                  </span>
                </h1>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.p key={`d-${slide.id}`} {...fadeUp(0.06)} className="font-body leading-relaxed max-w-md text-xs lg:text-sm text-white/90 line-clamp-2 lg:line-clamp-none">
                {slide.description}
              </motion.p>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div key={`tg-${slide.id}`} {...fadeUp(0.1)}>
                <IngredientTags tags={slide.tags} accentColor={activeTheme.accent} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Pricing & Add to Cart Block */}
          <div className="mt-2 lg:mt-4 flex flex-col sm:flex-row items-start sm:items-end gap-4 sm:gap-6 w-full max-w-md">
            <div className="flex flex-col gap-1">
              <span className="font-display text-[10px] font-bold tracking-[0.3em] uppercase text-white/70">
                Save {savePct(slide.price, slide.oldPrice)}% Today
              </span>
              <div className="flex items-baseline gap-3">
                <span className="font-display text-3xl lg:text-5xl font-black leading-none text-white">{fmt(slide.price)}</span>
                <span className="font-body text-base line-through text-white/50">{fmt(slide.oldPrice)}</span>
              </div>
              <span className="font-body text-[10px] font-bold tracking-[0.3em] uppercase text-white/70">UGX</span>
            </div>

            <div className="flex flex-col gap-2 w-full sm:flex-1 sm:max-w-[180px]">
              <div className="flex items-center justify-between w-full bg-white/5 backdrop-blur-md py-2 px-3">
                <span className="font-display text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">Qty</span>
                <QuantityStepper quantity={quantity} onDec={dec} onInc={inc} accentColor={activeTheme.accent} />
              </div>
            </div>
          </div>

          <AddToCartButton
            onClick={() => addToCartHandler(quantity)}
            className="w-full sm:w-auto sm:min-w-[280px] mt-1"
            primaryColor={activeTheme.primary}
            primaryHoverColor={activeTheme.primaryHover}
          />

          <TrustFeatures accentColor={activeTheme.accent} />

          {/* Mobile Thumbnail Rail */}
          <div className="flex lg:hidden w-full pt-1">
            <ThumbnailRail current={current} onSelect={goTo} onPrev={prev} onNext={next} accentColor={activeTheme.accent} />
          </div>
        </div>
      </div>

      {/* Footer Navigation (Desktop Thumbnails + Socials) */}
      <div className="relative z-20 hidden lg:flex flex-row items-center justify-between max-w-[1600px] w-full mx-auto pt-2 shrink-0">
        <SocialFooter accentColor={activeTheme.accent} />
        <div className="flex">
          <ThumbnailRail current={current} onSelect={goTo} onPrev={prev} onNext={next} accentColor={activeTheme.accent} />
        </div>
      </div>
    </section>
  );
}