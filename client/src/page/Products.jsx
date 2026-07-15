import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart, Star, Clock, Truck, ShieldCheck, Flame, Leaf,
  Minus, X, ShoppingBasket, ShoppingBag,
  ArrowRight, ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";

// ─── Import Cart Context ──────────────────────────────────────────────────────
import { useCart } from "../components/cart/CartContext.jsx";

// ASSETS
import Pizza from "../assets/pizza(17).png";
import FreshPork from "../assets/freshporke.png";
import Porkies from "../assets/PremiumPlate.png";
import PorkStake from "../assets/ChatGPT Image Jun 18, 2026, 03_34_25 PM.png";
import Burger from "../assets/Burger.png";
import Chicken from "../assets/pngwing.com (25).png";

// ─── CONFIGURATION ───────────────────────────────────────────────────────────
const WHATSAPP_NUMBER = "256776464823";
const BRAND_NAME = "GreenPork";


// ─── HELPERS ──────────────────────────────────────────────────────────────────
const pct = (price, anchoring) => {
  const anchorNum = parseInt(anchoring, 10);
  if (!anchorNum || anchorNum <= price) return 0;
  return Math.round((1 - price / anchorNum) * 100);
};

const fmt = (n) => Number(n).toLocaleString();

// ─── BRAND PALETTE CONSTANTS ──────────────────────────────────────────────────
const CATEGORIES = [
  { key: "all", label: "All Items" },
  { key: "pork", label: "Premium Pork" },
  { key: "chicken", label: "Crispy Chicken" },
  { key: "burgers", label: "Gourmet Burgers" },
  { key: "pizza", label: "Classic Pizza" },
];

const ITEMS = [
  { id: 1, image: Burger, category: "burgers", anchoring: "8000", name: "Beef Burger", price: 6000, description: "Juicy grilled beef patty with fresh lettuce, cheese and creamy sauce.", rating: 4.8, cookTime: "15–20 min", tag: "Popular" },
  { id: 2, image: Porkies, category: "pork", anchoring: "18000", name: "Premium Pork skewer", price: 15000, description: "Roasted pork with fried cassava, salad, chapati, and bananas.", rating: 4.4, cookTime: "30–35 min", tag: "Best Seller" },
  { id: 3, image: PorkStake, category: "pork-skewer", anchoring: "9000", name: "Roasted Pork", price: 6000, description: "Roasted crispy premium pork with fried cassava, salad and chapati.", rating: 4.9, cookTime: "30–35 min", tag: "Best Seller" },
  { id: 4, image: Chicken, category: "chicken", anchoring: "78000", name: "Crispy Chicken", price: 55000, description: "Golden crispy chicken with a fiery spice blend.", rating: 4.6, cookTime: "20–25 min", tag: "Spicy" },
  { id: 5, image: Pizza, category: "pizza", anchoring: "18000", name: "Chicken Pizza", price: 15000, description: "Hand-tossed dough with premium chicken and mozzarella.", rating: 4.7, cookTime: "40–45 min", tag: "New" },
  { id: 6, image: Chicken, category: "chicken", anchoring: "55000", name: "Whole Chicken", price: 45000, description: "Farm-fresh whole chicken, marinated and roasted.", rating: 4.7, cookTime: "35–40 min", tag: null },
  { id: 7, image: FreshPork, category: "pork", anchoring: "20000", name: "Fresh Pork Cuts", price: 16000, description: "Premium farm-fresh pork, hygienically prepared.", rating: 4.5, cookTime: "—", tag: "Organic" },
];

const TAG_STYLES = {
  Popular: "bg-amber-100 text-amber-800",
  "Best Seller": "bg-red-50 text-red-600",
  Spicy: "bg-orange-50 text-orange-600",
  New: "bg-stone-100 text-stone-700",
  Organic: "bg-stone-50 text-stone-600",
};

// ─── ATOMIC SUB-COMPONENTS ────────────────────────────────────────────────────
const Tag = ({ label }) =>
  label ? (
    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${TAG_STYLES[label]}`}>
      {label}
    </span>
  ) : null;

const Stars = ({ rating }) => (
  <div className="flex items-center gap-1" role="img" aria-label={`Rated ${rating} out of 5`}>
    <Star size={11} className="text-yellow-400 fill-yellow-400" />
    <span className="text-xs font-bold text-stone-700">{rating}</span>
  </div>
);

// ─── MOTION ANIMATIONS ───────────────────────────────────────────────────────
const cardVariants = {
  hidden: { opacity: 0, y: 16 },
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

// ─── MAIN PRODUCTS COMPONENT ─────────────────────────────────────────────────
const Products = () => {
  const {
    cartItems,
    addToCart,
    decreaseQuantity,
    totalItems,
    subtotal,
    shipping,
    tax,
    total
  } = useCart();

  const [activeCategory, setActiveCategory] = useState("all");
  const [liked, setLiked] = useState(new Set());
  const [cartOpen, setCartOpen] = useState(false);
  const [modal, setModal] = useState(null);

  const filtered = useMemo(
    () => (activeCategory === "all" ? ITEMS : ITEMS.filter((i) => i.category === activeCategory)),
    [activeCategory]
  );

  // Spotlight Item - First product of the current active selection
  const spotlightItem = useMemo(() => filtered[0], [filtered]);
  const standardItems = useMemo(() => filtered.slice(1), [filtered]);

  const toggleLike = (id) => {
    setLiked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const cartCountMap = useMemo(
    () =>
      cartItems.reduce((acc, item) => {
        acc[item.id] = item.quantity;
        return acc;
      }, {}),
    [cartItems]
  );

  const checkoutHref = useMemo(() => {
    if (cartItems.length === 0) return null;

    const lines = cartItems
      .map((i) => `• ${i.name} (x${i.quantity}) — UGX ${fmt(i.price * i.quantity)}`)
      .join("\n");

    const deliveryText = shipping === 0 ? "Free" : `UGX ${fmt(shipping)}`;
    const message = `Hello GreenPork! I'd like to order:\n\n${lines}\n\nSubtotal: UGX ${fmt(subtotal)}\nTax (18%): UGX ${fmt(tax)}\nDelivery: ${deliveryText}\n\nTotal: UGX ${fmt(total)}`;

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }, [cartItems, subtotal, tax, shipping, total]);

  return (
    <div className="min-h-screen bg-white text-stone-900 pb-20">

      {/* ── STICKY CONTROL DOCK (Header & Category Dock) ── */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 pt-6 pb-4 flex items-center justify-between gap-6">

          {/* Brand & Page Mark */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-red-600 flex items-center justify-center shrink-0 shadow-lg shadow-red-600/15">
              <Leaf size={18} className="text-white" aria-hidden="true" />
            </div>
            <div>
              <p className="text-[10px] font-extrabold tracking-[0.25em] uppercase text-red-600 leading-none mb-1">
                {BRAND_NAME}
              </p>
              <h1 className="text-xl md:text-2xl font-black leading-tight text-stone-900">
                Menu Collection
              </h1>
            </div>
          </div>

          {/* Cart Icon & Item Count */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCartOpen(true)}
              aria-label="Open your cart"
              className="relative w-11 h-11 rounded-2xl bg-stone-50 hover:bg-stone-100 flex items-center justify-center text-stone-900 transition-colors"
            >
              <ShoppingBasket size={18} />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Minimalist Borderless Category Track */}
        <div className="max-w-7xl mx-auto px-6 pb-6 flex gap-2.5 overflow-x-auto scrollbar-none" role="tablist">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 ${isActive
                  ? "bg-stone-900 text-white shadow-lg shadow-stone-900/10"
                  : "bg-stone-50 text-stone-500 hover:text-stone-900 hover:bg-stone-100/80"
                  }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── GRID SYSTEM (Spotlight + Standard Grid) ── */}
      <div className="max-w-7xl mx-auto px-6 py-6">

        {/* SpotLight Block: Prominent Unique Card Layout */}
        {spotlightItem && (
          <div
            onClick={() => setModal(spotlightItem)}
            className="group relative bg-stone-900 text-white rounded-[2.5rem] p-8 md:p-12 mb-8 grid md:grid-cols-2 gap-8 items-center cursor-pointer overflow-hidden shadow-2xl shadow-stone-900/10 hover:-translate-y-1 transition-all duration-500"
          >
            {/* Soft Ambient Blurs */}
            <div className="absolute -top-16 -right-16 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-12 w-80 h-80 bg-yellow-400/5 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-4 md:space-y-6 relative z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-600 text-white rounded-full text-[9px] font-bold uppercase tracking-widest">
                Chef's Spotlight
              </span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
                {spotlightItem.name}
              </h2>
              <p className="text-stone-300 text-sm md:text-base leading-relaxed max-w-md">
                {spotlightItem.description}
              </p>

              <div className="flex flex-wrap items-center gap-6 pt-2">
                <div>
                  <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">Starting From</p>
                  <p className="text-2xl font-black text-yellow-400 mt-1">UGX {fmt(spotlightItem.price)}</p>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); addToCart(spotlightItem); }}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold text-sm px-7 py-3.5 rounded-2xl shadow-xl shadow-red-600/25 transition-colors"
                >
                  Add to Order
                </button>
              </div>
            </div>

            <div className="relative flex justify-center items-center h-56 sm:h-72">
              <img
                src={spotlightItem.image}
                alt={spotlightItem.name}
                className="w-full max-w-[240px] sm:max-w-[280px] h-auto object-contain z-10 group-hover:scale-105 transition-transform duration-700 ease-out"
                style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.5))" }}
              />
            </div>
          </div>
        )}

        {/* Standard Grid of remaining items */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.05 } } }}
        >
          {standardItems.map((item) => (
            <motion.div
              key={item.id}
              variants={cardVariants}
              onClick={() => setModal(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setModal(item)}
              className="group bg-white rounded-[2rem] overflow-hidden shadow-xl shadow-stone-100/50 hover:-translate-y-1 hover:shadow-2xl hover:shadow-stone-200/40 transition-all duration-300 cursor-pointer"
            >
              {/* Product Image Frame */}
              <div className="relative h-48 flex items-center justify-center bg-stone-50/40 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-36 h-36 object-contain group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Savings tag */}
                {pct(item.price, item.anchoring) > 0 && (
                  <div className="absolute top-4 left-4 bg-stone-900 text-yellow-400 px-2.5 py-1 rounded-full text-[10px] font-black">
                    -{pct(item.price, item.anchoring)}%
                  </div>
                )}

                {/* Like Trigger */}
                <button
                  onClick={(e) => { e.stopPropagation(); toggleLike(item.id); }}
                  className={`absolute top-4 right-4 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 ${liked.has(item.id) ? "bg-red-600 text-white shadow-md" : "bg-white/80 backdrop-blur-sm text-stone-400 hover:text-red-600"
                    }`}
                >
                  <Heart size={15} className={liked.has(item.id) ? "fill-white" : ""} />
                </button>
              </div>

              {/* Product Info */}
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <Tag label={item.tag} />
                  <Stars rating={item.rating} />
                </div>

                <h3 className="font-extrabold text-base tracking-tight mb-1 text-stone-900 line-clamp-1">{item.name}</h3>
                <p className="text-stone-400 text-xs leading-relaxed mb-4 line-clamp-2">{item.description}</p>

                <div className="flex items-center justify-between pt-1">
                  <div>
                    {pct(item.price, item.anchoring) > 0 && (
                      <p className="text-stone-400 line-through text-[10px]">UGX {fmt(item.anchoring)}</p>
                    )}
                    <p className="text-red-600 font-extrabold text-sm md:text-base">UGX {fmt(item.price)}</p>
                  </div>

                  <button
                    onClick={(e) => { e.stopPropagation(); addToCart(item); }}
                    className="relative w-11 h-11 rounded-xl bg-stone-900 hover:bg-stone-800 text-white flex items-center justify-center shadow-lg transition-colors"
                  >
                    <ShoppingBasket size={16} />
                    {cartCountMap[item.id] > 0 && (
                      <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-red-600 text-white text-[9px] font-bold flex items-center justify-center">
                        {cartCountMap[item.id]}
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-stone-400">
            <ShoppingBag size={48} className="mb-4 opacity-25" aria-hidden="true" />
            <p className="font-bold text-lg">Nothing here yet</p>
            <p className="text-sm mt-1">Try a different category</p>
          </div>
        )}
      </div>

      {/* ── EDITORIAL PRODUCT DETAILS MODAL ── */}
      <AnimatePresence>
        {modal && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModal(null)}
              className="fixed inset-0 bg-stone-950/40 backdrop-blur-md z-50"
            />

            <motion.div
              key="modal"
              variants={modalVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              role="dialog"
              className="fixed inset-0 z-[60] flex flex-col md:flex-row bg-white overflow-hidden"
            >
              {/* Left Column: Visual Canvas */}
              <div className="relative h-[38vh] min-h-[260px] md:h-auto flex-shrink-0 md:flex-1 flex items-center justify-center bg-stone-900 overflow-hidden">

                {/* Background Blobs */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-yellow-400/5 rounded-full blur-3xl pointer-events-none" />

                <div className="absolute top-5 left-5 flex items-center justify-between w-[90%] z-10">
                  <button
                    onClick={() => setModal(null)}
                    className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-all"
                  >
                    <ArrowLeft size={18} />
                  </button>

                  <div className="flex items-center gap-2">
                    {modal.tag && <Tag label={modal.tag} />}
                    <button
                      onClick={() => toggleLike(modal.id)}
                      className={`w-10 h-10 rounded-xl backdrop-blur-sm flex items-center justify-center transition-colors duration-200 ${liked.has(modal.id) ? "bg-red-600 text-white shadow-lg" : "bg-white/10 hover:bg-white/20 text-white"
                        }`}
                    >
                      <Heart size={16} className={liked.has(modal.id) ? "fill-white" : ""} />
                    </button>
                  </div>
                </div>

                <div className="relative flex items-center justify-center p-6 h-full w-full">
                  <motion.img
                    key={modal.id}
                    initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 220, damping: 20 }}
                    src={modal.image}
                    alt={modal.name}
                    className="w-full max-w-[200px] sm:max-w-[260px] md:max-w-[400px] h-auto max-h-[85%] object-contain"
                    style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.5))" }}
                  />
                </div>
              </div>

              {/* Right Column: Detailed Info Panel */}
              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="flex-1 overflow-y-auto px-6 py-8">
                  <div className="max-w-xl mx-auto space-y-6">

                    <div>
                      <Stars rating={modal.rating} />
                      <h2 className="text-3xl md:text-4xl font-extrabold text-stone-900 tracking-tight mt-3 mb-2">{modal.name}</h2>

                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-black text-red-600">UGX {fmt(modal.price)}</span>
                        {pct(modal.price, modal.anchoring) > 0 && (
                          <>
                            <span className="text-xs text-stone-400 line-through font-semibold">UGX {fmt(modal.anchoring)}</span>
                            <span className="bg-red-50 text-red-600 text-[10px] font-bold px-2.5 py-1 rounded-full">
                              -{pct(modal.price, modal.anchoring)}% Off
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">About this selection</p>
                      <p className="text-stone-500 leading-relaxed text-sm md:text-base">{modal.description}</p>
                    </div>

                    <div className="grid grid-cols-3 gap-3 pt-2">
                      {[
                        { Icon: Clock, label: "Prep time", value: modal.cookTime, color: "text-red-600", bg: "bg-red-50/50" },
                        { Icon: Truck, label: "Delivery", value: shipping === 0 ? "Free" : `UGX ${fmt(shipping)}`, color: "text-orange-600", bg: "bg-orange-50/50" },
                        { Icon: ShieldCheck, label: "Quality", value: "Premium", color: "text-red-600", bg: "bg-red-50/50" },
                      ].map(({ Icon, label, value, color, bg }) => (
                        <div key={label} className={`flex flex-col items-center gap-1.5 rounded-[1.25rem] ${bg} py-3.5 px-3 text-center`}>
                          <Icon size={16} className={color} aria-hidden="true" />
                          <div>
                            <p className="text-[9px] font-bold uppercase tracking-wide text-stone-400">{label}</p>
                            <p className="text-xs font-extrabold text-stone-800 mt-0.5">{value}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {pct(modal.price, modal.anchoring) > 0 && (
                      <div className="bg-stone-50/70 rounded-2xl p-5 flex items-center justify-between">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-0.5">Total Savings</p>
                          <p className="text-2xl font-black text-red-600">UGX {fmt(parseInt(modal.anchoring, 10) - modal.price)}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-stone-400 line-through">UGX {fmt(modal.anchoring)}</p>
                          <p className="text-sm font-extrabold text-stone-800">UGX {fmt(modal.price)}</p>
                        </div>
                      </div>
                    )}

                  </div>
                </div>

                {/* Fixed CTA Footer Bar */}
                <div className="p-6 bg-white border-t border-stone-50">
                  <div className="max-w-xl mx-auto flex gap-4">
                    <button
                      onClick={() => { addToCart(modal); setModal(null); setCartOpen(true); }}
                      className="flex-1 h-14 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-xl shadow-red-600/20 hover:scale-[1.01]"
                    >
                      <ShoppingBasket size={18} />
                      Add to order · UGX {fmt(modal.price)}
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── CART DRAWER (Modern Floating Capsule Sheet) ── */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              key="cart-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              className="fixed inset-0 bg-stone-950/20 z-[70]"
            />

            <motion.div
              key="cart-drawer"
              variants={drawerVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              role="dialog"
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[80] flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.15)] rounded-l-[2.5rem]"
            >
              {/* Drawer header */}
              <div className="px-6 py-6 border-b border-stone-50 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black text-stone-900">Your Order</h2>
                  <p className="text-stone-400 text-xs mt-1">{totalItems} item{totalItems !== 1 ? "s" : ""} selected</p>
                </div>
                <button
                  onClick={() => setCartOpen(false)}
                  className="w-10 h-10 rounded-xl bg-stone-50 flex items-center justify-center hover:bg-stone-100 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Cart Items List */}
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                {cartItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-stone-400 pb-16">
                    <ShoppingBag size={44} className="mb-4 opacity-20" />
                    <p className="font-extrabold text-stone-900">Your cart is empty</p>
                    <p className="text-xs mt-1">Add items from the menu to start</p>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 bg-stone-50/70 rounded-2xl p-4">
                      <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center shrink-0">
                        <img src={item.image} alt="" className="w-10 h-10 object-contain" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-extrabold text-sm truncate text-stone-900">{item.name}</p>
                        <p className="text-red-600 font-extrabold text-sm mt-0.5">UGX {fmt(item.price)}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] text-stone-500 font-bold bg-white px-2.5 py-1 rounded-lg">
                          x{item.quantity}
                        </span>
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          className="w-8 h-8 rounded-lg bg-red-50 hover:bg-red-100 flex items-center justify-center transition-colors"
                        >
                          <Minus size={12} className="text-red-600" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Drawer checkout panel */}
              {cartItems.length > 0 && (
                <div className="px-6 py-6 bg-stone-50/60 rounded-tl-[2rem]">
                  <div className="space-y-2 mb-6 text-xs text-stone-500">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-bold text-stone-900">UGX {fmt(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax (18%)</span>
                      <span className="font-bold text-stone-900">UGX {fmt(tax)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Delivery dispatch</span>
                      <span className={`font-bold ${shipping === 0 ? "text-green-600" : "text-stone-900"}`}>
                        {shipping === 0 ? "Free" : `UGX ${fmt(shipping)}`}
                      </span>
                    </div>

                    <div className="h-px bg-stone-200/60 my-4" />

                    <div className="flex justify-between items-end">
                      <p className="text-stone-900 font-bold text-sm">Grand Total</p>
                      <p className="text-2xl font-black text-red-600">UGX {fmt(total)}</p>
                    </div>
                  </div>

                  <a
                    href={checkoutHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-14 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-extrabold flex items-center justify-center gap-2 transition-all shadow-xl shadow-red-600/20"
                  >
                    Checkout via WhatsApp
                    <ArrowRight size={18} />
                  </a>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Products;