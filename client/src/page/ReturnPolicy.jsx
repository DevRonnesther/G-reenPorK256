import React from "react";
import {
  AlertCircle,
  CheckCircle2,
  Clock3,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Truck,
} from "lucide-react";

// ─── LOCAL SUB-COMPONENTS ────────────────────────────────────────────────────
const Eyebrow = ({ children }) => (
  <p className="inline-flex items-center gap-2 text-red-600 text-xs font-bold uppercase tracking-[0.15em] mb-4">
    <span className="w-1.5 h-1.5 rounded-full bg-red-600" aria-hidden="true" />
    {children}
  </p>
);

// ─── MAIN POLICY COMPONENT ───────────────────────────────────────────────────
const ReturnPolicy = () => {
  const year = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-white text-stone-900 overflow-hidden">

      {/* ── HEADER INTRO ── */}
      <header className="max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-4">
        <Eyebrow>GreenPork Protection</Eyebrow>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-stone-900 tracking-tight leading-[1.1] mb-4">
          Quality & Dispatch <span className="text-red-600">Guarantees</span>
        </h1>
        <p className="text-stone-500 text-base md:text-lg max-w-2xl leading-relaxed">
          We maintain strict farm-to-table standardizations. Please read our guidelines 
          regarding returns, cancellations, and delivery safety.
        </p>
      </header>

      {/* ── MAIN DASHBOARD (Asymmetric Bento Grid) ── */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* ── LEFT COLUMN: PRIMARY POLICY SHEET (Col Span 7) ── */}
          <section className="lg:col-span-7 bg-stone-50/70 rounded-[2.5rem] p-8 md:p-10 space-y-8">
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                <CheckCircle2 className="text-orange-600" size={20} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Section 01</p>
                <h2 className="text-2xl font-extrabold text-stone-900 tracking-tight mt-0.5">
                  Returns & Refunds
                </h2>
              </div>
            </div>

            <div className="space-y-4">
              
              {/* Perishables */}
              <div className="bg-red-50/50 rounded-2xl p-6 flex gap-4">
                <AlertCircle className="text-red-600 shrink-0 mt-0.5" size={18} />
                <div>
                  <h4 className="font-extrabold text-stone-900 text-base mb-1.5">
                    Perishable Products
                  </h4>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    Due to hygiene and food safety safety regulations, food products 
                    cannot be returned after delivery.
                  </p>
                </div>
              </div>

              {/* Damaged or Incorrect */}
              <div className="bg-amber-50/50 rounded-2xl p-6 flex gap-4">
                <CheckCircle2 className="text-amber-600 shrink-0 mt-0.5" size={18} />
                <div>
                  <h4 className="font-extrabold text-stone-900 text-base mb-1.5">
                    Damaged or Incorrect Orders
                  </h4>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    Contact us within <strong>24 hours</strong> of delivery if your order is 
                    incorrect, damaged, or below established quality standards.
                  </p>
                </div>
              </div>

              {/* Refund Processing */}
              <div className="bg-stone-100/50 rounded-2xl p-6">
                <h4 className="font-extrabold text-stone-900 text-base mb-1.5">
                  Refund Processing
                </h4>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Approved refunds are processed to your original payment method or mobile wallet 
                  within <strong>3–5 business days</strong>.
                </p>
              </div>

            </div>
          </section>

          {/* ── RIGHT COLUMN: STAGGERED GUIDELINES (Col Span 5) ── */}
          <div className="lg:col-span-5 space-y-8">

            {/* Cancellation Policy (Featured Dark Card) */}
            <section className="bg-stone-900 text-white rounded-[2.5rem] p-8 shadow-xl shadow-stone-900/10 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                  <Clock3 className="text-yellow-400" size={20} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">Section 02</p>
                  <h2 className="text-2xl font-extrabold tracking-tight mt-0.5">
                    Cancellation Policy
                  </h2>
                </div>
              </div>

              <div className="bg-white/5 rounded-2xl p-5">
                <p className="text-stone-300 text-sm leading-relaxed">
                  Orders may be canceled before
                  <strong className="text-yellow-400 font-bold"> 8:00 AM </strong>
                  on the day of delivery. Once meal preparation begins, cancellations cannot be processed.
                </p>
              </div>
            </section>

            {/* Quality & Logistics Assurance */}
            <section className="bg-stone-50/70 rounded-[2.5rem] p-8 space-y-6">
              
              <div className="space-y-6">
                {/* Food Safety */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-600 shrink-0 mt-1">
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-stone-900 text-base">Food Safety Assurance</h3>
                    <p className="text-stone-500 text-xs mt-1.5 leading-relaxed">
                      All meals are prepared under strict hygiene standards. Contact us immediately 
                      regarding any safety concerns.
                    </p>
                  </div>
                </div>

                {/* Logistics */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600 shrink-0 mt-1">
                    <Truck size={18} />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-stone-900 text-base">Delivery Guidelines</h3>
                    <p className="text-stone-500 text-xs mt-1.5 leading-relaxed">
                      Our dispatch works rapidly to resolve delays. Please provide accurate delivery 
                      directions to prevent logistics errors.
                    </p>
                  </div>
                </div>
              </div>

            </section>

          </div>
        </div>

        {/* ── CUSTOMER SUPPORT CONSOLE (Footer CTA) ── */}
        <section className="mt-16 bg-stone-900 rounded-[2.5rem] text-white overflow-hidden shadow-2xl">
          <div className="px-8 md:px-12 py-14">
            
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
                Need Logistics Assistance?
              </h2>
              <p className="text-stone-300 text-sm max-w-xl mx-auto leading-relaxed">
                Reach out to our customer support desk for direct inquiries regarding processing, refunds, 
                or food quality concerns.
              </p>
            </div>

            {/* Contact Row Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { Icon: Phone, label: "Phone Desk", value: "+256 776 464 823" },
                { Icon: Mail, label: "Email Support", value: "greenporkie@gmail.com" },
                { Icon: MapPin, label: "Regional Hub", value: "Kampala, Uganda" },
              ].map(({ Icon, label, value }) => (
                <div key={label} className="bg-white/5 rounded-2xl p-6">
                  <Icon className="text-yellow-400 mb-4" size={20} />
                  <h4 className="text-sm font-bold uppercase tracking-wider text-stone-400 mb-1.5">
                    {label}
                  </h4>
                  <p className="text-white text-base font-extrabold break-all">
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
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-stone-400 font-medium">
            © {year} GreenPork. All Rights Reserved.
          </p>
          <p className="text-xs text-stone-400 font-semibold uppercase tracking-wider">
            Premium Food • Fast Delivery • Trusted Service
          </p>
        </div>
      </footer>

    </div>
  );
};

export default ReturnPolicy;