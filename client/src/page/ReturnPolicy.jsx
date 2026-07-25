import React from "react";
import { Link } from "react-router-dom";
import {
  AlertCircle,
  CheckCircle2,
  Clock3,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Truck,
  ArrowLeft,
  ShoppingBasket
} from "lucide-react";

// ─── LOCAL SUB-COMPONENTS ────────────────────────────────────────────────────

/** Shared eyebrow — perfectly matched to Hero/Navbar's dot + text + line styling */
const Eyebrow = ({ children }) => (
  <div className="flex items-center gap-2.5">
    <span className="h-2 w-2 rounded-full bg-[#0edb0e]" aria-hidden="true" />
    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-stone-500">{children}</span>
    <span className="h-px w-8 bg-stone-200" aria-hidden="true" />
  </div>
);

// ─── MAIN POLICY COMPONENT ───────────────────────────────────────────────────
export default function ReturnPolicy() {
  const year = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-[#F8F8F5] text-stone-900 overflow-hidden pb-16">

      {/* ── HEADER INTRO ── */}
      <header className="max-w-6xl mx-auto px-6 pt-14 md:pt-24 pb-4">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-16">
          <div>
            <Eyebrow>GreenPork Protection</Eyebrow>
            <h1 className="text-4xl md:text-6xl font-black text-stone-900 tracking-tight mt-4 leading-[1.1]">
              Quality & Dispatch <span className="text-[#0edb0e]">Guarantees</span>
            </h1>
            <p className="text-stone-400 text-base md:text-lg mt-4 leading-relaxed max-w-2xl font-medium">
              We maintain strict farm-to-table standards. Please read our guidelines
              regarding returns, cancellations, and delivery safety.
            </p>
          </div>
          
          {/* Premium Nested Icon CTA matching Navbar/Products */}
          <Link
            to="/Products"
            className="group inline-flex items-center gap-2.5 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs uppercase tracking-wider pl-2 pr-6 py-3 rounded-full transition-all shadow-lg shadow-stone-900/10 shrink-0 mt-2"
          >
            <span className="bg-[#0edb0e] rounded-full p-2 text-stone-950 transition-colors">
              <ShoppingBasket size={14} aria-hidden="true" />
            </span>
            <span>Browse Menu</span>
            <ArrowLeft size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" aria-hidden="true" />
          </Link>
        </div>
      </header>

      {/* ── MAIN DASHBOARD (Asymmetric Bento Grid) ── */}
      <main className="max-w-6xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

          {/* ── LEFT COLUMN: PRIMARY POLICY SHEET (Col Span 7) ── */}
          <section className="lg:col-span-7 space-y-8">

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0edb0e] to-[#0bc50b] flex items-center justify-center shrink-0 shadow-lg shadow-[#0edb0e]/25">
                <CheckCircle2 className="text-white" size={20} aria-hidden="true" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-stone-400 font-black">Section 01</p>
                <h2 className="text-2xl font-black text-stone-900 tracking-tight mt-0.5">
                  Returns & Refunds
                </h2>
              </div>
            </div>

            {/* Elevated Bento Cards instead of dividers */}
            <div className="space-y-4">

              {/* Perishables */}
              <div className="bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.05)] transition-shadow duration-300 flex gap-5 items-start">
                <div className="w-10 h-10 rounded-xl bg-[#F8F8F5] flex items-center justify-center text-[#0edb0e] shrink-0 mt-0.5">
                  <AlertCircle size={18} aria-hidden="true" />
                </div>
                <div>
                  <h4 className="font-extrabold text-stone-900 text-base">
                    Perishable Products
                  </h4>
                  <p className="text-stone-500 text-sm mt-2 leading-relaxed">
                    Due to hygiene and food safety regulations, food products
                    cannot be returned or exchanged after delivery has been completed.
                  </p>
                </div>
              </div>

              {/* Damaged or Incorrect */}
              <div className="bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.05)] transition-shadow duration-300 flex gap-5 items-start">
                <div className="w-10 h-10 rounded-xl bg-[#F8F8F5] flex items-center justify-center text-[#0edb0e] shrink-0 mt-0.5">
                  <CheckCircle2 size={18} aria-hidden="true" />
                </div>
                <div>
                  <h4 className="font-extrabold text-stone-900 text-base">
                    Damaged or Incorrect Orders
                  </h4>
                  <p className="text-stone-500 text-sm mt-2 leading-relaxed">
                    Please inspect your delivery promptly. Contact us within <strong className="text-stone-900">24 hours</strong> of
                    dispatch if your order is incorrect, damaged, or below quality standards.
                  </p>
                </div>
              </div>

              {/* Refund Processing */}
              <div className="bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.05)] transition-shadow duration-300 flex gap-5 items-start">
                <div className="w-10 h-10 rounded-xl bg-[#F8F8F5] flex items-center justify-center text-[#0edb0e] shrink-0 mt-0.5">
                  <Clock3 size={18} aria-hidden="true" />
                </div>
                <div>
                  <h4 className="font-extrabold text-stone-900 text-base">
                    Refund Processing
                  </h4>
                  <p className="text-stone-500 text-sm mt-2 leading-relaxed">
                    Approved refunds are credited to your original payment method or local mobile money
                    wallet within <strong className="text-stone-900">3–5 business days</strong>.
                  </p>
                </div>
              </div>

            </div>
          </section>

          {/* ── RIGHT COLUMN: STAGGERED GUIDELINES (Col Span 5) ── */}
          <div className="lg:col-span-5 lg:sticky lg:top-10 space-y-6">

            {/* Cancellation Policy (Featured Dark Card - Zero borders) */}
            <section className="bg-stone-900 text-white rounded-3xl p-8 space-y-6 shadow-2xl shadow-stone-900/10 relative overflow-hidden">
              {/* Ambient glow */}
              <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#FACC15]/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                    <Clock3 className="text-[#FACC15]" size={20} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-white/50 font-black">Section 02</p>
                    <h2 className="text-xl font-black tracking-tight mt-0.5">
                      Cancellation Policy
                    </h2>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6">
                  <p className="text-stone-300 text-sm leading-relaxed">
                    Orders may be canceled before{" "}
                    <strong className="text-[#FACC15] font-bold">8:00 AM</strong>{" "}
                    on your scheduled day of delivery. Once culinary preparation begins, cancellations cannot be accommodated.
                  </p>
                </div>
              </div>
            </section>

            {/* Quality & Logistics Assurance (Zero borders) */}
            <section className="bg-white rounded-3xl p-8 space-y-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">

              <div className="space-y-6">
                {/* Food Safety */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#0edb0e]/10 flex items-center justify-center text-[#0edb0e] shrink-0 mt-0.5">
                    <ShieldCheck size={18} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-stone-900 text-sm">Food Safety Assurance</h3>
                    <p className="text-stone-400 text-xs mt-1.5 leading-relaxed">
                      All cuts and prepared dishes are handled under strict hygienic and sanitary farm-to-table standardizations.
                    </p>
                  </div>
                </div>

                {/* Logistics */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#0edb0e]/10 flex items-center justify-center text-[#0edb0e] shrink-0 mt-0.5">
                    <Truck size={18} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-stone-900 text-sm">Delivery Guidelines</h3>
                    <p className="text-stone-400 text-xs mt-1.5 leading-relaxed">
                      Our logistics dispatch works rapidly to ensure freshness. Please provide clear physical landmarks to prevent errors.
                    </p>
                  </div>
                </div>
              </div>

            </section>

          </div>
        </div>

        {/* ── CUSTOMER SUPPORT CONSOLE (Zero borders, deep premium shadow) ── */}
        <section className="mt-20 bg-stone-900 rounded-[2.5rem] text-white overflow-hidden shadow-2xl shadow-stone-900/20 relative">
          {/* Ambient Glow */}
          <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#0edb0e]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 px-8 md:px-12 py-12 md:py-20">

            <div className="text-center mb-12 max-w-xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
                Need Logistics Assistance?
              </h2>
              <p className="text-stone-400 text-sm md:text-base leading-relaxed font-medium">
                Reach out to our customer support desk for direct inquiries regarding processing, refunds,
                or food quality concerns.
              </p>
            </div>

            {/* Contact Row Grid - Glassmorphic Cards */}
            <div className="grid md:grid-cols-3 gap-5">
              {[
                { Icon: Phone, label: "Phone Desk", value: "+256 776 464 823" },
                { Icon: Mail, label: "Email Support", value: "greenporkie@gmail.com" },
                { Icon: MapPin, label: "Regional Hub", value: "Kampala, Uganda" },
              ].map(({ Icon, label, value }) => (
                <div key={label} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 flex flex-col justify-between hover:bg-white/10 transition-colors duration-200">
                  <div>
                    <Icon className="text-[#FACC15] mb-5" size={20} aria-hidden="true" />
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">
                      {label}
                    </h4>
                  </div>
                  <p className="text-white text-sm font-black break-all">
                    {value}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer className="bg-[#F8F8F5] py-12 px-6 mt-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-stone-400 font-medium">
            © {year} GreenPork. All Rights Reserved.
          </p>
          <p className="text-xs text-stone-400 font-semibold uppercase tracking-widest">
            Premium Food • Fast Delivery • Trusted Service
          </p>
        </div>
      </footer>

    </div>
  );
}