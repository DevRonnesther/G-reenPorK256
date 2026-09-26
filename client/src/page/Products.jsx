import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart, Star, Clock, ShieldCheck, Minus, Plus, X,
  ShoppingBag, ArrowRight, Beef, Drumstick,
  Sandwich, Pizza as PizzaIcon, Trash2, ChevronDown,
  ChevronUp, Utensils, CheckCircle2, Sparkles,
  ChevronLeft, ChevronRight
} from "lucide-react";

import { useCart } from "../components/cart/CartContext.jsx";

// ASSETS
import Pizza from "../assets/pizza(17).png";
import FreshPork from "../assets/freshporke.png";
import Porkies from "../assets/PremiumPlate.png";
import PorkStake from "../assets/ChatGPT Image Jun 18, 2026, 03_34_25 PM.png";
import Burger from "../assets/Burger.png";
import Chicken from "../assets/fullchicken.png";

const WHATSAPP_NUMBER = "256776464823";
const BRAND_NAME = "Green Pork";
const FREE_DELIVERY_THRESHOLD = 50000;
const AUTOPLAY_MS = 5500;

/* ═══════════════════════════════════════════════════════════
   STANDARD DESIGN TOKENS
   ═══════════════════════════════════════════════════════════ */
const BRAND_COLOR = "#D9FF00"; // Primary Action Color
const DARK = "#2E0101";       // Primary Dark / Text Color
const ACCENT = "#F5A31A";     // Secondary Highlight (Stars, Progress)
const ALERT_COLOR = "#E11D1D"; // Alerts / Free Delivery Text

const CAT_THEME = {
  burgers: { bg: "#F5A31A", word: "#FFF1BF", dark: "#4A2508" },
  skewers: { bg: "#E11D1D", word: "#FFC2B3", dark: "#4A0A0A" },
  pork: { bg: "#E11D1D", word: "#FFC2B3", dark: "#4A0A0A" },
  chicken: { bg: "#E0A100", word: "#FFF4B8", dark: "#3D2C04" },
  pizza: { bg: "#E8590C", word: "#FFD6B0", dark: "#4A1A05" },
  raw: { bg: "#E11D1D", word: "#FFC2B3", dark: "#4A0A0A" },
};
const themeOf = (item) => CAT_THEME[item.category] || CAT_THEME.burgers;

const fmt = (n) => Number(n).toLocaleString();
const pct = (price, anchoring) => {
  const a = parseInt(anchoring, 10);
  if (!a || a <= price) return 0;
  return Math.round((1 - price / a) * 100);
};
const cx = (...c) => c.filter(Boolean).join(" ");

const CATEGORIES = [
  { key: "all", label: "All Items", icon: Utensils },
  { key: "pork", label: "Roasted Pork", icon: Beef },
  { key: "skewers", label: "Pork Skewers", icon: Beef },
  { key: "chicken", label: "Crispy Chicken", icon: Drumstick },
  { key: "burgers", label: "Gourmet Burgers", icon: Sandwich },
  { key: "pizza", label: "Classic Pizza", icon: PizzaIcon },
  { key: "juice", label: "Fresh Juice", icon: Sparkles },
  { key: "smoothies", label: "Smoothies", icon: Sparkles },
  { key: "raw", label: "Raw Pork", icon: ShieldCheck },
];

const ITEMS = [
  { id: 1, word: "BURGER", words: ["CHEESY", "BURGER"], image: Burger, category: "burgers", anchoring: "8000", name: "Beef Burger", price: 6000, description: "Juicy grilled beef patty with fresh lettuce, cheese and creamy signature sauce.", rating: 4.8, cookTime: "15–20 min", tag: "Popular", tags: ["100% Angus", "Flame Grilled"] },
  { id: 2, word: "SKEWER", words: ["SMOKY", "SKEWER"], image: Porkies, category: "skewers", anchoring: "18000", name: "Premium Pork Skewer", price: 15000, description: "Roasted succulent pork skewers with fried cassava, salad, chapati, and bananas.", rating: 4.4, cookTime: "30–35 min", tag: "Best Seller", tags: ["Wood-Fired", "Farm Fresh"] },
  { id: 3, word: "PORK", words: ["ROASTED", "PORK"], image: PorkStake, category: "pork", anchoring: "9000", name: "Roasted Pork Special", price: 6000, description: "Roasted crispy premium pork cuts with fried cassava, fresh salad and chapati.", rating: 4.9, cookTime: "30–35 min", tag: "Best Seller", tags: ["Slow Roasted", "Farm Fresh"] },
  { id: 4, word: "CRISPY", words: ["GOLDEN", "CHICKEN"], image: Chicken, category: "chicken", anchoring: "78000", name: "Crispy Chicken Bucket", price: 55000, description: "Golden crispy whole chicken seasoned with our fiery Ugandan spice blend.", rating: 4.6, cookTime: "20–25 min", tag: "Spicy", tags: ["Fire Roasted", "Spicy Blend"] },
  { id: 5, word: "PIZZA", words: ["STONE", "PIZZA"], image: Pizza, category: "pizza", anchoring: "18000", name: "Chicken & Pork Pizza", price: 15000, description: "Hand-tossed artisan dough loaded with roasted pork chunks and mozzarella.", rating: 4.7, cookTime: "40–45 min", tag: "New", tags: ["Stone-Baked", "Fresh Mozzarella"] },
  { id: 6, word: "ROAST", words: ["FLAME", "ROAST"], image: Chicken, category: "chicken", anchoring: "55000", name: "Whole Roasted Chicken", price: 45000, description: "Farm-fresh whole chicken, marinated for 24 hours and flame-roasted.", rating: 4.7, cookTime: "35–40 min", tag: null, tags: ["24h Marinated", "Flame Roasted"] },
  { id: 7, word: "FRESH", words: ["FARM", "FRESH"], image: FreshPork, category: "raw", anchoring: "20000", name: "Fresh Pork Cuts (1kg)", price: 16000, description: "Premium farm-fresh pork, hygienically packaged and ready for your grill.", rating: 4.5, cookTime: "—", tag: "Organic", tags: ["Farm Fresh", "Hygienic"] },
];

const SPOTLIGHT_ITEMS = [ITEMS[0], ITEMS[1], ITEMS[2], ITEMS[4]];

const spring = { type: "spring", stiffness: 220, damping: 26 };

const cardVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

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

const pill = "flex items-center gap-2 rounded-full px-4 py-2.5 text-[11px] sm:text-xs font-display font-bold uppercase tracking-wide";

function FontFace() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@700;800;900&family=Inter:wght@400;500;600;700&display=swap');
      .font-display { font-family: 'Archivo', sans-serif; }
      .font-body { font-family: 'Inter', sans-serif; }
      .no-scrollbar::-webkit-scrollbar { display: none; }
      .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      .cart-scroll::-webkit-scrollbar { width: 4px; }
      .cart-scroll::-webkit-scrollbar-track { background: transparent; }
      .cart-scroll::-webkit-scrollbar-thumb { background: rgba(46,1,1,0.25); border-radius: 99px; }
    `}</style>
  );
}

// Updated CtaButton with Standard Brand Color Background
function CtaButton({ children, onClick, className = "" }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={spring}
      className={cx(
        "flex items-center justify-center gap-2.5 rounded-full py-4 px-8 font-display font-extrabold text-xs uppercase tracking-wide cursor-pointer shadow-lg",
        className
      )}
      style={{ backgroundColor: BRAND_COLOR, color: DARK }}
    >
      {children}
    </motion.button>
  );
}

function CategoryPill({ cat, isActive, onSelect }) {
  const Icon = cat.icon;
  return (
    <motion.button
      type="button"
      onClick={() => onSelect(cat.key)}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      className={cx(
        "flex flex-shrink-0 cursor-pointer items-center gap-2 rounded-full px-5 py-3 font-display text-xs font-bold transition-colors",
        isActive ? "shadow-md" : "bg-white shadow-sm hover:bg-[#2E0101]/5"
      )}
      style={isActive ? { backgroundColor: BRAND_COLOR, color: DARK } : { color: DARK }}
    >
      <Icon size={15} strokeWidth={2.5} style={{ color: isActive ? DARK : ACCENT }} />
      {cat.label}
    </motion.button>
  );
}

function SpotlightBanner({ item, onView, onAdd, currentIndex, totalCount, onSelectIndex, onNext, onPrev, isPaused, setIsPaused }) {
  const theme = themeOf(item);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured dishes"
      className="relative w-full overflow-hidden transition-colors duration-700"
      style={{ backgroundColor: theme.bg }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 60%)" }} />

      <div className="relative z-10 mx-auto flex min-h-[88vh] max-w-7xl flex-col items-center justify-between gap-6 px-4 pb-8 pt-10 sm:px-6 lg:pt-14">
        <div className="relative flex w-full flex-1 items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.h1
              key={`w-${item.id}`}
              {...fadeUp(0.05)}
              className="font-display pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center font-black uppercase leading-[0.82] tracking-[-0.04em]"
              style={{ color: theme.word, fontSize: "clamp(4rem, 14vw, 12rem)" }}
            >
              <span>{item.words[0]}</span>
              <span>{item.words[1]}</span>
            </motion.h1>
          </AnimatePresence>

          <AnimatePresence mode="popLayout" custom="right">
            <motion.div
              key={item.id}
              custom="right"
              variants={imgVar}
              initial="enter"
              animate="center"
              exit="exit"
              className="relative z-10 flex h-[40vh] w-full items-center justify-center sm:h-[46vh] lg:h-[54vh]"
            >
              <img src={item.image} alt={item.name} className="pointer-events-none h-full max-w-[80vw] object-contain lg:max-w-[34rem]" style={{ filter: "drop-shadow(0 30px 30px rgba(0,0,0,0.35))" }} />
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={`b1-${item.id}`}
              {...fadeUp(0.3)}
              className="font-display absolute bottom-[12%] left-[4%] z-20 -rotate-3 rounded-2xl px-4 py-2 text-[11px] font-extrabold uppercase text-white lg:bottom-[18%] lg:left-[18%] lg:px-5 lg:py-2.5 lg:text-sm"
              style={{ backgroundColor: theme.dark }}
            >
              {item.tags[0]}
              <span className="absolute -bottom-1 left-6 h-3 w-3 rotate-45" style={{ backgroundColor: theme.dark }} />
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={`b2-${item.id}`}
              {...fadeUp(0.4)}
              className="font-display absolute right-[4%] top-[55%] z-20 rounded-full bg-white px-4 py-2 text-[11px] font-extrabold uppercase shadow-lg lg:right-[18%] lg:px-5 lg:py-2.5 lg:text-sm"
              style={{ color: theme.dark }}
            >
              {item.tags[1]}
            </motion.div>
          </AnimatePresence>

          <motion.button type="button" onClick={onPrev} aria-label="Previous" whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.88 }} transition={spring} className="absolute left-0 top-1/2 z-30 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/30 text-white backdrop-blur-md lg:h-11 lg:w-11">
            <ChevronLeft size={18} strokeWidth={2.5} />
          </motion.button>
          <motion.button type="button" onClick={onNext} aria-label="Next" whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.88 }} transition={spring} className="absolute right-0 top-1/2 z-30 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/30 text-white backdrop-blur-md lg:h-11 lg:w-11">
            <ChevronRight size={18} strokeWidth={2.5} />
          </motion.button>
        </div>

        {/* Bottom pill row */}
        <div className="relative z-20 flex flex-col items-center gap-4 text-white">
          <div className="flex flex-wrap items-center justify-center gap-2 font-display sm:gap-3">
            {pct(item.price, item.anchoring) > 0 && (
              <span className={`${pill} bg-white/15 backdrop-blur-md`}>Save {pct(item.price, item.anchoring)}%</span>
            )}
            <span className={`${pill} border border-white/70`}>
              <Clock size={13} strokeWidth={2.5} /> {item.cookTime}
            </span>
            <span className={`${pill} border border-white/70`}>
              <Star size={13} strokeWidth={2.5} fill="currentColor" /> {item.rating}
            </span>

            {/* Standard Add Button using Brand Color */}
            <motion.button
              type="button"
              onClick={() => onAdd(item, 1)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={spring}
              className={`${pill} cursor-pointer shadow-lg`}
              style={{ backgroundColor: BRAND_COLOR, color: theme.dark }}
            >
              <ShoppingBag size={14} strokeWidth={2.5} /> Add · UGX {fmt(item.price)}
            </motion.button>

            <motion.button
              type="button"
              onClick={() => onView(item)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={spring}
              className={`${pill} cursor-pointer border border-white/70 text-white`}
            >
              Quick view <ArrowRight size={14} strokeWidth={3} />
            </motion.button>
          </div>

          <div className="flex items-center gap-2 rounded-full bg-white/15 px-3 py-2 backdrop-blur-md">
            {Array.from({ length: totalCount }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`Show item ${idx + 1}`}
                onClick={() => onSelectIndex(idx)}
                className={cx("h-2 cursor-pointer rounded-full transition-all duration-300", currentIndex === idx ? "w-8 bg-white" : "w-2 bg-white/40 hover:bg-white/70")}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductCard({ item, cartCount, onAdd, onLike, isLiked, onView }) {
  const discountPct = pct(item.price, item.anchoring);
  const theme = themeOf(item);

  return (
    <motion.div
      layout
      variants={cardVariants}
      initial="hidden"
      animate="show"
      exit="hidden"
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-white shadow-[0_10px_40px_rgba(0,0,0,0.06)] transition-shadow duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)]"
    >
      <div className="absolute left-3 top-3 z-20 flex flex-col items-start gap-1">
        {item.tag && (
          <span className="rounded-full bg-white px-3 py-1 font-display text-[10px] font-extrabold uppercase" style={{ color: theme.dark }}>
            {item.tag}
          </span>
        )}
        {discountPct > 0 && (
          <span className="rounded-full px-2.5 py-0.5 font-display text-[9px] font-extrabold uppercase text-white" style={{ backgroundColor: theme.dark }}>
            -{discountPct}%
          </span>
        )}
      </div>

      <button
        type="button"
        aria-label="Like"
        onClick={(e) => { e.stopPropagation(); onLike(item.id); }}
        className="absolute right-3 top-3 z-20 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/25 backdrop-blur-md transition-colors hover:bg-white/40"
      >
        <Heart size={16} strokeWidth={2.5} className={isLiked ? "fill-white text-white" : "text-white"} />
      </button>

      <div onClick={() => onView(item)} className="relative flex h-52 cursor-pointer items-center justify-center overflow-hidden p-6" style={{ backgroundColor: theme.bg }}>
        <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 60%)" }} />
        <span className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center font-display text-5xl font-black uppercase leading-[0.82] tracking-[-0.04em] sm:text-6xl" style={{ color: theme.word }}>
          <span>{item.words[0]}</span>
          <span>{item.words[1]}</span>
        </span>
        <img src={item.image} alt={item.name} className="relative z-10 h-full w-full object-contain transition-transform duration-500 group-hover:scale-110" style={{ filter: "drop-shadow(0 15px 15px rgba(0,0,0,0.3))" }} />

        <span className="font-display absolute bottom-2 left-2 z-20 -rotate-3 rounded-lg px-2.5 py-1 text-[9px] font-extrabold uppercase text-white sm:text-[10px]" style={{ backgroundColor: theme.dark }}>
          {item.tags[0]}
        </span>
        <span className="font-display absolute right-2 top-2 z-20 rounded-full bg-white px-2.5 py-1 text-[9px] font-extrabold uppercase shadow-sm sm:text-[10px]" style={{ color: theme.dark }}>
          {item.tags[1]}
        </span>
      </div>

      <div className="flex flex-grow flex-col justify-between space-y-4 bg-white p-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-display text-[10px] font-bold uppercase tracking-wider text-slate-400">{item.category}</span>
            <div className="flex items-center gap-1 rounded-full px-2 py-0.5 text-white" style={{ backgroundColor: DARK }}>
              <Star size={12} strokeWidth={0} fill={ACCENT} />
              <span className="text-[10px] font-bold">{item.rating}</span>
            </div>
          </div>

          <h3 onClick={() => onView(item)} className="line-clamp-1 cursor-pointer font-display text-base font-black uppercase tracking-tight text-[#2E0101] transition-colors hover:text-[#E11D1D]">
            {item.name}
          </h3>

          <p className="line-clamp-2 font-body text-xs font-medium text-slate-500">{item.description}</p>
        </div>

        <div className="flex items-center justify-between pt-3">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-display text-lg font-black text-[#2E0101]">{fmt(item.price)}</span>
              <span className="font-display text-[10px] font-bold uppercase text-slate-400">UGX</span>
            </div>
            {Number(item.anchoring) > item.price && (
              <span className="font-body text-[10px] font-medium text-slate-400 line-through">{fmt(item.anchoring)}</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {cartCount > 0 && (
              <span className="flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-black text-[#2E0101]" style={{ backgroundColor: ACCENT }}>
                {cartCount}
              </span>
            )}

            {/* Standard Add Button using Brand Color */}
            <motion.button
              type="button"
              aria-label="Add to cart"
              onClick={() => onAdd(item, 1)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={spring}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full"
              style={{ backgroundColor: BRAND_COLOR }}
            >
              <Plus size={18} strokeWidth={3} className="text-[#2E0101]" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function FloatingPillCart({ expanded, onToggle, cartItems, totalItems, subtotal, tax, shipping, total, addToCart, decreaseQuantity, removeFromCart }) {
  const lastAddedImage = cartItems.length > 0 ? cartItems[cartItems.length - 1].image : null;

  function handleWhatsAppCheckout() {
    let msg = `Hello ${BRAND_NAME}, I would like to place an order:\n\n`;
    cartItems.forEach((item, idx) => {
      msg += `${idx + 1}. ${item.name} x${item.quantity} - UGX ${fmt(item.price * item.quantity)}\n`;
    });
    msg += `\nSubtotal: UGX ${fmt(subtotal)}`;
    msg += `\nTax (18%): UGX ${fmt(tax)}`;
    msg += `\nDelivery: ${shipping === 0 ? "FREE" : `UGX ${fmt(shipping)}`}`;
    msg += `\n*Total: UGX ${fmt(total)}*`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  }

  const qtyBtn = "flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-slate-100 transition-colors hover:bg-slate-200";

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={spring}
            className="mb-4 flex max-h-[75vh] w-80 flex-col overflow-hidden rounded-3xl bg-white shadow-[0_20px_50px_rgba(0,0,0,0.25)] sm:w-96"
          >
            <div className="flex items-center justify-between p-4 text-[#2E0101]" style={{ backgroundColor: ACCENT }}>
              <div className="flex items-center gap-2">
                <ShoppingBag size={18} strokeWidth={2.5} />
                <h3 className="font-display text-xs font-extrabold uppercase tracking-wide">Your order bag</h3>
              </div>
              <button type="button" aria-label="Close cart" onClick={onToggle} className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/30 transition-colors hover:bg-white/50">
                <X size={14} strokeWidth={3} />
              </button>
            </div>

            {subtotal > 0 && subtotal < FREE_DELIVERY_THRESHOLD && (
              <div className="bg-[#2E0101]/[0.03] p-4 font-body text-[11px] font-medium text-slate-900">
                Add <span className="font-display font-black text-[#2E0101]">UGX {fmt(FREE_DELIVERY_THRESHOLD - subtotal)}</span> more for{" "}
                <span className="font-display font-black uppercase" style={{ color: ALERT_COLOR }}>free delivery!</span>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                  <div className="h-full rounded-full transition-all duration-500" style={{ width: `${Math.min(100, (subtotal / FREE_DELIVERY_THRESHOLD) * 100)}%`, backgroundColor: ACCENT }} />
                </div>
              </div>
            )}

            <div className="cart-scroll max-h-64 flex-grow space-y-1 overflow-y-auto p-4">
              {cartItems.length === 0 ? (
                <div className="py-12 text-center text-slate-400">
                  <ShoppingBag size={32} className="mx-auto mb-3 opacity-40" strokeWidth={1.5} />
                  <p className="font-display text-xs font-bold uppercase text-slate-500">Your cart is empty</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between gap-3 py-3">
                    <img src={item.image} alt={item.name} className="h-12 w-12 flex-shrink-0 rounded-xl bg-[#2E0101]/[0.04] object-contain p-1" />
                    <div className="min-w-0 flex-grow">
                      <h4 className="truncate font-display text-xs font-extrabold uppercase text-[#2E0101]">{item.name}</h4>
                      <span className="font-body text-[11px] font-medium text-slate-500">UGX {fmt(item.price)}</span>
                    </div>
                    <div className="flex flex-shrink-0 items-center gap-1.5">
                      <button type="button" aria-label="Decrease" onClick={() => decreaseQuantity(item.id)} className={qtyBtn}>
                        <Minus size={10} strokeWidth={3} />
                      </button>
                      <span className="w-5 text-center font-display text-xs font-black">{item.quantity}</span>
                      <button type="button" aria-label="Increase" onClick={() => addToCart(item, 1)} className={qtyBtn}>
                        <Plus size={10} strokeWidth={3} />
                      </button>
                      <button type="button" aria-label="Remove" onClick={() => removeFromCart(item.id)} className="ml-1 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-[#E11D1D]/10" style={{ color: ALERT_COLOR }}>
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="space-y-2 p-4 text-white" style={{ backgroundColor: DARK }}>
                <div className="flex justify-between font-body text-xs text-white/70">
                  <span>Subtotal</span>
                  <span className="font-bold text-white">UGX {fmt(subtotal)}</span>
                </div>
                <div className="flex justify-between font-body text-xs text-white/70">
                  <span>Tax (18%)</span>
                  <span className="font-bold text-white">UGX {fmt(tax)}</span>
                </div>
                <div className="flex justify-between font-body text-xs text-white/70">
                  <span>Delivery fee</span>
                  <span className="font-bold" style={{ color: ACCENT }}>{shipping === 0 ? "FREE" : `UGX ${fmt(shipping)}`}</span>
                </div>
                <div className="mt-2 flex justify-between border-t border-white/10 pt-2 font-display text-sm font-black">
                  <span>Total</span>
                  <span style={{ color: ACCENT }}>UGX {fmt(total)}</span>
                </div>

                {/* Checkout button uses standard brand color */}
                <motion.button
                  type="button"
                  onClick={handleWhatsAppCheckout}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={spring}
                  className="mt-3 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full px-4 py-3.5 font-display text-xs font-extrabold uppercase tracking-wide"
                  style={{ backgroundColor: BRAND_COLOR, color: DARK }}
                >
                  Checkout via WhatsApp <ArrowRight size={16} strokeWidth={3} />
                </motion.button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={onToggle}
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.97 }}
        transition={spring}
        className="flex cursor-pointer items-center gap-3 rounded-full py-3 pl-3 pr-6 text-white shadow-2xl"
        style={{ backgroundColor: DARK }}
      >
        <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white/15">
          {lastAddedImage ? <img src={lastAddedImage} alt="Cart item" className="h-full w-full object-contain p-1" /> : <ShoppingBag size={16} strokeWidth={2.5} />}
        </div>

        <div className="flex flex-col text-left">
          <span className="flex items-center gap-1.5 font-display text-xs font-extrabold uppercase tracking-wide">
            {totalItems > 0 ? `${totalItems} item${totalItems !== 1 ? "s" : ""}` : "Cart empty"}
            {expanded ? <ChevronDown size={12} strokeWidth={3} /> : <ChevronUp size={12} strokeWidth={3} />}
          </span>
          <span className="font-body text-[10px] font-semibold text-white/70">
            {totalItems > 0 ? `UGX ${fmt(subtotal)}` : "Tap to open"}
          </span>
        </div>
      </motion.button>
    </div>
  );
}

function ProductDetailsModal({ item, onClose, onAdd }) {
  const [qty, setQty] = useState(1);
  if (!item) return null;
  const theme = themeOf(item);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center" style={{ backgroundColor: DARK }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={spring}
        className="relative flex h-screen w-screen flex-col items-stretch justify-between overflow-y-auto bg-white text-slate-900 md:flex-row"
      >
        <button type="button" aria-label="Close" onClick={onClose} className="absolute right-6 top-6 z-40 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white/25 text-white backdrop-blur-md transition-colors hover:bg-white/40 md:bg-[#2E0101]/5 md:text-[#2E0101] md:hover:bg-[#2E0101]/10">
          <X size={22} strokeWidth={2.5} />
        </button>

        <div className="relative flex h-[50vh] w-full items-center justify-center overflow-hidden p-8 md:h-screen md:w-1/2" style={{ backgroundColor: theme.bg }}>
          <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 60%)" }} />
          <span className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center font-display font-black uppercase leading-[0.82] tracking-[-0.04em]" style={{ color: theme.word, fontSize: "clamp(4rem, 14vw, 12rem)" }}>
            <span>{item.words[0]}</span>
            <span>{item.words[1]}</span>
          </span>
          <motion.img src={item.image} alt={item.name} className="relative z-10 h-full w-full max-w-3xl object-contain" style={{ filter: "drop-shadow(0 30px 30px rgba(0,0,0,0.35))" }} animate={{ y: [0, -12, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }} />

          <div className="font-display absolute bottom-[18%] left-[10%] z-20 -rotate-3 rounded-2xl px-5 py-2.5 text-sm font-extrabold uppercase text-white">
            <span style={{ backgroundColor: theme.dark }} className="block rounded-2xl px-4 py-2">
              {item.tags[0]}
            </span>
          </div>
          <div className="font-display absolute right-[10%] top-[20%] z-20 rounded-full bg-white px-5 py-2.5 text-sm font-extrabold uppercase shadow-lg" style={{ color: theme.dark }}>
            {item.tags[1]}
          </div>

          <div className="absolute bottom-6 left-6 z-20 rounded-full bg-white px-4 py-2 font-display text-xs font-extrabold uppercase tracking-wide" style={{ color: theme.dark }}>
            {item.category}
          </div>
        </div>

        <div className="flex h-full w-full flex-col justify-center space-y-8 overflow-y-auto bg-white p-8 sm:p-16 md:w-1/2">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="rounded-full px-4 py-1.5 font-display text-xs font-extrabold uppercase tracking-wide text-white" style={{ backgroundColor: DARK }}>
                Signature selection
              </span>
              <span className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold text-white" style={{ backgroundColor: DARK }}>
                <Star size={14} strokeWidth={0} fill={ACCENT} />
                {item.rating}
              </span>
            </div>

            <h2 className="font-display text-4xl font-black uppercase leading-[0.9] tracking-tighter text-[#2E0101] sm:text-6xl">
              {item.name}
            </h2>

            <p className="font-body text-sm font-medium leading-relaxed text-slate-600 sm:text-base">{item.description}</p>

            <div className="flex flex-wrap gap-2">
              <span className="flex items-center gap-2 rounded-full bg-[#2E0101]/[0.05] px-4 py-2.5 font-body text-xs font-bold text-slate-700">
                <Clock size={15} strokeWidth={2.5} style={{ color: ALERT_COLOR }} /> Prep time: {item.cookTime}
              </span>
              <span className="flex items-center gap-2 rounded-full bg-[#2E0101]/[0.05] px-4 py-2.5 font-body text-xs font-bold text-slate-700">
                <CheckCircle2 size={15} strokeWidth={2.5} style={{ color: ALERT_COLOR }} /> Freshly prepared
              </span>
            </div>
          </div>

          <div className="space-y-6 pt-2">
            <div className="flex flex-col items-center justify-between gap-4 rounded-3xl bg-[#2E0101]/[0.04] p-6 sm:flex-row">
              <div>
                <span className="mb-1 block font-display text-[10px] font-bold uppercase tracking-widest text-slate-500">Total price</span>
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-3xl font-black text-[#2E0101] sm:text-4xl">{fmt(item.price * qty)}</span>
                  <span className="font-display text-xs font-bold uppercase text-slate-400">UGX</span>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-full bg-white px-2 py-2 shadow-sm">
                <button type="button" aria-label="Reduce quantity" onClick={() => setQty(Math.max(1, qty - 1))} className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-[#2E0101]/[0.06] text-[#2E0101] transition-colors hover:bg-[#2E0101]/15">
                  <Minus size={14} strokeWidth={3} />
                </button>
                <span className="w-8 text-center font-display text-base font-black text-[#2E0101]">{qty}</span>
                <button type="button" aria-label="Increase quantity" onClick={() => setQty(qty + 1)} className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-white transition-opacity hover:opacity-85" style={{ backgroundColor: DARK }}>
                  <Plus size={14} strokeWidth={3} />
                </button>
              </div>
            </div>

            <CtaButton onClick={() => { onAdd(item, qty); onClose(); }} className="w-full !py-5 text-sm">
              Add {qty} to cart · UGX {fmt(item.price * qty)} <ArrowRight size={16} strokeWidth={3} />
            </CtaButton>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function ProductsView() {
  const { cartItems, addToCart, decreaseQuantity, removeFromCart, subtotal, tax, shipping, total } = useCart();

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [likedIds, setLikedIds] = useState([]);
  const [spotlightIdx, setSpotlightIdx] = useState(0);
  const [spotlightDir, setSpotlightDir] = useState("right");
  const [isPaused, setIsPaused] = useState(false);
  const [quickViewItem, setQuickViewItem] = useState(null);
  const [cartExpanded, setCartExpanded] = useState(false);

  const totalItemsCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);
  const filteredItems = ITEMS.filter((item) => selectedCategory === "all" || item.category === selectedCategory);

  const spotlightTotal = SPOTLIGHT_ITEMS.length;
  const spotlightItem = SPOTLIGHT_ITEMS[spotlightIdx];

  function spotlightNext() {
    setSpotlightDir("right");
    setSpotlightIdx((i) => (i + 1) % spotlightTotal);
  }
  function spotlightPrev() {
    setSpotlightDir("left");
    setSpotlightIdx((i) => (i === 0 ? spotlightTotal - 1 : i - 1));
  }
  function spotlightGoTo(i) {
    setSpotlightDir(i > spotlightIdx ? "right" : "left");
    setSpotlightIdx(i);
  }

  useEffect(() => {
    if (isPaused) return;
    const t = setTimeout(spotlightNext, AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [spotlightIdx, isPaused]);

  useEffect(() => {
    function handleKey(e) {
      if (e.key === "ArrowLeft") spotlightPrev();
      if (e.key === "ArrowRight") spotlightNext();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [spotlightIdx]);

  function toggleLike(id) {
    setLikedIds(likedIds.includes(id) ? likedIds.filter((i) => i !== id) : [...likedIds, id]);
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-body text-slate-900 selection:bg-[#F5A31A] selection:text-[#2E0101]">
      <FontFace />

      <SpotlightBanner
        item={spotlightItem}
        currentIndex={spotlightIdx}
        totalCount={spotlightTotal}
        onSelectIndex={spotlightGoTo}
        onNext={spotlightNext}
        onPrev={spotlightPrev}
        isPaused={isPaused}
        setIsPaused={setIsPaused}
        onView={setQuickViewItem}
        onAdd={(item, qty) => addToCart(item, qty)}
      />

      <div className="mx-auto max-w-7xl space-y-10 px-4 py-12 sm:px-6">
        <div className="no-scrollbar flex w-full items-center gap-3 overflow-x-auto pb-2">
          {CATEGORIES.map((cat) => (
            <CategoryPill key={cat.key} cat={cat} isActive={selectedCategory === cat.key} onSelect={setSelectedCategory} />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
                onAdd={(it, q) => addToCart(it, q)}
              />
            );
          })}
        </div>

        {filteredItems.length === 0 && (
          <div className="py-24 text-center">
            <Utensils size={48} className="mx-auto mb-3 text-slate-300" strokeWidth={1.5} />
            <h3 className="font-display text-lg font-black uppercase text-slate-800">No dishes found</h3>
            <p className="mt-1 font-body text-sm text-slate-500">Try selecting a different category above.</p>
          </div>
        )}
      </div>

      <FloatingPillCart
        expanded={cartExpanded}
        onToggle={() => setCartExpanded(!cartExpanded)}
        cartItems={cartItems}
        totalItems={totalItemsCount}
        subtotal={subtotal}
        tax={tax}
        shipping={shipping}
        total={total}
        addToCart={addToCart}
        decreaseQuantity={decreaseQuantity}
        removeFromCart={removeFromCart}
      />

      <AnimatePresence>
        {quickViewItem && (
          <ProductDetailsModal item={quickViewItem} onClose={() => setQuickViewItem(null)} onAdd={(it, q) => addToCart(it, q)} />
        )}
      </AnimatePresence>
    </div>
  );
}