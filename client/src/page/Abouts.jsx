import React, { useMemo, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone, Clock3, MapPin, Users, Award, Leaf,
  ShieldCheck, ArrowRight, Moon, Sun,
} from "lucide-react";
import { Link } from "react-router-dom";
import Testimonials from "../components/Testimonials";
import { Staff } from "./Staff";
import Gallery from "../components/Gallery";

import Bike from "../assets/DeliveryBike.png";

// ─── Design Tokens (Synced with Hero.jsx Light Mode) ──────────────────────
const BRAND_NAME = "GreenPork";
const WHATSAPP_NUMBER = "256776464823";
const PHONE_DISPLAY = "+(256) 776-464-823";
const cx = (...c) => c.filter(Boolean).join(" ");
const ease = [0.22, 1, 0.36, 1];

const GREEN = "#0edb0e";
const GOLD = "#facc15";

// Updated text colors to be dark and visible on white
const THEME = {
  light: {
    bg: "#ffffff",
    text: "#0a0a0a",
    textSoft: "rgba(10,10,10,0.75)",
    textFaint: "rgba(10,10,10,0.5)",
    panel: "rgba(255,255,255,0.6)",
    panelStrong: "rgba(255,255,255,0.8)",
    border: "rgba(10,10,10,0.06)"
  },
  dark: {
    bg: "#f8f8f8",
    text: "#1c1917",
    textSoft: "rgba(28,25,23,0.75)",
    textFaint: "rgba(28,25,23,0.5)",
    panel: "rgba(255,255,255,0.5)",
    panelStrong: "rgba(255,255,255,0.7)",
    border: "rgba(28,25,23,0.06)"
  },
};

// ─── Typography Injector ───────────────────────────────────────────────────
const FontFace = React.memo(function FontFace() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Inter:wght@400;500;600&family=Poppins:wght@500;600;700&display=swap');
      .font-display { font-family: 'Montserrat', sans-serif; }
      .font-ui { font-family: 'Poppins', sans-serif; }
      .font-body { font-family: 'Inter', sans-serif; }
    `}</style>
  );
});

const glassStyle = (t) => ({
  backgroundColor: t.panel,
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  border: `1px solid ${t.border}`,
  boxShadow: "0 8px 30px rgba(0,0,0,0.04)"
});

// ─── Eyebrow ───────────────────────────────────────────────────────────────
const Eyebrow = ({ children, center = false, theme }) => (
  <div className={cx("flex items-center gap-2.5 mb-4 select-none", center ? "justify-center" : "")}>
    <motion.span
      className="h-1.5 w-1.5 rounded-full"
      style={{ backgroundColor: GREEN, boxShadow: `0 0 8px ${GREEN}` }}
      animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden="true"
    />
    <span className="text-[11px] font-ui font-semibold uppercase tracking-[0.25em]" style={{ color: theme.textFaint }}>{children}</span>
    <span className="h-px w-8" style={{ backgroundColor: theme.border }} aria-hidden="true" />
  </div>
);

// ─── Stat Chip ─────────────────────────────────────────────────────────────
const StatChip = ({ value, label, theme }) => (
  <div className="flex flex-col items-center rounded-2xl px-5 py-3.5 min-w-[100px]" style={glassStyle(theme)}>
    <span className="text-2xl font-display font-black leading-tight" style={{ color: GREEN }}>{value}</span>
    <span className="text-[10px] font-ui font-bold uppercase tracking-widest mt-1 text-center" style={{ color: theme.textFaint }}>{label}</span>
  </div>
);

const About = () => {
  const year = useMemo(() => new Date().getFullYear(), []);
  const [mode, setMode] = useState("light");
  const theme = useMemo(() => ({ ...THEME[mode], mode }), [mode]);
  const toggleMode = useCallback(() => setMode((p) => (p === "light" ? "dark" : "light")), []);

  return (
    <div className="w-full relative overflow-hidden font-body min-h-screen" style={{ backgroundColor: theme.bg, color: theme.text }}>
      <FontFace />

      {/* Soft Ambient Background Glows for White Canvas */}
      <div className="fixed inset-0 -z-10 pointer-events-none" style={{ background: `radial-gradient(circle at 14% 12%, ${GREEN}0F, transparent 55%), radial-gradient(circle at 86% 88%, ${GOLD}0F, transparent 55%)` }} />

      {/* Dark/Light Mode Toggle */}
      <motion.button
        onClick={toggleMode}
        className="fixed top-24 right-6 z-40 h-10 w-10 rounded-full flex items-center justify-center shadow-sm"
        style={glassStyle(theme)}
        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
        aria-label="Toggle theme"
      >
        {mode === "light" ? <Moon size={16} style={{ color: theme.text }} /> : <Sun size={16} style={{ color: theme.text }} />}
      </motion.button>

      {/* ──────────────────────────────────────────────────────────────────
          INTRO
      ────────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="absolute top-20 -right-20 w-[32rem] h-[32rem] rounded-full blur-3xl pointer-events-none" style={{ background: `radial-gradient(circle, ${GREEN}15 0%, transparent 70%)` }} />

        <div className="relative max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          <div className="space-y-6">
            <div>
              <Eyebrow theme={theme}>About {BRAND_NAME}</Eyebrow>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-black tracking-tight leading-[1.05]" style={{ color: theme.text }}>
                Sustainably Sourced,{" "}
                <span style={{ color: GREEN }}>Grilled to Perfection</span>
              </h1>
            </div>

            <div className="space-y-4 text-lg leading-relaxed max-w-lg font-body" style={{ color: theme.textSoft }}>
              <p>
                {BRAND_NAME} delivers premium, eco-consciously raised pork cuts and freshly grilled signature dishes.
                Every selection is prepared using strict farm-to-table hygiene standards, signature rubs, and
                a commitment to natural, wholesome quality.
              </p>
              <p className="text-base" style={{ color: theme.textFaint }}>
                What began as a mission to elevate local meat standards has grown into Uganda's trusted destination
                for safe, exceptionally tender, and responsibly sourced pork. We take pride in delivering a reliable
                and flavorful dining experience straight to your doorstep.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-6">
              <StatChip value="5+" label="Years open" theme={theme} />
              <StatChip value="10K+" label="Orders" theme={theme} />
              <StatChip value="4.9★" label="Rating" theme={theme} />
              <StatChip value="30 min" label="Delivery" theme={theme} />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease }}
            className="relative flex justify-center lg:justify-end select-none"
          >
            <div className="relative max-w-md w-full">
              <img
                src="https://images.unsplash.com/photo-1624462966581-bc6d768cbce5?q=80&w=1000&auto=format&fit=crop"
                alt="GreenPork signature premium tenderloin dish with fresh greens"
                className="w-full object-cover rounded-[2.5rem] shadow-xl aspect-[4/5]"
              />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="absolute -bottom-6 -right-4 sm:-right-8 px-6 py-4 rounded-2xl shadow-xl max-w-[240px]"
                style={glassStyle(theme)}
              >
                <p className="text-[10px] uppercase tracking-[0.2em] mb-1 font-ui font-bold" style={{ color: GREEN }}>Premium</p>
                <h4 className="font-display font-bold text-base leading-tight" style={{ color: theme.text }}>100% Traceable, Farmhouse Fresh</h4>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────
          STORY / FEATURE CARDS
      ────────────────────────────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 gap-6">
          {[
            { icon: Leaf, title: "100% Fresh Selection", text: "Carefully curated premium farm cuts and organic ingredients sourced fresh daily. Hygienically packaged with zero shortcuts." },
            { icon: Award, title: "Award-Winning Recipes", text: "Our signature spices, double-glazing techniques, and precise wood-smoking methods deliver unforgettable local flavors." },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="rounded-[2rem] p-8 md:p-10 transition-all duration-300"
              style={glassStyle(theme)}
            >
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: `${GREEN}10`, color: GREEN }}>
                <item.icon className="w-7 h-7" strokeWidth={1.5} aria-hidden="true" />
              </div>
              <h3 className="font-display font-black text-xl mb-3" style={{ color: theme.text }}>{item.title}</h3>
              <p className="text-sm leading-relaxed font-body" style={{ color: theme.textSoft }}>{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── CORE VALUES ─── */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14 select-none">
            <Eyebrow center theme={theme}>Our Values</Eyebrow>
            <h2 className="text-4xl md:text-5xl font-display font-black" style={{ color: theme.text }}>Why Customers Choose Us</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Leaf, title: "Strictly Fresh", text: "Premium organic farm-fresh pork and chicken, handled and prepared with extreme care daily.", accent: GREEN },
              { icon: ShieldCheck, title: "Guaranteed Hygiene", text: "Hygienically vacuum-sealed cuts and sterile kitchen prep areas standard on every batch.", accent: GREEN, strong: true },
              { icon: Users, title: "Community Focused", text: "Supporting local Ugandan farmers and providing top-tier catering service across Njeru.", accent: GOLD },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="rounded-[2rem] p-8 transition-all duration-300"
                style={glassStyle(theme)}
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: `${item.accent}15`, color: item.accent }}>
                  <item.icon className="w-7 h-7" strokeWidth={1.5} aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-display font-black mb-3" style={{ color: theme.text }}>{item.title}</h3>
                <p className="leading-relaxed text-sm font-body" style={{ color: theme.textSoft }}>{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────
          TEAM
      ────────────────────────────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14 select-none">
            <Eyebrow center theme={theme}>The People</Eyebrow>
            <h2 className="text-4xl md:text-5xl font-display font-black" style={{ color: theme.text }}>Meet Our Team</h2>
          </div>
          <div className="rounded-[2.5rem] p-6 md:p-10" style={glassStyle(theme)}>
            <Staff />
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────
          TESTIMONIALS
      ────────────────────────────────────────────────────────────────── */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="rounded-[2.5rem] p-6 md:p-10" style={glassStyle(theme)}>
            <Testimonials />
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────
          GALLERY
      ────────────────────────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 text-center mb-12 select-none">
          <Eyebrow center theme={theme}>Gallery</Eyebrow>
          <h2 className="text-4xl md:text-5xl font-display font-black" style={{ color: theme.text }}>Our Kitchen & Food</h2>
        </div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="rounded-[2.5rem] p-4 md:p-6 overflow-hidden" style={glassStyle(theme)}>
            <Gallery />
          </div>
        </div>
      </section>

      {/* ─── DELIVERY BANNER ─── */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 select-none">
            <Eyebrow center theme={theme}>Delivery</Eyebrow>
            <h2 className="text-4xl md:text-5xl font-display font-black" style={{ color: theme.text }}>Prompt Dispatch</h2>
          </div>

          {/* Vibrant brand gradient block */}
          <div className="rounded-[2.5rem] overflow-hidden grid lg:grid-cols-2" style={{ background: `linear-gradient(155deg, ${GREEN} 0%, #0bb00b 100%)`, border: `1px solid ${GREEN}30` }}>

            {/* Left — bike image on inset glass panel */}
            <div className="relative min-h-[420px] flex items-center justify-center overflow-hidden select-none" style={{ backgroundColor: "rgba(0,0,0,0.1)" }}>
              <motion.img
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0, y: [0, -8, 0] }}
                viewport={{ once: true }}
                transition={{ opacity: { duration: 0.6 }, x: { duration: 0.6 }, y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
                src={Bike}
                alt="GreenPork delivery rider"
                className="relative z-10 w-full max-w-md object-contain px-6"
              />
              {/* Time badge */}
              <div className="absolute bottom-8 left-8 rounded-2xl px-5 py-3 backdrop-blur-xl" style={{ backgroundColor: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.2)" }}>
                <p className="text-[10px] uppercase tracking-widest font-ui font-bold" style={{ color: "rgba(255,255,255,0.8)" }}>Average time</p>
                <p className="text-2xl font-display font-black text-white">30 min</p>
              </div>
            </div>

            {/* Right — copy + CTA */}
            <div className="px-10 md:px-16 py-16 flex flex-col justify-center text-white">
              <div className="flex items-center gap-2.5 mb-4 select-none">
                <motion.span
                  className="h-1.5 w-1.5 rounded-full bg-white"
                  animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  aria-hidden="true"
                />
                <span className="text-[11px] font-ui font-semibold uppercase tracking-[0.25em] text-white/90">Fast Delivery</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-black leading-tight mb-5 text-white drop-shadow-md">
                Fresh Cuts,<br />
                <span style={{ color: GOLD }}>At Your Door</span>
              </h2>
              <p className="leading-relaxed text-lg mb-8 max-w-sm font-body text-white/90">
                We handle our logistical pipelines strictly to guarantee that your cuts arrive vacuum sealed, cold-stored,
                and fresh for cooking or dining.
              </p>
              <div className="flex flex-wrap gap-4">
                <motion.a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2.5 font-ui font-bold px-7 py-4 rounded-full text-sm uppercase tracking-wide shadow-lg"
                  style={{ backgroundColor: "#000000", color: "#ffffff", boxShadow: `0 10px 28px rgba(0,0,0,0.2)` }}
                >
                  Order Now
                  <ArrowRight size={18} aria-hidden="true" />
                </motion.a>
                <motion.a
                  href={`tel:${WHATSAPP_NUMBER}`}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full font-ui font-bold text-sm uppercase tracking-wide transition-all duration-200 backdrop-blur-md"
                  style={{ backgroundColor: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff" }}
                >
                  <Phone size={16} aria-hidden="true" />
                  <span>Call Us</span>
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 select-none">
            <Eyebrow center theme={theme}>Find Us</Eyebrow>
            <h2 className="text-4xl md:text-5xl font-display font-black" style={{ color: theme.text }}>Get in Touch</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">

            {/* Contact cards */}
            <div className="space-y-4">
              {[
                { icon: MapPin, title: "Location", desc: "Plot 42, Jinja-Kampala Highway, Njeru, Uganda", href: null },
                { icon: Phone, title: "Phone", desc: PHONE_DISPLAY, href: `tel:${WHATSAPP_NUMBER}` },
                { icon: Clock3, title: "Opening Hours", desc: "Monday – Sunday · 10 AM – 10 PM", href: null },
              ].map((item, i) => {
                const Inner = (
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${GREEN}10`, color: GREEN }}>
                      <item.icon className="w-6 h-6" strokeWidth={1.5} aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-[10px] font-ui font-bold uppercase tracking-widest mb-1" style={{ color: theme.textFaint }}>{item.title}</p>
                      <p className="font-display font-bold text-lg leading-tight" style={{ color: theme.text }}>{item.desc}</p>
                    </div>
                    {item.href && <ArrowRight size={16} style={{ color: theme.textFaint }} className="ml-auto" aria-hidden="true" />}
                  </div>
                );

                return item.href ? (
                  <motion.a
                    key={item.title}
                    href={item.href}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    whileHover={{ y: -2 }}
                    className="block rounded-2xl px-6 py-5 transition-all duration-300"
                    style={glassStyle(theme)}
                  >
                    {Inner}
                  </motion.a>
                ) : (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="rounded-2xl px-6 py-5"
                    style={glassStyle(theme)}
                  >
                    {Inner}
                  </motion.div>
                );
              })}

              {/* WhatsApp CTA */}
              <motion.a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-between rounded-2xl px-6 py-5 transition-all duration-200 mt-4 shadow-lg"
                style={{ background: `linear-gradient(135deg, ${GREEN}, #0bb00b)`, border: '1px solid transparent' }}
              >
                <div>
                  <p className="text-[10px] uppercase tracking-widest mb-1 font-ui font-bold text-white/80">Order via</p>
                  <p className="font-display font-black text-lg text-white">WhatsApp</p>
                </div>
                <span className="h-10 w-10 rounded-full flex items-center justify-center bg-white text-stone-900">
                  <ArrowRight size={18} aria-hidden="true" />
                </span>
              </motion.a>
            </div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-[2rem] overflow-hidden aspect-[4/3] lg:aspect-auto lg:h-[500px]"
              style={glassStyle(theme)}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31909.39692968079!2d32.4343!3d0.4244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177db33b5d4c6d9%3A0x9e6c6c6c6c6c6c6c!2sNjeru!5e0!3m2!1sen!2sug!4v1634567890123!5m2!1sen!2sug"
                className="w-full h-full"
                loading="lazy"
                title={`${BRAND_NAME} location`}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="py-12 px-6" style={{ borderTop: `1px solid ${theme.border}` }}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm font-body font-medium" style={{ color: theme.textFaint }}>© {year} {BRAND_NAME}. All rights reserved.</p>
          <Link
            to="/returnPolicy"
            className="text-sm font-ui font-bold transition-colors"
            style={{ color: GREEN }}
          >
            Return Policy
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default About;