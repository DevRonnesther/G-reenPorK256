import React, { useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trash2,
  Minus,
  Plus,
  ArrowLeft,
  ArrowRight,
  ShoppingBag,
  User,
  MapPin,
  CreditCard,
  ShieldCheck,
  Truck,
  Clock,
  ShoppingBasket,
  Leaf,
} from "lucide-react";
import { useCart } from "../../components/cart/CartContext.jsx";
import { useTheme } from "../../components/ThemeContext/ThemeContext.jsx";

// ═══════════════════════════════════════════════════════════
// BRAND COLOR SYSTEM — Electric Lime Signature System
// ═══════════════════════════════════════════════════════════
const BRAND = {
  primary: "#D4FF00",       // Official Electric Lime Signature
  primaryText: "#2E0101",   // Deep Contrast Text for Lime elements
  dark: "#2E0101",          // Deep Brand Dark
  redAccent: "#D90404",     // Controlled Strategic Accent
  white: "#FFFFFF",
};

const FREE_DELIVERY_THRESHOLD = 50000;
const SPRING_TRANSITION = { type: "spring", stiffness: 220, damping: 26, mass: 1 };
const SMOOTH_TRANSITION = { duration: 0.8, ease: [0.16, 1, 0.3, 1] };
const cx = (...c) => c.filter(Boolean).join(" ");
const formatCurrency = (n) => Number(n).toLocaleString();
const REGIONS = [
  "Kampala (Central)",
  "Kira",
  "Entebbe",
  "Mukono",
  "Wakiso",
  "Nansana",
  "Makindye",
  "Lubaga",
  "Njeru",
  "Other",
];
const WHATSAPP_NUMBER = "256776464823";

const FontStyles = React.memo(() => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,700&family=Poppins:wght@600;700;800;900&display=swap');
    
    .font-display { font-family: 'Poppins', sans-serif; letter-spacing: -0.03em; }
    .font-body { font-family: 'Montserrat', sans-serif; }
  `}</style>
));

const CtaButton = React.memo(({ href, disabled, children, className, small }) => {
  if (disabled) {
    return (
      <div className="text-center w-full">
        <div
          className="flex items-center justify-center gap-2 font-display font-black text-xs uppercase tracking-widest px-7 py-5 cursor-not-allowed select-none w-full bg-slate-100 border border-slate-200 text-slate-400 shadow-none"
          style={{ clipPath: "polygon(0 0, 100% 0, 94% 100%, 0% 100%)" }}
        >
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
      transition={SPRING_TRANSITION}
      className={cx(
        "group relative inline-flex items-center justify-center gap-2.5 font-display font-black text-xs uppercase tracking-widest focus:outline-none overflow-hidden cursor-pointer shadow-none border-0 w-full",
        small ? "text-xs py-4 px-6" : "text-sm py-5 px-8",
        className
      )}
      style={{
        backgroundColor: BRAND.primary,
        color: BRAND.primaryText,
        clipPath: "polygon(0 0, 100% 0, 94% 100%, 0% 100%)",
      }}
    >
      <div className="absolute inset-0 bg-white/25 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none" />
      <ShoppingBasket size={small ? 14 : 16} strokeWidth={3} className="relative z-10" />
      <span className="relative z-10">{children}</span>
      <ArrowRight
        size={small ? 14 : 16}
        strokeWidth={3}
        className="relative z-10 transition-transform duration-400 group-hover:translate-x-1.5"
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
        className="text-[10px] text-[#D90404] font-display font-bold tracking-tight overflow-hidden mt-1.5"
      >
        {children}
      </motion.p>
    )}
  </AnimatePresence>
);

const FormFieldLabel = ({ icon: Icon, required, children, htmlFor }) => (
  <label
    htmlFor={htmlFor}
    className="flex items-center gap-2 text-[11px] font-display font-extrabold uppercase tracking-wider mb-2.5 text-[#2E0101] cursor-pointer"
  >
    {Icon && <Icon size={13} strokeWidth={3} style={{ color: BRAND.dark }} />}
    {children}
    {required && <span style={{ color: BRAND.redAccent }}>*</span>}
  </label>
);

export default function Cart() {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity, subtotal, shipping, tax, total } = useCart();
  const { theme: currentTheme } = useTheme();

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
      .map((i) => `• ${i.name} (x${i.quantity}) — UGX ${formatCurrency(i.price * i.quantity)}`)
      .join("\n");

    const message = `Hello GreenPork! I'd like to place an order:\n\n👤 *CUSTOMER INFORMATION*\n-------------------------\nName: ${form.fullName}\nPhone: ${form.phone}\nRegion/City: ${form.city}\nDelivery Address: ${form.address}\nPayment Option: ${form.paymentMethod}\nDelivery Note: ${form.notes || "None"}\n\n🛒 *ORDER DETAIL*\n-----------------\n${lines}\n\n📊 *SUMMARY*\n------------\nSubtotal: UGX ${formatCurrency(subtotal)}\nTax (18%): UGX ${formatCurrency(tax)}\nDelivery Fee: ${shipping === 0 ? "Free" : `UGX ${formatCurrency(shipping)}`}\n\n💰 *Grand Total: UGX ${formatCurrency(total)}*`;

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }, [cartItems, subtotal, tax, shipping, total, form]);

  const inputStyles = "w-full h-13 px-5 text-sm font-body font-medium outline-none transition-all bg-white border border-slate-200 text-[#2E0101] placeholder-slate-400 focus:border-[#2E0101] focus:ring-1 focus:ring-[#2E0101] shadow-none";

  // ── EMPTY STATE ──
  if (!cartItems.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 py-24 text-center font-body relative overflow-hidden select-none bg-white text-[#2E0101] selection:bg-[#D4FF00] selection:text-[#2E0101]">
        <FontStyles />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...SMOOTH_TRANSITION, delay: 0.05 }}
          className="w-28 h-28 flex items-center justify-center mb-8 text-[#2E0101] shadow-none border-0"
          style={{ backgroundColor: BRAND.primary, clipPath: "polygon(0 0, 100% 0, 92% 100%, 0% 100%)" }}
        >
          <ShoppingBag size={36} strokeWidth={2.5} />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...SMOOTH_TRANSITION, delay: 0.1 }}
          className="text-4xl font-display font-black tracking-tight uppercase"
        >
          Your cart is empty
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...SMOOTH_TRANSITION, delay: 0.14 }}
          className="text-sm mt-3 max-w-xs leading-relaxed font-body font-medium text-slate-500"
        >
          You haven't added anything delicious yet. Explore our farm-to-table menu.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...SMOOTH_TRANSITION, delay: 0.18 }}
          className="mt-8"
        >
          <Link
            to="/Products"
            className="group relative inline-flex items-center justify-center gap-2.5 py-4 px-8 font-display font-black text-xs uppercase tracking-widest cursor-pointer overflow-hidden shadow-none border-0"
            style={{ backgroundColor: BRAND.primary, color: BRAND.primaryText, clipPath: "polygon(0 0, 100% 0, 94% 100%, 0% 100%)" }}
          >
            Browse Menu
          </Link>
        </motion.div>
      </div>
    );
  }

  // ── ACTIVE CART ──
  return (
    <div className="min-h-screen font-body pb-36 lg:pb-16 relative overflow-hidden select-none bg-white text-[#2E0101] selection:bg-[#D4FF00] selection:text-[#2E0101]">
      <FontStyles />

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-28 md:py-36 relative z-10">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={SMOOTH_TRANSITION}
          className="flex items-end justify-between gap-6 mb-14 pb-8 border-b border-slate-100"
        >
          <div className="flex items-end gap-4">
            <div className="h-10 w-2.5" style={{ backgroundColor: BRAND.primary }} />
            <div>
              <span className="font-display text-xs font-bold text-slate-400 tracking-widest uppercase">GreenPork Checkout</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black tracking-tight uppercase mt-0.5">
                Checkout
              </h1>
              <p className="text-xs mt-3 font-body uppercase tracking-widest font-bold text-slate-400">
                {cartItems.length} item{cartItems.length !== 1 ? "s" : ""} awaiting dispatch
              </p>
            </div>
          </div>

          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={SPRING_TRANSITION}>
            <Link
              to="/Products"
              className="hidden sm:flex items-center gap-2 text-xs font-display font-black uppercase tracking-widest px-5 py-3.5 transition-colors bg-white text-[#2E0101] hover:bg-[#2E0101] hover:text-[#D4FF00] shadow-none border-0"
              style={{ clipPath: "polygon(0 0, 100% 0, 94% 100%, 0% 100%)" }}
            >
              <ArrowLeft size={15} strokeWidth={3} /> Continue Shopping
            </Link>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT COLUMN - DELIVERY DETAILS */}
          <div className="lg:col-span-7 space-y-16">
            <div>
              <div className="flex items-center gap-2.5 mb-5">
                <span className="h-2 w-2" style={{ backgroundColor: BRAND.primary }} />
                <span className="text-xs font-display font-extrabold uppercase tracking-widest text-[#2E0101]">
                  Delivery Details
                </span>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...SMOOTH_TRANSITION, delay: 0.06 }}
                className="text-sm font-body max-w-md mb-8 font-medium text-slate-500"
              >
                Provide details for swift, contactless dispatch.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...SMOOTH_TRANSITION, delay: 0.08 }}
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
                      touched.fullName && form.fullName.trim().length < 2 && "ring-1 ring-[#D90404] border-[#D90404] bg-red-50/30"
                    )}
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
                      touched.phone && form.phone.trim().length < 9 && "ring-1 ring-[#D90404] border-[#D90404] bg-red-50/30"
                    )}
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
                      <option key={r} value={r} style={{ backgroundColor: "#FFFFFF", color: "#2E0101" }}>
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
                    <option value="Cash on Delivery" style={{ backgroundColor: "#FFFFFF", color: "#2E0101" }}>
                      Cash on Delivery
                    </option>
                    <option value="Mobile Money (MTN/Airtel)" style={{ backgroundColor: "#FFFFFF", color: "#2E0101" }}>
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
                      touched.address && form.address.trim().length <= 3 && "ring-1 ring-[#D90404] border-[#D90404] bg-red-50/30"
                    )}
                  />
                  <ErrorMessage show={touched.address && form.address.trim().length <= 3}>
                    Please provide a clear physical address.
                  </ErrorMessage>
                </div>

                <div className="space-y-1.5 md:col-span-2">
                  <label
                    htmlFor="notes"
                    className="text-[11px] font-display font-extrabold uppercase tracking-wider mb-2.5 block text-[#2E0101] cursor-pointer"
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

              {/* GUARANTEE CARDS */}
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
                    className="flex items-center gap-3.5 p-4 bg-white border border-slate-100 shadow-none"
                  >
                    <div className="p-2.5 bg-slate-50 border border-slate-100 text-[#2E0101] shrink-0">
                      <Icon size={16} strokeWidth={2.5} />
                    </div>
                    <div className="leading-tight">
                      <p className="text-xs font-display font-black tracking-wide uppercase text-[#2E0101]">
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

          {/* RIGHT COLUMN: WHITE ORDER BAG SUMMARY WITH LIME BRAND COLORS */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={SPRING_TRANSITION}
              className="bg-white text-[#2E0101] border border-slate-200 shadow-sm flex flex-col overflow-hidden"
            >
              {/* HEADER - LIME BACKGROUND */}
              <div className="flex items-center justify-between p-5 border-b border-slate-100" style={{ backgroundColor: BRAND.primary }}>
                <div className="flex items-center gap-2">
                  <ShoppingBag size={18} strokeWidth={2.5} style={{ color: BRAND.dark }} />
                  <h3 className="font-display font-black text-sm uppercase tracking-wider text-[#2E0101]">
                    Your Order Bag
                  </h3>
                </div>
                <Link to="/Products" className="text-[11px] font-display font-black uppercase tracking-wider text-[#2E0101]/70 hover:text-[#2E0101] transition-colors">
                  Edit
                </Link>
              </div>

              {/* FREE DELIVERY TRACKER - LIME PROGRESS BAR */}
              {subtotal < FREE_DELIVERY_THRESHOLD ? (
                <div className="p-4 bg-slate-50 border-b border-slate-100">
                  <p className="text-[11px] font-body font-medium text-slate-700">
                    Add <span className="font-display font-black text-[#2E0101]">UGX {formatCurrency(FREE_DELIVERY_THRESHOLD - subtotal)}</span> more for <span className="font-display font-black uppercase text-[#2E0101]">Free Delivery!</span>
                  </p>
                  <div className="w-full bg-slate-200 h-1.5 mt-2 overflow-hidden rounded-full">
                    <div
                      className="h-full transition-all duration-500 rounded-full"
                      style={{ backgroundColor: BRAND.primary, width: `${Math.min(100, (subtotal / FREE_DELIVERY_THRESHOLD) * 100)}%` }}
                    />
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-slate-50 border-b border-slate-100">
                  <p className="text-[11px] font-body font-bold text-[#2E0101] flex items-center gap-1.5">
                    <Truck size={14} strokeWidth={2.5} style={{ color: BRAND.dark }} /> You've unlocked Free Delivery!
                  </p>
                </div>
              )}

              {/* ITEMS LIST - LIME QUANTITY STEPPERS */}
              <div className="flex-grow overflow-y-auto p-5 space-y-4 max-h-64 cart-scroll">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between gap-3 pb-4 border-b border-slate-100 last:border-none last:pb-0">
                    <img src={item.image} alt={item.name} className="w-14 h-14 object-contain bg-slate-50 p-1.5 flex-shrink-0 border border-slate-100" />
                    <div className="flex-grow min-w-0">
                      <h4 className="font-display font-black text-xs uppercase truncate text-[#2E0101]">{item.name}</h4>
                      <span className="text-[11px] text-slate-500 font-medium">UGX {formatCurrency(item.price)} each</span>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <div className="flex items-center bg-white border border-slate-200 p-0.5">
                        <button
                          type="button"
                          onClick={() => decreaseQuantity(item.id)}
                          className="w-6 h-6 flex items-center justify-center hover:bg-slate-100 transition-colors cursor-pointer border-0 text-[#2E0101]"
                        >
                          <Minus size={10} strokeWidth={3} />
                        </button>
                        <span className="w-6 text-center font-display font-black text-xs text-[#2E0101]">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => increaseQuantity(item.id)}
                          className="w-6 h-6 flex items-center justify-center hover:bg-slate-100 transition-colors cursor-pointer border-0 text-[#2E0101]"
                        >
                          <Plus size={10} strokeWidth={3} />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="w-6 h-6 flex items-center justify-center text-[#D90404] hover:bg-red-50 transition-colors cursor-pointer border-0"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* PRICING SUMMARY */}
              <div className="p-5 space-y-3 border-t border-slate-100">
                <div className="flex justify-between items-center text-xs font-body">
                  <span className="text-slate-500 font-medium">Subtotal</span>
                  <span className="font-display font-black text-[#2E0101]">UGX {formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between items-center text-xs font-body">
                  <span className="text-slate-500 font-medium">Tax (18%)</span>
                  <span className="font-display font-black text-[#2E0101]">UGX {formatCurrency(tax)}</span>
                </div>
                <div className="flex justify-between items-center text-xs font-body">
                  <span className="text-slate-500 font-medium">Delivery Fee</span>
                  <span className="font-display font-black text-[#2E0101]">
                    {shipping === 0 ? "FREE" : `UGX ${formatCurrency(shipping)}`}
                  </span>
                </div>
              </div>

              {/* TOTAL & CHECKOUT CTA - LIME TOTAL TEXT */}
              <div className="p-5 space-y-4 border-t border-slate-100 bg-white">
                <div className="flex justify-between items-center pt-2">
                  <span className="font-display font-black text-sm uppercase tracking-wider text-[#2E0101]">Total</span>
                  <span className="font-display font-black text-2xl text-[#2E0101] tabular-nums">
                    UGX {formatCurrency(total)}
                  </span>
                </div>
                
                <CtaButton href={whatsappHref} disabled={!isFormValid} className="w-full !py-4 text-sm shadow-none">
                  {isFormValid ? "Checkout via WhatsApp" : "Checkout Locked"}
                </CtaButton>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* MOBILE CHECKOUT BAR */}
      <motion.div
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        transition={{ ...SMOOTH_TRANSITION, delay: 0.3 }}
        className="fixed bottom-4 left-4 right-4 z-30 lg:hidden"
      >
        <div 
          className="bg-[#2E0101] shadow-2xl backdrop-blur-xl flex items-center justify-between gap-4 py-4 px-6 border border-[#D4FF00]/10 overflow-hidden"
          style={{ clipPath: "polygon(0 0, 100% 0, 96% 100%, 0% 100%)" }}
        >
          <div className="flex flex-col text-left relative z-10">
            <span className="font-display font-black text-xs uppercase tracking-wider text-[#D4FF00]">
              {cartItems.length} Item{cartItems.length !== 1 ? "s" : ""}
            </span>
            <span className="font-body text-[10px] text-white/60 font-medium">
              UGX {formatCurrency(total)}
            </span>
          </div>

          <div className="w-48 relative z-10">
            <CtaButton href={whatsappHref} disabled={!isFormValid} small>
              {isFormValid ? "Checkout" : "Locked"}
            </CtaButton>
          </div>
        </div>
      </motion.div>
    </div>
  );
}