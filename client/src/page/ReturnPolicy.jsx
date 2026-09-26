import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  AlertCircle, CheckCircle2, Clock, Phone, Mail, MapPin,
  ShieldCheck, Truck, ArrowRight, ShoppingBasket, Flame,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════
   BRAND + CONTENT
   ═══════════════════════════════════════════════════════════ */
const BRAND = "Green Pork";
const PHONE_DISPLAY = "+256 776 464 823";
const PHONE_LINK = "tel:+256776464823";
const EMAIL = "greenporkie@gmail.com";

// Standardized Colors
const BRAND_COLOR = "#D9FF00"; // Primary Action / Highlight
const DARK = "#4A0A0A";       // Primary Dark / Text
const RED = "#E11D1D";        // Alert / Active states
const WORD_RED = "#FFC2B3";

const RETURN_RULES = [
  {
    icon: AlertCircle,
    title: "Perishable Products",
    text: "Due to hygiene and food safety regulations, food products cannot be returned or exchanged after delivery has been completed.",
  },
  {
    icon: CheckCircle2,
    title: "Damaged or Incorrect Orders",
    text: "Please inspect your delivery promptly. Contact us within ",
    highlight: "24 hours",
    after: " of dispatch if your order is incorrect, damaged, or below quality standards.",
  },
  {
    icon: Clock,
    title: "Refund Processing",
    text: "Approved refunds are credited to your original payment method or local mobile money wallet within ",
    highlight: "3–5 business days",
    after: ".",
  },
];

const ASSURANCES = [
  {
    icon: ShieldCheck,
    title: "Food Safety Assurance",
    text: "All cuts and prepared dishes are handled under strict hygienic and sanitary farm-to-table standards.",
  },
  {
    icon: Truck,
    title: "Delivery Guidelines",
    text: "Our logistics dispatch works rapidly to ensure freshness. Please provide clear physical landmarks to prevent errors.",
  },
];

const SUPPORT = [
  { icon: Phone, label: "Phone Desk", value: PHONE_DISPLAY, href: PHONE_LINK },
  { icon: Mail, label: "Email Support", value: EMAIL, href: `mailto:${EMAIL}` },
  { icon: MapPin, label: "Regional Hub", value: "Plot 42, Jinja-Kampala Highway, Njeru", href: null },
];

/* ═══════════════════════════════════════════════════════════
   SHARED ANIMATION (same as Hero)
   ═══════════════════════════════════════════════════════════ */
const spring = { type: "spring", stiffness: 220, damping: 26 };
const ease = [0.16, 1, 0.3, 1];

function fadeUp(d = 0) {
  return {
    initial: { opacity: 0, y: 20, filter: "blur(6px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: ease, delay: d } },
  };
}

function ScrollReveal({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: ease, delay: delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Small pill label
function Eyebrow({ children, light = false }) {
  const tone = light ? "bg-white/15 text-white backdrop-blur-md" : "bg-[#4A0A0A]/10 text-[#4A0A0A]";
  return (
    <span className={`mb-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-wide ${tone}`}>
      <Flame size={13} strokeWidth={2.5} />
      {children}
    </span>
  );
}

// Round dark icon badge used across the page
function IconBadge({ icon: Icon, size = "md" }) {
  const box = size === "lg" ? "h-14 w-14" : "h-11 w-11";
  return (
    <div className={`${box} flex shrink-0 items-center justify-center rounded-full text-white`} style={{ backgroundColor: DARK }}>
      <Icon size={size === "lg" ? 22 : 18} strokeWidth={2.2} />
    </div>
  );
}

// Highlighted key detail inside a sentence (uses standard brand color)
function Mark({ children }) {
  return (
    <strong className="rounded-md px-1.5 py-0.5 font-black" style={{ backgroundColor: BRAND_COLOR, color: DARK }}>
      {children}
    </strong>
  );
}

/* ═══════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════ */
export default function ReturnPolicy() {
  const year = new Date().getFullYear();

  return (
    <div className="font-display relative min-h-screen w-full overflow-hidden bg-white text-[#4A0A0A] selection:bg-[#D9FF00] selection:text-[#4A0A0A]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700;800;900&display=swap');
        .font-display { font-family: 'Archivo', sans-serif; }
      `}</style>

      {/* ── HEADER ── */}
      <header className="relative mx-auto max-w-7xl px-4 pb-12 pt-28 lg:px-12 lg:pt-36">
        {/* Soft red light behind the heading */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(circle at 30% 40%, rgba(225,29,29,0.08) 0%, rgba(225,29,29,0) 60%)" }}
        />

        <div className="relative z-10">
          <motion.div {...fadeUp(0)}>
            <Eyebrow>{BRAND} Protection</Eyebrow>
          </motion.div>

          <div className="relative">
            <motion.h1
              {...fadeUp(0.05)}
              className="font-black uppercase leading-[0.82] tracking-[-0.04em]"
              style={{ color: RED, fontSize: "clamp(4rem, 16vw, 12rem)" }}
            >
              Return <br /> Policy
            </motion.h1>

            {/* Dark speech bubble */}
            <motion.div
              {...fadeUp(0.3)}
              className="absolute bottom-[6%] right-[3%] z-20 hidden -rotate-3 rounded-2xl px-5 py-2.5 text-sm font-extrabold uppercase text-white sm:block lg:right-[22%]"
              style={{ backgroundColor: DARK }}
            >
              24-hour claims window
              <span className="absolute -bottom-1 left-6 h-3 w-3 rotate-45" style={{ backgroundColor: DARK }} />
            </motion.div>

            {/* White pill */}
            <motion.div
              {...fadeUp(0.4)}
              className="absolute right-[3%] top-[8%] z-20 hidden rounded-full bg-white px-5 py-2.5 text-sm font-extrabold uppercase shadow-lg ring-1 ring-black/5 sm:block lg:right-[8%]"
              style={{ color: DARK }}
            >
              Refunds in 3–5 days
            </motion.div>
          </div>

          <motion.div {...fadeUp(0.2)} className="mt-8 flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <p className="max-w-xl text-sm font-semibold leading-relaxed text-[#4A0A0A]/75 md:text-base">
              We maintain strict farm-to-table standards. Please read our guidelines regarding returns, cancellations, and delivery safety.
            </p>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={spring}>
              <Link
                to="/Products"
                className="flex items-center gap-2 rounded-full px-6 py-3.5 text-xs font-bold uppercase tracking-wide shadow-lg"
                style={{ backgroundColor: BRAND_COLOR, color: DARK }}
              >
                <ShoppingBasket size={14} strokeWidth={2.5} />
                Browse Menu
                <ArrowRight size={14} strokeWidth={2.5} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </header>

      {/* ── MAIN ── */}
      <main className="mx-auto max-w-7xl px-4 pb-8 pt-8 lg:px-12">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
          {/* LEFT: returns and refunds */}
          <section className="lg:col-span-7">
            <ScrollReveal>
              <div className="mb-8 flex items-center gap-4">
                <IconBadge icon={CheckCircle2} size="lg" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#4A0A0A]/50">Section 01</p>
                  <h2 className="mt-1 text-3xl font-black uppercase leading-none tracking-[-0.04em] md:text-4xl">Returns & Refunds</h2>
                </div>
              </div>
            </ScrollReveal>

            <div className="space-y-4">
              {RETURN_RULES.map((rule, i) => (
                <ScrollReveal
                  key={rule.title}
                  delay={i * 0.1}
                  className="flex items-start gap-5 rounded-3xl border border-[#4A0A0A]/10 bg-[#4A0A0A]/[0.03] p-6 md:p-8"
                >
                  <IconBadge icon={rule.icon} />
                  <div>
                    <h3 className="mb-2 text-lg font-black uppercase tracking-tight">{rule.title}</h3>
                    <p className="text-sm font-medium leading-relaxed text-[#4A0A0A]/75">
                      {rule.text}
                      {rule.highlight && <Mark>{rule.highlight}</Mark>}
                      {rule.after}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </section>

          {/* RIGHT: cancellation + assurance */}
          <div className="space-y-4 lg:sticky lg:top-28 lg:col-span-5">
            <ScrollReveal>
              <section className="relative overflow-hidden rounded-3xl p-8 text-white shadow-2xl md:p-10" style={{ backgroundColor: DARK }}>
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{ background: "radial-gradient(circle at 50% 0%, rgba(225,29,29,0.45) 0%, rgba(225,29,29,0) 65%)" }}
                />
                <div className="relative z-10">
                  <div className="mb-6 flex items-center gap-4">
                    <IconBadge icon={Clock} size="lg" />
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-white/60">Section 02</p>
                      <h2 className="mt-1 text-2xl font-black uppercase leading-none tracking-[-0.04em]">Cancellation Policy</h2>
                    </div>
                  </div>
                  <p className="text-sm font-medium leading-relaxed text-white/80">
                    Orders may be canceled before{" "}
                    {/* Highlight uses standard brand color */}
                    <strong className="rounded-md px-1.5 py-0.5 font-black" style={{ backgroundColor: BRAND_COLOR, color: DARK }}>8:00 AM</strong>{" "}
                    on your scheduled day of delivery. Once culinary preparation begins, cancellations cannot be accommodated.
                  </p>
                </div>
              </section>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <section className="space-y-7 rounded-3xl border border-[#4A0A0A]/10 bg-[#4A0A0A]/[0.03] p-8 md:p-10">
                {ASSURANCES.map((a) => (
                  <div key={a.title} className="flex gap-4">
                    <IconBadge icon={a.icon} />
                    <div>
                      <h3 className="mb-1.5 text-base font-black uppercase tracking-tight">{a.title}</h3>
                      <p className="text-xs font-medium leading-relaxed text-[#4A0A0A]/70">{a.text}</p>
                    </div>
                  </div>
                ))}
              </section>
            </ScrollReveal>
          </div>
        </div>

        {/* ── HELP DESK (red panel, like a Hero slide) ── */}
        <ScrollReveal className="mt-20">
          <section className="relative overflow-hidden rounded-[2rem] px-6 py-14 shadow-2xl md:px-12 md:py-20" style={{ backgroundColor: RED }}>
            <div
              className="pointer-events-none absolute inset-0"
              style={{ background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 60%)" }}
            />

            <div className="relative z-10">
              <div className="mx-auto mb-12 max-w-2xl text-center">
                <Eyebrow light>Help Desk</Eyebrow>
                <h2
                  className="font-black uppercase leading-[0.85] tracking-[-0.04em]"
                  style={{ color: WORD_RED, fontSize: "clamp(2.75rem, 9vw, 6rem)" }}
                >
                  Need Logistics <br /> Assistance?
                </h2>
                <p className="mx-auto mt-6 max-w-lg text-sm font-semibold leading-relaxed text-white/90 md:text-base">
                  Reach out to our customer support desk for direct inquiries regarding processing, refunds, or food quality concerns.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {SUPPORT.map(({ icon, label, value, href }) => {
                  const card = (
                    <div className="flex h-full flex-col justify-between gap-6 rounded-2xl bg-white p-6 shadow-lg">
                      <IconBadge icon={icon} size="lg" />
                      <div>
                        <h3 className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[#4A0A0A]/50">{label}</h3>
                        <p className="break-words text-base font-extrabold leading-tight" style={{ color: DARK }}>{value}</p>
                      </div>
                    </div>
                  );
                  return href ? (
                    <motion.a key={label} href={href} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={spring} className="block">
                      {card}
                    </motion.a>
                  ) : (
                    <div key={label}>{card}</div>
                  );
                })}
              </div>
            </div>
          </section>
        </ScrollReveal>
      </main>

      {/* ── FOOTER ── */}
      <footer className="mt-16 border-t border-[#4A0A0A]/10 px-4 py-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-[10px] font-semibold uppercase tracking-widest text-[#4A0A0A]/60 sm:flex-row">
          <p>© {year} {BRAND}. All rights reserved.</p>
          <p>Premium Food • Fast Delivery • Trusted Service</p>
        </div>
      </footer>
    </div>
  );
}