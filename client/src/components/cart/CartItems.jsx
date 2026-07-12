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

const UGANDA_REGIONS = [
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
  <p className="inline-flex items-center gap-2 text-red-600 text-xs font-bold uppercase tracking-[0.15em] mb-4">
    <span className="w-1.5 h-1.5 rounded-full bg-red-600" aria-hidden="true" />
    {children}
  </p>
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

  // Simple Form Validation
  const isFormValid = useMemo(() => {
    return (
      formData.fullName.trim().length > 1 &&
      formData.phone.trim().length >= 9 &&
      formData.address.trim().length > 3
    );
  }, [formData]);

  // Generate checkout text structured like a Jumia invoice
  const checkoutHref = useMemo(() => {
    if (cartItems.length === 0) return null;

    const lines = cartItems
      .map((i) => `• ${i.name} (x${i.quantity}) — UGX ${fmt(i.price * i.quantity)}`)
      .join("\n");

    const deliveryText = shipping === 0 ? "Free" : `UGX ${fmt(shipping)}`;
    
    const message = `Hello GreenPork! I'd like to place an order:\n\n` +
      `👤 *CUSTOMER INFORMATION*\n` +
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
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-24 text-center">
        <div className="w-16 h-16 rounded-2xl bg-stone-50 flex items-center justify-center text-stone-400 mb-6">
          <ShoppingBag size={28} aria-hidden="true" />
        </div>
        <h2 className="text-2xl font-extrabold text-stone-900 tracking-tight">Your cart is empty</h2>
        <p className="text-stone-500 text-sm mt-2 max-w-sm leading-relaxed">
          You haven't added anything delicious yet. Head back to our menu to discover our premium dishes.
        </p>
        <Link
          to="/Products"
          className="inline-flex items-center gap-2 mt-8 bg-red-600 hover:bg-red-700 text-white font-bold text-sm px-7 py-4 rounded-2xl transition-all shadow-xl shadow-red-600/20"
        >
          Browse Menu
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    );
  }

  // ACTIVE CART VIEW
  return (
    <div className="min-h-screen bg-white text-stone-900">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">


        {/* MAIN UNIQUE GRID: Left is Sticky Order Console, Right is wide Billing console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* ── LEFT COLUMN: STICKY ORDER CONSOLE (Col Span 5) ── */}
          <div className="lg:col-span-5 lg:sticky lg:top-12 space-y-6">
            
            {/* Review Items Panel */}
            <div className="bg-stone-50/70 rounded-[2.5rem] p-6 md:p-8 space-y-6">
              <div className="flex items-center justify-between">
                <Eyebrow>Step 1 of 2</Eyebrow>
                <span className="text-xs font-extrabold text-stone-500 bg-white px-2.5 py-1 rounded-lg">
                  {cartItems.length} Selection{cartItems.length !== 1 ? "s" : ""}
                </span>
              </div>

              {/* Items List */}
              <div className="space-y-4 max-h-[340px] overflow-y-auto scrollbar-none pr-1">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 bg-white rounded-2xl p-4 shadow-sm"
                  >
                    {/* Product Image Frame */}
                    <div className="w-14 h-14 rounded-xl bg-stone-50 flex items-center justify-center shrink-0 p-1">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-10 h-10 object-contain"
                      />
                    </div>

                    {/* Product Metadata */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-extrabold text-stone-900 text-sm truncate">{item.name}</h3>
                      <p className="text-stone-400 text-xs mt-0.5">UGX {fmt(item.price)} each</p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2.5 mt-2.5 bg-stone-50 rounded-lg px-2 py-1 w-fit">
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          aria-label={`Decrease quantity of ${item.name}`}
                          className="h-5 w-5 rounded bg-white text-stone-700 shadow-sm flex items-center justify-center hover:bg-stone-100 transition-colors"
                        >
                          <Minus size={10} aria-hidden="true" />
                        </button>
                        <span className="w-4 text-center text-[11px] font-extrabold text-stone-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => increaseQuantity(item.id)}
                          aria-label={`Increase quantity of ${item.name}`}
                          className="h-5 w-5 rounded bg-white text-stone-700 shadow-sm flex items-center justify-center hover:bg-stone-100 transition-colors"
                        >
                          <Plus size={10} aria-hidden="true" />
                        </button>
                      </div>
                    </div>

                    {/* Total Price & Delete button */}
                    <div className="text-right flex flex-col items-end justify-between self-stretch py-0.5">
                      <p className="font-extrabold text-stone-900 text-sm">UGX {fmt(item.price * item.quantity)}</p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        aria-label={`Remove ${item.name} from cart`}
                        className="p-1.5 rounded-xl text-stone-400 hover:text-red-600 hover:bg-red-50/50 transition-colors"
                      >
                        <Trash2 size={14} aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Integrated Price Summary inside the sticky panel */}
              <div className="space-y-3 text-xs text-stone-500 pt-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-stone-900">UGX {fmt(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (18%)</span>
                  <span className="font-bold text-stone-900">UGX {fmt(tax)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Delivery dispatch</span>
                  <span className={`font-bold ${shipping === 0 ? "text-emerald-600" : "text-stone-900"}`}>
                    {shipping === 0 ? "Free" : `UGX ${fmt(shipping)}`}
                  </span>
                </div>

                <div className="h-px bg-stone-200/60 my-4" />

                <div className="flex justify-between items-end">
                  <span className="font-bold text-stone-900 text-sm">Grand Total</span>
                  <span className="text-2xl font-black text-red-600">UGX {fmt(total)}</span>
                </div>
              </div>
            </div>

            {/* Back button link */}
            <Link
              to="/Products"
              className="flex items-center justify-center gap-2 w-full h-12 rounded-2xl bg-stone-50 hover:bg-stone-100 text-stone-600 font-bold text-xs uppercase tracking-widest transition-colors duration-200"
            >
              <ArrowLeft size={14} />
              Continue Shopping
            </Link>
          </div>

          {/* ── RIGHT COLUMN: BILLING & ADDRESS PANEL (Col Span 7) ── */}
          <div className="lg:col-span-7 bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-stone-100/50 space-y-8">
            <div>
              <Eyebrow>Step 2 of 2</Eyebrow>
              <h3 className="text-3xl font-extrabold text-stone-900 tracking-tight">Delivery & Address Details</h3>
              <p className="text-stone-400 mt-2 text-sm">Please provide clear details to facilitate swift, contactless dispatch.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* Full Name */}
              <div className="space-y-2">
                <label htmlFor="fullName" className="flex items-center gap-1.5 text-xs font-bold text-stone-500 uppercase tracking-wider">
                  <User size={13} className="text-red-600" />
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur("fullName")}
                  placeholder="e.g. John Doe"
                  className={`w-full h-12 px-4 rounded-xl text-sm font-medium bg-stone-50 focus:bg-white transition-all outline-none border-none focus:ring-4 focus:ring-red-600/10 ${
                    touched.fullName && formData.fullName.trim().length < 2
                      ? "bg-red-50/50 focus:ring-red-500/20"
                      : ""
                  }`}
                />
                {touched.fullName && formData.fullName.trim().length < 2 && (
                  <p className="text-[11px] text-red-500 font-medium">Please enter your real full name.</p>
                )}
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <label htmlFor="phone" className="flex items-center gap-1.5 text-xs font-bold text-stone-500 uppercase tracking-wider">
                  <Clock size={13} className="text-orange-600" />
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur("phone")}
                  placeholder="e.g. 0776464823"
                  className={`w-full h-12 px-4 rounded-xl text-sm font-medium bg-stone-50 focus:bg-white transition-all outline-none border-none focus:ring-4 focus:ring-red-600/10 ${
                    touched.phone && formData.phone.trim().length < 9
                      ? "bg-red-50/50 focus:ring-red-500/20"
                      : ""
                  }`}
                />
                {touched.phone && formData.phone.trim().length < 9 && (
                  <p className="text-[11px] text-red-500 font-medium">Please enter a valid phone number.</p>
                )}
              </div>

              {/* Delivery Region/City Selection */}
              <div className="space-y-2">
                <label htmlFor="city" className="flex items-center gap-1.5 text-xs font-bold text-stone-500 uppercase tracking-wider">
                  <MapPin size={13} className="text-amber-600" />
                  Region / City
                </label>
                <select
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full h-12 px-3.5 rounded-xl text-sm font-medium bg-stone-50 focus:bg-white transition-all outline-none border-none focus:ring-4 focus:ring-red-600/10"
                >
                  {UGANDA_REGIONS.map((region) => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
              </div>

              {/* Payment Option Selection */}
              <div className="space-y-2">
                <label htmlFor="paymentMethod" className="flex items-center gap-1.5 text-xs font-bold text-stone-500 uppercase tracking-wider">
                  <CreditCard size={13} className="text-red-600" />
                  Payment Method
                </label>
                <select
                  id="paymentMethod"
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleInputChange}
                  className="w-full h-12 px-3.5 rounded-xl text-sm font-medium bg-stone-50 focus:bg-white transition-all outline-none border-none focus:ring-4 focus:ring-red-600/10"
                >
                  <option value="Cash on Delivery">Cash on Delivery</option>
                  <option value="Mobile Money (MTN/Airtel)">Mobile Money</option>
                </select>
              </div>

              {/* Physical Delivery Address */}
              <div className="space-y-2 md:col-span-2">
                <label htmlFor="address" className="flex items-center gap-1.5 text-xs font-bold text-stone-500 uppercase tracking-wider">
                  <MapPin size={13} className="text-amber-600" />
                  Delivery Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur("address")}
                  placeholder="Street name, landmark, gate details, or plot number"
                  className={`w-full h-12 px-4 rounded-xl text-sm font-medium bg-stone-50 focus:bg-white transition-all outline-none border-none focus:ring-4 focus:ring-red-600/10 ${
                    touched.address && formData.address.trim().length <= 3
                      ? "bg-red-50/50 focus:ring-red-500/20"
                      : ""
                  }`}
                />
                {touched.address && formData.address.trim().length <= 3 && (
                  <p className="text-[11px] text-red-500 font-medium">Please provide a clear physical address.</p>
                )}
              </div>

              {/* Additional Delivery Notes */}
              <div className="space-y-2 md:col-span-2">
                <label htmlFor="notes" className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                  Delivery Instructions / Custom Notes (Optional)
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows="2"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="e.g. Leave order with guard, make pork extra crispy, spicy request etc."
                  className="w-full p-4 rounded-xl text-sm font-medium bg-stone-50 focus:bg-white transition-all outline-none border-none focus:ring-4 focus:ring-red-600/10 resize-none"
                />
              </div>
            </div>

            {/* Form submission / CTA row directly at the bottom of the form */}
            <div className="pt-4">
              {isFormValid ? (
                <a
                  href={checkoutHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-14 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm flex items-center justify-center gap-2.5 transition-all duration-200 shadow-xl shadow-red-600/20 hover:scale-[1.01]"
                >
                  Checkout via WhatsApp
                  <ArrowRight size={18} aria-hidden="true" />
                </a>
              ) : (
                <div
                  className="w-full h-14 rounded-2xl bg-stone-100 text-stone-400 font-bold text-xs flex flex-col items-center justify-center gap-1 cursor-not-allowed"
                >
                  <p className="uppercase tracking-widest font-extrabold">Checkout Locked</p>
                  <p className="text-[10px] font-medium text-stone-400 normal-case">Please complete the delivery details first</p>
                </div>
              )}
            </div>

            {/* Platform Guarantees Footer */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-stone-50 text-xs text-stone-500">
              <div className="flex items-center gap-2.5">
                <ShieldCheck size={16} className="text-emerald-600" />
                <span>100% Fresh Farm Quality Guaranteed</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Truck size={16} className="text-red-600" />
                <span>Prompt contactless logistics dispatch</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}