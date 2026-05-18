import React, { useState } from "react";

// ─── INLINE SVG ICON HELPER ───────────────────────────────────────────────────
const Icon = ({ d, size = 20, color = "currentColor", fill = "none", sw = 2 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke={color}
    strokeWidth={sw}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="shrink-0"
  >
    <path d={d} />
  </svg>
);

const IC = {
  truck: "M1 3h15v13H1zM16 8h4l3 3v5h-7V8zM5.5 21a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm11 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  cart: "M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0",
  leaf: "M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10zM2 21c0-3 1-7 6-9",
  smile: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm-4-9s.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01",
  package: "M12 2l10 6.5v7L12 22 2 15.5v-7L12 2zM12 22v-6.5M22 8.5l-10 7-10-7",
  fork: "M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v20M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7",
  chevL: "M15 18l-6-6 6-6",
  chevR: "M9 18l6-6-6-6",
  mapPin: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0zM12 10m-3 0a3 3 0 1 0 6 0 3 3 0 1 0-6 0",
  phone: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z",
  mail: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6",
  clock: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM12 6v6l4 2",
  fb: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
  ig: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z",
  music: "M9 18V5l12-2v13M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm12-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  msg: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  check: "M20 6L9 17l-5-5",
  arrow: "M5 12h14M12 5l7 7-7 7",
};

// ─── SECTION HEADER ───────────────────────────────────────────────────────────
const SectionHeader = ({ eyebrow, title, highlight, sub, dark = false }) => (
  <div className="text-center mb-14">
    <span className={`inline-block text-xs font-bold px-4 py-1.5 rounded-full mb-3 ${dark ? "bg-white/15 text-white" : "bg-green-100 text-green-700"
      }`}>
      {eyebrow}
    </span>
    <h2 className={`m-0 text-3xl md:text-4xl font-black leading-tight ${dark ? "text-white" : "text-gray-900"
      }`}>
      {title}{" "}
      <span className="text-orange-500">{highlight}</span>
    </h2>
    {sub && (
      <p className={`mt-3 mx-auto max-w-lg text-sm leading-relaxed ${dark ? "text-white/70" : "text-gray-500"
        }`}>
        {sub}
      </p>
    )}
  </div>
);

/* ═══════════════════════════════════════════════════════════════════════════════
   SECTION 1 — FEATURED PRODUCTS
═══════════════════════════════════════════════════════════════════════════════ */
const FeaturedProducts = () => {
  const [hov, setHov] = useState(null);
  const [cart, setCart] = useState([]);

  const products = [
    { id: 1, name: "Pork Spare Ribs", cat: "Ribs", price: "UGX 25,000", old: "UGX 30,000", disc: "-17%", rating: 4.8, reviews: 128, badge: "Best Seller", bc: "#f97316", img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=500&q=80", desc: "Meaty, tender ribs perfect for grilling or slow-cooking." },
    { id: 2, name: "Pork Loin Chops", cat: "Chops", price: "UGX 18,000", old: "UGX 22,000", disc: "-18%", rating: 4.6, reviews: 94, badge: "Fresh Today", bc: "#22c55e", img: "https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=500&q=80", desc: "Lean, juicy chops from free-range pigs." },
    { id: 3, name: "Roasted Pork Belly", cat: "Roasts", price: "UGX 22,000", old: "UGX 26,000", disc: "-15%", rating: 4.9, reviews: 211, badge: "Top Rated", bc: "#f59e0b", img: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=500&q=80", desc: "Crispy skin, melt-in-mouth belly from local farms." },
    { id: 4, name: "Minced Pork", cat: "Ground", price: "UGX 12,000", old: "UGX 15,000", disc: "-20%", rating: 4.5, reviews: 76, badge: "Value Pick", bc: "#3b82f6", img: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=500&q=80", desc: "Freshly minced daily — perfect for stews & patties." },
  ];

  const addToCart = (id) => {
    setCart((p) => [...p, id]);
    setTimeout(() => setCart((p) => p.filter((x) => x !== id)), 1600);
  };

  return (
    <section className="py-20 px-6 bg-[#f8faf8]">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="🥩 Our Selection"
          title="Featured"
          highlight="Products"
          sub="Farm-fresh pork cuts, sourced ethically and delivered with care."
        />

        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-6">
          {products.map((p) => {
            const isH = hov === p.id;
            const inC = cart.includes(p.id);
            return (
              <div
                key={p.id}
                onMouseEnter={() => setHov(p.id)}
                onMouseLeave={() => setHov(null)}
                className="bg-white rounded-[22px] overflow-hidden transition-all duration-300 ease-[cubic-bezier(.4,0,.2,1)]"
                style={{
                  border: `1.5px solid ${isH ? p.bc + "55" : "#f0f0f0"}`,
                  boxShadow: isH ? `0 20px 56px ${p.bc}25` : "0 4px 16px rgba(0,0,0,0.05)",
                  transform: isH ? "translateY(-7px)" : "translateY(0)",
                }}
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 ease-in-out"
                    style={{ transform: isH ? "scale(1.09)" : "scale(1)" }}
                  />
                  <span
                    className="absolute top-3 left-3 text-white text-[11px] font-extrabold px-3 py-1 rounded-full"
                    style={{ background: p.bc }}
                  >
                    {p.badge}
                  </span>
                  <span className="absolute top-3 right-3 bg-white/95 text-gray-500 text-[11px] font-semibold px-2.5 py-1 rounded-full">
                    {p.cat}
                  </span>
                  <span className="absolute bottom-3 right-3 bg-[#0edb0e] text-white text-[11px] font-extrabold px-2.5 py-1 rounded-full">
                    {p.disc}
                  </span>
                </div>

                {/* Body */}
                <div className="px-5 pt-5 pb-6">
                  <h3 className="m-0 text-base font-extrabold text-gray-900">{p.name}</h3>
                  <p className="mt-1.5 mb-3 text-[13px] text-gray-400 leading-relaxed">{p.desc}</p>

                  {/* Stars */}
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} width={13} height={13} viewBox="0 0 24 24" fill={i < Math.floor(p.rating) ? "#facc15" : "#e5e7eb"} stroke="none">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                    <span className="text-xs text-gray-400 ml-1.5">({p.reviews})</span>
                  </div>

                  {/* Price + Cart */}
                  <div className="flex items-center justify-between mt-3.5">
                    <div>
                      <span className="text-[15px] font-black text-emerald-600">{p.price}</span>
                      <span className="text-xs text-gray-300 line-through ml-1.5">{p.old}</span>
                    </div>
                    <button
                      onClick={() => addToCart(p.id)}
                      className="flex items-center gap-1.5 text-white text-xs font-bold px-4 py-2 rounded-xl border-none cursor-pointer transition-all duration-200"
                      style={{
                        background: inC ? "#059669" : "#0edb0e",
                        transform: inC ? "scale(0.94)" : "scale(1)",
                      }}
                    >
                      <Icon d={IC.cart} size={14} color="#fff" />
                      {inC ? "Added!" : "Add"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-14">
          <button className="inline-flex items-center gap-2.5 bg-orange-500 text-white border-none rounded-2xl px-10 py-4 text-[15px] font-extrabold cursor-pointer shadow-[0_10px_30px_rgba(249,115,22,0.35)] transition-all duration-200 hover:bg-orange-600">
            View Full Menu <Icon d={IC.arrow} size={17} color="#fff" />
          </button>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════════
   SECTION 2 — WHY CHOOSE US
═══════════════════════════════════════════════════════════════════════════════ */
const WhyChooseUs = () => {
  const [hov, setHov] = useState(null);

  const reasons = [
    { icon: IC.leaf, bg: "#dcfce7", c: "#16a34a", title: "100% Farm Fresh", desc: "All pork is sourced directly from certified local farms with full farm-to-fork traceability." },
    { icon: IC.shield, bg: "#dbeafe", c: "#2563eb", title: "Quality Certified", desc: "Every cut passes strict freshness and food safety inspection before it reaches your door." },
    { icon: IC.truck, bg: "#fff7ed", c: "#ea580c", title: "30-Min Delivery", desc: "Hot and fresh delivery across Kampala in under 30 minutes — guaranteed, rain or shine." },
    { icon: IC.fork, bg: "#fef9c3", c: "#ca8a04", title: "Chef Prepared", desc: "Expert chefs marinate and season every order to perfection before dispatch." },
    { icon: IC.package, bg: "#ede9fe", c: "#7c3aed", title: "Hygienic Packaging", desc: "Tamper-proof, eco-friendly packaging that preserves peak freshness during every transit." },
    { icon: IC.smile, bg: "#fce7f3", c: "#be185d", title: "5,000+ Happy Customers", desc: "Thousands of satisfied customers across Uganda trust Succulent Shop every single day." },
  ];

  const stats = [
    { v: "5,000+", l: "Happy Customers" },
    { v: "50+", l: "Menu Items" },
    { v: "30 min", l: "Avg Delivery" },
    { v: "4.8 ★", l: "Avg Rating" },
  ];

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="✅ Why Us"
          title="Why Choose"
          highlight="Succulent Shop?"
          sub="We're not just a butchery — we're your trusted partner in unforgettable meals."
        />

        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5 mb-14">
          {reasons.map((r, i) => {
            const isH = hov === i;
            return (
              <div
                key={i}
                onMouseEnter={() => setHov(i)}
                onMouseLeave={() => setHov(null)}
                className="flex gap-4 p-6 rounded-[18px] transition-all duration-300 ease-in-out cursor-default"
                style={{
                  border: `1.5px solid ${isH ? r.c + "40" : "#f3f4f6"}`,
                  background: isH ? r.bg + "70" : "#fff",
                  boxShadow: isH ? `0 10px 36px ${r.c}18` : "none",
                }}
              >
                <div
                  className="shrink-0 w-13 h-13 rounded-2xl flex items-center justify-center transition-transform duration-300"
                  style={{
                    width: 52,
                    height: 52,
                    background: r.bg,
                    transform: isH ? "scale(1.12) rotate(-4deg)" : "scale(1)",
                  }}
                >
                  <Icon d={r.icon} size={22} color={r.c} />
                </div>
                <div>
                  <h3 className="m-0 text-[15px] font-extrabold text-gray-900">{r.title}</h3>
                  <p className="mt-1.5 m-0 text-[13px] text-gray-500 leading-relaxed">{r.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-4">
          {stats.map((s, i) => (
            <div
              key={i}
              className="text-center py-7 px-4 rounded-[18px] bg-gradient-to-br from-green-50 to-green-100 border border-green-200"
              style={{ border: "1.5px solid #bbf7d0" }}
            >
              <p className="m-0 text-[28px] font-black text-green-600">{s.v}</p>
              <p className="mt-1.5 m-0 text-[13px] font-semibold text-green-400">{s.l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════════
   SECTION 3 — HOW IT WORKS
═══════════════════════════════════════════════════════════════════════════════ */
const HowItWorks = () => {
  const [hovStep, setHovStep] = useState(null);

  const steps = [
    { n: "01", icon: IC.cart, title: "Browse & Order", desc: "Pick your favorite pork cuts and add them to your cart in seconds from our fresh menu." },
    { n: "02", icon: IC.fork, title: "We Prepare", desc: "Our chefs freshly prepare, marinate, and hygienically pack your order for dispatch." },
    { n: "03", icon: IC.truck, title: "Fast Delivery", desc: "Your order is dispatched and delivered hot to your doorstep within 30 minutes." },
    { n: "04", icon: IC.smile, title: "Enjoy & Rate", desc: "Savor your meal and share your experience — your feedback makes us better!" },
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-green-50 via-green-100 to-green-50/30">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          eyebrow="🚀 Simple Process"
          title="How It"
          highlight="Works"
          sub="Fresh pork to your door in 4 easy steps — no hassle, just amazing flavor."
        />

        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-8 relative">
          {steps.map((s, i) => {
            const isH = hovStep === i;
            return (
              <div
                key={i}
                onMouseEnter={() => setHovStep(i)}
                onMouseLeave={() => setHovStep(null)}
                className="flex flex-col items-center text-center"
              >
                <span className="text-[11px] font-black tracking-[3px] text-green-300 mb-2.5">
                  STEP {s.n}
                </span>
                <div
                  className="w-20 h-20 rounded-full bg-white flex items-center justify-center mb-4.5 transition-all duration-300"
                  style={{
                    border: `3px solid ${isH ? "#f97316" : "#0edb0e"}`,
                    boxShadow: isH
                      ? "0 12px 40px rgba(249,115,22,0.28)"
                      : "0 8px 32px rgba(14,219,14,0.18)",
                    transform: isH ? "scale(1.1)" : "scale(1)",
                    marginBottom: 18,
                  }}
                >
                  <Icon d={s.icon} size={30} color={isH ? "#f97316" : "#0edb0e"} />
                </div>
                <h3 className="m-0 text-base font-extrabold text-green-900">{s.title}</h3>
                <p className="mt-2 m-0 text-[13px] text-green-700/80 leading-relaxed max-w-[190px]">
                  {s.desc}
                </p>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-14">
          <button className="inline-flex items-center gap-2.5 bg-orange-500 text-white border-none rounded-2xl px-10 py-4 text-[15px] font-extrabold cursor-pointer shadow-[0_10px_30px_rgba(249,115,22,0.35)] transition-all duration-200 hover:bg-orange-600">
            <Icon d={IC.cart} size={18} color="#fff" /> Order Now
          </button>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════════
   SECTION 4 — TESTIMONIALS
═══════════════════════════════════════════════════════════════════════════════ */
const Testimonials = () => {
  const [cur, setCur] = useState(0);

  const ts = [
    { name: "Aisha Nakamya", role: "Regular Customer · Kampala", av: "AN", bg: "#dcfce7", tc: "#16a34a", r: 5, text: "Succulent Shop has completely changed how I buy pork. The quality is unmatched — always fresh, always perfectly portioned. Delivery is incredibly fast too! I recommend them to absolutely everyone I know." },
    { name: "David Mugisha", role: "Event Caterer · Entebbe", av: "DM", bg: "#fff7ed", tc: "#ea580c", r: 5, text: "As a caterer, I need reliable suppliers. Succulent Shop never lets me down. Bulk orders are handled professionally and the pork is always top-tier quality every single time." },
    { name: "Grace Atim", role: "Home Chef · Wakiso", av: "GA", bg: "#dbeafe", tc: "#2563eb", r: 5, text: "I love that I can see the pigs before buying! The farm-to-table concept is genuinely real here. My family only eats Succulent Shop pork now — the freshness is on another level." },
    { name: "Patrick Opio", role: "Restaurant Owner · Jinja", av: "PO", bg: "#fef9c3", tc: "#ca8a04", r: 5, text: "Partnering with Succulent Shop boosted my restaurant reviews overnight. Customers always compliment the pork quality. Absolutely worth every shilling — best supplier I've found in Uganda." },
  ];

  const t = ts[cur];
  const prev = () => setCur((c) => (c === 0 ? ts.length - 1 : c - 1));
  const next = () => setCur((c) => (c === ts.length - 1 ? 0 : c + 1));

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-2xl mx-auto">
        <SectionHeader
          eyebrow="❤️ Customer Love"
          title="What Our"
          highlight="Customers Say"
          sub="Real reviews from real pork lovers across Uganda."
        />

        <div
          className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-[28px] pt-14 px-14 pb-10 relative overflow-hidden"
          style={{ border: "1.5px solid #bbf7d0", boxShadow: "0 24px 64px rgba(14,219,14,0.08)" }}
        >
          {/* Decorative quote */}
          <span className="absolute top-2.5 left-7 text-[140px] text-green-200 font-black leading-none select-none pointer-events-none">
            "
          </span>

          {/* Stars */}
          <div className="flex gap-1 mb-5 relative">
            {[...Array(t.r)].map((_, i) => (
              <svg key={i} width={20} height={20} viewBox="0 0 24 24" fill="#facc15" stroke="none">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>

          <p className="m-0 text-lg text-gray-700 italic leading-[1.8] relative">{t.text}</p>

          <div className="flex items-center gap-3.5 mt-8">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center font-extrabold text-sm"
              style={{ background: t.bg, color: t.tc, border: `2px solid ${t.tc}40` }}
            >
              {t.av}
            </div>
            <div>
              <p className="m-0 font-extrabold text-[15px] text-gray-900">{t.name}</p>
              <p className="m-0 text-xs text-gray-400">{t.role}</p>
            </div>
          </div>

          {/* Nav Controls */}
          <div className="flex items-center justify-between mt-9">
            {/* Dots */}
            <div className="flex gap-2">
              {ts.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCur(i)}
                  className="h-2.5 rounded-full border-none p-0 cursor-pointer transition-all duration-300"
                  style={{
                    width: i === cur ? 28 : 10,
                    background: i === cur ? "#0edb0e" : "#d1d5db",
                  }}
                />
              ))}
            </div>
            {/* Arrows */}
            <div className="flex gap-2.5">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-gray-50"
                style={{ border: "1.5px solid #e5e7eb" }}
              >
                <Icon d={IC.chevL} size={17} color="#6b7280" />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full bg-[#0edb0e] border-none flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-green-500"
              >
                <Icon d={IC.chevR} size={17} color="#fff" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════════
   SECTION 5 — SPECIAL OFFER BANNER
═══════════════════════════════════════════════════════════════════════════════ */
const SpecialOfferBanner = () => {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard?.writeText("SUCCULENT20").catch(() => { });
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section className="px-6 pb-14 pt-2">
      <div className="max-w-6xl mx-auto">
        <div className="rounded-[28px] relative overflow-hidden bg-gradient-to-br from-orange-600 via-orange-500 to-amber-400 p-14 shadow-[0_28px_72px_rgba(249,115,22,0.38)]">
          {/* Decorative blobs */}
          <div className="absolute -top-[70px] -right-[70px] w-60 h-60 rounded-full bg-white/10" />
          <div className="absolute -bottom-[50px] -left-[50px] w-44 h-44 rounded-full bg-white/[0.08]" />
          <div className="absolute top-1/2 right-[30%] w-24 h-24 rounded-full bg-white/[0.06] -translate-y-1/2" />

          <div className="relative z-10 flex flex-wrap items-center justify-between gap-9">
            <div>
              <span className="inline-block text-[11px] font-extrabold tracking-[3px] bg-white/20 text-white px-4 py-1.5 rounded-full mb-4 uppercase">
                ⚡ Limited Time Offer
              </span>
              <h2 className="m-0 text-3xl md:text-4xl font-black text-white leading-tight">
                Get 20% OFF<br />Your First Order! 🎉
              </h2>
              <p className="mt-3.5 m-0 text-[15px] text-white/90">
                Use code&nbsp;
                <span
                  onClick={copy}
                  className="bg-black/20 px-3.5 py-1 rounded-lg font-black cursor-pointer select-none transition-all duration-200 hover:bg-black/30"
                  style={{ border: "1px dashed rgba(255,255,255,0.55)" }}
                >
                  {copied ? "✓ Copied!" : "SUCCULENT20"}
                </span>
                &nbsp;at checkout. Valid today only.
              </p>
            </div>

            <div className="flex flex-col items-center gap-2.5">
              <button className="bg-white text-orange-500 border-none rounded-2xl px-11 py-4 text-base font-black cursor-pointer whitespace-nowrap shadow-[0_8px_28px_rgba(0,0,0,0.18)] transition-all duration-200 hover:shadow-[0_12px_36px_rgba(0,0,0,0.22)]">
                Claim Offer →
              </button>
              <p className="text-white/70 text-xs m-0">No minimum order required</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════════
   SECTION 6 — FOOTER
═══════════════════════════════════════════════════════════════════════════════ */
const Footer = () => {
  const year = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [subbed, setSubbed] = useState(false);

  const submit = () => {
    if (email.includes("@")) {
      setSubbed(true);
      setEmail("");
      setTimeout(() => setSubbed(false), 3000);
    }
  };

  const links = ["Home", "Menu", "About Us", "Services", "Contact"];
  const cats = ["Pork Ribs", "Pork Belly", "Loin Chops", "Minced Pork", "Pork Sausages", "Roasted Pork"];
  const socials = [
    { icon: IC.fb, hc: "#3b5998" },
    { icon: IC.ig, hc: "#e1306c" },
    { icon: IC.music, hc: "#555" },
    { icon: IC.msg, hc: "#0edb0e" },
  ];
  const contacts = [
    { icon: IC.mapPin, text: "Plot 14, Kikuubo Lane, Kampala, Uganda" },
    { icon: IC.phone, text: "+256 700 123 456" },
    { icon: IC.mail, text: "hello@succulentshop.ug" },
    { icon: IC.clock, text: "Mon – Sun: 7:00 AM – 9:00 PM" },
  ];

  return (
    <footer className="bg-[#0a1a0b] text-gray-200 pt-16 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Newsletter */}
        <div
          className="bg-[#132013] rounded-[20px] px-9 py-7 mb-14 flex flex-wrap items-center justify-between gap-5"
          style={{ border: "1px solid #1e3a1e" }}
        >
          <div>
            <h4 className="m-0 text-lg font-extrabold text-white">Get Exclusive Deals in Your Inbox 📬</h4>
            <p className="mt-1 m-0 text-[13px] text-gray-500">Subscribe and never miss a discount or new product launch.</p>
          </div>
          <div className="flex gap-2.5 flex-wrap">
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submit()}
              className="bg-[#0a1a0b] text-gray-200 text-sm px-4.5 py-3 rounded-xl outline-none w-60 placeholder-gray-600"
              style={{ border: "1px solid #1e3a1e" }}
            />
            <button
              onClick={submit}
              className="text-white border-none rounded-xl px-6 py-3 text-sm font-bold cursor-pointer transition-all duration-200 whitespace-nowrap"
              style={{ background: subbed ? "#16a34a" : "#0edb0e" }}
            >
              {subbed ? "✓ Subscribed!" : "Subscribe"}
            </button>
          </div>
        </div>

        {/* 4-column grid */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-10 mb-14">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-3.5">
              <div className="w-10 h-10 rounded-[11px] bg-[#0edb0e] flex items-center justify-center">
                <Icon d={IC.leaf} size={20} color="#fff" />
              </div>
              <span className="text-[17px] font-black text-white">Succulent Shop</span>
            </div>
            <p className="text-[13px] text-gray-500 leading-[1.75] mb-5">
              Fresh & natural pork from local farms to your table. Quality you can taste, service you can trust.
            </p>
            <div className="flex gap-2.5">
              {socials.map((s, i) => {
                const [hovS, setHovS] = useState(false);
                return (
                  <button
                    key={i}
                    onMouseEnter={() => setHovS(true)}
                    onMouseLeave={() => setHovS(false)}
                    className="w-9 h-9 rounded-[10px] flex items-center justify-center cursor-pointer transition-all duration-[220ms]"
                    style={{
                      border: "1px solid #1e3a1e",
                      background: hovS ? s.hc : "#132013",
                    }}
                  >
                    <Icon d={s.icon} size={16} color={hovS ? "#fff" : "#6b7280"} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="m-0 mb-4.5 text-xs font-extrabold text-white uppercase tracking-[2px]">Quick Links</h4>
            <ul className="list-none m-0 p-0 flex flex-col gap-2.5">
              {links.map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="text-gray-500 no-underline text-[13px] flex items-center gap-2 transition-colors duration-200 hover:text-[#0edb0e]"
                  >
                    <span className="text-[#0edb0e] text-lg leading-none">›</span>{l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="m-0 mb-4.5 text-xs font-extrabold text-white uppercase tracking-[2px]">Categories</h4>
            <ul className="list-none m-0 p-0 flex flex-col gap-2.5">
              {cats.map((c) => (
                <li key={c}>
                  <a
                    href="#"
                    className="text-gray-500 no-underline text-[13px] flex items-center gap-2 transition-colors duration-200 hover:text-[#0edb0e]"
                  >
                    <span className="text-orange-500 text-lg leading-none">›</span>{c}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="m-0 mb-4.5 text-xs font-extrabold text-white uppercase tracking-[2px]">Contact Us</h4>
            <ul className="list-none m-0 p-0 flex flex-col gap-3.5">
              {contacts.map((c, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0">
                    <Icon d={c.icon} size={15} color="#0edb0e" />
                  </div>
                  <span className="text-[13px] text-gray-500 leading-[1.55]">{c.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="py-5 pb-8 flex flex-wrap items-center justify-between gap-3"
          style={{ borderTop: "1px solid #132013" }}
        >
          <p className="m-0 text-[13px] text-gray-700">© {year} Succulent Shop. All rights reserved.</p>
          <div className="flex items-center gap-1.5">
            <Icon d={IC.check} size={14} color="#0edb0e" />
            <span className="text-[13px] text-gray-700">Fresh · Natural · Delivered Fast</span>
          </div>
          <div className="flex gap-5">
            {["Privacy Policy", "Terms of Service"].map((l) => (
              <a
                key={l}
                href="#"
                className="text-gray-700 no-underline text-[13px] transition-colors duration-200 hover:text-gray-400"
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════════
   ROOT
═══════════════════════════════════════════════════════════════════════════════ */
export { FeaturedProducts, WhyChooseUs, HowItWorks, Testimonials, SpecialOfferBanner, Footer };

export default function Sections() {
  return (
    <div className="font-serif">
      <FeaturedProducts />
      <WhyChooseUs />
      <HowItWorks />
      <Testimonials />
      <SpecialOfferBanner />
      <div className="hidden//">
      <Footer />
      </div>
    </div>
  );a
}