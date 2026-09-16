import React, { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart, Star, Clock, ShieldCheck, Minus, Plus, X,
  ShoppingBag, ArrowRight, Beef, Drumstick,
  Sandwich, Pizza as PizzaIcon, Trash2, ChevronDown,
  ChevronUp, Utensils, CheckCircle2, Sparkles
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
const BRAND_NAME = "GREENPORK";
const FREE_DELIVERY_THRESHOLD = 50000;
const TAX_RATE = 0.18;
const STANDARD_SHIPPING = 5000;

/* ═══════════════════════════════════════════════════════════
    DESIGN TOKENS — Electric Lime Signature System (#D4FF00)
    ═══════════════════════════════════════════════════════════ */
const BRAND = {
  primary: "#D4FF00",       // Official Electric Lime Signature
  primaryText: "#2E0101",   // Deep Contrast Text for Lime elements
  redAccent: "#D90404",     // Controlled Strategic Accent
  dark: "#2E0101",          // Deep Brand Dark
  white: "#FFFFFF",
};

const fmt = (n) => Number(n).toLocaleString();
const pct = (price, anchoring) => {
  const a = parseInt(anchoring, 10);
  if (!a || a <= price) return 0;
  return Math.round((1 - price / a) * 100);
};

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
  { id: 1, image: Burger, category: "burgers", anchoring: "8000", name: "Beef Burger", price: 6000, description: "Juicy grilled beef patty with fresh lettuce, cheese and creamy signature sauce.", rating: 4.8, cookTime: "15–20 min", tag: "Popular", solidBg: "#FFFFFF", badgeColor: "#D4FF00" },
  { id: 2, image: Porkies, category: "skewers", anchoring: "18000", name: "Premium Pork Skewer", price: 15000, description: "Roasted succulent pork skewers with fried cassava, salad, chapati, and bananas.", rating: 4.4, cookTime: "30–35 min", tag: "Best Seller", solidBg: "#FFFFFF", badgeColor: "#D90404" },
  { id: 3, image: PorkStake, category: "pork", anchoring: "9000", name: "Roasted Pork Special", price: 6000, description: "Roasted crispy premium pork cuts with fried cassava, fresh salad and chapati.", rating: 4.9, cookTime: "30–35 min", tag: "Best Seller", solidBg: "#FFFFFF", badgeColor: "#D4FF00" },
  { id: 4, image: Chicken, category: "chicken", anchoring: "78000", name: "Crispy Chicken Bucket", price: 55000, description: "Golden crispy whole chicken seasoned with our fiery Ugandan spice blend.", rating: 4.6, cookTime: "20–25 min", tag: "Spicy", solidBg: "#FFFFFF", badgeColor: "#D90404" },
  { id: 5, image: Pizza, category: "pizza", anchoring: "18000", name: "Chicken & Pork Pizza", price: 15000, description: "Hand-tossed artisan dough loaded with roasted pork chunks and mozzarella.", rating: 4.7, cookTime: "40–45 min", tag: "New", solidBg: "#FFFFFF", badgeColor: "#D4FF00" },
  { id: 6, image: Chicken, category: "chicken", anchoring: "55000", name: "Whole Roasted Chicken", price: 45000, description: "Farm-fresh whole chicken, marinated for 24 hours and flame-roasted.", rating: 4.7, cookTime: "35–40 min", tag: null, solidBg: "#FFFFFF", badgeColor: "#D4FF00" },
  { id: 7, image: FreshPork, category: "raw", anchoring: "20000", name: "Fresh Pork Cuts (1kg)", price: 16000, description: "Premium farm-fresh pork, hygienically packaged and ready for your grill.", rating: 4.5, cookTime: "—", tag: "Organic", solidBg: "#FFFFFF", badgeColor: "#D4FF00" },
];

const SPOTLIGHT_ITEMS = [ITEMS[0], ITEMS[1], ITEMS[2], ITEMS[4]];

const butterySpring = { type: "spring", stiffness: 220, damping: 26, mass: 1 };
const cardVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }
};

const cx = (...c) => c.filter(Boolean).join(" ");

const FontFace = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,700&family=Poppins:wght@600;700;800;900&display=swap');
    .font-display { font-family: 'Poppins', sans-serif; letter-spacing: -0.03em; }
    .font-body { font-family: 'Montserrat', sans-serif; }
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    .cart-scroll::-webkit-scrollbar { width: 4px; }
    .cart-scroll::-webkit-scrollbar-track { background: transparent; }
    .cart-scroll::-webkit-scrollbar-thumb { background: rgba(212,255,0,0.4); border-radius: 99px; }
  `}</style>
);

function CtaButton({ children, onClick, className = "", style = {}, ...props }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={butterySpring}
      className={cx(
        "group relative flex items-center justify-center gap-2.5 py-3.5 px-7 font-display font-black text-xs uppercase tracking-widest cursor-pointer overflow-hidden shadow-none border-0",
        className
      )}
      style={{
        backgroundColor: BRAND.primary,
        color: BRAND.primaryText,
        clipPath: "polygon(0 0, 100% 0, 94% 100%, 0% 100%)",
        ...style
      }}
      {...props}
    >
      <div className="absolute inset-0 bg-white/25 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
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
        "flex items-center gap-2.5 py-3.5 px-6 text-xs font-display font-black uppercase tracking-wider cursor-pointer transition-all shadow-none border-0 flex-shrink-0",
        isActive
          ? "bg-[#D4FF00] text-[#2E0101]"
          : "bg-[#2E0101] text-white hover:bg-[#3E0808]"
      )}
      style={{ clipPath: "polygon(0 0, 100% 0, 94% 100%, 0% 100%)" }}
    >
      <Icon size={16} className={isActive ? "text-[#2E0101]" : "text-[#D4FF00]"} />
      {cat.label}
    </motion.button>
  );
}

function SpotlightBanner({ item, onView, onAdd, currentIndex, totalCount, onSelectIndex }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24">
      <div
        className="relative overflow-hidden text-[#2E0101] shadow-none p-6 sm:p-12 transition-all duration-700 border-0"
        style={{
          backgroundColor: BRAND.primary,
          clipPath: "polygon(0 0, 100% 0, 99.5% 98.5%, 0% 100%)"
        }}
      >
        {/* Dotted background removed here */}

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-5 max-w-xl text-center md:text-left flex-1">
            <div className="space-y-2">
              <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-[#2E0101] leading-none">
                {item.name}
              </h1>
              <p className="font-body text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-display font-bold text-[#2E0101] pt-1">
              <div className="flex items-center gap-1.5 bg-[#2E0101]/10 px-3 py-1.5">
                <Clock size={14} style={{ color: BRAND.dark }} />
                <span>{item.cookTime}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#2E0101]/10 px-3 py-1.5">
                <Star size={14} className="fill-[#2E0101] text-[#2E0101]" />
                <span>{item.rating} Rating</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 pt-2">
              <div>
                <span className="block text-[10px] font-display font-black uppercase tracking-widest text-[#2E0101]/70 mb-0.5">Price</span>
                <div className="flex items-baseline gap-2.5">
                  <span className="font-display font-black text-2xl sm:text-4xl text-[#2E0101]">
                    UGX {fmt(item.price)}
                  </span>
                  {item.anchoring && Number(item.anchoring) > item.price && (
                    <span className="line-through text-xs text-[#2E0101]/60">
                      UGX {fmt(item.anchoring)}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <motion.button
                  type="button"
                  onClick={() => onView(item)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={butterySpring}
                  className="group relative flex items-center justify-center gap-2.5 py-3.5 px-7 font-display font-black text-xs uppercase tracking-widest cursor-pointer overflow-hidden shadow-none border-0 bg-[#2E0101] text-[#D4FF00]"
                  style={{ clipPath: "polygon(0 0, 100% 0, 94% 100%, 0% 100%)" }}
                >
                  <span className="relative z-10 flex items-center gap-2">Quick View <ArrowRight size={15} strokeWidth={3} /></span>
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() => onAdd(item, 1)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={butterySpring}
                  className="py-3.5 px-6 font-display font-black text-xs uppercase tracking-widest bg-white text-[#2E0101] hover:bg-black hover:text-[#D4FF00] transition-all cursor-pointer border-0 shadow-none"
                  style={{ clipPath: "polygon(0 0, 100% 0, 94% 100%, 0% 100%)" }}
                >
                  + Add to Cart
                </motion.button>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-4 flex-shrink-0">
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="relative w-60 h-60 sm:w-72 sm:h-72 flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-white/30 rounded-full blur-3xl pointer-events-none" />
              <motion.img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-contain relative z-10 drop-shadow-[0_25px_35px_rgba(46,1,1,0.25)] scale-110"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>

            <div className="flex items-center gap-2 bg-[#2E0101]/10 px-3.5 py-2 backdrop-blur-md">
              {Array.from({ length: totalCount }).map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onSelectIndex(idx)}
                  className={cx(
                    "h-2 transition-all duration-300 rounded-full cursor-pointer border-0",
                    currentIndex === idx ? "w-8 bg-[#2E0101]" : "w-2 bg-[#2E0101]/30 hover:bg-[#2E0101]/60"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ item, cartCount, onAdd, onLike, isLiked, onView }) {
  const discountPct = pct(item.price, item.anchoring);
  const ItemIcon = CATEGORIES.find(c => c.key === item.category)?.icon || Utensils;

  return (
    <motion.div
      layout
      variants={cardVariants}
      initial="hidden"
      animate="show"
      exit="hidden"
      className="group relative bg-white transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-none border-0"
    >
      <div className="absolute top-3 left-3 z-20 flex flex-col gap-1 items-start">
        {item.tag && (
          <span
            className="px-3 py-1 text-[10px] font-display font-black uppercase tracking-wider text-[#2E0101]"
            style={{ backgroundColor: item.badgeColor || BRAND.primary }}
          >
            {item.tag}
          </span>
        )}
        {discountPct > 0 && (
          <span className="px-2.5 py-0.5 text-[9px] font-display font-black uppercase text-white bg-[#D90404]">
            -{discountPct}%
          </span>
        )}
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onLike(item.id);
        }}
        className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center hover:bg-[#D4FF00] transition-colors cursor-pointer border-0 shadow-none"
      >
        <Heart
          size={16}
          className={isLiked ? "" : "text-slate-600"}
          style={isLiked ? { fill: BRAND.redAccent, color: BRAND.redAccent } : undefined}
        />
      </button>

      <div
        onClick={() => onView(item)}
        className="relative h-52 bg-slate-50 flex items-center justify-center p-6 overflow-hidden cursor-pointer border-0 outline-none shadow-none group-hover:bg-amber-50/20 transition-colors"
      >
        <ItemIcon className="absolute text-slate-950/[0.04] z-0" size={160} strokeWidth={1} />
        <motion.img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-contain relative z-10 group-hover:scale-110 transition-transform duration-500 border-0 outline-none shadow-none bg-transparent"
        />
      </div>

      <div className="p-5 flex flex-col flex-grow justify-between space-y-4 bg-white border-0">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-display font-black uppercase tracking-wider text-slate-400 text-[10px]">
              {item.category}
            </span>
            <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5">
              <Star size={12} className="fill-amber-400 text-amber-400" />
              <span className="font-bold text-slate-900 text-[11px]">{item.rating}</span>
            </div>
          </div>

          <h3
            onClick={() => onView(item)}
            className="font-display font-black text-base uppercase tracking-tight text-[#2E0101] line-clamp-1 cursor-pointer transition-colors hover:text-[#D90404]"
          >
            {item.name}
          </h3>

          <p className="font-body text-xs text-slate-500 line-clamp-2 font-medium">
            {item.description}
          </p>
        </div>

        <div className="pt-3 flex items-center justify-between border-0">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-display font-black text-lg text-[#2E0101]">
                {fmt(item.price)}
              </span>
              <span className="text-[10px] font-display font-black text-slate-400 uppercase">UGX</span>
            </div>
            {item.anchoring && Number(item.anchoring) > item.price && (
              <span className="line-through text-[10px] text-slate-400">
                {fmt(item.anchoring)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {cartCount > 0 && (
              <span className="w-6 h-6 flex items-center justify-center text-[#2E0101] text-[11px] font-black bg-[#D4FF00]">
                {cartCount}
              </span>
            )}
            <motion.button
              type="button"
              onClick={() => onAdd(item, 1)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              transition={butterySpring}
              className="w-10 h-10 flex items-center justify-center text-[#2E0101] bg-[#D4FF00] hover:bg-[#2E0101] hover:text-[#D4FF00] transition-colors cursor-pointer border-0 shadow-none"
            >
              <Plus size={18} strokeWidth={3} />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
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
  addToCart,
  decreaseQuantity,
  removeFromCart,
}) {
  const lastAddedImage = cartItems.length > 0 ? cartItems[cartItems.length - 1].image : null;

  const handleWhatsAppCheckout = () => {
    let msg = `Hello ${BRAND_NAME}, I would like to place an order:\n\n`;
    cartItems.forEach((item, idx) => {
      msg += `${idx + 1}. ${item.name} x${item.quantity} - UGX ${fmt(item.price * item.quantity)}\n`;
    });
    msg += `\nSubtotal: UGX ${fmt(subtotal)}`;
    msg += `\nTax (18%): UGX ${fmt(tax)}`;
    msg += `\nDelivery: ${shipping === 0 ? "FREE" : `UGX ${fmt(shipping)}`}`;
    msg += `\n*Total: UGX ${fmt(total)}*`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, "_blank");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={butterySpring}
            className="mb-3 w-80 sm:w-96 max-h-[75vh] bg-white shadow-2xl flex flex-col overflow-hidden border border-[#2E0101]/10"
          >
            <div className="flex items-center justify-between p-4 text-[#2E0101]" style={{ backgroundColor: BRAND.primary }}>
              <div className="flex items-center gap-2">
                <ShoppingBag size={18} style={{ color: BRAND.dark }} />
                <h3 className="font-display font-black text-xs uppercase tracking-wider">Your Order Bag</h3>
              </div>
              <button
                type="button"
                onClick={onToggle}
                className="w-7 h-7 flex items-center justify-center bg-[#2E0101]/10 hover:bg-[#2E0101] hover:text-[#D4FF00] transition-colors cursor-pointer border-0"
              >
                <X size={14} />
              </button>
            </div>

            {subtotal > 0 && subtotal < FREE_DELIVERY_THRESHOLD && (
              <div className="p-3 text-[11px] font-medium text-slate-900 bg-amber-50 border-b border-amber-100">
                Add <span className="font-bold">UGX {fmt(FREE_DELIVERY_THRESHOLD - subtotal)}</span> more for <span className="font-black uppercase text-[#D90404]">Free Delivery!</span>
                <div className="w-full bg-slate-200 h-1.5 mt-1.5 overflow-hidden">
                  <div
                    className="h-full transition-all duration-500"
                    style={{ backgroundColor: BRAND.primary, width: `${Math.min(100, (subtotal / FREE_DELIVERY_THRESHOLD) * 100)}%` }}
                  />
                </div>
              </div>
            )}

            <div className="flex-grow overflow-y-auto p-4 space-y-4 max-h-64 cart-scroll">
              {cartItems.length === 0 ? (
                <div className="py-12 text-center text-slate-400">
                  <ShoppingBag size={32} className="mx-auto mb-2 opacity-40" />
                  <p className="font-display font-black uppercase text-xs">Your cart is currently empty</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100 last:border-none">
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-contain bg-slate-50 p-1 flex-shrink-0 border border-slate-200" />
                    <div className="flex-grow min-w-0">
                      <h4 className="font-display font-black text-xs uppercase truncate text-[#2E0101]">{item.name}</h4>
                      <span className="text-[11px] text-slate-500 font-medium">UGX {fmt(item.price)} each</span>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <button
                        type="button"
                        onClick={() => decreaseQuantity(item.id)}
                        className="w-6 h-6 flex items-center justify-center bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer border-0"
                      >
                        <Minus size={10} />
                      </button>
                      <span className="w-5 text-center font-display font-black text-xs">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => addToCart(item, 1)}
                        className="w-6 h-6 flex items-center justify-center bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer border-0"
                      >
                        <Plus size={10} />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="w-6 h-6 ml-1 flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors cursor-pointer border-0"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-4 bg-slate-50 space-y-2 border-t border-slate-200">
                <div className="flex justify-between text-xs text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-bold text-slate-900">UGX {fmt(subtotal)}</span>
                </div>
                <div className="flex justify-between text-xs text-slate-600">
                  <span>Tax (18%)</span>
                  <span className="font-bold text-slate-900">UGX {fmt(tax)}</span>
                </div>
                <div className="flex justify-between text-xs text-slate-600">
                  <span>Delivery Fee</span>
                  <span className="font-bold text-slate-900">{shipping === 0 ? "FREE" : `UGX ${fmt(shipping)}`}</span>
                </div>
                <div className="flex justify-between text-sm pt-2 font-display font-black text-[#2E0101] border-t border-slate-200">
                  <span>Total</span>
                  <span className="text-[#D90404]">UGX {fmt(total)}</span>
                </div>

                <motion.a
                  href="#whatsapp"
                  onClick={(e) => {
                    e.preventDefault();
                    handleWhatsAppCheckout();
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-3 group relative flex items-center justify-center gap-2 py-3 px-4 font-display font-black text-xs uppercase tracking-wider cursor-pointer overflow-hidden w-full shadow-none border-0"
                  style={{
                    backgroundColor: BRAND.primary,
                    color: BRAND.primaryText,
                    clipPath: "polygon(0 0, 100% 0, 96% 100%, 0% 100%)",
                  }}
                >
                  <span className="relative z-10">Checkout via WhatsApp</span>
                  <ArrowRight size={16} strokeWidth={3} className="relative z-10 transition-transform duration-400 group-hover:translate-x-1.5" />
                </motion.a>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={onToggle}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={butterySpring}
        className="group relative flex items-center gap-3.5 py-4 px-6 shadow-2xl cursor-pointer overflow-hidden backdrop-blur-xl border border-0"
        style={{
          backgroundColor: "#D4FF00",
          color: "#2E0101",
          clipPath: "polygon(0 0, 100% 0, 94% 100%, 0% 100%)",
        }}
      >
        <div className="absolute inset-0 bg-[#2E0101] translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none" />

        <div className="relative z-10 w-8 h-8 flex items-center justify-center bg-[#2E0101] text-[#D4FF00] group-hover:bg-[#D4FF00] group-hover:text-[#2E0101] overflow-hidden shadow-none transition-colors">
          {lastAddedImage ? (
            <img src={lastAddedImage} alt="Cart item" className="w-full h-full object-contain p-0.5 border-0 outline-none shadow-none bg-transparent" />
          ) : (
            <ShoppingBag size={16} strokeWidth={2.5} />
          )}
        </div>

        <div className="relative z-10 flex flex-col text-left">
          <span className="font-display font-black text-xs uppercase tracking-wider flex items-center gap-1.5 text-[#2E0101] group-hover:text-[#D4FF00]">
            {totalItems > 0 ? `${totalItems} item${totalItems !== 1 ? "s" : ""}` : "Cart Empty"}
            <motion.span animate={{ y: expanded ? 2 : -2 }} transition={{ repeat: Infinity, repeatType: "reverse", duration: 0.6 }}>
              {expanded ? <ChevronDown size={12} /> : <ChevronUp size={12} />}
            </motion.span>
          </span>
          <span className="font-body text-[10px] text-slate-700 group-hover:text-slate-300 font-semibold">
            {totalItems > 0 ? `UGX ${fmt(subtotal)}` : "Tap to open"}
          </span>
        </div>

        {totalItems > 0 && (
          <span
            className="relative z-10 ml-2 px-2 py-0.5 text-[10px] font-display font-black text-[#D4FF00] bg-[#2E0101] shadow-none"
          >
            ACTIVE
          </span>
        )}
      </motion.button>
    </div>
  );
}

function ProductDetailsModal({ item, onClose, onAdd }) {
  const [qty, setQty] = useState(1);
  if (!item) return null;
  const ItemIcon = CATEGORIES.find(c => c.key === item.category)?.icon || Utensils;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#2E0101] p-0 m-0">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={butterySpring}
        className="relative w-screen h-screen bg-white text-slate-900 overflow-y-auto flex flex-col md:flex-row items-center justify-between shadow-none border-0 m-0 p-0"
      >
        <div className="absolute top-6 right-6 z-40">
          <button
            type="button"
            onClick={onClose}
            className="w-12 h-12 flex items-center justify-center bg-[#2E0101] text-white hover:bg-[#D4FF00] hover:text-[#2E0101] transition-colors cursor-pointer border-0 shadow-none"
          >
            <X size={22} />
          </button>
        </div>

        {/* Image side filling half/full screen with #D4FF00 Electric Lime background */}
        <div
          className="relative md:w-1/2 w-full h-[50vh] md:h-screen flex items-center justify-center p-8 overflow-hidden"
          style={{ backgroundColor: BRAND.primary }}
        >
          <ItemIcon className="absolute text-[#2E0101]/10 z-0" size={400} strokeWidth={1} />

          <motion.img
            src={item.image}
            alt={item.name}
            className="w-full max-w-3xl h-full object-contain relative z-10 drop-shadow-[0_30px_40px_rgba(46,1,1,0.25)]"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="absolute bottom-6 left-6 z-20 bg-[#2E0101] text-[#D4FF00] px-4 py-1.5 font-display font-black text-xs uppercase tracking-widest shadow-none">
            {item.category}
          </div>
        </div>

        {/* Content details side */}
        <div className="md:w-1/2 w-full h-full p-8 sm:p-16 flex flex-col justify-center space-y-6 bg-white overflow-y-auto">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-display hidden font-black uppercase tracking-[0.2em] px-3.5 py-1.5 bg-[#2E0101] text-[#D4FF00]">
                Signature Selection
              </span>
              <div className="flex items-center gap-1.5 px-3 py-1  text-xs font-bold ">
                <Star size={14} className="fill-amber-400 text-amber-400" />
                <span>{item.rating}</span>
              </div>
            </div>

            <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-[#2E0101] leading-none">
              {item.name}
            </h2>

            <p className="font-body text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
              {item.description}
            </p>

            <div className="grid grid-cols-2 gap-4 py-3 border-y border-slate-100">
              <div className="flex items-center gap-2.5 text-xs text-slate-700 font-bold">
                <Clock size={16} className="text-[#D90404]" />
                <span>Prep Time: {item.cookTime}</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-700 font-bold">
                <CheckCircle2 size={16} className="text-[#D90404]" />
                <span>Freshly Prepared</span>
              </div>
            </div>
          </div>

          <div className="space-y-6 pt-2">
            <div className="flex items-baseline justify-between bg-slate-50 p-4 border-none border-slate-200">
              <div>
                <span className="text-[10px] font-display font-black tracking-widest text-slate-400 uppercase block mb-1">Total Price</span>
                <div className="flex items-baseline gap-2">
                  <span className="font-display font-black text-3xl sm:text-4xl text-[#2E0101]">
                    {fmt(item.price * qty)}
                  </span>
                  <span className="text-xs font-display font-black uppercase text-slate-400">UGX</span>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white py-2 px-4 border border-slate-300 shadow-none">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-7 h-7 flex items-center justify-center bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer border-0"
                >
                  <Minus size={14} />
                </button>
                <span className="font-display font-black text-sm w-6 text-center text-[#2E0101]">{qty}</span>
                <button
                  type="button"
                  onClick={() => setQty((q) => q + 1)}
                  className="w-7 h-7 flex items-center justify-center bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer border-0"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            <CtaButton
              onClick={() => {
                onAdd(item, qty);
                onClose();
              }}
              className="w-full !py-4 text-sm shadow-none"
            >
              Add {qty} to Cart — UGX {fmt(item.price * qty)}
            </CtaButton>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function ProductsView() {
  // CONTEXT INTEGRATION
  const { 
    cartItems, 
    addToCart, 
    decreaseQuantity, 
    removeFromCart, 
    subtotal, 
    tax, 
    shipping, 
    total 
  } = useCart();

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [likedIds, setLikedIds] = useState([]);
  const [spotlightIdx, setSpotlightIdx] = useState(0);
  const [quickViewItem, setQuickViewItem] = useState(null);
  const [cartExpanded, setCartExpanded] = useState(false);

  const totalItemsCount = useMemo(() => cartItems.reduce((acc, i) => acc + i.quantity, 0), [cartItems]);

  const filteredItems = useMemo(() => {
    return ITEMS.filter((item) => {
      return selectedCategory === "all" || item.category === selectedCategory;
    });
  }, [selectedCategory]);

  const toggleLike = useCallback((id) => {
    setLikedIds((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 font-body text-slate-900 selection:bg-[#D4FF00] selection:text-[#2E0101]">
      <FontFace />

      <SpotlightBanner
        item={SPOTLIGHT_ITEMS[spotlightIdx]}
        currentIndex={spotlightIdx}
        totalCount={SPOTLIGHT_ITEMS.length}
        onSelectIndex={(idx) => setSpotlightIdx(idx)}
        onView={(item) => setQuickViewItem(item)}
        onAdd={(item, qty) => addToCart(item, qty)}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-10">
        <div className="flex items-center justify-between gap-6 border-b border-slate-200 pb-8">
          <div className="flex items-center gap-3 w-full overflow-x-auto no-scrollbar pb-2 md:pb-0">
            {CATEGORIES.map((cat) => (
              <CategoryPill
                key={cat.key}
                cat={cat}
                isActive={selectedCategory === cat.key}
                onSelect={(k) => setSelectedCategory(k)}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => {
            const inCart = cartItems.find((i) => i.id === item.id);
            return (
              <ProductCard
                key={item.id}
                item={item}
                cartCount={inCart ? inCart.quantity : 0}
                isLiked={likedIds.includes(item.id)}
                onLike={toggleLike}
                onView={(it) => setQuickViewItem(it)}
                onAdd={(it, q) => addToCart(it, q)}
              />
            );
          })}
        </div>

        {filteredItems.length === 0 && (
          <div className="py-24 text-center">
            <Utensils size={48} className="mx-auto text-slate-300 mb-3" />
            <h3 className="font-display font-black uppercase text-lg text-slate-800">No dishes found</h3>
            <p className="text-sm text-slate-500 mt-1">Try selecting a different category above.</p>
          </div>
        )}
      </div>

      <FloatingPillCart
        expanded={cartExpanded}
        onToggle={() => setCartExpanded((prev) => !prev)}
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
          <ProductDetailsModal
            item={quickViewItem}
            onClose={() => setQuickViewItem(null)}
            onAdd={(it, q) => addToCart(it, q)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}