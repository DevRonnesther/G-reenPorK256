import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { Trash2, Minus, Plus, ArrowLeft, ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "../../components/cart/CartContext.jsx";

const WHATSAPP_NUMBER = "256776464823";
const fmt = (n) => Number(n).toLocaleString();

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

  // Generate checkout text with quantities, subtotal, tax, and delivery charges
  const checkoutHref = useMemo(() => {
    if (cartItems.length === 0) return null;

    const lines = cartItems
      .map((i) => `• ${i.name} (x${i.quantity}) — UGX ${fmt(i.price * i.quantity)}`)
      .join("\n");

    const deliveryText = shipping === 0 ? "Free" : `UGX ${fmt(shipping)}`;
    const message = `Hello EverGrill! I'd like to order:\n\n${lines}\n\nSubtotal: UGX ${fmt(subtotal)}\nTax (18%): UGX ${fmt(tax)}\nDelivery: ${deliveryText}\n\nTotal: UGX ${fmt(total)}`;

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }, [cartItems, subtotal, tax, shipping, total]);

  if (cartItems.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-5 py-24 text-center flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-2xl bg-stone-100 flex items-center justify-center text-stone-400 mb-5">
          <ShoppingBag size={28} aria-hidden="true" />
        </div>
        <h2 className="text-2xl font-black text-stone-900 tracking-tight">Your cart is empty</h2>
        <p className="text-stone-500 text-sm mt-2 max-w-sm">
          You haven't added anything delicious yet. Head back to our menu to discover our premium dishes.
        </p>
        <Link
          to="/Products"
          className="inline-flex items-center gap-2 mt-6 bg-stone-900 hover:bg-stone-800 text-white font-bold text-sm px-6 py-3.5 rounded-2xl transition-all duration-200 shadow-md"
        >
          Browse Menu
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50/50 text-stone-900">
      <div className="max-w-2xl mx-auto px-5 py-10">

        {/* Header / Back Link */}
        <div className="mb-6">
          <Link
            to="/Products"
            className="inline-flex items-center gap-2 text-stone-400 hover:text-stone-900 transition-colors duration-200 group text-xs uppercase tracking-widest font-bold"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" aria-hidden="true" />
            Back to menu
          </Link>
          <h2 className="text-3xl font-black text-stone-950 mt-4 tracking-tight">Your Cart</h2>
        </div>

        {/* Cart Item Cards */}
        <div className="space-y-3">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 bg-white border border-stone-100/80 rounded-3xl p-4 transition-all duration-200 hover:border-orange-100"
            >
              {/* Product Image container */}
              <div className="w-16 h-16 rounded-2xl bg-stone-50 border border-stone-100/50 flex items-center justify-center shrink-0 p-1">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 object-contain"
                />
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-stone-900 text-sm truncate">{item.name}</h3>
                <p className="text-stone-400 text-xs mt-0.5">UGX {fmt(item.price)} each</p>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2.5 mt-2.5 bg-stone-100/80 rounded-xl px-2 py-1 w-fit">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    aria-label={`Decrease quantity of ${item.name}`}
                    className="h-6 w-6 rounded-lg bg-white text-stone-700 shadow-sm flex items-center justify-center hover:bg-stone-50 active:scale-95 transition-all"
                  >
                    <Minus size={11} aria-hidden="true" />
                  </button>
                  <span className="w-5 text-center text-xs font-black text-stone-800" aria-live="polite">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => increaseQuantity(item.id)}
                    aria-label={`Increase quantity of ${item.name}`}
                    className="h-6 w-6 rounded-lg bg-white text-stone-700 shadow-sm flex items-center justify-center hover:bg-stone-50 active:scale-95 transition-all"
                  >
                    <Plus size={11} aria-hidden="true" />
                  </button>
                </div>
              </div>

              {/* Total Price & Delete button */}
              <div className="text-right flex flex-col items-end justify-between self-stretch py-0.5">
                <p className="font-black text-stone-900 text-sm">UGX {fmt(item.price * item.quantity)}</p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  aria-label={`Remove ${item.name} from cart`}
                  className="p-1.5 rounded-xl text-stone-400 hover:text-red-500 hover:bg-red-50/50 transition-all duration-200"
                >
                  <Trash2 size={15} aria-hidden="true" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary & Checkout Card */}
        <div className="mt-8 bg-white border border-stone-100 rounded-3xl p-6 shadow-sm">
          <h3 className="font-black text-stone-900 text-base mb-4">Order Summary</h3>
          <div className="space-y-3 text-sm text-stone-500">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-bold text-stone-950">UGX {fmt(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (18%)</span>
              <span className="font-bold text-stone-950">UGX {fmt(tax)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Delivery</span>
              <span className={`font-bold ${shipping === 0 ? "text-green-600" : "text-stone-950"}`}>
                {shipping === 0 ? "Free" : `UGX ${fmt(shipping)}`}
              </span>
            </div>

            <div className="border-t border-stone-100 pt-4 mt-2 flex justify-between items-end">
              <span className="font-bold text-stone-950 text-base">Grand Total</span>
              <span className="text-2xl font-black text-orange-600">UGX {fmt(total)}</span>
            </div>
          </div>

          {/* Checkout Button */}
          <a
            href={checkoutHref}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-14 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-black text-sm flex items-center justify-center gap-2.5 transition-all duration-200 shadow-lg shadow-orange-500/20 mt-6 hover:scale-[1.01]"
          >
            Checkout via WhatsApp
            <ArrowRight size={18} aria-hidden="true" />
          </a>
        </div>

      </div>
    </div>
  );
}