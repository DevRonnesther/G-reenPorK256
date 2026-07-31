import React from "react";
import { Link } from "react-router-dom";
import {
  AlertCircle, CheckCircle2, Clock3, Phone, Mail, MapPin,
  ShieldCheck, Truck, ArrowLeft, ShoppingBasket
} from "lucide-react";

const CTA_COLOR = "#D4FF00";

/** Brutalist Eyebrow */
const Eyebrow = ({ children }) => (
  <div className="flex items-center gap-3 mb-8">
    <span className="h-2 w-2" style={{ backgroundColor: CTA_COLOR }} />
    <span className="text-xs font-display font-bold uppercase tracking-widest text-stone-500">{children}</span>
  </div>
);

export default function ReturnPolicy() {
  const year = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-white text-black font-body overflow-hidden pb-16">

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@500;700;900&family=Inter:wght@400;500;600&display=swap');
        .font-display { font-family: 'Archivo', sans-serif; letter-spacing: -0.04em; }
        .font-ui { font-family: 'Inter', sans-serif; }
      `}</style>

      {/* ── HEADER INTRO ── */}
      <header className="max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-12 border-b-2 border-black">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-12">
          <div>
            <Eyebrow>GreenPork Protection</Eyebrow>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-black tracking-tighter leading-[0.9]">
              Quality & Dispatch <br />
              <span className="px-2" style={{ backgroundColor: CTA_COLOR, color: "#000" }}>Guarantees</span>
            </h1>
            <p className="text-stone-500 text-base md:text-lg mt-8 leading-relaxed max-w-2xl font-body">
              We maintain strict farm-to-table standards. Please read our guidelines regarding returns, cancellations, and delivery safety.
            </p>
          </div>

          {/* Brutalist CTA */}
          <Link
            to="/Products"
            className="group inline-flex items-center gap-3 font-display font-black px-6 py-4 text-sm uppercase tracking-wide text-black shadow-xl mt-2 transition-colors"
            style={{ backgroundColor: CTA_COLOR, clipPath: "polygon(0 0, 100% 0, 96% 100%, 0% 100%)" }}
          >
            <ShoppingBasket size={16} strokeWidth={2.5} />
            <span>Browse Menu</span>
            <ArrowLeft size={14} strokeWidth={2.5} className="group-hover:-translate-x-1 transition-transform" />
          </Link>
        </div>
      </header>

      {/* ── MAIN DASHBOARD ── */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* ── LEFT COLUMN: PRIMARY POLICY SHEET ── */}
          <section className="lg:col-span-7 space-y-12">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 flex items-center justify-center border-2 border-black">
                <CheckCircle2 size={20} strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-stone-400 font-display font-bold">Section 01</p>
                <h2 className="text-2xl md:text-3xl font-display font-black tracking-tight mt-1">Returns & Refunds</h2>
              </div>
            </div>

            {/* Raw Rows instead of floating cards */}
            <div className="space-y-0 border-t-2 border-stone-100">

              <div className="flex gap-6 items-start py-6 border-b-2 border-stone-100">
                <div className="w-10 h-10 flex items-center justify-center border-2 border-stone-200 text-black shrink-0 mt-1">
                  <AlertCircle size={18} strokeWidth={2} />
                </div>
                <div>
                  <h4 className="font-display font-black text-lg mb-2">Perishable Products</h4>
                  <p className="text-stone-500 text-sm leading-relaxed font-body">
                    Due to hygiene and food safety regulations, food products cannot be returned or exchanged after delivery has been completed.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start py-6 border-b-2 border-stone-100">
                <div className="w-10 h-10 flex items-center justify-center border-2 border-stone-200 text-black shrink-0 mt-1">
                  <CheckCircle2 size={18} strokeWidth={2} />
                </div>
                <div>
                  <h4 className="font-display font-black text-lg mb-2">Damaged or Incorrect Orders</h4>
                  <p className="text-stone-500 text-sm leading-relaxed font-body">
                    Please inspect your delivery promptly. Contact us within <strong className="text-black bg-[#D4FF00] px-1">24 hours</strong> of dispatch if your order is incorrect, damaged, or below quality standards.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start py-6 border-b-2 border-stone-100">
                <div className="w-10 h-10 flex items-center justify-center border-2 border-stone-200 text-black shrink-0 mt-1">
                  <Clock3 size={18} strokeWidth={2} />
                </div>
                <div>
                  <h4 className="font-display font-black text-lg mb-2">Refund Processing</h4>
                  <p className="text-stone-500 text-sm leading-relaxed font-body">
                    Approved refunds are credited to your original payment method or local mobile money wallet within <strong className="text-black bg-[#D4FF00] px-1">3–5 business days</strong>.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ── RIGHT COLUMN: STAGGERED GUIDELINES ── */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-8">

            {/* Brutalist Black Block */}
            <section className="bg-black text-white p-8 md:p-10 border-2 border-black relative overflow-hidden">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 flex items-center justify-center border-2 border-white/20">
                  <Clock3 size={20} strokeWidth={2.5} className="text-[#D4FF00]" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/40 font-display font-bold">Section 02</p>
                  <h2 className="text-xl md:text-2xl font-display font-black tracking-tight mt-1">Cancellation Policy</h2>
                </div>
              </div>

              <div className="border-l-2 border-white/20 pl-6">
                <p className="text-stone-300 text-sm leading-relaxed font-body">
                  Orders may be canceled before{" "}
                  <strong className="text-black bg-[#D4FF00] px-1.5 py-0.5 font-display font-black">8:00 AM</strong>{" "}
                  on your scheduled day of delivery. Once culinary preparation begins, cancellations cannot be accommodated.
                </p>
              </div>
            </section>

            {/* Raw Quality Assurance Block */}
            <section className="p-8 md:p-10 border-2 border-stone-100 space-y-8">
              <div className="flex gap-4">
                <div className="w-10 h-10 flex items-center justify-center border-2 border-stone-200 text-black shrink-0 mt-1">
                  <ShieldCheck size={18} strokeWidth={2} />
                </div>
                <div>
                  <h3 className="font-display font-black text-base mb-2">Food Safety Assurance</h3>
                  <p className="text-stone-500 text-xs leading-relaxed font-body">
                    All cuts and prepared dishes are handled under strict hygienic and sanitary farm-to-table standardizations.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 flex items-center justify-center border-2 border-stone-200 text-black shrink-0 mt-1">
                  <Truck size={18} strokeWidth={2} />
                </div>
                <div>
                  <h3 className="font-display font-black text-base mb-2">Delivery Guidelines</h3>
                  <p className="text-stone-500 text-xs leading-relaxed font-body">
                    Our logistics dispatch works rapidly to ensure freshness. Please provide clear physical landmarks to prevent errors.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* ── CUSTOMER SUPPORT CONSOLE ── */}
        <section className="mt-20 bg-black text-white border-2 border-black overflow-hidden relative">
          <div className="px-8 md:px-12 py-16 md:py-24">
            <div className="text-center mb-16 max-w-xl mx-auto">
              <Eyebrow>Help Desk</Eyebrow>
              <h2 className="text-4xl md:text-5xl font-display font-black tracking-tighter leading-[0.9] mb-6">
                Need Logistics <br />Assistance?
              </h2>
              <p className="text-stone-400 text-sm md:text-base leading-relaxed font-body">
                Reach out to our customer support desk for direct inquiries regarding processing, refunds, or food quality concerns.
              </p>
            </div>

            {/* Raw Contact Grid */}
            <div className="grid md:grid-cols-3 gap-0 border-t-2 border-white/10">
              {[
                { Icon: Phone, label: "Phone Desk", value: "+256 776 464 823" },
                { Icon: Mail, label: "Email Support", value: "greenporkie@gmail.com" },
                { Icon: MapPin, label: "Regional Hub", value: "Kampala, Uganda" },
              ].map(({ Icon, label, value }, i) => (
                <div key={label} className={`p-8 flex flex-col justify-between border-b-2 border-white/10 md:border-b-0 ${i !== 2 ? "md:border-r-2 md:border-white/10" : ""}`}>
                  <Icon className="text-[#D4FF00] mb-6" size={24} strokeWidth={2} />
                  <div>
                    <h4 className="text-[10px] font-display font-bold uppercase tracking-widest text-white/40 mb-2">{label}</h4>
                    <p className="text-white text-base font-display font-black break-all">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer className="py-12 px-6 md:px-12 border-t-2 border-black mt-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-stone-500 font-body font-medium">
            © {year} GreenPork. All Rights Reserved.
          </p>
          <p className="text-xs text-stone-500 font-display font-bold uppercase tracking-widest">
            Premium Food • Fast Delivery • Trusted Service
          </p>
        </div>
      </footer>
    </div>
  );
}