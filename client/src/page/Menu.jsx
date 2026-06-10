import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart, Star, Clock, Truck, ShieldCheck,
  Minus, Plus, X, ShoppingBasket, ShoppingBag,
  ArrowRight, ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";

// ASSETS
import Pizza from "../assets/pizza(17).png";
// import PorkStake from "../assets/PremiumPlate.png";
import FreshPork from "../assets/freshporke.png";
import Porkies from "../assets/PremiumPlate.png";
import Burger from "../assets/Burger.png";
import Chicken from "../assets/pngwing.com (25).png";

// ─── Helpers ──────────────────────────────────────────────────────────────────
const pct = (price, anchor) =>
  Math.round((1 - price / parseInt(anchor)) * 100);

const fmt = (n) => Number(n).toLocaleString();

// ─── Data ─────────────────────────────────────────────────────────────────────
const CATEGORIES = [
  { key: "all", label: "All" },
  { key: "pork", label: "Pork" },
  { key: "chicken", label: "Chicken" },
  { key: "burgers", label: "Burgers" },
  { key: "pizza", label: "Pizza" },
];

const ITEMS = [
  { id: 1, image: Burger, category: "burgers", anchoring: "8000", name: "Beef Burger", price: 6000, description: "Juicy grilled beef patty with fresh lettuce, cheese and creamy sauce.", rating: 4.8, cookTime: "15–20 min", tag: "Popular" },
  { id: 2, image: Porkies, category: "pork", anchoring: "15000", name: "Roasted Premium Pork", price: 10000, description: "Roasted pork with fried cassava, salad and chapati.", rating: 4.9, cookTime: "30–35 min", tag: "Best Seller" },
  { id: 3, image: Chicken, category: "chicken", anchoring: "78000", name: "Crispy Chicken", price: 55000, description: "Golden crispy chicken with a fiery spice blend.", rating: 4.6, cookTime: "20–25 min", tag: "Spicy" },
  { id: 4, image: Pizza, category: "pizza", anchoring: "18000", name: "Chicken Pizza", price: 15000, description: "Hand-tossed dough with premium chicken and mozzarella.", rating: 4.7, cookTime: "40–45 min", tag: "New" },
  { id: 5, image: Chicken, category: "chicken", anchoring: "55000", name: "Whole Chicken", price: 45000, description: "Farm-fresh whole chicken, marinated and roasted.", rating: 4.7, cookTime: "35–40 min", tag: null },
  { id: 6, image: FreshPork, category: "pork", anchoring: "20000", name: "Fresh Pork Cuts", price: 16000, description: "Premium farm-fresh pork, hygienically prepared.", rating: 4.5, cookTime: "—", tag: "Organic" },
];

// ─── Tag badge ────────────────────────────────────────────────────────────────
const TAG_STYLES = {
  Popular: "bg-emerald-100 text-emerald-700",
  "Best Seller": "bg-orange-100 text-orange-700",
  Spicy: "bg-red-100    text-red-700",
  New: "bg-violet-100 text-violet-700",
  Organic: "bg-lime-100   text-lime-700",
};

const Tag = ({ label }) =>
  label ? (
    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide ${TAG_STYLES[label]}`}>
      {label}
    </span>
  ) : null;

// ─── Star row ─────────────────────────────────────────────────────────────────
const Stars = ({ rating }) => (
  <div className="flex items-center gap-1">
    {Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={12}
        className={
          i < Math.floor(rating)
            ? "text-amber-400 fill-amber-400"
            : "text-gray-300 fill-gray-200"
        }
      />
    ))}
    <span className="text-xs font-bold text-gray-600 ml-1">{rating}</span>
  </div>
);

// ─── Framer variants ──────────────────────────────────────────────────────────
const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 260, damping: 22 } },
};

const drawerVariants = {
  hidden: { x: "100%" },
  show: { x: 0, transition: { type: "spring", stiffness: 300, damping: 32 } },
  exit: { x: "100%", transition: { duration: 0.25 } },
};

const modalVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 280, damping: 28 } },
  exit: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

// ─── Component ────────────────────────────────────────────────────────────────
const OrderingComponent = () => {
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [liked, setLiked] = useState(new Set());
  const [cartOpen, setCartOpen] = useState(false);
  const [modal, setModal] = useState(null); // item | null

  const filtered = activeCategory === "all"
    ? ITEMS
    : ITEMS.filter((i) => i.category === activeCategory);

  // Cart helpers
  const addToCart = (item) => setCart((p) => [...p, { ...item, cartId: Date.now() + Math.random() }]);
  const removeFromCart = (cartId) => setCart((p) => p.filter((i) => i.cartId !== cartId));
  const toggleLike = (id) => setLiked((p) => { const s = new Set(p); s.has(id) ? s.delete(id) : s.add(id); return s; });
  const total = cart.reduce((s, i) => s + i.price, 0);

  // Cart item counts for badge
  const cartCountMap = cart.reduce((acc, i) => {
    acc[i.id] = (acc[i.id] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">

      {/* ── Ambient blobs ── */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-red-100/60 blur-[120px]" />
        <div className="absolute -bottom-32 -right-32 w-[420px] h-[420px] rounded-full bg-orange-100/60 blur-[120px]" />
      </div>

      {/* ── Back link ── */}
      <div className="px-5 pt-5">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-900 transition-colors duration-200 group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
          <span className="text-xs uppercase tracking-widest font-bold">Back to home</span>
        </Link>
      </div>

      {/* ── Sticky header ── */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-2xl border-b border-gray-100/80 shadow-[0_1px_20px_rgba(0,0,0,0.06)]">
        {/* Top bar */}
        <div className="max-w-7xl mx-auto px-5 pt-4 pb-3 flex items-center justify-between gap-4">

          {/* Brand mark */}
          <div className="flex items-center gap-3 min-w-0">
            {/* Flame icon accent */}
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shrink-0 shadow-md shadow-red-500/25">
              <span className="text-white text-base leading-none select-none">🔥</span>
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-black tracking-[3px] uppercase text-red-500 leading-none mb-0.5">GREENBites</p>
              <h1 className="text-lg md:text-2xl font-black leading-tight text-gray-900 truncate">Food Collection</h1>
            </div>
          </div>

          {/* Right cluster */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Item count chip */}
            {filtered.length > 0 && (
              <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-gray-100 text-gray-500 text-xs font-bold">
                {filtered.length} items
              </span>
            )}

            {/* Cart button */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative flex items-center gap-2 h-11 pl-3 pr-4 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-black text-sm transition-all duration-200 shadow-lg shadow-red-600/30 hover:shadow-red-600/40 hover:scale-[1.02] group"
              aria-label="Open cart"
            >
              <ShoppingBag size={17} className="group-hover:scale-110 transition-transform duration-200" />
              <span className="hidden sm:inline">Cart</span>
              {cart.length > 0 && (
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white text-red-600 text-[10px] font-black leading-none">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Category strip */}
        <div className="max-w-7xl mx-auto px-5 pb-3 flex gap-2 overflow-x-auto scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`relative px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all duration-200 ${activeCategory === cat.key
                ? "bg-gray-900 text-white shadow-md"
                : "bg-gray-100/80 text-gray-500 hover:bg-gray-200/80 hover:text-gray-800"
                }`}
            >
              {cat.label}
              {activeCategory === cat.key && (
                <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-red-500" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── Product grid ── */}
      <div className="max-w-7xl mx-auto px-5 py-8">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.07 } } }}
        >
          {filtered.map((item) => (
            <motion.div
              key={item.id}
              variants={cardVariants}
              onClick={() => setModal(item)}
              className="group relative rounded-3xl overflow-hidden bg-white border border-gray-100 hover:border-red-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-red-500/10 transition-all duration-300 cursor-pointer"
            >
              {/* Image zone */}
              <div className="relative h-52 flex items-center justify-center bg-gradient-to-b from-gray-50 to-white overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-44 h-44 object-contain group-hover:scale-105 transition-transform duration-500"
                />

                {/* Discount pill */}
                <div className="absolute top-3 left-3 bg-red-600 text-white px-2.5 py-1 rounded-full text-[11px] font-black shadow">
                  -{pct(item.price, item.anchoring)}%
                </div>

                {/* Like */}
                <button
                  onClick={(e) => { e.stopPropagation(); toggleLike(item.id); }}
                  aria-label={liked.has(item.id) ? "Unlike" : "Like"}
                  className={`absolute top-3 right-3 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 ${liked.has(item.id) ? "bg-red-600 shadow-md" : "bg-white shadow border border-gray-100"
                    }`}
                >
                  <Heart size={16} className={liked.has(item.id) ? "fill-white text-white" : "text-gray-500"} />
                </button>
              </div>

              {/* Info */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Tag label={item.tag} />
                  <Stars rating={item.rating} />
                </div>

                <h2 className="font-black text-lg leading-tight mb-1">{item.name}</h2>

                <p className="text-gray-400 text-xs leading-relaxed mb-3 line-clamp-2">{item.description}</p>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 line-through text-xs">UGX {fmt(item.anchoring)}</p>
                    <p className="text-red-600 font-black text-xl">UGX {fmt(item.price)}</p>
                  </div>

                  <button
                    onClick={(e) => { e.stopPropagation(); addToCart(item); }}
                    aria-label={`Add ${item.name} to cart`}
                    className="relative w-12 h-12 rounded-2xl bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-lg shadow-red-600/25 hover:scale-105 transition-all duration-200"
                  >
                    <ShoppingBasket size={18} />
                    {cartCountMap[item.id] > 0 && (
                      <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-white text-red-600 text-[9px] font-black flex items-center justify-center border border-red-100">
                        {cartCountMap[item.id]}
                      </span>
                    )}
                  </button>
                </div>

                {/* Cook time strip */}
                <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                  <div className="flex items-center gap-1.5">
                    <Clock size={12} className="text-red-400" />
                    {item.cookTime}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Truck size={12} className="text-emerald-500" />
                    Free delivery
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400">
            <ShoppingBag size={48} className="mb-4 opacity-30" />
            <p className="font-bold text-lg">Nothing here yet</p>
            <p className="text-sm mt-1">Try a different category</p>
          </div>
        )}
      </div>

      {/* ── Full-screen product modal ── */}
      <AnimatePresence>
        {modal && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModal(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-50"
            />

            {/* Full-screen sheet — slides up from bottom */}
            <motion.div
              key="modal"
              variants={modalVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="fixed inset-0 z-[60] flex flex-col md:flex-row bg-white overflow-hidden"
            >
              {/* ── Hero zone: dark gradient with food image ── */}
              <div
                className="relative h-[38vh] min-h-[260px] md:h-auto flex-shrink-0 md:flex-1 items-end justify-between overflow-hidden"
                style={{
                  background: `
              radial-gradient(
                circle 900px at 50% 120px,
                #FF3B30 0%,
                #E10600 25%,
                #3d0000 65%,
                #2B0000 100%
              )
            `,
                }}
              >
                {/* Radial glow behind image */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "radial-gradient(ellipse 60% 60% at 70% 55%, rgba(249,115,22,0.25) 0%, transparent 70%)",
                  }}
                />

                {/* Subtle texture rings */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {[280, 420, 560].map((s, i) => (
                    <div
                      key={s}
                      className="absolute rounded-full border border-white/5"
                      style={{ width: s, height: s, top: "50%", right: "-60px", transform: "translateY(-50%)", opacity: 0.6 - i * 0.15 }}
                    />
                  ))}
                </div>

                {/* Top bar: back + like */}
                <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-5 pt-5 z-10">
                  <button
                    onClick={() => setModal(null)}
                    className="flex items-center gap-2 text-white/70 hover:text-white transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all">
                      <ArrowLeft size={18} />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest hidden sm:inline">Back</span>
                  </button>

                  <div className="flex items-center gap-2">
                    {modal.tag && <Tag label={modal.tag} />}
                    <button
                      onClick={() => toggleLike(modal.id)}
                      aria-label={liked.has(modal.id) ? "Unlike" : "Like"}
                      className={`w-10 h-10 rounded-2xl backdrop-blur-sm flex items-center justify-center transition-all duration-200 ${liked.has(modal.id)
                        ? "bg-red-500 shadow-lg shadow-red-500/40"
                        : "bg-white/10 hover:bg-white/20"
                        }`}
                    >
                      <Heart size={17} className={liked.has(modal.id) ? "fill-white text-white" : "text-white/80"} />
                    </button>
                  </div>
                </div>

                {/* Food image — responsive sizing */}
                <div className="absolute inset-0 w-full flex items-center justify-center p-4 md:pr-10">
                  <motion.img
                    key={modal.id}
                    initial={{ opacity: 0, scale: 0.8, rotate: -6 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 220, damping: 20, delay: 0.05 }}
                    src={modal.image}
                    alt={modal.name}
                    className="w-full max-w-[240px] sm:max-w-[320px] md:max-w-[500px] h-auto max-h-[90%] object-contain drop-shadow-2xl"
                    style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.5))" }}
                  />
                </div>
              </div>

              {/* ── Detail zone: scrollable white panel ── */}
              <div className="flex-1 flex flex-col overflow-hidden">
                {/* Scrollable details */}
                <div className="flex-1 overflow-y-auto px-6 py-4 md:py-6">
                  <div className="max-w-2xl mx-auto flex flex-col gap-6">

                    {/* Text/Price details */}
                    <div className="relative z-10 pt-2 pb-4">
                      <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.35 }}
                      >
                        <Stars rating={modal.rating} />
                        <h2 className="text-3xl md:text-5xl font-black text-black leading-tight mt-2 mb-1">{modal.name}</h2>
                        <div className="flex flex-wrap items-center gap-2 mt-3">
                          <span className="text-2xl md:text-3xl font-black text-black">UGX {fmt(modal.price)}</span>
                          <span className="text-sm text-slate-500/80 line-through">UGX {fmt(modal.anchoring)}</span>
                          <span className="bg-red-500 text-white text-xs font-black px-2.5 py-1 rounded-full">
                            -{pct(modal.price, modal.anchoring)}%
                          </span>
                        </div>
                      </motion.div>
                    </div>

                    {/* Description */}
                    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                      <p className="text-xs font-black uppercase tracking-widest text-red-500 mb-2">About this dish</p>
                      <p className="text-gray-600 leading-relaxed text-sm md:text-base">{modal.description}</p>
                    </motion.div>

                    {/* Feature chips */}
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="grid grid-cols-3 gap-2 sm:gap-3"
                    >
                      {[
                        { Icon: Clock, label: "Prep time", value: modal.cookTime, color: "text-red-500", bg: "bg-red-50" },
                        { Icon: Truck, label: "Delivery", value: "Free", color: "text-emerald-600", bg: "bg-emerald-50" },
                        { Icon: ShieldCheck, label: "Quality", value: "Premium", color: "text-amber-500", bg: "bg-amber-50" },
                      ].map(({ Icon, label, value, color, bg }) => (
                        <div key={label} className={`flex flex-col items-center gap-1.5 rounded-2xl ${bg} py-3 px-2 sm:py-4 sm:px-3 text-center`}>
                          <Icon size={18} className={color} />
                          <div>
                            <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wide text-gray-400">{label}</p>
                            <p className="text-xs sm:text-sm font-black text-gray-800 mt-0.5">{value}</p>
                          </div>
                        </div>
                      ))}
                    </motion.div>

                    {/* Savings callout */}
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 }}
                      className="flex items-center justify-between bg-gradient-to-r from-[#0edb0e]/10 to-green-50 border border-green-100 rounded-2xl p-4 sm:px-5 sm:py-4"
                    >
                      <div>
                        <p className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-red-400 mb-0.5">You save</p>
                        <p className="text-xl sm:text-2xl font-black text-red-600">UGX {fmt(parseInt(modal.anchoring) - modal.price)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-400 line-through">UGX {fmt(modal.anchoring)}</p>
                        <p className="text-base sm:text-lg font-black text-gray-800">UGX {fmt(modal.price)}</p>
                      </div>
                    </motion.div>

                  </div>
                </div>

                {/* ── Fixed CTA bar at bottom ── */}
                <div className="flex-shrink-0 border-t border-gray-100 bg-white px-6 py-5 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
                  <div className="max-w-2xl mx-auto">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="flex gap-3"
                    >
                      <button
                        onClick={() => { addToCart(modal); setModal(null); setCartOpen(true); }}
                        className="flex-1 h-12 sm:h-14 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-black text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all duration-200 shadow-xl shadow-red-600/25 hover:shadow-red-600/35 hover:scale-[1.01]"
                      >
                        <ShoppingBasket size={19} />
                        Add to cart · UGX {fmt(modal.price)}
                      </button>

                      <button
                        onClick={() => toggleLike(modal.id)}
                        aria-label={liked.has(modal.id) ? "Unlike" : "Save"}
                        className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center border-2 transition-all duration-200 ${liked.has(modal.id)
                          ? "bg-red-600 border-red-600 shadow-lg shadow-red-500/30"
                          : "bg-white border-gray-200 hover:border-red-300"
                          }`}
                      >
                        <Heart size={19} className={liked.has(modal.id) ? "fill-white text-white" : "text-gray-500"} />
                      </button>
                    </motion.div>
                  </div>
                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Cart drawer ── */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              key="cart-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              className="fixed inset-0 bg-black/30 z-[70]"
            />

            <motion.div
              key="cart-drawer"
              variants={drawerVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white border-l border-gray-100 z-[80] flex flex-col shadow-2xl"
            >
              {/* Drawer header */}
              <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black">Your cart</h2>
                  <p className="text-gray-400 text-sm mt-0.5">{cart.length} item{cart.length !== 1 ? "s" : ""}</p>
                </div>
                <button
                  onClick={() => setCartOpen(false)}
                  aria-label="Close cart"
                  className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Cart items */}
              <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-400 pb-20">
                    <ShoppingBag size={48} className="mb-4 opacity-30" />
                    <p className="font-bold">Your cart is empty</p>
                    <p className="text-sm mt-1">Add something delicious</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.cartId} className="flex items-center gap-4 bg-gray-50 border border-gray-100 rounded-2xl p-3">
                      <div className="w-16 h-16 rounded-xl bg-white border border-gray-100 flex items-center justify-center shrink-0">
                        <img src={item.image} alt={item.name} className="w-12 h-12 object-contain" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm truncate">{item.name}</p>
                        <p className="text-red-600 font-black text-sm mt-0.5">UGX {fmt(item.price)}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.cartId)}
                        aria-label="Remove item"
                        className="w-9 h-9 rounded-xl bg-red-50 hover:bg-red-100 flex items-center justify-center transition-colors shrink-0"
                      >
                        <Minus size={14} className="text-red-600" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Drawer footer */}
              {cart.length > 0 && (
                <div className="px-5 py-5 border-t border-gray-100">
                  <div className="bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 mb-4 flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">Total</p>
                      <p className="text-2xl font-black text-red-600 mt-0.5">UGX {fmt(total)}</p>
                    </div>
                    <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-bold">
                      <Truck size={14} />
                      Free delivery
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      const lines = cart.map((i) => `• ${i.name} — UGX ${fmt(i.price)}`).join("\n");
                      const msg = `Hello GREENBites! I'd like to order:\n\n${lines}\n\nTotal: UGX ${fmt(total)}`;
                      window.open(`https://wa.me/2567XXXXXXXX?text=${encodeURIComponent(msg)}`, "_blank");
                    }}
                    className="w-full h-14 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-black flex items-center justify-center gap-2 transition-all duration-200 shadow-lg shadow-red-600/20"
                  >
                    Checkout via WhatsApp
                    <ArrowRight size={18} />
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OrderingComponent;