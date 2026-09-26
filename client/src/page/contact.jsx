import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import {
  MapPin, Mail, Phone, Send, Clock, Facebook, Instagram,
  MessageCircle, ArrowRight, Flame, Check,
} from "lucide-react";

const BRAND = "Green Pork";
const WHATSAPP = "256776464823";
const PHONE_DISPLAY = "+256 776 464 823";
const EMAIL = "greenporkie@gmail.com";

// Core brand colors
const BRAND_COLOR = "#D9FF00";
const SUCCESS_COLOR = "#059669";
const DARK = "#4A0A0A";
const RED = "#E11D1D";

const TOPICS = ["Order", "Catering", "Feedback", "Other"];

const INFO = [
  { icon: Phone, label: "Phone", value: PHONE_DISPLAY, href: `tel:+${WHATSAPP}` },
  { icon: Mail, label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
  { icon: MapPin, label: "Location", value: "Plot 42, Jinja-Kampala Highway, Njeru", href: null },
  { icon: Clock, label: "Hours", value: "Mon – Sun · 10 AM – 10 PM", href: null },
];

const SOCIALS = [
  { label: "Facebook", Icon: Facebook, href: "#" },
  { label: "Instagram", Icon: Instagram, href: "#" },
  { label: "WhatsApp", Icon: MessageCircle, href: `https://wa.me/${WHATSAPP}` },
];

const spring = { type: "spring", stiffness: 220, damping: 26 };
const ease = [0.16, 1, 0.3, 1];

const fadeUp = (d = 0) => ({
  initial: { opacity: 0, y: 20, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease, delay: d } },
});

const labelClass = "mb-2.5 block text-[10px] font-bold uppercase tracking-widest text-[#4A0A0A]/50";

const getInputClass = (hasError) => {
  const base = "w-full rounded-2xl px-5 py-4 text-sm font-semibold text-[#4A0A0A] outline-none transition-all placeholder:text-[#4A0A0A]/35 focus:ring-2";
  return hasError
    ? `${base} bg-red-50 ring-2 ring-red-300 focus:ring-red-400`
    : `${base} bg-[#4A0A0A]/[0.04] focus:bg-white focus:ring-[#4A0A0A]/30`;
};

// Simple mock API call for the form
async function sendMessage(data) {
  console.log("Sending contact form:", data);
  await new Promise((resolve) => setTimeout(resolve, 800));
}

export default function Contact() {
  const year = new Date().getFullYear();
  const [sent, setSent] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { topic: "Order" } });

  const onSubmit = async (data) => {
    setSubmitError("");

    // Honeypot check
    if (data.website) {
      setSent(true);
      return;
    }

    try {
      await sendMessage(data);
      setSent(true);
      reset({ topic: "Order" });
    } catch (err) {
      setSubmitError("Something went wrong. Please try again or chat with us on WhatsApp.");
    }
  };

  return (
    <div className="font-display relative min-h-screen w-full overflow-hidden bg-white text-[#4A0A0A] selection:bg-[#D9FF00] selection:text-[#4A0A0A]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700;800;900&display=swap');
        .font-display { font-family: 'Archivo', sans-serif; }
      `}</style>

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-20 pt-28 md:pb-28 lg:px-12 lg:pt-36">
        {/* Header */}
        <div className="relative mb-12 md:mb-16">
          <motion.span
            {...fadeUp(0)}
            className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#4A0A0A]/10 px-4 py-2 text-[11px] font-bold uppercase tracking-wide text-[#4A0A0A] backdrop-blur-md"
          >
            <Flame size={13} strokeWidth={2.5} /> Contact {BRAND}
          </motion.span>

          <motion.h1
            {...fadeUp(0.05)}
            className="font-black uppercase leading-[0.82] tracking-[-0.04em]"
            style={{ color: RED, fontSize: "clamp(4rem, 16vw, 12rem)" }}
          >
            Let's <br /> Talk
          </motion.h1>

          <motion.div
            {...fadeUp(0.3)}
            className="absolute bottom-[6%] right-[3%] z-20 hidden -rotate-3 rounded-2xl px-5 py-2.5 text-sm font-extrabold uppercase text-white sm:block lg:right-[18%]"
            style={{ backgroundColor: DARK }}
          >
            We reply fast
            <span className="absolute -bottom-1 left-6 h-3 w-3 rotate-45" style={{ backgroundColor: DARK }} />
          </motion.div>

          <motion.p {...fadeUp(0.2)} className="mt-6 max-w-md text-sm font-semibold leading-relaxed text-[#4A0A0A]/80 md:text-base">
            Questions, feedback, or custom catering requests. Reach out and our team will get back to you.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Contact Info */}
          <div className="space-y-3 lg:sticky lg:top-28 lg:col-span-5">
            {INFO.map(({ icon: Icon, label, value, href }) => {
              const inner = (
                <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-lg border border-[#4A0A0A]/5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white" style={{ backgroundColor: DARK }}>
                    <Icon size={18} strokeWidth={2.2} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-[#4A0A0A]/50">{label}</p>
                    <p className="break-words text-sm font-extrabold leading-tight md:text-base" style={{ color: DARK }}>{value}</p>
                  </div>
                  {href && <ArrowRight size={16} strokeWidth={2.5} className="shrink-0 text-[#4A0A0A]/40" />}
                </div>
              );

              return href ? (
                <motion.a key={label} href={href} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={spring} className="block">
                  {inner}
                </motion.a>
              ) : (
                <div key={label}>{inner}</div>
              );
            })}

            <motion.a
              href={`https://wa.me/${WHATSAPP}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={spring}
              className="flex items-center justify-between rounded-2xl p-6 shadow-lg"
              style={{ backgroundColor: BRAND_COLOR, color: DARK }}
            >
              <div>
                <p className="mb-1 text-[10px] font-bold uppercase tracking-widest opacity-50">Fastest way to order</p>
                <p className="text-lg font-black uppercase tracking-tight">Chat on WhatsApp</p>
              </div>
              <span className="flex h-10 w-10 items-center justify-center rounded-full" style={{ backgroundColor: DARK }}>
                <ArrowRight size={18} strokeWidth={2.5} className="text-white" />
              </span>
            </motion.a>

            <div className="pt-4">
              <h2 className="mb-3 text-[10px] font-bold uppercase tracking-widest text-[#4A0A0A]/70">Follow our updates</h2>
              <div className="flex gap-3">
                {SOCIALS.map(({ label, Icon, href }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    aria-label={`${BRAND} on ${label}`}
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.88 }}
                    transition={spring}
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-[#4A0A0A]/[0.05] text-[#4A0A0A] backdrop-blur-md transition-colors hover:bg-[#D9FF00]"
                  >
                    <Icon size={18} strokeWidth={2.2} />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <motion.div
            {...fadeUp(0.25)}
            className="rounded-[2rem] border border-[#4A0A0A]/10 bg-white p-6 shadow-2xl md:p-10 lg:col-span-7"
          >
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1, transition: spring }}
                  exit={{ opacity: 0 }}
                  className="flex min-h-[420px] flex-col items-center justify-center text-center"
                  role="status"
                >
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full text-white" style={{ backgroundColor: SUCCESS_COLOR }}>
                    <Check size={30} strokeWidth={3} />
                  </div>
                  <h2 className="text-4xl font-black uppercase leading-[0.9] tracking-[-0.04em] md:text-5xl">Message sent</h2>
                  <p className="mt-4 max-w-xs text-sm font-medium leading-relaxed text-[#4A0A0A]/70">
                    Thanks for reaching out. We'll reply as soon as we can. For orders, WhatsApp is quickest.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="mt-8 cursor-pointer rounded-full border border-[#4A0A0A]/30 px-6 py-3 text-xs font-bold uppercase tracking-wide transition-colors hover:bg-[#4A0A0A] hover:text-white"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.div key="form" exit={{ opacity: 0 }}>
                  <div className="mb-8">
                    <h2 className="text-4xl font-black uppercase leading-[0.9] tracking-[-0.04em] md:text-5xl">Send a message</h2>
                    <p className="mt-3 text-sm font-medium leading-relaxed text-[#4A0A0A]/60">
                      Fill in the fields below and we'll reply as soon as possible.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                    <fieldset>
                      <legend className={labelClass}>What is this about?</legend>
                      <div className="flex flex-wrap gap-2">
                        {TOPICS.map((t) => (
                          <label key={t} className="cursor-pointer">
                            <input type="radio" value={t} className="peer sr-only" {...register("topic")} />
                            <span className="block rounded-full border border-[#4A0A0A]/25 px-4 py-2.5 text-[11px] font-bold uppercase tracking-wide transition-colors peer-checked:border-[#D9FF00] peer-checked:bg-[#D9FF00] peer-checked:text-[#4A0A0A] peer-focus-visible:ring-2 peer-focus-visible:ring-[#E11D1D]">
                              {t}
                            </span>
                          </label>
                        ))}
                      </div>
                    </fieldset>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="firstName" className={labelClass}>First name</label>
                        <input
                          id="firstName"
                          type="text"
                          placeholder="John"
                          autoComplete="given-name"
                          aria-invalid={errors.firstName ? "true" : "false"}
                          className={getInputClass(errors.firstName)}
                          {...register("firstName", { required: "First name is required" })}
                        />
                        {errors.firstName && <p className="mt-1.5 text-xs font-bold text-red-600">{errors.firstName.message}</p>}
                      </div>
                      <div>
                        <label htmlFor="lastName" className={labelClass}>Last name</label>
                        <input
                          id="lastName"
                          type="text"
                          placeholder="Doe"
                          autoComplete="family-name"
                          aria-invalid={errors.lastName ? "true" : "false"}
                          className={getInputClass(errors.lastName)}
                          {...register("lastName", { required: "Last name is required" })}
                        />
                        {errors.lastName && <p className="mt-1.5 text-xs font-bold text-red-600">{errors.lastName.message}</p>}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className={labelClass}>Email address</label>
                      <input
                        id="email"
                        type="email"
                        placeholder="johndoe@gmail.com"
                        autoComplete="email"
                        aria-invalid={errors.email ? "true" : "false"}
                        className={getInputClass(errors.email)}
                        {...register("email", {
                          required: "Email is required",
                          pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Enter a valid email" },
                        })}
                      />
                      {errors.email && <p className="mt-1.5 text-xs font-bold text-red-600">{errors.email.message}</p>}
                    </div>

                    <div>
                      <label htmlFor="message" className={labelClass}>Message</label>
                      <textarea
                        id="message"
                        rows={5}
                        placeholder="Write your message here..."
                        aria-invalid={errors.message ? "true" : "false"}
                        className={`${getInputClass(errors.message)} resize-none`}
                        {...register("message", {
                          required: "Message is required",
                          minLength: { value: 10, message: "Use at least 10 characters" },
                        })}
                      />
                      {errors.message && <p className="mt-1.5 text-xs font-bold text-red-600">{errors.message.message}</p>}
                    </div>

                    {/* Honeypot */}
                    <input
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      className="absolute -left-[9999px] h-0 w-0 opacity-0"
                      {...register("website")}
                    />

                    {submitError && (
                      <p role="alert" className="rounded-2xl bg-red-50 px-5 py-3 text-xs font-bold text-red-700">
                        {submitError}
                      </p>
                    )}

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={spring}
                      className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full px-8 py-4 text-xs font-bold uppercase tracking-wide shadow-lg disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                      style={{ backgroundColor: BRAND_COLOR, color: DARK }}
                    >
                      {isSubmitting ? "Sending…" : "Send message"}
                      <Send size={14} strokeWidth={2.5} />
                    </motion.button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <footer className="relative z-10 px-4 py-8 lg:px-12" style={{ backgroundColor: DARK }}>
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-[10px] font-semibold uppercase tracking-widest text-white/70 sm:flex-row">
          <p>© {year} {BRAND}. All rights reserved.</p>
          <Link to="/returnPolicy" className="transition-colors hover:text-[#D9FF00]">
            Return Policy
          </Link>
        </div>
      </footer>
    </div>
  );
}