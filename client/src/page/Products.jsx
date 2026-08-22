import React, { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart, Star, Clock, Truck, ShieldCheck, Minus, Plus, X,
  ShoppingBasket, ShoppingBag, ArrowRight, ArrowLeft, Beef, Drumstick,
  Sandwich, Pizza as PizzaIcon, Trash2, ChevronDown, Check, Utensils, Flame,
  Sparkles, ChevronUp
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
const BRAND_NAME = "GreenPork";
const CTA_COLOR = "#D7FF00";

const fmt = (n) => Number(n).toLocaleString();
const pct = (price, anchoring) => {
  const a = parseInt(anchoring, 10);
  if (!a || a <= price) return 0;
  return Math.round((1 - price / a) * 100);
};

const FREE_DELIVERY_THRESHOLD = 50000;

const CATEGORIES = [
  { key: "all", label: "All Items", icon: Utensils },
  { key: "pork", label: "Premium Pork", icon: Beef },
  { key: "chicken", label: "Crispy Chicken", icon: Drumstick },
  { key: "burgers", label: "Gourmet Burgers", icon: Sandwich },
  { key: "pizza", label: "Classic Pizza", icon: PizzaIcon },
];

const ITEMS = [
  { id: 1, image: Burger, category: "burgers", anchoring: "8000", name: "Beef Burger", price: 6000, description: "Juicy grilled beef patty with fresh lettuce, cheese and creamy sauce.", rating: 4.8, cookTime: "15–20 min", tag: "Popular" },
  { id: 2, image: Porkies, category: "pork", anchoring: "18000", name: "Premium Pork Skewer", price: 15000, description: "Roasted pork with fried cassava, salad, chapati, and bananas.", rating: 4.4, cookTime: "30–35 min", tag: "Best Seller" },
  { id: 3, image: PorkStake, category: "pork", anchoring: "9000", name: "Roasted Pork", price: 6000, description: "Roasted crispy premium pork with fried cassava, salad and chapati.", rating: 4.9, cookTime: "30–35 min", tag: "Best Seller" },
  { id: 4, image: Chicken, category: "chicken", anchoring: "78000", name: "Crispy Chicken", price: 55000, description: "Golden crispy chicken with a fiery spice blend.", rating: 4.6, cookTime: "20–25 min", tag: "Spicy" },
  { id: 5, image: Pizza, category: "pizza", anchoring: "18000", name: "Chicken Pizza", price: 15000, description: "Hand-tossed dough with premium chicken and mozzarella.", rating: 4.7, cookTime: "40–45 min", tag: "New" },
  { id: 6, image: Chicken, category: "chicken", anchoring: "55000", name: "Whole Chicken", price: 45000, description: "Farm-fresh whole chicken, marinated and roasted.", rating: 4.7, cookTime: "35–40 min", tag: null },
  { id: 7, image: FreshPork, category: "pork", anchoring: "20000", name: "Fresh Pork Cuts", price: 16000, description: "Premium farm-fresh pork, hygienically prepared.", rating: 4.5, cookTime: "—", tag: "Organic" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 150, damping: 20 } },
};

const MagicCTA = ({ onClick, href, children, className = "" }) => {
  const Comp = href ? motion.a : motion.button;
  const props = href ? { href, target: "_blank", rel: "noopener noreferrer" } : { onClick };
  return (
    <Comp
      {...props}
      whileHover={{ scale: 1.02, backgroundColor: "#E4FF4D" }}
      whileTap={{ scale: 0.98 }}
      className={`group relative inline-flex items-center justify-center gap-3 font-display font-black text-sm uppercase tracking-wide py-4 px-6 text-black shadow-xl focus:outline-none ${className}`}
      style={{ backgroundColor: CTA_COLOR, clipPath: "polygon(0 0, 100% 0, 96% 100%, 0% 100%)" }}
    >
      {children}
    </Comp>
  );
};

const FontFace = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@500;700;900&family=Inter:wght@400;500;600;700;800&family=Fraunces:ital,wght@1,500;1,600&display=swap');
    .font-display { font-family: 'Archivo', sans-serif; letter-spacing: -0.04em; }
    .font-body { font-family: 'Inter', sans-serif; }
    .font-accent { font-family: 'Fraunces', serif; font-style: italic; }
    .custom-scroll::-webkit-scrollbar { width: 4px; }
    .custom-scroll::-webkit-scrollbar-thumb { background: #333; }
    .cart-scroll::-webkit-scrollbar { width: 3px; }
    .cart-scroll::-webkit-scrollbar-track { background: transparent; }
    .cart-scroll::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.08); border-radius: 10px; }
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    .shimmer-btn {
      background-size: 200% 100%;
      background-image: linear-gradient(110deg, #D4FF00 0%, #D4FF00 40%, #E8FF66 50%, #D4FF00 60%, #D4FF00 100%);
    }
    .shimmer-btn:hover {
      animation: shimmer 1.2s ease-in-out;
    }
  `}</style>
);

/* ═══════════════════════════════════════════════════════════
   FLOATING PILL CART — expands upward into a panel
   ═══════════════════════════════════════════════════════════ */

function FloatingPillCart({
  expanded,
  onToggle,
  cartItems, totalItems, subtotal, tax, shipping, total,
  addToCart, decreaseQuantity, removeFromCart
}) {
  const panelRef = useRef(null);
  const deliveryProgress = Math.min((subtotal / FREE_DELIVERY_THRESHOLD) * 100, 100);
  const deliveryRemaining = Math.max(FREE_DELIVERY_THRESHOLD - subtotal, 0);
  const freeDeliveryEarned = subtotal >= FREE_DELIVERY_THRESHOLD;

  // Close on outside click
  useEffect(() => {
    if (!expanded) return;
    const handler = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        onToggle();
      }
    };
    // Delay to prevent the pill click itself from closing it
    const timer = setTimeout(() => document.addEventListener("mousedown", handler), 0);
    return () => { clearTimeout(timer); document.removeEventListener("mousedown", handler); };
  }, [expanded, onToggle]);

  // ESC to close
  useEffect(() => {
    if (!expanded) return;
    const esc = (e) => { if (e.key === "Escape") onToggle(); };
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [expanded, onToggle]);

  const checkoutHref = useMemo(() => {
    if (cartItems.length === 0) return null;
    const lines = cartItems.map((i) => `• ${i.name} (x${i.quantity}) — UGX ${fmt(i.price * i.quantity)}`).join("\n");
    const message = `Hello ${BRAND_NAME}! I'd like to order:\n\n${lines}\n\nSubtotal: UGX ${fmt(subtotal)}\nTax: UGX ${fmt(tax)}\nDelivery: ${shipping === 0 ? "Free" : `UGX ${fmt(shipping)}`}\nTotal: UGX ${fmt(total)}`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }, [cartItems, subtotal, tax, shipping, total]);

  // Get the first item's image for the pill thumbnail
  const lastAddedImage = cartItems.length > 0 ? cartItems[cartItems.length - 1].image : null;

  return (
    <div
      ref={panelRef}
      className="fixed bottom-6 right-6 z-[90] flex flex-col items-end"
      style={{ width: expanded ? 420 : "auto", maxWidth: "calc(100vw - 48px)" }}
    >
      {/* ── EXPANDED PANEL ── */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            className="w-full rounded-t-[28px]/// rounded-b-none overflow-hidden origin-bottom-right mb-[-2px]"
            style={{
              background: "#D4FF00",
              boxShadow: "0 -8px 40px rgba(0,0,0,0.12), 0 -2px 12px rgba(212,255,0,0.15)"
            }}
          >
            {/* Panel header */}
            <div className="px-6 pt-5 pb-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center">
                  <ShoppingBag size={15} className="text-black" />
                </div>
                <div>
                  <h3 className="font-display font-black text-base tracking-tight text-black leading-none">Your Cart</h3>
                  {totalItems > 0 && (
                    <p className="text-[10px] font-semibold text-black/50 mt-0.5">{totalItems} item{totalItems !== 1 ? "s" : ""}</p>
                  )}
                </div>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); onToggle(); }}
                className="w-8 h-8 rounded-full// bg-black/10 hover:bg-black/20 flex items-center justify-center transition-colors text-black/60 hover:text-black"
              >
                <X size={14} strokeWidth={2.5} />
              </button>
            </div>

            {/* Free delivery progress */}
            {cartItems.length > 0 && (
              <div className="px-6 pb-3">
                {!freeDeliveryEarned ? (
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[9px] font-display font-bold uppercase tracking-widest text-black/40">
                        Free delivery
                      </span>
                      <span className="text-[9px] font-bold text-black/50 tabular-nums">
                        UGX {fmt(deliveryRemaining)} to go
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-black/10 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-black"
                        initial={{ width: 0 }}
                        animate={{ width: `${deliveryProgress}%` }}
                        transition={{ type: "spring", stiffness: 120, damping: 20 }}
                      />
                    </div>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-1.5 bg-black/8 rounded-lg px-3 py-1.5"
                  >
                    <Sparkles size={11} className="text-black/70" />
                    <span className="text-[10px] font-display font-bold text-black/70">Free delivery unlocked!</span>
                  </motion.div>
                )}
              </div>
            )}

            {/* Items list */}
            <div className="px-4">
              <div className="bg-white rounded-2xl/// overflow-hidden" style={{ boxShadow: "inset 0 2px 8px rgba(0,0,0,0.04)" }}>
                <div className="max-h-[280px] overflow-y-auto cart-scroll">
                  {!cartItems.length ? (
                    <div className="py-12 flex flex-col items-center justify-center text-center px-6">
                      <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mb-3">
                        <ShoppingBag size={24} className="text-gray-300" />
                      </div>
                      <p className="font-display font-bold text-sm text-gray-800">Cart is empty</p>
                      <p className="text-[11px] text-gray-400 mt-1">Add items from the menu</p>
                    </div>
                  ) : (
                    <AnimatePresence mode="popLayout">
                      {cartItems.map((item) => (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2, layout: { duration: 0.2 } }}
                          className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 last:border-0"
                        >
                          {/* Thumbnail */}
                          <div className="w-12 h-12 shrink-0 rounded-xl bg-gray-50 flex items-center justify-center p-1.5">
                            <img src={item.image} alt={item.name} className="h-full w-full object-contain" />
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-display font-bold text-[12px] leading-tight truncate text-gray-900">{item.name}</h4>
                            <div className="flex items-center justify-between mt-1.5">
                              {/* Qty controls */}
                              <div className="flex items-center rounded-lg bg-gray-100 overflow-hidden">
                                <button
                                  onClick={() => decreaseQuantity(item.id)}
                                  className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-black hover:bg-gray-200 transition-colors"
                                >
                                  <Minus size={10} />
                                </button>
                                <span className="w-7 text-center text-[11px] font-display font-bold tabular-nums text-gray-800">{item.quantity}</span>
                                <button
                                  onClick={() => addToCart({ id: item.id, name: item.name, price: item.price, image: item.image, category: item.category })}
                                  className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-black hover:bg-gray-200 transition-colors"
                                >
                                  <Plus size={10} />
                                </button>
                              </div>
                              {/* Price */}
                              <span className="font-display font-bold text-[12px] tabular-nums text-gray-900">
                                UGX {fmt(item.price * item.quantity)}
                              </span>
                            </div>
                          </div>

                          {/* Delete */}
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="shrink-0 p-1 text-gray-300 hover:text-red-500 transition-colors self-start mt-0.5"
                          >
                            <Trash2 size={12} />
                          </button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  )}
                </div>
              </div>
            </div>

            {/* Summary + Checkout */}
            {cartItems.length > 0 && (
              <div className="px-6 pt-4 pb-5 space-y-3">
                <div className="space-y-1.5 text-[11px] text-black/45 font-medium">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-bold text-black/70 tabular-nums">UGX {fmt(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (18%)</span>
                    <span className="font-bold text-black/70 tabular-nums">UGX {fmt(tax)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery</span>
                    {shipping === 0 ? (
                      <span className="font-bold tabular-nums text-black/70">Free</span>
                    ) : (
                      <span className="font-bold text-black/70 tabular-nums">UGX {fmt(shipping)}</span>
                    )}
                  </div>
                </div>
                <div className="flex items-end justify-between pt-2.5 border-t border-black/10">
                  <span className="font-display font-bold uppercase text-[10px] tracking-widest text-black/35">Total</span>
                  <span className="font-display font-black text-xl tracking-tight tabular-nums text-black leading-none">
                    UGX {fmt(total)}
                  </span>
                </div>
                <motion.a
                  href={checkoutHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  className="shimmer-btn/// bg-black flex items-center justify-center gap-2.5 w-full py-3.5 rounded-2xl/// font-display font-black text-[13px] uppercase tracking-wider text-white focus:outline-none"
                  // style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }}
                  style={{ clipPath: "polygon(0 0, 100% 0, 96% 100%, 0% 100%)" }}
                >
                  Proceed to Checkout <ArrowRight size={14} className="ml-0.5" />
                </motion.a>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── PILL BUTTON (always visible) ── */}
      <motion.button
        onClick={onToggle}
        whileHover={{ scale: 1.04, y: -2 }}
        whileTap={{ scale: 0.97 }}
        className="relative flex items-center gap-3 pl-2.5 pr-4 py-2 rounded-full// cursor-pointer select-none overflow-hidden"
        style={{
          backgroundColor: "#D4FF00",
          boxShadow: expanded
            ? "0 4px 20px rgba(212,255,0,0.3)"
            : "0 6px 28px rgba(212,255,0,0.35), 0 2px 8px rgba(0,0,0,0.08)"
        }}
        style={{ backgroundColor: CTA_COLOR, clipPath: "polygon(0 0, 100% 0, 96% 100%, 0% 100%)" }}
      >
        {/* Subtle inner glow */}
        <div
          className="absolute hidden inset-0 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 30% 50%, rgba(255,255,255,0.25) 0%, transparent 60%)"
          }}
        />

        {/* Product thumbnail — partially overlapping left edge */}
        {lastAddedImage && totalItems > 0 && (
          <motion.div
            layout
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
            className="relative z-10 w-11 h-11 rounded-full bg-white flex items-center justify-center p-1.5 shrink-0"
            style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
          >
            <img src={lastAddedImage} alt="" className="w-full h-full object-contain" />
          </motion.div>
        )}

        {/* Text content */}
        <div className="relative z-10 flex flex-col items-start">
          <span className="font-display font-black text-[13px] tracking-tight text-black leading-none">
            {totalItems > 0 ? "View Cart" : "Cart"}
          </span>
          {totalItems > 0 && (
            <motion.span
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[9px] font-semibold text-black/50 leading-none mt-0.5"
            >
              {totalItems} item{totalItems !== 1 ? "s" : ""} · UGX {fmt(total)}
            </motion.span>
          )}
        </div>

        {/* Right circle with icon + badge */}
        <div className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center shrink-0 ml-1"
          style={{ backgroundColor: "rgba(0,0,0,0.08)" }}
          
        >
          {expanded ? (
            <ChevronUp size={17} className="text-black" strokeWidth={2.5} />
          ) : (
            <ShoppingBag size={16} className="text-black" strokeWidth={2.5} />
          )}
          {totalItems > 0 && (
            <motion.span
              key={totalItems}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 20 }}
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-black text-white text-[9px] font-display font-black flex items-center justify-center"
              style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.2)" }}
            >
              {totalItems}
            </motion.span>
          )}
        </div>
      </motion.button>
    </div>
  );
}

/* ═══════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════ */

export default function Products() {
  const { cartItems, addToCart, decreaseQuantity, removeFromCart, totalItems, subtotal, shipping, tax, total } = useCart();
  const [activeCategory, setActiveCategory] = useState("all");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [liked, setLiked] = useState(new Set());
  const [cartExpanded, setCartExpanded] = useState(false);
  const [modal, setModal] = useState(null);
  const dropdownRef = useRef(null);

  // Auto-collapse cart when modal opens
  useEffect(() => {
    if (modal) setCartExpanded(false);
  }, [modal]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeCategoryObj = useMemo(() => CATEGORIES.find((c) => c.key === activeCategory) || CATEGORIES[0], [activeCategory]);
  const Watermark = activeCategoryObj.icon || Utensils;
  const filtered = useMemo(() => (activeCategory === "all" ? ITEMS : ITEMS.filter((i) => i.category === activeCategory)), [activeCategory]);
  const spotlightItem = filtered[0];
  const standardItems = filtered.slice(1);

  const toggleLike = useCallback((id) => {
    setLiked((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  }, []);

  const handleAddToCart = useCallback((item) => {
    addToCart({ id: item.id, name: item.name, price: item.price, image: item.image, category: item.category });
  }, [addToCart]);

  const cartCountMap = useMemo(() => cartItems.reduce((acc, item) => { acc[item.id] = item.quantity; return acc; }, {}), [cartItems]);

  return (
    <div className="min-h-screen relative absolute top-20 font-body text-black select-none bg-white pb-28">
      <FontFace />

      {/* ── MAIN CONTENT AREA ── */}
      <div className="lg:h-screen lg:overflow-y-auto custom-scroll">

        {/* Ambient Background Glow */}
        <div className="fixed top-0 hidden left-0 w-[50rem] h-[50rem] rounded-full pointer-events-none blur-3xl -z-10 opacity-30" style={{ background: `radial-gradient(circle, ${CTA_COLOR} 0%, transparent 70%)` }} />

        {/* Header — removed the old cart button from here */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-black/10 px-6 md:px-12 py-6 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="flex items-end gap-4">
            <div className="h-12 w-3 bg-black" />
            <div>
              <span className="font-accent text-xs text-slate-500">{BRAND_NAME} Menu</span>
              <h1 className="font-display text-5xl md:text-6xl font-black tracking-tighter leading-none mt-1">
                {activeCategoryObj.label.toUpperCase()}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative" ref={dropdownRef}>
              <button onClick={() => setDropdownOpen(p => !p)} className="flex items-center gap-3 border-b-2 border-black pb-1 font-display font-bold text-sm uppercase tracking-wider hover:gap-4 transition-all">
                Filter <ChevronDown size={16} className={`${dropdownOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute right-0 top-full mt-4 w-64 bg-white border-2 border-black z-50 shadow-2xl">
                    {CATEGORIES.map((cat) => (
                      <button key={cat.key} onClick={() => { setActiveCategory(cat.key); setDropdownOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 text-left font-display font-bold text-xs uppercase tracking-wider transition-colors ${activeCategory === cat.key ? "bg-black text-white" : "text-black hover:bg-slate-100"}`}>
                        <cat.icon size={14} /> {cat.label}
                        {activeCategory === cat.key && <Check size={14} className="ml-auto" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        <div className="p-6 md:p-12 space-y-12">

          {/* ── SPOTLIGHT CARD ── */}
          {spotlightItem && (
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              onClick={() => setModal(spotlightItem)}
              className="relative bg-[#D4FF00] p-8 md:p-12 -rotate-1 overflow-hidden shadow-2xl cursor-pointer"
            >
              <Watermark className="absolute -right-10 -bottom-20 opacity-[0.1] pointer-events-none" size={400} strokeWidth={1} />
              <div className="grid md:grid-cols-2 gap-8 items-center relative z-10">
                <div className="space-y-4">
                  <span className="inline-flex items-center gap-2 font-accent text-sm text-black/70"><Flame size={14} /> Chef's Spotlight</span>
                  <h2 className="font-display text-5xl md:text-7xl font-black leading-[0.85] tracking-tighter">{spotlightItem.name}</h2>
                  <p className="font-body text-sm max-w-md text-black/80">{spotlightItem.description}</p>
                  <div className="flex items-center gap-6 pt-4">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest font-bold opacity-60">From</p>
                      <p className="font-display text-3xl font-black">UGX {fmt(spotlightItem.price)}</p>
                    </div>
                    <MagicCTA onClick={(e) => { e.stopPropagation(); setModal(spotlightItem); }} className="!bg-black !text-white">
                      View <ArrowRight size={14} />
                    </MagicCTA>
                  </div>
                </div>
                <div className="relative h-48 md:h-72 flex items-center justify-center">
                  <motion.img
                    src={spotlightItem.image} alt={spotlightItem.name}
                    className="w-full max-w-[450px] object-contain drop-shadow-2xl"
                    animate={{ y: [0, -15, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* ── PRODUCT GRID ── */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
            initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.05 } } }}
          >
            {standardItems.map((item) => (
              <motion.div
                key={item.id} variants={cardVariants}
                onClick={() => setModal(item)} role="button" tabIndex={0}
                className="group cursor-pointer flex flex-col"
              >
                <div className="relative bg-[#D4FF00]/5 h-64 flex items-center justify-center overflow-hidden mb-4">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `radial-gradient(circle, ${CTA_COLOR}33 0%, transparent 70%)` }} />
                  <motion.img
                    src={item.image} alt={item.name}
                    className="w-60 h-60 object-contain relative z-10 drop-shadow-xl transition-transform duration-500 group-hover:scale-110"
                  />
                  {pct(item.price, item.anchoring) > 0 && (
                    <span className="absolute top-4 left-4 bg-black text-white text-[10px] font-display font-black uppercase px-2 py-1">
                      -{pct(item.price, item.anchoring)}%
                    </span>
                  )}
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleLike(item.id); }}
                    className={`absolute top-4 right-4 p-2 transition-colors ${liked.has(item.id) ? "bg-black text-white" : "bg-white text-black hover:bg-slate-200"}`}
                  >
                    <Heart size={14} className={liked.has(item.id) ? "fill-current" : ""} />
                  </button>
                </div>

                <div className="flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-2">
                    {item.tag && <span className="font-display text-[10px] font-black uppercase tracking-widest text-slate-500">{item.tag}</span>}
                    <div className="flex items-center gap-1 ml-auto">
                      <Star size={12} className="fill-[#FFC400] text-[#FFC400]" />
                      <span className="text-xs font-bold">{item.rating}</span>
                    </div>
                  </div>
                  <h3 className="font-display font-black text-2xl tracking-tight mb-1">{item.name}</h3>
                  <p className="text-[11px] leading-relaxed mb-4 line-clamp-2 text-slate-500">{item.description}</p>

                  <div className="flex items-end justify-between mt-auto pt-2 border-t border-black/10">
                    <div className="flex flex-col">
                      {pct(item.price, item.anchoring) > 0 && <span className="line-through text-[10px] text-slate-400">UGX {fmt(item.anchoring)}</span>}
                      <div className="flex items-baseline gap-1">
                        <span className="font-display font-black text-xl">{fmt(item.price)}</span>
                        <span className="text-[9px] font-bold uppercase text-slate-400">UGX</span>
                      </div>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleAddToCart(item); }}
                      className="relative w-12 h-12 flex items-center justify-center bg-black text-white hover:bg-[#D4FF00] hover:text-black transition-colors"
                    >
                      <ShoppingBasket size={16} />
                      {cartCountMap[item.id] > 0 && <span className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center text-[10px] font-black bg-[#D4FF00] text-black rounded-full">{cartCountMap[item.id]}</span>}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── PRODUCT DETAILS MODAL ── */}
      <AnimatePresence>
        {modal && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setModal(null)} className="fixed inset-0 bg-black/80 backdrop-blur-md z-50" />
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 15, scale: 0.98 }}
              className="fixed inset-0 z-[60] flex flex-col md:flex-row bg-white"
            >
              <div className="relative h-[35vh] md:h-auto md:flex-1 flex items-center justify-center overflow-hidden bg-[#D4FF00]">
                <Watermark className="absolute -right-16 top-1/2 -translate-y-1/2 opacity-[0.1] pointer-events-none text-black" size={420} strokeWidth={1} />
                <button onClick={() => setModal(null)} className="absolute top-6 left-6 w-10 h-10 flex items-center justify-center bg-black text-white z-20 hover:bg-white hover:text-black transition-colors">
                  <ArrowLeft size={18} />
                </button>
                <motion.img
                  key={modal.id} initial={{ scale: 0.8, rotate: -4 }} animate={{ scale: 1, rotate: 0, y: [0, -15, 0] }}
                  transition={{ scale: { duration: 0.5 }, y: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
                  src={modal.image} alt={modal.name} className="w-full max-w-[380px] md:max-w-[540px] h-auto max-h-[80%] object-contain drop-shadow-2xl"
                />
              </div>

              <div className="flex-1 flex flex-col bg-white overflow-y-auto custom-scroll">
                <div className="p-8 md:p-12 flex-1">
                  <div className="flex items-center gap-2 mb-4">
                    <Star size={16} className="fill-[#FFC400] text-[#FFC400]" />
                    <span className="font-bold text-sm">{modal.rating}</span>
                    {modal.tag && <span className="ml-auto font-display text-[10px] font-black uppercase tracking-widest bg-black text-white px-2 py-1">{modal.tag}</span>}
                  </div>

                  <h2 className="font-display text-5xl md:text-6xl font-black tracking-tighter leading-[0.9]">{modal.name}</h2>

                  <div className="flex items-center gap-4 mt-6 mb-10">
                    <span className="font-display text-3xl font-black">UGX {fmt(modal.price)}</span>
                    {pct(modal.price, modal.anchoring) > 0 && (
                      <span className="line-through text-sm font-bold text-slate-400">UGX {fmt(modal.anchoring)}</span>
                    )}
                  </div>

                  <p className="text-[10px] font-display font-bold uppercase tracking-[0.2em] text-slate-400 mb-2">Details</p>
                  <p className="leading-relaxed text-base font-body text-slate-700 mb-10">{modal.description}</p>

                  <div className="grid grid-cols-3 gap-4 border-t border-b border-black/10 py-6">
                    <div>
                      <Clock size={16} className="mb-2" />
                      <p className="text-[9px] uppercase tracking-widest text-slate-400">Prep</p>
                      <p className="font-display font-bold text-sm">{modal.cookTime}</p>
                    </div>
                    <div>
                      <Truck size={16} className="mb-2" />
                      <p className="text-[9px] uppercase tracking-widest text-slate-400">Delivery</p>
                      <p className="font-display font-bold text-sm">{shipping === 0 ? "Free" : "UGX"}</p>
                    </div>
                    <div>
                      <ShieldCheck size={16} className="mb-2" />
                      <p className="text-[9px] uppercase tracking-widest text-slate-400">Quality</p>
                      <p className="font-display font-bold text-sm">Premium</p>
                    </div>
                  </div>
                </div>

                <div className="p-8 md:p-12 bg-black">
                  <MagicCTA onClick={() => { handleAddToCart(modal); setModal(null); }} className="w-full !text-lg">
                    Add to Cart <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </MagicCTA>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── FLOATING PILL CART ── */}
      <FloatingPillCart
        expanded={cartExpanded}
        onToggle={() => setCartExpanded(p => !p)}
        cartItems={cartItems}
        totalItems={totalItems}
        subtotal={subtotal}
        tax={tax}
        shipping={shipping}
        total={total}
        addToCart={addToCart}
        decreaseQuantity={decreaseQuantity}
        removeFromCart={removeFromCart}
      />
    </div>
  );
}