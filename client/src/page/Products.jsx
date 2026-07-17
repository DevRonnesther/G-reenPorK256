import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart, Star, Clock, Truck, ShieldCheck, Leaf,
  Minus, X, ShoppingBasket, ShoppingBag,
  ArrowRight, ArrowLeft,
} from "lucide-react";

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

// ─── BRAND DATA ────────────────────────────────────────────────────────────
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
  "Best Seller": "bg-yellow-100 text-yellow-800",
  Spicy: "bg-orange-100 text-orange-800",
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

/** Section eyebrow — mirrors the Hero's dot + tracking-[0.2em] label + line. */
const Eyebrow = ({ children }) => (
  <div className="flex items-center gap-2">
    <span className="h-2 w-2 rounded-full bg-[#0edb0e]" aria-hidden="true" />
    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-stone-500">{children}</span>
    <span className="h-px w-10 bg-stone-300" aria-hidden="true" />
  </div>
);

/** Stat chip — same white/border-stone-200/green-icon pattern as the Hero's FEATURES row. */
const StatChip = ({ Icon, label, value }) => (
  <div className="flex flex-col items-center gap-1.5 rounded-2xl border border-stone-100 bg-white py-3.5 px-3 text-center">
    <span className="h-9 w-9 rounded-full bg-white border border-stone-200 flex items-center justify-center text-[#0edb0e]">
      <Icon size={15} aria-hidden="true" />
    </span>
    <div>
      <p className="text-[9px] font-bold uppercase tracking-wide text-stone-400">{label}</p>
      <p className="text-xs font-extrabold text-stone-900 mt-0.5">{value}</p>
    </div>
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
            <div className="w-10 h-10 rounded-2xl bg-yellow-400 flex items-center justify-center shrink-0 shadow-lg shadow-yellow-400/20">
              <Leaf size={18} className="text-stone-950" aria-hidden="true" />
            </div>
            <div>
              <Eyebrow>{BRAND_NAME}</Eyebrow>
              <h1 className="text-xl md:text-2xl font-black leading-tight text-stone-900 mt-1">
                Menu Collection
              </h1>
            </div>
          </div>

          {/* Cart Icon & Item Count (Hidden on desktop screens since the live side-cart is visible) */}
          <button
            onClick={() => setCartOpen(true)}
            aria-label="Open your cart"
            className="relative h-11 w-11 rounded-full bg-stone-50 flex items-center justify-center text-stone-900 hover:bg-stone-100 transition-colors lg:hidden"
          >
            <ShoppingBasket size={18} />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#0edb0e] text-stone-950 text-[10px] font-black flex items-center justify-center shadow-md">
                {totalItems}
              </span>
            )}
          </button>
        </div>

        {/* Category pills — wrapped layout to completely eliminate horizontal scrolling */}
        <div className="max-w-7xl mx-auto px-6 pb-6 flex flex-wrap gap-2" role="tablist">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-4 py-2 rounded-full text-[11px] sm:text-xs font-black uppercase tracking-wide transition-colors duration-200 ${isActive
                    ? "bg-[#0edb0e] text-stone-950"
                    : "bg-stone-50 text-stone-500 hover:text-stone-900 hover:bg-stone-100"
                  }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── GRID SYSTEM (Split Double Layout: Menu on Left, Sticky Live Cart on Right) ── */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-start">

          {/* LEFT COLUMN: Spotlight + Standard Product Grid (lg:col-span-8) */}
          <div className="lg:col-span-8 space-y-8">

            {/* SpotLight Block: Prominent Unique Card Layout */}
            {spotlightItem && (
              <div
                onClick={() => setModal(spotlightItem)}
                className="group relative bg-stone-950 text-white rounded-3xl md:rounded-[2.5rem] p-5 sm:p-8 md:p-12 mb-8 grid grid-cols-12 gap-4 md:gap-8 items-center cursor-pointer overflow-hidden shadow-2xl shadow-stone-950/10 hover:-translate-y-1 transition-all duration-500"
              >
                {/* Soft Ambient Blurs (Green Accent) */}
                <div className="absolute -top-16 -right-16 w-48 h-44 md:w-80 md:h-80 bg-[#0edb0e]/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-12 w-48 h-44 md:w-80 md:h-80 bg-[#0edb0e]/5 rounded-full blur-3xl pointer-events-none" />

                {/* Left Side: Details (Spans 7 of 12 columns on mobile, 6 on desktop) */}
                <div className="col-span-7 md:col-span-6 space-y-2 md:space-y-6 relative z-10">
                  <span className="inline-flex items-center gap-1.5 px-2 md:px-3 py-0.5 md:py-1 bg-[#0edb0e]/15 text-[#0edb0e] rounded-full text-[8px] md:text-[9px] font-bold uppercase tracking-widest backdrop-blur-sm">
                    Chef's Spotlight
                  </span>
                  <h2 className="text-base xs:text-lg sm:text-2xl md:text-5xl font-black tracking-tight leading-tight">
                    {spotlightItem.name}
                  </h2>

                  {/* Description hidden on mobile to dramatically save vertical space */}
                  <p className="hidden sm:block text-white/70 text-xs sm:text-sm md:text-base leading-relaxed max-w-md font-medium">
                    {spotlightItem.description}
                  </p>

                  <div className="flex flex-col xs:flex-row xs:items-center gap-2 xs:gap-4 md:gap-6 pt-1 md:pt-2">
                    <div>
                      <p className="text-[8px] md:text-[10px] text-white/50 font-bold uppercase tracking-wider">Starting From</p>
                      <p className="text-sm xs:text-base md:text-2xl font-black text-[#0edb0e] mt-0.5 md:mt-1">
                        UGX {fmt(spotlightItem.price)}
                      </p>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); addToCart(spotlightItem); }}
                      className="inline-flex items-center gap-1.5 bg-[#0edb0e] hover:bg-[#0bc50b] text-white font-bold text-[10px] md:text-sm px-3 md:px-4 py-1.5 md:py-3 rounded-full transition-colors uppercase tracking-wide w-fit"
                    >
                      <span className="bg-white rounded-full p-1 text-[#0edb0e] hidden xs:inline-block">
                        <ShoppingBasket size={12} />
                      </span>
                      Add
                    </button>
                  </div>
                </div>

                {/* Right Side: Visual Container (Spans 5 of 12 columns on mobile, 6 on desktop) */}
                <div className="col-span-5 md:col-span-6 relative flex justify-center items-center h-28 xs:h-36 sm:h-48 md:h-72">
                  <img
                    src={spotlightItem.image}
                    alt={spotlightItem.name}
                    className="w-full max-w-[85px] xs:max-w-[110px] sm:max-w-[180px] md:max-w-[280px] h-auto object-contain z-10 group-hover:scale-105 transition-transform duration-700 ease-out"
                    style={{ filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.45))" }}
                  />
                </div>
              </div>
            )}

            {/* Standard Grid of remaining items */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6"
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
                  className="group bg-white rounded-3xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                >
                  {/* Product Image Frame */}
                  <div className="relative h-48 flex items-center justify-center bg-stone-50/50 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-36 h-36 object-contain group-hover:scale-105 transition-transform duration-700 ease-out"
                    />

                    {/* Savings tag */}
                    {pct(item.price, item.anchoring) > 0 && (
                      <div className="absolute top-4 left-4 bg-stone-950 text-[#0edb0e] px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                        -{pct(item.price, item.anchoring)}%
                      </div>
                    )}

                    {/* Like Trigger — border removed, using elegant shadow projection */}
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleLike(item.id); }}
                      aria-label={liked.has(item.id) ? "Remove from favorites" : "Add to favorites"}
                      className={`absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm hover:scale-105 active:scale-95 ${liked.has(item.id)
                          ? "bg-[#0edb0e] text-stone-950"
                          : "bg-white/95 text-stone-400 hover:text-[#0edb0e]"
                        }`}
                    >
                      <Heart size={15} className={liked.has(item.id) ? "fill-stone-950 text-stone-950" : ""} />
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
                          <p className="text-red-500 line-through text-[10px]">UGX {fmt(item.anchoring)}</p>
                        )}
                        <p className="text-[#0edb0e] font-extrabold text-sm md:text-base">UGX {fmt(item.price)}</p>
                      </div>

                      <button
                        onClick={(e) => { e.stopPropagation(); addToCart(item); }}
                        aria-label={`Add ${item.name} to cart`}
                        className="relative w-11 h-11 rounded-full bg-[#0edb0e] hover:bg-[#0bc50b] text-white flex items-center justify-center transition-colors"
                      >
                        <ShoppingBasket size={16} />
                        {cartCountMap[item.id] > 0 && (
                          <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-stone-950 text-[#0edb0e] text-[9px] font-black flex items-center justify-center shadow-md">
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

          {/* RIGHT COLUMN: Sticky Live Sidebar Cart Panel (lg:col-span-4) — Hidden on Mobile */}
          <aside className="hidden lg:block lg:col-span-4 lg:sticky lg:top-36 bg-stone-50/70 border border-stone-100 rounded-3xl p-6 space-y-6">
            <div>
              <h2 className="text-lg font-black text-stone-900">Your Order</h2>
              <p className="text-stone-400 text-xs mt-1">{totalItems} item{totalItems !== 1 ? "s" : ""} selected</p>
            </div>

            {/* Live Cart Items list */}
            <div className="space-y-4 max-h-[35vh] overflow-y-auto pr-1 scrollbar-thin">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-stone-400 text-center">
                  <ShoppingBag size={32} className="mb-3 opacity-20" />
                  <p className="font-extrabold text-stone-900 text-xs">Your cart is empty</p>
                  <p className="text-[11px] mt-0.5">Add premium cuts to begin</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={`side-${item.id}`} className="flex items-center gap-3 bg-white border border-stone-100 rounded-2xl p-3">
                    <div className="w-10 h-10 rounded-xl bg-stone-50 flex items-center justify-center shrink-0 p-1">
                      <img src={item.image} alt="" className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-extrabold text-xs truncate text-stone-900">{item.name}</p>
                      <p className="text-[#0edb0e] font-extrabold text-xs mt-0.5">UGX {fmt(item.price)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-stone-500 font-bold bg-stone-50 px-2 py-0.5 rounded-md border border-stone-100">
                        x{item.quantity}
                      </span>
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        aria-label={`Decrease ${item.name} quantity`}
                        className="w-7 h-7 rounded-lg bg-stone-50 border border-stone-200 hover:bg-stone-100 flex items-center justify-center transition-colors"
                      >
                        <Minus size={10} className="text-stone-500" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Totals & WhatsApp Action */}
            {cartItems.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-stone-200/60">
                <div className="space-y-2 text-[11px] text-stone-500">
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
                    <span className={`font-bold ${shipping === 0 ? "text-[#0edb0e]" : "text-stone-900"}`}>
                      {shipping === 0 ? "Free" : `UGX ${fmt(shipping)}`}
                    </span>
                  </div>

                  <div className="h-px bg-stone-200/60 my-3" />

                  <div className="flex justify-between items-end">
                    <p className="text-stone-900 font-bold text-xs">Grand Total</p>
                    <p className="text-lg font-black text-[#0edb0e]">UGX {fmt(total)}</p>
                  </div>
                </div>

                <a
                  href={checkoutHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-11 rounded-full bg-[#0edb0e] hover:bg-[#0bc50b] text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors uppercase tracking-wide"
                >
                  Checkout via WhatsApp
                  <ArrowRight size={14} />
                </a>
              </div>
            )}
          </aside>

        </div>
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
        <div
          className="relative h-[38vh] bg-gradient-to-tr from-stone-50 to-[#0edb0e]/15 min-h-[260px] md:h-auto flex-shrink-0 md:flex-1 flex items-center justify-center overflow-hidden border-b md:border-b-0 md:border-r border-stone-100"
        >
          {/* Soft Organic Brand Glows */}
          <div className="absolute -top-16 -right-16 w-80 h-80 bg-[#0edb0e]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#0bc50b]/5 rounded-full blur-3xl pointer-events-none" />

          {/* Top Floating Controls */}
          <div className="absolute top-5 left-5 flex items-center justify-between w-[90%] z-10">
            <button
              onClick={() => setModal(null)}
              aria-label="Close details"
              className="w-10 h-10 rounded-full bg-stone-900/5 hover:bg-stone-900/10 backdrop-blur-sm flex items-center justify-center text-stone-900 transition-all active:scale-95"
            >
              <ArrowLeft size={18} />
            </button>

            <div className="flex items-center gap-2">
              {modal.tag && <Tag label={modal.tag} />}
              <button
                onClick={() => toggleLike(modal.id)}
                aria-label={liked.has(modal.id) ? "Remove from favorites" : "Add to favorites"}
                className={`w-10 h-10 rounded-full backdrop-blur-sm flex items-center justify-center transition-all duration-200 active:scale-95 ${
                  liked.has(modal.id) 
                    ? "bg-[#0edb0e] text-stone-950 shadow-lg shadow-[#0edb0e]/20" 
                    : "bg-stone-900/5 hover:bg-stone-900/10 text-stone-900"
                }`}
              >
                <Heart size={16} className={liked.has(modal.id) ? "fill-stone-950 text-stone-950" : ""} />
              </button>
            </div>
          </div>

          {/* Food Photography Container */}
          <div className="relative flex items-center justify-center p-6 h-full w-full select-none">
            <motion.img
              key={modal.id}
              initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
              src={modal.image}
              alt={modal.name}
              className="w-full max-w-[200px] sm:max-w-[260px] md:max-w-[380px] h-auto max-h-[85%] object-contain"
              style={{ filter: "drop-shadow(0 25px 45px rgba(0,0,0,0.15))" }}
            />
          </div>
        </div>

        {/* Right Column: Detailed Info Panel */}
        <div className="flex-1 flex flex-col overflow-hidden bg-white">
          <div className="flex-1 overflow-y-auto px-6 py-8 md:py-12">
            <div className="max-w-xl mx-auto space-y-8">

              {/* Title, rating, and prices */}
              <div className="space-y-4">
                <Stars rating={modal.rating} />
                <h2 className="text-3xl md:text-4xl font-black text-stone-900 tracking-tight leading-tight">{modal.name}</h2>

                <div className="flex items-center gap-3">
                  <span className="text-2xl font-black text-[#0edb0e]">UGX {fmt(modal.price)}</span>
                  {pct(modal.price, modal.anchoring) > 0 && (
                    <>
                      <span className="text-xs text-red-500 line-through font-semibold">UGX {fmt(modal.anchoring)}</span>
                      <span className="bg-[#0edb0e]/10 text-[#0bc50b] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                        -{pct(modal.price, modal.anchoring)}% Off
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">About this selection</p>
                <p className="text-stone-500 leading-relaxed text-sm md:text-base font-medium">{modal.description}</p>
              </div>

              {/* Stat Chips Grid */}
              <div className="grid grid-cols-3 gap-3">
                <StatChip Icon={Clock} label="Prep time" value={modal.cookTime} />
                <StatChip Icon={Truck} label="Delivery" value={shipping === 0 ? "Free" : `UGX ${fmt(shipping)}`} />
                <StatChip Icon={ShieldCheck} label="Quality" value="Premium" />
              </div>

              {/* Total Savings Card */}
              {pct(modal.price, modal.anchoring) > 0 && (
                <div className="bg-stone-50/70 border border-stone-100 rounded-2xl p-5 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-0.5">Total Savings</p>
                    <p className="text-2xl font-black text-[#0edb0e]">UGX {fmt(parseInt(modal.anchoring, 10) - modal.price)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-red-500 line-through font-semibold">UGX {fmt(modal.anchoring)}</p>
                    <p className="text-sm font-extrabold text-stone-800">UGX {fmt(modal.price)}</p>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Fixed CTA Footer Bar */}
          <div className="p-6 bg-white border-t border-stone-100">
            <div className="max-w-xl mx-auto flex gap-4">
              <button
                onClick={() => { addToCart(modal); setModal(null); setCartOpen(true); }}
                className="flex-1 h-14 rounded-full bg-[#0edb0e] hover:bg-[#0bc50b] text-white font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.99] uppercase tracking-wide shadow-lg shadow-[#0edb0e]/15"
              >
                <span className="bg-white rounded-full p-2 text-[#0edb0e]">
                  <ShoppingBasket size={15} />
                </span>
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
              <div className="px-6 py-6 border-b border-stone-100 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black text-stone-900">Your Order</h2>
                  <p className="text-stone-400 text-xs mt-1">{totalItems} item{totalItems !== 1 ? "s" : ""} selected</p>
                </div>
                <button
                  onClick={() => setCartOpen(false)}
                  aria-label="Close cart"
                  className="w-10 h-10 rounded-full border border-stone-200 bg-white flex items-center justify-center hover:bg-stone-50 transition-colors"
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
                      <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center shrink-0 border border-stone-100">
                        <img src={item.image} alt="" className="w-10 h-10 object-contain" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-extrabold text-sm truncate text-stone-900">{item.name}</p>
                        <p className="text-[#0edb0e] font-extrabold text-sm mt-0.5">UGX {fmt(item.price)}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] text-stone-500 font-bold bg-white px-2.5 py-1 rounded-lg">
                          x{item.quantity}
                        </span>
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          aria-label={`Decrease ${item.name} quantity`}
                          className="w-8 h-8 rounded-lg bg-white border border-stone-200 hover:bg-stone-100 flex items-center justify-center transition-colors"
                        >
                          <Minus size={12} className="text-stone-500" />
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
                      <span className={`font-bold ${shipping === 0 ? "text-[#0edb0e]" : "text-stone-900"}`}>
                        {shipping === 0 ? "Free" : `UGX ${fmt(shipping)}`}
                      </span>
                    </div>

                    <div className="h-px bg-stone-200/60 my-4" />

                    <div className="flex justify-between items-end">
                      <p className="text-stone-900 font-bold text-sm">Grand Total</p>
                      <p className="text-2xl font-black text-[#0edb0e]">UGX {fmt(total)}</p>
                    </div>
                  </div>

                  <a
                    href={checkoutHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-14 rounded-full bg-[#0edb0e] hover:bg-[#0bc50b] text-white font-bold flex items-center justify-center gap-2 transition-colors uppercase tracking-wide"
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