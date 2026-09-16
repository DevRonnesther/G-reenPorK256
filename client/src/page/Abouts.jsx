import React, { useMemo, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Phone, Clock3, MapPin, Users, Award, Leaf,
  ShieldCheck, ArrowRight, Flame, Zap
} from "lucide-react";
import { Link } from "react-router-dom";
import Testimonials from "../components/Testimonials";
import { Staff } from "./Staff";
import Gallery from "../components/Gallery";

import Bike from "../assets/transbike.png";

/* ═══════════════════════════════════════════════════════════
   DESIGN TOKENS — High-Contrast & Border-less Structural Layout
   ═══════════════════════════════════════════════════════════ */
const BRAND = {
  primary: "#D90404",
  primaryHover: "#B80303",
  primaryText: "#FFFFFF",
  accent: "#D4FF00",
  accentText: "#000000",
  dark: "#2E0101",
};

const BRAND_NAME = "Green Pork";
const WHATSAPP_NUMBER = "256776464823";
const PHONE_DISPLAY = "+(256) 776-464-823";
const cx = (...c) => c.filter(Boolean).join(" ");
const smoothTransition = { duration: 0.8, ease: [0.16, 1, 0.3, 1] };

const FontFace = React.memo(function FontFace() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,700&family=Outfit:wght@600;700;800;900&family=Fraunces:ital,wght@1,500;1,600&display=swap');
      .font-display { font-family: 'Outfit', sans-serif; letter-spacing: -0.04em; }
      .font-body { font-family: 'Plus Jakarta Sans', sans-serif; }
      .font-accent { font-family: 'Fraunces', serif; font-style: italic; }
    `}</style>
  );
});

// ─── UNIQUE SCROLL REVEAL WRAPPER ───────────────────────────────
const ScrollReveal = ({ children, delay = 0, y = 30, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ ...smoothTransition, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

const Eyebrow = ({ children, center = false }) => (
  <div className={cx("flex items-center gap-2 mb-4 font-accent text-sm", center ? "justify-center" : "")} style={{ color: "#71717A" }}>
    <Flame size={14} style={{ color: BRAND.primary }} />
    <span>{children}</span>
  </div>
);

const StatBlock = ({ value, label }) => (
  <div className="flex flex-col items-start p-6 bg-black/[0.03] transition-colors hover:bg-black/[0.06]">
    <span className="text-3xl md:text-4xl font-display font-black tracking-tighter text-[#2E0101]">{value}</span>
    <span className="text-[10px] font-display font-bold uppercase tracking-widest mt-2 text-[#2E0101]/50">{label}</span>
  </div>
);

const About = () => {
  const year = useMemo(() => new Date().getFullYear(), []);

  const introRef = useRef(null);
  const deliveryRef = useRef(null);

  const { scrollYProgress: introProgress } = useScroll({ target: introRef, offset: ["start start", "end start"] });
  const yIntroImg = useTransform(introProgress, [0, 1], ["0%", "10%"]);
  const opacityIntro = useTransform(introProgress, [0, 0.8], [1, 0]);

  const { scrollYProgress: deliveryProgress } = useScroll({ target: deliveryRef, offset: ["start end", "end start"] });
  const xBike = useTransform(deliveryProgress, [0, 1], ["-8%", "8%"]);

  return (
    <div className="w-full relative overflow-hidden font-body min-h-screen bg-white text-[#2E0101] selection:bg-[#D4FF00] selection:text-black">
      <FontFace />

      {/* ─── UNIQUE EDITORIAL HERO SECTION ─── */}
      <section ref={introRef} className="relative pt-36 pb-20 md:pt-48 md:pb-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div style={{ opacity: opacityIntro }} className="space-y-8">
            <div className="grid lg:grid-cols-12 gap-8 items-end">
              <div className="lg:col-span-8">
                <Eyebrow>About {BRAND_NAME}</Eyebrow>
                <h1 className="text-5xl sm:text-7xl lg:text-8xl font-display font-black tracking-tighter uppercase leading-[0.88] text-[#2E0101]">
                  Uncompromising <br />
                  <span className="text-transparent" style={{ WebkitTextStroke: "2px #2E0101" }}>Farm Fresh</span> Quality
                </h1>
              </div>
              <div className="lg:col-span-4 pb-2">
                <p className="text-sm md:text-base leading-relaxed text-[#2E0101]/75 font-medium">
                  {BRAND_NAME} merges traditional wood-smoking mastery with rigorous modern hygiene standards to serve Uganda’s finest pork dishes and raw farm cuts.
                </p>
              </div>
            </div>

            {/* Asymmetric Visual Split */}
            <div className="grid lg:grid-cols-12 gap-8 pt-8 items-center">
              <motion.div style={{ y: yIntroImg }} className="lg:col-span-7 bg-black/[0.03] p-3 md:p-6">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1624462966581-bc6d768cbce5?q=80&w=1000&auto=format&fit=crop"
                    alt="GreenPork signature dish"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-[#2E0101] text-white px-4 py-1.5 font-display text-[10px] uppercase tracking-widest font-black">
                    Est. Njeru, Uganda
                  </div>
                </div>
              </motion.div>

              <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                <StatBlock value="5+" label="Years Active" />
                <StatBlock value="10K+" label="Clients Served" />
                <StatBlock value="4.9★" label="Average Rating" />
                <StatBlock value="30m" label="Fast Dispatch" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── DIAGONAL / STACKED FEATURE STRIP ─── */}
      <section className="py-20 md:py-32 px-6 md:px-12 bg-[#2E0101] text-white">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="mb-16">
              <span className="text-[#D4FF00] font-display font-bold uppercase tracking-widest text-xs block mb-2">// OUR PHILOSOPHY</span>
              <h2 className="text-4xl md:text-6xl font-display font-black tracking-tighter uppercase">Built on Purity & Craft</h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-px bg-white/10">
            {[
              { num: "01", title: "100% Traceable Selection", text: "Carefully curated premium farm cuts and organic ingredients sourced daily from reliable, trusted local livestock caretakers." },
              { num: "02", title: "Master Wood-Smoked Flavor", text: "Specialized double-glazing methods combined with native hardwood smoke to build complex, unmatched flavor textures." },
            ].map((item, i) => (
              <ScrollReveal key={item.num} delay={i * 0.15} className="bg-[#2E0101] p-10 md:p-14 flex flex-col justify-between">
                <div>
                  <span className="font-display font-black text-4xl text-[#D4FF00] mb-6 block">{item.num}</span>
                  <h3 className="font-display font-black text-2xl mb-4 uppercase tracking-tight">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-white/70 font-medium">{item.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CORE PILLARS (Clean Minimalist Column Layout) ─── */}
      <section className="py-20 md:py-32 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="max-w-xl mb-20">
              <Eyebrow>Core Standards</Eyebrow>
              <h2 className="text-4xl md:text-6xl font-display font-black tracking-tighter uppercase text-[#2E0101]">What Drives Us Forward</h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: Leaf, title: "Strictly Fresh", text: "Organic farm-fresh handling with strict daily turnarounds ensuring peak tenderness." },
              { icon: ShieldCheck, title: "Guaranteed Hygiene", text: "Vacuum-sealed packaging protocols and pristine sanitation frameworks maintained end-to-end." },
              { icon: Users, title: "Community First", text: "Empowering regional farmers and building a reliable culinary hub right in Njeru." },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.1} className="flex flex-col">
                <div
                  className="w-12 h-12 flex items-center justify-center mb-6 shadow-sm"
                  style={{ backgroundColor: BRAND.accent, clipPath: "polygon(0 0, 100% 0, 85% 100%, 0% 100%)", color: "#2E0101" }}
                >
                  <item.icon className="w-5 h-5" strokeWidth={2.2} />
                </div>
                <h3 className="text-xl font-display font-black mb-3 uppercase tracking-tight text-[#2E0101]">{item.title}</h3>
                <p className="text-sm leading-relaxed text-[#2E0101]/70 font-medium">{item.text}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TEAM SECTION ─── */}
      <section className="py-20 md:py-32 px-6 md:px-12 bg-black/[0.03]">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="mb-16">
              <Eyebrow>Leadership</Eyebrow>
              <h2 className="text-4xl md:text-5xl font-display font-black tracking-tighter uppercase text-[#2E0101]">Meet Our Team</h2>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1} className="bg-white p-6 md:p-12 border border-black/5">
            <Staff />
          </ScrollReveal>
        </div>
      </section>

      {/* ─── TESTIMONIALS SECTION ─── */}
      <section className="py-20 md:py-32 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="mb-16">
              <Eyebrow>Endorsements</Eyebrow>
              <h2 className="text-4xl md:text-5xl font-display font-black tracking-tighter uppercase text-[#2E0101]">Client Reviews</h2>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1} className="bg-black/[0.03] p-6 md:p-12">
            <Testimonials />
          </ScrollReveal>
        </div>
      </section>

      {/* ─── GALLERY SECTION ─── */}
      <section className="py-20 md:py-32 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="mb-16">
              <Eyebrow>Gallery</Eyebrow>
              <h2 className="text-4xl md:text-5xl font-display font-black tracking-tighter uppercase text-[#2E0101]">Inside The Kitchen</h2>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1} className="bg-black/[0.03] p-4 border border-black/5">
            <Gallery />
          </ScrollReveal>
        </div>
      </section>

      {/* ─── ENHANCED LOGISTICS BANNER ─── */}
      <section ref={deliveryRef} className="py-20 md:py-32 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="mb-16">
              <Eyebrow>Logistics</Eyebrow>
              <h2 className="text-4xl md:text-5xl font-display font-black tracking-tighter uppercase text-[#2E0101]">Swift & Cold-Stored Dispatch</h2>
            </div>
          </ScrollReveal>

          {/* === enhanced delivery section === */}
          <div className="grid lg:grid-cols-12 bg-[#2E0101] text-white overflow-hidden shadow-2xl rounded-none">
            <div className="lg:col-span-6 relative min-h-[400px] flex items-center justify-center bg-gradient-to-br from-[#3E0202] via-[#2E0101] to-[#1A0101] p-8 overflow-hidden">
              <div
                className="absolute w-72 h-72 rounded-full blur-[100px] pointer-events-none"
                style={{ backgroundColor: BRAND.primary, opacity: 0.2 }}
              />
              <motion.img
                style={{ x: xBike }}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                src={Bike}
                alt="GreenPork delivery rider"
                className="relative z-10 w-full max-w-md object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.6)] scale-110"
              />
              <div className="absolute bottom-6 left-6 z-20 bg-[#D4FF00] text-black px-4 py-2 font-display font-black text-xs uppercase tracking-[0.15em] shadow-lg">
                Average Window: 30 Minutes
              </div>
            </div>

            <div className="lg:col-span-6 p-8 md:p-14 lg:p-16 flex flex-col justify-center space-y-6">
              <div className="inline-flex items-center gap-2 text-[10px] font-display font-bold uppercase tracking-[0.25em] text-[#D4FF00]">
                <Zap size={13} /> Swift & Cold-Chain Secure
              </div>

              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black leading-[1.05] tracking-tight uppercase">
                Fresh Cuts Delivered <br />
                <span style={{ color: BRAND.accent }}>To Your Doorstep</span>
              </h3>

              <p className="font-body text-sm sm:text-base leading-relaxed text-white/80 font-medium max-w-lg">
                Every order is vacuum-sealed and temperature-regulated right up until handoff, guaranteeing pristine quality whether you're grilling tonight or stocking up.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <motion.a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative inline-flex items-center gap-3 font-display font-black px-8 py-4 text-xs uppercase tracking-widest text-[#2E0101] shadow-xl overflow-hidden"
                  style={{
                    backgroundColor: BRAND.accent,
                    clipPath: "polygon(0 0, 100% 0, 95% 100%, 0% 100%)",
                  }}
                >
                  <div className="absolute inset-0 bg-black/10 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none" />
                  <span className="relative z-10 flex items-center gap-2">
                    Order via WhatsApp <ArrowRight size={15} strokeWidth={2.5} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </motion.a>

                <motion.a
                  href={`tel:${WHATSAPP_NUMBER}`}
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)" }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2.5 px-8 py-4 bg-white/[0.04] text-white font-display font-bold text-xs uppercase tracking-widest transition-colors backdrop-blur-md border border-white/10"
                >
                  <Phone size={14} strokeWidth={2.5} style={{ color: BRAND.accent }} /> Call Us Directly
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CONTACT & LOCATION INFO ─── */}
      <section className="py-20 md:py-32 px-6 md:px-12 bg-black/[0.03]">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="mb-16">
              <Eyebrow>Location</Eyebrow>
              <h2 className="text-4xl md:text-5xl font-display font-black tracking-tighter uppercase text-[#2E0101]">Direct Contact</h2>
            </div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-8 items-stretch">
            <div className="space-y-4 flex flex-col justify-between">
              {[
                { icon: MapPin, title: "Physical Location", desc: "Plot 42, Jinja-Kampala Highway, Njeru, Uganda", href: null },
                { icon: Phone, title: "Direct Contact", desc: PHONE_DISPLAY, href: `tel:${WHATSAPP_NUMBER}` },
                { icon: Clock3, title: "Operating Hours", desc: "Monday – Sunday · 10 AM – 10 PM", href: null },
              ].map((item, i) => {
                const Inner = (
                  <div className="flex items-center gap-5 p-6 bg-white transition-colors hover:bg-black/[0.02]">
                    <div
                      className="w-12 h-12 flex items-center justify-center shrink-0 text-[#2E0101]"
                      style={{ backgroundColor: BRAND.accent, clipPath: "polygon(0 0, 100% 0, 85% 100%, 0% 100%)" }}
                    >
                      <item.icon className="w-5 h-5" strokeWidth={2.2} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-display font-bold uppercase tracking-widest mb-1 text-[#2E0101]/50">{item.title}</p>
                      <p className="font-display font-bold text-sm md:text-base leading-tight text-[#2E0101]">{item.desc}</p>
                    </div>
                    {item.href && <ArrowRight size={16} className="ml-auto text-[#2E0101]/40" />}
                  </div>
                );
                return item.href ? (
                  <ScrollReveal key={item.title} delay={i * 0.1} y={20}>
                    <motion.a href={item.href} className="block">
                      {Inner}
                    </motion.a>
                  </ScrollReveal>
                ) : (
                  <ScrollReveal key={item.title} delay={i * 0.1} y={20}>
                    {Inner}
                  </ScrollReveal>
                );
              })}

              <ScrollReveal delay={0.3} y={20}>
                <motion.a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ backgroundColor: "#200101" }}
                  whileTap={{ scale: 0.99 }}
                  className="flex items-center justify-between p-6 text-white shadow-md"
                  style={{ backgroundColor: BRAND.dark, clipPath: "polygon(0 0, 100% 0, 98% 100%, 0% 100%)" }}
                >
                  <div>
                    <p className="text-[10px] uppercase tracking-widest mb-1 font-display font-bold text-white/60">Instant Support</p>
                    <p className="font-display font-black text-lg md:text-xl uppercase">Start WhatsApp Chat</p>
                  </div>
                  <span
                    className="w-10 h-10 flex items-center justify-center text-[#2E0101]"
                    style={{ backgroundColor: BRAND.accent, clipPath: "polygon(0 0, 100% 0, 85% 100%, 0% 100%)" }}
                  >
                    <ArrowRight size={18} strokeWidth={2.5} />
                  </span>
                </motion.a>
              </ScrollReveal>
            </div>

            <ScrollReveal delay={0.2} y={30}>
              <div className="overflow-hidden aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[500px] bg-white p-3 border border-black/5">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31909.39692968079!2d32.4343!3d0.4244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177db33b5d4c6d9%3A0x9e6c6c6c6c6c6c6c!2sNjeru!5e0!3m2!1sen!2sug!4v1634567890123!5m2!1sen!2sug"
                  className="w-full h-full grayscale contrast-125"
                  loading="lazy"
                  title={`${BRAND_NAME} location`}
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="py-10 px-6 md:px-12 bg-white text-[#2E0101]/60">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium">
          <p>© {year} {BRAND_NAME}. All rights reserved.</p>
          <Link to="/returnPolicy" className="font-display font-bold uppercase tracking-wider text-[#2E0101] hover:text-[#D90404] transition-colors">
            Return Policy
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default About;