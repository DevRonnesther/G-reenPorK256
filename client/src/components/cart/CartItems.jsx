import React, { useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trash2, Minus, Plus, ArrowLeft, ArrowRight, ShoppingBag,
  User, MapPin, CreditCard, ShieldCheck, Truck, Clock, ShoppingBasket,
  Moon, Sun,
} from "lucide-react";
import { useCart } from "../../components/cart/CartContext.jsx";

// ─── DESIGN TOKENS (brand accents fixed; surfaces switch with mode) ─────────
const GREEN = "#0edb0e";
const GOLD = "#facc15";
const cx = (...c) => c.filter(Boolean).join(" ");
const ease = [0.22, 1, 0.36, 1];

const THEME = {
  light: {
    bg: "#ffffff", text: "#1c1917", textSoft: "#57534e", textFaint: "#a8a29e",
    surface: "rgba(0,0,0,0.03)", surfaceStrong: "#ffffff",
    border: "rgba(0,0,0,0.07)", inputBg: "rgba(0,0,0,0.03)",
  },
  dark: {
    bg: "#0b0d0c", text: "#f5f5f4", textSoft: "#a8a29e", textFaint: "#78716c",
    surface: "rgba(255,255,255,0.05)", surfaceStrong: "rgba(255,255,255,0.07)",
    border: "rgba(255,255,255,0.09)", inputBg: "rgba(255,255,255,0.05)",
  },
};

const WHATSAPP_NUMBER = "256776464823";
const fmt = (n) => Number(n).toLocaleString();

const UG_REGIONS = [
  "Kampala (Central)", "Kira", "Entebbe", "Mukono", "Wakiso",
  "Nansana", "Makindye", "Lubaga", "Njeru", "Other"
];

// ─── LOCAL SUB-COMPONENTS ────────────────────────────────────────────────────

const FontFace = React.memo(function FontFace() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Inter:wght@400;500;600&family=Poppins:wght@500;600;700&display=swap');
      .font-display{font-family:'Montserrat',sans-serif}
      .font-ui{font-family:'Poppins',sans-serif}
      .font-body{font-family:'Inter',sans-serif}
    `}</style>
  );
});

/** Premium eyebrow — dot + text + line, no borders */
const Eyebrow = ({ children, theme }) => (
  <div className="flex items-center gap-2.5">
    <motion.span
      className="h-2 w-2 rounded-full"
      style={{ backgroundColor: GREEN, boxShadow: `0 0 8px ${GREEN}66` }}
      animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden="true"
    />
    <span className="text-[11px] font-ui font-semibold uppercase tracking-[0.25em]" style={{ color: theme.textSoft }}>{children}</span>
    <span className="h-px w-8" style={{ backgroundColor: theme.border }} aria-hidden="true" />
  </div>
);

const FieldLabel = ({ icon: Icon, required, children, theme }) => (
  <label className="flex items-center gap-1.5 text-[10px] font-ui font-bold uppercase tracking-[0.15em] mb-2" style={{ color: theme.textSoft }}>
    {Icon && <Icon size={12} style={{ color: GREEN }} aria-hidden="true" />}
    {children} {required && <span className="text-red-400">*</span>}
  </label>
);

const inputStyle = (theme, invalid) => ({
  backgroundColor: invalid ? "rgba(239,68,68,0.06)" : theme.inputBg,
  border: `1px solid ${invalid ? "rgba(239,68,68,0.3)" : theme.border}`,
  color: theme.text,
});

// ─── MAIN CART COMPONENT ─────────────────────────────────────────────────────
export default function Cart() {
  const {
    cartItems, removeFromCart, increaseQuantity, decreaseQuantity,
    subtotal, shipping, tax, total,
  } = useCart();

  const [mode, setMode] = useState("light");
  const theme = useMemo(() => THEME[mode], [mode]);
  const toggleMode = useCallback(() => setMode((p) => (p === "light" ? "dark" : "light")), []);

  const [formData, setFormData] = useState({
    fullName: "", phone: "", city: "Kampala (Central)",
    address: "", paymentMethod: "Cash on Delivery", notes: ""
  });

  const [touched, setTouched] = useState({ fullName: false, phone: false, address: false });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (field) => setTouched((prev) => ({ ...prev, [field]: true }));

  const isFormValid = useMemo(() => {
    return (
      formData.fullName.trim().length > 1 &&
      formData.phone.trim().length >= 9 &&
      formData.address.trim().length > 3
    );
  }, [formData]);

  const checkoutHref = useMemo(() => {
    if (cartItems.length === 0) return null;
    const lines = cartItems
      .map((i) => `• ${i.name} (x${i.quantity}) — UGX ${fmt(i.price * i.quantity)}`)
      .join("\n");
    const deliveryText = shipping === 0 ? "Free" : `UGX ${fmt(shipping)}`;
    const message = `Hello GreenPork! I'd like to place an order:\n\n` +
      `👤 *CUSTOMER INFORMATION* \n-------------------------\n` +
      `Name: ${formData.fullName}\nPhone: ${formData.phone}\nRegion/City: ${formData.city}\n` +
      `Delivery Address: ${formData.address}\nPayment Option: ${formData.paymentMethod}\nDelivery Note: ${formData.notes || "None"}\n\n` +
      `🛒 *ORDER DETAIL*\n-----------------\n${lines}\n\n` +
      `📊 *SUMMARY*\n------------\nSubtotal: UGX ${fmt(subtotal)}\nTax (18%): UGX ${fmt(tax)}\nDelivery Fee: ${deliveryText}\n\n` +
      `💰 *Grand Total: UGX ${fmt(total)}*`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }, [cartItems, subtotal, tax, shipping, total, formData]);

  const ModeToggle = (
    <motion.button
      onClick={toggleMode}
      className="h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0"
      style={{ backgroundColor: theme.surface, border: `1px solid ${theme.border}` }}
      whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
      aria-label="Toggle theme"
    >
      {mode === "light" ? <Moon size={16} style={{ color: theme.text }} /> : <Sun size={16} style={{ color: theme.text }} />}
    </motion.button>
  );

  // ── EMPTY STATE ──────────────────────────────────────────────────────────
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 py-24 text-center font-body relative overflow-hidden transition-colors duration-300" style={{ backgroundColor: theme.bg }}>
        <FontFace />

        <div className="fixed top-6 right-6 z-40">{ModeToggle}</div>

        {/* Ambient Glow */}
        <div className="absolute inset-0 -z-10 pointer-events-none" style={{ background: `radial-gradient(circle at 50% 30%, ${GREEN}15, transparent 55%)` }} />

        <div className="relative w-24 h-24 flex items-center justify-center mb-10">
          <div className="absolute inset-0 rounded-full scale-150 blur-2xl" style={{ backgroundColor: `${GREEN}20` }}></div>
          <div className="relative w-20 h-20 rounded-full flex items-center justify-center shadow-[0_10px_40px_rgba(0,0,0,0.06)]" style={{ backgroundColor: theme.surfaceStrong, border: `1px solid ${theme.border}`, color: GREEN }}>
            <ShoppingBag size={32} strokeWidth={1.5} aria-hidden="true" />
          </div>
        </div>
        <h2 className="text-3xl font-display font-black tracking-tight" style={{ color: theme.text }}>Your cart is empty</h2>
        <p className="text-sm mt-3 max-w-xs leading-relaxed font-body" style={{ color: theme.textFaint }}>
          You haven't added anything delicious yet. Explore our farm-to-table menu.
        </p>
        <Link
          to="/Products"
          className="group mt-10 inline-flex items-center gap-3 font-ui font-bold text-sm pl-5 pr-7 py-4 rounded-full transition-all shadow-lg active:scale-[0.98]"
          style={{ background: `linear-gradient(135deg, ${GREEN}, #0bb00b)`, color: "#000", boxShadow: `0 10px 28px ${GREEN}40` }}
        >
          <span className="bg-stone-950 rounded-full p-2 transition-colors" style={{ color: GREEN }}>
            <ShoppingBasket size={14} aria-hidden="true" />
          </span>
          <span className="text-stone-950">Browse Menu</span>
        </Link>
      </div>
    );
  }

  // ── ACTIVE CART ──────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen font-body pb-32 relative overflow-hidden transition-colors duration-300" style={{ backgroundColor: theme.bg, color: theme.text }}>
      <FontFace />

      {/* Ambient Background */}
      <div className="absolute inset-0 -z-10 pointer-events-none" style={{ background: `radial-gradient(circle at 86% 10%, ${GOLD}10, transparent 55%), radial-gradient(circle at 14% 80%, ${GREEN}12, transparent 55%)` }} />

      <div className="fixed top-6 right-6 z-40">{ModeToggle}</div>

      <div className="max-w-6xl mx-auto px-6 py-14 md:py-24 pt-32">

        {/* Header */}
        <div className="flex items-end justify-between gap-6 mb-16">
          <div>
            <Eyebrow theme={theme}>Checkout</Eyebrow>
            <h1 className="text-4xl md:text-5xl font-display font-black tracking-tight mt-3" style={{ color: theme.text }}>Your Order</h1>
            <p className="text-sm mt-2 font-body" style={{ color: theme.textFaint }}>
              {cartItems.length} item{cartItems.length !== 1 ? "s" : ""} awaiting dispatch
            </p>
          </div>
          <Link
            to="/Products"
            className="hidden sm:flex items-center gap-2 text-xs font-ui font-semibold uppercase tracking-widest transition-colors px-4 py-2.5 rounded-full"
            style={{ backgroundColor: theme.surface, border: `1px solid ${theme.border}`, color: theme.textSoft }}
          >
            <ArrowLeft size={13} />
            Continue
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

          {/* LEFT COLUMN */}
          <div className="lg:col-span-7 space-y-10">

            {/* ── ITEMS ── */}
            <div className="rounded-[2rem] p-6 md:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.03)]" style={{ backgroundColor: theme.surface, border: `1px solid ${theme.border}` }}>
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex flex-col sm:flex-row sm:items-center gap-5">
                    <div className="flex items-center gap-5 flex-1 min-w-0">
                      <div className="w-20 h-20 rounded-2xl flex items-center justify-center shrink-0 p-2 shadow-sm" style={{ backgroundColor: theme.surfaceStrong, border: `1px solid ${theme.border}` }}>
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-display font-bold text-base truncate" style={{ color: theme.text }}>{item.name}</h3>
                        <p className="text-xs mt-1 font-body" style={{ color: theme.textFaint }}>UGX {fmt(item.price)} / unit</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-5 pl-10 sm:pl-0">
                      <div className="flex items-center gap-1 rounded-full p-1 shadow-sm shrink-0" style={{ backgroundColor: theme.surfaceStrong, border: `1px solid ${theme.border}` }}>
                        <button onClick={() => decreaseQuantity(item.id)} aria-label={`Decrease quantity of ${item.name}`} className="h-8 w-8 rounded-full flex items-center justify-center transition-colors active:scale-90" style={{ backgroundColor: theme.surface, color: theme.textSoft }}>
                          <Minus size={12} strokeWidth={3} aria-hidden="true" />
                        </button>
                        <span className="w-8 text-center text-sm font-display font-black select-none" style={{ color: theme.text }}>{item.quantity}</span>
                        <button onClick={() => increaseQuantity(item.id)} aria-label={`Increase quantity of ${item.name}`} className="h-8 w-8 rounded-full flex items-center justify-center transition-colors active:scale-90" style={{ backgroundColor: theme.surface, color: theme.textSoft }}>
                          <Plus size={12} strokeWidth={3} aria-hidden="true" />
                        </button>
                      </div>

                      <p className="font-display font-black text-base shrink-0 w-28 text-right tabular-nums" style={{ color: theme.text }}>
                        UGX {fmt(item.price * item.quantity)}
                      </p>

                      <button onClick={() => removeFromCart(item.id)} aria-label={`Remove ${item.name} from cart`} className="w-8 h-8 rounded-full text-stone-300 hover:text-red-500 hover:bg-red-500/10 flex items-center justify-center shrink-0 transition-colors active:scale-90">
                        <Trash2 size={15} aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── DELIVERY DETAILS ── */}
            <div>
              <Eyebrow theme={theme}>Delivery Details</Eyebrow>
              <p className="mt-3 text-sm font-body max-w-md" style={{ color: theme.textFaint }}>
                Provide details for swift, contactless dispatch.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
                <div className="space-y-1">
                  <FieldLabel icon={User} required theme={theme}>Full Name</FieldLabel>
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} onBlur={() => handleBlur("fullName")} placeholder="e.g. John Doe"
                    className="w-full h-12 px-4 rounded-xl text-sm font-body font-medium transition-all outline-none focus:ring-4"
                    style={{ ...inputStyle(theme, touched.fullName && formData.fullName.trim().length < 2), "--tw-ring-color": `${GREEN}1a` }} />
                  {touched.fullName && formData.fullName.trim().length < 2 && (
                    <p className="text-[10px] text-red-400 font-ui font-bold tracking-tight mt-1">Please enter your real full name.</p>
                  )}
                </div>

                <div className="space-y-1">
                  <FieldLabel icon={Clock} required theme={theme}>Phone Number</FieldLabel>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} onBlur={() => handleBlur("phone")} placeholder="e.g. 0776464823"
                    className="w-full h-12 px-4 rounded-xl text-sm font-body font-medium transition-all outline-none focus:ring-4"
                    style={inputStyle(theme, touched.phone && formData.phone.trim().length < 9)} />
                  {touched.phone && formData.phone.trim().length < 9 && (
                    <p className="text-[10px] text-red-400 font-ui font-bold tracking-tight mt-1">Please enter a valid phone number.</p>
                  )}
                </div>

                <div className="space-y-1">
                  <FieldLabel icon={MapPin} theme={theme}>Region / City</FieldLabel>
                  <select name="city" value={formData.city} onChange={handleInputChange}
                    className="w-full h-12 px-3.5 rounded-xl text-sm font-body font-medium transition-all outline-none focus:ring-4 cursor-pointer appearance-none"
                    style={inputStyle(theme, false)}>
                    {UG_REGIONS.map((region) => (<option key={region} value={region} style={{ color: "#1c1917" }}>{region}</option>))}
                  </select>
                </div>

                <div className="space-y-1">
                  <FieldLabel icon={CreditCard} theme={theme}>Payment Method</FieldLabel>
                  <select name="paymentMethod" value={formData.paymentMethod} onChange={handleInputChange}
                    className="w-full h-12 px-3.5 rounded-xl text-sm font-body font-medium transition-all outline-none focus:ring-4 cursor-pointer appearance-none"
                    style={inputStyle(theme, false)}>
                    <option value="Cash on Delivery" style={{ color: "#1c1917" }}>Cash on Delivery</option>
                    <option value="Mobile Money (MTN/Airtel)" style={{ color: "#1c1917" }}>Mobile Money</option>
                  </select>
                </div>

                <div className="space-y-1 md:col-span-2">
                  <FieldLabel icon={MapPin} required theme={theme}>Delivery Address</FieldLabel>
                  <input type="text" name="address" value={formData.address} onChange={handleInputChange} onBlur={() => handleBlur("address")} placeholder="Street name, landmark, gate details, or plot number"
                    className="w-full h-12 px-4 rounded-xl text-sm font-body font-medium transition-all outline-none focus:ring-4"
                    style={inputStyle(theme, touched.address && formData.address.trim().length <= 3)} />
                  {touched.address && formData.address.trim().length <= 3 && (
                    <p className="text-[10px] text-red-400 font-ui font-bold tracking-tight mt-1">Please provide a clear physical address.</p>
                  )}
                </div>

                <div className="space-y-1 md:col-span-2">
                  <label className="text-[10px] font-ui font-bold uppercase tracking-[0.15em] mb-2 block" style={{ color: theme.textSoft }}>Delivery Notes (Optional)</label>
                  <textarea name="notes" rows="2" value={formData.notes} onChange={handleInputChange} placeholder="e.g. Leave order with guard, extra crispy request..."
                    className="w-full p-4 rounded-xl text-sm font-body font-medium transition-all outline-none focus:ring-4 resize-none"
                    style={inputStyle(theme, false)} />
                </div>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
                <div className="flex items-center gap-3 p-4 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.02)]" style={{ backgroundColor: theme.surfaceStrong, border: `1px solid ${theme.border}` }}>
                  <span className="h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${GREEN}18`, color: GREEN }}>
                    <ShieldCheck size={18} aria-hidden="true" />
                  </span>
                  <span className="font-ui font-semibold text-xs" style={{ color: theme.textSoft }}>100% Fresh Farm Quality</span>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.02)]" style={{ backgroundColor: theme.surfaceStrong, border: `1px solid ${theme.border}` }}>
                  <span className="h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${GREEN}18`, color: GREEN }}>
                    <Truck size={18} aria-hidden="true" />
                  </span>
                  <span className="font-ui font-semibold text-xs" style={{ color: theme.textSoft }}>Prompt Contactless Dispatch</span>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Order Summary */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-6">
            <div className="rounded-[2rem] p-8 shadow-[0_12px_40px_rgba(0,0,0,0.05)]" style={{ backgroundColor: theme.surfaceStrong, border: `1px solid ${theme.border}` }}>
              <div className="flex items-center gap-3 mb-8">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: GREEN, boxShadow: `0 0 8px ${GREEN}66` }} aria-hidden="true" />
                <span className="text-[11px] font-ui font-semibold uppercase tracking-[0.25em]" style={{ color: theme.textSoft }}>Order Summary</span>
                <span className="h-px flex-1" style={{ backgroundColor: theme.border }} aria-hidden="true" />
              </div>

              <div className="space-y-4 text-sm font-body" style={{ color: theme.textSoft }}>
                <div className="flex justify-between items-center">
                  <span>Subtotal</span>
                  <span className="font-bold tabular-nums" style={{ color: theme.text }}>UGX {fmt(subtotal)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Tax (18%)</span>
                  <span className="font-bold tabular-nums" style={{ color: theme.text }}>UGX {fmt(tax)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Delivery dispatch</span>
                  <span className="font-bold tabular-nums" style={{ color: shipping === 0 ? GREEN : theme.text }}>
                    {shipping === 0 ? "Free" : `UGX ${fmt(shipping)}`}
                  </span>
                </div>
              </div>

              <div className="h-px my-7" style={{ backgroundColor: theme.border }} />

              <div className="flex items-end justify-between mb-10">
                <span className="font-ui font-bold text-sm" style={{ color: theme.text }}>Grand Total</span>
                <span className="text-3xl font-display font-black tracking-tight tabular-nums" style={{ color: GREEN }}>UGX {fmt(total)}</span>
              </div>

              {/* Desktop Checkout Button */}
              <div className="hidden lg:block">
                {isFormValid ? (
                  <a href={checkoutHref} target="_blank" rel="noopener noreferrer"
                    className="group flex items-center justify-center gap-3 font-ui font-bold text-sm uppercase tracking-wide pl-3 pr-7 py-4 rounded-full transition-all shadow-lg active:scale-[0.99] w-full"
                    style={{ background: `linear-gradient(135deg, ${GREEN}, #0bb00b)`, color: "#000", boxShadow: `0 10px 28px ${GREEN}30` }}>
                    <span className="bg-stone-950 rounded-full p-2.5 transition-colors" style={{ color: GREEN }}>
                      <ShoppingBasket size={15} aria-hidden="true" />
                    </span>
                    <span className="text-stone-950">Checkout via WhatsApp</span>
                    <ArrowRight size={16} className="ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-stone-950" aria-hidden="true" />
                  </a>
                ) : (
                  <div className="text-center w-full">
                    <div className="flex items-center justify-center gap-2 font-ui font-bold text-xs uppercase tracking-wide px-7 py-4 rounded-full cursor-not-allowed select-none w-full" style={{ backgroundColor: theme.surface, color: theme.textFaint }}>
                      Checkout Locked
                    </div>
                    <p className="text-[10px] font-body mt-3" style={{ color: theme.textFaint }}>
                      Complete the delivery details to unlock checkout.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── STICKY MOBILE CHECKOUT BAR ── */}
      <div className="fixed bottom-0 inset-x-0 backdrop-blur-xl shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-30 lg:hidden transition-colors duration-300" style={{ backgroundColor: mode === "light" ? "rgba(255,255,255,0.9)" : "rgba(11,13,12,0.9)", borderTop: `1px solid ${theme.border}` }}>
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-[10px] font-ui font-bold uppercase tracking-widest" style={{ color: theme.textFaint }}>Total</p>
            <p className="text-xl font-display font-black tabular-nums" style={{ color: GREEN }}>UGX {fmt(total)}</p>
          </div>

          {isFormValid ? (
            <a href={checkoutHref} target="_blank" rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 font-ui font-bold text-xs uppercase tracking-wide pl-3 pr-5 py-3.5 rounded-full transition-all shadow-lg active:scale-[0.99]"
              style={{ background: `linear-gradient(135deg, ${GREEN}, #0bb00b)`, color: "#000", boxShadow: `0 10px 28px ${GREEN}30` }}>
              <span className="bg-stone-950 rounded-full p-2 transition-colors" style={{ color: GREEN }}>
                <ShoppingBasket size={13} aria-hidden="true" />
              </span>
              <span className="text-stone-950">Checkout</span>
            </a>
          ) : (
            <div className="text-right">
              <div className="inline-flex items-center gap-2 font-ui font-bold text-xs uppercase tracking-wide px-5 py-3.5 rounded-full cursor-not-allowed select-none" style={{ backgroundColor: theme.surface, color: theme.textFaint }}>
                Locked
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}