import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Heart,
  Star,
  Clock,
  ShieldCheck,
  Minus,
  Plus,
  X,
  ShoppingBasket,
  ArrowRight,
  Beef,
  Drumstick,
  Sandwich,
  Pizza as PizzaIcon,
  Trash2,
  Utensils,
  Check,
  Flame,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { useCart } from "../components/cart/CartContext";

// ASSETS
import PizzaImg from "../assets/pizza(17).png";
import FreshPork from "../assets/freshporke.png";
import Porkies from "../assets/PremiumPlate.png";
import PorkStake from "../assets/ChatGPT Image Jun 18, 2026, 03_34_25 PM.png";
import BurgerImg from "../assets/Burger.png";
import ChickenImg from "../assets/fullchicken.png";

/* ───────────── CONFIG + DESIGN TOKENS ───────────── */
const WHATSAPP_NUMBER = "256771682802";
const BRAND_NAME = "Greenpork";
const SLOGAN = "Eat Fresh. Live Happy";
const FREE_DELIVERY_THRESHOLD = 50000;
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
const modalFocusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111]";
const stepBtnClass =
  "flex cursor-pointer items-center justify-center rounded-full border-0 bg-[#F5F5F5] text-[#111111] transition-colors hover:bg-[#EFEFEF]";

/* ───────────── DATA ───────────── */
const THEMES = {
  ink: {
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
  red: {
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
  orange: {
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
  white: {
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
};

const ITEMS = [
  {
    id: 1,
    short: "Burger",
    words: ["CHEESY", "BURGER"],
    category: "burgers",
    categoryLabel: "Premium Angus Beef Burger · Gulu City",
    name: "Angus Beef Burger",
    image: BurgerImg,
    price: 10000,
    oldPrice: 12000,
    rating: 4.9,
    cookTime: "10 min",
    description:
      "Juicy grilled beef patty with crisp lettuce, double melted cheddar, and our signature smoked pepper sauce.",
    tags: ["100% Angus", "Extra Cheese"],
    ...THEMES.ink,
  },
  {
    id: 2,
    short: "Skewers",
    words: ["SMOKY", "PORK"],
    category: "skewers",
    categoryLabel: "Wood-Fired Pork Skewers · Gulu City",
    name: "Wood-Fired Pork Skewers",
    image: Porkies,
    price: 15000,
    oldPrice: 18000,
    rating: 4.9,
    cookTime: "12 min",
    description:
      "Succulent, spice-rubbed pork skewers charred over wood fire. Served with fried cassava, kachumbari, and chili dip.",
    tags: ["Extra Cassava", "Farm Fresh"],
    ...THEMES.red,
  },
  {
    id: 3,
    short: "Special",
    words: ["ROASTED", "PORK"],
    category: "pork",
    categoryLabel: "Crispy Roasted Pork Special · Gulu City",
    name: "Crispy Pork Belly Roast",
    image: PorkStake,
    price: 6000,
    oldPrice: 8000,
    rating: 4.9,
    cookTime: "15 min",
    description:
      "Crispy skin, tender slow-roasted pork cuts with seasoned cassava strips, fresh salads, and grilled chapati.",
    tags: ["Slow Roasted", "Wood Fired"],
    ...THEMES.red,
  },
  {
    id: 4,
    short: "Pizza",
    words: ["FIRED", "PIZZA"],
    category: "pizza",
    categoryLabel: "Artisan Stone-Baked Pizza · Gulu City",
    name: "Chicken & Pork Fusion Pizza",
    image: PizzaImg,
    price: 15000,
    oldPrice: 18000,
    rating: 4.8,
    cookTime: "18 min",
    description:
      "Hand-stretched dough topped with pulled wood-fired pork chunks, seasoned chicken slices, and fresh mozzarella.",
    tags: ["Stone-Baked", "Mozzarella"],
    ...THEMES.orange,
  },
  {
    id: 5,
    short: "Chicken",
    words: ["GOLDEN", "CHICKEN"],
    category: "chicken",
    categoryLabel: "Premium Fire-Roasted Chicken · Gulu City",
    name: "Fire-Roasted Whole Chicken",
    image: ChickenImg,
    price: 55000,
    oldPrice: 78000,
    rating: 4.9,
    cookTime: "25 min",
    description:
      "Farm-fresh whole chicken marinated for 24 hours in Ugandan herbs and roasted over charcoal until golden.",
    tags: ["Fire Roasted", "Farm Fresh"],
    ...THEMES.white,
  },
  {
    id: 6,
    short: "Raw Pork",
    words: ["FARM", "FRESH"],
    category: "raw",
    categoryLabel: "Hygienic Raw Pork Cuts (1kg) · Gulu City",
    name: "Fresh Pork Cuts (1kg)",
    image: FreshPork,
    price: 16000,
    oldPrice: 20000,
    rating: 4.9,
    cookTime: "Ready to cook",
    description:
      "Hygienically packaged and vacuum-sealed raw pork chops and ribs straight from certified organic farms.",
    tags: ["100% Organic", "Hygienic"],
    ...THEMES.ink,
  },
];

const SPOTLIGHT_ITEMS = ITEMS.slice(0, 5);

const CATEGORIES = [
  { key: "all", label: "All Items", icon: Utensils },
  { key: "pork", label: "Roasted Pork", icon: Beef },
  { key: "skewers", label: "Pork Skewers", icon: Beef },
  { key: "chicken", label: "Roasted Chicken", icon: Drumstick },
  { key: "burgers", label: "Burgers", icon: Sandwich },
  { key: "pizza", label: "Stone Pizza", icon: PizzaIcon },
  { key: "raw", label: "Raw Pork Cuts", icon: ShieldCheck },
];

/* ───────────── SHARED PIECES ───────────── */
function Glow() {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{ background: GLOW }}
    />
  );
}

/* ───────────── FULL-SCREEN PRODUCT MODAL ───────────── */
function ProductModal({ product, isLiked, onLike, onClose, onAddToCart }) {
  const [qty, setQty] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    setQty(1);
    setIsAdded(false);
  }, [product?.id]);

  useEffect(() => {
    if (!product) return;

    function onKeyDown(e) {
      if (e.key === "Escape") onClose();
    }

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [product, onClose]);

  const discount = product ? savePct(product.price, product.oldPrice) : 0;

  function handleAdd() {
    if (!product) return;
    onAddToCart(product, qty);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  }

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="product-modal-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="fixed inset-0 z-50 grid h-[100dvh] w-screen overflow-y-auto rounded-none border-0 bg-[#FFFFFF] text-[#111111] lg:grid-cols-12 lg:overflow-hidden"
        >
          {/* Left Full-Height Hero Showcase Stage */}
          <div
            className="relative flex min-h-[52dvh] flex-col justify-between overflow-hidden border-0 p-5 sm:p-8 lg:col-span-7 lg:h-[100dvh] lg:min-h-0 lg:p-12"
            style={{ backgroundColor: product.bg, color: product.fg }}
          >
            <Glow />

            <div
              aria-hidden="true"
              className={cx(
                WORD_STYLE,
                "pointer-events-none absolute inset-0 items-center justify-center text-center leading-[0.82]"
              )}
              style={{
                color: product.word,
                fontSize: "clamp(4rem, 15vw, 13rem)",
              }}
            >
              <span>{product.words[0]}</span>
              <span>{product.words[1]}</span>
            </div>

            <div className="relative z-10 flex flex-wrap items-center justify-between gap-2">
              {discount > 0 && (
                <span
                  className="font-display rounded-full border-0 px-4 py-2 text-[11px] font-black uppercase tracking-wide"
                  style={{
                    backgroundColor: product.accent,
                    color: product.accentText,
                  }}
                >
                  Save {discount}%
                </span>
              )}
            </div>

            <div className="relative z-10 my-auto flex flex-1 items-center justify-center py-4">
              <motion.img
                initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.45, ease: EASE }}
                src={product.image}
                alt={product.name}
                className="h-64 w-auto max-w-[95%] object-contain sm:h-64 lg:h-[76vh]"
              />

              <span
                className="font-display pointer-events-none absolute bottom-2 left-1 z-20 -rotate-3 rounded-2xl border-0 px-4 py-2 text-[11px] font-extrabold uppercase tracking-wide sm:left-4 lg:bottom-4 lg:left-6 lg:text-xs"
                style={{
                  backgroundColor: product.bubble,
                  color: product.bubbleText,
                }}
              >
                {product.tags[0]}
              </span>

              <span
                className="font-display pointer-events-none absolute right-1 top-2 z-20 rotate-3 rounded-full border-0 px-4 py-2 text-[11px] font-extrabold uppercase tracking-wide sm:right-4 lg:right-6 lg:top-4 lg:text-xs"
                style={{
                  backgroundColor: product.accent,
                  color: product.accentText,
                }}
              >
                {product.tags[1]}
              </span>
            </div>

            <div className="relative z-10 flex flex-wrap items-center gap-2 sm:gap-3">
              <span
                className={pillClass}
                style={{
                  boxShadow: `inset 0 0 0 1px ${product.line}`,
                  color: product.fg,
                }}
              >
                <Clock size={13} strokeWidth={2.5} />
                <span>{product.cookTime}</span>
              </span>

              <span
                className={pillClass}
                style={{
                  boxShadow: `inset 0 0 0 1px ${product.line}`,
                  color: product.fg,
                }}
              >
                <Star size={13} strokeWidth={2.5} fill="currentColor" />
                <span>{product.rating}</span>
              </span>

              {discount > 0 && (
                <span
                  className={pillClass}
                  style={{
                    backgroundColor: product.accent,
                    color: product.accentText,
                  }}
                >
                  Was {fmt(product.oldPrice)} UGX
                </span>
              )}
            </div>
          </div>

          {/* Right Full-Height Details & Order Panel */}
          <div className="flex flex-col justify-between border-0 bg-[#FFFFFF] p-5 sm:p-8 lg:col-span-5 lg:h-[100dvh] lg:overflow-y-auto lg:p-12">
            <div>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center justify-between gap-2">
                  <button
                    type="button"
                    aria-label={
                      isLiked ? "Remove from wishlist" : "Add to wishlist"
                    }
                    aria-pressed={isLiked}
                    onClick={() => onLike(product.id)}
                    className={cx(
                      "flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-0 bg-[#F5F5F5] transition-colors hover:bg-[#D9FF00]",
                      modalFocusRing
                    )}
                  >
                    <Heart
                      size={17}
                      strokeWidth={2.25}
                      className={
                        isLiked
                          ? "fill-[#E11D1D] text-[#E11D1D]"
                          : "text-[#111111]"
                      }
                    />
                  </button>

                  <button
                    type="button"
                    aria-label="Close full screen modal"
                    onClick={onClose}
                    className={cx(
                      "flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-0 bg-[#111111] text-[#FFFFFF] transition-opacity hover:opacity-85",
                      modalFocusRing
                    )}
                  >
                    <X size={18} strokeWidth={2.5} />
                  </button>
                </div>
              </div>

              <h2
                id="product-modal-title"
                className="mt-6 font-display text-4xl font-black uppercase leading-[0.9] tracking-[-0.04em] text-[#111111] sm:text-5xl"
              >
                {product.name}
              </h2>

              <p className="mt-5 font-body text-sm font-medium leading-relaxed text-[#2A2A2A] sm:text-base">
                {product.description}
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border-0 bg-[#F5F5F5] p-4">
                  <span className="block font-display text-[10px] font-bold uppercase tracking-wider text-[#4A4A4A]">
                    Prep / Status
                  </span>
                  <span className="mt-1 block font-display text-base font-black uppercase text-[#111111]">
                    {product.cookTime}
                  </span>
                </div>
                <div className="rounded-2xl border-0 bg-[#F5F5F5] p-4">
                  <span className="block font-display text-[10px] font-bold uppercase tracking-wider text-[#4A4A4A]">
                    Customer Rating
                  </span>
                  <span className="mt-1 inline-flex items-center gap-1.5 font-display text-base font-black text-[#111111]">
                    <Star size={14} strokeWidth={0} fill={PALETTE.red} />
                    {product.rating} / 5.0
                  </span>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border-0 bg-[#F5F5F5] p-5">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="font-display text-xs font-bold uppercase tracking-wider text-[#4A4A4A]">
                    Unit Price
                  </span>
                  <div className="flex items-baseline gap-2.5">
                    {product.oldPrice > product.price && (
                      <span className="text-xs font-semibold text-[#4A4A4A] line-through tabular-nums">
                        {fmt(product.oldPrice)} UGX
                      </span>
                    )}
                    <span className="font-display text-2xl font-black text-[#111111] tabular-nums">
                      {fmt(product.price)} UGX
                    </span>
                  </div>
                </div>
                <p className="mt-2 font-body text-xs font-medium text-[#4A4A4A]">
                  Freshly prepared in Gulu City · {BRAND_NAME}
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex h-14 items-center justify-between gap-3 rounded-2xl border-0 bg-[#F5F5F5] px-4 sm:w-40">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className={cx(
                    "flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-0 bg-[#FFFFFF] text-[#111111]",
                    modalFocusRing
                  )}
                >
                  <Minus size={15} strokeWidth={2.75} />
                </button>
                <span className="font-display text-base font-black tabular-nums text-[#111111]">
                  {qty}
                </span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => setQty(qty + 1)}
                  className={cx(
                    "flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-0 bg-[#FFFFFF] text-[#111111]",
                    modalFocusRing
                  )}
                >
                  <Plus size={15} strokeWidth={2.75} />
                </button>
              </div>

              <motion.button
                type="button"
                onClick={handleAdd}
                {...hoverTap(1.02, 0.98)}
                className={cx(
                  "flex h-14 flex-1 cursor-pointer items-center justify-center gap-2.5 rounded-2xl border-0 px-6 font-display text-xs font-black uppercase tracking-wider sm:text-sm",
                  modalFocusRing
                )}
                style={{
                  backgroundColor: isAdded ? PALETTE.success : PALETTE.lime,
                  color: isAdded ? PALETTE.white : PALETTE.ink,
                }}
              >
                {isAdded ? (
                  <>
                    <Check size={18} strokeWidth={3} />
                    <span>Added to Order</span>
                  </>
                ) : (
                  <>
                    <ShoppingBasket size={18} strokeWidth={2.5} />
                    <span className="tabular-nums">
                      Order now · {fmt(product.price * qty)} UGX
                    </span>
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ───────────── HERO / SPOTLIGHT BANNER ───────────── */
function SpotlightBanner({
  slide,
  direction,
  current,
  total,
  onPrev,
  onNext,
  onGoTo,
  onAddToCart,
  onViewDetails,
  setIsPaused,
}) {
  const [qty, setQty] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const touchStartX = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const discount = savePct(slide.price, slide.oldPrice);

  useEffect(() => {
    setQty(1);
    setIsAdded(false);
  }, [slide.id]);

  function handleOrder() {
    onAddToCart(slide, qty);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  }

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
    if (diff < 0) onNext();
    else onPrev();
  }

  const outlineStyle = { boxShadow: `inset 0 0 0 1px ${slide.line}` };

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
      <Glow />

      <div className="relative z-20 flex w-full items-center justify-between gap-2 md:justify-center">
        
        <span
          className="font-display shrink-0 rounded-full border-0 px-3 py-2 text-[10px] font-extrabold tabular-nums tracking-wider md:block hidden"
          style={{ backgroundColor: slide.glass, color: slide.fg }}
        >
          0{current + 1}/0{total}
        </span>
      </div>

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
                alt={slide.name}
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

        {[
          {
            label: "Previous",
            side: "left-0",
            onClick: onPrev,
            Icon: ChevronLeft,
          },
          { label: "Next", side: "right-0", onClick: onNext, Icon: ChevronRight },
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

      <div className="relative z-20 mx-auto flex w-full max-w-lg flex-col items-center gap-2.5 md:max-w-none md:gap-3">
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
                {fmt(slide.oldPrice * qty)}
              </s>
            </span>
          )}

          <span className={pillClass} style={outlineStyle}>
            <Clock size={13} strokeWidth={2.5} /> {slide.cookTime}
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
              onClick={() => setQty(Math.max(1, qty - 1))}
            >
              <Minus size={13} strokeWidth={3} />
            </button>
            <span className="w-4 text-center tabular-nums">{qty}</span>
            <button
              type="button"
              aria-label="Increase quantity"
              className={cx("cursor-pointer rounded-full border-0", focusRing)}
              onClick={() => setQty(qty + 1)}
            >
              <Plus size={13} strokeWidth={3} />
            </button>
          </span>

          <motion.button
            type="button"
            onClick={handleOrder}
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
              {isAdded ? "Added" : `Order now · ${fmt(slide.price * qty)} UGX`}
            </span>
          </motion.button>

          <motion.button
            type="button"
            onClick={() => onViewDetails(slide)}
            {...hoverTap()}
            className={cx(pillClass, "hidden cursor-pointer md:flex", focusRing)}
            style={{ ...outlineStyle, color: slide.fg }}
          >
            Details <ArrowRight size={13} strokeWidth={2.5} />
          </motion.button>
        </div>

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
              onClick={() => setQty(Math.max(1, qty - 1))}
            >
              <Minus size={13} strokeWidth={3} />
            </button>
            <span className="w-4 text-center text-xs font-extrabold tabular-nums">
              {qty}
            </span>
            <button
              type="button"
              aria-label="Increase quantity"
              className={cx(
                "flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border-0",
                focusRing
              )}
              onClick={() => setQty(qty + 1)}
            >
              <Plus size={13} strokeWidth={3} />
            </button>
          </div>

          <motion.button
            type="button"
            onClick={handleOrder}
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
              {isAdded ? "Added" : `Order · ${fmt(slide.price * qty)} UGX`}
            </span>
          </motion.button>

          <motion.button
            type="button"
            aria-label={`View ${slide.name} details`}
            onClick={() => onViewDetails(slide)}
            whileTap={{ scale: 0.92 }}
            transition={SPRING}
            className={cx(
              "flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border-0",
              focusRing
            )}
            style={{ ...outlineStyle, color: slide.fg }}
          >
            <ArrowRight size={16} strokeWidth={2.5} />
          </motion.button>
        </div>

        <div className="flex w-full items-center gap-1.5 md:w-auto">
          <motion.button
            type="button"
            aria-label="Previous"
            onClick={onPrev}
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
            className="font-display grid flex-1 grid-cols-5 gap-1 md:flex md:flex-initial md:flex-wrap md:items-center md:justify-center md:gap-2"
          >
            {SPOTLIGHT_ITEMS.map((item, i) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={i === current}
                onClick={() => onGoTo(i)}
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
                {item.short}
              </button>
            ))}
          </div>

          <motion.button
            type="button"
            aria-label="Next"
            onClick={onNext}
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
      </div>
    </section>
  );
}

/* ───────────── PRODUCT CARD ───────────── */
function ProductCard({ item, cartCount, isLiked, onAdd, onLike, onView }) {
  const discount = savePct(item.price, item.oldPrice);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } }}
      className="group relative flex w-full min-w-0 flex-col justify-between overflow-hidden rounded-2xl border-0 bg-[#F5F5F5] sm:rounded-3xl"
    >
      <div className="pointer-events-none absolute inset-x-2.5 top-2.5 z-20 flex items-start justify-between gap-2 sm:inset-x-3.5 sm:top-3.5">
        {discount > 0 ? (
          <span className="font-display rounded-full border-0 bg-[#E11D1D] px-2 py-0.5 text-[9px] font-black uppercase tracking-wide text-[#FFFFFF] sm:px-2.5 sm:py-1 sm:text-[10px]">
            Save {discount}%
          </span>
        ) : (
          <span />
        )}

        <button
          type="button"
          aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={isLiked}
          onClick={(e) => {
            e.stopPropagation();
            onLike(item.id);
          }}
          className="pointer-events-auto flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full border-0 bg-[#FFFFFF] transition-transform hover:scale-105 active:scale-95 sm:h-9 sm:w-9"
        >
          <Heart
            size={15}
            strokeWidth={2.25}
            className={
              isLiked
                ? "fill-[#E11D1D] text-[#E11D1D]"
                : "text-[#111111] transition-colors"
            }
          />
        </button>
      </div>

      <div
        onClick={() => onView(item)}
        className="relative flex aspect-square w-full cursor-pointer items-center justify-center overflow-hidden bg-[#F5F5F5] p-4 transition-colors duration-300 group-hover:bg-[#EFEFEF] sm:aspect-[4/3] sm:p-6"
      >
        <img
          src={item.image}
          alt={item.name}
          className="relative z-10 h-full w-full object-contain transition-transform duration-500 ease-out group-hover:scale-105"
        />

        <div className="pointer-events-none absolute inset-x-2.5 bottom-2.5 z-20 flex flex-wrap items-center gap-1 sm:inset-x-3.5 sm:bottom-3 sm:gap-1.5">
          <span
            className="font-display max-w-full truncate rounded-lg border-0 px-2 py-0.5 text-[8px] font-black uppercase tracking-wide sm:rounded-xl sm:px-2.5 sm:py-1 sm:text-[9px]"
            style={{ backgroundColor: item.bubble, color: item.bubbleText }}
          >
            {item.tags[0]}
          </span>
          <span
            className="font-display hidden max-w-full truncate rounded-full border-0 px-2.5 py-1 text-[9px] font-black uppercase tracking-wide sm:inline-block"
            style={{ backgroundColor: item.accent, color: item.accentText }}
          >
            {item.tags[1]}
          </span>
        </div>
      </div>

      <div className="flex flex-grow flex-col justify-between p-3 sm:p-5">
        <div className="space-y-1 sm:space-y-1.5">
          <div className="flex items-center justify-between gap-1.5">
            <span className="font-display truncate text-[9px] font-bold uppercase tracking-wider text-[#4A4A4A] sm:text-[10px]">
              {item.categoryLabel}
            </span>
            <div className="flex shrink-0 items-center gap-1 rounded-full border-0 bg-[#111111] px-1.5 py-0.5 text-[#FFFFFF] sm:px-2">
              <Star size={10} strokeWidth={0} fill={PALETTE.lime} />
              <span className="font-display text-[9px] font-black sm:text-[10px]">
                {item.rating}
              </span>
            </div>
          </div>

          <h3
            onClick={() => onView(item)}
            className="font-display line-clamp-2 cursor-pointer text-[13px] font-black uppercase leading-snug tracking-tight text-[#111111] transition-colors hover:text-[#E11D1D] sm:text-base"
          >
            {item.name}
          </h3>

          <p className="line-clamp-2 hidden font-body text-xs font-medium leading-relaxed text-[#2A2A2A] sm:block">
            {item.description}
          </p>
        </div>

        <div className="mt-3 flex items-end justify-between gap-1.5 pt-2 sm:mt-4 sm:pt-3">
          <div className="min-w-0">
            {item.oldPrice > item.price && (
              <span className="block truncate text-[10px] font-semibold text-[#4A4A4A] line-through sm:text-[11px]">
                {fmt(item.oldPrice)} UGX
              </span>
            )}
            <div className="flex items-baseline gap-1">
              <span className="font-display truncate text-[15px] font-black tracking-tight text-[#111111] sm:text-xl">
                {fmt(item.price)}
              </span>
              <span className="font-display shrink-0 text-[9px] font-bold uppercase text-[#4A4A4A] sm:text-[10px]">
                UGX
              </span>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            {cartCount > 0 && (
              <span
                className="font-display flex h-7 min-w-[1.75rem] items-center justify-center rounded-full border-0 px-1.5 text-[11px] font-black sm:h-8 sm:min-w-[2rem] sm:text-xs"
                style={{
                  backgroundColor: PALETTE.lime,
                  color: PALETTE.ink,
                }}
              >
                {cartCount}
              </span>
            )}

            <motion.button
              type="button"
              aria-label={`Add ${item.name} to bag`}
              onClick={() => onAdd(item, 1)}
              {...hoverTap(1.08, 0.92)}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-0 sm:h-10 sm:w-10"
              style={{
                backgroundColor: PALETTE.ink,
                color: PALETTE.lime,
              }}
            >
              <Plus size={16} strokeWidth={2.75} />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ───────────── FLOATING CART ───────────── */
function CartLine({ item, onAdd, onDecrease, onRemove }) {
  return (
    <div className="flex items-center justify-between gap-3 py-3">
      <img
        src={item.image}
        alt={item.name}
        className="h-12 w-12 flex-shrink-0 rounded-xl border-0 bg-[#F5F5F5] object-contain p-1"
      />
      <div className="min-w-0 flex-grow">
        <h4 className="font-display truncate text-xs font-black uppercase text-[#111111]">
          {item.name}
        </h4>
        <span className="text-[11px] font-semibold text-[#4A4A4A]">
          {fmt(item.price)} UGX
        </span>
      </div>

      <div className="flex flex-shrink-0 items-center gap-1.5">
        <button
          type="button"
          aria-label="Decrease"
          onClick={() => onDecrease(item.id)}
          className={cx(stepBtnClass, "h-7 w-7 sm:h-6 sm:w-6")}
        >
          <Minus size={10} strokeWidth={3} />
        </button>
        <span className="font-display w-5 text-center text-xs font-black text-[#111111]">
          {item.quantity}
        </span>
        <button
          type="button"
          aria-label="Increase"
          onClick={() => onAdd(item, 1)}
          className={cx(stepBtnClass, "h-7 w-7 sm:h-6 sm:w-6")}
        >
          <Plus size={10} strokeWidth={3} />
        </button>
        <button
          type="button"
          aria-label="Remove"
          onClick={() => onRemove(item.id)}
          className="ml-1 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border-0 text-[#E11D1D] hover:bg-[#F5F5F5] sm:h-6 sm:w-6"
        >
          <Trash2 size={12} />
        </button>
      </div>
    </div>
  );
}

function FloatingPillCart({
  expanded,
  onToggle,
  cartItems,
  totalItems,
  subtotal,
  tax,
  shipping,
  total,
  onAdd,
  decreaseQuantity,
  removeFromCart,
}) {
  const lastImage =
    cartItems.length > 0 ? cartItems[cartItems.length - 1].image : null;
  const deliveryLabel = shipping === 0 ? "FREE" : `${fmt(shipping)} UGX`;
  const remainingForFreeDelivery = Math.max(
    0,
    FREE_DELIVERY_THRESHOLD - subtotal
  );

  function handleWhatsApp() {
    const lines = cartItems.map(
      (it, i) =>
        `${i + 1}. ${it.name} x${it.quantity} - ${fmt(it.price * it.quantity)} UGX`
    );
    const message = [
      `Hello ${BRAND_NAME} (${SLOGAN}), I would like to place an order:`,
      "",
      ...lines,
      "",
      `Subtotal: ${fmt(subtotal)} UGX`,
      `Tax (18%): ${fmt(tax)} UGX`,
      `Delivery: ${deliveryLabel}`,
      `*Total: ${fmt(total)} UGX*`,
    ].join("\n");

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener"
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={SPRING}
            className="mb-3 flex max-h-[75vh] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-3xl border-0 bg-[#FFFFFF] text-[#111111] sm:mb-4 sm:w-96 sm:max-w-none"
          >
            <div
              className="flex items-center justify-between border-0 p-4"
              style={{
                backgroundColor: PALETTE.ink,
                color: PALETTE.white,
              }}
            >
              <div className="flex items-center gap-2">
                <ShoppingBasket
                  size={18}
                  strokeWidth={2.5}
                  style={{ color: PALETTE.lime }}
                />
                <span className="font-display text-sm font-black uppercase tracking-wide">
                  Your Order ({totalItems})
                </span>
              </div>

              <button
                type="button"
                onClick={onToggle}
                className={cx(
                  "cursor-pointer rounded-full border-0 bg-[#FFFFFF]/15 px-3 py-1 font-display text-[10px] font-bold uppercase tracking-wider text-[#FFFFFF] transition-colors hover:bg-[#FFFFFF]/25",
                  focusRing
                )}
              >
                Close
              </button>
            </div>

            {cartItems.length === 0 ? (
              <div className="p-8 text-center">
                <p className="font-display text-sm font-black uppercase text-[#111111]">
                  Your bag is empty
                </p>
                <p className="mt-1 font-body text-xs font-medium text-[#4A4A4A]">
                  Add pork, burgers, pizza, or chicken to start an order.
                </p>
              </div>
            ) : (
              <>
                <div className="bg-[#F5F5F5] px-4 py-2.5 text-[11px] font-semibold text-[#111111]">
                  {remainingForFreeDelivery === 0 ? (
                    <span className="font-bold text-[#111111]">
                      Unlocked free Gulu City delivery
                    </span>
                  ) : (
                    <span>
                      Add{" "}
                      <strong className="font-black text-[#111111]">
                        {fmt(remainingForFreeDelivery)} UGX
                      </strong>{" "}
                      for free delivery
                    </span>
                  )}
                </div>

                <div className="flex-1 overflow-y-auto px-4">
                  {cartItems.map((item) => (
                    <CartLine
                      key={item.id}
                      item={item}
                      onAdd={onAdd}
                      onDecrease={decreaseQuantity}
                      onRemove={removeFromCart}
                    />
                  ))}
                </div>

                <div className="space-y-2 border-0 bg-[#F5F5F5] p-4">
                  <div className="flex items-center justify-between text-xs font-medium text-[#4A4A4A]">
                    <span>Subtotal</span>
                    <span className="font-bold tabular-nums text-[#111111]">
                      {fmt(subtotal)} UGX
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-medium text-[#4A4A4A]">
                    <span>Tax (18%)</span>
                    <span className="font-bold tabular-nums text-[#111111]">
                      {fmt(tax)} UGX
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-medium text-[#4A4A4A]">
                    <span>Delivery</span>
                    <span className="font-black tabular-nums text-[#111111]">
                      {deliveryLabel}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-2 font-display text-sm font-black uppercase text-[#111111]">
                    <span>Total</span>
                    <span className="tabular-nums">{fmt(total)} UGX</span>
                  </div>

                  <motion.button
                    type="button"
                    onClick={handleWhatsApp}
                    {...hoverTap(1.02, 0.98)}
                    className={cx(
                      "mt-2 flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border-0 font-display text-xs font-black uppercase tracking-wider",
                      focusRing
                    )}
                    style={{
                      backgroundColor: PALETTE.lime,
                      color: PALETTE.ink,
                    }}
                  >
                    <span>Order on WhatsApp</span>
                    <ArrowRight size={15} strokeWidth={2.5} />
                  </motion.button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={onToggle}
        {...hoverTap(1.05, 0.95)}
        aria-label={`Toggle order bag with ${totalItems} items`}
        className={cx(
          "flex cursor-pointer items-center gap-3 rounded-full border-0 px-4 py-3 font-display text-xs font-black uppercase tracking-wide",
          focusRing
        )}
        style={{ backgroundColor: PALETTE.ink, color: PALETTE.white }}
      >
        {lastImage ? (
          <img
            src={lastImage}
            alt=""
            className="h-7 w-7 rounded-full border-0 bg-[#F5F5F5] object-contain p-0.5"
          />
        ) : (
          <ShoppingBasket
            size={16}
            strokeWidth={2.5}
            style={{ color: PALETTE.lime }}
          />
        )}
        <span className="tabular-nums">
          {totalItems} · {fmt(total)} UGX
        </span>
      </motion.button>
    </div>
  );
}

export default function Products({ onSelectProduct }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState("right");
  const [isPaused, setIsPaused] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [likedIds, setLikedIds] = useState([]);
  const [cartExpanded, setCartExpanded] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const {
    cartItems = [],
    addToCart = () => {},
    decreaseQuantity = () => {},
    removeFromCart = () => {},
  } = useCart() || {};

  const totalSlides = SPOTLIGHT_ITEMS.length;
  const slide = SPOTLIGHT_ITEMS[current];

  const goNext = () => {
    setDirection("right");
    setCurrent((prev) => (prev + 1) % totalSlides);
  };

  const goPrev = () => {
    setDirection("left");
    setCurrent((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goTo = (index) => {
    if (index === current) return;
    setDirection(index > current ? "right" : "left");
    setCurrent(index);
  };

  useEffect(() => {
    if (isPaused || selectedProduct) return;
    const timer = setInterval(() => {
      setDirection("right");
      setCurrent((prev) => (prev + 1) % totalSlides);
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [isPaused, selectedProduct, totalSlides]);

  function handleToggleLike(id) {
    setLikedIds((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  }

  function handleViewDetails(item) {
    setSelectedProduct(item);
    if (typeof onSelectProduct === "function") {
      onSelectProduct(item);
    }
  }

  const filteredItems =
    activeCategory === "all"
      ? ITEMS
      : ITEMS.filter((item) => item.category === activeCategory);

  const totalItems = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );
  const tax = Math.round(subtotal * 0.18);
  const shipping =
    subtotal === 0 || subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : 5000;
  const total = subtotal + tax + shipping;

  return (
    <div className="font-display min-h-screen w-full border-0 bg-[#FFFFFF] text-[#111111] selection:bg-[#D9FF00] selection:text-[#111111]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@600;700;800;900&family=Inter:wght@400;500;600;700&display=swap');
        .font-display { font-family: 'Archivo', sans-serif; }
        .font-body { font-family: 'Inter', sans-serif; }
      `}</style>

      <SpotlightBanner
        slide={slide}
        direction={direction}
        current={current}
        total={totalSlides}
        onPrev={goPrev}
        onNext={goNext}
        onGoTo={goTo}
        onAddToCart={addToCart}
        onViewDetails={handleViewDetails}
        setIsPaused={setIsPaused}
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-12">
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="mb-3 inline-flex items-center gap-2 rounded-full border-0 bg-[#111111] px-4 py-1.5 text-[11px] font-bold uppercase tracking-wide text-[#D9FF00]">
              <Flame size={13} strokeWidth={2.5} />
              {BRAND_NAME} · {SLOGAN}
            </span>
            <h2 className="font-display text-4xl font-black uppercase leading-[0.9] tracking-[-0.04em] text-[#111111] sm:text-5xl">
              Full Menu
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(({ key, label, icon: CatIcon }) => {
              const isActive = activeCategory === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveCategory(key)}
                  className={cx(
                    "flex cursor-pointer items-center gap-2 rounded-full border-0 px-4 py-2.5 text-xs font-bold uppercase tracking-wide transition-colors",
                    modalFocusRing,
                    isActive
                      ? "bg-[#111111] text-[#D9FF00]"
                      : "bg-[#F5F5F5] text-[#111111] hover:bg-[#EFEFEF] hover:text-[#111111]"
                  )}
                >
                  <CatIcon size={14} strokeWidth={2.5} />
                  <span>{label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
          {filteredItems.map((item) => {
            const inCart = cartItems.find((c) => c.id === item.id);
            return (
              <ProductCard
                key={item.id}
                item={item}
                cartCount={inCart ? inCart.quantity || 1 : 0}
                isLiked={likedIds.includes(item.id)}
                onAdd={addToCart}
                onLike={handleToggleLike}
                onView={handleViewDetails}
              />
            );
          })}
        </div>
      </section>

      <ProductModal
        product={selectedProduct}
        isLiked={selectedProduct ? likedIds.includes(selectedProduct.id) : false}
        onLike={handleToggleLike}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={addToCart}
      />

      <FloatingPillCart
        expanded={cartExpanded}
        onToggle={() => setCartExpanded((prev) => !prev)}
        cartItems={cartItems}
        totalItems={totalItems}
        subtotal={subtotal}
        tax={tax}
        shipping={shipping}
        total={total}
        onAdd={addToCart}
        decreaseQuantity={decreaseQuantity}
        removeFromCart={removeFromCart}
      />
    </div>
  );
}