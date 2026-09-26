import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Phone, Clock, MapPin, Users, Leaf,
  ShieldCheck, ArrowRight, Flame, Zap, Star, Snowflake, Bike as BikeIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import Testimonials from "../components/Testimonials";
import { Staff } from "./Staff";
import Gallery from "../components/Gallery";

import Bike from "../assets/transbike.png";
import BgImage from "../assets/PorkBg.png";

const BRAND = "Green Pork";
const PHONE = "+256 776 464 823";
const WHATSAPP = "256776464823";

// Same dark token as Hero.jsx / Navbar.jsx / ProductsView.jsx, lime kept as the brand accent
const DARK = "#2E0101";
const BRAND_COLOR = "#D9FF00";

const RED = "#E11D1D";
const ORANGE = "#F5A31A";
const BURNT = "#E8590C";
const GOLD = "#E0A100";

const WORD_RED = "#FFC2B3";
const WORD_ORANGE = "#FFF1BF";
const WORD_BURNT = "#FFD6B0";
const WORD_GOLD = "#FFF4B8";

const STATS = [
  { value: "5+", label: "Years Active" },
  { value: "10K+", label: "Clients Served" },
  { value: "4.9", label: "Avg Rating", icon: Star },
  { value: "30m", label: "Fast Dispatch", icon: Clock },
];

const PHILOSOPHY = [
  {
    num: "01",
    title: "100% Traceable Selection",
    text: "Carefully curated premium farm cuts and organic ingredients sourced daily from reliable, trusted local livestock caretakers.",
  },
  {
    num: "02",
    title: "Master Wood-Smoked Flavor",
    text: "Specialized double-glazing methods combined with native hardwood smoke to build complex, unmatched flavor textures.",
  },
];

const PILLARS = [
  { icon: Leaf, title: "Strictly Fresh", text: "Organic farm-fresh handling with strict daily turnarounds ensuring peak tenderness." },
  { icon: ShieldCheck, title: "Guaranteed Hygiene", text: "Vacuum-sealed packaging protocols and pristine sanitation frameworks maintained end-to-end." },
  { icon: Users, title: "Community First", text: "Empowering regional farmers and building a reliable culinary hub right in Njeru." },
];

const CONTACT_ITEMS = [
  { icon: MapPin, title: "Physical Location", desc: "Plot 42, Jinja-Kampala Highway, Njeru, Uganda", href: null },
  { icon: Phone, title: "Direct Contact", desc: PHONE, href: `tel:+${WHATSAPP}` },
  { icon: Clock, title: "Operating Hours", desc: "Monday – Sunday · 10 AM – 10 PM", href: null },
];

// Logistics Timeline Data
const TRANSIT_STEPS = [
  { num: "01", title: "Order Confirmed", time: "Instantly", icon: ShieldCheck },
  { num: "02", title: "Vacuum Sealed & Prepped", time: "Within 10 mins", icon: Snowflake },
  { num: "03", title: "Rider Dispatched", time: "Avg 15 mins", icon: BikeIcon },
];

const cx = (...classes) => classes.filter(Boolean).join(" ");

const spring = { type: "spring", stiffness: 220, damping: 26 };
const ease = [0.16, 1, 0.3, 1];

const pill = "flex items-center gap-2 rounded-full px-4 py-2.5 text-[11px] sm:text-xs font-bold uppercase tracking-wide";
const btn = "flex items-center gap-2 rounded-full px-6 py-3.5 text-xs font-bold uppercase tracking-wide";

// Same rings used in Hero / Navbar / ProductsView — visible on keyboard focus, not just hover.
const focusRing = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E0101] focus-visible:ring-offset-2";
const focusRingOnDark = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#2E0101]";

const bigWordSize = "clamp(4.5rem, 21vw, 17rem)";
const headingSize = "clamp(2.75rem, 9vw, 7rem)";

function fadeUp(d = 0) {
  return {
    initial: { opacity: 0, y: 20, filter: "blur(6px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease, delay: d } },
  };
}

function ScrollReveal({ children, delay = 0, y = 20, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children, icon: Icon = Flame, light = true }) {
  const tone = light
    ? "bg-white/15 text-white backdrop-blur-md"
    : "bg-[#2E0101]/10 text-[#2E0101]";

  return (
    <span className={cx("font-display mb-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-wide", tone)}>
      <Icon size={13} strokeWidth={2.5} />
      {children}
    </span>
  );
}

function SectionHeading({ eyebrow, color, light = true, children }) {
  return (
    <ScrollReveal>
      <div className="mb-12 md:mb-16">
        <Eyebrow light={light}>{eyebrow}</Eyebrow>
        <h2
          className="font-display font-black uppercase leading-[0.85] tracking-[-0.04em]"
          style={{ color, fontSize: headingSize }}
        >
          {children}
        </h2>
      </div>
    </ScrollReveal>
  );
}

export default function About() {
  const year = new Date().getFullYear();

  const introRef = useRef(null);
  const deliveryRef = useRef(null);

  const { scrollYProgress: introProgress } = useScroll({ target: introRef, offset: ["start start", "end start"] });
  const yIntroImg = useTransform(introProgress, [0, 1], ["0%", "12%"]);
  const opacityIntro = useTransform(introProgress, [0, 0.8], [1, 0]);

  // Parallax for the bike moving across the screen
  const { scrollYProgress: deliveryProgress } = useScroll({ target: deliveryRef, offset: ["start end", "end start"] });
  const xBike = useTransform(deliveryProgress, [0, 1], ["-15%", "15%"]);

  return (
    <div className="font-display relative min-h-screen w-full overflow-hidden bg-white text-[#2E0101] selection:bg-[#D9FF00] selection:text-[#2E0101]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700;800;900&family=Inter:wght@400;500;600&display=swap');
        .font-display { font-family: 'Archivo', sans-serif; }
        .font-body { font-family: 'Inter', sans-serif; }
      `}</style>

      {/* --- HERO --- */}
      <section
        ref={introRef}
        className="relative flex min-h-[100dvh] w-full flex-col overflow-hidden px-4 pb-8 pt-28 lg:px-12 lg:pt-32"
        style={{ backgroundColor: RED }}
      >
        <div className="relative z-20 flex justify-center">
          <Eyebrow>About {BRAND}</Eyebrow>
        </div>

        <div className="relative z-10 flex min-h-0 flex-1 items-center justify-center">
          <motion.div style={{ opacity: opacityIntro }} className="pointer-events-none absolute inset-0">
            <motion.h1
              {...fadeUp(0.05)}
              className="font-display absolute inset-0 flex flex-col items-center justify-center text-center font-black uppercase leading-[0.82] tracking-[-0.04em]"
              style={{ color: WORD_RED, fontSize: bigWordSize }}
            >
              <span>Farm</span>
              <span>Fresh</span>
            </motion.h1>
          </motion.div>

          <motion.div style={{ y: yIntroImg }} className="relative z-10 flex w-full items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.7, rotate: -8, filter: "blur(12px)" }}
              animate={{ opacity: 1, scale: 1, rotate: -3, filter: "blur(0px)", transition: { duration: 0.85, ease } }}
              className="relative aspect-[16/10] h-[34vh] max-w-[90vw] overflow-hidden rounded-[2rem] shadow-2xl sm:h-[40vh] lg:h-[52vh]"
            >
              <img src={BgImage} alt="Green Pork signature dish" className="h-full w-full object-cover" />
            </motion.div>
          </motion.div>

          <motion.div
            {...fadeUp(0.3)}
            className="font-display absolute bottom-[10%] left-[3%] z-20 -rotate-3 rounded-2xl px-4 py-2 text-[11px] font-extrabold uppercase text-white lg:bottom-[14%] lg:left-[22%] lg:px-5 lg:py-2.5 lg:text-sm"
            style={{ backgroundColor: DARK }}
          >
            Est. Njeru, Uganda
            <span className="absolute -bottom-1 left-6 h-3 w-3 rotate-45" style={{ backgroundColor: DARK }} />
          </motion.div>

          <motion.div
            {...fadeUp(0.4)}
            className="font-display absolute right-[3%] top-[22%] z-20 rounded-full bg-white px-4 py-2 text-[11px] font-extrabold uppercase shadow-lg lg:right-[20%] lg:px-5 lg:py-2.5 lg:text-sm"
            style={{ color: DARK }}
          >
            Wood-Smoked Daily
          </motion.div>
        </div>

        <div className="relative z-20 flex flex-col items-center gap-4">
          <p className="font-body max-w-2xl text-center text-sm font-semibold leading-relaxed text-white/90 md:text-base">
            {BRAND} merges traditional wood-smoking mastery with rigorous modern hygiene standards to serve Uganda’s finest pork dishes and raw farm cuts.
          </p>

          <div className="font-display flex flex-wrap items-center justify-center gap-2 text-white sm:gap-3">
            {STATS.map((s, i) => (
              <span key={s.label} className={cx(pill, i === 0 ? "bg-white/15 backdrop-blur-md" : "bg-white/10 backdrop-blur-md")}>
                {s.icon && <s.icon size={13} strokeWidth={2.5} fill={s.icon === Star ? "currentColor" : "none"} />}
                <b className="font-black">{s.value}</b> {s.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* --- PHILOSOPHY --- */}
      <section className="relative bg-white px-4 py-20 md:py-32 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Our Philosophy" color={DARK} light={false}>
            Built on <br /> Purity & Craft
          </SectionHeading>

          <div className="grid gap-4 md:grid-cols-2 md:gap-6">
            {PHILOSOPHY.map((item, i) => (
              <ScrollReveal
                key={item.num}
                delay={i * 0.15}
                className="group relative overflow-hidden rounded-3xl border border-[#2E0101]/5 bg-[#2E0101]/[0.02] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#2E0101]/10 hover:bg-white hover:shadow-2xl md:p-12"
              >
                <div className="pointer-events-none absolute -right-4 -top-4 opacity-[0.03] transition-transform duration-500 group-hover:rotate-12">
                  <Flame className="h-32 w-32 text-[#2E0101]" strokeWidth={1} />
                </div>
                <span className="font-display block text-6xl font-black leading-none tracking-[-0.04em]" style={{ color: RED }}>
                  {item.num}
                </span>
                <h3 className="font-display mb-3 mt-6 text-2xl font-black uppercase leading-tight tracking-tight" style={{ color: DARK }}>{item.title}</h3>
                <p className="font-body text-sm font-medium leading-relaxed text-[#2E0101]/70">{item.text}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* --- CORE STANDARDS --- */}
      <section className="relative px-4 py-20 md:py-32 lg:px-12" style={{ backgroundColor: ORANGE }}>
        <div className="relative z-10 mx-auto max-w-7xl">
          <SectionHeading eyebrow="Core Standards" color={WORD_ORANGE}>
            What Drives <br /> Us Forward
          </SectionHeading>

          <div className="grid gap-4 md:grid-cols-3 md:gap-6">
            {PILLARS.map((item, i) => (
              <ScrollReveal
                key={item.title}
                delay={i * 0.1}
                className="group rounded-3xl bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110" style={{ backgroundColor: BRAND_COLOR }}>
                  <item.icon className="h-6 w-6 text-[#2E0101]" strokeWidth={2.2} />
                </div>
                <h3 className="font-display mb-3 text-xl font-black uppercase tracking-tight" style={{ color: DARK }}>{item.title}</h3>
                <p className="font-body text-sm font-medium leading-relaxed text-[#2E0101]/70">{item.text}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* --- TEAM --- */}
      <section className="bg-white px-4 py-20 md:py-32 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Leadership" color={DARK} light={false}>
            Meet Our <br /> Team
          </SectionHeading>
          <ScrollReveal delay={0.1} className="rounded-3xl bg-[#2E0101]/[0.03] p-6 md:p-10">
            <Staff />
          </ScrollReveal>
        </div>
      </section>

      {/* --- TESTIMONIALS --- */}
      <section className="relative px-4 py-20 md:py-32 lg:px-12" style={{ backgroundColor: BURNT }}>
        <div className="relative z-10 mx-auto max-w-7xl">
          <SectionHeading eyebrow="Endorsements" color={WORD_BURNT}>
            Client <br /> Reviews
          </SectionHeading>
          <ScrollReveal delay={0.1} className="rounded-3xl bg-white p-6 text-[#2E0101] shadow-xl md:p-10">
            <Testimonials />
          </ScrollReveal>
        </div>
      </section>

      {/* --- GALLERY --- */}
      <section className="bg-white px-4 py-20 md:py-32 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Gallery" color={DARK} light={false}>
            Inside The <br /> Kitchen
          </SectionHeading>
          <ScrollReveal delay={0.1} className="rounded-3xl bg-[#2E0101]/[0.03] p-4 md:p-6">
            <Gallery />
          </ScrollReveal>
        </div>
      </section>

      {/* --- LOGISTICS --- */}
      <section ref={deliveryRef} className="relative overflow-hidden px-4 py-20 md:py-32 lg:px-12 bg-white">
        {/* Giant Ghost Text Background */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.04]">
          <span className="font-display text-[20vw] font-black uppercase tracking-tighter" style={{ color: DARK }}>
            Deliver
          </span>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <SectionHeading eyebrow="Logistics" color={DARK} light={false}>
            Swift & Cold-<br />Stored Dispatch
          </SectionHeading>

          <ScrollReveal delay={0.1}>
            <div className="grid overflow-hidden rounded-[2rem] shadow-2xl md:grid-cols-2 border border-[#2E0101]/5 bg-white">

              {/* Left Side: Transit Timeline */}
              <div className="flex flex-col justify-center gap-8 border-b border-[#2E0101]/10 p-8 md:border-b-0 md:border-r md:p-14 lg:p-16">
                <div className="flex">
                  <Eyebrow icon={Zap} light={false}>Swift & Cold-Chain Secure</Eyebrow>
                </div>

                <h3 className="font-display text-4xl font-black uppercase leading-[0.9] tracking-[-0.04em] text-[#2E0101] sm:text-5xl lg:text-6xl">
                  Fresh Cuts <br />
                  <span style={{ color: RED }}>To Your Doorstep</span>
                </h3>

                <p className="font-body max-w-md text-sm font-medium leading-relaxed text-[#2E0101]/70 sm:text-base">
                  Every order is vacuum-sealed and temperature-regulated right up until handoff, guaranteeing pristine quality whether you're grilling tonight or stocking up.
                </p>

                {/* Unique Timeline UI */}
                <div className="mt-4 space-y-6">
                  {TRANSIT_STEPS.map((step, i) => (
                    <motion.div
                      key={step.num}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.15, ease }}
                      className="group flex items-center gap-5"
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#2E0101]/10 bg-[#2E0101]/5 text-[#2E0101] transition-colors group-hover:border-[#D9FF00] group-hover:bg-[#D9FF00]">
                        <step.icon size={18} strokeWidth={2.5} />
                      </div>
                      <div className="flex-1 border-b border-[#2E0101]/10 pb-3 flex justify-between items-center">
                        <span className="font-display text-sm font-bold uppercase tracking-wide text-[#2E0101]">{step.title}</span>
                        <span className="font-display text-[10px] font-black uppercase tracking-widest text-[#2E0101]/50">{step.time}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-6">
                  <motion.a
                    href={`https://wa.me/${WHATSAPP}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={spring}
                    className={cx(btn, "cursor-pointer shadow-lg", focusRing)}
                    style={{ backgroundColor: BRAND_COLOR, color: DARK }}
                  >
                    Order via WhatsApp <ArrowRight size={14} strokeWidth={2.5} />
                  </motion.a>

                  <motion.a
                    href={`tel:+${WHATSAPP}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={spring}
                    className={cx(btn, "cursor-pointer bg-[#2E0101]/5 text-[#2E0101] backdrop-blur-md border border-[#2E0101]/10", focusRing)}
                  >
                    <Phone size={14} strokeWidth={2.5} /> Call Us
                  </motion.a>
                </div>
              </div>

              {/* Right Side: The Parallax Tracking Stage */}
              <div className="relative flex min-h-[450px] items-center justify-center overflow-hidden bg-[#2E0101]/[0.02] p-8">
                {/* Ambient Glow */}
                <div className="pointer-events-none absolute h-96 w-96 rounded-full opacity-10 blur-[120px]" style={{ backgroundColor: RED }} />

                {/* Floating UI Card 1: Temp (Dark card) */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, ease }}
                  className="absolute right-6 top-12 z-20 rounded-2xl p-4 shadow-xl border border-white/10"
                  style={{ backgroundColor: DARK }}
                >
                  <div className="flex items-center gap-2 text-[#D9FF00]">
                    <Snowflake size={14} strokeWidth={2.5} />
                    <span className="font-display text-[9px] font-black uppercase tracking-widest">Current Temp</span>
                  </div>
                  <span className="font-display mt-1 block text-2xl font-black text-white">4°C Sealed</span>
                </motion.div>

                {/* Floating UI Card 2: ETA (White card) */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.45, ease }}
                  className="absolute bottom-12 left-6 z-20 rounded-2xl bg-white p-4 shadow-xl border border-[#2E0101]/10"
                >
                  <div className="flex items-center gap-2 text-[#2E0101]/60">
                    <Clock size={14} strokeWidth={2.5} />
                    <span className="font-display text-[9px] font-black uppercase tracking-widest">Estimated ETA</span>
                  </div>
                  <span className="font-display mt-1 block text-2xl font-black text-[#2E0101]">30 Minutes</span>
                </motion.div>

                {/* The Parallax Bike */}
                <motion.img
                  style={{ x: xBike, filter: "drop-shadow(0 30px 30px rgba(0,0,0,0.1))" }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease }}
                  src={Bike}
                  alt="Green Pork delivery rider"
                  className="pointer-events-none relative z-10 w-full max-w-lg object-contain"
                />

                {/* Ground Track Line */}
                <div className="absolute bottom-24 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#2E0101]/10 to-transparent"></div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* --- CONTACT --- */}
      <section className="relative px-4 py-20 md:py-32 lg:px-12" style={{ backgroundColor: RED }}>
        <div className="relative z-10 mx-auto max-w-7xl">
          <SectionHeading eyebrow="Location" color={WORD_RED}>
            Direct <br /> Contact
          </SectionHeading>

          <div className="grid items-stretch gap-6 lg:grid-cols-2">
            <div className="flex flex-col justify-between gap-4">
              {CONTACT_ITEMS.map((item, i) => {
                const inner = (
                  <div className="group flex items-center gap-5 rounded-2xl bg-white p-5 shadow-lg transition-transform duration-300 hover:-translate-y-1 md:p-6">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white" style={{ backgroundColor: DARK }}>
                      <item.icon className="h-5 w-5" strokeWidth={2.2} />
                    </div>
                    <div className="min-w-0">
                      <p className="font-body mb-1 text-[10px] font-bold uppercase tracking-widest text-[#2E0101]/50">{item.title}</p>
                      <p className="font-display text-sm font-extrabold leading-tight md:text-base" style={{ color: DARK }}>{item.desc}</p>
                    </div>
                    {item.href && <ArrowRight size={16} strokeWidth={2.5} className="ml-auto text-[#2E0101]/40 transition-transform group-hover:translate-x-1" />}
                  </div>
                );
                return (
                  <ScrollReveal key={item.title} delay={i * 0.1}>
                    {item.href ? <a href={item.href} className={cx("block rounded-2xl", focusRing)}>{inner}</a> : inner}
                  </ScrollReveal>
                );
              })}

              <ScrollReveal delay={0.3}>
                <motion.a
                  href={`https://wa.me/${WHATSAPP}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={spring}
                  className={cx("flex items-center justify-between rounded-2xl p-6 shadow-lg", focusRing)}
                  style={{ backgroundColor: BRAND_COLOR, color: DARK }}
                >
                  <div>
                    <p className="font-body mb-1 text-[10px] font-bold uppercase tracking-widest opacity-50">Instant Support</p>
                    <p className="font-display text-lg font-black uppercase tracking-tight md:text-xl">Start WhatsApp Chat</p>
                  </div>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full" style={{ backgroundColor: DARK }}>
                    <ArrowRight size={18} strokeWidth={2.5} className="text-white" />
                  </span>
                </motion.a>
              </ScrollReveal>
            </div>

            <ScrollReveal delay={0.2}>
              <div className="aspect-[4/3] overflow-hidden rounded-3xl bg-[#2E0101]/[0.03] p-2 shadow-xl lg:aspect-auto lg:h-full lg:min-h-[500px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31909.39692968079!2d32.4343!3d0.4244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177db33b5d4c6d9%3A0x9e6c6c6c6c6c6c6c!2sNjeru!5e0!3m2!1sen!2sug!4v1634567890123!5m2!1sen!2sug"
                  className="h-full w-full rounded-2xl"
                  loading="lazy"
                  title={`${BRAND} location`}
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="border-t border-[#2E0101]/10 bg-white px-4 py-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-[10px] font-semibold uppercase tracking-widest text-[#2E0101]/60 sm:flex-row">
          <p>© {year} {BRAND}. All rights reserved.</p>
          <Link to="/returnPolicy" className={cx("rounded-full transition-colors hover:text-[#D9FF00]", focusRing)}>
            Return Policy
          </Link>
        </div>
      </footer>
    </div>
  );
}