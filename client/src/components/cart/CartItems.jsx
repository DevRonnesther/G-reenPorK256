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
const Eyebrow = ({ children }) => (
  <span className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
    {children}
  </span>
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

  // Handle Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  // Form Validation
  const isFormValid = useMemo(() => {
    return (
      formData.fullName.trim().length > 1 &&
      formData.phone.trim().length >= 9 &&
      formData.address.trim().length > 3
    );
  }, [formData]);

  // Generate checkout text structured like an invoice
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

  // EMPTY STATE VIEW
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] flex flex-col items-center justify-center px-6 py-24 text-center">
        <div className="w-20 h-20 rounded-3xl bg-white shadow-xl shadow-stone-200/50 flex items-center justify-center text-[#0edb0e] mb-8">
          <ShoppingBag size={32} strokeWidth={1.5} aria-hidden="true" />
        </div>
        <h2 className="text-3xl font-extrabold text-stone-900 tracking-tight">Your cart is resting empty</h2>
        <p className="text-stone-500 text-sm mt-3 max-w-sm leading-relaxed font-medium">
          You haven't added anything delicious yet. Head back to our farm-to-table menu to discover premium cuts.
        </p>
        <Link
          to="/Products"
          className="inline-flex items-center gap-2 mt-8 bg-[#0edb0e] hover:bg-emerald-700 text-white font-bold text-sm px-8 py-4 rounded-2xl transition-all duration-200 shadow-lg shadow-[#0edb0e]/10 active:scale-[0.98]"
        >
          Browse Menu
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    );
  }

  // ACTIVE CART VIEW
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-stone-900">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">

          {/* ── LEFT COLUMN: CART SUMMARY PANEL (Col Span 5) ── */}
          <div className="lg:col-span-5 lg:sticky lg:top-8 space-y-6">

            <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-xl shadow-stone-200/40 space-y-6">
              <div className="flex items-center justify-between">
                <Eyebrow>Step 1 of 2</Eyebrow>
                <span className="text-xs font-bold text-stone-500 bg-stone-100 px-3 py-1 rounded-full">
                  {cartItems.length} Selection{cartItems.length !== 1 ? "s" : ""}
                </span>
              </div>

              {/* Items List */}
              <div className="space-y-4 max-h-[420px] overflow-y-auto scrollbar-none pr-1">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="relative flex items-center gap-4 bg-stone-50/50 rounded-2xl p-4 transition-all duration-200 hover:bg-stone-50"
                  >
                    {/* Product Image Frame */}
                    <div className="w-16 h-16 rounded-xl bg-white flex items-center justify-center shrink-0 p-1 shadow-sm">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain rounded-lg"
                      />
                    </div>

                    {/* Product Details & Actions */}
                    <div className="flex-1 min-w-0 flex flex-col h-full justify-between">

                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h3 className="font-bold text-stone-900 text-sm sm:text-base truncate">
                            {item.name}
                          </h3>
                          <p className="text-stone-400 text-xs mt-0.5 font-medium">
                            UGX {fmt(item.price)} / unit
                          </p>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          aria-label={`Remove ${item.name} from cart`}
                          className="w-8 h-8 rounded-lg bg-stone-100 hover:bg-red-50 text-stone-400 hover:text-red-500 flex items-center justify-center shrink-0 transition-all duration-200"
                        >
                          <Trash2 size={13} strokeWidth={2.5} aria-hidden="true" />
                        </button>
                      </div>

                      {/* Bottom Row: Quantity Controls & Subtotal */}
                      <div className="flex items-center justify-between mt-3 pt-3">

                        {/* Quantity Control Pill */}
                        <div className="flex items-center gap-1.5 bg-stone-100/80 rounded-xl p-1">
                          <button
                            onClick={() => decreaseQuantity(item.id)}
                            aria-label={`Decrease quantity of ${item.name}`}
                            className="h-6 w-6 rounded-lg bg-white text-stone-700 shadow-sm flex items-center justify-center hover:bg-stone-50 transition-colors"
                          >
                            <Minus size={10} strokeWidth={3} aria-hidden="true" />
                          </button>
                          <span className="w-6 text-center text-xs font-black text-stone-800 select-none">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => increaseQuantity(item.id)}
                            aria-label={`Increase quantity of ${item.name}`}
                            className="h-6 w-6 rounded-lg bg-white text-stone-700 shadow-sm flex items-center justify-center hover:bg-stone-50 transition-colors"
                          >
                            <Plus size={10} strokeWidth={3} aria-hidden="true" />
                          </button>
                        </div>

                        {/* Item Total */}
                        <p className="font-bold text-[#0edb0e] text-sm sm:text-base">
                          UGX {fmt(item.price * item.quantity)}
                        </p>

                      </div>

                    </div>
                  </div>
                ))}
              </div>

              {/* Subtotal & Totals breakdown */}
              <div className="space-y-3.5 text-xs text-stone-500 pt-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-stone-800">UGX {fmt(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (18%)</span>
                  <span className="font-semibold text-stone-800">UGX {fmt(tax)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Delivery dispatch</span>
                  <span className={`font-semibold ${shipping === 0 ? "text-[#0edb0e]" : "text-stone-800"}`}>
                    {shipping === 0 ? "Free" : `UGX ${fmt(shipping)}`}
                  </span>
                </div>

                <div className="flex justify-between items-end pt-4">
                  <span className="font-bold text-stone-800 text-sm">Grand Total</span>
                  <span className="text-2xl font-black text-[#0edb0e]">UGX {fmt(total)}</span>
                </div>
              </div>
            </div>

            {/* Back button */}
            <Link
              to="/Products"
              className="flex items-center justify-center gap-2 w-full h-12 rounded-2xl bg-white hover:bg-stone-50 text-stone-500 font-bold text-xs uppercase tracking-widest transition-all duration-200 shadow-sm shadow-stone-200/50"
            >
              <ArrowLeft size={14} />
              Continue Shopping
            </Link>
          </div>

          {/* ── RIGHT COLUMN: BILLING & ADDRESS PANEL (Col Span 7) ── */}
          <div className="lg:col-span-7 bg-white rounded-[2rem] p-8 md:p-10 shadow-xl shadow-stone-200/40 space-y-8">
            <div>
              <Eyebrow>Step 2 of 2</Eyebrow>
              <h3 className="text-3xl font-extrabold text-stone-900 tracking-tight mt-3">Delivery details</h3>
              <p className="text-stone-400 mt-1.5 text-sm font-medium">Please provide details to facilitate swift, contactless dispatch.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* Full Name */}
              <div className="space-y-2">
                <label htmlFor="fullName" className="flex items-center gap-1.5 text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                  <User size={13} className="text-[#0edb0e]" />
                  Full Name <span className="text-orange-500">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur("fullName")}
                  placeholder="e.g. John Doe"
                  className={`w-full h-12 px-4 rounded-xl text-sm font-semibold bg-stone-100/70 focus:bg-white transition-all outline-none focus:ring-4 focus:ring-emerald-500/10 ${touched.fullName && formData.fullName.trim().length < 2
                    ? "bg-orange-50 focus:ring-orange-500/10"
                    : ""
                    }`}
                />
                {touched.fullName && formData.fullName.trim().length < 2 && (
                  <p className="text-[10px] text-orange-600 font-bold tracking-tight">Please enter your real full name.</p>
                )}
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <label htmlFor="phone" className="flex items-center gap-1.5 text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                  <Clock size={13} className="text-[#0edb0e]" />
                  Phone Number <span className="text-orange-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur("phone")}
                  placeholder="e.g. 0776464823"
                  className={`w-full h-12 px-4 rounded-xl text-sm font-semibold bg-stone-100/70 focus:bg-white transition-all outline-none focus:ring-4 focus:ring-emerald-500/10 ${touched.phone && formData.phone.trim().length < 9
                    ? "bg-orange-50 focus:ring-orange-500/10"
                    : ""
                    }`}
                />
                {touched.phone && formData.phone.trim().length < 9 && (
                  <p className="text-[10px] text-orange-600 font-bold tracking-tight">Please enter a valid phone number.</p>
                )}
              </div>

              {/* Delivery Region Selection */}
              <div className="space-y-2">
                <label htmlFor="city" className="flex items-center gap-1.5 text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                  <MapPin size={13} className="text-[#0edb0e]" />
                  Region / City
                </label>
                <select
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full h-12 px-3.5 rounded-xl text-sm font-semibold bg-stone-100/70 focus:bg-white transition-all outline-none focus:ring-4 focus:ring-emerald-500/10 cursor-pointer appearance-none"
                >
                  {UG_REGIONS.map((region) => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
              </div>

              {/* Payment Option Selection */}
              <div className="space-y-2">
                <label htmlFor="paymentMethod" className="flex items-center gap-1.5 text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                  <CreditCard size={13} className="text-[#0edb0e]" />
                  Payment Method
                </label>
                <select
                  id="paymentMethod"
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleInputChange}
                  className="w-full h-12 px-3.5 rounded-xl text-sm font-semibold bg-stone-100/70 focus:bg-white transition-all outline-none focus:ring-4 focus:ring-emerald-500/10 cursor-pointer appearance-none"
                >
                  <option value="Cash on Delivery">Cash on Delivery</option>
                  <option value="Mobile Money (MTN/Airtel)">Mobile Money</option>
                </select>
              </div>

              {/* Physical Delivery Address */}
              <div className="space-y-2 md:col-span-2">
                <label htmlFor="address" className="flex items-center gap-1.5 text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                  <MapPin size={13} className="text-[#0edb0e]" />
                  Delivery Address <span className="text-orange-500">*</span>
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur("address")}
                  placeholder="Street name, landmark, gate details, or plot number"
                  className={`w-full h-12 px-4 rounded-xl text-sm font-semibold bg-stone-100/70 focus:bg-white transition-all outline-none focus:ring-4 focus:ring-emerald-500/10 ${touched.address && formData.address.trim().length <= 3
                    ? "bg-orange-50 focus:ring-orange-500/10"
                    : ""
                    }`}
                />
                {touched.address && formData.address.trim().length <= 3 && (
                  <p className="text-[10px] text-orange-600 font-bold tracking-tight">Please provide a clear physical address.</p>
                )}
              </div>

              {/* Additional Delivery Notes */}
              <div className="space-y-2 md:col-span-2">
                <label htmlFor="notes" className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                  Delivery Instructions / Custom Notes (Optional)
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows="2"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="e.g. Leave order with guard, make pork extra crispy, spicy request etc."
                  className="w-full p-4 rounded-xl text-sm font-semibold bg-stone-100/70 focus:bg-white transition-all outline-none focus:ring-4 focus:ring-emerald-500/10 resize-none"
                />
              </div>
            </div>

            {/* Submit Bar */}
            <div className="pt-4">
              {isFormValid ? (
                <a
                  href={checkoutHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-14 rounded-2xl bg-[#0edb0e] hover:bg-emerald-700 text-white font-extrabold text-sm flex items-center justify-center gap-2 transition-all duration-200 shadow-xl shadow-[#0edb0e]/15 active:scale-[0.99]"
                >
                  Checkout via WhatsApp
                  <ArrowRight size={18} aria-hidden="true" />
                </a>
              ) : (
                <div
                  className="w-full h-14 rounded-2xl bg-stone-50 text-stone-400 font-bold text-xs flex flex-col items-center justify-center gap-0.5 cursor-not-allowed select-none"
                >
                  <p className="uppercase tracking-widest font-black text-[10px]">Checkout Locked</p>
                  <p className="text-[9px] font-medium text-stone-400 normal-case">Please complete the delivery details above</p>
                </div>
              )}
            </div>

            {/* Platform Guarantees Footer */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 text-xs text-stone-400">
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-[#0edb0e]" />
                <span className="font-medium">100% Fresh Farm Quality Guaranteed</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck size={16} className="text-[#0edb0e]" />
                <span className="font-medium">Prompt contactless logistics dispatch</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}