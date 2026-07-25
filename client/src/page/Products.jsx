import React, { useState, useCallback, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart, Star, Clock, Truck, ShieldCheck, Leaf,
  Minus, Plus, X, ShoppingBasket, ShoppingBag,
  ArrowRight, ArrowLeft, Beef, Drumstick, Sandwich,
  Pizza as PizzaIcon, Moon, Sun, Flame, Trash2,
} from "lucide-react";

// ─── Cart Context ─────────────────────────────────────────────────────────
import { useCart } from "../components/cart/CartContext.jsx";

// ASSETS
import Pizza from "../assets/pizza(17).png";
import FreshPork from "../assets/freshporke.png";
import Porkies from "../assets/PremiumPlate.png";
import PorkStake from "../assets/ChatGPT Image Jun 18, 2026, 03_34_25 PM.png";
import Burger from "../assets/Burger.png";
import Chicken from "../assets/pngwing.com (25).png";

// ─── BRAND / CONSTANTS ──────────────────────────────────────────────────────
const WHATSAPP_NUMBER = "256776464823";
const BRAND_NAME = "GreenPork";
const fmt = (n) => Number(n).toLocaleString();
const cx = (...c) => c.filter(Boolean).join(" ");
const pct = (price, anchoring) => {
  const a = parseInt(anchoring, 10);
  if (!a || a <= price) return 0;
  return Math.round((1 - price / a) * 100);
};
const ease = [0.22, 1, 0.36, 1];

// ─── THEME SYSTEM (ported 1:1 from Hero.jsx's per-slide light/dark tokens) ──
const THEMES = {
  all: {
    icon: Leaf, eyebrow: "Full Menu",
    light: { bgFrom: "#0edb0e", bgTo: "#0bb00b", text: "#ffffff", textSoft: "rgba(255,255,255,0.85)", textFaint: "rgba(255,255,255,0.55)", panel: "rgba(255,255,255,0.12)", panelStrong: "rgba(255,255,255,0.22)" },
    dark: { bgFrom: "#022c1e", bgTo: "#054d2e", text: "#ffffff", textSoft: "rgba(255,255,255,0.85)", textFaint: "rgba(255,255,255,0.55)", panel: "rgba(255,255,255,0.08)", panelStrong: "rgba(255,255,255,0.16)" },
  },
  pork: {
    icon: Beef, eyebrow: "Premium Pork",
    light: { bgFrom: "#7c2d12", bgTo: "#ea580c", text: "#ffffff", textSoft: "rgba(255,255,255,0.85)", textFaint: "rgba(255,255,255,0.55)", panel: "rgba(255,255,255,0.12)", panelStrong: "rgba(255,255,255,0.22)" },
    dark: { bgFrom: "#1c0a03", bgTo: "#431407", text: "#ffffff", textSoft: "rgba(255,255,255,0.85)", textFaint: "rgba(255,255,255,0.55)", panel: "rgba(255,255,255,0.08)", panelStrong: "rgba(255,255,255,0.16)" },
  },
  chicken: {
    icon: Drumstick, eyebrow: "Crispy Chicken",
    light: { bgFrom: "#7f1d1d", bgTo: "#dc2626", text: "#ffffff", textSoft: "rgba(255,255,255,0.85)", textFaint: "rgba(255,255,255,0.55)", panel: "rgba(255,255,255,0.12)", panelStrong: "rgba(255,255,255,0.22)" },
    dark: { bgFrom: "#1a0505", bgTo: "#450a0a", text: "#ffffff", textSoft: "rgba(255,255,255,0.85)", textFaint: "rgba(255,255,255,0.55)", panel: "rgba(255,255,255,0.08)", panelStrong: "rgba(255,255,255,0.16)" },
  },
  burgers: {
    icon: Sandwich, eyebrow: "Gourmet Burgers",
    light: { bgFrom: "#92400e", bgTo: "#f59e0b", text: "#ffffff", textSoft: "rgba(255,255,255,0.85)", textFaint: "rgba(255,255,255,0.55)", panel: "rgba(255,255,255,0.12)", panelStrong: "rgba(255,255,255,0.22)" },
    dark: { bgFrom: "#1c1410", bgTo: "#451a03", text: "#ffffff", textSoft: "rgba(255,255,255,0.85)", textFaint: "rgba(255,255,255,0.55)", panel: "rgba(255,255,255,0.08)", panelStrong: "rgba(255,255,255,0.16)" },
  },
  pizza: {
    icon: PizzaIcon, eyebrow: "Classic Pizza",
    light: { bgFrom: "#0edb0e", bgTo: "#0bb00b", text: "#ffffff", textSoft: "rgba(255,255,255,0.85)", textFaint: "rgba(255,255,255,0.55)", panel: "rgba(255,255,255,0.12)", panelStrong: "rgba(255,255,255,0.22)" },
    dark: { bgFrom: "#022c1e", bgTo: "#054d2e", text: "#ffffff", textSoft: "rgba(255,255,255,0.85)", textFaint: "rgba(255,255,255,0.55)", panel: "rgba(255,255,255,0.08)", panelStrong: "rgba(255,255,255,0.16)" },
  },
};

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
  { id: 3, image: PorkStake, category: "pork", anchoring: "9000", name: "Roasted Pork", price: 6000, description: "Roasted crispy premium pork with fried cassava, salad and chapati.", rating: 4.9, cookTime: "30–35 min", tag: "Best Seller" },
  { id: 4, image: Chicken, category: "chicken", anchoring: "78000", name: "Crispy Chicken", price: 55000, description: "Golden crispy chicken with a fiery spice blend.", rating: 4.6, cookTime: "20–25 min", tag: "Spicy" },
  { id: 5, image: Pizza, category: "pizza", anchoring: "18000", name: "Chicken Pizza", price: 15000, description: "Hand-tossed dough with premium chicken and mozzarella.", rating: 4.7, cookTime: "40–45 min", tag: "New" },
  { id: 6, image: Chicken, category: "chicken", anchoring: "55000", name: "Whole Chicken", price: 45000, description: "Farm-fresh whole chicken, marinated and roasted.", rating: 4.7, cookTime: "35–40 min", tag: null },
  { id: 7, image: FreshPork, category: "pork", anchoring: "20000", name: "Fresh Pork Cuts", price: 16000, description: "Premium farm-fresh pork, hygienically prepared.", rating: 4.5, cookTime: "—", tag: "Organic" },
];

const FEATURES = [
  { key: "fresh", icon: Leaf, label: "100% Organic", sub: "Farm Sourced" },
  { key: "delivery", icon: Truck, label: "Express Delivery", sub: "Hot & Fresh" },
  { key: "quality", icon: ShieldCheck, label: "Premium Choice", sub: "Hygienic Prep" },
];

const fadeUp = (d = 0) => ({
  initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0, transition: { duration: 0.5, delay: d, ease } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
});

// ─── SHARED ATOMS (same fonts + glass recipe as Hero.jsx) ──────────────────
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

const glassStyle = (t) => ({
  backgroundColor: t.panel,
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
});

const DynamicBackground = React.memo(function DynamicBackground({ theme, Watermark }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${theme.bgFrom}-${theme.mode}`}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, ease }}
        className="fixed inset-0 -z-10 overflow-hidden"
        style={{ background: `linear-gradient(155deg, ${theme.bgFrom} 0%, ${theme.bgTo} 100%)` }}
      >
        <motion.div
          className="absolute top-24 -right-20 w-[46rem] h-[46rem] rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, ${theme.text}22 0%, transparent 70%)` }}
          initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 0.6, scale: 1 }} transition={{ duration: 0.8, ease }}
        />
        <Watermark className="absolute -left-16 bottom-0 opacity-[0.10] pointer-events-none" size={560} style={{ color: theme.text }} strokeWidth={1} />
      </motion.div>
    </AnimatePresence>
  );
});

const Tag = ({ label, theme }) =>
  label ? (
    <span className="px-2.5 py-1 rounded-full text-[10px] font-ui font-bold uppercase tracking-wider" style={{ ...glassStyle(theme), color: theme.text }}>
      {label}
    </span>
  ) : null;

const Stars = ({ rating, theme }) => (
  <div className="flex items-center gap-1" role="img" aria-label={`Rated ${rating} out of 5`}>
    <Star size={11} style={{ color: theme.text, fill: theme.text }} />
    <span className="text-xs font-ui font-bold" style={{ color: theme.text }}>{rating}</span>
  </div>
);

const StatChip = ({ Icon, label, value, theme }) => (
  <div className="flex flex-col items-center gap-1.5 rounded-2xl py-3.5 px-3 text-center" style={glassStyle(theme)}>
    <span className="h-9 w-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: theme.panelStrong, color: theme.text }}>
      <Icon size={15} aria-hidden="true" />
    </span>
    <div>
      <p className="text-[9px] font-ui font-bold uppercase tracking-wide" style={{ color: theme.textFaint }}>{label}</p>
      <p className="text-xs font-display font-black mt-0.5" style={{ color: theme.text }}>{value}</p>
    </div>
  </div>
);

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 170, damping: 26 } },
};
const drawerVariants = {
  hidden: { x: "100%" },
  show: { x: 0, transition: { type: "spring", stiffness: 220, damping: 30 } },
  exit: { x: "100%", transition: { duration: 0.22, ease: "easeInOut" } },
};
const modalVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 180, damping: 28 } },
  exit: { opacity: 0, y: 15, scale: 0.98, transition: { duration: 0.18, ease: "easeIn" } },
};

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────
const Products = () => {
  const { cartItems, addToCart, decreaseQuantity, removeFromCart, totalItems, subtotal, shipping, tax, total } = useCart();

  const [mode, setMode] = useState("light");
  const [activeCategory, setActiveCategory] = useState("all");
  const [liked, setLiked] = useState(new Set());
  const [cartOpen, setCartOpen] = useState(false);
  const [modal, setModal] = useState(null);

  const toggleMode = useCallback(() => setMode((p) => (p === "light" ? "dark" : "light")), []);

  const themeDef = THEMES[activeCategory];
  const theme = useMemo(() => ({ ...themeDef[mode], mode, icon: themeDef.icon, eyebrow: themeDef.eyebrow }), [themeDef, mode]);
  const Watermark = theme.icon;

  const filtered = useMemo(
    () => (activeCategory === "all" ? ITEMS : ITEMS.filter((i) => i.category === activeCategory)),
    [activeCategory]
  );
  const spotlightItem = useMemo(() => filtered[0], [filtered]);
  const standardItems = useMemo(() => filtered.slice(1), [filtered]);

  const toggleLike = useCallback((id) => {
    setLiked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const handleAddToCart = useCallback((item) => {
    addToCart({ id: item.id, name: item.name, price: item.price, image: item.image, category: item.category });
  }, [addToCart]);

  const cartCountMap = useMemo(
    () => cartItems.reduce((acc, item) => { acc[item.id] = item.quantity; return acc; }, {}),
    [cartItems]
  );

  const checkoutHref = useMemo(() => {
    if (cartItems.length === 0) return null;
    const lines = cartItems.map((i) => `• ${i.name} (x${i.quantity}) — UGX ${fmt(i.price * i.quantity)}`).join("\n");
    const deliveryText = shipping === 0 ? "Free" : `UGX ${fmt(shipping)}`;
    const message = `Hello ${BRAND_NAME}! I'd like to order:\n\n${lines}\n\nSubtotal: UGX ${fmt(subtotal)}\nTax (18%): UGX ${fmt(tax)}\nDelivery: ${deliveryText}\n\nTotal: UGX ${fmt(total)}`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }, [cartItems, subtotal, tax, shipping, total]);

  return (
    <div className="min-h-screen relative overflow-x-hidden font-body pb-20 pt-24">
      <FontFace />
      <DynamicBackground theme={theme} Watermark={Watermark} />

      {/* Dark Mode Toggle */}
      <motion.button
        onClick={toggleMode}
        className="fixed top-6 right-6 z-40 h-10 w-10 rounded-full flex items-center justify-center"
        style={glassStyle(theme)}
        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
        aria-label="Toggle theme"
      >
        {mode === "light" ? <Moon size={16} style={{ color: theme.text }} /> : <Sun size={16} style={{ color: theme.text }} />}
      </motion.button>

      {/* ── STICKY GLASS CONTROL DOCK ── */}
      <div className="sticky top-4 z-30 px-4 mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6 rounded-full px-5 py-3" style={glassStyle(theme)}>
            <div className="flex items-center justify-between w-full md:w-auto">
              <div className="flex items-center gap-3 select-none">
                <span className="h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: theme.panelStrong, color: theme.text }}>
                  <Leaf size={18} aria-hidden="true" />
                </span>
                <div>
                  <div className="flex items-center gap-2.5">
                    <motion.span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: theme.text }} animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
                    <span className="text-[10px] font-ui font-bold uppercase tracking-[0.22em]" style={{ color: theme.textSoft }}>{BRAND_NAME}</span>
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.h1 key={theme.eyebrow} {...fadeUp(0)} className="text-lg md:text-xl font-display font-black leading-tight mt-0.5" style={{ color: theme.text }}>
                      {theme.eyebrow}
                    </motion.h1>
                  </AnimatePresence>
                </div>
              </div>

              <motion.button
                onClick={() => setCartOpen(true)}
                whileTap={{ scale: 0.95 }}
                aria-label="Open your cart"
                className="relative h-10 w-10 rounded-xl flex items-center justify-center lg:hidden"
                style={glassStyle(theme)}
              >
                <ShoppingBasket size={18} style={{ color: theme.text }} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] font-black flex items-center justify-center" style={{ backgroundColor: theme.text, color: theme.bgTo }}>
                    {totalItems}
                  </span>
                )}
              </motion.button>
            </div>

            <div className="w-full md:w-auto" role="tablist">
              <div className="p-1 rounded-full flex flex-wrap gap-1" style={glassStyle(theme)} role="presentation">
                {CATEGORIES.map((cat) => {
                  const isActive = activeCategory === cat.key;
                  return (
                    <button
                      key={cat.key} role="tab" aria-selected={isActive}
                      onClick={() => setActiveCategory(cat.key)}
                      className="relative px-4 py-2 rounded-full text-[11px] sm:text-xs font-ui font-semibold uppercase tracking-wider outline-none transition-colors duration-300"
                    >
                      {isActive && (
                        <motion.span
                          layoutId="activeCategory"
                          className="absolute inset-0 rounded-full z-0"
                          style={{ backgroundColor: theme.text }}
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10 transition-colors duration-300" style={{ color: isActive ? theme.bgTo : theme.textSoft }}>
                        {cat.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── GRID SYSTEM ── */}
      <div className="max-w-7xl mx-auto px-6 py-2">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-start">

          {/* LEFT COLUMN */}
          <div className="lg:col-span-8 space-y-8">

            {/* Spotlight — mirrors Hero's LeftColumn/ProductStage/RightColumn split */}
            <AnimatePresence mode="wait">
              {spotlightItem && (
                <motion.div
                  key={spotlightItem.id}
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.4, ease }}
                  className="relative rounded-[2.5rem] p-5 sm:p-8 md:p-10 mb-2 grid grid-cols-12 gap-4 md:gap-6 items-center overflow-hidden"
                  style={glassStyle(theme)}
                >
                  <div className="col-span-12 sm:col-span-7 space-y-3 md:space-y-5 relative z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-ui font-bold uppercase tracking-widest" style={{ backgroundColor: theme.panelStrong, color: theme.text }}>
                      Chef's Spotlight
                    </span>
                    <h2 className="text-2xl xs:text-3xl md:text-5xl font-display font-black tracking-tight leading-[0.95]" style={{ color: theme.text }}>
                      {spotlightItem.name}
                    </h2>
                    <p className="hidden sm:block text-xs sm:text-sm leading-relaxed max-w-md font-body" style={{ color: theme.textSoft }}>
                      {spotlightItem.description}
                    </p>
                    <div className="flex flex-col xs:flex-row xs:items-center gap-4 md:gap-6 pt-1">
                      <div>
                        <p className="text-[9px] md:text-[10px] font-ui font-bold uppercase tracking-wider" style={{ color: theme.textFaint }}>Starting From</p>
                        <div className="flex items-baseline gap-2 mt-0.5">
                          <span className="text-lg xs:text-xl md:text-2xl font-display font-black" style={{ color: theme.text }}>{fmt(spotlightItem.price)}</span>
                          {pct(spotlightItem.price, spotlightItem.anchoring) > 0 && (
                            <span className="text-xs line-through font-body" style={{ color: theme.textFaint }}>{fmt(spotlightItem.anchoring)}</span>
                          )}
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.95 }}
                        onClick={() => setModal(spotlightItem)}
                        className="group inline-flex items-center gap-2 font-ui font-bold text-xs md:text-sm pl-2 pr-5 py-2.5 rounded-full uppercase tracking-wider"
                        style={{ backgroundColor: theme.text, color: theme.bgTo, boxShadow: `0 10px 28px ${theme.text}40` }}
                      >
                        <span className="rounded-full p-1.5" style={{ backgroundColor: theme.bgTo, color: theme.text }}>
                          <ShoppingBasket size={12} />
                        </span>
                        <span>View Details</span>
                        <ArrowRight size={12} className="ml-0.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                      </motion.button>
                    </div>
                  </div>

                  <div className="col-span-12 sm:col-span-5 relative flex justify-center items-center h-40 xs:h-48 sm:h-56 md:h-72">
                    <motion.img
                      src={spotlightItem.image} alt={spotlightItem.name}
                      className="w-full max-w-[150px] xs:max-w-[180px] sm:max-w-[200px] md:max-w-[280px] h-auto object-contain z-10"
                      animate={{ y: [0, -8, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Trust Features (ported from Hero) */}
            <div className="grid grid-cols-3 gap-2.5 max-w-md">
              {FEATURES.map(({ key, icon: Icon, label, sub }) => (
                <div key={key} className="flex items-center gap-2 p-2 rounded-xl" style={glassStyle(theme)}>
                  <span className="h-7 w-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: theme.panelStrong, color: theme.text }}><Icon size={13} /></span>
                  <div className="leading-tight font-body min-w-0">
                    <p className="text-[10px] font-semibold truncate" style={{ color: theme.text }}>{label}</p>
                    <p className="text-[8px] truncate" style={{ color: theme.textFaint }}>{sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Standard Grid */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6"
              initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.05 } } }}
            >
              {standardItems.map((item) => (
                <motion.div
                  key={item.id} variants={cardVariants}
                  onClick={() => setModal(item)} role="button" tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && setModal(item)}
                  whileHover={{ y: -4 }}
                  className="group rounded-3xl overflow-hidden cursor-pointer transition-shadow duration-300"
                  style={glassStyle(theme)}
                >
                  <div className="relative h-40 xs:h-46 sm:h-48 md:h-52 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0" style={{ background: `radial-gradient(circle at center, ${theme.panelStrong}, transparent 70%)` }} />
                    <motion.img
                      src={item.image} alt={item.name}
                      className="w-30 h-30 xs:w-34 xs:h-34 sm:w-36 sm:h-36 object-contain relative z-10"
                      animate={{ y: [0, -4, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    />
                    {pct(item.price, item.anchoring) > 0 && (
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[9px] font-ui font-black uppercase tracking-wider z-10" style={{ backgroundColor: theme.text, color: theme.bgTo }}>
                        -{pct(item.price, item.anchoring)}%
                      </div>
                    )}
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => { e.stopPropagation(); toggleLike(item.id); }}
                      aria-label={liked.has(item.id) ? "Remove from favorites" : "Add to favorites"}
                      className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 z-10"
                      style={liked.has(item.id) ? { backgroundColor: theme.text, color: theme.bgTo } : { ...glassStyle(theme), color: theme.textSoft }}
                    >
                      <Heart size={14} className={liked.has(item.id) ? "fill-current" : ""} />
                    </motion.button>
                  </div>

                  <div className="p-4 sm:p-5">
                    <div className="flex items-center justify-between mb-2">
                      <Tag label={item.tag} theme={theme} />
                      <Stars rating={item.rating} theme={theme} />
                    </div>
                    <h3 className="font-display font-bold text-sm xs:text-base tracking-tight mb-1 line-clamp-1" style={{ color: theme.text }}>{item.name}</h3>
                    <p className="text-[11px] sm:text-xs leading-relaxed mb-4 line-clamp-2 font-body" style={{ color: theme.textFaint }}>{item.description}</p>
                    <div className="flex items-center justify-between pt-1">
                      <div>
                        {pct(item.price, item.anchoring) > 0 && (
                          <p className="line-through text-[9px] font-body" style={{ color: theme.textFaint }}>UGX {fmt(item.anchoring)}</p>
                        )}
                        <p className="font-display font-black text-xs xs:text-sm sm:text-base" style={{ color: theme.text }}>UGX {fmt(item.price)}</p>
                      </div>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => { e.stopPropagation(); handleAddToCart(item); }}
                        aria-label={`Add ${item.name} to cart`}
                        className="relative w-9 h-9 xs:w-11 xs:h-11 rounded-full flex items-center justify-center transition-colors"
                        style={{ backgroundColor: theme.text, color: theme.bgTo, boxShadow: `0 8px 22px ${theme.text}30` }}
                      >
                        <ShoppingBasket size={15} />
                        {cartCountMap[item.id] > 0 && (
                          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[8px] font-black flex items-center justify-center" style={{ backgroundColor: theme.bgTo, color: theme.text }}>
                            {cartCountMap[item.id]}
                          </span>
                        )}
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {filtered.length === 0 && (
              <div className="flex flex-col items-center justify-center py-24 select-none" style={{ color: theme.textFaint }}>
                <ShoppingBag size={48} className="mb-4 opacity-40" aria-hidden="true" />
                <p className="font-display font-bold text-lg" style={{ color: theme.text }}>Nothing here yet</p>
                <p className="text-sm mt-1 font-body">Try a different category</p>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Sticky Live Cart Panel */}
          <aside className="hidden lg:block lg:col-span-4 lg:sticky lg:top-36 rounded-3xl p-6 space-y-6" style={glassStyle(theme)}>
            <div>
              <h2 className="text-lg font-display font-black" style={{ color: theme.text }}>Your Order</h2>
              <p className="text-xs mt-1 font-body" style={{ color: theme.textFaint }}>{totalItems} item{totalItems !== 1 ? "s" : ""} selected</p>
            </div>

            <div className="space-y-4 max-h-[35vh] overflow-y-auto pr-1">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center select-none" style={{ color: theme.textFaint }}>
                  <ShoppingBag size={32} className="mb-3 opacity-40" />
                  <p className="font-display font-extrabold text-xs" style={{ color: theme.text }}>Your cart is empty</p>
                  <p className="text-[11px] mt-0.5 font-body">Add premium cuts to begin</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={`side-${item.id}`} className="flex items-center gap-3 rounded-2xl p-3" style={{ backgroundColor: theme.panel }}>
                    <div className="w-10 h-10 rounded-xl bg-white/90 flex items-center justify-center shrink-0 p-1">
                      <img src={item.image} alt="" className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-display font-bold text-xs truncate" style={{ color: theme.text }}>{item.name}</p>
                      <p className="font-display font-black text-xs mt-0.5" style={{ color: theme.text }}>UGX {fmt(item.price)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-ui font-bold px-2 py-0.5 rounded-md" style={{ backgroundColor: theme.panelStrong, color: theme.text }}>
                        x{item.quantity}
                      </span>
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        aria-label={`Decrease ${item.name} quantity`}
                        className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
                        style={glassStyle(theme)}
                      >
                        <Minus size={10} style={{ color: theme.textSoft }} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="space-y-4 pt-4 border-t" style={{ borderColor: theme.panelStrong }}>
                <div className="space-y-2 text-[11px] font-body" style={{ color: theme.textSoft }}>
                  <div className="flex justify-between"><span>Subtotal</span><span className="font-bold" style={{ color: theme.text }}>UGX {fmt(subtotal)}</span></div>
                  <div className="flex justify-between"><span>Tax (18%)</span><span className="font-bold" style={{ color: theme.text }}>UGX {fmt(tax)}</span></div>
                  <div className="flex justify-between items-center">
                    <span>Delivery dispatch</span>
                    <span className="font-bold" style={{ color: theme.text }}>{shipping === 0 ? "Free" : `UGX ${fmt(shipping)}`}</span>
                  </div>
                  <div className="h-px my-3" style={{ backgroundColor: theme.panelStrong }} />
                  <div className="flex justify-between items-end">
                    <p className="font-ui font-bold text-xs" style={{ color: theme.text }}>Grand Total</p>
                    <p className="text-lg font-display font-black" style={{ color: theme.text }}>UGX {fmt(total)}</p>
                  </div>
                </div>
                <motion.a
                  href={checkoutHref} target="_blank" rel="noopener noreferrer" whileTap={{ scale: 0.97 }}
                  className="group w-full h-11 rounded-full font-ui font-bold text-xs flex items-center justify-center gap-2 uppercase tracking-wide"
                  style={{ backgroundColor: theme.text, color: theme.bgTo, boxShadow: `0 10px 28px ${theme.text}30` }}
                >
                  Checkout via WhatsApp
                  <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                </motion.a>
              </div>
            )}
          </aside>
        </div>
      </div>

      {/* ── PRODUCT DETAILS MODAL ── */}
      <AnimatePresence>
        {modal && (
          <>
            <motion.div
              key="backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setModal(null)} className="fixed inset-0 bg-black/50 backdrop-blur-md z-50"
            />
            <motion.div
              key="modal" variants={modalVariants} initial="hidden" animate="show" exit="exit" role="dialog"
              className="fixed inset-0 z-[60] flex flex-col md:flex-row overflow-hidden"
              style={{ background: `linear-gradient(155deg, ${theme.bgFrom} 0%, ${theme.bgTo} 100%)` }}
            >
              <div className="relative h-[38vh] min-h-[260px] md:h-auto flex-shrink-0 md:flex-1 flex items-center justify-center overflow-hidden">
                <Watermark className="absolute -right-16 top-1/2 -translate-y-1/2 opacity-[0.12] pointer-events-none" size={420} style={{ color: theme.text }} strokeWidth={1} />
                <div className="absolute top-5 left-5 flex items-center justify-between w-[90%] z-10">
                  <motion.button
                    whileTap={{ scale: 0.9 }} onClick={() => setModal(null)} aria-label="Close details"
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
                    style={glassStyle(theme)}
                  >
                    <ArrowLeft size={18} style={{ color: theme.text }} />
                  </motion.button>
                  <div className="flex items-center gap-2">
                    {modal.tag && <Tag label={modal.tag} theme={theme} />}
                    <motion.button
                      whileTap={{ scale: 0.9 }} onClick={() => toggleLike(modal.id)}
                      aria-label={liked.has(modal.id) ? "Remove from favorites" : "Add to favorites"}
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
                      style={liked.has(modal.id) ? { backgroundColor: theme.text, color: theme.bgTo } : { ...glassStyle(theme), color: theme.textSoft }}
                    >
                      <Heart size={16} className={liked.has(modal.id) ? "fill-current" : ""} />
                    </motion.button>
                  </div>
                </div>
                <div className="relative flex items-center justify-center p-6 h-full w-full select-none">
                  <motion.img
                    key={modal.id}
                    initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0, y: [0, -10, 0] }}
                    transition={{ opacity: { duration: 0.4 }, scale: { type: "spring", stiffness: 220, damping: 20 }, y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
                    src={modal.image} alt={modal.name}
                    className="w-full max-w-[200px] sm:max-w-[260px] md:max-w-[320px] h-auto max-h-[85%] object-contain"
                  />
                </div>
              </div>

              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="flex-1 overflow-y-auto px-6 py-8 md:py-12">
                  <div className="max-w-xl mx-auto space-y-8">
                    <div className="space-y-4">
                      <Stars rating={modal.rating} theme={theme} />
                      <h2 className="text-3xl md:text-4xl font-display font-black tracking-tight leading-tight" style={{ color: theme.text }}>{modal.name}</h2>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-display font-black" style={{ color: theme.text }}>UGX {fmt(modal.price)}</span>
                        {pct(modal.price, modal.anchoring) > 0 && (
                          <>
                            <span className="text-xs line-through font-body font-semibold" style={{ color: theme.textFaint }}>UGX {fmt(modal.anchoring)}</span>
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-ui font-bold uppercase tracking-wider" style={{ ...glassStyle(theme), color: theme.text }}>
                              -{pct(modal.price, modal.anchoring)}% Off
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-[10px] font-ui font-bold uppercase tracking-[0.2em]" style={{ color: theme.textFaint }}>About this selection</p>
                      <p className="leading-relaxed text-sm md:text-base font-body" style={{ color: theme.textSoft }}>{modal.description}</p>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <StatChip Icon={Clock} label="Prep time" value={modal.cookTime} theme={theme} />
                      <StatChip Icon={Truck} label="Delivery" value={shipping === 0 ? "Free" : `UGX ${fmt(shipping)}`} theme={theme} />
                      <StatChip Icon={ShieldCheck} label="Quality" value="Premium" theme={theme} />
                    </div>

                    {pct(modal.price, modal.anchoring) > 0 && (
                      <div className="rounded-2xl p-5 flex items-center justify-between" style={glassStyle(theme)}>
                        <div>
                          <p className="text-[10px] font-ui font-bold uppercase tracking-[0.2em] mb-0.5" style={{ color: theme.textFaint }}>Total Savings</p>
                          <p className="text-2xl font-display font-black" style={{ color: theme.text }}>UGX {fmt(parseInt(modal.anchoring, 10) - modal.price)}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs line-through font-body font-semibold" style={{ color: theme.textFaint }}>UGX {fmt(modal.anchoring)}</p>
                          <p className="text-sm font-display font-extrabold" style={{ color: theme.text }}>UGX {fmt(modal.price)}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-6" style={{ borderTop: `1px solid ${theme.panelStrong}` }}>
                  <div className="max-w-xl mx-auto flex gap-4">
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={() => { handleAddToCart(modal); setModal(null); setCartOpen(true); }}
                      className="group flex-1 h-14 rounded-full font-ui font-bold text-sm flex items-center justify-center gap-2 transition-all uppercase tracking-wide"
                      style={{ backgroundColor: theme.text, color: theme.bgTo, boxShadow: `0 10px 28px ${theme.text}40` }}
                    >
                      <span className="rounded-full p-2.5 transition-colors" style={{ backgroundColor: theme.bgTo, color: theme.text }}>
                        <ShoppingBasket size={15} />
                      </span>
                      <span>Add to order · UGX {fmt(modal.price)}</span>
                      <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── CART DRAWER (matches Hero.jsx's CartDrawer glass recipe) ── */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              key="cart-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-md z-[70]"
            />
            <motion.aside
              key="cart-drawer" variants={drawerVariants} initial="hidden" animate="show" exit="exit" role="dialog"
              className="fixed top-0 right-0 h-full w-full max-w-md z-[80] flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.25)]"
              style={{ backgroundColor: theme.bgTo, color: theme.text }}
            >
              <div className="px-6 py-6 border-b flex items-center justify-between" style={{ borderColor: theme.panelStrong }}>
                <div>
                  <h2 className="text-2xl font-display font-black flex items-center gap-2"><ShoppingBasket size={20} /> Your Order</h2>
                  <p className="text-xs mt-1 font-body" style={{ color: theme.textFaint }}>{totalItems} item{totalItems !== 1 ? "s" : ""} selected</p>
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }} onClick={() => setCartOpen(false)} aria-label="Close cart"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-colors" style={glassStyle(theme)}
                >
                  <X size={18} />
                </motion.button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center opacity-70 pb-16">
                    <ShoppingBasket size={48} className="mb-4 opacity-50" />
                    <p className="font-ui text-sm font-semibold">Your cart is empty</p>
                    <p className="font-body text-xs mt-1 opacity-70">Add some delicious items!</p>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 p-3 rounded-xl" style={{ backgroundColor: theme.panel }}>
                      <img src={item.image} alt={item.name} className="h-16 w-16 object-contain rounded-lg bg-black/20 p-1" />
                      <div className="flex-1">
                        <h3 className="font-ui text-sm font-bold leading-tight">{item.name}</h3>
                        <p className="font-body text-xs opacity-70 mb-2">UGX {fmt(item.price)}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button onClick={() => decreaseQuantity(item.id)} className="p-1 rounded-full hover:bg-white/10"><Minus size={12} /></button>
                            <span className="font-ui text-sm font-bold w-4 text-center">{item.quantity}</span>
                            <button onClick={() => addToCart({ id: item.id, name: item.name, price: item.price, image: item.image, category: item.category })} className="p-1 rounded-full hover:bg-white/10"><Plus size={12} /></button>
                          </div>
                          <button onClick={() => removeFromCart(item.id)} className="text-red-300 hover:text-red-200 transition-colors p-1">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="mt-2 px-6 py-6 border-t" style={{ borderColor: theme.panelStrong }}>
                  <div className="space-y-2 mb-4 text-xs font-body" style={{ color: theme.textSoft }}>
                    <div className="flex justify-between"><span>Subtotal</span><span className="font-bold" style={{ color: theme.text }}>UGX {fmt(subtotal)}</span></div>
                    <div className="flex justify-between"><span>Tax (18%)</span><span className="font-bold" style={{ color: theme.text }}>UGX {fmt(tax)}</span></div>
                    <div className="flex justify-between items-center">
                      <span>Delivery dispatch</span>
                      <span className="font-bold" style={{ color: theme.text }}>{shipping === 0 ? "Free" : `UGX ${fmt(shipping)}`}</span>
                    </div>
                    <div className="h-px my-4" style={{ backgroundColor: theme.panelStrong }} />
                    <div className="flex justify-between items-end">
                      <p className="font-ui font-bold text-sm" style={{ color: theme.text }}>Grand Total</p>
                      <p className="text-2xl font-display font-black" style={{ color: theme.text }}>UGX {fmt(total)}</p>
                    </div>
                  </div>
                  <motion.a
                    href={checkoutHref} target="_blank" rel="noopener noreferrer" whileTap={{ scale: 0.97 }}
                    className="group w-full h-14 rounded-full font-ui font-bold flex items-center justify-center gap-2 uppercase tracking-wide"
                    style={{ backgroundColor: theme.text, color: theme.bgTo, boxShadow: `0 10px 28px ${theme.text}30` }}
                  >
                    Checkout via WhatsApp
                    <ArrowRight size={18} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                  </motion.a>
                </div>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Products;