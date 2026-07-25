import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import {
  MapPin, Mail, Phone,
  Send, Clock3, Facebook, Instagram,
  MessageCircle, ArrowRight,
} from "lucide-react";

// ─── DESIGN TOKENS — full brand triad ───────────────────────────────────────
// Green: primary / interactive · Gold: secondary accent · Red: CTA-only accent
const GREEN = "#0edb0e";
const GOLD = "#facc15";
const RED = "#dc2626";
const BRAND_NAME = "GreenPork";
const WHATSAPP_NUMBER = "256776464823";
const PHONE_DISPLAY = "+256 776-464-823";
const EMAIL = "greenporkie@gmail.com";
const cx = (...c) => c.filter(Boolean).join(" ");

// ─── Typography Injector ───────────────────────────────────────────────────
const FontFace = React.memo(function FontFace() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Inter:wght@400;500;600&family=Poppins:wght@500;600;700&display=swap');
      .font-display{font-family:'Montserrat',sans-serif}
      .font-ui{font-family:'Poppins',sans-serif}
      .font-body{font-family:'Inter',sans-serif}
    `}</style>
  );
});

// ─── LOCAL SUB-COMPONENTS ────────────────────────────────────────────────────
const Eyebrow = ({ children }) => (
  <div className="flex items-center gap-2.5 mb-4 select-none">
    <motion.span
      className="h-2 w-2 rounded-full"
      style={{ backgroundColor: GREEN, boxShadow: `0 0 8px ${GREEN}66` }}
      animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden="true"
    />
    <span className="text-[11px] font-ui font-semibold uppercase tracking-[0.25em] text-stone-500">{children}</span>
    <span className="h-px w-8 bg-stone-200" aria-hidden="true" />
  </div>
);

// Each info row carries one brand color, cycled — a deliberate use of the full triad
const InfoRow = ({ icon, label, value, href, accent }) => {
  const Inner = (
    <div className="flex items-center gap-4">
      <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${accent}15`, color: accent }}>
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-ui font-bold uppercase tracking-widest text-stone-400 mb-0.5">{label}</p>
        <p className="font-display font-extrabold text-stone-900 text-sm leading-tight truncate">{value}</p>
      </div>
      {href && <ArrowRight size={14} className="text-stone-300 ml-auto shrink-0 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />}
    </div>
  );

  const cls = "block group bg-white border border-stone-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 rounded-2xl px-4 py-3.5 transition-all duration-300";

  return href ? (
    <a href={href} className={cls}>{Inner}</a>
  ) : (
    <div className={cls}>{Inner}</div>
  );
};

// ─── MAIN CONTACT COMPONENT ──────────────────────────────────────────────────
const Contact = () => {
  const year = useMemo(() => new Date().getFullYear(), []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    alert("Message sent! We'll get back to you shortly.");
    reset();
  };

  const inputBase = cx(
    "w-full px-5 py-4 rounded-xl bg-stone-50/80 border border-stone-200/60 text-stone-900 outline-none transition-all duration-200",
    "focus:bg-white focus:border-transparent focus:ring-4 focus:ring-[#0edb0e]/15 placeholder:text-stone-400 text-sm font-body font-medium"
  );

  return (
    <div className="min-h-screen bg-white text-stone-900 font-body overflow-hidden relative">
      <FontFace />

      {/* Diagonal yellow accent band — a nod to the brand's original diagonal-split identity */}
      <div
        className="absolute -top-24 right-0 w-[46rem] h-[26rem] pointer-events-none opacity-[0.10]"
        style={{ background: GOLD, clipPath: "polygon(30% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
        aria-hidden="true"
      />

      {/* Soft Ambient Background — green + red + gold triad */}
      <div className="absolute top-20 -left-20 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-25" style={{ backgroundColor: `${GREEN}40` }} />
      <div className="absolute bottom-0 -right-20 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-15" style={{ backgroundColor: `${RED}30` }} />

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-12 md:pb-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* ── LEFT COLUMN: STICKY CONSOLE ── */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-8">

            {/* Header Content */}
            <div className="space-y-4">
              <Eyebrow>Contact Us</Eyebrow>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-stone-900 leading-[1.05] tracking-tight">
                We'd Love to Hear{" "}
                <span style={{ color: GREEN }}>From You</span>
              </h1>
              <p className="text-stone-500 text-base leading-relaxed max-w-sm font-body">
                Questions, feedback, or custom catering requests — reach out and
                our team will get back to you immediately.
              </p>
            </div>

            {/* Direct Information panel — cycles the brand triad per row */}
            <div className="space-y-3">
              <InfoRow
                icon={<Phone size={16} aria-hidden="true" />}
                label="Phone" value={PHONE_DISPLAY}
                href={`tel:${WHATSAPP_NUMBER}`}
                accent={GREEN}
              />
              <InfoRow
                icon={<Mail size={16} aria-hidden="true" />}
                label="Email" value={EMAIL}
                href={`mailto:${EMAIL}`}
                accent={GOLD}
              />
              <InfoRow
                icon={<MapPin size={16} aria-hidden="true" />}
                label="Location" value="Njeru, Uganda"
                accent={RED}
              />
              <InfoRow
                icon={<Clock3 size={16} aria-hidden="true" />}
                label="Hours" value="Mon – Sun · 10 AM – 10 PM"
                accent={GREEN}
              />
            </div>

            {/* WhatsApp CTA — green stays the "order" action color */}
            <motion.a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.99 }}
              className="flex items-center justify-between bg-stone-900 text-white rounded-2xl px-6 py-5 shadow-[0_12px_40px_rgba(0,0,0,0.1)] transition-all duration-200"
            >
              <div>
                <p className="text-[10px] font-ui font-bold uppercase tracking-widest text-white/50 mb-1">Fastest way to order</p>
                <p className="font-display font-extrabold text-lg">Chat on WhatsApp</p>
              </div>
              <span className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: GREEN, color: "#000" }}>
                <ArrowRight size={18} aria-hidden="true" />
              </span>
            </motion.a>

            {/* Unified Brand Socials — each platform gets its own triad color on hover */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-ui font-bold uppercase tracking-widest text-stone-400">Follow Our Updates</h4>
              <div className="flex gap-3">
                {[
                  { href: "#", Icon: Facebook, label: "Facebook", accent: GREEN },
                  { href: "#", Icon: Instagram, label: "Instagram", accent: GOLD },
                  { href: "#", Icon: MessageCircle, label: "WhatsApp", accent: RED },
                ].map(({ href, Icon, label, accent }) => (
                  <motion.a
                    key={label}
                    href={href}
                    aria-label={`${BRAND_NAME} on ${label}`}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-11 h-11 rounded-xl bg-white border border-stone-200 hover:border-transparent text-stone-500 flex items-center justify-center transition-all duration-200 shadow-sm group"
                    onMouseEnter={(e) => { e.currentTarget.style.color = accent; e.currentTarget.style.backgroundColor = `${accent}12`; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = ""; e.currentTarget.style.backgroundColor = ""; }}
                  >
                    <Icon size={18} aria-hidden="true" />
                  </motion.a>
                ))}
              </div>
            </div>

          </div>

          {/* ── RIGHT COLUMN: INTERACTIVE FORM ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_12px_40px_rgba(0,0,0,0.05)] border border-stone-100"
          >
            <div className="mb-10">
              <Eyebrow>Send a Message</Eyebrow>
              <h2 className="text-3xl font-display font-black text-stone-900 tracking-tight">Let's Talk</h2>
              <p className="text-stone-400 mt-2 text-sm leading-relaxed font-body">Fill in the fields below and we'll reply as soon as possible.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>

              {/* Name fields */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="firstName" className="block text-[10px] font-ui font-bold uppercase tracking-widest text-stone-400 mb-2.5">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    placeholder="John"
                    aria-invalid={errors.firstName ? "true" : "false"}
                    className={cx(inputBase, errors.firstName && "bg-red-50 border-red-200 focus:ring-red-500/10")}
                    {...register("firstName", { required: "Required" })}
                  />
                  {errors.firstName && <p className="mt-1.5 text-xs font-ui font-semibold" style={{ color: RED }}>{errors.firstName.message}</p>}
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-[10px] font-ui font-bold uppercase tracking-widest text-stone-400 mb-2.5">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    aria-invalid={errors.lastName ? "true" : "false"}
                    className={cx(inputBase, errors.lastName && "bg-red-50 border-red-200 focus:ring-red-500/10")}
                    {...register("lastName", { required: "Required" })}
                  />
                  {errors.lastName && <p className="mt-1.5 text-xs font-ui font-semibold" style={{ color: RED }}>{errors.lastName.message}</p>}
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-[10px] font-ui font-bold uppercase tracking-widest text-stone-400 mb-2.5">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="johndoe@gmail.com"
                  aria-invalid={errors.email ? "true" : "false"}
                  className={cx(inputBase, errors.email && "bg-red-50 border-red-200 focus:ring-red-500/10")}
                  {...register("email", {
                    required: "Required",
                    pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email" },
                  })}
                />
                {errors.email && <p className="mt-1.5 text-xs font-ui font-semibold" style={{ color: RED }}>{errors.email.message}</p>}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-[10px] font-ui font-bold uppercase tracking-widest text-stone-400 mb-2.5">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Write your message here..."
                  aria-invalid={errors.message ? "true" : "false"}
                  className={cx(inputBase, "resize-none", errors.message && "bg-red-50 border-red-200 focus:ring-red-500/10")}
                  {...register("message", {
                    required: "Required",
                    minLength: { value: 10, message: "At least 10 characters" },
                  })}
                />
                {errors.message && <p className="mt-1.5 text-xs font-ui font-semibold" style={{ color: RED }}>{errors.message.message}</p>}
              </div>

              {/* Submit CTA — red-to-gold gradient, distinguishing "inquiry" actions from the green "order" actions */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.01, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group inline-flex items-center justify-center gap-3 font-ui font-bold px-8 py-4 rounded-full shadow-lg disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 w-full sm:w-auto text-white"
                style={{ background: `linear-gradient(135deg, ${RED}, #b91c1c)`, boxShadow: `0 10px 28px ${RED}30` }}
              >
                {isSubmitting ? "Sending…" : "Send Message"}
                <Send size={15} className="group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
              </motion.button>
            </form>
          </motion.div>

        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="py-10 px-6 bg-white relative z-10 border-t border-stone-100">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-stone-400 text-xs font-body font-medium">© {year} {BRAND_NAME}. All rights reserved.</p>
          <Link to="/returnPolicy" className="text-xs font-ui font-bold transition-colors" style={{ color: GREEN }}>
            Return Policy
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Contact;