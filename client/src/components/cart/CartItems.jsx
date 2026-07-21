import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Trash2, Minus, Plus, ArrowLeft, ArrowRight, ShoppingBag,
  User, MapPin, CreditCard, ShieldCheck, Truck, Clock, ShoppingBasket
} from "lucide-react";
import { useCart } from "../../components/cart/CartContext.jsx";

// ─── CONFIGURATION ───────────────────────────────────────────────────────────
const WHATSAPP_NUMBER = "256776464823";
const fmt = (n) => Number(n).toLocaleString();

const UG_REGIONS = [
  "Kampala (Central)", "Kira", "Entebbe", "Mukono", "Wakiso", 
  "Nansana", "Makindye", "Lubaga", "Njeru", "Other"
];

// ─── LOCAL SUB-COMPONENTS ────────────────────────────────────────────────────

/** Premium eyebrow — dot + text + line, no borders */
const Eyebrow = ({ children }) => (
  <div className="flex items-center gap-2.5">
    <span className="h-2 w-2 rounded-full bg-[#0edb0e]" aria-hidden="true" />
    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-stone-400">{children}</span>
    <span className="h-px w-8 bg-stone-200/60" aria-hidden="true" />
  </div>
);

const FieldLabel = ({ icon: Icon, required, children }) => (
  <label className="flex items-center gap-1.5 text-[10px] font-bold text-stone-400 uppercase tracking-[0.15em] mb-2">
    {Icon && <Icon size={12} className="text-[#0edb0e]" aria-hidden="true" />}
    {children} {required && <span className="text-red-400">*</span>}
  </label>
);

// ─── MAIN CART COMPONENT ─────────────────────────────────────────────────────
export default function Cart() {
  const {
    cartItems, removeFromCart, increaseQuantity, decreaseQuantity,
    subtotal, shipping, tax, total,
  } = useCart();

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

  // ── EMPTY STATE ──────────────────────────────────────────────────────────
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#F8F8F5] flex flex-col items-center justify-center px-6 py-24 text-center">
        <div className="relative w-24 h-24 flex items-center justify-center mb-10">
          <div className="absolute inset-0 bg-[#0edb0e]/10 rounded-full scale-150 blur-2xl"></div>
          <div className="relative w-20 h-20 rounded-full bg-white flex items-center justify-center text-[#0edb0e] shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
            <ShoppingBag size={32} strokeWidth={1.5} aria-hidden="true" />
          </div>
        </div>
        <h2 className="text-3xl font-black text-stone-900 tracking-tight">Your cart is empty</h2>
        <p className="text-stone-400 text-sm mt-3 max-w-xs leading-relaxed font-medium">
          You haven't added anything delicious yet. Explore our farm-to-table menu.
        </p>
        <Link
          to="/Products"
          className="group mt-10 inline-flex items-center gap-3 bg-stone-900 hover:bg-stone-800 text-white font-bold text-sm pl-5 pr-7 py-4 rounded-full transition-all shadow-xl shadow-stone-900/10 active:scale-[0.98]"
        >
          <span className="bg-[#0edb0e] rounded-full p-2 text-stone-950 transition-colors">
            <ShoppingBasket size={14} aria-hidden="true" />
          </span>
          <span>Browse Menu</span>
        </Link>
      </div>
    );
  }

  // ── ACTIVE CART ──────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#F8F8F5] text-stone-900 pb-32">
      <div className="max-w-6xl mx-auto px-6 py-14 md:py-24">

        {/* Header */}
        <div className="flex items-end justify-between gap-6 mb-16">
          <div>
            <Eyebrow>Checkout</Eyebrow>
            <h1 className="text-4xl md:text-5xl font-black text-stone-900 tracking-tight mt-3">Your Order</h1>
            <p className="text-stone-400 text-sm mt-2 font-medium">
              {cartItems.length} item{cartItems.length !== 1 ? "s" : ""} awaiting dispatch
            </p>
          </div>
          <Link
            to="/Products"
            className="hidden sm:flex items-center gap-2 text-stone-500 hover:text-stone-900 text-xs font-bold uppercase tracking-widest transition-colors bg-white hover:shadow-sm px-4 py-2.5 rounded-full"
          >
            <ArrowLeft size={13} />
            Continue
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

          {/* LEFT COLUMN */}
          <div className="lg:col-span-7 space-y-10">

            {/* ── ITEMS ── */}
            <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex flex-col sm:flex-row sm:items-center gap-5">
                    <div className="flex items-center gap-5 flex-1 min-w-0">
                      <div className="w-20 h-20 rounded-2xl bg-[#F8F8F5] flex items-center justify-center shrink-0 p-2">
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-stone-900 text-base truncate">{item.name}</h3>
                        <p className="text-stone-400 text-xs mt-1 font-medium">UGX {fmt(item.price)} / unit</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-5 pl-10 sm:pl-0">
                      <div className="flex items-center gap-1 bg-[#F8F8F5] rounded-full p-1 shrink-0">
                        <button onClick={() => decreaseQuantity(item.id)} aria-label={`Decrease quantity of ${item.name}`} className="h-8 w-8 rounded-full bg-white text-stone-600 flex items-center justify-center hover:bg-stone-50 transition-colors active:scale-90 shadow-sm">
                          <Minus size={12} strokeWidth={3} aria-hidden="true" />
                        </button>
                        <span className="w-8 text-center text-sm font-black text-stone-800 select-none">{item.quantity}</span>
                        <button onClick={() => increaseQuantity(item.id)} aria-label={`Increase quantity of ${item.name}`} className="h-8 w-8 rounded-full bg-white text-stone-600 flex items-center justify-center hover:bg-stone-50 transition-colors active:scale-90 shadow-sm">
                          <Plus size={12} strokeWidth={3} aria-hidden="true" />
                        </button>
                      </div>

                      <p className="font-black text-stone-900 text-base shrink-0 w-28 text-right tabular-nums">
                        UGX {fmt(item.price * item.quantity)}
                      </p>

                      <button onClick={() => removeFromCart(item.id)} aria-label={`Remove ${item.name} from cart`} className="w-8 h-8 rounded-full text-stone-300 hover:text-red-500 hover:bg-red-50 flex items-center justify-center shrink-0 transition-colors active:scale-90">
                        <Trash2 size={15} aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── DELIVERY DETAILS ── */}
            <div>
              <Eyebrow>Delivery Details</Eyebrow>
              <p className="text-stone-400 mt-3 text-sm font-medium max-w-md">
                Provide details for swift, contactless dispatch.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
                <div className="space-y-1">
                  <FieldLabel icon={User} required>Full Name</FieldLabel>
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} onBlur={() => handleBlur("fullName")} placeholder="e.g. John Doe"
                    className={`w-full h-12 px-4 rounded-xl text-sm font-semibold bg-white transition-all outline-none focus:ring-4 focus:ring-[#0edb0e]/10 focus:bg-white ${touched.fullName && formData.fullName.trim().length < 2 ? "bg-red-50 focus:ring-red-500/10" : "bg-[#F8F8F5]"}`} />
                  {touched.fullName && formData.fullName.trim().length < 2 && (
                    <p className="text-[10px] text-red-500 font-bold tracking-tight mt-1">Please enter your real full name.</p>
                  )}
                </div>

                <div className="space-y-1">
                  <FieldLabel icon={Clock} required>Phone Number</FieldLabel>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} onBlur={() => handleBlur("phone")} placeholder="e.g. 0776464823"
                    className={`w-full h-12 px-4 rounded-xl text-sm font-semibold bg-white transition-all outline-none focus:ring-4 focus:ring-[#0edb0e]/10 focus:bg-white ${touched.phone && formData.phone.trim().length < 9 ? "bg-red-50 focus:ring-red-500/10" : "bg-[#F8F8F5]"}`} />
                  {touched.phone && formData.phone.trim().length < 9 && (
                    <p className="text-[10px] text-red-500 font-bold tracking-tight mt-1">Please enter a valid phone number.</p>
                  )}
                </div>

                <div className="space-y-1">
                  <FieldLabel icon={MapPin}>Region / City</FieldLabel>
                  <select name="city" value={formData.city} onChange={handleInputChange}
                    className="w-full h-12 px-3.5 rounded-xl text-sm font-semibold bg-[#F8F8F5] transition-all outline-none focus:ring-4 focus:ring-[#0edb0e]/10 focus:bg-white cursor-pointer appearance-none">
                    {UG_REGIONS.map((region) => (<option key={region} value={region}>{region}</option>))}
                  </select>
                </div>

                <div className="space-y-1">
                  <FieldLabel icon={CreditCard}>Payment Method</FieldLabel>
                  <select name="paymentMethod" value={formData.paymentMethod} onChange={handleInputChange}
                    className="w-full h-12 px-3.5 rounded-xl text-sm font-semibold bg-[#F8F8F5] transition-all outline-none focus:ring-4 focus:ring-[#0edb0e]/10 focus:bg-white cursor-pointer appearance-none">
                    <option value="Cash on Delivery">Cash on Delivery</option>
                    <option value="Mobile Money (MTN/Airtel)">Mobile Money</option>
                  </select>
                </div>

                <div className="space-y-1 md:col-span-2">
                  <FieldLabel icon={MapPin} required>Delivery Address</FieldLabel>
                  <input type="text" name="address" value={formData.address} onChange={handleInputChange} onBlur={() => handleBlur("address")} placeholder="Street name, landmark, gate details, or plot number"
                    className={`w-full h-12 px-4 rounded-xl text-sm font-semibold bg-white transition-all outline-none focus:ring-4 focus:ring-[#0edb0e]/10 focus:bg-white ${touched.address && formData.address.trim().length <= 3 ? "bg-red-50 focus:ring-red-500/10" : "bg-[#F8F8F5]"}`} />
                  {touched.address && formData.address.trim().length <= 3 && (
                    <p className="text-[10px] text-red-500 font-bold tracking-tight mt-1">Please provide a clear physical address.</p>
                  )}
                </div>

                <div className="space-y-1 md:col-span-2">
                  <label className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.15em] mb-2">Delivery Notes (Optional)</label>
                  <textarea name="notes" rows="2" value={formData.notes} onChange={handleInputChange} placeholder="e.g. Leave order with guard, extra crispy request..."
                    className="w-full p-4 rounded-xl text-sm font-semibold bg-[#F8F8F5] transition-all outline-none focus:ring-4 focus:ring-[#0edb0e]/10 focus:bg-white resize-none" />
                </div>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
                <div className="flex items-center gap-3 bg-white p-4 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                  <span className="h-10 w-10 rounded-xl bg-[#F8F8F5] flex items-center justify-center text-[#0edb0e] flex-shrink-0">
                    <ShieldCheck size={18} aria-hidden="true" />
                  </span>
                  <span className="font-semibold text-stone-700 text-xs">100% Fresh Farm Quality</span>
                </div>
                <div className="flex items-center gap-3 bg-white p-4 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                  <span className="h-10 w-10 rounded-xl bg-[#F8F8F5] flex items-center justify-center text-[#0edb0e] flex-shrink-0">
                    <Truck size={18} aria-hidden="true" />
                  </span>
                  <span className="font-semibold text-stone-700 text-xs">Prompt Contactless Dispatch</span>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Order Summary */}
          <div className="lg:col-span-5 lg:sticky lg:top-10 space-y-6">
            <div className="bg-white rounded-[2rem] p-8 shadow-[0_12px_40px_rgba(0,0,0,0.04)]">
              <div className="flex items-center gap-3 mb-8">
                <span className="h-2 w-2 rounded-full bg-[#0edb0e]" aria-hidden="true" />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-stone-400">Order Summary</span>
                <span className="h-px flex-1 bg-stone-100" aria-hidden="true" />
              </div>

              <div className="space-y-4 text-sm text-stone-500">
                <div className="flex justify-between items-center">
                  <span>Subtotal</span>
                  <span className="font-bold text-stone-800 tabular-nums">UGX {fmt(subtotal)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Tax (18%)</span>
                  <span className="font-bold text-stone-800 tabular-nums">UGX {fmt(tax)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Delivery dispatch</span>
                  <span className={`font-bold tabular-nums ${shipping === 0 ? "text-[#0edb0e]" : "text-stone-800"}`}>
                    {shipping === 0 ? "Free" : `UGX ${fmt(shipping)}`}
                  </span>
                </div>
              </div>

              <div className="h-px bg-stone-100 my-7" />

              <div className="flex items-end justify-between mb-10">
                <span className="text-stone-800 font-bold text-sm">Grand Total</span>
                <span className="text-3xl font-black text-[#0edb0e] tracking-tight tabular-nums">UGX {fmt(total)}</span>
              </div>

              {/* Desktop Checkout Button */}
              <div className="hidden lg:block">
                {isFormValid ? (
                  <a href={checkoutHref} target="_blank" rel="noopener noreferrer"
                    className="group flex items-center justify-center gap-3 bg-stone-900 hover:bg-stone-800 text-white font-bold text-sm uppercase tracking-wide pl-3 pr-7 py-4 rounded-full transition-all shadow-xl shadow-stone-900/10 active:scale-[0.99] w-full">
                    <span className="bg-[#0edb0e] rounded-full p-2.5 text-stone-950 transition-colors">
                      <ShoppingBasket size={15} aria-hidden="true" />
                    </span>
                    <span>Checkout via WhatsApp</span>
                    <ArrowRight size={16} className="ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" aria-hidden="true" />
                  </a>
                ) : (
                  <div className="text-center w-full">
                    <div className="flex items-center justify-center gap-2 bg-stone-100 text-stone-400 font-bold text-xs uppercase tracking-wide px-7 py-4 rounded-full cursor-not-allowed select-none w-full">
                      Checkout Locked
                    </div>
                    <p className="text-[10px] text-stone-400 font-medium mt-3">
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
      <div className="fixed bottom-0 inset-x-0 bg-white/80 backdrop-blur-xl shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-30 lg:hidden">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Total</p>
            <p className="text-xl font-black text-[#0edb0e] tabular-nums">UGX {fmt(total)}</p>
          </div>

          {isFormValid ? (
            <a href={checkoutHref} target="_blank" rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs uppercase tracking-wide pl-3 pr-5 py-3.5 rounded-full transition-all shadow-lg shadow-stone-900/10 active:scale-[0.99]">
              <span className="bg-[#0edb0e] rounded-full p-2 text-stone-950 transition-colors">
                <ShoppingBasket size={13} aria-hidden="true" />
              </span>
              <span>Checkout</span>
            </a>
          ) : (
            <div className="text-right">
              <div className="inline-flex items-center gap-2 bg-stone-100 text-stone-400 font-bold text-xs uppercase tracking-wide px-5 py-3.5 rounded-full cursor-not-allowed select-none">
                Locked
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}