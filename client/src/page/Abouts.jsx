import React, { useMemo } from "react";
import {
  Phone,
  Clock3,
  MapPin,
  Users,
  Award,
  Leaf,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import Testimonials from "../components/Testimonials";
import { Staff } from "./Staff";
import Gallery from "../components/Gallery";

import Bike from "../assets/DeliveryBike.png";

// ─── Config — kept in sync with Hero.jsx / Navbar.jsx / Contact.jsx ──────────
const WHATSAPP_NUMBER = "256776464823";
const PHONE_DISPLAY = "+(256) 776-464-823";
const BRAND_NAME = "GreenPork";

// ─── Section eyebrow — identical dot + line treatment used in Hero / Products ─
const Eyebrow = ({ children }) => (
  <div className="flex items-center justify-center gap-2 mb-3">
    <span className="h-2 w-2 rounded-full bg-[#0edb0e]" aria-hidden="true" />
    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-stone-500">{children}</span>
    <span className="h-px w-10 bg-stone-300" aria-hidden="true" />
  </div>
);

// ─── Stat chip used in intro section ──────────────────────────────────────────
const StatChip = ({ value, label }) => (
  <div className="flex flex-col items-center bg-white border border-stone-100 shadow-sm rounded-2xl px-5 py-3 min-w-[80px]">
    <span className="text-2xl font-black text-stone-900 leading-tight">{value}</span>
    <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mt-0.5 text-center">{label}</span>
  </div>
);

const About = () => {
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <div className="w-full bg-white overflow-hidden text-stone-900">

      {/* ──────────────────────────────────────────────────────────────────────────
          INTRO — flat white, matching Hero's white ground + green/yellow/stone accents
      ────────────────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-16 lg:py-24 bg-white">
        <div className="relative max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left Column — Brand Copy */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="h-2 w-2 rounded-full bg-[#0edb0e]" aria-hidden="true" />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-stone-500">About {BRAND_NAME}</span>
                <span className="h-px w-10 bg-stone-300" aria-hidden="true" />
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-stone-900 tracking-tight leading-[1.1]">
                Sustainably Sourced,{" "}
                <span className="text-[#0edb0e]">Grilled to Perfection</span>
              </h1>
            </div>

            <div className="space-y-4 text-stone-600 text-lg leading-relaxed max-w-lg">
              <p>
                {BRAND_NAME} delivers premium, eco-consciously raised pork cuts and freshly grilled signature dishes.
                Every selection is prepared using strict farm-to-table hygiene standards, signature rubs, and
                a commitment to natural, wholesome quality.
              </p>
              <p className="text-stone-500 text-base">
                What began as a mission to elevate local meat standards has grown into Uganda's trusted destination
                for safe, exceptionally tender, and responsibly sourced pork. We take pride in delivering a reliable
                and flavorful dining experience straight to your doorstep.
              </p>
            </div>

            {/* Clean Stats Row */}
            <div className="flex flex-wrap gap-x-8 gap-y-4 pt-4">
              <StatChip value="5+" label="Years open" />
              <StatChip value="10K+" label="Orders" />
              <StatChip value="4.9★" label="Rating" />
              <StatChip value="30 min" label="Delivery" />
            </div>
          </div>

          {/* Right Column — Editorial Image Presentation */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative max-w-md w-full">
              <img
                src="https://images.unsplash.com/photo-1624462966581-bc6d768cbce5?q=80&w=1000&auto=format&fit=crop"
                alt="GreenPork signature premium tenderloin dish with fresh greens"
                className="w-full object-cover rounded-[2.5rem] shadow-2xl shadow-stone-200/50 aspect-[4/5]"
              />

              {/* Floating badge */}
              <div className="absolute -bottom-6 -right-4 bg-stone-900/95 backdrop-blur-md text-white px-6 py-4.5 rounded-2xl shadow-2xl max-w-[240px]">
                <p className="text-[10px] uppercase tracking-[3px] text-[#0edb0e] mb-1 font-bold">Premium</p>
                <h4 className="font-bold text-base leading-tight">100% Traceable, Farmhouse Fresh</h4>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          STORY / FEATURE CARDS
      ────────────────────────────────────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 gap-6">
          {[
            {
              icon: <Leaf className="w-7 h-7" aria-hidden="true" />,
              title: "100% Fresh Selection",
              text: "Carefully curated premium farm cuts and organic ingredients sourced fresh daily. Hygienically packaged with zero shortcuts.",
              bg: "bg-[#0edb0e]/5",
              iconColor: "text-[#0edb0e]",
              iconBg: "bg-white border border-stone-200",
            },
            {
              icon: <Award className="w-7 h-7" aria-hidden="true" />,
              title: "Award-Winning Recipes",
              text: "Our signature spices, double-glazing techniques, and precise wood-smoking methods deliver unforgettable local flavors.",
              bg: "bg-[#0edb0e]/5",
              iconColor: "text-[#0edb0e]",
              iconBg: "bg-white border border-stone-200",
            },
          ].map((item) => (
            <div
              key={item.title}
              className={`${item.bg} border border-stone-100/50 rounded-[2rem] p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
            >
              <div className={`w-14 h-14 rounded-full ${item.iconBg} flex items-center justify-center mb-5 ${item.iconColor}`}>
                {item.icon}
              </div>
              <h3 className="font-black text-xl mb-2 text-stone-900">{item.title}</h3>
              <p className="text-stone-500 text-sm leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          CORE VALUES
      ────────────────────────────────────────────────────────────────────────── */}
      <section className="py-16 px-6 bg-stone-50/60 border-y border-stone-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <Eyebrow>Our Values</Eyebrow>
            <h2 className="text-4xl md:text-5xl font-black text-stone-900">Why Customers Choose Us</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Leaf className="w-7 h-7" aria-hidden="true" />,
                title: "Strictly Fresh",
                text: "Premium organic farm-fresh pork and chicken, handled and prepared with extreme care daily.",
                bg: "bg-[#0edb0e] text-stone-900",
                accent: "bg-[#0bc50b]"
              },
              {
                icon: <ShieldCheck className="w-7 h-7" aria-hidden="true" />,
                title: "Guaranteed Hygiene",
                text: "Hygienically vacuum-sealed cuts and sterile kitchen prep areas standard on every batch.",
                bg: "bg-stone-900 text-white",
                accent: "bg-stone-800"
              },
              {
                icon: <Users className="w-7 h-7" aria-hidden="true" />,
                title: "Community Focused",
                text: "Supporting local Ugandan farmers and providing top-tier catering service across Njeru.",
                bg: "bg-yellow-400 text-stone-900",
                accent: "bg-yellow-500"
              },
            ].map((item) => (
              <div
                key={item.title}
                className={`${item.bg} rounded-[2rem] p-8 hover:-translate-y-1 transition-all duration-300 hover:shadow-xl`}
              >
                <div className={`w-14 h-14 rounded-full ${item.accent} flex items-center justify-center mb-6`}>
                  {item.icon}
                </div>
                <h3 className="text-2xl font-black mb-3">{item.title}</h3>
                <p className="opacity-80 leading-relaxed text-sm">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          TEAM
      ────────────────────────────────────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <Eyebrow>The People</Eyebrow>
            <h2 className="text-4xl md:text-5xl font-black text-stone-900">Meet Our Team</h2>
          </div>
          <Staff />
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          TESTIMONIALS
      ────────────────────────────────────────────────────────────────────────── */}
      <section className="py-12 bg-stone-50/60">
        <Testimonials />
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          GALLERY
      ────────────────────────────────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 text-center mb-12">
          <Eyebrow>Gallery</Eyebrow>
          <h2 className="text-4xl md:text-5xl font-black text-stone-900">Our Kitchen & Food</h2>
        </div>
        <Gallery />
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          DELIVERY BANNER
      ────────────────────────────────────────────────────────────────────────── */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-7xl mx-auto px-6 text-center mb-12">
            <Eyebrow>Delivery</Eyebrow>
            <h2 className="text-4xl md:text-5xl font-black text-stone-900">Prompt Dispatch</h2>
          </div>
          <div className="rounded-[2.5rem] overflow-hidden shadow-2xl grid lg:grid-cols-2">

            {/* Left — yellow panel, bike image, same solid yellow-400 as Hero's diagonal panel */}
            <div className="relative min-h-[420px] flex items-center justify-center overflow-hidden bg-yellow-400">
              <img
                src={Bike}
                alt="GreenPork delivery rider"
                className="relative z-10 w-full max-w-md object-contain px-6"
                style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.25))" }}
              />
              {/* Time badge */}
              <div className="absolute bottom-8 left-8 bg-white shadow-md text-stone-900 rounded-2xl px-5 py-3">
                <p className="text-[10px] uppercase tracking-widest text-stone-400">Average time</p>
                <p className="text-2xl font-black">30 min</p>
              </div>
            </div>

            {/* Right — white, copy + CTA */}
            <div className="bg-white px-10 md:px-16 py-16 flex flex-col justify-center border-y border-r border-stone-100">
              <div className="flex items-center gap-2 mb-3">
                <span className="h-2 w-2 rounded-full bg-[#0edb0e]" aria-hidden="true" />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-stone-500">Fast Delivery</span>
                <span className="h-px w-10 bg-stone-300" aria-hidden="true" />
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-stone-900 leading-tight mb-5">
                Fresh Cuts,<br />
                <span className="text-[#0edb0e]">At Your Door</span>
              </h2>
              <p className="text-stone-500 leading-relaxed text-lg mb-8 max-w-sm">
                We handle our logistical pipelines strictly to guarantee that your cuts arrive vacuum sealed, cold-stored,
                and fresh for cooking or dining.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 bg-[#0edb0e] hover:bg-[#0bc50b] text-white px-7 py-4 rounded-full font-bold text-sm uppercase tracking-wide transition-colors shadow-xl shadow-[#0edb0e]/25"
                >
                  Order Now
                  <ArrowRight size={18} aria-hidden="true" />
                </a>
                <a
                  href={`tel:${WHATSAPP_NUMBER}`}
                  className="inline-flex items-center gap-2.5 bg-stone-50 hover:bg-stone-100 border border-stone-200 text-stone-800 px-7 py-4 rounded-full font-bold text-sm uppercase tracking-wide transition-colors"
                >
                  <Phone size={16} aria-hidden="true" />
                  Call Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          CONTACT
      ────────────────────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-stone-50/60 border-t border-stone-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Eyebrow>Find Us</Eyebrow>
            <h2 className="text-4xl md:text-5xl font-black text-stone-900">Get in Touch</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">

            {/* Contact cards */}
            <div className="space-y-4">
              {[
                {
                  icon: <MapPin className="w-6 h-6" aria-hidden="true" />,
                  title: "Location",
                  desc: "Plot 42, Jinja-Kampala Highway, Njeru, Uganda",
                  iconColor: "text-[#0edb0e]",
                  iconBg: "bg-[#0edb0e]/10",
                  href: null,
                },
                {
                  icon: <Phone className="w-6 h-6" aria-hidden="true" />,
                  title: "Phone",
                  desc: PHONE_DISPLAY,
                  iconColor: "text-[#0edb0e]",
                  iconBg: "bg-[#0edb0e]/10",
                  href: `tel:${WHATSAPP_NUMBER}`,
                },
                {
                  icon: <Clock3 className="w-6 h-6" aria-hidden="true" />,
                  title: "Opening Hours",
                  desc: "Monday – Sunday · 10 AM – 10 PM",
                  iconColor: "text-[#0edb0e]",
                  iconBg: "bg-[#0edb0e]/10",
                  href: null,
                },
              ].map((item) => {
                const Inner = (
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-full ${item.iconBg} flex items-center justify-center ${item.iconColor} shrink-0`}>
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest text-stone-400 mb-0.5">{item.title}</p>
                      <p className="font-bold text-stone-900 text-lg leading-tight">{item.desc}</p>
                    </div>
                    {item.href && <ArrowRight size={16} className="text-stone-300 ml-auto" aria-hidden="true" />}
                  </div>
                );

                return item.href ? (
                  <a
                    key={item.title}
                    href={item.href}
                    className="block bg-white border border-stone-100 rounded-2xl px-6 py-5 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                  >
                    {Inner}
                  </a>
                ) : (
                  <div
                    key={item.title}
                    className="bg-white border border-stone-100 rounded-2xl px-6 py-5 shadow-sm"
                  >
                    {Inner}
                  </div>
                );
              })}

              {/* WhatsApp CTA */}
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between bg-stone-900 hover:bg-stone-850 text-white rounded-2xl px-6 py-5 shadow-xl hover:scale-[1.01] transition-all duration-200"
              >
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/60 mb-0.5">Order via</p>
                  <p className="font-black text-lg">WhatsApp</p>
                </div>
                <ArrowRight size={20} aria-hidden="true" />
              </a>
            </div>

            {/* Map */}
            <div className="rounded-[2rem] overflow-hidden border border-stone-100 shadow-xl bg-white aspect-[4/3] lg:aspect-auto lg:h-[460px] flex items-center justify-center text-stone-300 text-sm font-semibold">
              <iframe
                src="https://www.google.com/maps/embed?pb="
                className="w-full h-full"
                loading="lazy"
                title={`${BRAND_NAME} location`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-stone-100 py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-stone-400 text-sm font-medium">© {year} {BRAND_NAME}. All rights reserved.</p>
          <Link
            to="/returnPolicy"
            className="text-sm font-bold text-[#0edb0e] hover:text-[#0bc50b] transition-colors"
          >
            Return Policy
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default About;