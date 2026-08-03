import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft, ChevronRight, ShoppingBasket, Leaf, Truck, ShieldCheck,
  Star, Clock, Flame, Minus, Plus, ArrowRight, Pizza as PizzaIcon,
  Instagram, Facebook, Music2, Twitter, Youtube, Hamburger,
} from "lucide-react";
import { useCart } from "../components/cart/CartContext";

import PorkStake from "../assets/ChatGPT Image Jun 18, 2026, 03_34_25 PM.png";
import Burger from "../assets/Burger.png";
import Pizza from "../assets/pizza(17).png";
import Chicken from "../assets/fullchicken.png";

const BRAND_NAME = "GreenPork";
const AUTOPLAY_MS = 6000;
const SOCIALS = [Instagram, Facebook, Music2, Twitter, Youtube];
const FEATURES = [
  { key: "fresh", icon: Leaf, label: "100% Organic", sub: "Farm Sourced" },
  { key: "delivery", icon: Truck, label: "Express Delivery", sub: "Hot & Fresh" },
  { key: "quality", icon: ShieldCheck, label: "Premium Choice", sub: "Hygienic Prep" },
];

// ─── Design Tokens ──────────────────────────────────────
const BRAND = {
  amber: "#FFC400",
  gold: "#D4A437",
  cta: "#D4FF00",         // Punchy Chartreuse - bold contrast
  ctaText: "#0A0A0A",     // Black text on green
  ctaGlow: "rgba(212,255,0,0.4)",
  white: "#FFFFFF",
};

// ─── Background themes (Preserved) ─────────
const lightThemes = {
  red: {
    bgFrom: "#DC2626",
    bgTo: "#6F0D0D",
    text: "#FFFFFF",
    textSoft: "rgba(255,255,255,.92)",
    textFaint: "rgba(255,255,255,.72)",
    panel: "rgba(255,255,255,.15)",
    panelStrong: "rgba(255,255,255,.28)",
  },
  yellow: {
    bgFrom: "#D4780A",
    bgTo: "#8B3A0F",
    text: "#FFFFFF",
    textSoft: "rgba(255,255,255,.90)", textFaint: "rgba(255,255,255,.65)",
    panel: "rgba(255,255,255,.14)", panelStrong: "rgba(255,255,255,.25)",
  },
};

const SLIDES = [
  {
    id: "pork-skewer",
    eyebrow: "Chef's Signature",
    title: [
      "Slow-Roasted Perfection",
      "SMOKY",
      "PORK SKEWERS",
    ],
    category: "Premium Wood-Fired Pork Skewers",
    image: PorkStake,

    price: 6000,
    oldPrice: 8000,
    rating: 4.9,
    prepTime: "12 min",

    description:
      "Juicy, flame-grilled pork skewers marinated in our signature spices and served with fresh salad, soft chapati, and sweet roasted bananas.",

    tags: ["Wood-Fired", "Farm Fresh"],

    watermark: Flame,

    theme: {
      ...lightThemes.red,
      bgFrom: "#DC2626",
      bgTo: "#6F0D0D",
    },
  },

  {
    id: "angus-burger",
    eyebrow: "Customer Favorite",

    title: [
      "Flame-Grilled",
      "CHEESY",
      "ANGUS BURGER",
    ],

    category: "Premium Angus Beef Burger",
    image: Burger,

    price: 10000,
    oldPrice: 12000,
    rating: 4.9,
    prepTime: "10 min",

    description:
      "A juicy Angus beef patty layered with melted cheddar, crisp lettuce, vine-ripened tomatoes, caramelized onions, and our signature burger sauce.",

    tags: ["100% Angus", "Melted Cheddar"],

    watermark: Hamburger,

    theme: {
      ...lightThemes.red,
      bgFrom: "#C2410C",
      bgTo: "#7C2D12",
    },
  },

  {
    id: "chicken-pizza",
    eyebrow: "Stone Oven Fresh",

    title: [
      "Stone-Baked",
      "FIRED",
      "CHICKEN PIZZA",
    ],

    category: "Premium Chicken Pizza",
    image: Pizza,

    price: 10000,
    oldPrice: 12000,
    rating: 4.8,
    prepTime: "18 min",

    description:
      "Hand-stretched artisan dough topped with smoked chicken, creamy mozzarella, fresh herbs, and rich slow-cooked tomato sauce.",

    tags: ["Stone-Baked", "Fresh Mozzarella"],

    watermark: PizzaIcon,

    theme: {
      ...lightThemes.yellow,
      bgFrom: "#F59E0B",
      bgTo: "#B45309",
    },
  },

  {
    id: "roasted-chicken",
    eyebrow: "Family Feast",

    title: [
      "Golden Crispy",
      "FIRE ROASTED",
      "WHOLE CHICKEN",
    ],

    category: "Premium Fire-Roasted Chicken",
    image: Chicken,

    price: 55000,
    oldPrice: 78000,
    rating: 4.9,
    prepTime: "25 min",

    description:
      "Whole chicken slow-roasted over open flames until perfectly crisp outside and irresistibly juicy inside, seasoned with our signature herb blend.",

    tags: ["Fire Roasted", "Farm Fresh"],

    watermark: Flame,

    theme: {
      bgFrom: "#FFFFFF",
      bgTo: "#F8FAFC",

      text: "#111827",
      textSoft: "rgba(17,24,39,.88)",
      textFaint: "rgba(17,24,39,.65)",

      panel: "rgba(255,255,255,.82)",
      panelStrong: "rgba(255,255,255,.96)",

      accent: "#F59E0B",      // Warm golden amber
      accentDark: "#B45309",  // Deep roasted gold
    },
  }
];

const fmt = (v) => Number(v).toLocaleString();
const savePct = (p, o) => Math.round(((o - p) / o) * 100);
const cx = (...c) => c.filter(Boolean).join(" ");

const ease = [0.22, 1, 0.36, 1];
const fadeUp = (d = 0) => ({
  initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0, transition: { duration: 0.6, delay: d, ease } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
});

const imgVar = {
  enter: (d) => ({ opacity: 0, x: d === "right" ? 100 : -100, scale: 0.8, rotate: d === "right" ? -8 : 8 }),
  center: { opacity: 1, x: 0, scale: 1, rotate: -4, transition: { duration: 0.8, ease } },
  exit: (d) => ({ opacity: 0, x: d === "right" ? -80 : 80, scale: 0.9, transition: { duration: 0.4, ease: "easeIn" } }),
};

// --- HOOKS ---
function useSlideCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState("right");
  const [isPaused, setIsPaused] = useState(false);
  const total = SLIDES.length;
  const goTo = useCallback((i) => { setDirection(i > current ? "right" : "left"); setCurrent(i); }, [current]);
  const next = useCallback(() => { setDirection("right"); setCurrent((p) => (p + 1) % total); }, [total]);
  const prev = useCallback(() => { setDirection("left"); setCurrent((p) => (p === 0 ? total - 1 : p - 1)); }, [total]);
  const reducedMotion = useMemo(() => typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches, []);
  useEffect(() => { if (isPaused || reducedMotion) return; const t = setTimeout(next, AUTOPLAY_MS); return () => clearTimeout(t); }, [isPaused, reducedMotion, next, current]);
  useEffect(() => { const onKey = (e) => { if (e.key === "ArrowRight") next(); else if (e.key === "ArrowLeft") prev(); }; window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey); }, [next, prev]);
  return { current, direction, isPaused, reducedMotion, setIsPaused, goTo, next, prev, slide: SLIDES[current], total };
}

function useQuantity(id) { const [q, setQ] = useState(1); useEffect(() => setQ(1), [id]); return { quantity: q, dec: () => setQ((v) => Math.max(1, v - 1)), inc: () => setQ((v) => v + 1) }; }

function useDominantColor(src) {
  const [color, setColor] = useState("#ffffff");
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = src;
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const w = 50, h = 50;
        canvas.width = w; canvas.height = h;
        ctx.drawImage(img, 0, 0, w, h);
        const data = ctx.getImageData(0, 0, w, h).data;
        let r = 0, g = 0, b = 0, count = 0;
        for (let i = 0; i < data.length; i += 4) {
          if (data[i + 3] < 200) continue;
          r += data[i]; g += data[i + 1]; b += data[i + 2];
          count++;
        }
        if (count > 0) setColor(`rgb(${Math.floor(r / count)}, ${Math.floor(g / count)}, ${Math.floor(b / count)})`);
      } catch (e) {
        console.warn("Could not extract color", e);
      }
    };
  }, [src]);
  return color;
}

// --- FOUNDATION ---
const FontFace = React.memo(function FontFace() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@500;700;900&family=Inter:wght@400;500;600&family=Fraunces:ital,wght@1,500;1,600&display=swap');
      .font-display { font-family: 'Archivo', sans-serif; letter-spacing: -0.04em; }
      .font-ui { font-family: 'Inter', sans-serif; }
      .font-body { font-family: 'Inter', sans-serif; }
      .font-accent { font-family: 'Fraunces', serif; font-style: italic; }
    `}</style>
  );
});

// ─── BACKGROUND (Preserved) ──────────────────────────────────
const DynamicBackground = React.memo(function DynamicBackground({ slide, dominantColor }) {
  const Watermark = slide.watermark;
  return (
    <AnimatePresence mode="wait">
      <motion.div key={slide.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, ease }}
        className="absolute inset-0 -z-10 overflow-hidden" style={{ background: `linear-gradient(155deg, ${slide.bgFrom} 0%, ${slide.bgTo} 100%)` }}>

        <motion.div
          className="absolute top-[-10%] left-[-10%] w-[50rem] h-[50rem] rounded-full pointer-events-none blur-3xl"
          style={{ background: `radial-gradient(circle, ${dominantColor}55 0%, transparent 70%)` }}
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-20%] right-[-10%] w-[60rem] h-[60rem] rounded-full pointer-events-none blur-3xl"
          style={{ background: `radial-gradient(circle, ${slide.bgFrom}AA 0%, transparent 70%)` }}
          animate={{ x: [0, -40, 0], y: [0, -20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, ${dominantColor}44 0%, transparent 70%)` }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.8, scale: 1 }}
          transition={{ duration: 0.8, ease }}
        />

        <Watermark className="absolute -right-16 top-1/2 -translate-y-1/2 opacity-[0.12] pointer-events-none" size={620} style={{ color: slide.text }} strokeWidth={1} />

        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")" }}></div>
      </motion.div>
    </AnimatePresence>
  );
});

// ─── FRAGMENTS (Borderless, unboxed UI) ─────────────────────

const QuantityStepper = React.memo(function QuantityStepper({ quantity, onDec, onInc }) {
  return (
    <div className="flex items-center gap-4 font-display font-bold text-lg">
      <button type="button" onClick={onDec} aria-label="Reduce quantity" className="active:scale-75 transition-all p-1 opacity-80 hover:opacity-100">
        <Minus size={16} strokeWidth={3} />
      </button>
      <span className="w-6 text-center">{quantity}</span>
      <button type="button" onClick={onInc} aria-label="Increase quantity" className="active:scale-75 transition-all p-1 opacity-80 hover:opacity-100">
        <Plus size={16} strokeWidth={3} />
      </button>
    </div>
  );
});

// Raw, brutalist CTA. Chartreuse green, black text, hard angles.
const AddToCartButton = React.memo(function AddToCartButton({ onClick, className }) {
  return (
    <motion.button
      type="button" onClick={onClick}
      whileHover={{ scale: 1.02, backgroundColor: "#E4FF4D", boxShadow: `0 10px 30px -5px ${BRAND.ctaGlow}` }}
      whileTap={{ scale: 0.98 }}
      className={cx("group relative inline-flex items-center justify-between gap-4 font-display font-black text-sm uppercase tracking-wide py-4 px-6 text-black shadow-2xl focus:outline-none", className)}
      style={{ backgroundColor: BRAND.cta, color: BRAND.ctaText, clipPath: "polygon(0 0, 100% 0, 95% 100%, 0% 100%)" }}
    >
      <ShoppingBasket size={18} strokeWidth={2.5} />
      <span className="flex-1 text-left">Add to Cart</span>
      <ArrowRight size={18} strokeWidth={2.5} className="transition-transform group-hover:translate-x-1" />
    </motion.button>
  );
});

const TrustFeatures = React.memo(function TrustFeatures({ slide }) {
  return (
    <div className="flex flex-col gap-4 mt-8 border-l-2 pl-6" style={{ borderColor: "rgba(255,255,255,0.2)" }}>
      {FEATURES.map(({ key, icon: Icon, label, sub }) => (
        <div key={key} className="flex items-center gap-3">
          <Icon size={20} strokeWidth={2} style={{ color: BRAND.amber }} />
          <div className="leading-none font-body">
            <p className="text-sm font-bold tracking-wide" style={{ color: slide.text }}>{label}</p>
            <p className="text-[10px] uppercase tracking-widest mt-1" style={{ color: slide.textFaint }}>{sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
});

const IngredientTags = React.memo(function IngredientTags({ tags, slide }) {
  return (
    <div className="flex items-center gap-3 flex-wrap mt-4">
      {tags.map((tag) => (
        <span key={tag} className="font-display font-bold uppercase text-[10px] tracking-widest flex items-center gap-2" style={{ color: slide.text }}>
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: BRAND.amber }} />
          {tag}
        </span>
      ))}
    </div>
  );
});

const ThumbnailRail = React.memo(function ThumbnailRail({ current, onSelect, onPrev, onNext }) {
  return (
    <nav className="flex items-center gap-4" aria-label="Product selector">
      <motion.button type="button" onClick={onPrev} aria-label="Previous" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
        className="h-10 w-10 flex items-center justify-center transition-colors border border-white/20 text-white hover:bg-white hover:text-black">
        <ChevronLeft size={18} strokeWidth={2.5} />
      </motion.button>
      <div className="flex items-center gap-3">
        {SLIDES.map((s, i) => (
          <motion.button key={s.id} type="button" onClick={() => onSelect(i)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.85 }} aria-label={`Show ${s.category}`}
            className={cx("relative h-16 w-16 overflow-hidden transition-all duration-300", current === i ? "scale-110" : "opacity-50")}
            style={current === i ? { outline: `3px solid ${BRAND.cta}`, outlineOffset: "2px" } : {}}>
            <img src={s.image} alt="" className="h-full w-full object-cover" />
          </motion.button>
        ))}
      </div>
      <motion.button type="button" onClick={onNext} aria-label="Next" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.85 }}
        className="h-10 w-10 flex items-center justify-center transition-all border border-white/20 text-white hover:bg-white hover:text-black">
        <ChevronRight size={18} strokeWidth={2.5} />
      </motion.button>
    </nav>
  );
});

const ProgressBar = React.memo(function ProgressBar({ current, playing, slide }) {
  return (
    <div className="h-1 w-full absolute bottom-0 left-0 z-30 hidden" style={{ backgroundColor: slide.panel }}>
      <motion.div key={`${current}-${playing}`} initial={{ width: "0%" }} animate={{ width: playing ? "100%" : "0%" }}
        transition={{ duration: playing ? AUTOPLAY_MS / 1000 : 0, ease: "linear" }} className="h-full origin-left" style={{ backgroundColor: BRAND.cta }} />
    </div>
  );
});

const SocialFooter = React.memo(function SocialFooter({ slide }) {
  const yr = useMemo(() => new Date().getFullYear(), []);
  return (
    <footer className="relative absolute top-15 left-1/3 z-20  flex   items-start gap-4">
      <div className="flex items-center gap-3" style={{ color: slide.textSoft }}>
        {SOCIALS.map((Icon, i) => (
          <motion.a key={i} href={`#social-${i}`} whileHover={{ scale: 1.2, color: BRAND.cta }}>
            <Icon size={22} strokeWidth={1.5} />
          </motion.a>
        ))}
      </div>
      <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest font-ui">
        <p style={{ color: slide.textFaint }}>© {yr} {BRAND_NAME}</p>
        <Link to="/returnPolicy" className="font-bold text-white hover:text-[#D4FF00] transition-colors">Return Policy</Link>
      </div>
    </footer>
  );
});

// ─── DESKTOP HERO (Asymmetric Slanted Grid) ─────────────────
const LeftColumn = React.memo(function LeftColumn({ slide }) {
  return (
    <div className="flex flex-col justify-center h-full pl-8 pr-12 relative" aria-live="polite">
      {/* Vertical rotated category text */}
      <div className="absolute left-2 top-1/2 -translate-y-1/2 -rotate-90 origin-left">
        <span className="font-display font-bold text-[10px] tracking-[0.5em] uppercase" style={{ color: slide.textFaint }}>
          {slide.category}
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={`e-${slide.id}`} {...fadeUp(0)} className="flex items-center gap-3 mb-4">
          <span className="h-3 w-3 rounded-full" style={{ background: BRAND.cta, boxShadow: `0 0 12px ${BRAND.cta}` }} />
          <span className="font-accent text-lg" style={{ color: slide.text }}>{slide.eyebrow}</span>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.h1 key={`t-${slide.id}`} {...fadeUp(0.05)} className="mb-6 select-none">
          <span className="block font-body text-[10px] font-medium tracking-[0.2em] uppercase mb-3" style={{ color: slide.textFaint }}>
            {slide.title[0]}
          </span>
          {/* Brutalist split typography */}
          <span className="block font-display text-7xl xl:text-[7rem] font-black leading-[0.8] tracking-tighter drop-shadow-lg" style={{ color: slide.text }}>
            {slide.title[1]}
          </span>
          <span className="block font-display text-4xl xl:text-6xl font-black tracking-tighter mt-2" style={{ color: "transparent", WebkitTextStroke: `2px ${slide.text}` }}>
            {slide.title[2]}
          </span>
        </motion.h1>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.p key={`d-${slide.id}`} {...fadeUp(0.1)} className="font-body leading-relaxed max-w-xs text-sm" style={{ color: slide.textSoft }}>
          {slide.description}
        </motion.p>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div key={`tg-${slide.id}`} {...fadeUp(0.14)}>
          <IngredientTags tags={slide.tags} slide={slide} />
        </motion.div>
      </AnimatePresence>

      <TrustFeatures slide={slide} />
    </div>
  );
});

const ProductStage = React.memo(function ProductStage({ slide, direction, current, total, reducedMotion }) {
  return (
    <div className="relative h-full overflow-visible select-none flex items-center justify-center">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div key={slide.id} custom={direction} variants={imgVar} initial="enter" animate="center" exit="exit"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[36rem] h-[36rem]">
          <motion.img src={slide.image} alt={slide.category}
            animate={reducedMotion ? {} : { y: [0, -15, 0] }} transition={reducedMotion ? {} : { duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="w-full h-full object-contain pointer-events-none drop-shadow-2xl" />
        </motion.div>
      </AnimatePresence>

      {/* Raw floating index number */}
      <div className="absolute top-12 right-12 font-display text-9xl font-black opacity-10" style={{ color: slide.text }}>
        {String(current + 1).padStart(2, "0")}
      </div>
    </div>
  );
});

const RightColumn = React.memo(function RightColumn({ slide, onAddToCart }) {
  const { quantity, dec, inc } = useQuantity(slide.id);
  return (
    <div className="flex flex-col justify-center h-full pl-12 pr-8 relative">
      <div className="ml-auto flex flex-col items-start gap-8 w-full max-w-[18rem]">

        {/* Floating Price Block */}
        <div className="flex flex-col items-start">
          <span className="font-display text-[10px] font-bold tracking-[0.2em] uppercase mb-2 px-3 py-1 text-black" style={{ backgroundColor: BRAND.cta }}>
            Save {savePct(slide.price, slide.oldPrice)}%
          </span>
          <div className="flex items-baseline gap-3">
            <span className="font-display text-6xl font-black leading-none" style={{ color: slide.text }}>{fmt(slide.price)}</span>
            <span className="font-body text-sm line-through" style={{ color: slide.textFaint }}>{fmt(slide.oldPrice)}</span>
          </div>
          <span className="font-body text-[10px] font-bold tracking-[0.3em] uppercase mt-2" style={{ color: slide.textFaint }}>UGX</span>
        </div>

        {/* Floating Meta Data */}
        <div className="flex items-center gap-6 font-body text-xs uppercase tracking-widest" style={{ color: slide.textSoft }}>
          <span className="flex items-center gap-2"><Clock size={14} strokeWidth={2} /> {slide.prepTime}</span>
          <span className="flex items-center gap-2"><Star size={14} strokeWidth={2} style={{ fill: BRAND.amber, color: BRAND.amber }} /> {slide.rating}</span>
        </div>

        <div className="w-full h-px my-2" style={{ backgroundColor: slide.panelStrong }} />

        {/* Floating Quantity Stepper */}
        <div className="flex items-center justify-between w-full">
          <span className="font-display text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: slide.textFaint }}>Quantity</span>
          <QuantityStepper quantity={quantity} onDec={dec} onInc={inc} />
        </div>

        <AddToCartButton onClick={() => onAddToCart(quantity)} className="w-full mt-4" />
      </div>
    </div>
  );
});

const DesktopHero = React.memo(function DesktopHero({ carousel }) {
  const { current, direction, reducedMotion, slide, goTo, next, prev, setIsPaused, isPaused, total } = carousel;
  const themedSlide = { ...slide, ...slide.theme };
  const dominantColor = useDominantColor(themedSlide.image);
  const { addToCart } = useCart();

  const addToCartHandler = useCallback((q) => {
    addToCart({ id: themedSlide.id, name: themedSlide.category, category: themedSlide.category, price: themedSlide.price, image: themedSlide.image, quantity: q });
  }, [themedSlide, addToCart]);

  return (
    <section aria-roledescription="carousel" aria-label="Artisanal food gallery" className="hidden lg:flex flex-col w-full h-full relative overflow-hidden pt-20 pb-8"
      onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
      <DynamicBackground slide={themedSlide} dominantColor={dominantColor} />

      {/* Slanted Asymmetric Grid Container */}
      <div className="relative flex-1 grid grid-cols-[1fr_1.4fr_1fr] max-w-[1500px] w-full mx-auto min-h-0 px-8 -rotate-2">
        <LeftColumn slide={themedSlide} />
        <ProductStage slide={themedSlide} direction={direction} current={current} total={total} reducedMotion={reducedMotion} />
        <RightColumn slide={themedSlide} onAddToCart={addToCartHandler} />
      </div>

      <div className="relative z-20 flex items-center justify-between px-12 py-6 max-w-[1500px] w-full mx-auto rotate-2">
        <SocialFooter slide={themedSlide} />
        <ThumbnailRail current={current} onSelect={goTo} onPrev={prev} onNext={next} slide={themedSlide} />
      </div>
      <ProgressBar current={current} playing={!isPaused && !reducedMotion} slide={themedSlide} />
    </section>
  );
});

// ─── MOBILE HERO (Raw, Bold, Unboxed) ───────────────────────
const MobileHero = React.memo(function MobileHero({ carousel }) {
  const { current, direction, slide, goTo, next, setIsPaused, reducedMotion } = carousel;
  const themedSlide = { ...slide, ...slide.theme };
  const dominantColor = useDominantColor(themedSlide.image);

  const { addToCart } = useCart();
  const { quantity, dec, inc } = useQuantity(themedSlide.id);
  const savings = savePct(themedSlide.price, themedSlide.oldPrice);

  const addToCartHandler = useCallback(() => {
    addToCart({ id: themedSlide.id, name: themedSlide.category, category: themedSlide.category, price: themedSlide.price, image: themedSlide.image, quantity });
  }, [themedSlide, quantity, addToCart]);

  return (
    <section aria-roledescription="carousel" aria-label="Artisanal food gallery" className="flex lg:hidden w-full h-[100dvh] relative flex-col overflow-hidden select-none pt-16 pb-6"
      onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
      <DynamicBackground slide={themedSlide} dominantColor={dominantColor} />

      <div className="relative z-10 flex flex-col flex-1 min-h-0 px-6 pb-4 pt-4">

        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full" style={{ background: BRAND.cta }} />
            <span className="font-accent text-sm" style={{ color: themedSlide.text }}>{themedSlide.eyebrow}</span>
          </div>
          <span className="font-display text-[10px] font-bold uppercase tracking-widest px-2 py-1 text-black" style={{ backgroundColor: BRAND.cta }}>
            Save {savings}%
          </span>
        </div>

        <div className="relative flex-1 flex items-center justify-center min-h-0 my-4">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div key={themedSlide.id} custom={direction} variants={imgVar} initial="enter" animate="center" exit="exit" className="z-10 w-[22rem] h-[22rem] sm:w-64 sm:h-64">
              <motion.img src={themedSlide.image} alt={themedSlide.category}
                animate={reducedMotion ? {} : { y: [0, -12, 0] }} transition={reducedMotion ? {} : { duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="w-full h-full object-contain pointer-events-none drop-shadow-2xl" />
            </motion.div>
          </AnimatePresence>

          <div className="absolute top-0 right-0 font-display text-[8rem] font-black opacity-10 leading-none" style={{ color: themedSlide.text }}>
            {String(current + 1).padStart(2, "0")}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={`mc-${themedSlide.id}`} {...fadeUp(0.06)} className="flex-shrink-0" aria-live="polite">
            <h2 className="font-display text-4xl font-black leading-none tracking-tighter" style={{ color: themedSlide.text }}>
              {themedSlide.title[1]}
            </h2>
            <h3 className="font-display text-xl font-black tracking-tighter mt-1 mb-4" style={{ color: "transparent", WebkitTextStroke: `1px ${themedSlide.text}` }}>
              {themedSlide.title[2]}
            </h3>

            <p className="font-body text-[11px] mt-2 leading-relaxed line-clamp-2" style={{ color: themedSlide.textSoft }}>{themedSlide.description}</p>

            <div className="flex items-center justify-between mt-4 mb-6">
              <IngredientTags tags={themedSlide.tags} slide={themedSlide} dense />
              <div className="flex items-center gap-2 font-body text-[10px] uppercase tracking-widest" style={{ color: themedSlide.textSoft }}>
                <Clock size={12} strokeWidth={2} /> {themedSlide.prepTime}
              </div>
            </div>

            <div className="flex items-end justify-between border-t border-white/10 pt-4">
              <div>
                <span className="font-display text-3xl font-black block leading-none" style={{ color: themedSlide.text }}>{fmt(themedSlide.price)}</span>
                <span className="font-body text-[9px] line-through block mt-1" style={{ color: themedSlide.textFaint }}>{fmt(themedSlide.oldPrice)} UGX</span>
              </div>
              <QuantityStepper quantity={quantity} onDec={dec} onInc={inc} />
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-center gap-3 mt-6 flex-shrink-0">
          {SLIDES.map((s, i) => (
            <motion.button key={s.id} type="button" onClick={() => goTo(i)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.85 }}
              className={cx("h-12 w-12 overflow-hidden flex-shrink-0 transition-all duration-300", current === i ? "scale-110" : "opacity-50")}
              style={current === i ? { outline: `3px solid ${BRAND.cta}`, outlineOffset: "2px" } : {}}>
              <img src={s.image} alt="" className="h-full w-full object-cover" />
            </motion.button>
          ))}
        </div>

        <div className="flex items-center gap-3 mt-6 flex-shrink-0">
          <div className="min-w-[5rem] hidden">
            <span className="font-ui text-[7px] font-bold uppercase tracking-widest block" style={{ color: themedSlide.textFaint }}>Total</span>
            <span className="font-display text-base font-black leading-none mt-0.5 block" style={{ color: themedSlide.text }}>{fmt(themedSlide.price * quantity)}</span>
          </div>
          <AddToCartButton onClick={addToCartHandler} className="flex-1" />
          <motion.button type="button" onClick={next} aria-label="Next" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.85 }}
            className="h-14 w-14 flex items-center justify-center transition-colors flex-shrink-0 border-2 border-white text-white hover:bg-white hover:text-black">
            <ChevronRight size={20} strokeWidth={2.5} />
          </motion.button>
        </div>
      </div>
    </section>
  );
});

export default function Hero() {
  const carousel = useSlideCarousel();

  return (
    <main className="fixed inset-0 w-screen h-[100dvh] overflow-hidden select-none font-body bg-black">
      <FontFace />
      <DesktopHero carousel={carousel} />
      <MobileHero carousel={carousel} />
    </main>
  );
}