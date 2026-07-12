import React, { useMemo } from "react";
import { Link } from "react-router-dom";
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

// Semantic Page Components
import Testimonials from "../components/Testimonials";
import { Staff } from "./Staff";
import Gallery from "../components/Gallery";

// Assets
import BannerBg from "../assets/pngwing.com (21).png";
import Bike from "../assets/DeliveryBike.png";

// ─── CONFIGURATION ───────────────────────────────────────────────────────────
const WHATSAPP_NUMBER = "256776464823";
const PHONE_DISPLAY = "+(256) 776-464-823";
const BRAND_NAME = "GreenPork";

// ─── LOCAL SUB-COMPONENTS ────────────────────────────────────────────────────
const StatChip = ({ value, label }) => (
  <div className="flex flex-col items-center justify-center bg-stone-50/70 rounded-2xl px-5 py-4 min-w-[95px]">
    <span className="text-3xl font-extrabold text-stone-900 tracking-tight leading-none">
      {value}
    </span>
    <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-stone-400 mt-2.5 text-center">
      {label}
    </span>
  </div>
);

const Eyebrow = ({ children }) => (
  <p className="inline-flex items-center gap-2 text-red-600 text-xs font-bold uppercase tracking-[0.15em] mb-3">
    <span className="w-1.5 h-1.5 rounded-full bg-red-600" aria-hidden="true" />
    {children}
  </p>
);

// ─── MAIN ABOUT PAGE ─────────────────────────────────────────────────────────
const About = () => {
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <div className="w-full bg-white overflow-hidden text-stone-900">

      {/* ── SECTION 1: INTRO (Asymmetric Hero Grid) ── */}
      <section className="relative overflow-hidden py-16 lg:py-24">
        <div className="relative max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Column — Brand Copy */}
          <div className="space-y-6">
            <div>
              <Eyebrow>About {BRAND_NAME}</Eyebrow>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-stone-900 tracking-tight leading-[1.1] mt-3">
                Sustainably Sourced,{" "}
                <span className="text-red-600">Grilled to Perfection</span>
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

              {/* Floating Glassmorphism Badge */}
              <div className="absolute -bottom-6 -right-4 bg-stone-900/95 backdrop-blur-sm text-white px-6 py-4.5 rounded-2xl shadow-2xl max-w-[240px]">
                <p className="text-[10px] uppercase tracking-[3px] text-yellow-400 mb-1 font-bold">Premium</p>
                <h4 className="font-bold text-base leading-tight">100% Traceable, Farmhouse Fresh</h4>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── SECTION 2: STORY & FEATURE CARDS (Staggered Layout) ── */}
      <section className="py-20 px-6 bg-stone-50/30">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 gap-8 lg:gap-12 pb-12">
          {[
            {
              icon: <Leaf className="w-6 h-6" aria-hidden="true" />,
              title: "100% Fresh Selection",
              text: "Carefully curated premium farm cuts and organic ingredients sourced fresh daily. Hygienically packaged with zero shortcuts.",
              iconColor: "text-red-600",
              iconBg: "bg-red-50",
              classes: "mt-0"
            },
            {
              icon: <Award className="w-6 h-6" aria-hidden="true" />,
              title: "Award-Winning Recipes",
              text: "Our signature spices, double-glazing techniques, and precise wood-smoking methods deliver unforgettable local flavors.",
              iconColor: "text-amber-600",
              iconBg: "bg-amber-50",
              classes: "lg:translate-y-8" // Staggered unique offset
            },
          ].map((item) => (
            <div
              key={item.title}
              className={`bg-white rounded-[2rem] p-8 md:p-10 shadow-xl shadow-stone-100/50 hover:shadow-2xl hover:shadow-stone-200/40 transition-all duration-300 ${item.classes}`}
            >
              <div className={`w-12 h-12 rounded-2xl ${item.iconBg} flex items-center justify-center mb-6 ${item.iconColor}`}>
                {item.icon}
              </div>
              <h3 className="font-extrabold text-xl tracking-tight mb-2.5 text-stone-900">
                {item.title}
              </h3>
              <p className="text-stone-500 text-sm leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 3: CORE VALUES (Alternating Bento-Style Grid) ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-16">
            <Eyebrow>Our Values</Eyebrow>
            <h2 className="text-4xl md:text-5xl font-extrabold text-stone-900 tracking-tight mt-3">
              Why Customers Choose Us
            </h2>
          </div>

          {/* Staggered Bento Layout with center-contrast card */}
          <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
            {[
              { 
                icon: <Leaf className="w-6 h-6 text-red-600" aria-hidden="true" />, 
                title: "Strictly Fresh", 
                text: "Premium organic farm-fresh pork and chicken, handled and prepared with extreme care daily.", 
                bg: "bg-stone-50/60 hover:bg-stone-50", 
                textStyle: "text-stone-900",
                descStyle: "text-stone-500",
                iconBg: "bg-red-50"
              },
              { 
                icon: <ShieldCheck className="w-6 h-6 text-yellow-400" aria-hidden="true" />, 
                title: "Guaranteed Hygiene", 
                text: "Hygienically vacuum-sealed cuts and sterile kitchen prep areas standard on every batch.", 
                bg: "bg-stone-900 text-white", // Dark Highlight Center Card
                textStyle: "text-white",
                descStyle: "text-stone-300",
                iconBg: "bg-stone-800" 
              },
              { 
                icon: <Users className="w-6 h-6 text-amber-600" aria-hidden="true" />, 
                title: "Community Focused", 
                text: "Supporting local Ugandan farmers and providing top-tier catering service across Njeru.", 
                bg: "bg-stone-50/60 hover:bg-stone-50", 
                textStyle: "text-stone-900",
                descStyle: "text-stone-500",
                iconBg: "bg-amber-50" 
              },
            ].map((item) => (
              <div
                key={item.title}
                className={`${item.bg} rounded-[2rem] p-8 md:p-10 hover:-translate-y-1.5 transition-all duration-300 ease-out hover:shadow-2xl hover:shadow-stone-200/40`}
              >
                <div className={`w-12 h-12 rounded-xl ${item.iconBg} flex items-center justify-center mb-6`}>
                  {item.icon}
                </div>
                <h3 className={`text-2xl font-extrabold tracking-tight mb-3 ${item.textStyle}`}>
                  {item.title}
                </h3>
                <p className={`leading-relaxed text-sm ${item.descStyle}`}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
          
        </div>
      </section>

      {/* ── SECTION 4: TEAM ── */}
      <section className="py-20 px-6 bg-stone-50/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <Eyebrow>The People</Eyebrow>
            <h2 className="text-4xl md:text-5xl font-extrabold text-stone-900 tracking-tight mt-2">Meet Our Team</h2>
          </div>
          <Staff />
        </div>
      </section>

      {/* ── SECTION 5: TESTIMONIALS (Integrated) ── */}
      <section className="py-12 bg-white">
        <Testimonials />
      </section>

      {/* ── SECTION 6: GALLERY ── */}
      <section className="py-20 bg-stone-50/30">
        <div className="max-w-7xl mx-auto px-6 text-center mb-12">
          <Eyebrow>Gallery</Eyebrow>
          <h2 className="text-4xl md:text-5xl font-extrabold text-stone-900 tracking-tight mt-2">Our Kitchen & Food</h2>
        </div>
        <Gallery />
      </section>

      {/* ── SECTION 7: DELIVERY BANNER (Split Canvas Layout) ── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Eyebrow>Delivery</Eyebrow>
            <h2 className="text-4xl md:text-5xl font-extrabold text-stone-900 tracking-tight mt-2">Prompt Dispatch</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Side — Aesthetic Yellow Backdrop with Delivery Rider */}
            <div className="relative min-h-[440px] flex items-center justify-center overflow-hidden bg-yellow-400 rounded-[2.5rem] shadow-xl shadow-stone-100/80">
              <img
                src={Bike}
                alt={`${BRAND_NAME} delivery rider`}
                className="relative z-10 w-full max-w-md object-contain px-6"
                style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.2))" }}
              />
              {/* Average Time Badge */}
              <div className="absolute bottom-8 left-8 bg-white text-stone-900 rounded-2xl px-5 py-3 shadow-xl shadow-stone-900/10">
                <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Average time</p>
                <p className="text-2xl font-extrabold text-red-600 mt-0.5">30 min</p>
              </div>
            </div>

            {/* Right Side — Dynamic Copy & Actions */}
            <div className="flex flex-col justify-center">
              <Eyebrow>Fast Delivery</Eyebrow>
              <h2 className="text-4xl md:text-5xl font-extrabold text-stone-900 leading-tight mb-5 tracking-tight mt-2">
                Fresh Cuts,<br />
                <span className="text-red-600">At Your Door</span>
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
                  className="inline-flex items-center gap-2.5 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-2xl font-bold text-base transition-all shadow-xl shadow-red-600/25 hover:scale-[1.02]"
                >
                  Order Now
                  <ArrowRight size={18} aria-hidden="true" />
                </a>
                <a
                  href={`tel:${WHATSAPP_NUMBER}`}
                  className="inline-flex items-center gap-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 px-8 py-4 rounded-2xl font-bold text-base transition-all"
                >
                  <Phone size={16} aria-hidden="true" />
                  Call Us
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 8: CONTACT & GEO-LOCATION (Unified Panel) ── */}
      <section className="py-24 px-6 bg-stone-50/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Eyebrow>Find Us</Eyebrow>
            <h2 className="text-4xl md:text-5xl font-extrabold text-stone-900 tracking-tight mt-2">Get in Touch</h2>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-stretch">

            {/* Unified Info Panel (Col Span 5) */}
            <div className="lg:col-span-5 bg-stone-50/80 rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between gap-8">
              <div className="space-y-8">
                {[
                  {
                    icon: <MapPin className="w-5 h-5" aria-hidden="true" />,
                    title: "Location",
                    desc: "Plot 42, Jinja-Kampala Highway, Njeru, Uganda",
                    iconColor: "text-red-600",
                    iconBg: "bg-red-50",
                    href: null,
                  },
                  {
                    icon: <Phone className="w-5 h-5" aria-hidden="true" />,
                    title: "Phone",
                    desc: PHONE_DISPLAY,
                    iconColor: "text-orange-600",
                    iconBg: "bg-orange-50",
                    href: `tel:${WHATSAPP_NUMBER}`,
                  },
                  {
                    icon: <Clock3 className="w-5 h-5" aria-hidden="true" />,
                    title: "Opening Hours",
                    desc: "Monday – Sunday · 10 AM – 10 PM",
                    iconColor: "text-amber-500",
                    iconBg: "bg-amber-50",
                    href: null,
                  },
                ].map((item) => {
                  const Inner = (
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl ${item.iconBg} flex items-center justify-center ${item.iconColor} shrink-0`}>
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-0.5">{item.title}</p>
                        <p className="font-extrabold text-stone-900 text-base leading-tight">{item.desc}</p>
                      </div>
                      {item.href && <ArrowRight size={16} className="text-stone-300 ml-auto" aria-hidden="true" />}
                    </div>
                  );

                  return item.href ? (
                    <a
                      key={item.title}
                      href={item.href}
                      className="block p-2 hover:bg-white rounded-2xl transition-colors duration-200"
                    >
                      {Inner}
                    </a>
                  ) : (
                    <div key={item.title} className="p-2">
                      {Inner}
                    </div>
                  );
                })}
              </div>

              {/* Seamless WhatsApp CTA */}
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between bg-stone-900 hover:bg-stone-800 text-white rounded-[1.5rem] px-6 py-5 shadow-2xl shadow-stone-900/15 hover:scale-[1.01] transition-all duration-200"
              >
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/50 mb-0.5">Order via</p>
                  <p className="font-extrabold text-lg">WhatsApp Chat</p>
                </div>
                <ArrowRight size={20} className="text-yellow-400" aria-hidden="true" />
              </a>
            </div>

            {/* Embedded Location Map (Col Span 7) */}
            <div className="lg:col-span-7 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-stone-100/80 bg-white aspect-[4/3] lg:aspect-auto flex items-center justify-center">
              <iframe
                src="https://www.google.com/maps/embed?pb="
                className="w-full h-full border-none"
                loading="lazy"
                title={`${BRAND_NAME} location`}
              />
            </div>

          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-10 px-6 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-stone-400 text-xs font-medium">© {year} {BRAND_NAME}. All rights reserved.</p>
          <Link
            to="/returnPolicy"
            className="text-xs font-bold text-red-600 hover:text-red-700 transition-colors"
          >
            Return Policy
          </Link>
        </div>
      </footer>

    </div>
  );
};

export default About;