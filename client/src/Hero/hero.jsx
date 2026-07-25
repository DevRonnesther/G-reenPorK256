import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft, ChevronRight, ShoppingBasket, Leaf, Truck, ShieldCheck,
  Star, Clock, Flame, Minus, Plus, ArrowRight, Beef, Pizza as PizzaIcon,
  Instagram, Facebook, Music2, Twitter, Youtube, X, Moon, Sun, Trash2,
} from "lucide-react";
import { useCart } from "../components/cart/CartContext";
// import Navbar from "../components/Navbar/Navbar.jsx";

import FreshPork from "../assets/freshporke.png";
import PorkStake from "../assets/ChatGPT Image Jun 18, 2026, 03_34_25 PM.png";
import Burger from "../assets/Burger.png";
import Pizza from "../assets/pizza(17).png";
import Chicken from "../assets/pngwing.com (25).png";

const BRAND_NAME = "GreenPork";
const AUTOPLAY_MS = 6000;
const SIZE_OPTIONS = ["S", "M", "L", "XL"];
const SOCIALS = [Instagram, Facebook, Music2, Twitter, Youtube];
const FEATURES = [
  { key: "fresh", icon: Leaf, label: "100% Organic", sub: "Farm Sourced" },
  { key: "delivery", icon: Truck, label: "Express Delivery", sub: "Hot & Fresh" },
  { key: "quality", icon: ShieldCheck, label: "Premium Choice", sub: "Hygienic Prep" },
];

// ─── WARM FOOD WEBSITE PALETTES ───────────────────────────────────────────────
const SLIDES = [
  {
    id: "pork-skewer", eyebrow: "Chef's Special",
    title: ["Slow-Roasted Perfection", "SMOKY", "PORK SKEWERS"],
    category: "Artisanal Pork Skewers", defaultSize: "M", image: PorkStake,
    price: 6000, oldPrice: 8000, rating: 4.8, prepTime: "12 min",
    description: "Tender, wood-fired premium pork skewers served with crisp house salad, fresh chapati, and sweet roasted bananas.",
    tags: ["Wood-Fired", "Farm Raised"],
    watermark: Flame,
    light: {
      // Deep BBQ Rust to Vibrant Orange
      bgFrom: "#7c2d12", bgTo: "#ea580c", text: "#ffffff",
      textSoft: "rgba(255,255,255,0.85)", textFaint: "rgba(255,255,255,0.55)",
      panel: "rgba(255,255,255,0.12)", panelStrong: "rgba(255,255,255,0.22)",
    },
    dark: {
      // Dark Charred Wood to Deep Rust
      bgFrom: "#1c0a03", bgTo: "#431407", text: "#ffffff",
      textSoft: "rgba(255,255,255,0.85)", textFaint: "rgba(255,255,255,0.55)",
      panel: "rgba(255,255,255,0.08)", panelStrong: "rgba(255,255,255,0.16)",
    }
  },
  {
    id: "beef-burger", eyebrow: "House Favorite",
    title: ["Flame-Grilled Masterpiece", "CHEESY", "ANGUS BURGER"],
    category: "Prime Angus Beef Burger", defaultSize: "L", image: Burger,
    price: 10000, oldPrice: 12000, rating: 4.9, prepTime: "10 min",
    description: "Char-broiled premium beef patty layered with melted sharp cheddar, ripe vine tomatoes, crisp leaf lettuce, and signature garlic aioli.",
    tags: ["Prime Angus", "Aged Cheddar"],
    watermark: Beef,
    light: {
      // Rich Amber to Burnt Gold (Toasted Buns)
      bgFrom: "#92400e", bgTo: "#f59e0b", text: "#ffffff",
      textSoft: "rgba(255,255,255,0.85)", textFaint: "rgba(255,255,255,0.55)",
      panel: "rgba(255,255,255,0.12)", panelStrong: "rgba(255,255,255,0.22)",
    },
    dark: {
      // Dark Chocolate Brown to Deep Amber
      bgFrom: "#1c1410", bgTo: "#451a03", text: "#ffffff",
      textSoft: "rgba(255,255,255,0.85)", textFaint: "rgba(255,255,255,0.55)",
      panel: "rgba(255,255,255,0.08)", panelStrong: "rgba(255,255,255,0.16)",
    }
  },
  {
    id: "chicken-pizza", eyebrow: "Freshly Baked",
    title: ["Stone-Baked Crust", "FIRED", "CHICKEN PIZZA"],
    category: "Gourmet Chicken Pizza", defaultSize: "M", image: Pizza,
    price: 10000, oldPrice: 12000, rating: 4.7, prepTime: "18 min",
    description: "Neapolitan-style hand-stretched dough topped with smoky shredded chicken, rich buffalo mozzarella, and slow-simmered marinara.",
    tags: ["Stone-Baked", "Buffalo Mozzarella"],
    watermark: PizzaIcon,
    light: {
      // Brand Green Gradient (#0edb0e to slightly deeper green for depth)
      bgFrom: "#0edb0e", bgTo: "#0bb00b", text: "#ffffff",
      textSoft: "rgba(255,255,255,0.85)", textFaint: "rgba(255,255,255,0.55)",
      panel: "rgba(255,255,255,0.12)", panelStrong: "rgba(255,255,255,0.22)",
    },
    dark: {
      // Deep Forest Green to Rich Emerald
      bgFrom: "#022c1e", bgTo: "#054d2e", text: "#ffffff",
      textSoft: "rgba(255,255,255,0.85)", textFaint: "rgba(255,255,255,0.55)",
      panel: "rgba(255,255,255,0.08)", panelStrong: "rgba(255,255,255,0.16)",
    }
  },
];

const fmt = (v) => Number(v).toLocaleString();
const savePct = (p, o) => Math.round(((o - p) / o) * 100);
const cx = (...c) => c.filter(Boolean).join(" ");

const ease = [0.22, 1, 0.36, 1];
const fadeUp = (d = 0) => ({
  initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0, transition: { duration: 0.5, delay: d, ease } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
});

const imgVar = {
  enter: (d) => ({ opacity: 0, x: d === "right" ? 80 : -80, scale: 0.85, rotate: d === "right" ? 4 : -4 }),
  center: { opacity: 1, x: 0, scale: 1, rotate: 0, transition: { duration: 0.6, ease } },
  exit: (d) => ({ opacity: 0, x: d === "right" ? -60 : 60, scale: 0.9, transition: { duration: 0.3, ease: "easeIn" } }),
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
function useSize(id, def) { const [s, setS] = useState(def); useEffect(() => setS(def), [id, def]); return { size: s, setSize: setS }; }

// Extracts dominant color from image using Canvas API
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
        const w = 50, h = 50; // Tiny size for fast processing
        canvas.width = w; canvas.height = h;
        ctx.drawImage(img, 0, 0, w, h);
        const data = ctx.getImageData(0, 0, w, h).data;
        let r = 0, g = 0, b = 0, count = 0;
        for (let i = 0; i < data.length; i += 4) {
          if (data[i + 3] < 200) continue; // Skip transparent pixels
          r += data[i]; g += data[i + 1]; b += data[i + 2];
          count++;
        }
        if (count > 0) {
          r = Math.floor(r / count);
          g = Math.floor(g / count);
          b = Math.floor(b / count);
          setColor(`rgb(${r}, ${g}, ${b})`);
        }
      } catch (e) {
        console.warn("Could not extract color", e);
      }
    };
  }, [src]);
  return color;
}

// --- COMPONENTS ---
const FontFace = React.memo(function FontFace() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Inter:wght@400;500;600&family=Poppins:wght@500;600;700&display=swap');
      .font-display { font-family: 'Montserrat', sans-serif; }
      .font-ui { font-family: 'Poppins', sans-serif; }
      .font-body { font-family: 'Inter', sans-serif; }
    `}</style>
  );
});

const glassStyle = (slide) => ({
  backgroundColor: slide.panel,
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)'
});

const DynamicBackground = React.memo(function DynamicBackground({ slide, dominantColor }) {
  const Watermark = slide.watermark;
  return (
    <AnimatePresence mode="wait">
      <motion.div key={`${slide.id}-${slide.mode}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, ease }}
        className="absolute inset-0 -z-10 overflow-hidden" style={{ background: `linear-gradient(155deg, ${slide.bgFrom} 0%, ${slide.bgTo} 100%)` }}>

        {/* Dynamic glowing aura behind product based on image color */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, ${dominantColor}66 0%, transparent 70%)` }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ duration: 0.8, ease }}
        />

        <Watermark className="absolute -right-16 top-1/2 -translate-y-1/2 opacity-[0.12] pointer-events-none" size={620} style={{ color: slide.text }} strokeWidth={1} />
      </motion.div>
    </AnimatePresence>
  );
});

const SizePills = React.memo(function SizePills({ active, onChange, slide, dense }) {
  return (
    <div className="flex// items-center hidden gap-1.5" role="group" aria-label="Select Size">
      {SIZE_OPTIONS.map((size) => {
        const on = size === active;
        return (
          <motion.button key={size} type="button" onClick={() => onChange(size)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }} aria-current={on || undefined}
            className={cx("rounded-full font-ui font-bold tracking-wide transition-all", dense ? "px-2.5 py-1 text-[9px]" : "px-3.5 py-1.5 text-xs")}
            style={on ? { backgroundColor: slide.text, color: slide.bgTo, boxShadow: `0 4px 12px ${slide.text}40` } : glassStyle(slide)}>
            {size}
          </motion.button>
        );
      })}
    </div>
  );
});

const QuantityStepper = React.memo(function QuantityStepper({ quantity, onDec, onInc, slide }) {
  return (
    <div className="flex items-center gap-3 rounded-full px-3.5 py-1.5" style={glassStyle(slide)}>
      <button type="button" onClick={onDec} aria-label="Reduce quantity" className="active:scale-75 transition-all p-1" style={{ color: slide.textSoft }}><Minus size={12} /></button>
      <span className="font-ui text-sm font-bold w-4 text-center" style={{ color: slide.text }}>{quantity}</span>
      <button type="button" onClick={onInc} aria-label="Increase quantity" className="active:scale-75 transition-all p-1" style={{ color: slide.text }}><Plus size={12} /></button>
    </div>
  );
});

const AddToCartButton = React.memo(function AddToCartButton({ onClick, slide, className }) {
  return (
    <motion.button type="button" onClick={onClick} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.95 }}
      className={cx("group relative inline-flex items-center justify-center gap-2 rounded-full font-ui font-bold text-[11px] uppercase tracking-[0.12em] py-3 px-6 overflow-hidden transition-all", className)}
      style={{ backgroundColor: slide.text, color: slide.bgTo, boxShadow: `0 8px 24px ${slide.text}40` }}>
      <ShoppingBasket size={14} className="relative z-10" />
      <span className="relative z-10">Add to Cart</span>
      <ArrowRight size={12} className="relative z-10 -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
    </motion.button>
  );
});

const PriceBlock = React.memo(function PriceBlock({ slide, align = "left" }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div key={slide.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.4, ease }}
        className={cx("flex flex-col", align === "right" ? "items-end text-right" : "items-start text-left")}>
        <span className="font-ui text-[10px] font-bold tracking-[0.18em] uppercase mb-1 px-2 py-0.5 rounded-full" style={{ ...glassStyle(slide), color: slide.text }}>Save {savePct(slide.price, slide.oldPrice)}%</span>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="font-display text-3xl xl:text-4xl font-black leading-none drop-shadow-sm" style={{ color: slide.text }}>{fmt(slide.price)}</span>
          <span className="font-body text-xs line-through" style={{ color: slide.textFaint }}>{fmt(slide.oldPrice)}</span>
        </div>
        <span className="font-body text-[9px] tracking-[0.12em] uppercase mt-1" style={{ color: slide.textFaint }}>UGX</span>
      </motion.div>
    </AnimatePresence>
  );
});

const TrustFeatures = React.memo(function TrustFeatures({ slide }) {
  return (
    <div className="grid grid-cols-3 gap-2.5 w-full max-w-md mt-6">
      {FEATURES.map(({ key, icon: Icon, label, sub }) => (
        <div key={key} className="flex items-center gap-2 p-2 rounded-xl" style={glassStyle(slide)}>
          <span className="h-7 w-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: slide.panelStrong, color: slide.text }}><Icon size={13} /></span>
          <div className="leading-tight font-body min-w-0">
            <p className="text-[10px] font-semibold truncate" style={{ color: slide.text }}>{label}</p>
            <p className="text-[8px] truncate" style={{ color: slide.textFaint }}>{sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
});

const IngredientTags = React.memo(function IngredientTags({ tags, slide, dense }) {
  return (
    <div className="flex items-center gap-1.5 flex-wrap mt-2">
      {tags.map((tag) => (
        <span key={tag} className={cx("font-ui font-bold uppercase tracking-wider rounded-full", dense ? "text-[7px] px-1.5 py-0.5" : "text-[9px] px-2 py-0.5")}
          style={{ ...glassStyle(slide), color: slide.text }}>{tag}</span>
      ))}
    </div>
  );
});

const ThumbnailRail = React.memo(function ThumbnailRail({ current, onSelect, onPrev, onNext, slide }) {
  return (
    <nav className="flex items-center gap-3" aria-label="Product selector">
      <motion.button type="button" onClick={onPrev} aria-label="Previous" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
        className="h-9 w-9 rounded-full flex items-center justify-center transition-colors" style={{ ...glassStyle(slide), color: slide.textSoft }}>
        <ChevronLeft size={16} />
      </motion.button>
      <div className="flex items-center gap-2">
        {SLIDES.map((s, i) => (
          <motion.button key={s.id} type="button" onClick={() => onSelect(i)} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.85 }} aria-label={`Show ${s.category}`}
            className={cx("relative h-16 w-16 rounded-xl overflow-hidden transition-all duration-300", current === i ? "scale-105" : "opacity-60")}
            style={current === i ? glassStyle(slide) : { backgroundColor: "rgba(255,255,255,0.1)" }}>
            <img src={s.image} alt="" className="h-full w-full object-contain p-1.5" />
          </motion.button>
        ))}
      </div>
      <motion.button type="button" onClick={onNext} aria-label="Next" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.85 }}
        className="h-9 w-9 rounded-full flex items-center justify-center transition-all" style={{ backgroundColor: slide.text, color: slide.bgTo, boxShadow: `0 4px 12px ${slide.text}40` }}>
        <ChevronRight size={16} />
      </motion.button>
    </nav>
  );
});

const ProgressBar = React.memo(function ProgressBar({ current, playing, slide }) {
  return (
    <div className="h-[3px] w-full hidden" style={{ backgroundColor: slide.panel }}>
      <motion.div key={`${current}-${playing}`} initial={{ width: "0%" }} animate={{ width: playing ? "100%" : "0%" }}
        transition={{ duration: playing ? AUTOPLAY_MS / 1000 : 0, ease: "linear" }} className="h-full origin-left"
        style={{ backgroundColor: slide.text, boxShadow: `0 0 8px ${slide.text}` }} />
    </div>
  );
});

const SocialFooter = React.memo(function SocialFooter({ slide }) {
  const yr = useMemo(() => new Date().getFullYear(), []);
  return (
    <footer className="relative z-20 flex items-center gap-3 px-4">
      <div className="flex items-center gap-2" style={{ color: slide.textSoft }}>{SOCIALS.map((Icon, i) => <motion.a key={i} href={`#social-${i}`} whileHover={{ scale: 1.2, color: slide.text }}><Icon size={13} /></motion.a>)}</div>
      <div className="h-3 w-px" style={{ backgroundColor: slide.panelStrong }} />
      <p className="font-body text-xs font-medium tracking-wide" style={{ color: slide.textFaint }}>© {yr} {BRAND_NAME}.</p>
      <Link to="/returnPolicy" className="font-body text-xs font-bold tracking-wide hover:underline" style={{ color: slide.text }}>Return Policy</Link>
    </footer>
  );
});

const LeftColumn = React.memo(function LeftColumn({ slide }) {
  return (
    <div className="flex flex-col justify-center h-full pl-2 pr-6" aria-live="polite">
      <AnimatePresence mode="wait">
        <motion.div key={`e-${slide.id}`} {...fadeUp(0)} className="flex items-center gap-2 mb-4">
          <motion.span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: slide.text, boxShadow: `0 0 8px ${slide.text}` }}
            animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
          <span className="font-ui text-[9px] font-bold uppercase tracking-[0.2em]" style={{ color: slide.textSoft }}>{slide.eyebrow}</span>
        </motion.div>
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <motion.h1 key={`t-${slide.id}`} {...fadeUp(0.05)} className="mb-4 select-none">
          <span className="block font-body text-[10px] font-medium tracking-[0.08em] uppercase mb-1.5" style={{ color: slide.textFaint }}>{slide.title[0]}</span>
          <span className="block font-display text-5xl xl:text-6xl font-black leading-[0.92] tracking-tight drop-shadow-md" style={{ color: slide.text }}>{slide.title[1]}</span>
          <span className="block font-display text-2xl xl:text-3xl font-extrabold tracking-tight mt-2" style={{ color: slide.text, WebkitTextStroke: `1px ${slide.textFaint}` }}>{slide.title[2]}</span>
        </motion.h1>
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <motion.p key={`d-${slide.id}`} {...fadeUp(0.1)} className="font-body leading-relaxed max-w-sm text-[12px]" style={{ color: slide.textSoft }}>{slide.description}</motion.p>
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <motion.div key={`tg-${slide.id}`} {...fadeUp(0.14)} className="flex flex-col gap-3">
          <IngredientTags tags={slide.tags} slide={slide} />
        </motion.div>
      </AnimatePresence>
      <div className="mt-6 hidden">
        <Link to="/menu" className="group inline-flex items-center gap-2 font-ui text-[9px] font-bold uppercase tracking-[0.15em] transition-all" style={{ color: slide.textSoft }}>
          <span className="pb-0.5 border-b" style={{ borderColor: slide.textSoft }}>Explore Menu</span>
          <ArrowRight size={10} className="transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>
      <TrustFeatures slide={slide} />
    </div>
  );
});

const ProductStage = React.memo(function ProductStage({ slide, direction, current, total, reducedMotion }) {
  return (
    <div className="relative h-full overflow-hidden select-none flex items-center justify-center">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div key={slide.id} custom={direction} variants={imgVar} initial="enter" animate="center" exit="exit"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[30rem] h-[30rem]">
          <motion.img src={slide.image} alt={slide.category}
            animate={reducedMotion ? {} : { y: [0, -10, 0] }} transition={reducedMotion ? {} : { duration: 4, repeat: Infinity, ease: "easeInOut" }}
            // style={{ filter: `drop-shadow(0 30px 50px rgba(0,0,0,0.45))` }}
            className="w-full h-full object-contain pointer-events-none" />
        </motion.div>
      </AnimatePresence>
      <div className="absolute top-8 left-1/2 -translate-x-1/2 flex items-baseline gap-1 font-ui z-10 px-3 py-1 rounded-full" style={glassStyle(slide)}>
        <span className="text-sm font-bold leading-none" style={{ color: slide.text }}>{String(current + 1).padStart(2, "0")}</span>
        <span className="text-[8px] font-medium leading-none" style={{ color: slide.textFaint }}>/ {String(total).padStart(2, "0")}</span>
      </div>
    </div>
  );
});

const RightColumn = React.memo(function RightColumn({ slide, selectedSize, onSizeChange, onAddToCart }) {
  const { quantity, dec, inc } = useQuantity(slide.id);
  return (
    <div className="flex flex-col justify-center h-full pl-6 pr-2">
      <div className="ml-auto flex flex-col items-end gap-5 w-full max-w-[16rem]">
        <PriceBlock slide={slide} align="right" />
        <div className="w-full h-px" style={{ backgroundColor: slide.panelStrong }} />
        <div className="flex flex-col items-end gap-2 w-full">
          <span className="font-ui text-[9px] font-bold uppercase tracking-[0.2em]" style={{ color: slide.textFaint }}>Select Size</span>
          <SizePills active={selectedSize} onChange={onSizeChange} slide={slide} />
        </div>
        <div className="flex items-center justify-between w-full">
          <span className="font-ui text-[9px] font-bold uppercase tracking-[0.2em]" style={{ color: slide.textFaint }}>Quantity</span>
          <QuantityStepper quantity={quantity} onDec={dec} onInc={inc} slide={slide} />
        </div>
        <AddToCartButton onClick={() => onAddToCart(quantity)} slide={slide} className="w-full mt-1" />
        <div className="flex items-center gap-2 font-body text-[10px] mt-1" style={{ color: slide.textSoft }}>
          <Clock size={12} /> {slide.prepTime} Prep <span style={{ color: slide.textFaint }}>·</span>
          <Star size={12} style={{ color: slide.text, fill: slide.text }} /> {slide.rating}
        </div>
      </div>
    </div>
  );
});

const DesktopHero = React.memo(function DesktopHero({ carousel, mode, toggleMode, openCart }) {
  const { current, direction, reducedMotion, slide, goTo, next, prev, setIsPaused, isPaused, total } = carousel;
  const baseSlide = slide;

  // Merge base slide data with current theme mode colors
  const themedSlide = { ...baseSlide, ...baseSlide[mode], mode };

  // Extract dominant color
  const dominantColor = useDominantColor(themedSlide.image);
  const { addToCart } = useCart();
  const { size, setSize } = useSize(themedSlide.id, themedSlide.defaultSize);

  const addToCartHandler = useCallback((q) => {
    addToCart({ id: `${themedSlide.id}-${size}`, name: `${themedSlide.category} (${size})`, category: themedSlide.category, price: themedSlide.price, image: themedSlide.image, size, quantity: q });
    openCart(); // Trigger drawer slide-in
  }, [themedSlide, size, addToCart, openCart]);

  return (
    <section aria-roledescription="carousel" aria-label="Artisanal food gallery" className="hidden lg:flex flex-col w-full h-full relative overflow-hidden pt-20 pb-4"
      onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
      <DynamicBackground slide={themedSlide} dominantColor={dominantColor} />

      {/* Dark Mode Toggle */}
      <motion.button
        onClick={toggleMode}
        className="absolute top-24 right-8 z-30 h-10 w-10 rounded-full flex items-center justify-center"
        style={glassStyle(themedSlide)}
        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
      >
        {mode === 'light' ? <Moon size={16} style={{ color: themedSlide.text }} /> : <Sun size={16} style={{ color: themedSlide.text }} />}
      </motion.button>

      <div className="relative flex-1 grid grid-cols-[1fr_1.1fr_1fr] max-w-[1400px] w-full mx-auto min-h-0 px-8">
        <LeftColumn slide={themedSlide} />
        <ProductStage slide={themedSlide} direction={direction} current={current} total={total} reducedMotion={reducedMotion} />
        <RightColumn slide={themedSlide} selectedSize={size} onSizeChange={setSize} onAddToCart={addToCartHandler} />
      </div>
      <div className="relative z-20 flex items-center justify-between px-8 py-2 max-w-[1400px] w-full mx-auto">
        <SocialFooter slide={themedSlide} />
        <ThumbnailRail current={current} onSelect={goTo} onPrev={prev} onNext={next} slide={themedSlide} />
      </div>
      <ProgressBar current={current} playing={!isPaused && !reducedMotion} slide={themedSlide} />
    </section>
  );
});

const MobileHero = React.memo(function MobileHero({ carousel, mode, toggleMode, openCart }) {
  const { current, direction, slide, goTo, next, setIsPaused, reducedMotion } = carousel;
  const baseSlide = slide;
  const themedSlide = { ...baseSlide, ...baseSlide[mode], mode };
  const dominantColor = useDominantColor(themedSlide.image);

  const { addToCart } = useCart();
  const { quantity, dec, inc } = useQuantity(themedSlide.id);
  const { size, setSize } = useSize(themedSlide.id, themedSlide.defaultSize);
  const savings = savePct(themedSlide.price, themedSlide.oldPrice);

  const addToCartHandler = useCallback(() => {
    addToCart({ id: `${themedSlide.id}-${size}`, name: `${themedSlide.category} (${size})`, category: themedSlide.category, price: themedSlide.price, image: themedSlide.image, size, quantity });
    openCart();
  }, [themedSlide, size, quantity, addToCart, openCart]);

  return (
    <section aria-roledescription="carousel" aria-label="Artisanal food gallery" className="flex lg:hidden w-full h-[100dvh] relative flex-col overflow-hidden select-none pt-20 pb-6"
      onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
      <DynamicBackground slide={themedSlide} dominantColor={dominantColor} />

      {/* Dark Mode Toggle Mobile */}
      <motion.button
        onClick={toggleMode}
        className="absolute top-24 right-5 z-30 h-9 w-9 rounded-full flex items-center justify-center"
        style={glassStyle(themedSlide)}
        whileTap={{ scale: 0.9 }}
      >
        {mode === 'light' ? <Moon size={14} style={{ color: themedSlide.text }} /> : <Sun size={14} style={{ color: themedSlide.text }} />}
      </motion.button>

      <div className="relative z-10 flex flex-col flex-1 min-h-0 px-5 pb-4 pt-2">
        <div className="relative flex-1 flex items-center justify-center min-h-0 my-2">
          <AnimatePresence mode="wait">
            <motion.div key={`mt-${themedSlide.id}`} {...fadeUp(0)} className="absolute top-1 right-1 flex items-center gap-1.5 font-ui text-[8px] font-bold px-2 py-1 rounded-full z-20" style={{ ...glassStyle(themedSlide), color: themedSlide.text }}>
              <Flame size={9} /> {themedSlide.prepTime}
            </motion.div>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.div key={`mr-${themedSlide.id}`} {...fadeUp(0.03)} className="absolute top-1 left-1 flex items-center gap-1.5 font-ui text-[8px] font-bold px-2 py-1 rounded-full z-20" style={{ ...glassStyle(themedSlide), color: themedSlide.text }}>
              <Star size={9} style={{ fill: themedSlide.text }} /> {themedSlide.rating}
            </motion.div>
          </AnimatePresence>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div key={themedSlide.id} custom={direction} variants={imgVar} initial="enter" animate="center" exit="exit" className="z-10 w-[34rem] h-[34rem] sm:w-52 sm:h-52">
              <motion.img src={themedSlide.image} alt={themedSlide.category}
                animate={reducedMotion ? {} : { y: [0, -8, 0] }} transition={reducedMotion ? {} : { duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={{ filter: `drop-shadow(0 20px 35px rgba(0,0,0,0.4))` }}
                className="w-full h-full object-contain pointer-events-none" />
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex items-center justify-center mb-2 flex-shrink-0">
          <QuantityStepper quantity={quantity} onDec={dec} onInc={inc} slide={themedSlide} />
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={`mc-${themedSlide.id}`} {...fadeUp(0.06)} className="rounded-2xl p-4 flex-shrink-0" style={glassStyle(themedSlide)} aria-live="polite">
            <div className="flex items-start justify-between gap-2">
              <h2 className="font-display text-base font-black leading-tight max-w-[10rem]" style={{ color: themedSlide.text }}>{themedSlide.category}</h2>
              <div className="text-right">
                <span className="font-display text-sm font-black block" style={{ color: themedSlide.text }}>{fmt(themedSlide.price)}</span>
                <span className="font-body text-[9px] line-through block" style={{ color: themedSlide.textFaint }}>{fmt(themedSlide.oldPrice)}</span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-1.5 mt-2">
              <span className="inline-flex items-center gap-1 font-ui text-[7px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider" style={{ backgroundColor: themedSlide.text, color: themedSlide.bgTo }}>
                <Flame size={8} /> Save {savings}%
              </span>
              <SizePills active={size} onChange={setSize} slide={themedSlide} dense />
            </div>
            <p className="font-body text-[10px] mt-2 leading-relaxed line-clamp-2" style={{ color: themedSlide.textSoft }}>{themedSlide.description}</p>
            <div className="flex items-center justify-between mt-2">
              <IngredientTags tags={themedSlide.tags} slide={themedSlide} dense />
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="flex items-center justify-center gap-2 mt-2 flex-shrink-0">
          {SLIDES.map((s, i) => (
            <motion.button key={s.id} type="button" onClick={() => goTo(i)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.85 }}
              className={cx("h-9 w-9 rounded-lg overflow-hidden flex-shrink-0 transition-all duration-300", current === i ? "scale-105" : "opacity-60")}
              style={current === i ? glassStyle(themedSlide) : { backgroundColor: "rgba(255,255,255,0.1)" }}>
              <img src={s.image} alt="" className="h-full w-full object-contain p-1" />
            </motion.button>
          ))}
        </div>
        <div className="flex items-center gap-2 mt-3 flex-shrink-0">
          <div className="min-w-[4rem]">
            <span className="font-ui text-[7px] font-bold uppercase tracking-widest block" style={{ color: themedSlide.textFaint }}>Total</span>
            <span className="font-display text-sm font-black leading-none mt-0.5 block" style={{ color: themedSlide.text }}>{fmt(themedSlide.price * quantity)}</span>
          </div>
          <AddToCartButton onClick={addToCartHandler} slide={themedSlide} className="flex-1" />
          <motion.button type="button" onClick={next} aria-label="Next" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.85 }}
            className="h-10 w-10 rounded-full flex items-center justify-center transition-colors flex-shrink-0" style={{ ...glassStyle(themedSlide), color: themedSlide.text }}>
            <ChevronRight size={16} />
          </motion.button>
        </div>
      </div>
    </section>
  );
});

// --- SLIDE-IN CART DRAWER ---
const CartDrawer = React.memo(function CartDrawer({ isOpen, onClose, mode }) {
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();

  // Use a neutral dark glass theme for the cart overlay regardless of slide
  const cartSlide = mode === 'light' ? SLIDES[0].light : SLIDES[0].dark;
  const overlayStyle = {
    backgroundColor: 'rgba(0,0,0,0.6)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)'
  };
  const drawerStyle = {
    backgroundColor: cartSlide.bgTo,
    color: cartSlide.text,
    borderColor: cartSlide.panelStrong
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40"
            style={overlayStyle}
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-96 z-50 flex flex-col p-6 border-l"
            style={drawerStyle}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-display text-2xl font-black flex items-center gap-2">
                <ShoppingBasket size={20} /> Your Cart
              </h2>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-70">
                  <ShoppingBasket size={48} className="mb-4 opacity-50" />
                  <p className="font-ui text-sm font-semibold">Your cart is empty</p>
                  <p className="font-body text-xs mt-1 opacity-70">Add some delicious items!</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 p-3 rounded-xl" style={{ backgroundColor: cartSlide.panel }}>
                    <img src={item.image} alt={item.name} className="h-16 w-16 object-contain rounded-lg bg-black/20 p-1" />
                    <div className="flex-1">
                      <h3 className="font-ui text-sm font-bold leading-tight">{item.name}</h3>
                      <p className="font-body text-xs opacity-70 mb-2">UGX {fmt(item.price)}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 rounded-full hover:bg-white/10"><Minus size={12} /></button>
                          <span className="font-ui text-sm font-bold w-4 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 rounded-full hover:bg-white/10"><Plus size={12} /></button>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-300 transition-colors p-1">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="mt-6 pt-6 border-t" style={{ borderColor: cartSlide.panelStrong }}>
                <div className="flex justify-between items-center mb-4">
                  <span className="font-ui text-sm font-bold uppercase tracking-wider opacity-80">Total</span>
                  <span className="font-display text-2xl font-black">UGX {fmt(cartTotal)}</span>
                </div>
                <motion.button
                  className="w-full py-3 rounded-full font-ui font-bold uppercase tracking-wider text-sm"
                  style={{ backgroundColor: cartSlide.text, color: cartSlide.bgTo }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Proceed to Checkout
                </motion.button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
});

export default function Hero() {
  const carousel = useSlideCarousel();
  const [mode, setMode] = useState('light'); // 'light' or 'dark'
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleMode = useCallback(() => {
    setMode(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  return (
    <main className="fixed inset-0 w-screen h-[100dvh] overflow-hidden select-none font-body">
      <FontFace />
      {/* <Navbar /> */}
      <DesktopHero carousel={carousel} mode={mode} toggleMode={toggleMode} openCart={openCart} />
      <MobileHero carousel={carousel} mode={mode} toggleMode={toggleMode} openCart={openCart} />
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} mode={mode} />
    </main>
  );
}