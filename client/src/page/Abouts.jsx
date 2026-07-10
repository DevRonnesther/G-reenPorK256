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
import { Testimonials } from "../components/Testimonials";
import { Staff } from "./Staff";
import { Gallery } from "../components/Gallery";

import BannerBg from "../assets/pngwing.com (21).png";
import Bike from "../assets/DeliveryBike.png";

// ─── Config — kept in sync with Hero.jsx / Navbar.jsx / Contact.jsx ──────────
const WHATSAPP_NUMBER = "256776464823";
const PHONE_DISPLAY = "+(256) 776-464-823";
const BRAND_NAME = "EverGrill";

// ─── Stat chip used in intro section — light card, matches Hero's stat cards ──
const StatChip = ({ value, label }) => (
  <div className="flex flex-col items-center bg-white border border-stone-100 shadow-sm rounded-2xl px-5 py-3 min-w-[80px]">
    <span className="text-2xl font-black text-stone-900 leading-tight">{value}</span>
    <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mt-0.5 text-center">{label}</span>
  </div>
);

// ─── Section eyebrow label ─────────────────────────────────────────────────────
const Eyebrow = ({ children }) => (
  <p className="inline-flex items-center gap-1.5 text-orange-600 text-xs font-black uppercase tracking-[3px] mb-3">
    <span className="w-4 h-0.5 bg-orange-600 rounded-full" aria-hidden="true" />
    {children}
    <span className="w-4 h-0.5 bg-orange-600 rounded-full" aria-hidden="true" />
  </p>
);

const About = () => {
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <div className="w-full bg-white overflow-hidden text-gray-900">

      {/* ──────────────────────────────────────────────────────────────────────────
          INTRO — flat white/yellow split, matching Hero's diagonal panel language
          instead of a dark gradient banner.
      ────────────────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* Diagonal yellow accent, same treatment as Hero's split panel */}
        <div
          aria-hidden="true"
          className="hidden lg:block absolute inset-0 bg-yellow-400"
          style={{ clipPath: "polygon(68% 0, 100% 0, 100% 100%, 48% 100%)" }}
        />

        <div className="relative max-w-7xl mx-auto px-6 md:px-12 pt-12 pb-20 grid lg:grid-cols-2 gap-12 items-center">

          {/* Left — copy */}
          <div>
            <Eyebrow>About {BRAND_NAME}</Eyebrow>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-stone-900 leading-[1.05] mb-6">
              Crafted with Passion,{" "}
              <span className="text-orange-600">Served with Excellence</span>
            </h1>

            <p className="text-stone-500 text-lg leading-relaxed mb-4 max-w-lg">
              {BRAND_NAME} delivers premium grilled meals crafted with freshness, bold flavor,
              and modern culinary creativity — using carefully selected ingredients for
              unforgettable dining experiences.
            </p>
            <p className="text-stone-400 leading-relaxed mb-10 max-w-lg">
              What started as a passion for quality food has grown into a destination
              where families and food lovers enjoy rich flavors, fast delivery, and
              premium service every day.
            </p>

            {/* Stats strip */}
            <div className="flex flex-wrap gap-3">
              <StatChip value="5+" label="Years open" />
              <StatChip value="10K+" label="Orders" />
              <StatChip value="4.9★" label="Rating" />
              <StatChip value="30 min" label="Delivery" />
            </div>
          </div>

          {/* Right — image card */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative bg-white border border-stone-100 rounded-[40px] p-5 shadow-xl max-w-md w-full">
              <img
                src={BannerBg}
                alt={`${BRAND_NAME} signature dish`}
                className="w-full object-contain rounded-[28px]"
              />

              {/* Floating badge */}
              <div className="absolute -bottom-5 -right-4 bg-stone-900 text-white px-5 py-3.5 rounded-2xl shadow-xl">
                <p className="text-[10px] uppercase tracking-[3px] text-white/60">Premium</p>
                <h4 className="font-black text-base leading-tight">Quality, Grilled Right</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          STORY / FEATURE CARDS
      ────────────────────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 gap-6">
          {[
            {
              icon: <Leaf className="w-7 h-7" aria-hidden="true" />,
              title: "Fresh Ingredients",
              text: "Carefully selected premium meat and produce, sourced fresh every single day — no shortcuts, no compromises.",
              bg: "bg-orange-50",
              iconColor: "text-orange-600",
              iconBg: "bg-orange-100",
            },
            {
              icon: <Award className="w-7 h-7" aria-hidden="true" />,
              title: "Premium Quality",
              text: "Exceptional preparation standards and bold, unforgettable flavor in every dish we serve.",
              bg: "bg-yellow-50",
              iconColor: "text-yellow-600",
              iconBg: "bg-yellow-100",
            },
          ].map((item) => (
            <div
              key={item.title}
              className={`${item.bg} border border-gray-100 rounded-3xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
            >
              <div className={`w-14 h-14 rounded-2xl ${item.iconBg} flex items-center justify-center mb-5 ${item.iconColor}`}>
                {item.icon}
              </div>
              <h3 className="font-black text-xl mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          CORE VALUES
      ────────────────────────────────────────────────────────────────────────── */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <Eyebrow>Our Values</Eyebrow>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900">Why Customers Love Us</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: <Leaf className="w-7 h-7" aria-hidden="true" />, title: "Fresh Ingredients", text: "Only premium farm-fresh ingredients, prepared daily with care.", bg: "bg-orange-600", accent: "bg-orange-700" },
              { icon: <ShieldCheck className="w-7 h-7" aria-hidden="true" />, title: "Trusted Quality", text: "Prepared with hygiene, consistency, and a high standard every time.", bg: "bg-gray-900", accent: "bg-gray-800" },
              { icon: <Users className="w-7 h-7" aria-hidden="true" />, title: "Community", text: "Creating memorable dining moments for families across Gulu.", bg: "bg-yellow-500", accent: "bg-yellow-600" },
            ].map((item) => (
              <div
                key={item.title}
                className={`${item.bg} rounded-3xl p-8 text-white hover:-translate-y-1 transition-all duration-300 hover:shadow-2xl`}
              >
                <div className={`w-14 h-14 rounded-2xl ${item.accent} flex items-center justify-center mb-6`}>
                  {item.icon}
                </div>
                <h3 className="text-2xl font-black mb-3">{item.title}</h3>
                <p className="text-white/70 leading-relaxed text-sm">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          TEAM
      ────────────────────────────────────────────────────────────────────────── */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <Eyebrow>The People</Eyebrow>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900">Meet Our Team</h2>
          </div>
          <Staff />
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          TESTIMONIALS
      ────────────────────────────────────────────────────────────────────────── */}
      <section className="py-12 bg-gray-50">
        <Testimonials />
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          GALLERY
      ────────────────────────────────────────────────────────────────────────── */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 text-center mb-12">
          <Eyebrow>Gallery</Eyebrow>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900">Our Kitchen & Food</h2>
        </div>
        <Gallery />
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          DELIVERY BANNER — yellow panel + bike image, replacing the old dark
          gradient half with the same flat brand color as Hero's split panel.
      ────────────────────────────────────────────────────────────────────────── */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-7xl mx-auto px-6 text-center mb-12">
            <Eyebrow>Delivery</Eyebrow>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900">Fast Delivery</h2>
          </div>
          <div className="rounded-[48px] overflow-hidden shadow-2xl grid lg:grid-cols-2">

            {/* Left — yellow panel, bike image */}
            <div className="relative min-h-[420px] flex items-center justify-center overflow-hidden bg-yellow-400">
              <img
                src={Bike}
                alt="EverGrill delivery rider"
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
            <div className="bg-white px-10 md:px-16 py-16 flex flex-col justify-center">
              <Eyebrow>Fast Delivery</Eyebrow>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-5">
                Fresh Food,<br />
                <span className="text-orange-600">At Your Door</span>
              </h2>
              <p className="text-gray-500 leading-relaxed text-lg mb-8 max-w-sm">
                We guarantee fast, reliable delivery so your meal arrives hot, fresh,
                and ready to enjoy — any time of day.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 bg-stone-900 hover:bg-stone-800 text-white px-7 py-4 rounded-2xl font-black text-base transition-all shadow-xl hover:scale-[1.02]"
                >
                  Order Now
                  <ArrowRight size={18} aria-hidden="true" />
                </a>
                <a
                  href={`tel:+${WHATSAPP_NUMBER}`}
                  className="inline-flex items-center gap-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 px-7 py-4 rounded-2xl font-black text-base transition-all"
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
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Eyebrow>Find Us</Eyebrow>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900">Get in Touch</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">

            {/* Contact cards */}
            <div className="space-y-4">
              {[
                {
                  icon: <MapPin className="w-6 h-6" aria-hidden="true" />,
                  title: "Location",
                  desc: "123 Pork Avenue, Gulu City",
                  iconColor: "text-orange-600",
                  iconBg: "bg-orange-100",
                  href: null,
                },
                {
                  icon: <Phone className="w-6 h-6" aria-hidden="true" />,
                  title: "Phone",
                  desc: PHONE_DISPLAY,
                  iconColor: "text-emerald-600",
                  iconBg: "bg-emerald-100",
                  href: `tel:+${WHATSAPP_NUMBER}`,
                },
                {
                  icon: <Clock3 className="w-6 h-6" aria-hidden="true" />,
                  title: "Opening Hours",
                  desc: "Monday – Sunday · 10 AM – 10 PM",
                  iconColor: "text-amber-500",
                  iconBg: "bg-amber-100",
                  href: null,
                },
              ].map((item) => {
                const Inner = (
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-2xl ${item.iconBg} flex items-center justify-center ${item.iconColor} shrink-0`}>
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-0.5">{item.title}</p>
                      <p className="font-bold text-gray-900 text-lg leading-tight">{item.desc}</p>
                    </div>
                    {item.href && <ArrowRight size={16} className="text-gray-300 ml-auto" aria-hidden="true" />}
                  </div>
                );

                return item.href ? (
                  <a
                    key={item.title}
                    href={item.href}
                    className="block bg-white border border-gray-100 rounded-2xl px-6 py-5 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                  >
                    {Inner}
                  </a>
                ) : (
                  <div
                    key={item.title}
                    className="bg-white border border-gray-100 rounded-2xl px-6 py-5 shadow-sm"
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
                className="flex items-center justify-between bg-stone-900 hover:bg-stone-800 text-white rounded-2xl px-6 py-5 shadow-xl hover:scale-[1.01] transition-all duration-200"
              >
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/60 mb-0.5">Order via</p>
                  <p className="font-black text-lg">WhatsApp</p>
                </div>
                <ArrowRight size={20} aria-hidden="true" />
              </a>
            </div>

            {/* Map */}
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-xl bg-white aspect-[4/3] lg:aspect-auto lg:h-[460px] flex items-center justify-center text-gray-300 text-sm font-semibold">
              {/* NOTE: embed src below is a placeholder ("pb=" with no value) and
                  will render a blank/broken map. Replace with a real Google Maps
                  embed URL for the Gulu location before shipping. */}
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
      <footer className="border-t border-gray-100 py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm font-medium">© {year} {BRAND_NAME}. All rights reserved.</p>
          <Link
            to="/returnPolicy"
            className="text-sm font-bold text-orange-600 hover:text-orange-700 transition-colors"
          >
            Return Policy
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default About;