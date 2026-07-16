import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Trash2, Minus, Plus, ArrowLeft, ArrowRight, ShoppingBag,
  User, MapPin, CreditCard, ShieldCheck, Truck, Clock
} from "lucide-react";
import { useCart } from "../../components/cart/CartContext.jsx";

// ─── CONFIGURATION ───────────────────────────────────────────────────────────
const WHATSAPP_NUMBER = "256776464823";
const fmt = (n) => Number(n).toLocaleString();

const UG_REGIONS = [
  "Kampala (Central)",
  "Kira",
  "Entebbe",
  "Mukono",
  "Wakiso",
  "Nansana",
  "Makindye",
  "Lubaga",
  "Njeru",
  "Other"
];

// ─── LOCAL SUB-COMPONENTS ────────────────────────────────────────────────────

/** Shared eyebrow — dot + tracking-[0.2em] label, same treatment as Hero / Products / About */
const Eyebrow = ({ children }) => (
  <div className="flex items-center gap-2">
    <span className="h-2 w-2 rounded-full bg-[#0edb0e]" aria-hidden="true" />
    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-stone-500">{children}</span>
    <span className="h-px w-10 bg-stone-300" aria-hidden="true" />
  </div>
);

const FieldLabel = ({ icon: Icon, required, children }) => (
  <label className="flex items-center gap-1.5 text-[11px] font-bold text-stone-400 uppercase tracking-wider">
    {Icon && <Icon size={13} className="text-[#0edb0e]" aria-hidden="true" />}
    {children} {required && <span className="text-yellow-500">*</span>}
  </label>
);

// ─── MAIN CART COMPONENT ─────────────────────────────────────────────────────
export default function Cart() {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    subtotal,
    shipping,
    tax,
    total,
  } = useCart();

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    city: "Kampala (Central)",
    address: "",
    paymentMethod: "Cash on Delivery",
    notes: ""
  });

  const [touched, setTouched] = useState({
    fullName: false,
    phone: false,
    address: false
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const isFormValid = useMemo(() => {
    return (
      formData.fullName.trim().length > 1 &&
      formData.phone.trim().length >= 9 &&
      formData.address.trim().length > 3
    );
  }, [formData]);

  // Torn-ticket edge for the order summary — the page's one signature element
  const ticketClip = useMemo(() => {
    const teeth = 22;
    const top = [];
    for (let i = 0; i <= teeth; i++) {
      const x = (i / teeth) * 100;
      const y = i % 2 === 0 ? 0 : 7;
      top.push(`${x}% ${y}%`);
    }
    return `polygon(${top.join(", ")}, 100% 100%, 0% 100%)`;
  }, []);

  const checkoutHref = useMemo(() => {
    if (cartItems.length === 0) return null;

    const lines = cartItems
      .map((i) => `• ${i.name} (x${i.quantity}) — UGX ${fmt(i.price * i.quantity)}`)
      .join("\n");

    const deliveryText = shipping === 0 ? "Free" : `UGX ${fmt(shipping)}`;

    const message = `Hello GreenPork! I'd like to place an order:\n\n` +
      `👤 *CUSTOMER INFORMATION* \n` +
      `-------------------------\n` +
      `Name: ${formData.fullName}\n` +
      `Phone: ${formData.phone}\n` +
      `Region/City: ${formData.city}\n` +
      `Delivery Address: ${formData.address}\n` +
      `Payment Option: ${formData.paymentMethod}\n` +
      `Delivery Note: ${formData.notes || "None"}\n\n` +
      `🛒 *ORDER DETAIL*\n` +
      `-----------------\n` +
      `${lines}\n\n` +
      `📊 *SUMMARY*\n` +
      `------------\n` +
      `Subtotal: UGX ${fmt(subtotal)}\n` +
      `Tax (18%): UGX ${fmt(tax)}\n` +
      `Delivery Fee: ${deliveryText}\n\n` +
      `💰 *Grand Total: UGX ${fmt(total)}*`;

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }, [cartItems, subtotal, tax, shipping, total, formData]);

  // ── EMPTY STATE ──────────────────────────────────────────────────────────
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-24 text-center">
        <div className="w-20 h-20 rounded-full bg-stone-50 flex items-center justify-center text-[#0edb0e] mb-8">
          <ShoppingBag size={32} strokeWidth={1.5} aria-hidden="true" />
        </div>
        <h2 className="text-3xl font-extrabold text-stone-900 tracking-tight">Your cart is resting empty</h2>
        <p className="text-stone-500 text-sm mt-3 max-w-sm leading-relaxed font-medium">
          You haven't added anything delicious yet. Head back to our farm-to-table menu to discover premium cuts.
        </p>
        <Link
          to="/Products"
          className="inline-flex items-center gap-2 mt-8 bg-[#0edb0e] hover:bg-[#0bc50b] text-white font-bold text-sm uppercase tracking-wide px-8 py-4 rounded-full transition-colors shadow-lg shadow-[#0edb0e]/15 active:scale-[0.98]"
        >
          Browse Menu
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    );
  }

  // ── ACTIVE CART — double-column layout ─────────────────────────────────────
  return (
    <div className="min-h-screen bg-white text-stone-900 pb-32">
      <div className="max-w-6xl mx-auto px-6 py-14 md:py-20">

        {/* Header */}
        <div className="flex items-start justify-between gap-6 mb-12">
          <div>
            <Eyebrow>Checkout</Eyebrow>
            <h1 className="text-3xl md:text-4xl font-black text-stone-900 tracking-tight mt-3">Your Order</h1>
            <p className="text-stone-400 text-sm mt-1.5 font-medium">
              {cartItems.length} item{cartItems.length !== 1 ? "s" : ""} · review and confirm delivery below
            </p>
          </div>
          <Link
            to="/Products"
            className="hidden sm:inline-flex items-center gap-1.5 text-stone-400 hover:text-stone-900 text-xs font-bold uppercase tracking-widest transition-colors shrink-0 mt-2"
          >
            <ArrowLeft size={13} />
            Continue Shopping
          </Link>
        </div>

        {/* Responsive Grid System (Mobile: 1 column, Desktop: 12 columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

          {/* LEFT COLUMN: Item list & Delivery Form */}
          <div className="lg:col-span-7 space-y-12">

            {/* ── ITEMS ── */}
            <div>
              <div className="divide-y divide-stone-100">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 py-5">
                    <div className="w-16 h-16 rounded-2xl bg-stone-50 flex items-center justify-center shrink-0 p-1">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-stone-900 text-sm sm:text-base truncate">{item.name}</h3>
                      <p className="text-stone-400 text-xs mt-0.5 font-medium">UGX {fmt(item.price)} / unit</p>
                    </div>

                    {/* Quantity pill (Hidden on mobile inside items row) */}
                    <div className="hidden sm:flex items-center gap-1.5 bg-stone-50 rounded-full p-1 shrink-0">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        aria-label={`Decrease quantity of ${item.name}`}
                        className="h-7 w-7 rounded-full bg-white text-stone-700 shadow-sm flex items-center justify-center hover:bg-stone-100 transition-colors"
                      >
                        <Minus size={11} strokeWidth={3} aria-hidden="true" />
                      </button>
                      <span className="w-6 text-center text-xs font-black text-stone-800 select-none">{item.quantity}</span>
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        aria-label={`Increase quantity of ${item.name}`}
                        className="h-7 w-7 rounded-full bg-white text-stone-700 shadow-sm flex items-center justify-center hover:bg-stone-100 transition-colors"
                      >
                        <Plus size={11} strokeWidth={3} aria-hidden="true" />
                      </button>
                    </div>

                    <p className="font-black text-stone-900 text-sm sm:text-base shrink-0 w-24 sm:w-28 text-right">
                      UGX {fmt(item.price * item.quantity)}
                    </p>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      aria-label={`Remove ${item.name} from cart`}
                      className="w-8 h-8 rounded-full text-stone-300 hover:text-[#0edb0e] hover:bg-[#0edb0e]/5 flex items-center justify-center shrink-0 transition-colors"
                    >
                      <Trash2 size={14} aria-hidden="true" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Mobile-only quantity controls row (aligned underneath on small screens) */}
              <div className="sm:hidden -mt-2 mb-2 space-y-3">
                {cartItems.map((item) => (
                  <div key={`m-${item.id}`} className="flex items-center justify-between px-1">
                    <span className="text-xs text-stone-400 font-medium truncate max-w-[50%]">{item.name}</span>
                    <div className="flex items-center gap-1.5 bg-stone-50 rounded-full p-1">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        aria-label={`Decrease quantity of ${item.name}`}
                        className="h-7 w-7 rounded-full bg-white text-stone-700 shadow-sm flex items-center justify-center"
                      >
                        <Minus size={11} strokeWidth={3} aria-hidden="true" />
                      </button>
                      <span className="w-6 text-center text-xs font-black text-stone-800 select-none">{item.quantity}</span>
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        aria-label={`Increase quantity of ${item.name}`}
                        className="h-7 w-7 rounded-full bg-white text-stone-700 shadow-sm flex items-center justify-center"
                      >
                        <Plus size={11} strokeWidth={3} aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── DELIVERY DETAILS ── */}
            <div className="border-t border-stone-100 pt-10">
              <Eyebrow>Delivery Details</Eyebrow>
              <p className="text-stone-400 mt-3 text-sm font-medium max-w-md">
                Please provide details to facilitate swift, contactless dispatch.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
                <div className="space-y-2">
                  <FieldLabel icon={User} required>Full Name</FieldLabel>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur("fullName")}
                    placeholder="e.g. John Doe"
                    className={`w-full h-12 px-4 rounded-xl text-sm font-semibold bg-stone-50 focus:bg-white transition-all outline-none focus:ring-4 focus:ring-[#0edb0e]/10 ${touched.fullName && formData.fullName.trim().length < 2 ? "bg-yellow-50 focus:ring-yellow-500/10" : ""
                      }`}
                  />
                  {touched.fullName && formData.fullName.trim().length < 2 && (
                    <p className="text-[10px] text-red-600 font-bold tracking-tight">Please enter your real full name.</p>
                  )}
                </div>

                <div className="space-y-2">
                  <FieldLabel icon={Clock} required>Phone Number</FieldLabel>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur("phone")}
                    placeholder="e.g. 0776464823"
                    className={`w-full h-12 px-4 rounded-xl text-sm font-semibold bg-stone-50 focus:bg-white transition-all outline-none focus:ring-4 focus:ring-[#0edb0e]/10 ${touched.phone && formData.phone.trim().length < 9 ? "bg-yellow-50 focus:ring-yellow-500/10" : ""
                      }`}
                  />
                  {touched.phone && formData.phone.trim().length < 9 && (
                    <p className="text-[10px] text-red-600 font-bold tracking-tight">Please enter a valid phone number.</p>
                  )}
                </div>

                <div className="space-y-2">
                  <FieldLabel icon={MapPin}>Region / City</FieldLabel>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full h-12 px-3.5 rounded-xl text-sm font-semibold bg-stone-50 focus:bg-white transition-all outline-none focus:ring-4 focus:ring-[#0edb0e]/10 cursor-pointer appearance-none"
                  >
                    {UG_REGIONS.map((region) => (
                      <option key={region} value={region}>{region}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <FieldLabel icon={CreditCard}>Payment Method</FieldLabel>
                  <select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleInputChange}
                    className="w-full h-12 px-3.5 rounded-xl text-sm font-semibold bg-stone-50 focus:bg-white transition-all outline-none focus:ring-4 focus:ring-[#0edb0e]/10 cursor-pointer appearance-none"
                  >
                    <option value="Cash on Delivery">Cash on Delivery</option>
                    <option value="Mobile Money (MTN/Airtel)">Mobile Money</option>
                  </select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <FieldLabel icon={MapPin} required>Delivery Address</FieldLabel>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur("address")}
                    placeholder="Street name, landmark, gate details, or plot number"
                    className={`w-full h-12 px-4 rounded-xl text-sm font-semibold bg-stone-50 focus:bg-white transition-all outline-none focus:ring-4 focus:ring-[#0edb0e]/10 ${touched.address && formData.address.trim().length <= 3 ? "bg-yellow-50 focus:ring-yellow-500/10" : ""
                      }`}
                  />
                  {touched.address && formData.address.trim().length <= 3 && (
                    <p className="text-[10px] text-red-600 font-bold tracking-tight">Please provide a clear physical address.</p>
                  )}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                    Delivery Instructions / Custom Notes (Optional)
                  </label>
                  <textarea
                    name="notes"
                    rows="2"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="e.g. Leave order with guard, make pork extra crispy, spicy request etc."
                    className="w-full p-4 rounded-xl text-sm font-semibold bg-stone-50 focus:bg-white transition-all outline-none focus:ring-4 focus:ring-[#0edb0e]/10 resize-none"
                  />
                </div>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10 text-xs text-stone-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-[#0edb0e]" aria-hidden="true" />
                  <span className="font-medium">100% Fresh Farm Quality Guaranteed</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck size={16} className="text-[#0edb0e]" aria-hidden="true" />
                  <span className="font-medium">Prompt contactless logistics dispatch</span>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Order Summary (Sticky) & Checkout Actions */}
          <div className="lg:col-span-5 lg:sticky lg:top-10 space-y-6">

            {/* TORN-TICKET ORDER SUMMARY */}
            <div className="relative">
              <div
                style={{ clipPath: ticketClip }}
                className="bg-stone-900 text-white rounded-b-[2rem] pt-10 pb-8 px-8 md:px-10"
              >
                <div className="space-y-3 text-sm text-white/60 max-w-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-white">UGX {fmt(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (18%)</span>
                    <span className="font-semibold text-white">UGX {fmt(tax)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery dispatch</span>
                    <span className={`font-semibold ${shipping === 0 ? "text-yellow-400" : "text-white"}`}>
                      {shipping === 0 ? "Free" : `UGX ${fmt(shipping)}`}
                    </span>
                  </div>
                </div>

                <div className="flex items-end justify-between mt-6 pt-6 border-t border-white/10">
                  <span className="text-white/70 font-bold text-sm">Grand Total</span>
                  <span className="text-3xl font-black text-yellow-400">UGX {fmt(total)}</span>
                </div>
              </div>
            </div>

            {/* Desktop Checkout Panel — Displays below the ticket summary on wide displays */}
            <div className="hidden lg:block bg-stone-50 border border-stone-100 rounded-2xl p-6">
              {isFormValid ? (
                <a
                  href={checkoutHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#0edb0e] hover:bg-[#0bc50b] text-white font-bold text-sm uppercase tracking-wide px-7 py-4 rounded-xl transition-colors shadow-lg shadow-[#0edb0e]/20 active:scale-[0.99] w-full text-center"
                >
                  Checkout via WhatsApp
                  <ArrowRight size={16} aria-hidden="true" />
                </a>
              ) : (
                <div className="text-center w-full">
                  <div className="flex items-center justify-center gap-2 bg-stone-100 text-stone-400 font-bold text-xs uppercase tracking-wide px-7 py-4 rounded-xl cursor-not-allowed select-none w-full">
                    Checkout Locked
                  </div>
                  <p className="text-[10px] text-stone-400 font-medium mt-2">
                    Complete the required delivery details on the left to checkout.
                  </p>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

      {/* ── STICKY CHECKOUT BAR (Mobile & Tablet Viewports Only) ── */}
      <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md shadow-[0_-12px_30px_rgba(0,0,0,0.06)] z-30 lg:hidden">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Grand Total</p>
            <p className="text-xl font-black text-stone-900">UGX {fmt(total)}</p>
          </div>

          {isFormValid ? (
            <a
              href={checkoutHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#0edb0e] hover:bg-[#0bc50b] text-white font-bold text-sm uppercase tracking-wide px-7 py-3.5 rounded-full transition-colors shadow-lg shadow-[#0edb0e]/20 active:scale-[0.99]"
            >
              Checkout via WhatsApp
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          ) : (
            <div className="text-right">
              <div className="inline-flex items-center gap-2 bg-stone-100 text-stone-400 font-bold text-xs uppercase tracking-wide px-7 py-3.5 rounded-full cursor-not-allowed select-none">
                Checkout Locked
              </div>
              <p className="text-[10px] text-stone-400 font-medium mt-1 hidden sm:block">Complete the delivery details above</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}