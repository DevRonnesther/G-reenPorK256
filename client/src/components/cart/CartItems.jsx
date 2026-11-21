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
  Leaf,
  ShoppingBasket,
  Flame,
} from "lucide-react";
import { useCart } from "../../components/cart/CartContext.jsx";

/* ───────────── CONFIG + DESIGN TOKENS ───────────── */
const BRAND_NAME = "Greenpork";
const SLOGAN = "Eat Fresh. Live Happy.";
const FREE_DELIVERY_THRESHOLD = 50000;
const WHATSAPP_NUMBER = "256776464823";

const PALETTE = {
  red: "#E11D1D",
  lime: "#D9FF00",
  orange: "#E65C00",
  ink: "#111111",
  charcoal: "#2A2A2A",
  muted: "#4A4A4A",
  surface: "#F5F5F5",
  surfaceHover: "#EFEFEF",
  white: "#FFFFFF",
  success: "#059669",
};

const REGIONS = [
  "Gulu City",
  "Kampala (Central)",
  "Kira",
  "Entebbe",
  "Mukono",
  "Wakiso",
  "Nansana",
  "Makindye",
  "Lubaga",
  "Other",
];

const EASE = [0.16, 1, 0.3, 1];
const SPRING = { type: "spring", stiffness: 220, damping: 26 };

const hoverTap = (hover = 1.03, tap = 0.97) => ({
  whileHover: { scale: hover },
  whileTap: { scale: tap },
  transition: SPRING,
});

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20, filter: "blur(6px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: EASE, delay },
  },
  exit: {
    opacity: 0,
    y: -12,
    filter: "blur(6px)",
    transition: { duration: 0.25 },
  },
});

const fmt = (n) => Number(n).toLocaleString();
const cx = (...c) => c.filter(Boolean).join(" ");
const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111]";
const pillBtn =
  "flex items-center justify-center gap-2 rounded-full border-0 font-display text-xs font-black uppercase tracking-wide transition-colors";

const FontStyles = React.memo(() => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@600;700;800;900&family=Inter:wght@400;500;600;700&display=swap');
    .font-display { font-family: 'Archivo', sans-serif; }
    .font-body { font-family: 'Inter', sans-serif; }
    .cart-scroll::-webkit-scrollbar { width: 4px; }
    .cart-scroll::-webkit-scrollbar-track { background: transparent; }
    .cart-scroll::-webkit-scrollbar-thumb { background: rgba(17,17,17,0.16); border-radius: 99px; }
  `}</style>
));

const CtaButton = React.memo(({ href, disabled, children, className, small }) => {
  if (disabled) {
    return (
      <div className="w-full text-center">
        <div
          className={cx(
            pillBtn,
            "w-full cursor-not-allowed select-none bg-[#EFEFEF] text-[#4A4A4A]",
            small ? "px-4 py-3 text-[11px]" : "h-12 px-6"
          )}
        >
          <ShoppingBasket size={small ? 14 : 16} strokeWidth={2.5} />
          <span>Checkout Locked</span>
        </div>
        {!small && (
          <p className="mt-2 font-body text-[10px] font-semibold uppercase tracking-widest text-[#FFFFFF]/70">
            Complete required delivery fields to unlock
          </p>
        )}
      </div>
    );
  }

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      {...hoverTap(1.02, 0.98)}
      className={cx(
        "group",
        pillBtn,
        "w-full cursor-pointer",
        focusRing,
        small ? "px-4 py-3 text-[11px]" : "h-12 px-6",
        className
      )}
      style={{ backgroundColor: PALETTE.lime, color: PALETTE.ink }}
    >
      <ShoppingBasket size={small ? 14 : 16} strokeWidth={2.5} />
      <span>{children}</span>
      <ArrowRight
        size={small ? 14 : 15}
        strokeWidth={2.75}
        className="transition-transform duration-300 group-hover:translate-x-1"
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
        className="mt-1.5 overflow-hidden font-display text-[11px] font-bold tracking-tight"
        style={{ color: PALETTE.red }}
      >
        {children}
      </motion.p>
    )}
  </AnimatePresence>
);

const FormFieldLabel = ({ icon: Icon, required, children, htmlFor }) => (
  <label
    htmlFor={htmlFor}
    className="mb-2 flex cursor-pointer items-center gap-2 font-display text-xs font-extrabold uppercase tracking-wider text-[#111111]"
  >
    {Icon && <Icon size={14} strokeWidth={2.5} style={{ color: PALETTE.red }} />}
    <span>{children}</span>
    {required && <span style={{ color: PALETTE.red }}>*</span>}
  </label>
);

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

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    city: "Gulu City",
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
      .map(
        (i, idx) =>
          `${idx + 1}. ${i.name} x${i.quantity} - ${fmt(i.price * i.quantity)} UGX`
      )
      .join("\n");

    const message = [
      `Hello ${BRAND_NAME} (${SLOGAN}), I would like to place an order:`,
      "",
      "CUSTOMER DETAILS",
      `Name: ${form.fullName}`,
      `Phone: ${form.phone}`,
      `City: ${form.city}`,
      `Address: ${form.address}`,
      `Payment: ${form.paymentMethod}`,
      `Notes: ${form.notes || "None"}`,
      "",
      "ORDER ITEMS",
      lines,
      "",
      `Subtotal: ${fmt(subtotal)} UGX`,
      `Tax (18%): ${fmt(tax)} UGX`,
      `Delivery: ${shipping === 0 ? "FREE" : `${fmt(shipping)} UGX`}`,
      `Total: ${fmt(total)} UGX`,
    ].join("\n");

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }, [cartItems, subtotal, tax, shipping, total, form]);

  const inputStyles = cx(
    "w-full h-13 px-4 py-3 text-sm font-body font-medium outline-none transition-colors rounded-2xl border-0 bg-[#F5F5F5] text-[#111111] placeholder-[#4A4A4A]/65 focus:bg-[#EFEFEF]",
    focusRing
  );

  const remainingForFreeDelivery = Math.max(
    0,
    FREE_DELIVERY_THRESHOLD - subtotal
  );
  const deliveryLabel = shipping === 0 ? "FREE" : `${fmt(shipping)} UGX`;

  // 1. EMPTY STATE
  if (!cartItems.length) {
    return (
      <section className="relative flex min-h-[100dvh] w-full select-none flex-col items-center justify-center overflow-hidden border-0 bg-[#FFFFFF] px-4 pb-8 pt-10 text-[#111111]">
        <FontStyles />

        <motion.h1
          {...fadeUp(0.05)}
          className="font-display pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center font-black uppercase leading-[0.82] tracking-[-0.04em]"
          style={{ color: PALETTE.surface, fontSize: "clamp(4.5rem, 18vw, 15rem)" }}
        >
          <span>EMPTY</span>
          <span>BAG</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, ease: EASE }}
          className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full border-0 text-[#FFFFFF]"
          style={{ backgroundColor: PALETTE.ink }}
        >
          <ShoppingBag
            size={38}
            strokeWidth={2.2}
            style={{ color: PALETTE.lime }}
          />
        </motion.div>

        <motion.div
          {...fadeUp(0.25)}
          className="font-display absolute bottom-[18%] left-[8%] z-20 -rotate-3 rounded-2xl border-0 px-4 py-2 text-[11px] font-extrabold uppercase text-[#FFFFFF] lg:bottom-[22%] lg:left-[24%] lg:px-5 lg:py-2.5 lg:text-sm"
          style={{ backgroundColor: PALETTE.ink }}
        >
          Bag is hungry
          <span
            className="absolute -bottom-1 left-6 h-3 w-3 rotate-45"
            style={{ backgroundColor: PALETTE.ink }}
          />
        </motion.div>

        <motion.div
          {...fadeUp(0.35)}
          className="font-display absolute right-[8%] top-[28%] z-20 rounded-full border-0 px-4 py-2 text-[11px] font-extrabold uppercase lg:right-[24%] lg:px-5 lg:py-2.5 lg:text-sm"
          style={{ backgroundColor: PALETTE.lime, color: PALETTE.ink }}
        >
          {BRAND_NAME} · {SLOGAN}
        </motion.div>

        <motion.div
          {...fadeUp(0.45)}
          className="relative z-20 mt-14 flex flex-col items-center gap-5 text-center"
        >
          <p className="max-w-xs font-body text-sm font-medium leading-relaxed text-[#2A2A2A]">
            You haven&apos;t added anything delicious yet. Explore our fresh
            pork, burgers, pizza, and chicken in Gulu City.
          </p>
          <motion.div {...hoverTap(1.04, 0.96)}>
            <Link
              to="/Products"
              className={cx(
                pillBtn,
                "cursor-pointer px-8 py-4 text-[#FFFFFF]",
                focusRing
              )}
              style={{ backgroundColor: PALETTE.ink }}
            >
              <ArrowLeft
                size={14}
                strokeWidth={3}
                style={{ color: PALETTE.lime }}
              />
              <span>Browse Menu</span>
            </Link>
          </motion.div>
        </motion.div>
      </section>
    );
  }

  // 2. ACTIVE CART & CHECKOUT (MATCHED TO PRODUCTS.JSX UI)
  return (
    <div className="relative min-h-screen select-none border-0 bg-[#FFFFFF] pb-28 font-body text-[#111111] selection:bg-[#D9FF00] selection:text-[#111111] lg:pb-16">
      <FontStyles />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-28 lg:px-12">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: EASE }}
          className="mb-12 flex flex-wrap items-end justify-between gap-6"
        >
          <div>
            <h1 className="font-display text-5xl font-black uppercase leading-[0.9] tracking-[-0.04em] text-[#111111] sm:text-6xl md:text-7xl">
              Checkout
            </h1>
            <p className="mt-3 font-display text-xs font-bold uppercase tracking-wider text-[#4A4A4A]">
              {cartItems.length} item{cartItems.length !== 1 ? "s" : ""} ready ·
              Gulu City
            </p>
          </div>

          <motion.div {...hoverTap(1.03, 0.97)}>
            <Link
              to="/Products"
              className={cx(
                pillBtn,
                "bg-[#F5F5F5] px-5 py-3 text-[#111111] hover:bg-[#EFEFEF]",
                focusRing
              )}
            >
              <ArrowLeft size={14} strokeWidth={2.75} />
              <span>Continue Shopping</span>
            </Link>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
          {/* LEFT COLUMN — DELIVERY DETAILS */}
          <div className="space-y-8 lg:col-span-7">
            <div className="rounded-3xl border-0 bg-[#F5F5F5] p-5 sm:p-8">
              <div className="mb-6 flex items-center justify-between gap-3">
                <div>
                  <span className="font-display text-[10px] font-bold uppercase tracking-wider text-[#4A4A4A]">
                    Step 01 · Dispatch Info
                  </span>
                  <h2 className="mt-1 font-display text-2xl font-black uppercase tracking-tight text-[#111111]">
                    Delivery Details
                  </h2>
                </div>
                <span
                  className="rounded-full border-0 px-3 py-1 font-display text-[10px] font-black uppercase tracking-wide"
                  style={{ backgroundColor: PALETTE.lime, color: PALETTE.ink }}
                >
                  {form.city}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="space-y-1">
                  <FormFieldLabel icon={User} required htmlFor="fullName">
                    Full Name
                  </FormFieldLabel>
                  <input
                    id="fullName"
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur("fullName")}
                    placeholder="e.g. John Doe"
                    className={cx(
                      "w-full h-12 px-4 py-3 text-sm font-body font-medium outline-none transition-colors rounded-2xl border-0 bg-[#FFFFFF] text-[#111111] placeholder-[#4A4A4A]/65 focus:bg-[#EFEFEF]",
                      focusRing,
                      touched.fullName &&
                        form.fullName.trim().length < 2 &&
                        "bg-[#E11D1D]/15"
                    )}
                  />
                  <ErrorMessage
                    show={touched.fullName && form.fullName.trim().length < 2}
                  >
                    Please enter your full name.
                  </ErrorMessage>
                </div>

                <div className="space-y-1">
                  <FormFieldLabel icon={Clock} required htmlFor="phone">
                    Phone Number
                  </FormFieldLabel>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur("phone")}
                    placeholder="e.g. 0776464823"
                    className={cx(
                      "w-full h-12 px-4 py-3 text-sm font-body font-medium outline-none transition-colors rounded-2xl border-0 bg-[#FFFFFF] text-[#111111] placeholder-[#4A4A4A]/65 focus:bg-[#EFEFEF]",
                      focusRing,
                      touched.phone &&
                        form.phone.trim().length < 9 &&
                        "bg-[#E11D1D]/15"
                    )}
                  />
                  <ErrorMessage
                    show={touched.phone && form.phone.trim().length < 9}
                  >
                    Please enter a valid phone number.
                  </ErrorMessage>
                </div>

                <div className="space-y-1">
                  <FormFieldLabel icon={MapPin} htmlFor="city">
                    Region / City
                  </FormFieldLabel>
                  <select
                    id="city"
                    name="city"
                    value={form.city}
                    onChange={handleInputChange}
                    className={cx(
                      "w-full h-12 px-4 py-3 text-sm font-body font-medium outline-none transition-colors rounded-2xl border-0 bg-[#FFFFFF] text-[#111111] focus:bg-[#EFEFEF] cursor-pointer",
                      focusRing
                    )}
                  >
                    {REGIONS.map((r) => (
                      <option
                        key={r}
                        value={r}
                        className="bg-[#FFFFFF] text-[#111111]"
                      >
                        {r}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <FormFieldLabel icon={CreditCard} htmlFor="paymentMethod">
                    Payment Method
                  </FormFieldLabel>
                  <select
                    id="paymentMethod"
                    name="paymentMethod"
                    value={form.paymentMethod}
                    onChange={handleInputChange}
                    className={cx(
                      "w-full h-12 px-4 py-3 text-sm font-body font-medium outline-none transition-colors rounded-2xl border-0 bg-[#FFFFFF] text-[#111111] focus:bg-[#EFEFEF] cursor-pointer",
                      focusRing
                    )}
                  >
                    <option
                      value="Cash on Delivery"
                      className="bg-[#FFFFFF] text-[#111111]"
                    >
                      Cash on Delivery
                    </option>
                    <option
                      value="Mobile Money (MTN/Airtel)"
                      className="bg-[#FFFFFF] text-[#111111]"
                    >
                      Mobile Money
                    </option>
                  </select>
                </div>

                <div className="space-y-1 md:col-span-2">
                  <FormFieldLabel icon={MapPin} required htmlFor="address">
                    Delivery Address
                  </FormFieldLabel>
                  <input
                    id="address"
                    type="text"
                    name="address"
                    value={form.address}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur("address")}
                    placeholder="Street name, landmark, or plot number"
                    className={cx(
                      "w-full h-12 px-4 py-3 text-sm font-body font-medium outline-none transition-colors rounded-2xl border-0 bg-[#FFFFFF] text-[#111111] placeholder-[#4A4A4A]/65 focus:bg-[#EFEFEF]",
                      focusRing,
                      touched.address &&
                        form.address.trim().length <= 3 &&
                        "bg-[#E11D1D]/15"
                    )}
                  />
                  <ErrorMessage
                    show={touched.address && form.address.trim().length <= 3}
                  >
                    Please provide a clear delivery address.
                  </ErrorMessage>
                </div>

                <div className="space-y-1 md:col-span-2">
                  <label
                    htmlFor="notes"
                    className="mb-2 block cursor-pointer font-display text-xs font-extrabold uppercase tracking-wider text-[#111111]"
                  >
                    Delivery Notes (Optional)
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows="2"
                    value={form.notes}
                    onChange={handleInputChange}
                    placeholder="e.g. Extra chili dip, call on arrival..."
                    className={cx(
                      "w-full px-4 py-3 text-sm font-body font-medium outline-none transition-colors rounded-2xl border-0 bg-[#FFFFFF] text-[#111111] placeholder-[#4A4A4A]/65 focus:bg-[#EFEFEF] resize-none",
                      focusRing
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Trust Strip */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                { icon: ShieldCheck, label: "100% Fresh", sub: "Farm Sourced" },
                { icon: Truck, label: "Fast Delivery", sub: "Gulu City Dispatch" },
                { icon: Leaf, label: "Hot & Hygienic", sub: "Wood-Fired Prep" },
              ].map(({ icon: Icon, label, sub }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 rounded-2xl border-0 bg-[#F5F5F5] p-4"
                >
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-0 bg-[#FFFFFF]"
                    style={{ color: PALETTE.red }}
                  >
                    <Icon size={16} strokeWidth={2.5} />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-display text-xs font-black uppercase tracking-wide text-[#111111]">
                      {label}
                    </p>
                    <p className="truncate font-body text-[11px] font-medium text-[#4A4A4A]">
                      {sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN — CHECKOUT SUMMARY (MATCHED TO PRODUCTS.JSX CART) */}
          <div className="lg:sticky lg:top-28 lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={SPRING}
              className="flex flex-col overflow-hidden rounded-3xl border-0 bg-[#FFFFFF]"
            >
              {/* Dark Header */}
              <div
                className="flex items-center justify-between border-0 p-4"
                style={{ backgroundColor: PALETTE.ink, color: PALETTE.white }}
              >
                <div className="flex items-center gap-2">
                  <ShoppingBasket
                    size={18}
                    strokeWidth={2.5}
                    style={{ color: PALETTE.lime }}
                  />
                  <span className="font-display text-sm font-black uppercase tracking-wide">
                    Order Summary ({cartItems.length})
                  </span>
                </div>

                <Link
                  to="/Products"
                  className={cx(
                    "cursor-pointer rounded-full border-0 bg-[#FFFFFF]/15 px-3 py-1 font-display text-[10px] font-bold uppercase tracking-wider text-[#FFFFFF] transition-colors hover:bg-[#FFFFFF]/25",
                    focusRing
                  )}
                >
                  Menu
                </Link>
              </div>

              {/* Free Delivery Notice */}
              <div className="border-0 bg-[#F5F5F5] px-4 py-2.5 text-[11px] font-semibold text-[#111111]">
                {remainingForFreeDelivery === 0 ? (
                  <span className="font-bold text-[#111111]">
                    Unlocked free delivery
                  </span>
                ) : (
                  <span>
                    Add{" "}
                    <strong className="font-black text-[#111111]">
                      {fmt(remainingForFreeDelivery)} UGX
                    </strong>{" "}
                    for free delivery
                  </span>
                )}
              </div>

              {/* Cart Lines */}
              <div className="cart-scroll max-h-64 flex-1 divide-y divide-[#EFEFEF] overflow-y-auto px-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-3 py-3"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-12 w-12 flex-shrink-0 rounded-xl border-0 bg-[#F5F5F5] object-contain p-1"
                    />
                    <div className="min-w-0 flex-grow">
                      <h4 className="font-display truncate text-xs font-black uppercase text-[#111111]">
                        {item.name}
                      </h4>
                      <span className="text-[11px] font-semibold text-[#4A4A4A]">
                        {fmt(item.price)} UGX
                      </span>
                    </div>

                    <div className="flex flex-shrink-0 items-center gap-1.5">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        onClick={() => decreaseQuantity(item.id)}
                        className={cx(
                          "flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border-0 bg-[#F5F5F5] text-[#111111] transition-colors hover:bg-[#EFEFEF] sm:h-6 sm:w-6",
                          focusRing
                        )}
                      >
                        <Minus size={10} strokeWidth={3} />
                      </button>
                      <span className="font-display w-5 text-center text-xs font-black tabular-nums text-[#111111]">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        onClick={() => increaseQuantity(item.id)}
                        className={cx(
                          "flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border-0 bg-[#F5F5F5] text-[#111111] transition-colors hover:bg-[#EFEFEF] sm:h-6 sm:w-6",
                          focusRing
                        )}
                      >
                        <Plus size={10} strokeWidth={3} />
                      </button>
                      <button
                        type="button"
                        aria-label="Remove item"
                        onClick={() => removeFromCart(item.id)}
                        className={cx(
                          "ml-1 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border-0 text-[#E11D1D] transition-colors hover:bg-[#F5F5F5] sm:h-6 sm:w-6",
                          focusRing
                        )}
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals + Checkout CTA */}
              <div className="space-y-2 border-0 bg-[#F5F5F5] p-4">
                <div className="flex items-center justify-between text-xs font-medium text-[#4A4A4A]">
                  <span>Subtotal</span>
                  <span className="font-bold tabular-nums text-[#111111]">
                    {fmt(subtotal)} UGX
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs font-medium text-[#4A4A4A]">
                  <span>Tax (18%)</span>
                  <span className="font-bold tabular-nums text-[#111111]">
                    {fmt(tax)} UGX
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs font-medium text-[#4A4A4A]">
                  <span>Delivery</span>
                  <span className="font-black tabular-nums text-[#111111]">
                    {deliveryLabel}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2 font-display text-sm font-black uppercase text-[#111111]">
                  <span>Total</span>
                  <span className="tabular-nums">{fmt(total)} UGX</span>
                </div>

                <div className="pt-2">
                  <CtaButton href={whatsappHref} disabled={!isFormValid}>
                    {isFormValid ? "Order on WhatsApp" : "Checkout Locked"}
                  </CtaButton>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* MOBILE STICKY CHECKOUT BAR */}
      <div className="fixed bottom-4 left-4 right-4 z-30 lg:hidden">
        <div className="flex items-center justify-between gap-3 rounded-full border-0 bg-[#111111] px-4 py-2.5 text-[#FFFFFF]">
          <div className="flex flex-col text-left">
            <span className="font-display text-[10px] font-bold uppercase tracking-wider text-[#FFFFFF]/70">
              {cartItems.length} Item{cartItems.length !== 1 ? "s" : ""}
            </span>
            <span className="font-display text-xs font-black tabular-nums text-[#FFFFFF]">
              {fmt(total)} UGX
            </span>
          </div>

          <div className="w-40">
            <CtaButton href={whatsappHref} disabled={!isFormValid} small>
              {isFormValid ? "Order" : "Locked"}
            </CtaButton>
          </div>
        </div>
      </div>
    </div>
  );
}