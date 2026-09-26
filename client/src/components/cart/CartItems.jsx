import React, { useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trash2, Minus, Plus, ArrowLeft, ArrowRight,
  ShoppingBag, User, MapPin, CreditCard,
  ShieldCheck, Truck, Clock, Leaf,
  ShoppingBasket,
} from "lucide-react";
import { useCart } from "../../components/cart/CartContext.jsx";

/* ═══════════════════════════════════════════════════════════
   DESIGN TOKENS — unified with Hero & Products
   ═══════════════════════════════════════════════════════════ */
const BRAND_NAME = "Green Pork";

// Standardized Colors
const BRAND_COLOR = "#D9FF00"; // Primary Action / Highlight
const DARK = "#2E0101";        // Primary Dark / Text
const ACCENT = "#F5A31A";      // Secondary Highlight (Progress bars)
const ALERT_COLOR = "#E11D1D"; // Alerts / Errors / Required fields

const FREE_DELIVERY_THRESHOLD = 50000;
const WHATSAPP_NUMBER = "256776464823";

const spring = { type: "spring", stiffness: 220, damping: 26 };
const smooth = { duration: 0.8, ease: [0.16, 1, 0.3, 1] };

const fadeUp = (d = 0) => ({
  initial: { opacity: 0, y: 20, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: d } },
  exit: { opacity: 0, y: -12, filter: "blur(6px)", transition: { duration: 0.25 } },
});

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
const cx = (...c) => c.filter(Boolean).join(" ");

const pill = "flex items-center gap-2 rounded-full px-4 py-2.5 text-[11px] sm:text-xs font-display font-bold uppercase tracking-wide";

const REGIONS = [
  "Kampala (Central)", "Kira", "Entebbe", "Mukono", "Wakiso",
  "Nansana", "Makindye", "Lubaga", "Njeru", "Other",
];

const FontStyles = React.memo(() => (
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
));

// CtaButton — Uses standard brand color background
const CtaButton = React.memo(({ href, disabled, children, className, small }) => {
  if (disabled) {
    return (
      <div className="text-center w-full">
        <div
          className={cx(
            "flex items-center justify-center gap-2.5 rounded-full font-display font-extrabold text-xs uppercase tracking-wide cursor-not-allowed select-none w-full bg-slate-100 text-slate-400",
            small ? "py-3.5 px-6" : "py-5 px-8"
          )}
        >
          <ShoppingBasket size={small ? 14 : 16} strokeWidth={2.5} />
          Checkout Locked
        </div>
        <p className="text-[10px] font-body mt-3 uppercase tracking-widest text-slate-400 font-medium">
          Complete the delivery details to unlock checkout.
        </p>
      </div>
    );
  }

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={spring}
      className={cx(
        "group relative inline-flex items-center justify-center gap-2.5 rounded-full font-display font-extrabold text-xs uppercase tracking-wide cursor-pointer shadow-lg w-full",
        small ? "py-3.5 px-6" : "py-5 px-8",
        className
      )}
      style={{ backgroundColor: BRAND_COLOR, color: DARK }}
    >
      <ShoppingBasket size={small ? 14 : 16} strokeWidth={2.5} className="relative z-10" />
      <span className="relative z-10">{children}</span>
      <ArrowRight
        size={small ? 14 : 16}
        strokeWidth={3}
        className="relative z-10 transition-transform duration-300 group-hover:translate-x-1.5"
      />
    </motion.a>
  );
});

const ErrorMessage = ({ show, children }) => (
  <AnimatePresence>
    {show && (
      <motion.p
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        className="text-[11px] font-display font-bold tracking-tight overflow-hidden mt-1.5"
        style={{ color: ALERT_COLOR }}
      >
        {children}
      </motion.p>
    )}
  </AnimatePresence>
);

const FormFieldLabel = ({ icon: Icon, required, children, htmlFor }) => (
  <label
    htmlFor={htmlFor}
    className="flex items-center gap-2 text-xs font-display font-extrabold uppercase tracking-wider mb-2.5 cursor-pointer"
    style={{ color: DARK }}
  >
    {Icon && <Icon size={14} strokeWidth={3} style={{ color: DARK }} />}
    {children}
    {required && <span style={{ color: ALERT_COLOR }}>*</span>}
  </label>
);

export default function Cart() {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity, subtotal, shipping, tax, total } = useCart();

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    city: "Kampala (Central)",
    address: "",
    paymentMethod: "Cash on Delivery",
    notes: "",
  });

  const [touched, setTouched] = useState({
    fullName: false,
    phone: false,
    address: false,
  });

  const handleInputChange = useCallback((e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleBlur = useCallback((field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }, []);

  const isFormValid = useMemo(
    () =>
      form.fullName.trim().length > 1 &&
      form.phone.trim().length >= 9 &&
      form.address.trim().length > 3,
    [form]
  );

  const whatsappHref = useMemo(() => {
    if (!cartItems.length) return null;
    const lines = cartItems
      .map((i) => `• ${i.name} (x${i.quantity}) — UGX ${fmt(i.price * i.quantity)}`)
      .join("\n");

    const message =
      `Hello ${BRAND_NAME}! I'd like to place an order:\n\n` +
      `👤 *CUSTOMER INFORMATION*\n-------------------------\n` +
      `Name: ${form.fullName}\nPhone: ${form.phone}\n` +
      `Region/City: ${form.city}\nDelivery Address: ${form.address}\n` +
      `Payment Option: ${form.paymentMethod}\nDelivery Note: ${form.notes || "None"}\n\n` +
      `🛒 *ORDER DETAIL*\n-----------------\n${lines}\n\n` +
      `📊 *SUMMARY*\n------------\n` +
      `Subtotal: UGX ${fmt(subtotal)}\nTax (18%): UGX ${fmt(tax)}\n` +
      `Delivery Fee: ${shipping === 0 ? "Free" : `UGX ${fmt(shipping)}`}\n\n` +
      `💰 *Grand Total: UGX ${fmt(total)}*`;

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }, [cartItems, subtotal, tax, shipping, total, form]);

  const inputStyles =
    "w-full h-14 px-5 py-4 text-sm font-body font-medium outline-none transition-all rounded-2xl bg-slate-100 text-[#2E0101] placeholder-slate-400 focus:bg-slate-200/70";

  // ── EMPTY STATE — Hero-style flat color section ──
  if (!cartItems.length) {
    const emptyTheme = CAT_THEME.pork;

    return (
      <section
        className="relative flex min-h-[100dvh] w-full select-none flex-col items-center justify-center overflow-hidden px-4 pb-8 pt-10"
        style={{ backgroundColor: emptyTheme.bg }}
      >
        <FontStyles />

        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 60%)" }}
        />

        <motion.h1
          {...fadeUp(0.05)}
          className="font-display pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center font-black uppercase leading-[0.82] tracking-[-0.04em]"
          style={{ color: emptyTheme.word, fontSize: "clamp(4.5rem, 18vw, 14rem)" }}
        >
          <span>EMPTY</span>
          <span>BAG</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...smooth, delay: 0.1 }}
          className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-2xl"
        >
          <ShoppingBag size={36} strokeWidth={2.5} style={{ color: emptyTheme.dark }} />
        </motion.div>

        <motion.div
          {...fadeUp(0.3)}
          className="font-display absolute bottom-[18%] left-[8%] z-20 -rotate-3 rounded-2xl px-4 py-2 text-[11px] font-extrabold uppercase text-white lg:bottom-[22%] lg:left-[24%] lg:px-5 lg:py-2.5 lg:text-sm"
          style={{ backgroundColor: emptyTheme.dark }}
        >
          No items yet
          <span className="absolute -bottom-1 left-6 h-3 w-3 rotate-45" style={{ backgroundColor: emptyTheme.dark }} />
        </motion.div>

        <motion.div
          {...fadeUp(0.4)}
          className="font-display absolute right-[8%] top-[28%] z-20 rounded-full bg-white px-4 py-2 text-[11px] font-extrabold uppercase shadow-lg lg:right-[24%] lg:px-5 lg:py-2.5 lg:text-sm"
          style={{ color: emptyTheme.dark }}
        >
          Let's fix that
        </motion.div>

        <motion.div
          {...fadeUp(0.5)}
          className="relative z-20 mt-14 flex flex-col items-center gap-5 text-center"
        >
          <p className="max-w-xs text-sm font-body font-medium leading-relaxed text-white/90">
            You haven't added anything delicious yet. Explore our farm-to-table menu.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={spring}>
            <Link
              to="/Products"
              className="flex items-center gap-2.5 rounded-full px-8 py-4 font-display font-extrabold text-xs uppercase tracking-wide shadow-lg cursor-pointer"
              style={{ backgroundColor: BRAND_COLOR, color: DARK }}
            >
              <ArrowLeft size={14} strokeWidth={3} /> Browse Menu
            </Link>
          </motion.div>
        </motion.div>
      </section>
    );
  }

  // ── ACTIVE CART ──
  return (
    <div className="min-h-screen font-body pb-36 lg:pb-16 relative select-none bg-white selection:bg-[#D9FF00] selection:text-[#2E0101]" style={{ color: DARK }}>
      <FontStyles />

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-28 relative z-10">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={smooth}
          className="flex items-end justify-between gap-6 mb-14 pb-8"
        >
          <div className="flex items-end gap-4">
            <div className="h-14 w-3 rounded-full" style={{ backgroundColor: ACCENT }} />
            <div>
              <span className="font-display text-xs font-bold text-slate-400 tracking-widest uppercase">
                {BRAND_NAME} Checkout
              </span>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-black tracking-tighter uppercase mt-1 leading-none">
                Checkout
              </h1>
              <p className="text-sm mt-4 font-body uppercase tracking-widest font-bold text-slate-400">
                {cartItems.length} item{cartItems.length !== 1 ? "s" : ""} awaiting dispatch
              </p>
            </div>
          </div>

          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={spring}>
            <Link
              to="/Products"
              className="hidden sm:flex items-center gap-2 rounded-full text-xs font-display font-black uppercase tracking-wide px-5 py-3.5 transition-colors bg-slate-100 hover:bg-[#2E0101] hover:text-white"
              style={{ color: DARK }}
            >
              <ArrowLeft size={15} strokeWidth={3} /> Continue Shopping
            </Link>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT COLUMN — DELIVERY DETAILS */}
          <div className="lg:col-span-7 space-y-16">
            <div>
              <div className="flex items-center gap-2.5 mb-5">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: ACCENT }} />
                <span className="text-sm font-display font-extrabold uppercase tracking-widest" style={{ color: DARK }}>
                  Delivery Details
                </span>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...smooth, delay: 0.06 }}
                className="text-base font-body max-w-md mb-8 font-medium text-slate-500"
              >
                Provide details for swift, contactless dispatch.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...smooth, delay: 0.08 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-5"
              >
                <div className="space-y-1.5">
                  <FormFieldLabel icon={User} required htmlFor="fullName">Full Name</FormFieldLabel>
                  <input
                    id="fullName"
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur("fullName")}
                    placeholder="e.g. John Doe"
                    className={cx(
                      inputStyles,
                      touched.fullName && form.fullName.trim().length < 2 && "bg-red-50"
                    )}
                    style={touched.fullName && form.fullName.trim().length < 2 ? { color: ALERT_COLOR } : {}}
                  />
                  <ErrorMessage show={touched.fullName && form.fullName.trim().length < 2}>
                    Please enter your real full name.
                  </ErrorMessage>
                </div>

                <div className="space-y-1.5">
                  <FormFieldLabel icon={Clock} required htmlFor="phone">Phone Number</FormFieldLabel>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur("phone")}
                    placeholder="e.g. 0776464823"
                    className={cx(
                      inputStyles,
                      touched.phone && form.phone.trim().length < 9 && "bg-red-50"
                    )}
                    style={touched.phone && form.phone.trim().length < 9 ? { color: ALERT_COLOR } : {}}
                  />
                  <ErrorMessage show={touched.phone && form.phone.trim().length < 9}>
                    Please enter a valid phone number.
                  </ErrorMessage>
                </div>

                <div className="space-y-1.5">
                  <FormFieldLabel icon={MapPin} htmlFor="city">Region / City</FormFieldLabel>
                  <select
                    id="city"
                    name="city"
                    value={form.city}
                    onChange={handleInputChange}
                    className={cx(inputStyles, "cursor-pointer appearance-none")}
                  >
                    {REGIONS.map((r) => (
                      <option key={r} value={r} style={{ backgroundColor: "#FFFFFF", color: DARK }}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <FormFieldLabel icon={CreditCard} htmlFor="paymentMethod">Payment Method</FormFieldLabel>
                  <select
                    id="paymentMethod"
                    name="paymentMethod"
                    value={form.paymentMethod}
                    onChange={handleInputChange}
                    className={cx(inputStyles, "cursor-pointer appearance-none")}
                  >
                    <option value="Cash on Delivery" style={{ backgroundColor: "#FFFFFF", color: DARK }}>
                      Cash on Delivery
                    </option>
                    <option value="Mobile Money (MTN/Airtel)" style={{ backgroundColor: "#FFFFFF", color: DARK }}>
                      Mobile Money
                    </option>
                  </select>
                </div>

                <div className="space-y-1.5 md:col-span-2">
                  <FormFieldLabel icon={MapPin} required htmlFor="address">Delivery Address</FormFieldLabel>
                  <input
                    id="address"
                    type="text"
                    name="address"
                    value={form.address}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur("address")}
                    placeholder="Street name, landmark, gate details, or plot number"
                    className={cx(
                      inputStyles,
                      touched.address && form.address.trim().length <= 3 && "bg-red-50"
                    )}
                    style={touched.address && form.address.trim().length <= 3 ? { color: ALERT_COLOR } : {}}
                  />
                  <ErrorMessage show={touched.address && form.address.trim().length <= 3}>
                    Please provide a clear physical address.
                  </ErrorMessage>
                </div>

                <div className="space-y-1.5 md:col-span-2">
                  <label
                    htmlFor="notes"
                    className="flex items-center gap-2 text-xs font-display font-extrabold uppercase tracking-wider mb-2.5 block cursor-pointer"
                    style={{ color: DARK }}
                  >
                    Delivery Notes (Optional)
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows="2"
                    value={form.notes}
                    onChange={handleInputChange}
                    placeholder="e.g. Leave order with guard, extra crispy request..."
                    className={cx(inputStyles, "h-auto py-4 resize-none")}
                  />
                </div>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                {[
                  { icon: ShieldCheck, label: "100% Fresh", sub: "Farm Sourced" },
                  { icon: Truck, label: "Fast Dispatch", sub: "Hot & Fresh" },
                  { icon: Leaf, label: "Organic Prep", sub: "Hygienic standard" },
                ].map(({ icon: Icon, label, sub }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="flex items-center gap-3.5 rounded-2xl bg-slate-50 p-4 shadow-sm"
                  >
                    <div className="flex shrink-0 items-center justify-center rounded-xl bg-white p-2.5 shadow-sm" style={{ color: DARK }}>
                      <Icon size={16} strokeWidth={2.5} />
                    </div>
                    <div className="leading-tight">
                      <p className="text-xs font-display font-black tracking-wide uppercase" style={{ color: DARK }}>
                        {label}
                      </p>
                      <p className="text-[10px] uppercase tracking-wider mt-0.5 font-body font-medium text-slate-400">
                        {sub}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN — ORDER BAG */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={spring}
              className="flex flex-col overflow-hidden rounded-3xl bg-white shadow-[0_20px_50px_rgba(0,0,0,0.12)]"
            >
              {/* Header — Dark with Brand Color Icon */}
              <div className="flex items-center justify-between p-5 text-white" style={{ backgroundColor: DARK }}>
                <div className="flex items-center gap-2">
                  <ShoppingBag size={20} strokeWidth={2.5} style={{ color: BRAND_COLOR }} />
                  <h3 className="font-display font-black text-xl uppercase tracking-tight">
                    Your Order Bag
                  </h3>
                </div>
                <Link to="/Products" className="text-xs font-display font-black uppercase tracking-wider text-white/60 transition-colors hover:text-white">
                  Edit
                </Link>
              </div>

              {/* Free delivery tracker */}
              {subtotal < FREE_DELIVERY_THRESHOLD ? (
                <div className="p-4 bg-slate-50">
                  <p className="text-xs font-body font-medium text-slate-700">
                    Add <span className="font-display font-black" style={{ color: DARK }}>UGX {fmt(FREE_DELIVERY_THRESHOLD - subtotal)}</span> more for{" "}
                    <span className="font-display font-black uppercase" style={{ color: ALERT_COLOR }}>Free Delivery!</span>
                  </p>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ backgroundColor: ACCENT, width: `${Math.min(100, (subtotal / FREE_DELIVERY_THRESHOLD) * 100)}%` }}
                    />
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-slate-50">
                  <p className="flex items-center gap-1.5 text-xs font-body font-bold" style={{ color: DARK }}>
                    <Truck size={14} strokeWidth={2.5} style={{ color: DARK }} /> You've unlocked Free Delivery!
                  </p>
                </div>
              )}

              {/* Items list */}
              <div className="cart-scroll max-h-64 flex-grow space-y-4 overflow-y-auto p-5">
                {cartItems.map((item) => {
                  const theme = themeOf(item);
                  return (
                    <div key={item.id} className="flex items-center justify-between gap-3 pb-4 last:pb-0">
                      <div
                        className="relative flex h-14 w-14 flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl"
                        style={{ backgroundColor: theme.bg }}
                      >
                        <span
                          className="pointer-events-none absolute inset-0 flex items-center justify-center font-display text-xl font-black uppercase leading-none"
                          style={{ color: theme.word }}
                        >
                          {(item.word || item.category || "ITEM").slice(0, 3)}
                        </span>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="relative z-10 h-full w-full object-contain p-1.5"
                        />
                      </div>

                      <div className="min-w-0 flex-grow">
                        <h4 className="truncate font-display font-black text-sm uppercase" style={{ color: DARK }}>
                          {item.name}
                        </h4>
                        <span className="text-xs font-medium text-slate-500">UGX {fmt(item.price)} each</span>
                      </div>

                      <div className="flex flex-shrink-0 items-center gap-2">
                        <div className="flex items-center rounded-full bg-slate-100 p-0.5">
                          <button
                            type="button"
                            onClick={() => decreaseQuantity(item.id)}
                            className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-slate-200"
                            style={{ color: DARK }}
                          >
                            <Minus size={10} strokeWidth={3} />
                          </button>
                          <span className="w-6 text-center font-display font-black text-sm" style={{ color: DARK }}>
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => increaseQuantity(item.id)}
                            className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-slate-200"
                            style={{ color: DARK }}
                          >
                            <Plus size={10} strokeWidth={3} />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-red-50"
                          style={{ color: ALERT_COLOR }}
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pricing summary — Dark section with Brand Color Highlights */}
              <div className="space-y-2 p-5 text-white" style={{ backgroundColor: DARK }}>
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
                  <span className="font-bold" style={{ color: BRAND_COLOR }}>
                    {shipping === 0 ? "FREE" : `UGX ${fmt(shipping)}`}
                  </span>
                </div>
                <div className="mt-2 flex justify-between border-t border-white/10 pt-2 font-display text-sm font-black">
                  <span>Total</span>
                  <span style={{ color: BRAND_COLOR }}>UGX {fmt(total)}</span>
                </div>

                <div className="mt-3">
                  <CtaButton href={whatsappHref} disabled={!isFormValid} className="w-full !py-4 text-sm">
                    {isFormValid ? "Checkout via WhatsApp" : "Checkout Locked"}
                  </CtaButton>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* MOBILE CHECKOUT BAR */}
      <motion.div
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        transition={{ ...smooth, delay: 0.3 }}
        className="fixed bottom-4 left-4 right-4 z-30 lg:hidden"
      >
        <div className="flex items-center justify-between gap-4 rounded-full bg-white/95 py-4 px-6 shadow-2xl backdrop-blur-2xl">
          <div className="relative z-10 flex flex-col text-left">
            <span className="font-display font-black text-sm uppercase tracking-wide" style={{ color: DARK }}>
              {cartItems.length} Item{cartItems.length !== 1 ? "s" : ""}
            </span>
            <span className="font-body text-xs font-bold text-slate-500">
              UGX {fmt(total)}
            </span>
          </div>

          <div className="relative z-10 w-40">
            <CtaButton href={whatsappHref} disabled={!isFormValid} small>
              {isFormValid ? "Checkout" : "Locked"}
            </CtaButton>
          </div>
        </div>
      </motion.div>
    </div>
  );
}