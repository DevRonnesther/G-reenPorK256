import React, { useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Trash2, Minus, Plus, ArrowLeft, ArrowRight, ShoppingBag,
  User, MapPin, CreditCard, ShieldCheck, Truck, Clock, ShoppingBasket,
  Moon, Sun,
} from "lucide-react";
import { useCart } from "../../components/cart/CartContext.jsx";

const CTA_COLOR = "#D4FF00";
const cx = (...c) => c.filter(Boolean).join(" ");

const THEME = {
  light: { bg: "#ffffff", text: "#000000", textSoft: "#333333", textFaint: "#666666", border: "#000000", inputBorder: "#00000033", isDark: false },
  dark: { bg: "#0A0A0A", text: "#ffffff", textSoft: "#cccccc", textFaint: "#888888", border: "#ffffff", inputBorder: "#ffffff33", isDark: true },
};

const WHATSAPP_NUMBER = "256776464823";
const fmt = (n) => Number(n).toLocaleString();
const UG_REGIONS = ["Kampala (Central)", "Kira", "Entebbe", "Mukono", "Wakiso", "Nansana", "Makindye", "Lubaga", "Njeru", "Other"];

const FontFace = React.memo(function FontFace() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@500;700;900&family=Inter:wght@400;500;600&display=swap');
      .font-display { font-family: 'Archivo', sans-serif; letter-spacing: -0.04em; }
      .font-ui { font-family: 'Inter', sans-serif; }
      .font-body { font-family: 'Inter', sans-serif; }
    `}</style>
  );
});

const Eyebrow = ({ children, theme }) => (
  <div className="flex items-center gap-3 mb-6">
    <span className="h-2 w-2" style={{ backgroundColor: CTA_COLOR }} />
    <span className="text-xs font-display font-bold uppercase tracking-widest" style={{ color: theme.textFaint }}>{children}</span>
  </div>
);

const FieldLabel = ({ icon: Icon, required, children, theme }) => (
  <label className="flex items-center gap-1.5 text-[10px] font-display font-bold uppercase tracking-widest mb-2" style={{ color: theme.textFaint }}>
    {Icon && <Icon size={12} strokeWidth={2} />}
    {children} {required && <span className="text-red-500">*</span>}
  </label>
);

export default function Cart() {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity, subtotal, shipping, tax, total } = useCart();

  const [mode, setMode] = useState("light");
  const theme = useMemo(() => THEME[mode], [mode]);
  const toggleMode = useCallback(() => setMode((p) => (p === "light" ? "dark" : "light")), []);

  const [formData, setFormData] = useState({
    fullName: "", phone: "", city: "Kampala (Central)",
    address: "", paymentMethod: "Cash on Delivery", notes: ""
  });

  const [touched, setTouched] = useState({ fullName: false, phone: false, address: false });

  const handleInputChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handleBlur = (field) => setTouched((prev) => ({ ...prev, [field]: true }));

  const isFormValid = useMemo(() => {
    return formData.fullName.trim().length > 1 && formData.phone.trim().length >= 9 && formData.address.trim().length > 3;
  }, [formData]);

  const checkoutHref = useMemo(() => {
    if (cartItems.length === 0) return null;
    const lines = cartItems.map((i) => `• ${i.name} (x${i.quantity}) — UGX ${fmt(i.price * i.quantity)}`).join("\n");
    const message = `Hello GreenPork! I'd like to place an order:\n\n👤 *CUSTOMER INFORMATION* \n-------------------------\nName: ${formData.fullName}\nPhone: ${formData.phone}\nRegion/City: ${formData.city}\nDelivery Address: ${formData.address}\nPayment Option: ${formData.paymentMethod}\nDelivery Note: ${formData.notes || "None"}\n\n🛒 *ORDER DETAIL*\n-----------------\n${lines}\n\n📊 *SUMMARY*\n------------\nSubtotal: UGX ${fmt(subtotal)}\nTax (18%): UGX ${fmt(tax)}\nDelivery Fee: ${shipping === 0 ? "Free" : `UGX ${fmt(shipping)}`}\n\n💰 *Grand Total: UGX ${fmt(total)}*`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }, [cartItems, subtotal, tax, shipping, total, formData]);

  const inputBase = cx(
    "w-full h-12 px-4 bg-transparent border-2 text-sm font-body font-medium outline-none transition-colors focus:border-black",
    theme.isDark ? "border-white/20 focus:border-white text-white" : "border-black/20 focus:border-black text-black"
  );

  // ── EMPTY STATE ──
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 py-24 text-center font-body relative overflow-hidden transition-colors duration-300" style={{ backgroundColor: theme.bg, color: theme.text }}>
        <FontFace />
        <div className="fixed top-6 right-6 z-40">
          <motion.button onClick={toggleMode} className="h-12 w-12 flex items-center justify-center border-2 transition-colors" style={{ borderColor: theme.border, color: theme.text }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} aria-label="Toggle theme">
            {mode === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </motion.button>
        </div>

        <div className="relative w-24 h-24 flex items-center justify-center mb-10 border-2" style={{ borderColor: theme.border, color: theme.text }}>
          <ShoppingBag size={32} strokeWidth={2} />
        </div>
        <h2 className="text-4xl font-display font-black tracking-tighter">Your cart is empty</h2>
        <p className="text-sm mt-4 max-w-xs leading-relaxed font-body" style={{ color: theme.textFaint }}>
          You haven't added anything delicious yet. Explore our farm-to-table menu.
        </p>
        <Link to="/Products" className="group mt-10 inline-flex items-center gap-3 font-display font-black px-8 py-4 text-sm uppercase tracking-wide text-black shadow-xl transition-colors" style={{ backgroundColor: CTA_COLOR, clipPath: "polygon(0 0, 100% 0, 96% 100%, 0% 100%)" }}>
          <ShoppingBasket size={16} strokeWidth={2.5} /> Browse Menu
        </Link>
      </div>
    );
  }

  // ── ACTIVE CART ──
  return (
    <div className="min-h-screen font-body pb-32 lg:pb-12 relative overflow-hidden transition-colors duration-300" style={{ backgroundColor: theme.bg, color: theme.text }}>
      <FontFace />

      <div className="fixed top-6 right-6 z-40">
        <motion.button onClick={toggleMode} className="h-12 w-12 flex items-center justify-center border-2 transition-colors" style={{ borderColor: theme.border, color: theme.text }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} aria-label="Toggle theme">
          {mode === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </motion.button>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-32 md:py-40">
        <div className="flex items-end justify-between gap-6 mb-16 border-b-2 pb-8" style={{ borderColor: theme.border }}>
          <div>
            <Eyebrow theme={theme}>Checkout</Eyebrow>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-black tracking-tighter leading-[0.9]">Your Order</h1>
            <p className="text-sm mt-4 font-body uppercase tracking-widest" style={{ color: theme.textFaint }}>
              {cartItems.length} item{cartItems.length !== 1 ? "s" : ""} awaiting dispatch
            </p>
          </div>
          <Link to="/Products" className="hidden sm:flex items-center gap-2 text-xs font-display font-bold uppercase tracking-widest transition-colors px-4 py-2 border-2" style={{ borderColor: theme.border, color: theme.text }}>
            <ArrowLeft size={14} strokeWidth={2.5} /> Continue
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-7 space-y-16">
            {/* ── ITEMS ── */}
            <div>
              <Eyebrow theme={theme}>Cart Items</Eyebrow>
              <div className="border-t-2" style={{ borderColor: theme.border }}>
                {cartItems.map((item) => (
                  <div key={item.id} className="flex flex-col sm:flex-row sm:items-center gap-6 py-6 border-b-2" style={{ borderColor: theme.border }}>
                    <div className="flex items-center gap-5 flex-1 min-w-0">
                      <div className="w-20 h-20 flex items-center justify-center shrink-0 p-2 border-2" style={{ borderColor: theme.border }}>
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-display font-black text-lg truncate">{item.name}</h3>
                        <p className="text-xs mt-1 font-body uppercase tracking-widest" style={{ color: theme.textFaint }}>UGX {fmt(item.price)} / unit</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6 pl-25 sm:pl-0">
                      <div className="flex items-center gap-2 shrink-0">
                        <button onClick={() => decreaseQuantity(item.id)} aria-label={`Decrease quantity of ${item.name}`} className="w-8 h-8 flex items-center justify-center border-2 transition-colors active:scale-90" style={{ borderColor: theme.border, color: theme.text }}>
                          <Minus size={12} strokeWidth={3} />
                        </button>
                        <span className="w-8 text-center text-sm font-display font-black select-none">{item.quantity}</span>
                        <button onClick={() => increaseQuantity(item.id)} aria-label={`Increase quantity of ${item.name}`} className="w-8 h-8 flex items-center justify-center border-2 transition-colors active:scale-90" style={{ borderColor: theme.border, color: theme.text }}>
                          <Plus size={12} strokeWidth={3} />
                        </button>
                      </div>

                      <p className="font-display font-black text-base shrink-0 w-28 text-right tabular-nums">UGX {fmt(item.price * item.quantity)}</p>
                      <button onClick={() => removeFromCart(item.id)} aria-label={`Remove ${item.name} from cart`} className="w-8 h-8 flex items-center justify-center shrink-0 transition-colors active:scale-90 text-red-500 hover:bg-red-500/10">
                        <Trash2 size={16} strokeWidth={2} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── DELIVERY DETAILS ── */}
            <div>
              <Eyebrow theme={theme}>Delivery Details</Eyebrow>
              <p className="text-sm font-body max-w-md mb-8" style={{ color: theme.textFaint }}>Provide details for swift, contactless dispatch.</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <FieldLabel icon={User} required theme={theme}>Full Name</FieldLabel>
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} onBlur={() => handleBlur("fullName")} placeholder="e.g. John Doe" className={cx(inputBase, touched.fullName && formData.fullName.trim().length < 2 && "!border-red-500")} />
                  {touched.fullName && formData.fullName.trim().length < 2 && <p className="text-[10px] text-red-500 font-display font-bold tracking-tight">Please enter your real full name.</p>}
                </div>

                <div className="space-y-2">
                  <FieldLabel icon={Clock} required theme={theme}>Phone Number</FieldLabel>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} onBlur={() => handleBlur("phone")} placeholder="e.g. 0776464823" className={cx(inputBase, touched.phone && formData.phone.trim().length < 9 && "!border-red-500")} />
                  {touched.phone && formData.phone.trim().length < 9 && <p className="text-[10px] text-red-500 font-display font-bold tracking-tight">Please enter a valid phone number.</p>}
                </div>

                <div className="space-y-2">
                  <FieldLabel icon={MapPin} theme={theme}>Region / City</FieldLabel>
                  <select name="city" value={formData.city} onChange={handleInputChange} className={cx(inputBase, "cursor-pointer appearance-none")}>
                    {UG_REGIONS.map((region) => (<option key={region} value={region} style={{ color: "#000" }}>{region}</option>))}
                  </select>
                </div>

                <div className="space-y-2">
                  <FieldLabel icon={CreditCard} theme={theme}>Payment Method</FieldLabel>
                  <select name="paymentMethod" value={formData.paymentMethod} onChange={handleInputChange} className={cx(inputBase, "cursor-pointer appearance-none")}>
                    <option value="Cash on Delivery" style={{ color: "#000" }}>Cash on Delivery</option>
                    <option value="Mobile Money (MTN/Airtel)" style={{ color: "#000" }}>Mobile Money</option>
                  </select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <FieldLabel icon={MapPin} required theme={theme}>Delivery Address</FieldLabel>
                  <input type="text" name="address" value={formData.address} onChange={handleInputChange} onBlur={() => handleBlur("address")} placeholder="Street name, landmark, gate details, or plot number" className={cx(inputBase, touched.address && formData.address.trim().length <= 3 && "!border-red-500")} />
                  {touched.address && formData.address.trim().length <= 3 && <p className="text-[10px] text-red-500 font-display font-bold tracking-tight">Please provide a clear physical address.</p>}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-[10px] font-display font-bold uppercase tracking-widest mb-2 block" style={{ color: theme.textFaint }}>Delivery Notes (Optional)</label>
                  <textarea name="notes" rows="2" value={formData.notes} onChange={handleInputChange} placeholder="e.g. Leave order with guard, extra crispy request..." className={cx(inputBase, "h-auto py-3 resize-none")} />
                </div>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
                <div className="flex items-center gap-4 p-4 border-2" style={{ borderColor: theme.border }}>
                  <ShieldCheck size={20} strokeWidth={2} className="shrink-0" />
                  <span className="font-display font-bold text-xs uppercase tracking-wide">100% Fresh Farm Quality</span>
                </div>
                <div className="flex items-center gap-4 p-4 border-2" style={{ borderColor: theme.border }}>
                  <Truck size={20} strokeWidth={2} className="shrink-0" />
                  <span className="font-display font-bold text-xs uppercase tracking-wide">Prompt Contactless Dispatch</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Order Summary */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-6">
            <div className="p-8 border-2" style={{ borderColor: theme.border, backgroundColor: theme.isDark ? "#111111" : "#F5F5F5" }}>
              <Eyebrow theme={theme}>Order Summary</Eyebrow>

              <div className="space-y-4 text-sm font-body" style={{ color: theme.textSoft }}>
                <div className="flex justify-between items-center">
                  <span className="uppercase tracking-widest text-xs">Subtotal</span>
                  <span className="font-display font-black tabular-nums text-base">UGX {fmt(subtotal)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="uppercase tracking-widest text-xs">Tax (18%)</span>
                  <span className="font-display font-black tabular-nums text-base">UGX {fmt(tax)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="uppercase tracking-widest text-xs">Delivery dispatch</span>
                  <span className="font-display font-black tabular-nums text-base" style={{ color: shipping === 0 ? CTA_COLOR : theme.text }}>
                    {shipping === 0 ? "Free" : `UGX ${fmt(shipping)}`}
                  </span>
                </div>
              </div>

              <div className="h-px my-7 border-t-2 border-dashed" style={{ borderColor: theme.border }} />

              <div className="flex items-end justify-between mb-10">
                <span className="font-display font-bold uppercase text-sm">Grand Total</span>
                <span className="text-4xl font-display font-black tracking-tighter tabular-nums">UGX {fmt(total)}</span>
              </div>

              {/* Desktop Checkout Button */}
              <div className="hidden lg:block">
                {isFormValid ? (
                  <motion.a
                    href={checkoutHref} target="_blank" rel="noopener noreferrer"
                    whileHover={{ scale: 1.02, backgroundColor: "#E4FF4D" }} whileTap={{ scale: 0.98 }}
                    className="group flex items-center justify-center gap-3 font-display font-black text-sm uppercase tracking-wide py-5 px-6 text-black shadow-xl transition-colors"
                    style={{ backgroundColor: CTA_COLOR, clipPath: "polygon(0 0, 100% 0, 96% 100%, 0% 100%)" }}
                  >
                    <ShoppingBasket size={16} strokeWidth={2.5} />
                    Checkout via WhatsApp
                    <ArrowRight size={16} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />
                  </motion.a>
                ) : (
                  <div className="text-center w-full">
                    <div className="flex items-center justify-center gap-2 font-display font-bold text-xs uppercase tracking-wide px-7 py-5 border-2 cursor-not-allowed select-none w-full" style={{ borderColor: theme.border, color: theme.textFaint }}>
                      Checkout Locked
                    </div>
                    <p className="text-[10px] font-body mt-3 uppercase tracking-widest" style={{ color: theme.textFaint }}>
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
      <div className="fixed bottom-0 inset-x-0 z-30 lg:hidden border-t-2" style={{ backgroundColor: theme.bg, borderColor: theme.border }}>
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-[10px] font-display font-bold uppercase tracking-widest" style={{ color: theme.textFaint }}>Total</p>
            <p className="text-2xl font-display font-black tabular-nums">UGX {fmt(total)}</p>
          </div>

          {isFormValid ? (
            <motion.a
              href={checkoutHref} target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center gap-3 font-display font-black text-xs uppercase tracking-wide py-4 px-6 text-black shadow-xl"
              style={{ backgroundColor: CTA_COLOR, clipPath: "polygon(0 0, 100% 0, 96% 100%, 0% 100%)" }}
            >
              <ShoppingBasket size={14} strokeWidth={2.5} />
              Checkout
            </motion.a>
          ) : (
            <div className="text-right">
              <div className="inline-flex items-center gap-2 font-display font-bold text-xs uppercase tracking-wide px-5 py-4 border-2 cursor-not-allowed select-none" style={{ borderColor: theme.border, color: theme.textFaint }}>
                Locked
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}