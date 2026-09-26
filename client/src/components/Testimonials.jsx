import React from "react";
import { motion } from "framer-motion";
import { MessageSquareQuote, Star, Check, Flame } from "lucide-react";

/* ═══════════════════════════════════════════════════════════
   STANDARD DESIGN TOKENS
   ═══════════════════════════════════════════════════════════ */
const BRAND_COLOR = "#D9FF00"; // Primary Action / Highlight
const DARK = "#4A0A0A";       // Primary Dark / Text
const ACCENT = "#F5A31A";     // Secondary Highlight (Stars, Verified)

const testimonials = [
  {
    quote: "Green Pork completely changed my expectations for premium food delivery. The taste, freshness, and presentation are outstanding.",
    author: "Maria Rodriguez",
    role: "Restaurant Owner",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
  },
  {
    quote: "As a chef, quality matters to me. Green Pork consistently delivers rich flavor, fast service, and exceptional customer care.",
    author: "Thomas Lee",
    role: "Executive Chef",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
  },
  {
    quote: "Every order feels premium. From the packaging to the taste, Green Pork delivers an experience worth coming back for.",
    author: "Emily Watson",
    role: "Food Critic",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
  },
];

const ease = [0.16, 1, 0.3, 1];

function Reveal({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Testimonials() {
  return (
    <div className="font-display relative selection:bg-[#D9FF00] selection:text-[#4A0A0A]">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16">

          {/* Left column: Sticky summary */}
          <div className="mb-8 space-y-8 self-start lg:col-span-5 lg:mb-0 lg:sticky lg:top-32">
            <Reveal>
              <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#4A0A0A]/10 px-4 py-2 text-[11px] font-bold uppercase tracking-wide text-[#4A0A0A]">
                <Flame size={13} strokeWidth={2.5} />
                Customer Reviews
              </span>
              <h2
                className="font-black uppercase leading-[0.85] tracking-[-0.04em] text-[#4A0A0A]"
                style={{ fontSize: "clamp(2.25rem, 5vw, 3.75rem)" }}
              >
                What Our <br /> Clients Say
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="max-w-md text-sm font-medium leading-relaxed text-[#4A0A0A]/70 md:text-base">
                Trusted by food lovers, chefs, and families who enjoy premium taste, quality service, and unforgettable culinary experiences across the country.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="flex max-w-md items-center gap-6 rounded-3xl bg-[#4A0A0A]/[0.03] p-6">
                <div className="shrink-0 text-center">
                  <span className="block text-5xl font-black leading-none text-[#4A0A0A]">
                    4.9
                  </span>
                  <div className="mt-2 flex items-center justify-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} className="fill-[#F5A31A] text-[#F5A31A]" />
                    ))}
                  </div>
                </div>
                <div className="h-12 w-px shrink-0 bg-[#4A0A0A]/15" />
                <p className="text-xs font-medium leading-normal text-[#4A0A0A]/70">
                  Based on 1,500+ direct client reviews and local catering experiences.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Right column: Cards */}
          <div className="space-y-8 pb-6 lg:col-span-7">

            {/* Featured Testimonial */}
            <Reveal delay={0.1}>
              <div className="h-full rounded-3xl bg-[#4A0A0A] p-8 transition-transform duration-300 hover:-translate-y-1 md:p-12">
                <div className="mb-8 flex items-center justify-between">
                  {/* Quote icon uses standard brand color */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-full text-[#4A0A0A]" style={{ backgroundColor: BRAND_COLOR }}>
                    <MessageSquareQuote size={18} strokeWidth={2.5} />
                  </div>
                  {/* Featured badge uses standard brand color */}
                  <span className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-[#4A0A0A]" style={{ backgroundColor: BRAND_COLOR }}>
                    <Check size={12} strokeWidth={3} /> Featured
                  </span>
                </div>

                <p className="mb-8 text-xl font-medium italic leading-relaxed text-white md:text-2xl">
                  "{testimonials[0].quote}"
                </p>

                <div className="mb-4 h-px w-full bg-white/15" />
                <div className="flex items-center gap-4">
                  <img
                    src={testimonials[0].image}
                    alt={testimonials[0].author}
                    className="h-14 w-14 rounded-2xl object-cover"
                  />
                  <div>
                    <h4 className="text-lg font-black uppercase leading-none tracking-tight text-white">
                      {testimonials[0].author}
                    </h4>
                    <p className="mt-1 text-xs font-bold uppercase tracking-widest text-white/60">
                      {testimonials[0].role}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Secondary Testimonials */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {testimonials.slice(1, 3).map((t, i) => (
                <Reveal key={t.author} delay={0.15 + i * 0.1} className={i === 1 ? "md:mt-8" : ""}>
                  <div className="h-full rounded-3xl bg-white p-8 shadow-lg transition-transform duration-300 hover:-translate-y-1 border border-[#4A0A0A]/5">
                    <div className="mb-6 flex items-center justify-between">
                      {/* Quote icon uses standard brand color */}
                      <div className="flex h-10 w-10 items-center justify-center rounded-full text-[#4A0A0A]" style={{ backgroundColor: BRAND_COLOR }}>
                        <MessageSquareQuote size={16} strokeWidth={2.5} />
                      </div>
                      {/* Verified badge uses standard accent color */}
                      <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-[#4A0A0A]" style={{ backgroundColor: ACCENT }}>
                        <Check size={10} strokeWidth={3} /> Verified
                      </span>
                    </div>

                    <p className="mb-6 text-sm font-medium leading-relaxed text-[#4A0A0A]/70">
                      "{t.quote}"
                    </p>

                    <div className="mb-4 h-px w-full bg-[#4A0A0A]/10" />
                    <div className="flex items-center gap-3">
                      <img
                        src={t.image}
                        alt={t.author}
                        className="h-12 w-12 rounded-2xl object-cover"
                      />
                      <div>
                        <h4 className="text-base font-black uppercase leading-none tracking-tight text-[#4A0A0A]">
                          {t.author}
                        </h4>
                        <p className="mt-1 text-[11px] font-bold uppercase tracking-widest text-[#4A0A0A]/50">
                          {t.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}