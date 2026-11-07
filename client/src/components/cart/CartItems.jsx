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
   BRAND + DESIGN TOKENS
   ═══════════════════════════════════════════════════════════ */
const BRAND_NAME = "Green Pork";
const DARK = "#4A0A0A";
const RED = "#E11D1D";
const LIME = "#D9FF00";
const WORD_RED = "#FFC2B3";

const FREE_DELIVERY_THRESHOLD = 50000;
const WHATSAPP_NUMBER = "256776464823";

const spring = { type: "spring", stiffness: 220, damping: 26 };
const ease = [0.16, 1, 0.3, 1];
const smooth = { duration: 0.8, ease };

const fadeUp = (d = 0) => ({
  initial: { opacity: 0, y: 20, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease, delay: d } },
  exit: { opacity: 0, y: -12, filter: "blur(6px)", transition: { duration: 0.25 } },
});

const fmt = (n) => Number(n).toLocaleString();
const cx = (...c) => c.filter(Boolean).join(" ");

const focusRing = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A0A0A] focus-visible:ring-offset-2";

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
    .cart-scroll::-webkit-scrollbar-thumb { background: rgba(74,10,10,0.15); border-radius: 99px; }
  `}</style>
));

const CtaButton = React.memo(({ href, disabled, children, className, small }) => {
  if (disabled) {
    return (
      <div className="w-full text-center">
        <div
          className={cx(
            "flex w-full select-none items-center justify-center gap-2.5 rounded-full bg-[#4A0A0A]/5 font-display text-xs font-black uppercase tracking-wide text-[#4A0A0A]/30 cursor-not-allowed",
            small ? "px-6 py-3.5" : "px-8 py-5"
          )}
        >
          <ShoppingBasket size={small ? 14 : 16} strokeWidth={2.5} />
          Checkout Locked
        </div>
        <p className="mt-2 text-[10px] font-body font-medium uppercase tracking-widest text-[#4A0A0A]/40">
          Complete required delivery fields to unlock
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
        "group relative inline-flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-full font-display text-xs font-black uppercase tracking-wide",
        focusRing,
        small ? "px-6 py-3.5" : "px-8 py-5",
        className
      )}
      style={{ backgroundColor: LIME, color: DARK }}
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
        className="mt-1.5 overflow-hidden text-[11px] font-display font-bold tracking-tight"
        style={{ color: RED }}
      >
        {children}
      </motion.p>
    )}
  </AnimatePresence>
);

const FormFieldLabel = ({ icon: Icon, required, children, htmlFor }) => (
  <label
    htmlFor={htmlFor}
    className="mb-2.5 flex cursor-pointer items-center gap-2 text-xs font-display font-extrabold uppercase tracking-wider text-[#4A0A0A]"
  >
    {Icon && <Icon size={14} strokeWidth={2.5} style={{ color: RED }} />}
    {children}
    {required && <span style={{ color: RED }}>*</span>}
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
      .map((i) => `• ${i.name} (x${i.quantity}) — ${fmt(i.price * i.quantity)} UGX`)
      .join("\n");

    const message =
      `Hello ${BRAND_NAME}! I'd like to place an order:\n\n` +
      `👤 *CUSTOMER INFORMATION*\n-------------------------\n` +
      `Name: ${form.fullName}\nPhone: ${form.phone}\n` +
      `Region/City: ${form.city}\nDelivery Address: ${form.address}\n` +
      `Payment Option: ${form.paymentMethod}\nDelivery Note: ${form.notes || "None"}\n\n` +
      `🛒 *ORDER DETAIL*\n-----------------\n${lines}\n\n` +
      `📊 *SUMMARY*\n------------\n` +
      `Subtotal: ${fmt(subtotal)} UGX\nTax (18%): ${fmt(tax)} UGX\n` +
      `Delivery Fee: ${shipping === 0 ? "Free" : `${fmt(shipping)} UGX`}\n\n` +
      `💰 *Grand Total: ${fmt(total)} UGX*`;

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }, [cartItems, subtotal, tax, shipping, total, form]);

  const inputStyles =
    "w-full h-14 px-5 py-4 text-sm font-body font-medium outline-none transition-all rounded-2xl bg-[#4A0A0A]/[0.04] text-[#4A0A0A] placeholder-[#4A0A0A]/35 focus:bg-white focus:ring-2 focus:ring-[#4A0A0A]/30";

  // ═══════════════════════════════════════════════════════════
  // 1. EMPTY STATE
  // ═══════════════════════════════════════════════════════════
  if (!cartItems.length) {
    return (
      <section className="relative flex min-h-[100dvh] w-full select-none flex-col items-center justify-center overflow-hidden bg-white px-4 pb-8 pt-10 text-[#4A0A0A]">
        <FontStyles />

        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(circle at 50% 50%, rgba(225,29,29,0.06) 0%, rgba(255,255,255,0) 65%)" }}
        />

        <motion.h1
          {...fadeUp(0.05)}
          className="font-display pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center font-black uppercase leading-[0.82] tracking-[-0.04em]"
          style={{ color: "#FAFAFA", fontSize: "clamp(4.5rem, 18vw, 15rem)" }}
        >
          <span>EMPTY</span>
          <span>BAG</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...smooth, delay: 0.1 }}
          className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full text-white"
          style={{ backgroundColor: DARK }}
        >
          <ShoppingBag size={38} strokeWidth={2.2} style={{ color: LIME }} />
        </motion.div>

        <motion.div
          {...fadeUp(0.3)}
          className="font-display absolute bottom-[18%] left-[8%] z-20 -rotate-3 rounded-2xl px-4 py-2 text-[11px] font-extrabold uppercase text-white shadow-xl lg:bottom-[22%] lg:left-[24%] lg:px-5 lg:py-2.5 lg:text-sm"
          style={{ backgroundColor: DARK }}
        >
          Bag is hungry
          <span className="absolute -bottom-1 left-6 h-3 w-3 rotate-45" style={{ backgroundColor: DARK }} />
        </motion.div>

        <motion.div
          {...fadeUp(0.4)}
          className="font-display absolute right-[8%] top-[28%] z-20 rounded-full px-4 py-2 text-[11px] font-extrabold uppercase shadow-xl lg:right-[24%] lg:px-5 lg:py-2.5 lg:text-sm"
          style={{ backgroundColor: LIME, color: DARK }}
        >
          Wood-Smoked Menu
        </motion.div>

        <motion.div
          {...fadeUp(0.5)}
          className="relative z-20 mt-14 flex flex-col items-center gap-5 text-center"
        >
          <p className="max-w-xs text-sm font-body font-medium leading-relaxed text-[#4A0A0A]/70">
            You haven't added anything delicious yet. Explore our farm-fresh menu.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={spring}>
            <Link
              to="/Products"
              className={cx("flex cursor-pointer items-center gap-2.5 rounded-full px-8 py-4 font-display text-xs font-black uppercase tracking-wide text-white", focusRing)}
              style={{ backgroundColor: DARK }}
            >
              <ArrowLeft size={14} strokeWidth={3} style={{ color: LIME }} /> Browse Menu
            </Link>
          </motion.div>
        </motion.div>
      </section>
    );
  }

  // ═══════════════════════════════════════════════════════════
  // 2. ACTIVE CART & CHECKOUT
  // ═══════════════════════════════════════════════════════════
  return (
    <div className="relative min-h-screen select-none bg-white pb-36 font-body text-[#4A0A0A] selection:bg-[#D9FF00] selection:text-[#4A0A0A] lg:pb-16">
      <FontStyles />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-28">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={smooth}
          className="mb-14 flex items-end justify-between gap-6 border-b border-[#4A0A0A]/10 pb-8"
        >
          <div className="flex items-end gap-4">
            <div className="h-14 w-3 rounded-full" style={{ backgroundColor: RED }} />
            <div>
              <span className="font-display text-xs font-bold uppercase tracking-widest text-[#4A0A0A]/50">
                {BRAND_NAME} Secure Checkout
              </span>
              <h1 className="mt-1 font-display text-6xl font-black uppercase leading-none tracking-tighter text-[#4A0A0A] md:text-8xl lg:text-9xl">
                Checkout
              </h1>
              <p className="mt-4 font-body text-sm font-bold uppercase tracking-widest text-[#4A0A0A]/70">
                {cartItems.length} item{cartItems.length !== 1 ? "s" : ""} awaiting dispatch
              </p>
            </div>
          </div>

          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={spring}>
            <Link
              to="/Products"
              className={cx(
                "hidden items-center gap-2 rounded-full bg-[#4A0A0A]/5 px-5 py-3.5 font-display text-xs font-black uppercase tracking-wide text-[#4A0A0A] transition-colors hover:bg-[#4A0A0A] hover:text-white sm:flex",
                focusRing
              )}
            >
              <ArrowLeft size={15} strokeWidth={3} /> Continue Shopping
            </Link>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* LEFT COLUMN — DELIVERY DETAILS */}
          <div className="space-y-16 lg:col-span-7">
            <div>
              <div className="mb-5 flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: RED }} />
                <span className="font-display text-sm font-extrabold uppercase tracking-widest text-[#4A0A0A]">
                  Delivery Details
                </span>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...smooth, delay: 0.06 }}
                className="mb-8 max-w-md font-body text-base font-medium text-[#4A0A0A]/70"
              >
                Provide details for swift, temperature-controlled delivery.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...smooth, delay: 0.08 }}
                className="grid grid-cols-1 gap-5 md:grid-cols-2"
              >
                {/* Full Name */}
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
                      touched.fullName && form.fullName.trim().length < 2 && "!border-[#E11D1D] bg-[#E11D1D]/5"
                    )}
                  />
                  <ErrorMessage show={touched.fullName && form.fullName.trim().length < 2}>
                    Please enter your real full name.
                  </ErrorMessage>
                </div>

                {/* Phone */}
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
                      touched.phone && form.phone.trim().length < 9 && "!border-[#E11D1D] bg-[#E11D1D]/5"
                    )}
                  />
                  <ErrorMessage show={touched.phone && form.phone.trim().length < 9}>
                    Please enter a valid phone number.
                  </ErrorMessage>
                </div>

                {/* City */}
                <div className="space-y-1.5">
                  <FormFieldLabel icon={MapPin} htmlFor="city">Region / City</FormFieldLabel>
                  <select
                    id="city"
                    name="city"
                    value={form.city}
                    onChange={handleInputChange}
                    className={cx(inputStyles, "cursor-pointer appearance-none bg-white")}
                  >
                    {REGIONS.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Payment Method */}
                <div className="space-y-1.5">
                  <FormFieldLabel icon={CreditCard} htmlFor="paymentMethod">Payment Method</FormFieldLabel>
                  <select
                    id="paymentMethod"
                    name="paymentMethod"
                    value={form.paymentMethod}
                    onChange={handleInputChange}
                    className={cx(inputStyles, "cursor-pointer appearance-none bg-white")}
                  >
                    <option value="Cash on Delivery">Cash on Delivery</option>
                    <option value="Mobile Money (MTN/Airtel)">Mobile Money</option>
                  </select>
                </div>

                {/* Address */}
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
                      touched.address && form.address.trim().length <= 3 && "!border-[#E11D1D] bg-[#E11D1D]/5"
                    )}
                  />
                  <ErrorMessage show={touched.address && form.address.trim().length <= 3}>
                    Please provide a clear physical delivery address.
                  </ErrorMessage>
                </div>

                {/* Notes */}
                <div className="space-y-1.5 md:col-span-2">
                  <label
                    htmlFor="notes"
                    className="mb-2.5 block cursor-pointer font-display text-xs font-extrabold uppercase tracking-wider text-[#4A0A0A]"
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
                    className={cx(inputStyles, "h-auto resize-none py-4")}
                  />
                </div>
              </motion.div>

              {/* Trust Badges */}
              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {[
                  { icon: ShieldCheck, label: "100% Fresh", sub: "Farm Sourced" },
                  { icon: Truck, label: "Fast Dispatch", sub: "Temperature Regulated" },
                  { icon: Leaf, label: "Organic Prep", sub: "Strict Sanitation" },
                ].map(({ icon: Icon, label, sub }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="flex items-center gap-3.5 rounded-[2rem] bg-[#4A0A0A]/[0.02] p-4 transition-all duration-300 hover:bg-[#4A0A0A]/[0.04]"
                  >
                    <div className="flex shrink-0 items-center justify-center rounded-full bg-white p-3 shadow-sm" style={{ color: RED }}>
                      <Icon size={16} strokeWidth={2.5} />
                    </div>
                    <div className="leading-tight">
                      <p className="font-display text-xs font-black uppercase tracking-wide text-[#4A0A0A]">
                        {label}
                      </p>
                      <p className="mt-0.5 font-body text-[10px] font-medium uppercase tracking-wider text-[#4A0A0A]/50">
                        {sub}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN — ORDER BAG SIDEBAR */}
          <div className="lg:sticky lg:top-28 lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={spring}
              className="flex flex-col overflow-hidden rounded-[2.5rem] bg-[#4A0A0A]/[0.02]"
            >
              {/* Bag Header */}
              <div className="flex items-center justify-between p-6 text-white" style={{ backgroundColor: DARK }}>
                <div className="flex items-center gap-2.5">
                  <ShoppingBag size={20} strokeWidth={2.5} style={{ color: LIME }} />
                  <h3 className="font-display text-lg font-black uppercase tracking-tight text-white">
                    Your Order Bag
                  </h3>
                </div>
                <Link
                  to="/Products"
                  className="font-display text-xs font-black uppercase tracking-wider text-white/60 transition-colors hover:text-[#D9FF00]"
                >
                  Edit
                </Link>
              </div>

              {/* Free Delivery Tracker */}
              {subtotal < FREE_DELIVERY_THRESHOLD ? (
                <div className="bg-[#4A0A0A]/[0.03] p-4 px-6">
                  <p className="font-body text-xs font-medium text-[#4A0A0A]/80">
                    Add <span className="font-display font-black text-[#4A0A0A]">{fmt(FREE_DELIVERY_THRESHOLD - subtotal)} UGX</span> more for{" "}
                    <span className="font-display font-black uppercase" style={{ color: RED }}>Free Delivery!</span>
                  </p>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[#4A0A0A]/10">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ backgroundColor: RED, width: `${Math.min(100, (subtotal / FREE_DELIVERY_THRESHOLD) * 100)}%` }}
                    />
                  </div>
                </div>
              ) : (
                <div className="bg-[#4A0A0A]/[0.03] p-4 px-6">
                  <p className="flex items-center gap-1.5 font-body text-xs font-bold text-[#4A0A0A]">
                    <Truck size={14} strokeWidth={2.5} style={{ color: RED }} /> You've unlocked Free Delivery!
                  </p>
                </div>
              )}

              {/* Items List */}
              <div className="cart-scroll max-h-64 flex-grow space-y-4 overflow-y-auto p-6">
                {cartItems.map((item) => {
                  return (
                    <div key={item.id} className="flex items-center justify-between gap-3 border-b border-[#4A0A0A]/5 pb-4 last:border-none last:pb-0">
                      <div className="relative flex h-14 w-14 flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[#4A0A0A]/[0.04]">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-contain p-1.5"
                        />
                      </div>

                      <div className="min-w-0 flex-grow">
                        <h4 className="font-display truncate text-sm font-black uppercase text-[#4A0A0A]">
                          {item.name}
                        </h4>
                        <span className="text-xs font-semibold text-[#4A0A0A]/50">{fmt(item.price)} UGX each</span>
                      </div>

                      {/* Stepper + Remove */}
                      <div className="flex flex-shrink-0 items-center gap-2">
                        <div className="flex items-center rounded-full bg-[#4A0A0A]/5 p-0.5">
                          <button
                            type="button"
                            aria-label="Decrease quantity"
                            onClick={() => decreaseQuantity(item.id)}
                            className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full text-[#4A0A0A] transition-colors hover:bg-[#4A0A0A]/10"
                          >
                            <Minus size={10} strokeWidth={3} />
                          </button>
                          <span className="font-display w-6 text-center text-sm font-black text-[#4A0A0A]">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            aria-label="Increase quantity"
                            onClick={() => increaseQuantity(item.id)}
                            className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full text-[#4A0A0A] transition-colors hover:bg-[#4A0A0A]/10"
                          >
                            <Plus size={10} strokeWidth={3} />
                          </button>
                        </div>
                        <button
                          type="button"
                          aria-label="Remove item"
                          onClick={() => removeFromCart(item.id)}
                          className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-[#E11D1D]/10"
                          style={{ color: RED }}
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pricing Summary */}
              <div className="space-y-2 p-6 text-white" style={{ backgroundColor: DARK }}>
                <div className="flex justify-between font-body text-xs text-white/70">
                  <span>Subtotal</span>
                  <span className="font-bold text-white">{fmt(subtotal)} UGX</span>
                </div>
                <div className="flex justify-between font-body text-xs text-white/70">
                  <span>Tax (18%)</span>
                  <span className="font-bold text-white">{fmt(tax)} UGX</span>
                </div>
                <div className="flex justify-between font-body text-xs text-white/70">
                  <span>Delivery fee</span>
                  <span className="font-bold" style={{ color: LIME }}>
                    {shipping === 0 ? "FREE" : `${fmt(shipping)} UGX`}
                  </span>
                </div>
                <div className="mt-2 flex justify-between border-t border-white/10 pt-3 font-display text-sm font-black text-white">
                  <span>Total</span>
                  <span style={{ color: LIME }}>{fmt(total)} UGX</span>
                </div>

                <div className="mt-4">
                  <CtaButton href={whatsappHref} disabled={!isFormValid} className="w-full !py-4 text-sm">
                    {isFormValid ? "Checkout via WhatsApp" : "Checkout Locked"}
                  </CtaButton>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* MOBILE STICKY CHECKOUT BAR */}
      <motion.div
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        transition={{ ...smooth, delay: 0.3 }}
        className="fixed bottom-4 left-4 right-4 z-30 lg:hidden"
      >
        <div className="flex items-center justify-between gap-4 rounded-full bg-white/95 p-3 pl-6 shadow-2xl backdrop-blur-2xl">
          <div className="relative z-10 flex flex-col text-left">
            <span className="font-display text-xs font-black uppercase tracking-wide text-[#4A0A0A]">
              {cartItems.length} Item{cartItems.length !== 1 ? "s" : ""}
            </span>
            <span className="font-body text-sm font-black text-[#4A0A0A]">
              {fmt(total)} UGX
            </span>
          </div>

          <div className="relative z-10 w-44">
            <CtaButton href={whatsappHref} disabled={!isFormValid} small>
              {isFormValid ? "Checkout" : "Locked"}
            </CtaButton>
          </div>
        </div>
      </motion.div>
    </div>
  );
}