import React, { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart, Star, Clock, Truck, ShieldCheck, Salad, Minus, Plus, X,
  ShoppingBasket, ShoppingBag, ArrowRight, ArrowLeft, Beef, Drumstick,
  Sandwich, Pizza as PizzaIcon, Trash2, ChevronDown, Check, Utensils, Flame
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
const CTA_COLOR = "#D4FF00"; // Punchy Chartreuse matching the Hero

const fmt = (n) => Number(n).toLocaleString();
const pct = (price, anchoring) => {
  const a = parseInt(anchoring, 10);
  if (!a || a <= price) return 0;
  return Math.round((1 - price / a) * 100);
};

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

// ─── SHARED BRUTALIST CTA ────────────────────────────────
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
    @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@500;700;900&family=Inter:wght@400;500;600&family=Fraunces:ital,wght@1,500;1,600&display=swap');
    .font-display { font-family: 'Archivo', sans-serif; letter-spacing: -0.04em; }
    .font-body { font-family: 'Inter', sans-serif; }
    .font-accent { font-family: 'Fraunces', serif; font-style: italic; }
    .custom-scroll::-webkit-scrollbar { width: 4px; }
    .custom-scroll::-webkit-scrollbar-thumb { background: #333; }
  `}</style>
);

export default function Products() {
  const { cartItems, addToCart, decreaseQuantity, removeFromCart, totalItems, subtotal, shipping, tax, total } = useCart();
  const [activeCategory, setActiveCategory] = useState("all");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [liked, setLiked] = useState(new Set());
  const [cartOpen, setCartOpen] = useState(false);
  const [modal, setModal] = useState(null);
  const dropdownRef = useRef(null);

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

  const checkoutHref = useMemo(() => {
    if (cartItems.length === 0) return null;
    const lines = cartItems.map((i) => `• ${i.name} (x${i.quantity}) — UGX ${fmt(i.price * i.quantity)}`).join("\n");
    const message = `Hello ${BRAND_NAME}! I'd like to order:\n\n${lines}\n\nSubtotal: UGX ${fmt(subtotal)}\nTax: UGX ${fmt(tax)}\nDelivery: ${shipping === 0 ? "Free" : `UGX ${fmt(shipping)}`}\nTotal: UGX ${fmt(total)}`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }, [cartItems, subtotal, tax, shipping, total]);

  return (
    <div className="min-h-screen relative absolute top-20 font-body text-black select-none bg-white flex flex-col lg:flex-row">
      <FontFace />

      {/* ── MAIN CONTENT AREA (Left/Top) ── */}
      <div className="flex-1 min-w-0 lg:h-screen lg:overflow-y-auto custom-scroll pb-24 lg:pb-0">

        {/* Ambient Background Glow */}
        <div className="fixed top-0 left-0 w-[50rem] h-[50rem] rounded-full pointer-events-none blur-3xl -z-10 opacity-30" style={{ background: `radial-gradient(circle, ${CTA_COLOR} 0%, transparent 70%)` }} />

        {/* Brutalist Header */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-black/10 px-6 md:px-12 py-6 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="flex items-end gap-4">
            <div className="h-12 w-3 bg-black" />
            <div>
              <span className="font-accent text-sm text-slate-500">{BRAND_NAME} Menu</span>
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

            {/* Mobile Cart Toggle */}
            <button onClick={() => setCartOpen(true)} className="relative h-12 w-12 flex items-center justify-center bg-black text-white lg:hidden">
              <ShoppingBasket size={18} />
              {totalItems > 0 && <span className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center text-[10px] font-black bg-[#D4FF00] text-black rounded-full">{totalItems}</span>}
            </button>
          </div>
        </header>

        <div className="p-6 md:p-12 space-y-12">

          {/* ── SPOTLIGHT CARD ── */}
          {spotlightItem && (
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="relative bg-[#D4FF00] p-8 md:p-12 -rotate-1 overflow-hidden shadow-2xl"
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
                    <MagicCTA onClick={() => setModal(spotlightItem)} className="!bg-black !text-white">
                      View <ArrowRight size={14} />
                    </MagicCTA>
                  </div>
                </div>
                <div className="relative h-48 md:h-72 flex items-center justify-center">
                  <motion.img
                    src={spotlightItem.image} alt={spotlightItem.name}
                    className="w-full max-w-[280px] object-contain drop-shadow-2xl"
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
                <div className="relative bg-slate-100 h-64 flex items-center justify-center overflow-hidden mb-4">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `radial-gradient(circle, ${CTA_COLOR}33 0%, transparent 70%)` }} />
                  <motion.img
                    src={item.image} alt={item.name}
                    className="w-40 h-40 object-contain relative z-10 drop-shadow-xl transition-transform duration-500 group-hover:scale-110"
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

      {/* ── DESKTOP DARK CART SIDEBAR ── */}
      <aside className="hidden lg:flex flex-col w-[420px] flex-shrink-0 bg-zinc-950 text-white h-screen sticky top-0 border-l border-white/10">
        <div className="p-8 border-b border-white/10 flex items-center justify-between">
          <div>
            <span className="font-accent text-sm text-white/50">Active Order</span>
            <h2 className="text-3xl font-display font-black tracking-tighter mt-1">Your Cart</h2>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-widest text-white/50">Items</p>
            <p className="text-2xl font-display font-black">{totalItems}</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scroll">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-60 pb-20">
              <ShoppingBag size={48} className="mb-4" />
              <p className="font-display font-black text-lg">Cart is empty</p>
              <p className="font-body text-xs mt-1 text-white/50">Add items from the menu</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 border-b border-white/10 pb-4">
                <img src={item.image} alt={item.name} className="h-16 w-16 object-contain bg-white/5 p-1" />
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <h3 className="font-display font-bold text-sm leading-tight">{item.name}</h3>
                    <button onClick={() => removeFromCart(item.id)} className="text-white/30 hover:text-[#D4FF00] transition-colors"><Trash2 size={14} /></button>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2 font-display font-bold">
                      <button onClick={() => decreaseQuantity(item.id)} className="w-6 h-6 flex items-center justify-center border border-white/20 hover:bg-white/10"><Minus size={10} /></button>
                      <span>{item.quantity}</span>
                      <button onClick={() => addToCart({ id: item.id, name: item.name, price: item.price, image: item.image, category: item.category })} className="w-6 h-6 flex items-center justify-center border border-white/20 hover:bg-white/10"><Plus size={10} /></button>
                    </div>
                    <p className="font-display font-black text-sm">UGX {fmt(item.price * item.quantity)}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="p-8 bg-black border-t border-white/10 space-y-4">
            <div className="space-y-2 text-xs font-body text-white/60">
              <div className="flex justify-between"><span>Subtotal</span><span className="font-bold text-white">UGX {fmt(subtotal)}</span></div>
              <div className="flex justify-between"><span>Tax (18%)</span><span className="font-bold text-white">UGX {fmt(tax)}</span></div>
              <div className="flex justify-between items-center"><span>Delivery</span><span className="font-bold text-white">{shipping === 0 ? "Free" : `UGX ${fmt(shipping)}`}</span></div>
            </div>
            <div className="flex justify-between items-end pt-4 border-t border-white/10">
              <p className="font-display font-bold uppercase text-sm">Total</p>
              <p className="text-3xl font-display font-black">UGX {fmt(total)}</p>
            </div>
            <MagicCTA href={checkoutHref} className="w-full !py-5 mt-2">
              Checkout <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </MagicCTA>
          </div>
        )}
      </aside>

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
                  src={modal.image} alt={modal.name} className="w-full max-w-[320px] md:max-w-[440px] h-auto max-h-[80%] object-contain drop-shadow-2xl"
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
                  <MagicCTA onClick={() => { handleAddToCart(modal); setModal(null); setCartOpen(true); }} className="w-full !text-lg">
                    Add to Cart <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </MagicCTA>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── MOBILE CART DRAWER ── */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setCartOpen(false)} className="fixed inset-0 bg-black/80 backdrop-blur-md z-[70] lg:hidden" />
            <motion.aside
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", stiffness: 220, damping: 30 }}
              className="fixed top-0 right-0 h-full w-full max-w-md z-[80] flex flex-col bg-zinc-950 text-white lg:hidden"
            >
              <div className="p-6 flex items-center justify-between border-b border-white/10">
                <h2 className="text-2xl font-display font-black tracking-tighter">Your Cart</h2>
                <button onClick={() => setCartOpen(false)} className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors"><X size={18} /></button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scroll">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center opacity-60 pb-20">
                    <ShoppingBag size={48} className="mb-4" />
                    <p className="font-display font-black text-lg">Cart is empty</p>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 border-b border-white/10 pb-4">
                      <img src={item.image} alt={item.name} className="h-16 w-16 object-contain bg-white/5 p-1" />
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                          <h3 className="font-display font-bold text-sm">{item.name}</h3>
                          <button onClick={() => removeFromCart(item.id)} className="text-white/30 hover:text-[#D4FF00]"><Trash2 size={14} /></button>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2 font-display font-bold">
                            <button onClick={() => decreaseQuantity(item.id)} className="w-6 h-6 flex items-center justify-center border border-white/20"><Minus size={10} /></button>
                            <span>{item.quantity}</span>
                            <button onClick={() => addToCart({ id: item.id, name: item.name, price: item.price, image: item.image, category: item.category })} className="w-6 h-6 flex items-center justify-center border border-white/20"><Plus size={10} /></button>
                          </div>
                          <p className="font-display font-black text-sm">UGX {fmt(item.price * item.quantity)}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="p-6 bg-black border-t border-white/10 space-y-4">
                  <div className="space-y-2 text-xs font-body text-white/60">
                    <div className="flex justify-between"><span>Subtotal</span><span className="font-bold text-white">UGX {fmt(subtotal)}</span></div>
                    <div className="flex justify-between"><span>Tax</span><span className="font-bold text-white">UGX {fmt(tax)}</span></div>
                    <div className="flex justify-between"><span>Delivery</span><span className="font-bold text-white">{shipping === 0 ? "Free" : `UGX ${fmt(shipping)}`}</span></div>
                  </div>
                  <div className="flex justify-between items-end pt-4 border-t border-white/10">
                    <p className="font-display font-bold uppercase text-sm">Total</p>
                    <p className="text-2xl font-display font-black">UGX {fmt(total)}</p>
                  </div>
                  <MagicCTA href={checkoutHref} className="w-full !py-5 mt-2">
                    Checkout <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </MagicCTA>
                </div>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}