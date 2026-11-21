import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Phone,
  Clock,
  MapPin,
  Users,
  Leaf,
  ShieldCheck,
  ArrowRight,
  Flame,
  Zap,
  Star,
  Snowflake,
  Bike as BikeIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import Testimonials from "../components/Testimonials";
import { Staff } from "./Staff";
import Gallery from "../components/Gallery";

import Bike from "../assets/DeliveryBike.png";
import BgImage from "../assets/PorkBg.png";

/* ───────────── CONFIG + DESIGN TOKENS ───────────── */
const BRAND = "Greenpork";
const SLOGAN = "Eat Fresh. Live Happy.";
const PHONE = "+256 776 464 823";
const WHATSAPP = "256776464823";

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

const STATS = [
  { value: "5+", label: "Years Active", icon: null },
  { value: "10K+", label: "Orders Served", icon: null },
  { value: "4.9", label: "Avg Rating", icon: Star },
  { value: "30m", label: "Fast Delivery", icon: Clock },
];

const PHILOSOPHY = [
  {
    num: "01",
    title: "100% Traceable Cuts & Ingredients",
    text: "Carefully selected farm pork, burger patties, pizza dough and toppings, and fresh chicken sourced daily for bold, consistent flavor.",
  },
  {
    num: "02",
    title: "Signature Wood-Smoked Craft",
    text: "Double-glazed finishes and hardwood smoke paired with crisp sides and fast kitchen prep so every order hits the table hot.",
  },
];

const PILLARS = [
  {
    num: "01",
    icon: Leaf,
    title: "Freshly Prepared",
    text: "Daily kitchen prep with fresh ingredients across pork skewers, burgers, pizza, and chicken.",
  },
  {
    num: "02",
    icon: ShieldCheck,
    title: "Clean & Sealed",
    text: "Hygienic preparation and secure packaging from our Gulu City kitchen straight to your handoff.",
  },
  {
    num: "03",
    icon: Users,
    title: "Gulu Community Roots",
    text: "Supporting local producers and serving Gulu City with fast, dependable food and delivery.",
  },
];

const CONTACT_ITEMS = [
  {
    icon: MapPin,
    title: "Location",
    desc: "Gulu City, Uganda",
    href: null,
  },
  {
    icon: Phone,
    title: "Direct Contact",
    desc: PHONE,
    href: `tel:+${WHATSAPP}`,
  },
  {
    icon: Clock,
    title: "Operating Hours",
    desc: "Monday – Sunday · 10:00 AM – 10:00 PM",
    href: null,
  },
];

const TRANSIT_STEPS = [
  { num: "01", title: "Order Confirmed", time: "Instantly", icon: ShieldCheck },
  {
    num: "02",
    title: "Freshly Packed & Sealed",
    time: "Within 10 mins",
    icon: Snowflake,
  },
  { num: "03", title: "Rider Dispatched", time: "Avg 15 mins", icon: BikeIcon },
];

const EASE = [0.16, 1, 0.3, 1];
const SPRING = { type: "spring", stiffness: 220, damping: 26 };
const VIEWPORT = { once: true, margin: "-60px" };

const BIG_WORD_SIZE = "clamp(4.5rem, 21vw, 17rem)";
const HEADING_SIZE = "clamp(2.75rem, 9vw, 7rem)";

const cx = (...classes) => classes.filter(Boolean).join(" ");
const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111]";
const pillClass =
  "flex items-center gap-2 rounded-full border-0 px-4 py-2.5 text-[11px] sm:text-xs font-bold uppercase tracking-wide";
const actionBtnClass =
  "flex items-center gap-2 rounded-full border-0 px-6 py-3.5 text-xs font-extrabold uppercase tracking-wide cursor-pointer";

function Reveal({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={VIEWPORT}
      transition={{ duration: 0.65, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children, icon: Icon = Flame, variant = "dark" }) {
  const tone =
    variant === "limeOnDark"
      ? "bg-[#111111] text-[#D9FF00]"
      : "bg-[#111111] text-[#FFFFFF]";

  return (
    <span
      className={cx(
        "font-display mb-5 inline-flex items-center gap-2 rounded-full border-0 px-4 py-2 text-[11px] font-bold uppercase tracking-wide",
        tone
      )}
    >
      <Icon size={13} strokeWidth={2.5} />
      <span>{children}</span>
    </span>
  );
}

function SectionHeading({
  eyebrow,
  color = PALETTE.ink,
  eyebrowVariant,
  children,
}) {
  return (
    <Reveal>
      <div className="mb-12 md:mb-16">
        <Eyebrow variant={eyebrowVariant}>{eyebrow}</Eyebrow>
        <h2
          className="font-display font-black uppercase leading-[0.85] tracking-[-0.04em]"
          style={{ color, fontSize: HEADING_SIZE }}
        >
          {children}
        </h2>
      </div>
    </Reveal>
  );
}

function SectionContainer({ children, className = "", sectionRef = null }) {
  return (
    <section
      ref={sectionRef}
      className={cx(
        "relative border-0 bg-[#FFFFFF] px-4 py-20 md:py-28 lg:px-12",
        className
      )}
    >
      <div className="relative z-10 mx-auto max-w-7xl">{children}</div>
    </section>
  );
}

export default function About() {
  const year = new Date().getFullYear();

  const introRef = useRef(null);
  const deliveryRef = useRef(null);

  const { scrollYProgress: introProgress } = useScroll({
    target: introRef,
    offset: ["start start", "end start"],
  });
  const yIntroImg = useTransform(introProgress, [0, 1], ["0%", "12%"]);
  const opacityIntro = useTransform(introProgress, [0, 0.8], [1, 0]);

  const { scrollYProgress: deliveryProgress } = useScroll({
    target: deliveryRef,
    offset: ["start end", "end start"],
  });
  const xBike = useTransform(deliveryProgress, [0, 1], ["-15%", "15%"]);

  const LeadIcon = PILLARS[0].icon;
  const secondaryPillars = PILLARS.slice(1);

  return (
    <div className="font-display relative min-h-screen w-full overflow-hidden border-0 bg-[#FFFFFF] text-[#111111] selection:bg-[#D9FF00] selection:text-[#111111]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700;800;900&family=Inter:wght@400;500;600&display=swap');
        .font-display { font-family: 'Archivo', sans-serif; }
        .font-body { font-family: 'Inter', sans-serif; }
      `}</style>

      {/* HERO SPOTLIGHT */}
      <section
        ref={introRef}
        className="relative flex min-h-[100dvh] w-full flex-col overflow-hidden border-0 px-4 pb-8 pt-28 lg:px-12 lg:pt-32"
        style={{ backgroundColor: PALETTE.red }}
      >
        <div className="relative z-20 flex// hidden justify-center">
          <Eyebrow variant="limeOnDark">
            About {BRAND}.
          </Eyebrow>
        </div>

        <div className="relative z-10 flex min-h-0 flex-1 items-center justify-center">
          <motion.div
            style={{ opacity: opacityIntro }}
            className="pointer-events-none absolute inset-0"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
              animate={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: { duration: 0.7, ease: EASE, delay: 0.05 },
              }}
              className="font-display absolute inset-0 flex flex-col items-center justify-center text-center font-black uppercase leading-[0.82] tracking-[-0.04em]"
              style={{ color: "#FFC2B3", fontSize: BIG_WORD_SIZE }}
            >
              <span>Bold</span>
              <span>Craft</span>
            </motion.h1>
          </motion.div>

          <motion.div
            style={{ y: yIntroImg }}
            className="relative z-10 flex w-full items-center justify-center"
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.75,
                rotate: -6,
                filter: "blur(10px)",
              }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: -3,
                filter: "blur(0px)",
                transition: { duration: 0.8, ease: EASE },
              }}
              className="relative aspect-[16/10] h-[34vh] max-w-[90vw] overflow-hidden rounded-[2rem] border-0 sm:h-[40vh] lg:h-[52vh]"
            >
              <img
                src={BgImage}
                alt={`${BRAND} signature food`}
                className="h-full w-full object-cover"
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            animate={{
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.7, ease: EASE, delay: 0.3 },
            }}
            className="font-display absolute bottom-[10%] left-[3%] z-20 -rotate-3 rounded-2xl border-0 px-4 py-2 text-[11px] font-extrabold uppercase text-[#FFFFFF] lg:bottom-[14%] lg:left-[22%] lg:px-5 lg:py-2.5 lg:text-sm"
            style={{ backgroundColor: PALETTE.ink }}
          >
            Gulu City, Uganda
            <span
              className="absolute -bottom-1 left-6 h-3 w-3 rotate-45"
              style={{ backgroundColor: PALETTE.ink }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            animate={{
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.7, ease: EASE, delay: 0.4 },
            }}
            className="font-display absolute right-[3%] top-[22%] z-20 rounded-full border-0 px-4 py-2 text-[11px] font-extrabold uppercase lg:right-[20%] lg:px-5 lg:py-2.5 lg:text-sm"
            style={{ backgroundColor: PALETTE.lime, color: PALETTE.ink }}
          >
            {SLOGAN}
          </motion.div>
        </div>

        <div className="relative z-20 flex flex-col items-center gap-4">
          <p className="font-body max-w-2xl text-center text-sm font-semibold leading-relaxed text-[#FFFFFF] md:text-base">
            {BRAND} brings together wood-smoked pork, juicy burgers, loaded
            pizza, and crispy chicken in Gulu City—built to help you{" "}
            <strong className="font-black text-[#D9FF00]">{SLOGAN}</strong> in
            every bite.
          </p>

          <div className="font-display flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {STATS.map((stat, idx) => {
              const StatIcon = stat.icon;
              return (
                <span
                  key={stat.label}
                  className={cx(
                    pillClass,
                    idx === 0
                      ? "bg-[#111111] text-[#D9FF00]"
                      : "bg-[#111111] text-[#FFFFFF]"
                  )}
                >
                  {StatIcon && (
                    <StatIcon
                      size={13}
                      strokeWidth={2.5}
                      fill={StatIcon === Star ? "currentColor" : "none"}
                    />
                  )}
                  <span>
                    <b className="font-black">{stat.value}</b> {stat.label}
                  </span>
                </span>
              );
            })}
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <SectionContainer>
        <SectionHeading eyebrow="Our Philosophy" color={PALETTE.ink}>
          Built on <br /> Purity &amp; Craft
        </SectionHeading>

        <div className="grid gap-6 md:grid-cols-2">
          {PHILOSOPHY.map((item, idx) => (
            <Reveal
              key={item.num}
              delay={idx * 0.12}
              className="group relative overflow-hidden rounded-[2.5rem] border-0 bg-[#F5F5F5] p-8 transition-colors duration-300 hover:bg-[#EFEFEF] md:p-12"
            >
              <div className="pointer-events-none absolute -right-4 -top-4 opacity-[0.05] transition-transform duration-500 group-hover:rotate-12">
                <Flame className="h-32 w-32 text-[#111111]" strokeWidth={1} />
              </div>
              <span
                className="font-display block text-6xl font-black leading-none tracking-[-0.04em]"
                style={{ color: PALETTE.red }}
              >
                {item.num}
              </span>
              <h3
                className="font-display mb-3 mt-6 text-2xl font-black uppercase leading-tight tracking-tight"
                style={{ color: PALETTE.ink }}
              >
                {item.title}
              </h3>
              <p className="font-body text-sm font-medium leading-relaxed text-[#2A2A2A]">
                {item.text}
              </p>
            </Reveal>
          ))}
        </div>
      </SectionContainer>

      {/* CORE STANDARDS */}
      <SectionContainer className="hidden">
        <SectionHeading eyebrow="Core Standards" color={PALETTE.ink}>
          What Drives <br /> Us Forward
        </SectionHeading>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <Reveal
            delay={0.05}
            className="group flex flex-col justify-between rounded-[2.5rem] border-0 p-8 transition-colors duration-300 md:p-10 lg:col-span-6"
            style={{ backgroundColor: PALETTE.lime, color: PALETTE.ink }}
          >
            <div>
              <div className="mb-10 flex items-center justify-between">
                <span className="font-display text-xs font-black uppercase tracking-widest text-[#111111]">
                  Standard {PILLARS[0].num}
                </span>
                <div className="flex h-14 w-14 items-center justify-center rounded-full border-0 bg-[#111111] text-[#D9FF00]">
                  <LeadIcon className="h-6 w-6" strokeWidth={2.2} />
                </div>
              </div>

              <h3 className="font-display mb-4 text-3xl font-black uppercase leading-[0.95] tracking-tight text-[#111111] md:text-4xl">
                {PILLARS[0].title}
              </h3>
              <p className="font-body max-w-md text-sm font-semibold leading-relaxed text-[#111111] md:text-base">
                {PILLARS[0].text}
              </p>
            </div>

            <div className="mt-10 flex items-center justify-between pt-4">
              <span className="font-display rounded-full border-0 bg-[#111111] px-3.5 py-1.5 text-[10px] font-black uppercase tracking-widest text-[#D9FF00]">
                {BRAND} · {SLOGAN}
              </span>
              <span className="font-display text-5xl font-black leading-none tracking-[-0.04em] text-[#111111]">
                {PILLARS[0].num}
              </span>
            </div>
          </Reveal>

          <div className="flex flex-col gap-6 lg:col-span-6">
            {secondaryPillars.map((item, idx) => {
              const isRedAccent = idx === 0;
              const StepIcon = item.icon;

              return (
                <Reveal
                  key={item.title}
                  delay={0.12 + idx * 0.1}
                  className="group flex flex-1 flex-col justify-between rounded-[2.5rem] border-0 bg-[#F5F5F5] p-8 transition-colors duration-300 hover:bg-[#EFEFEF] md:p-9"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-0"
                      style={{
                        backgroundColor: isRedAccent ? PALETTE.red : PALETTE.ink,
                        color: isRedAccent ? PALETTE.white : PALETTE.lime,
                      }}
                    >
                      <StepIcon className="h-5 w-5" strokeWidth={2.2} />
                    </div>

                    <span
                      className="font-display text-4xl font-black leading-none tracking-[-0.04em]"
                      style={{
                        color: isRedAccent ? PALETTE.red : PALETTE.ink,
                      }}
                    >
                      {item.num}
                    </span>
                  </div>

                  <div className="mt-6">
                    <div className="mb-1.5 flex items-center gap-2">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{
                          backgroundColor: isRedAccent ? PALETTE.red : PALETTE.ink,
                        }}
                      />
                      <span className="font-display text-[11px] font-black uppercase tracking-widest text-[#4A4A4A]">
                        Standard {item.num}
                      </span>
                    </div>
                    <h3
                      className="font-display mb-2 text-2xl font-black uppercase tracking-tight"
                      style={{ color: PALETTE.ink }}
                    >
                      {item.title}
                    </h3>
                    <p className="font-body text-sm font-medium leading-relaxed text-[#2A2A2A]">
                      {item.text}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </SectionContainer>

      {/* TEAM */}
      <SectionContainer>
        <SectionHeading eyebrow="Leadership" color={PALETTE.ink}>
          Meet Our <br /> Team
        </SectionHeading>
        <Reveal
          delay={0.1}
          className="rounded-[2.5rem] border-0 bg-[#F5F5F5] p-6 md:p-10"
        >
          <Staff />
        </Reveal>
      </SectionContainer>

      {/* TESTIMONIALS */}
      <SectionContainer>
        <SectionHeading eyebrow="Endorsements" color={PALETTE.red}>
          Client <br /> Reviews
        </SectionHeading>
        <Reveal
          delay={0.1}
          className="rounded-[2.5rem] border-0 bg-[#F5F5F5] p-6 text-[#111111] md:p-10"
        >
          <Testimonials />
        </Reveal>
      </SectionContainer>

      {/* GALLERY */}
      <SectionContainer>
        <SectionHeading eyebrow="Gallery" color={PALETTE.ink}>
          Inside The <br /> Kitchen
        </SectionHeading>
        <Reveal
          delay={0.1}
          className="rounded-[2.5rem] border-0 bg-[#F5F5F5] p-4 md:p-6"
        >
          <Gallery />
        </Reveal>
      </SectionContainer>

      {/* LOGISTICS */}
      <SectionContainer sectionRef={deliveryRef} className="overflow-hidden">
        <SectionHeading eyebrow="Logistics" color={PALETTE.ink}>
          Swift &amp; Fresh <br /> Dispatch
        </SectionHeading>

        <Reveal delay={0.1}>
          <div className="grid overflow-hidden rounded-[2.5rem] border-0 bg-[#F5F5F5] md:grid-cols-2">
            <div className="flex flex-col justify-center gap-8 p-8 md:p-14 lg:p-16">
              <div className="flex">
                <Eyebrow icon={Zap}>Fast Gulu City Delivery</Eyebrow>
              </div>

              <h3 className="font-display text-4xl font-black uppercase leading-[0.9] tracking-[-0.04em] text-[#111111] sm:text-5xl lg:text-6xl">
                Hot &amp; Fresh <br />
                <span style={{ color: PALETTE.red }}>To Your Doorstep</span>
              </h3>

              <p className="font-body max-w-md text-sm font-medium leading-relaxed text-[#2A2A2A] sm:text-base">
                Every order of pork, burgers, pizza, and chicken is packed
                cleanly and dispatched quickly so your food arrives hot and
                ready to enjoy.
              </p>

              <div className="mt-2 space-y-5">
                {TRANSIT_STEPS.map((step, idx) => {
                  const StepIcon = step.icon;
                  return (
                    <motion.div
                      key={step.num}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={VIEWPORT}
                      transition={{ delay: 0.15 + idx * 0.1, ease: EASE }}
                      className="flex items-center gap-5"
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-0 bg-[#111111] text-[#D9FF00]">
                        <StepIcon size={18} strokeWidth={2.5} />
                      </div>
                      <div className="flex flex-1 items-center justify-between gap-2">
                        <span className="font-display text-sm font-extrabold uppercase tracking-wide text-[#111111]">
                          {step.title}
                        </span>
                        <span className="font-display shrink-0 rounded-full bg-[#FFFFFF] px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[#111111]">
                          {step.time}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-4">
                <motion.a
                  href={`https://wa.me/${WHATSAPP}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  transition={SPRING}
                  className={cx(actionBtnClass, focusRing)}
                  style={{ backgroundColor: PALETTE.lime, color: PALETTE.ink }}
                >
                  <span>Order via WhatsApp</span>
                  <ArrowRight size={14} strokeWidth={2.5} />
                </motion.a>

                <motion.a
                  href={`tel:+${WHATSAPP}`}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  transition={SPRING}
                  className={cx(
                    actionBtnClass,
                    "bg-[#111111] text-[#FFFFFF]",
                    focusRing
                  )}
                >
                  <Phone size={14} strokeWidth={2.5} />
                  <span>Call Us</span>
                </motion.a>
              </div>
            </div>

            <div className="relative flex min-h-[450px] items-center justify-center overflow-hidden border-0 p-8">
              <div
                className="pointer-events-none absolute h-96 w-96 rounded-full"
                style={{ backgroundColor: PALETTE.red }}
              />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ delay: 0.25, ease: EASE }}
                className="absolute right-6 top-12 z-20 hidden rounded-2xl border-0 p-4 md:block"
                style={{ backgroundColor: PALETTE.ink }}
              >
                <div className="flex items-center gap-2 text-[#D9FF00]">
                  <Snowflake size={14} strokeWidth={2.5} />
                  <span className="font-display text-[9px] font-black uppercase tracking-widest">
                    Fresh Prep
                  </span>
                </div>
                <span className="font-display mt-1 block text-2xl font-black text-[#FFFFFF]">
                  Made to Order
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ delay: 0.35, ease: EASE }}
                className="absolute bottom-12 left-6 z-20 rounded-2xl border-0 bg-[#FFFFFF] p-4"
              >
                <div className="flex items-center gap-2 text-[#111111]">
                  <Clock size={14} strokeWidth={2.5} />
                  <span className="font-display text-[9px] font-black uppercase tracking-widest text-[#4A4A4A]">
                    Estimated ETA
                  </span>
                </div>
                <span className="font-display mt-1 block text-2xl font-black text-[#111111]">
                  30 Minutes
                </span>
              </motion.div>

              <motion.img
                style={{ x: xBike }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.75, ease: EASE }}
                src={Bike}
                alt={`${BRAND} delivery rider`}
                className="pointer-events-none relative z-10 w-full max-w-lg border-0 object-contain"
              />
            </div>
          </div>
        </Reveal>
      </SectionContainer>

      {/* CONTACT */}
      <SectionContainer>
        <SectionHeading eyebrow="Location" color={PALETTE.red}>
          Direct <br /> Contact
        </SectionHeading>

        <div className="grid items-stretch gap-6 lg:grid-cols-2">
          <div className="flex flex-col justify-between gap-4">
            {CONTACT_ITEMS.map((item, idx) => {
              const ItemIcon = item.icon;
              const cardBody = (
                <div className="group flex items-center gap-5 rounded-[2rem] border-0 bg-[#F5F5F5] p-5 transition-colors duration-300 hover:bg-[#EFEFEF] md:p-6">
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-0 text-[#D9FF00]"
                    style={{ backgroundColor: PALETTE.ink }}
                  >
                    <ItemIcon className="h-5 w-5" strokeWidth={2.2} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-body mb-1 text-[10px] font-bold uppercase tracking-widest text-[#4A4A4A]">
                      {item.title}
                    </p>
                    <p
                      className="font-display text-sm font-extrabold leading-tight md:text-base"
                      style={{ color: PALETTE.ink }}
                    >
                      {item.desc}
                    </p>
                  </div>
                  {item.href && (
                    <ArrowRight
                      size={16}
                      strokeWidth={2.5}
                      className="ml-auto text-[#111111] transition-transform group-hover:translate-x-1"
                    />
                  )}
                </div>
              );

              return (
                <Reveal key={item.title} delay={idx * 0.1}>
                  {item.href ? (
                    <a
                      href={item.href}
                      className={cx("block rounded-[2rem] border-0", focusRing)}
                    >
                      {cardBody}
                    </a>
                  ) : (
                    cardBody
                  )}
                </Reveal>
              );
            })}

            <Reveal delay={0.25}>
              <motion.a
                href={`https://wa.me/${WHATSAPP}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={SPRING}
                className={cx(
                  "flex items-center justify-between rounded-[2rem] border-0 p-6",
                  focusRing
                )}
                style={{ backgroundColor: PALETTE.lime, color: PALETTE.ink }}
              >
                <div>
                  <p className="font-body mb-1 text-[10px] font-extrabold uppercase tracking-widest text-[#111111]">
                    Instant Support
                  </p>
                  <p className="font-display text-lg font-black uppercase tracking-tight md:text-xl">
                    Start WhatsApp Chat
                  </p>
                </div>
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-full border-0"
                  style={{ backgroundColor: PALETTE.ink }}
                >
                  <ArrowRight
                    size={18}
                    strokeWidth={2.5}
                    className="text-[#D9FF00]"
                  />
                </span>
              </motion.a>
            </Reveal>
          </div>

          <Reveal delay={0.18}>
            <div className="aspect-[4/3] overflow-hidden rounded-[2.5rem] border-0 bg-[#F5F5F5] p-2 lg:aspect-auto lg:h-full lg:min-h-[500px]">
              <iframe
                src="https://www.google.com/maps?q=Gulu,Uganda&output=embed"
                className="h-full w-full rounded-[2rem] border-0"
                loading="lazy"
                title={`${BRAND} Gulu City location`}
              />
            </div>
          </Reveal>
        </div>
      </SectionContainer>

      {/* FOOTER */}
      <footer className="border-0 bg-[#FFFFFF] px-4 py-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-[10px] font-bold uppercase tracking-widest text-[#2A2A2A] sm:flex-row">
          <p>
            © {year} {BRAND}. {SLOGAN}. All rights reserved.
          </p>
          <Link
            to="/returnPolicy"
            className={cx(
              "rounded-full border-0 transition-colors hover:text-[#E11D1D]",
              focusRing
            )}
          >
            Return Policy
          </Link>
        </div>
      </footer>
    </div>
  );
}