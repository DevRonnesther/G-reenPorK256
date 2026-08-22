import React from "react";
import { motion } from "framer-motion";
import { MessageSquareQuote, Star, Check } from "lucide-react";

// ─── Centralized GreenPork Design Tokens ──────────────────────────────────────
const BRAND = {
  red: "#D90404",       // --brand-red
  lime: "#D4FF00",      // --brand-lime
  white: "#FFFFFF",     // --brand-white
  dark: "#2E0101",      // --brand-dark
};

const DEFAULT_THEME = {
  text: BRAND.dark,
  textSoft: "rgba(46,1,1,0.8)",
  textFaint: "rgba(46,1,1,0.6)",
  border: BRAND.dark,
  bg: BRAND.white,
};

// ─── GSAP-like Stagger Config ─────────────────────────────────────────────────
const ease = [0.22, 1, 0.36, 1];

const containerStagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

const itemReveal = {
  hidden: { opacity: 0, y: 50, clipPath: "inset(100% 0 0 0)" },
  show: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0% 0 0 0)",
    transition: { duration: 0.9, ease }
  }
};

const Eyebrow = ({ theme }) => (
  <span className="inline-flex items-center gap-3 text-xs font-display font-bold uppercase tracking-widest mb-6" style={{ color: theme.textFaint }}>
    <span className="h-2 w-2" style={{ backgroundColor: BRAND.lime }} />
    Customer Reviews
  </span>
);

const Testimonials = ({ theme = DEFAULT_THEME }) => {
  const testimonials = [
    {
      quote: "GreenPork completely changed my expectations for premium food delivery. The taste, freshness, and presentation are outstanding.",
      author: "Maria Rodriguez", title: "Restaurant Owner",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
    },
    {
      quote: "As a chef, quality matters to me. GreenPork consistently delivers rich flavor, fast service, and exceptional customer care.",
      author: "Thomas Lee", title: "Executive Chef",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
    },
    {
      quote: "Every order feels premium. From the packaging to the taste, GreenPork delivers an experience worth coming back for.",
      author: "Emily Watson", title: "Food Critic",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
    },
  ];

  return (
    <section className="relative font-body">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">

          {/* LEFT COLUMN: STICKY BRAND OVERVIEW & TRUST BADGE */}
          <motion.div
            variants={containerStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-5 lg:sticky lg:top-32 space-y-8 mb-8 lg:mb-0"
          >
            <motion.div variants={itemReveal}>
              <Eyebrow theme={theme} />
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black tracking-tighter leading-[0.9]" style={{ color: theme.text }}>
                What Our Valued Clients <br />Say About Us
              </h2>
            </motion.div>

            <motion.p
              variants={itemReveal}
              className="text-base leading-relaxed max-w-md font-body"
              style={{ color: theme.textSoft }}
            >
              Trusted by food lovers, chefs, and families who enjoy premium taste, quality service, and unforgettable culinary experiences across the country.
            </motion.p>

            {/* Trust Metric Card */}
            <motion.div
              variants={itemReveal}
              className="p-6 max-w-md flex items-center gap-6 border-2"
              style={{ borderColor: theme.border }}
            >
              <div className="text-center shrink-0">
                <span className="text-5xl font-display font-black leading-none" style={{ color: theme.text }}>4.9</span>
                <div className="flex items-center gap-1 mt-2 justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className="fill-[#D90404] text-[#D90404]" />
                  ))}
                </div>
              </div>
              <div className="h-12 w-px shrink-0" style={{ backgroundColor: theme.border }} />
              <p className="text-xs leading-normal font-body font-medium" style={{ color: theme.textSoft }}>
                Based on 1,500+ direct client reviews and local catering experiences.
              </p>
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN: ASYMMETRIC STAGGERED DECK */}
          <motion.div
            variants={containerStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-7 space-y-8 pb-6"
          >

            {/* 1. Featured Testimonial */}
            <motion.div
              variants={itemReveal}
              whileHover={{ y: -4 }}
              className="p-8 md:p-12 border-2 border-[#2E0101] text-[#2E0101] shadow-2xl"
              style={{ backgroundColor: BRAND.lime }}
            >
              <div className="flex items-center justify-between mb-8">
                <div className="w-12 h-12 flex items-center justify-center border-2 border-[#2E0101]">
                  <MessageSquareQuote size={18} strokeWidth={2.5} />
                </div>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 text-[10px] font-display font-black tracking-widest uppercase border-2 border-[#2E0101] bg-[#2E0101] text-[#D4FF00]">
                  <Check size={12} strokeWidth={3} /> Featured
                </span>
              </div>

              <p className="leading-relaxed text-xl md:text-2xl mb-8 italic font-body">
                "{testimonials[0].quote}"
              </p>

              <div className="flex items-center gap-4 pt-4 border-t-2 border-[#2E0101]/20">
                <img src={testimonials[0].image} alt={testimonials[0].author} className="w-14 h-14 object-cover border-2 border-[#2E0101]" />
                <div>
                  <h4 className="text-lg font-display font-black leading-none">{testimonials[0].author}</h4>
                  <p className="text-xs font-ui font-bold mt-1 opacity-70 uppercase tracking-wide">{testimonials[0].title}</p>
                </div>
              </div>
            </motion.div>

            {/* Staggered Sub-Grid for Reviews 2 & 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[testimonials[1], testimonials[2]].map((t, i) => (
                <motion.div
                  key={t.author}
                  variants={itemReveal}
                  whileHover={{ y: -4 }}
                  className={`p-8 border-2 ${i === 1 ? "md:translate-y-8" : ""}`}
                  style={{ borderColor: theme.border, backgroundColor: theme.bg }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-10 h-10 flex items-center justify-center border-2" style={{ borderColor: theme.border, color: theme.text }}>
                      <MessageSquareQuote size={16} strokeWidth={2.5} />
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[9px] font-display font-bold tracking-widest uppercase border" style={{ borderColor: theme.border, color: theme.text }}>
                      <Check size={10} strokeWidth={3} /> Verified
                    </span>
                  </div>

                  <p className="leading-relaxed text-sm mb-6 font-body" style={{ color: theme.textSoft }}>"{t.quote}"</p>

                  <div className="flex items-center gap-3 pt-4 border-t-2" style={{ borderColor: theme.border }}>
                    <img src={t.image} alt={t.author} className="w-12 h-12 object-cover border-2" style={{ borderColor: theme.border }} />
                    <div>
                      <h4 className="text-base font-display font-black leading-none" style={{ color: theme.text }}>{t.author}</h4>
                      <p className="text-[11px] font-ui font-bold mt-1 uppercase tracking-wide" style={{ color: theme.textFaint }}>{t.title}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;