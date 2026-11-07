import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart, Star, Clock, ShieldCheck, Minus, Plus, X,
  ShoppingBasket, ArrowRight, Beef, Drumstick,
  Sandwich, Pizza as PizzaIcon, Trash2, ChevronDown,
  ChevronUp, Utensils, Check, Flame, ChevronLeft, ChevronRight
} from "lucide-react";

import { useCart } from "../components/cart/CartContext";

// ASSETS
import PizzaImg from "../assets/pizza(17).png";
import FreshPork from "../assets/freshporke.png";
import Porkies from "../assets/PremiumPlate.png";
import PorkStake from "../assets/ChatGPT Image Jun 18, 2026, 03_34_25 PM.png";
import BurgerImg from "../assets/Burger.png";
import ChickenImg from "../assets/fullchicken.png";

const WHATSAPP_NUMBER = "256776464823";
const BRAND_NAME = "Green Pork";
const FREE_DELIVERY_THRESHOLD = 50000;
const AUTOPLAY_MS = 5500;

/* ═══════════════════════════════════════════════════════════
   HERO DESIGN SYSTEM TOKENS (No Orange / Gold)
   ═══════════════════════════════════════════════════════════ */
const RED = "#E11D1D";
const LIME = "#D9FF00";
const PIZZA = "#E65C00";
const DARK = "#2E0101";
const WHITE = "#FFFFFF";
const SUCCESS_COLOR = "#059669";

const fmt = (v) => Number(v).toLocaleString();
const savePct = (price, oldPrice) => {
  const o = parseInt(oldPrice, 10);
  if (!o || o <= price) return 0;
  return Math.round(((o - price) / o) * 100);
};

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

// Shared class strings matching Hero.jsx
const pill = "flex items-center gap-2 rounded-full px-4 py-2.5 text-[11px] sm:text-xs font-bold uppercase tracking-wide transition-colors duration-700";
const tab = "cursor-pointer rounded-full border px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wide transition-colors duration-300";
const focusRing = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--fg)]";

/* ═══════════════════════════════════════════════════════════
   DATA WITH SLIDE-SPECIFIC THEMES
   ═══════════════════════════════════════════════════════════ */
const ITEMS = [
  {
    id: 1,
    short: "Burger",
    words: ["CHEESY", "BURGER"],
    category: "burgers",
    categoryLabel: "Premium Angus Beef Burger",
    name: "Angus Beef Burger",
    image: BurgerImg,
    price: 10000,
    oldPrice: 12000,
    description: "Juicy grilled beef patty with crisp lettuce, double melted cheddar, and our signature smoked pepper sauce.",
    rating: 4.9,
    cookTime: "10 min",
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
    id: 2,
    short: "Skewers",
    words: ["SMOKY", "PORK"],
    category: "skewers",
    categoryLabel: "Premium Wood-Fired Pork Skewers",
    name: "Wood-Fired Pork Skewers",
    image: Porkies,
    price: 15000,
    oldPrice: 18000,
    description: "Succulent, spice-rubbed pork skewers charred over wood fire. Served with fried cassava, kachumbari, and chili dip.",
    rating: 4.9,
    cookTime: "12 min",
    tags: ["Extra Cassava", "Farm Fresh"],
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
    id: 3,
    short: "Special",
    words: ["ROASTED", "PORK"],
    category: "pork",
    categoryLabel: "Crispy Roasted Pork Special",
    name: "Crispy Pork Belly Roast",
    image: PorkStake,
    price: 6000,
    oldPrice: 8000,
    description: "Crispy skin, tender slow-roasted pork cuts with seasoned cassava strips, fresh salads, and grilled chapati.",
    rating: 4.9,
    cookTime: "15 min",
    tags: ["Slow Roasted", "Wood Fired"],
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
    id: 4,
    short: "Pizza",
    words: ["FIRED", "PIZZA"],
    category: "pizza",
    categoryLabel: "Artisan Stone-Baked Pizza",
    name: "Chicken & Pork Fusion Pizza",
    image: PizzaImg,
    price: 15000,
    oldPrice: 18000,
    rating: 4.8,
    cookTime: "18 min",
    description: "Hand-stretched dough topped with pulled wood-fired pork chunks, seasoned chicken slices, and fresh mozzarella.",
    tags: ["Stone-Baked", "Mozzarella"],
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
    id: 5,
    short: "Chicken",
    words: ["GOLDEN", "CHICKEN"],
    category: "chicken",
    categoryLabel: "Premium Fire-Roasted Chicken",
    name: "Fire-Roasted Whole Chicken",
    image: ChickenImg,
    price: 55000,
    oldPrice: 78000,
    rating: 4.9,
    cookTime: "25 min",
    description: "Farm-fresh whole chicken marinated for 24 hours in Ugandan herbs and roasted over charcoal until golden.",
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
  {
    id: 6,
    short: "Raw Pork",
    words: ["FARM", "FRESH"],
    category: "raw",
    categoryLabel: "Hygienic Raw Pork Cuts (1kg)",
    name: "Fresh Pork Cuts (1kg)",
    image: FreshPork,
    price: 16000,
    oldPrice: 20000,
    rating: 4.9,
    cookTime: "Ready to cook",
    description: "Hygienically packaged and vacuum-sealed raw pork chops and ribs straight from certified organic farms.",
    tags: ["100% Organic", "Hygienic"],
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
];

const SPOTLIGHT_ITEMS = [ITEMS[0], ITEMS[1], ITEMS[2], ITEMS[3], ITEMS[4]];

const CATEGORIES = [
  { key: "all", label: "All Items", icon: Utensils },
  { key: "pork", label: "Roasted Pork", icon: Beef },
  { key: "skewers", label: "Pork Skewers", icon: Beef },
  { key: "chicken", label: "Roasted Chicken", icon: Drumstick },
  { key: "burgers", label: "Burgers", icon: Sandwich },
  { key: "pizza", label: "Stone Pizza", icon: PizzaIcon },
  { key: "raw", label: "Raw Pork Cuts", icon: ShieldCheck },
];

/* ═══════════════════════════════════════════════════════════
   HERO / SPOTLIGHT BANNER COMPONENT
   ═══════════════════════════════════════════════════════════ */
function SpotlightBanner({
  slide,
  direction,
  onPrev,
  onNext,
  onGoTo,
  current,
  total,
  onAddToCart,
  onViewDetails,
  isPaused,
  setIsPaused,
}) {
  const [qty, setQty] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    setQty(1);
    setIsAdded(false);
  }, [slide.id]);

  function handleOrder() {
    onAddToCart(slide, qty);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  }

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured gallery"
      className="relative flex min-h-[100dvh] w-full select-none flex-col overflow-hidden px-4 pb-6 pt-6 transition-colors duration-700 lg:px-12 lg:pt-8"
      style={{ backgroundColor: slide.bg, "--fg": slide.fg }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Center soft glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 60%)",
        }}
      />

      {/* Category Eyebrow */}
      <div className="relative z-20 flex justify-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={`cat-${slide.id}`}
            {...fadeUp(0)}
            className="font-display inline-flex// hidden items-center gap-2 rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-wide backdrop-blur-md"
            style={{ backgroundColor: slide.glass, color: slide.fg }}
          >
            <Flame size={13} strokeWidth={2.5} />
            {slide.categoryLabel}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Stage */}
      <div className="relative z-10 flex min-h-0 flex-1 items-center justify-center">
        {/* Giant background words */}
        <AnimatePresence mode="wait">
          <motion.h1
            key={`w-${slide.id}`}
            {...fadeUp(0.05)}
            className="font-display pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center font-black uppercase leading-[0.82] tracking-[-0.04em]"
            style={{ color: slide.word, fontSize: "clamp(4.5rem, 20vw, 16rem)" }}
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
            className="relative z-10 flex h-[44vh] w-full items-center justify-center sm:h-[46vh] lg:h-[60vh]"
          >
            <img
              src={slide.image}
              alt={slide.name}
              className="pointer-events-none h-full max-w-[85vw] object-contain lg:max-w-[48rem]"
              style={{ filter: "drop-shadow(0 30px 30px rgba(0,0,0,0.35))" }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Left Speech bubble */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`b1-${slide.id}`}
            {...fadeUp(0.3)}
            className="font-display absolute bottom-[14%] left-[3%] z-20 -rotate-3 rounded-2xl px-4 py-2 text-[11px] font-extrabold uppercase lg:bottom-[18%] lg:left-[22%] lg:px-5 lg:py-2.5 lg:text-sm"
            style={{ backgroundColor: slide.bubble, color: slide.bubbleText }}
          >
            {slide.tags[0]}
            <span className="absolute -bottom-1 left-6 h-3 w-3 rotate-45" style={{ backgroundColor: slide.bubble }} />
          </motion.div>
        </AnimatePresence>

        {/* Right Accent badge */}
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

        {/* Direction Controls */}
        <motion.button
          type="button"
          onClick={onPrev}
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
          onClick={onNext}
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

      {/* Hero Bottom Bar */}
      <div className="relative z-20 flex flex-col items-center gap-3">
        <div className="font-display flex flex-wrap items-center justify-center gap-2 sm:gap-3" style={{ color: slide.fg }}>
          {savePct(slide.price, slide.oldPrice) > 0 && (
            <span className={`${pill} shadow-sm`} style={{ backgroundColor: slide.accent, color: slide.accentText }}>
              Save {savePct(slide.price, slide.oldPrice)}%
              <s className="font-semibold opacity-60">{fmt(slide.oldPrice * qty)}</s>
            </span>
          )}

          <span className={`${pill} border`} style={{ borderColor: slide.line }}>
            <Clock size={13} strokeWidth={2.5} /> {slide.cookTime}
          </span>

          <span className={`${pill} border`} style={{ borderColor: slide.line }}>
            <Star size={13} strokeWidth={2.5} fill="currentColor" /> {slide.rating}
          </span>

          {/* Stepper */}
          <span className={`${pill} border`} style={{ borderColor: slide.line }}>
            <button
              type="button"
              aria-label="Reduce quantity"
              className={`cursor-pointer rounded-full ${focusRing}`}
              onClick={() => setQty(Math.max(1, qty - 1))}
            >
              <Minus size={13} strokeWidth={3} />
            </button>
            <span className="w-4 text-center">{qty}</span>
            <button
              type="button"
              aria-label="Increase quantity"
              className={`cursor-pointer rounded-full ${focusRing}`}
              onClick={() => setQty(qty + 1)}
            >
              <Plus size={13} strokeWidth={3} />
            </button>
          </span>

          {/* Add / Order Action */}
          <motion.button
            type="button"
            onClick={handleOrder}
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
            {isAdded ? "Added" : `Order now · ${fmt(slide.price * qty)} UGX`}
          </motion.button>

          {/* Details CTA */}
          <motion.button
            type="button"
            onClick={() => onViewDetails(slide)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={spring}
            className={`${pill} cursor-pointer border backdrop-blur-sm`}
            style={{ borderColor: slide.line, color: slide.fg }}
          >
            Details <ArrowRight size={13} strokeWidth={2.5} />
          </motion.button>
        </div>

        {/* Dish tabs (matching Hero.jsx, without progress bar) */}
        <div role="tablist" aria-label="Choose a dish" className="font-display flex flex-wrap items-center justify-center gap-2">
          {SPOTLIGHT_ITEMS.map((s, i) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={i === current}
              onClick={() => onGoTo(i)}
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
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   PRODUCT CARD (Aligned to Hero Language)
   ═══════════════════════════════════════════════════════════ */
function ProductCard({ item, cartCount, onAdd, onLike, isLiked, onView }) {
  const discount = savePct(item.price, item.oldPrice);

  return (
    <motion.div
      layout
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.4, ease } },
      }}
      initial="hidden"
      animate="show"
      exit="hidden"
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[#2E0101]/10 bg-white shadow-sm transition-all duration-300 hover:shadow-xl"
    >
      {/* Top badges */}
      <div className="absolute left-3.5 top-3.5 z-20 flex flex-col items-start gap-1">
        {discount > 0 && (
          <span className="font-display rounded-full bg-[#E11D1D] px-2.5 py-1 text-[9px] font-black uppercase text-white shadow-sm">
            Save {discount}%
          </span>
        )}
      </div>

      <button
        type="button"
        aria-label="Wishlist"
        onClick={(e) => {
          e.stopPropagation();
          onLike(item.id);
        }}
        className="absolute right-3.5 top-3.5 z-20 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/40 backdrop-blur-md transition-all hover:bg-white"
      >
        <Heart
          size={15}
          strokeWidth={2.5}
          className={isLiked ? "fill-[#E11D1D] text-[#E11D1D]" : "text-[#2E0101]"}
        />
      </button>

      {/* Visual Header / Stage Box */}
      <div
        onClick={() => onView(item)}
        className="relative flex h-56 cursor-pointer items-center justify-center overflow-hidden p-6 transition-colors duration-700"
        style={{ backgroundColor: item.bg }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 60%)",
          }}
        />

        {/* Giant word overlay */}
        <span
          className="font-display pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center font-black uppercase leading-[0.82] tracking-[-0.04em]"
          style={{ color: item.word, fontSize: "clamp(3.5rem, 10vw, 5.5rem)" }}
        >
          <span>{item.words[0]}</span>
          <span>{item.words[1]}</span>
        </span>

        <img
          src={item.image}
          alt={item.name}
          className="relative z-10 h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
          style={{ filter: "drop-shadow(0 20px 20px rgba(0,0,0,0.35))" }}
        />

        {/* Small corner tags */}
        <span
          className="font-display absolute bottom-3 left-3 z-20 -rotate-2 rounded-xl px-2.5 py-1 text-[9px] font-black uppercase"
          style={{ backgroundColor: item.bubble, color: item.bubbleText }}
        >
          {item.tags[0]}
        </span>
        <span
          className="font-display absolute bottom-3 right-3 z-20 rounded-full px-2.5 py-1 text-[9px] font-black uppercase shadow-sm"
          style={{ backgroundColor: item.accent, color: item.accentText }}
        >
          {item.tags[1]}
        </span>
      </div>

      {/* Body Content */}
      <div className="flex flex-grow flex-col justify-between space-y-4 p-5">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="font-display text-[10px] font-bold uppercase tracking-wider text-[#2E0101]/60">
              {item.categoryLabel}
            </span>
            <div className="flex items-center gap-1 rounded-full bg-[#2E0101] px-2 py-0.5 text-white">
              <Star size={11} strokeWidth={0} fill={LIME} />
              <span className="font-display text-[10px] font-black">{item.rating}</span>
            </div>
          </div>

          <h3
            onClick={() => onView(item)}
            className="font-display line-clamp-1 cursor-pointer text-base font-black uppercase tracking-tight text-[#2E0101] transition-colors hover:text-[#E11D1D]"
          >
            {item.name}
          </h3>

          <p className="line-clamp-2 text-xs font-medium text-[#2E0101]/70 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Bottom price + CTA */}
        <div className="flex items-center justify-between border-t border-[#2E0101]/10 pt-3">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="font-display text-xl font-black text-[#2E0101]">
                {fmt(item.price)}
              </span>
              <span className="font-display text-[10px] font-bold uppercase text-[#2E0101]/50">
                UGX
              </span>
            </div>
            {item.oldPrice > item.price && (
              <span className="block text-[11px] font-semibold text-[#2E0101]/40 line-through">
                {fmt(item.oldPrice)} UGX
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {cartCount > 0 && (
              <span
                className="font-display flex h-7 w-7 items-center justify-center rounded-full text-xs font-black shadow-sm"
                style={{ backgroundColor: LIME, color: DARK }}
              >
                {cartCount}
              </span>
            )}

            <motion.button
              type="button"
              aria-label="Add item"
              onClick={() => onAdd(item, 1)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              transition={spring}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full shadow-md"
              style={{ backgroundColor: DARK, color: LIME }}
            >
              <Plus size={18} strokeWidth={3} />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   FLOATING CART (Styled with Hero red, dark, lime)
   ═══════════════════════════════════════════════════════════ */
function FloatingPillCart({
  expanded,
  onToggle,
  cartItems,
  totalItems,
  subtotal,
  tax,
  shipping,
  total,
  addToCart,
  decreaseQuantity,
  removeFromCart,
}) {
  const lastImage = cartItems.length > 0 ? cartItems[cartItems.length - 1].image : null;

  function handleWhatsApp() {
    let msg = `Hello ${BRAND_NAME}, I would like to place an order:\n\n`;
    cartItems.forEach((it, idx) => {
      msg += `${idx + 1}. ${it.name} x${it.quantity} - ${fmt(it.price * it.quantity)} UGX\n`;
    });
    msg += `\nSubtotal: ${fmt(subtotal)} UGX`;
    msg += `\nTax (18%): ${fmt(tax)} UGX`;
    msg += `\nDelivery: ${shipping === 0 ? "FREE" : `${fmt(shipping)} UGX`}`;
    msg += `\n*Total: ${fmt(total)} UGX*`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  }

  const btnStep = "flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-[#2E0101]/5 text-[#2E0101] transition-colors hover:bg-[#2E0101]/15";

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={spring}
            className="mb-4 flex max-h-[75vh] w-80 flex-col overflow-hidden rounded-3xl border border-[#2E0101]/10 bg-white shadow-2xl sm:w-96"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4" style={{ backgroundColor: DARK, color: WHITE }}>
              <div className="flex items-center gap-2">
                <ShoppingBasket size={18} strokeWidth={2.5} style={{ color: LIME }} />
                <h3 className="font-display text-xs font-black uppercase tracking-wide">
                  Your Order Bag
                </h3>
              </div>
              <button
                type="button"
                aria-label="Close cart"
                onClick={onToggle}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              >
                <X size={14} strokeWidth={3} />
              </button>
            </div>

            {/* Free Delivery Bar */}
            {subtotal > 0 && subtotal < FREE_DELIVERY_THRESHOLD && (
              <div className="bg-[#2E0101]/[0.03] p-4 text-[11px] font-medium text-[#2E0101]">
                Add <span className="font-display font-black text-[#E11D1D]">{fmt(FREE_DELIVERY_THRESHOLD - subtotal)} UGX</span> more for free delivery!
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[#2E0101]/10">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min(100, (subtotal / FREE_DELIVERY_THRESHOLD) * 100)}%`,
                      backgroundColor: RED,
                    }}
                  />
                </div>
              </div>
            )}

            {/* Items */}
            <div className="max-h-64 flex-grow space-y-1 overflow-y-auto p-4">
              {cartItems.length === 0 ? (
                <div className="py-10 text-center text-[#2E0101]/40">
                  <ShoppingBasket size={32} className="mx-auto mb-2 opacity-30" strokeWidth={1.5} />
                  <p className="font-display text-xs font-bold uppercase">Your bag is empty</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between gap-3 py-3 border-b border-[#2E0101]/5 last:border-none">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-12 w-12 flex-shrink-0 rounded-xl bg-[#2E0101]/[0.04] object-contain p-1"
                    />
                    <div className="min-w-0 flex-grow">
                      <h4 className="font-display truncate text-xs font-black uppercase text-[#2E0101]">
                        {item.name}
                      </h4>
                      <span className="text-[11px] font-semibold text-[#2E0101]/60">
                        {fmt(item.price)} UGX
                      </span>
                    </div>

                    <div className="flex flex-shrink-0 items-center gap-1.5">
                      <button type="button" aria-label="Decrease" onClick={() => decreaseQuantity(item.id)} className={btnStep}>
                        <Minus size={10} strokeWidth={3} />
                      </button>
                      <span className="font-display w-5 text-center text-xs font-black text-[#2E0101]">
                        {item.quantity}
                      </span>
                      <button type="button" aria-label="Increase" onClick={() => addToCart(item, 1)} className={btnStep}>
                        <Plus size={10} strokeWidth={3} />
                      </button>
                      <button
                        type="button"
                        aria-label="Remove"
                        onClick={() => removeFromCart(item.id)}
                        className="ml-1 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full text-[#E11D1D] hover:bg-[#E11D1D]/10"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Summary */}
            {cartItems.length > 0 && (
              <div className="space-y-2 p-4" style={{ backgroundColor: DARK, color: WHITE }}>
                <div className="flex justify-between text-xs text-white/70">
                  <span>Subtotal</span>
                  <span className="font-bold text-white">{fmt(subtotal)} UGX</span>
                </div>
                <div className="flex justify-between text-xs text-white/70">
                  <span>Tax (18%)</span>
                  <span className="font-bold text-white">{fmt(tax)} UGX</span>
                </div>
                <div className="flex justify-between text-xs text-white/70">
                  <span>Delivery fee</span>
                  <span className="font-bold" style={{ color: LIME }}>
                    {shipping === 0 ? "FREE" : `${fmt(shipping)} UGX`}
                  </span>
                </div>
                <div className="mt-2 flex justify-between border-t border-white/10 pt-2 font-display text-sm font-black">
                  <span>Total</span>
                  <span style={{ color: LIME }}>{fmt(total)} UGX</span>
                </div>

                <motion.button
                  type="button"
                  onClick={handleWhatsApp}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={spring}
                  className="font-display mt-3 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full py-3.5 text-xs font-extrabold uppercase tracking-wide shadow-lg"
                  style={{ backgroundColor: LIME, color: DARK }}
                >
                  Checkout via WhatsApp <ArrowRight size={15} strokeWidth={3} />
                </motion.button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pill Toggle Button */}
      <motion.button
        type="button"
        onClick={onToggle}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={spring}
        className="flex cursor-pointer items-center gap-3 rounded-full py-3 pl-3 pr-6 text-white shadow-2xl"
        style={{ backgroundColor: DARK }}
      >
        <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white/15">
          {lastImage ? (
            <img src={lastImage} alt="Dish" className="h-full w-full object-contain p-1" />
          ) : (
            <ShoppingBasket size={18} strokeWidth={2.5} style={{ color: LIME }} />
          )}
        </div>

        <div className="flex flex-col text-left">
          <span className="font-display flex items-center gap-1.5 text-xs font-black uppercase tracking-wide">
            {totalItems > 0 ? `${totalItems} item${totalItems !== 1 ? "s" : ""}` : "Bag empty"}
            {expanded ? <ChevronDown size={12} strokeWidth={3} /> : <ChevronUp size={12} strokeWidth={3} />}
          </span>
          <span className="text-[10px] font-semibold text-white/70">
            {totalItems > 0 ? `${fmt(subtotal)} UGX` : "Tap to open"}
          </span>
        </div>
      </motion.button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   FULLSCREEN DETAILS MODAL (Exact Hero Canvas styling)
   ═══════════════════════════════════════════════════════════ */
function ProductDetailsModal({ item, onClose, onAdd }) {
  const [qty, setQty] = useState(1);
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center" style={{ backgroundColor: DARK }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={spring}
        className="relative flex h-screen w-screen flex-col overflow-y-auto bg-white md:flex-row"
      >
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute right-6 top-6 z-40 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white/30 text-white backdrop-blur-md transition-colors hover:bg-white md:bg-[#2E0101]/10 md:text-[#2E0101] md:hover:bg-[#2E0101]/20"
        >
          <X size={20} strokeWidth={2.5} />
        </button>

        {/* Left Visual Stage */}
        <div
          className="relative flex h-[48vh] w-full items-center justify-center overflow-hidden p-8 md:h-screen md:w-1/2"
          style={{ backgroundColor: item.bg }}
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 60%)",
            }}
          />

          <span
            className="font-display pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center font-black uppercase leading-[0.82] tracking-[-0.04em]"
            style={{ color: item.word, fontSize: "clamp(4.5rem, 16vw, 13rem)" }}
          >
            <span>{item.words[0]}</span>
            <span>{item.words[1]}</span>
          </span>

          <motion.img
            src={item.image}
            alt={item.name}
            className="relative z-10 h-full w-full max-w-2xl object-contain"
            style={{ filter: "drop-shadow(0 30px 30px rgba(0,0,0,0.35))" }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          <div
            className="font-display absolute bottom-[14%] left-[8%] z-20 -rotate-3 rounded-2xl px-5 py-2.5 text-xs font-black uppercase md:text-sm"
            style={{ backgroundColor: item.bubble, color: item.bubbleText }}
          >
            {item.tags[0]}
          </div>

          <div
            className="font-display absolute right-[8%] top-[20%] z-20 rounded-full px-5 py-2.5 text-xs font-black uppercase shadow-lg md:text-sm"
            style={{ backgroundColor: item.accent, color: item.accentText }}
          >
            {item.tags[1]}
          </div>
        </div>

        {/* Right Info Details */}
        <div className="flex h-full w-full flex-col justify-center space-y-7 p-8 sm:p-14 md:w-1/2">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-display rounded-full bg-[#2E0101] px-4 py-1.5 text-xs font-black uppercase tracking-wide text-white">
                Signature selection
              </span>
              <span className="font-display flex items-center gap-1.5 rounded-full bg-[#2E0101] px-3 py-1.5 text-xs font-black text-white">
                <Star size={13} strokeWidth={0} fill={LIME} /> {item.rating}
              </span>
            </div>

            <h2 className="font-display text-4xl font-black uppercase leading-[0.9] tracking-tighter text-[#2E0101] sm:text-5xl">
              {item.name}
            </h2>

            <p className="text-sm font-medium leading-relaxed text-[#2E0101]/80 sm:text-base">
              {item.description}
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              <span className="font-display flex items-center gap-2 rounded-full border border-[#2E0101]/20 px-4 py-2 text-xs font-bold uppercase text-[#2E0101]">
                <Clock size={14} strokeWidth={2.5} style={{ color: RED }} /> {item.cookTime}
              </span>
              <span className="font-display flex items-center gap-2 rounded-full border border-[#2E0101]/20 px-4 py-2 text-xs font-bold uppercase text-[#2E0101]">
                <Flame size={14} strokeWidth={2.5} style={{ color: RED }} /> Wood-fired recipe
              </span>
            </div>
          </div>

          <div className="space-y-5 pt-3">
            <div className="flex flex-col items-center justify-between gap-4 rounded-3xl bg-[#2E0101]/[0.04] p-5 sm:flex-row">
              <div>
                <span className="font-display block text-[10px] font-bold uppercase tracking-widest text-[#2E0101]/60">
                  Total price
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-display text-3xl font-black text-[#2E0101]">
                    {fmt(item.price * qty)}
                  </span>
                  <span className="font-display text-xs font-bold uppercase text-[#2E0101]/50">
                    UGX
                  </span>
                </div>
              </div>

              {/* Quantity Stepper */}
              <div className="flex items-center gap-2 rounded-full border border-[#2E0101]/10 bg-white px-2 py-1.5 shadow-sm">
                <button
                  type="button"
                  aria-label="Decrease"
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#2E0101]/5 text-[#2E0101] hover:bg-[#2E0101]/15"
                >
                  <Minus size={13} strokeWidth={3} />
                </button>
                <span className="font-display w-7 text-center text-sm font-black text-[#2E0101]">
                  {qty}
                </span>
                <button
                  type="button"
                  aria-label="Increase"
                  onClick={() => setQty(qty + 1)}
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-white"
                  style={{ backgroundColor: DARK }}
                >
                  <Plus size={13} strokeWidth={3} />
                </button>
              </div>
            </div>

            <motion.button
              type="button"
              onClick={() => {
                onAdd(item, qty);
                onClose();
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={spring}
              className="font-display flex w-full cursor-pointer items-center justify-center gap-2 rounded-full py-4 text-xs font-extrabold uppercase tracking-wide shadow-lg"
              style={{ backgroundColor: LIME, color: DARK }}
            >
              <ShoppingBasket size={16} strokeWidth={2.5} />
              Add {qty} to bag · {fmt(item.price * qty)} UGX
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN PRODUCTS VIEW
   ═══════════════════════════════════════════════════════════ */
export default function ProductsView() {
  const { cartItems, addToCart, decreaseQuantity, removeFromCart, subtotal, tax, shipping, total } = useCart();

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [likedIds, setLikedIds] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState("right");
  const [isPaused, setIsPaused] = useState(false);
  const [quickViewItem, setQuickViewItem] = useState(null);
  const [cartExpanded, setCartExpanded] = useState(false);

  const totalItemsCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);
  const filteredItems = ITEMS.filter((item) => selectedCategory === "all" || item.category === selectedCategory);

  const totalSlides = SPOTLIGHT_ITEMS.length;
  const slide = SPOTLIGHT_ITEMS[currentSlide];

  function nextSlide() {
    setSlideDirection("right");
    setCurrentSlide((c) => (c + 1) % totalSlides);
  }
  function prevSlide() {
    setSlideDirection("left");
    setCurrentSlide((c) => (c === 0 ? totalSlides - 1 : c - 1));
  }
  function goToSlide(i) {
    if (i === currentSlide) return;
    setSlideDirection(i > currentSlide ? "right" : "left");
    setCurrentSlide(i);
  }

  // Autoplay
  useEffect(() => {
    if (isPaused) return;
    const t = setTimeout(nextSlide, AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [currentSlide, isPaused]);

  // Keyboard navigation
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  function toggleLike(id) {
    setLikedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2E0101] selection:bg-[#D9FF00] selection:text-[#2E0101]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@700;800;900&display=swap');
        .font-display { font-family: 'Archivo', sans-serif; }
      `}</style>

      {/* Spotlight Carousel */}
      <SpotlightBanner
        slide={slide}
        direction={slideDirection}
        current={currentSlide}
        total={totalSlides}
        onPrev={prevSlide}
        onNext={nextSlide}
        onGoTo={goToSlide}
        onAddToCart={(item, q) => addToCart({ ...item, quantity: q })}
        onViewDetails={setQuickViewItem}
        isPaused={isPaused}
        setIsPaused={setIsPaused}
      />

      {/* Store Catalog Section */}
      <div className="mx-auto max-w-7xl space-y-10 px-4 py-16 sm:px-6 lg:px-12">
        {/* Category Filter Tabs */}
        <div className="flex w-full items-center justify-start gap-2 overflow-x-auto pb-2 sm:justify-center">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.key;
            return (
              <motion.button
                key={cat.key}
                type="button"
                onClick={() => setSelectedCategory(cat.key)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={spring}
                className={`${tab} flex items-center gap-2 px-5 py-2.5 text-xs font-bold`}
                style={
                  isActive
                    ? { backgroundColor: DARK, color: LIME, borderColor: DARK }
                    : { backgroundColor: WHITE, color: DARK, borderColor: "rgba(46,1,1,0.15)" }
                }
              >
                <Icon size={14} strokeWidth={2.5} />
                {cat.label}
              </motion.button>
            );
          })}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => {
            const inCart = cartItems.find((i) => i.id === item.id);
            return (
              <ProductCard
                key={item.id}
                item={item}
                cartCount={inCart ? inCart.quantity : 0}
                isLiked={likedIds.includes(item.id)}
                onLike={toggleLike}
                onView={setQuickViewItem}
                onAdd={(it, q) => addToCart({ ...it, quantity: q })}
              />
            );
          })}
        </div>

        {filteredItems.length === 0 && (
          <div className="py-24 text-center">
            <Utensils size={44} className="mx-auto mb-3 text-[#2E0101]/30" strokeWidth={1.5} />
            <h3 className="font-display text-lg font-black uppercase text-[#2E0101]">
              No dishes found
            </h3>
            <p className="mt-1 text-xs text-[#2E0101]/60">
              Try selecting another category pill above.
            </p>
          </div>
        )}
      </div>

      {/* Floating Pill Cart */}
      <FloatingPillCart
        expanded={cartExpanded}
        onToggle={() => setCartExpanded(!cartExpanded)}
        cartItems={cartItems}
        totalItems={totalItemsCount}
        subtotal={subtotal}
        tax={tax}
        shipping={shipping}
        total={total}
        addToCart={(item, q) => addToCart({ ...item, quantity: q })}
        decreaseQuantity={decreaseQuantity}
        removeFromCart={removeFromCart}
      />

      {/* Details View Modal */}
      <AnimatePresence>
        {quickViewItem && (
          <ProductDetailsModal
            item={quickViewItem}
            onClose={() => setQuickViewItem(null)}
            onAdd={(it, q) => addToCart({ ...it, quantity: q })}
          />
        )}
      </AnimatePresence>
    </div>
  );
}