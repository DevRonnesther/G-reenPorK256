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
} from "lucide-react";

// ─── LOCAL SUB-COMPONENTS ────────────────────────────────────────────────────

/** Shared eyebrow — dot + tracking-[0.2em] label, same treatment as Cart / Hero */
const Eyebrow = ({ children }) => (
  <div className="flex items-center gap-2">
    <span className="h-2 w-2 rounded-full bg-[#0edb0e]" aria-hidden="true" />
    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-stone-500">{children}</span>
    <span className="h-px w-10 bg-stone-300" aria-hidden="true" />
  </div>
);

// ─── MAIN POLICY COMPONENT ───────────────────────────────────────────────────
export default function ReturnPolicy() {
  const year = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-white text-stone-900 overflow-hidden pb-16">

      {/* ── HEADER INTRO ── */}
      <header className="max-w-6xl mx-auto px-6 pt-14 md:pt-20 pb-4">
        <div className="flex flex-col md:flex-row items-start justify-between gap-6 mb-12">
          <div>
            <Eyebrow>GreenPork Protection</Eyebrow>
            <h1 className="text-3xl md:text-5xl font-black text-stone-900 tracking-tight mt-3">
              Quality & Dispatch <span className="text-[#0edb0e]">Guarantees</span>
            </h1>
            <p className="text-stone-400 text-sm mt-3 leading-relaxed max-w-2xl font-medium">
              We maintain strict farm-to-table standards. Please read our guidelines
              regarding returns, cancellations, and delivery safety.
            </p>
          </div>
          <Link
            to="/Products"
            className="inline-flex items-center gap-1.5 text-stone-400 hover:text-stone-900 text-xs font-bold uppercase tracking-widest transition-colors shrink-0 mt-2"
          >
            <ArrowLeft size={13} />
            Back to Menu
          </Link>
        </div>
      </header>

      {/* ── MAIN DASHBOARD (Asymmetric Bento Grid) ── */}
      <main className="max-w-6xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

          {/* ── LEFT COLUMN: PRIMARY POLICY SHEET (Col Span 7) ── */}
          <section className="lg:col-span-7 space-y-8">

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-stone-50 flex items-center justify-center shrink-0 border border-stone-100">
                <CheckCircle2 className="text-[#0edb0e]" size={20} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-stone-400 font-black">Section 01</p>
                <h2 className="text-2xl font-black text-stone-900 tracking-tight mt-0.5">
                  Returns & Refunds
                </h2>
              </div>
            </div>

            {/* Flat list, hairline dividers, minimal boxiness */}
            <div className="divide-y divide-stone-100">

              {/* Perishables */}
              <div className="py-6 flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-[#0edb0e]/10 flex items-center justify-center text-[#0edb0e] shrink-0 mt-0.5">
                  <AlertCircle size={15} />
                </div>
                <div>
                  <h4 className="font-extrabold text-stone-900 text-base">
                    Perishable Products
                  </h4>
                  <p className="text-stone-500 text-sm mt-1.5 leading-relaxed">
                    Due to hygiene and food safety regulations, food products
                    cannot be returned or exchanged after delivery has been completed.
                  </p>
                </div>
              </div>

              {/* Damaged or Incorrect */}
              <div className="py-6 flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-[#0edb0e]/10 flex items-center justify-center text-[#0edb0e] shrink-0 mt-0.5">
                  <CheckCircle2 size={15} />
                </div>
                <div>
                  <h4 className="font-extrabold text-stone-900 text-base">
                    Damaged or Incorrect Orders
                  </h4>
                  <p className="text-stone-500 text-sm mt-1.5 leading-relaxed">
                    Please inspect your delivery promptly. Contact us within <strong>24 hours</strong> of
                    dispatch if your order is incorrect, damaged, or below quality standards.
                  </p>
                </div>
              </div>

              {/* Refund Processing */}
              <div className="py-6 flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-[#0edb0e]/10 flex items-center justify-center text-[#0edb0e] shrink-0 mt-0.5">
                  <Clock3 size={15} />
                </div>
                <div>
                  <h4 className="font-extrabold text-stone-900 text-base">
                    Refund Processing
                  </h4>
                  <p className="text-stone-500 text-sm mt-1.5 leading-relaxed">
                    Approved refunds are credited to your original payment method or local mobile money
                    wallet within <strong>3–5 business days</strong>.
                  </p>
                </div>
              </div>

            </div>
          </section>

          {/* ── RIGHT COLUMN: STAGGERED GUIDELINES (Col Span 5) ── */}
          <div className="lg:col-span-5 lg:sticky lg:top-10 space-y-6">

            {/* Cancellation Policy (Featured Dark Card) */}
            <section className="bg-stone-900 text-white rounded-3xl p-8 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                  <Clock3 className="text-yellow-400" size={20} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/50 font-black">Section 02</p>
                  <h2 className="text-xl font-black tracking-tight mt-0.5">
                    Cancellation Policy
                  </h2>
                </div>
              </div>

              <div className="bg-white/5 rounded-2xl p-5 border border-white/5">
                <p className="text-stone-300 text-sm leading-relaxed">
                  Orders may be canceled before{" "}
                  <strong className="text-yellow-400 font-bold">8:00 AM</strong>{" "}
                  on your scheduled day of delivery. Once culinary preparation begins, cancellations cannot be accommodated.
                </p>
              </div>
            </section>

            {/* Quality & Logistics Assurance */}
            <section className="bg-stone-50 border border-stone-100 rounded-3xl p-8 space-y-6">

              <div className="space-y-6">
                {/* Food Safety */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#0edb0e]/10 flex items-center justify-center text-[#0edb0e] shrink-0 mt-0.5">
                    <ShieldCheck size={18} />
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
                    <Truck size={18} />
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

        {/* ── CUSTOMER SUPPORT CONSOLE ── */}
        <section className="mt-16 bg-stone-900 rounded-[2rem] text-white overflow-hidden shadow-xl shadow-stone-900/10">
          <div className="px-8 md:px-12 py-12 md:py-16">

            <div className="text-center mb-10 max-w-xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-3">
                Need Logistics Assistance?
              </h2>
              <p className="text-stone-400 text-xs md:text-sm leading-relaxed">
                Reach out to our customer support desk for direct inquiries regarding processing, refunds,
                or food quality concerns.
              </p>
            </div>

            {/* Contact Row Grid */}
            <div className="grid md:grid-cols-3 gap-5">
              {[
                { Icon: Phone, label: "Phone Desk", value: "+256 776 464 823" },
                { Icon: Mail, label: "Email Support", value: "greenporkie@gmail.com" },
                { Icon: MapPin, label: "Regional Hub", value: "Kampala, Uganda" },
              ].map(({ Icon, label, value }) => (
                <div key={label} className="bg-white/5 rounded-2xl p-6 border border-white/5 flex flex-col justify-between">
                  <div>
                    <Icon className="text-yellow-400 mb-4" size={18} />
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-1.5">
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
      <footer className="bg-white py-10 px-6">
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