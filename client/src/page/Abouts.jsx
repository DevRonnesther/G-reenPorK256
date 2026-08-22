import React, { useMemo, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import {
  Phone, Clock3, MapPin, Users, Award, Leaf,
  ShieldCheck, ArrowRight, Moon, Sun,
} from "lucide-react";
import { Link } from "react-router-dom";
import Testimonials from "../components/Testimonials";
import { Staff } from "./Staff";
import Gallery from "../components/Gallery";

import Bike from "../assets/transbike.png";

// ─── Centralized GreenPork Design Tokens ──────────────────────────────────────
const BRAND = {
  red: "#D90404",
  lime: "#D4FF00",
  white: "#FFFFFF",
  dark: "#2E0101",
};

const BRAND_NAME = "GreenPork";
const WHATSAPP_NUMBER = "256776464823";
const PHONE_DISPLAY = "+(256) 776-464-823";
const cx = (...c) => c.filter(Boolean).join(" ");
const ease = [0.22, 1, 0.36, 1];

const THEME = {
  light: {
    bg: BRAND.white,
    text: BRAND.dark,
    textSoft: "rgba(46,1,1,0.8)",
    textFaint: "rgba(46,1,1,0.6)",
    border: BRAND.dark,
    isDark: false
  },
  dark: {
    bg: BRAND.dark,
    text: BRAND.white,
    textSoft: "rgba(255,255,255,0.85)",
    textFaint: "rgba(255,255,255,0.65)",
    border: BRAND.white,
    isDark: true
  },
};

const FontFace = React.memo(function FontFace() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@500;700;900&family=Inter:wght@400;500;600&display=swap');
      :root {
        --brand-red: ${BRAND.red};
        --brand-lime: ${BRAND.lime};
        --brand-white: ${BRAND.white};
        --brand-dark: ${BRAND.dark};
      }
      .font-display { font-family: 'Archivo', sans-serif; letter-spacing: -0.04em; }
      .font-ui { font-family: 'Inter', sans-serif; }
      .font-body { font-family: 'Inter', sans-serif; }
    `}</style>
  );
});

// ─── GSAP-LIKE SCROLL PROGRESS BAR ────────────────────────────────
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      style={{ scaleX, backgroundColor: BRAND.lime }}
      className="fixed top-0 left-0 right-0 h-1 z-[100] origin-left"
    />
  );
};

// ─── REUSABLE SCROLL REVEAL WRAPPER ───────────────────────────────
const ScrollReveal = ({ children, delay = 0, y = 40, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.8, delay, ease }}
    className={className}
  >
    {children}
  </motion.div>
);

const Eyebrow = ({ children, center = false, theme }) => (
  <div className={cx("flex items-center gap-3 mb-6 font-display font-bold text-xs uppercase tracking-widest", center ? "justify-center" : "")} style={{ color: theme.textFaint }}>
    <span className="h-2 w-2" style={{ backgroundColor: BRAND.lime }} />
    {children}
  </div>
);

const StatChip = ({ value, label, theme }) => (
  <div className="flex flex-col items-start p-4 border-l-2" style={{ borderColor: theme.border }}>
    <span className="text-2xl md:text-3xl font-display font-black leading-none" style={{ color: theme.text }}>{value}</span>
    <span className="text-[10px] font-ui font-bold uppercase tracking-widest mt-2" style={{ color: theme.textFaint }}>{label}</span>
  </div>
);

const About = () => {
  const year = useMemo(() => new Date().getFullYear(), []);
  const [mode, setMode] = useState("light");
  const theme = useMemo(() => ({ ...THEME[mode], mode }), [mode]);
  const toggleMode = useCallback(() => setMode((p) => (p === "light" ? "dark" : "light")), []);

  // --- GSAP-like Scroll Parallax Targets ---
  const introRef = useRef(null);
  const deliveryRef = useRef(null);

  const { scrollYProgress: introProgress } = useScroll({ target: introRef, offset: ["start start", "end start"] });
  const yIntroImg = useTransform(introProgress, [0, 1], ["0%", "25%"]);
  const yIntroCard = useTransform(introProgress, [0, 1], ["0%", "60%"]);
  const opacityIntro = useTransform(introProgress, [0, 0.8], [1, 0]);

  const { scrollYProgress: deliveryProgress } = useScroll({ target: deliveryRef, offset: ["start end", "end start"] });
  const xBike = useTransform(deliveryProgress, [0, 1], ["-15%", "15%"]);
  const rotateBike = useTransform(deliveryProgress, [0, 1], [-3, 3]);

  // Stagger container for intro text
  const containerStagger = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
  };
  const itemStagger = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } }
  };

  return (
    <div className="w-full relative overflow-hidden font-body min-h-screen transition-colors duration-300" style={{ backgroundColor: theme.bg, color: theme.text }}>
      <FontFace />
      <ScrollProgress />

      {/* Dark/Light Mode Toggle */}
      <motion.button
        onClick={toggleMode}
        className="fixed top-24 hidden// right-6 z-40 h-12 w-12 flex items-center justify-center border-2 transition-colors"
        style={{ borderColor: theme.border, color: theme.text }}
        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
        aria-label="Toggle theme"
      >
        {mode === "light" ? <Moon size={18} /> : <Sun size={18} />}
      </motion.button>

      {/* ─── INTRO ─── */}
      <section ref={introRef} className="relative pt-32 pb-16 md:pt-40 md:pb-24 border-b-2 h-screen flex items-center" style={{ borderColor: theme.border }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-12 lg:gap-24 items-center w-full">

          <motion.div variants={containerStagger} initial="hidden" animate="show" style={{ opacity: opacityIntro }} className="space-y-8">
            <motion.div variants={itemStagger}>
              <Eyebrow theme={theme}>About {BRAND_NAME}</Eyebrow>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-black tracking-tighter leading-[0.9]">
                Sustainably Sourced, <br />
                <span className="px-2" style={{ backgroundColor: BRAND.lime, color: BRAND.dark }}>Grilled to Perfection</span>
              </h1>
            </motion.div>

            <motion.div variants={itemStagger} className="space-y-4 text-base md:text-lg leading-relaxed max-w-lg font-body" style={{ color: theme.textSoft }}>
              <p>
                {BRAND_NAME} delivers premium, eco-consciously raised pork cuts and freshly grilled signature dishes.
                Every selection is prepared using strict farm-to-table hygiene standards, signature rubs, and
                a commitment to natural, wholesome quality.
              </p>
              <p className="text-sm" style={{ color: theme.textFaint }}>
                What began as a mission to elevate local meat standards has grown into Uganda's trusted destination
                for safe, exceptionally tender, and responsibly sourced pork.
              </p>
            </motion.div>

            <motion.div variants={itemStagger} className="flex flex-wrap gap-6 pt-4">
              <StatChip value="5+" label="Years open" theme={theme} />
              <StatChip value="10K+" label="Orders" theme={theme} />
              <StatChip value="4.9★" label="Rating" theme={theme} />
              <StatChip value="30 min" label="Delivery" theme={theme} />
            </motion.div>
          </motion.div>

          <motion.div style={{ y: yIntroImg }} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease }} className="relative flex justify-center lg:justify-end select-none mt-8 lg:mt-0">
            <div className="relative max-w-md w-full">
              <img src="https://images.unsplash.com/photo-1624462966581-bc6d768cbce5?q=80&w=1000&auto=format&fit=crop" alt="GreenPork signature dish" className="w-full object-cover aspect-[4/5] border-2" style={{ borderColor: theme.border }} />

              <motion.div style={{ y: yIntroCard }} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }} className="absolute -bottom-6 -left-6 px-6 py-4 shadow-2xl w-full max-w-[240px]" >
                <div style={{ backgroundColor: theme.bg, border: `2px solid ${theme.border}` }} className="px-6 py-4">
                  <p className="text-[10px] uppercase tracking-widest mb-1 font-display font-black" style={{ color: BRAND.lime }}>Premium</p>
                  <h4 className="font-display font-bold text-base leading-tight" style={{ color: theme.text }}>100% Traceable, Farmhouse Fresh</h4>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── STORY / FEATURE CARDS ─── */}
      <section className="py-16 md:py-24 px-6 md:px-12 border-b-2" style={{ borderColor: theme.border }}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
          {[
            { icon: Leaf, title: "100% Fresh Selection", text: "Carefully curated premium farm cuts and organic ingredients sourced fresh daily. Hygienically packaged with zero shortcuts." },
            { icon: Award, title: "Award-Winning Recipes", text: "Our signature spices, double-glazing techniques, and precise wood-smoking methods deliver unforgettable local flavors." },
          ].map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 0.15}>
              <div className="p-8 md:p-10 border-2 transition-colors h-full" style={{ borderColor: theme.border }}>
                <div className="w-14 h-14 flex items-center justify-center mb-8 border-2" style={{ borderColor: theme.border, color: theme.text }}>
                  <item.icon className="w-6 h-6" strokeWidth={2} />
                </div>
                <h3 className="font-display font-black text-2xl md:text-3xl mb-4">{item.title}</h3>
                <p className="text-sm leading-relaxed font-body" style={{ color: theme.textSoft }}>{item.text}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ─── CORE VALUES ─── */}
      <section className="py-16 md:py-24 px-6 md:px-12 border-b-2" style={{ borderColor: theme.border }}>
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="mb-12 md:mb-16">
              <Eyebrow theme={theme}>Our Values</Eyebrow>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black tracking-tighter">Why Valued Clients <br className="md:hidden" />Choose Us</h2>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Leaf, title: "Strictly Fresh", text: "Premium organic farm-fresh pork and chicken, handled and prepared with extreme care daily." },
              { icon: ShieldCheck, title: "Guaranteed Hygiene", text: "Hygienically vacuum-sealed cuts and sterile kitchen prep areas standard on every batch." },
              { icon: Users, title: "Community Focused", text: "Supporting local Ugandan farmers and providing top-tier catering service across Njeru." },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.1}>
                <div className="p-8 border-l-2 h-full" style={{ borderColor: theme.border }}>
                  <item.icon className="w-8 h-8 mb-6" strokeWidth={2} />
                  <h3 className="text-xl md:text-2xl font-display font-black mb-3">{item.title}</h3>
                  <p className="leading-relaxed text-sm font-body" style={{ color: theme.textSoft }}>{item.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TEAM ─── */}
      <section className="py-16 md:py-24 px-6 md:px-12 border-b-2" style={{ borderColor: theme.border }}>
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="mb-12 md:mb-16">
              <Eyebrow theme={theme}>The People</Eyebrow>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black tracking-tighter">Meet Our Team</h2>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="border-2 p-4 md:p-8" style={{ borderColor: theme.border }}>
              <Staff />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-16 md:py-24 px-6 md:px-12 border-b-2" style={{ borderColor: theme.border }}>
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="mb-12 md:mb-16">
              <Eyebrow theme={theme}>Reviews</Eyebrow>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black tracking-tighter">What People Say</h2>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="border-2 p-4 md:p-8" style={{ borderColor: theme.border }}>
              <Testimonials />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── GALLERY ─── */}
      <section className="py-16 md:py-24 px-6 md:px-12 border-b-2" style={{ borderColor: theme.border }}>
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="mb-12 md:mb-16">
              <Eyebrow theme={theme}>Gallery</Eyebrow>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black tracking-tighter">Our Kitchen & Food</h2>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="border-2 p-2 md:p-4 overflow-hidden" style={{ borderColor: theme.border }}>
              <Gallery />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── DELIVERY BANNER (Horizontal Parallax) ─── */}
      <section ref={deliveryRef} className="py-16 md:py-24 px-6 md:px-12 border-b-2" style={{ borderColor: theme.border }}>
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="mb-12 md:mb-16">
              <Eyebrow theme={theme}>Delivery</Eyebrow>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black tracking-tighter">Prompt Dispatch</h2>
            </div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 border-2 border-[#2E0101] bg-[#2E0101] text-[#FFFFFF] relative overflow-hidden">
            <div className="relative min-h-[300px] md:min-h-[450px] flex items-center justify-center overflow-hidden select-none border-b-2 lg:border-b-0 lg:border-r-2 border-[#FFFFFF]/10">
              <motion.img
                style={{ x: xBike, rotate: rotateBike }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                src={Bike}
                alt="GreenPork delivery rider"
                className="relative z-10 w-full max-w-xs md:max-w-2xl object-contain p-8"
              />
              <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 px-5 py-3 border-2 border-[#FFFFFF] z-20">
                <p className="text-[10px] uppercase tracking-widest font-display font-bold text-[#FFFFFF]/60">Average time</p>
                <p className="text-2xl md:text-3xl font-display font-black">30 min</p>
              </div>
            </div>

            <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black leading-[0.9] tracking-tighter mb-6">
                Fresh Cuts, <br /><span style={{ color: BRAND.lime }}>At Your Door</span>
              </h2>
              <p className="leading-relaxed text-base md:text-lg mb-8 max-w-sm font-body text-[#FFFFFF]/70">
                We handle our logistical pipelines strictly to guarantee that your cuts arrive vacuum sealed, cold-stored, and fresh for cooking or dining.
              </p>
              <div className="flex flex-wrap gap-4">
                <motion.a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02, backgroundColor: BRAND.lime }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-3 font-display font-black px-8 py-4 text-sm uppercase tracking-wide text-[#2E0101] shadow-xl"
                  style={{ backgroundColor: BRAND.lime, clipPath: "polygon(0 0, 100% 0, 96% 100%, 0% 100%)" }}
                >
                  Order Now <ArrowRight size={16} strokeWidth={2.5} />
                </motion.a>
                <motion.a
                  href={`tel:${WHATSAPP_NUMBER}`}
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 px-8 py-4 border-2 border-[#FFFFFF]/30 text-[#FFFFFF] font-display font-bold text-sm uppercase tracking-wide transition-colors hover:bg-[#FFFFFF]/5"
                >
                  <Phone size={14} strokeWidth={2.5} /> Call Us
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section className="py-16 md:py-24 px-6 md:px-12 border-b-2" style={{ borderColor: theme.border }}>
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="mb-12 md:mb-16">
              <Eyebrow theme={theme}>Find Us</Eyebrow>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black tracking-tighter">Get in Touch</h2>
            </div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
              {[
                { icon: MapPin, title: "Location", desc: "Plot 42, Jinja-Kampala Highway, Njeru, Uganda", href: null },
                { icon: Phone, title: "Phone", desc: PHONE_DISPLAY, href: `tel:${WHATSAPP_NUMBER}` },
                { icon: Clock3, title: "Opening Hours", desc: "Monday – Sunday · 10 AM – 10 PM", href: null },
              ].map((item, i) => {
                const Inner = (
                  <div className="flex items-center gap-4 p-5 border-2 transition-colors" style={{ borderColor: theme.border }}>
                    <div className="w-12 h-12 flex items-center justify-center shrink-0 border-2" style={{ borderColor: theme.border, color: theme.text }}>
                      <item.icon className="w-5 h-5" strokeWidth={2} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-display font-bold uppercase tracking-widest mb-1" style={{ color: theme.textFaint }}>{item.title}</p>
                      <p className="font-display font-bold text-sm md:text-base leading-tight">{item.desc}</p>
                    </div>
                    {item.href && <ArrowRight size={16} className="ml-auto hidden sm:block" style={{ color: theme.textFaint }} />}
                  </div>
                );
                return item.href ? (
                  <ScrollReveal key={item.title} delay={i * 0.1} y={30}>
                    <motion.a href={item.href} whileHover={{ y: -2 }} className="block">
                      {Inner}
                    </motion.a>
                  </ScrollReveal>
                ) : (
                  <ScrollReveal key={item.title} delay={i * 0.1} y={30}>
                    {Inner}
                  </ScrollReveal>
                );
              })}

              <ScrollReveal delay={0.3} y={30}>
                <motion.a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2, scale: 1.01 }} whileTap={{ scale: 0.99 }}
                  className="flex items-center justify-between p-6 mt-4 text-[#2E0101] shadow-xl"
                  style={{ backgroundColor: BRAND.lime, clipPath: "polygon(0 0, 100% 0, 100% 85%, 95% 100%, 0 100%)" }}
                >
                  <div>
                    <p className="text-[10px] uppercase tracking-widest mb-1 font-display font-bold opacity-60">Order via</p>
                    <p className="font-display font-black text-lg md:text-xl">WhatsApp</p>
                  </div>
                  <ArrowRight size={20} strokeWidth={2.5} />
                </motion.a>
              </ScrollReveal>
            </div>

            <ScrollReveal delay={0.2} y={50}>
              <div className="border-2 overflow-hidden aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[500px]" style={{ borderColor: theme.border }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31909.39692968079!2d32.4343!3d0.4244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177db33b5d4c6d9%3A0x9e6c6c6c6c6c6c6c!2sNjeru!5e0!3m2!1sen!2sug!4v1634567890123!5m2!1sen!2sug"
                  className="w-full h-full grayscale"
                  loading="lazy"
                  title={`${BRAND_NAME} location`}
                  style={{ filter: theme.isDark ? "invert(90%) hue-rotate(180deg)" : "none" }}
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="py-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm font-body font-medium" style={{ color: theme.textFaint }}>© {year} {BRAND_NAME}. All rights reserved.</p>
          <Link to="/returnPolicy" className="text-sm font-display font-bold uppercase tracking-wide transition-colors hover:underline" style={{ color: theme.text }}>
            Return Policy
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default About;