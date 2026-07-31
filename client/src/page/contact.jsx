import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import {
  MapPin, Mail, Phone, Send, Clock3, Facebook, Instagram,
  MessageCircle, ArrowRight,
} from "lucide-react";

const CTA_COLOR = "#D4FF00";
const BRAND_NAME = "GreenPork";
const WHATSAPP_NUMBER = "256776464823";
const PHONE_DISPLAY = "+256 776-464-823";
const EMAIL = "greenporkie@gmail.com";
const cx = (...c) => c.filter(Boolean).join(" ");

const FontFace = React.memo(function FontFace() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@500;700;900&family=Inter:wght@400;500;600&display=swap');
      .font-display { font-family: 'Archivo', sans-serif; letter-spacing: -0.04em; }
      .font-ui { font-family: 'Inter', sans-serif; }
      .font-body { font-family: 'Inter', sans-serif; }
    `}</style>
  );
});

const Eyebrow = ({ children }) => (
  <div className="flex items-center gap-3 mb-6 select-none">
    <span className="h-2 w-2" style={{ backgroundColor: CTA_COLOR }} />
    <span className="text-xs font-display font-bold uppercase tracking-widest text-stone-500">{children}</span>
  </div>
);

const InfoRow = ({ icon, label, value, href }) => {
  const Inner = (
    <div className="flex items-center gap-4 py-5 border-b-2 border-stone-100 group-hover:border-stone-900 transition-colors">
      <div className="w-10 h-10 flex items-center justify-center shrink-0 border-2 border-stone-200 text-stone-700 group-hover:border-black group-hover:text-black transition-colors">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-display font-bold uppercase tracking-widest text-stone-400 mb-1">{label}</p>
        <p className="font-display font-black text-base text-stone-900 leading-tight truncate">{value}</p>
      </div>
      {href && <ArrowRight size={16} className="text-stone-300 ml-auto shrink-0 group-hover:text-black group-hover:translate-x-1 transition-all" />}
    </div>
  );

  return href ? <a href={href} className="block group">{Inner}</a> : <div className="group">{Inner}</div>;
};

const Contact = () => {
  const year = useMemo(() => new Date().getFullYear(), []);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    alert("Message sent! We'll get back to you shortly.");
    reset();
  };

  const inputBase = cx(
    "w-full px-4 py-3 bg-transparent border-2 border-stone-200 text-stone-900 outline-none transition-colors",
    "focus:border-black placeholder:text-stone-400 text-sm font-body font-medium"
  );

  return (
    <div className="min-h-screen bg-white text-stone-900 font-body overflow-hidden relative">
      <FontFace />

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-16 md:pb-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">

          {/* ── LEFT COLUMN: STICKY CONSOLE ── */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-8">
            <div>
              <Eyebrow>Contact Us</Eyebrow>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black leading-[0.9] tracking-tighter">
                We'd Love to Hear <br />
                <span className="px-2" style={{ backgroundColor: CTA_COLOR, color: "#000" }}>From You</span>
              </h1>
              <p className="text-stone-500 text-base leading-relaxed max-w-sm font-body mt-6">
                Questions, feedback, or custom catering requests — reach out and our team will get back to you immediately.
              </p>
            </div>

            <div className="space-y-0">
              <InfoRow icon={<Phone size={16} strokeWidth={2} />} label="Phone" value={PHONE_DISPLAY} href={`tel:${WHATSAPP_NUMBER}`} />
              <InfoRow icon={<Mail size={16} strokeWidth={2} />} label="Email" value={EMAIL} href={`mailto:${EMAIL}`} />
              <InfoRow icon={<MapPin size={16} strokeWidth={2} />} label="Location" value="Njeru, Uganda" />
              <InfoRow icon={<Clock3 size={16} strokeWidth={2} />} label="Hours" value="Mon – Sun · 10 AM – 10 PM" />
            </div>

            {/* WhatsApp CTA - Brutalist Black Block */}
            <motion.a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2 }} whileTap={{ scale: 0.99 }}
              className="flex items-center justify-between bg-black text-white p-6 transition-all"
            >
              <div>
                <p className="text-[10px] font-display font-bold uppercase tracking-widest text-white/50 mb-1">Fastest way to order</p>
                <p className="font-display font-black text-lg">Chat on WhatsApp</p>
              </div>
              <span className="w-10 h-10 flex items-center justify-center text-black" style={{ backgroundColor: CTA_COLOR }}>
                <ArrowRight size={18} strokeWidth={2.5} />
              </span>
            </motion.a>

            {/* Socials */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-display font-bold uppercase tracking-widest text-stone-400">Follow Our Updates</h4>
              <div className="flex gap-3">
                {[
                  { href: "#", Icon: Facebook, label: "Facebook" },
                  { href: "#", Icon: Instagram, label: "Instagram" },
                  { href: "#", Icon: MessageCircle, label: "WhatsApp" },
                ].map(({ href, Icon, label }) => (
                  <motion.a
                    key={label} href={href} aria-label={`${BRAND_NAME} on ${label}`}
                    whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}
                    className="w-11 h-11 border-2 border-stone-200 text-stone-700 hover:border-black hover:bg-black hover:text-white flex items-center justify-center transition-colors"
                  >
                    <Icon size={18} strokeWidth={2} />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN: INTERACTIVE FORM ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="lg:col-span-7 bg-white p-8 md:p-12 border-2 border-stone-100"
          >
            <div className="mb-10">
              <Eyebrow>Send a Message</Eyebrow>
              <h2 className="text-3xl md:text-4xl font-display font-black tracking-tighter">Let's Talk</h2>
              <p className="text-stone-400 mt-2 text-sm leading-relaxed font-body">Fill in the fields below and we'll reply as soon as possible.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="firstName" className="block text-[10px] font-display font-bold uppercase tracking-widest text-stone-400 mb-2.5">First Name</label>
                  <input
                    id="firstName" type="text" placeholder="John"
                    aria-invalid={errors.firstName ? "true" : "false"}
                    className={cx(inputBase, errors.firstName && "border-red-500 focus:border-red-500")}
                    {...register("firstName", { required: "Required" })}
                  />
                  {errors.firstName && <p className="mt-1.5 text-xs font-display font-bold text-red-500">{errors.firstName.message}</p>}
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-[10px] font-display font-bold uppercase tracking-widest text-stone-400 mb-2.5">Last Name</label>
                  <input
                    id="lastName" type="text" placeholder="Doe"
                    aria-invalid={errors.lastName ? "true" : "false"}
                    className={cx(inputBase, errors.lastName && "border-red-500 focus:border-red-500")}
                    {...register("lastName", { required: "Required" })}
                  />
                  {errors.lastName && <p className="mt-1.5 text-xs font-display font-bold text-red-500">{errors.lastName.message}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-[10px] font-display font-bold uppercase tracking-widest text-stone-400 mb-2.5">Email Address</label>
                <input
                  id="email" type="email" placeholder="johndoe@gmail.com"
                  aria-invalid={errors.email ? "true" : "false"}
                  className={cx(inputBase, errors.email && "border-red-500 focus:border-red-500")}
                  {...register("email", {
                    required: "Required",
                    pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email" },
                  })}
                />
                {errors.email && <p className="mt-1.5 text-xs font-display font-bold text-red-500">{errors.email.message}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-[10px] font-display font-bold uppercase tracking-widest text-stone-400 mb-2.5">Message</label>
                <textarea
                  id="message" rows={5} placeholder="Write your message here..."
                  aria-invalid={errors.message ? "true" : "false"}
                  className={cx(inputBase, "resize-none", errors.message && "border-red-500 focus:border-red-500")}
                  {...register("message", {
                    required: "Required",
                    minLength: { value: 10, message: "At least 10 characters" },
                  })}
                />
                {errors.message && <p className="mt-1.5 text-xs font-display font-bold text-red-500">{errors.message.message}</p>}
              </div>

              {/* Submit CTA - Chartreuse Cut Corner */}
              <motion.button
                type="submit" disabled={isSubmitting}
                whileHover={{ scale: 1.02, backgroundColor: "#E4FF4D" }} whileTap={{ scale: 0.98 }}
                className="group inline-flex items-center justify-center gap-3 font-display font-black px-8 py-4 text-sm uppercase tracking-wide text-black shadow-xl disabled:opacity-60 disabled:cursor-not-allowed transition-colors w-full sm:w-auto"
                style={{ backgroundColor: CTA_COLOR, clipPath: "polygon(0 0, 100% 0, 96% 100%, 0% 100%)" }}
              >
                {isSubmitting ? "Sending…" : "Send Message"}
                <Send size={15} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </form>
          </motion.div>

        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="py-12 px-6 md:px-12 border-t-2 border-stone-100">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-stone-400 text-sm font-body font-medium">© {year} {BRAND_NAME}. All rights reserved.</p>
          <Link to="/returnPolicy" className="text-sm font-display font-bold uppercase tracking-wide hover:underline">
            Return Policy
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Contact;