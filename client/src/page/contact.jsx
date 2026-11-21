import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import {
  MapPin,
  Mail,
  Phone,
  Send,
  Clock,
  Facebook,
  Instagram,
  MessageCircle,
  ArrowRight,
  Flame,
  Check,
  Home,
} from "lucide-react";

const BRAND = "Greenpork";
const SLOGAN = "Eat Fresh. Live Happy";
const WHATSAPP = "256776464823";
const PHONE_DISPLAY = "+256 776 464 823";
const EMAIL = "greenporkie@gmail.com";

const PALETTE = {
  lime: "#D9FF00",
  red: "#E11D1D",
  ink: "#111111",
  charcoal: "#2A2A2A",
  muted: "#4A4A4A",
  surface: "#F5F5F5",
  surfaceHover: "#EFEFEF",
  white: "#FFFFFF",
  success: "#059669",
};

const TOPICS = ["Order", "Catering", "Feedback", "Other"];

const INFO = [
  {
    icon: Phone,
    label: "Phone & WhatsApp",
    value: PHONE_DISPLAY,
    href: `tel:+${WHATSAPP}`,
  },
  {
    icon: Mail,
    label: "Email",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Gulu City, Uganda",
    href: null,
  },
  {
    icon: Home,
    label: "Kitchen & Menu",
    value: "Pork, Burgers, Pizza & Chicken · Delivery & Pickup",
    href: null,
  },
  {
    icon: Clock,
    label: "Operating Hours",
    value: "Mon – Sun · 10:00 AM – 10:00 PM",
    href: null,
  },
];

const SOCIALS = [
  { label: "Facebook", Icon: Facebook, href: "#" },
  { label: "Instagram", Icon: Instagram, href: "#" },
  { label: "WhatsApp", Icon: MessageCircle, href: `https://wa.me/${WHATSAPP}` },
];

const EASE = [0.16, 1, 0.3, 1];
const SPRING = { type: "spring", stiffness: 220, damping: 26 };

const cx = (...classes) => classes.filter(Boolean).join(" ");

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111]";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20, filter: "blur(6px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: EASE, delay },
  },
});

const labelClass =
  "mb-2.5 block font-display text-[11px] font-bold uppercase tracking-wider text-[#111111]";

const getInputClass = (hasError) => {
  const base =
    "w-full rounded-2xl border-0 px-5 py-4 font-body text-sm font-semibold text-[#111111] outline-none ring-0 transition-colors placeholder:text-[#666666]";
  return hasError
    ? `${base} bg-[#F5F5F5] focus:bg-[#EFEFEF]`
    : `${base} bg-[#F5F5F5] focus:bg-[#EFEFEF]`;
};

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

    if (data.website) {
      setSent(true);
      return;
    }

    try {
      await sendMessage(data);
      setSent(true);
      reset({ topic: "Order" });
    } catch (err) {
      setSubmitError(
        "Something went wrong. Please try again or chat with us on WhatsApp."
      );
    }
  };

  return (
    <div className="font-display relative min-h-screen w-full overflow-hidden border-0 bg-white text-[#111111] selection:bg-[#D9FF00] selection:text-[#111111]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap');
        .font-display { font-family: 'Archivo', sans-serif; }
        .font-body { font-family: 'Inter', sans-serif; }
      `}</style>

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-20 pt-28 md:pb-28 lg:px-12 lg:pt-36">
        {/* Header */}
        <div className="relative mb-12 md:mb-16">
          <motion.span
            {...fadeUp(0)}
            className="mb-5 inline-flex/// hidden items-center gap-2 rounded-full border-0 bg-[#111111] px-4 py-2 text-[11px] font-bold uppercase tracking-wide text-[#D9FF00]"
          >
            <Flame size={13} strokeWidth={2.5} /> Contact {BRAND} · {SLOGAN}
          </motion.span>

          <motion.h1
            {...fadeUp(0.05)}
            className="font-black uppercase leading-[0.82] tracking-[-0.04em]"
            style={{ color: PALETTE.red, fontSize: "clamp(4rem, 16vw, 12rem)" }}
          >
            Let&apos;s <br /> Talk
          </motion.h1>

          <motion.div
            {...fadeUp(0.3)}
            className="absolute bottom-[6%] right-[3%] z-20 hidden -rotate-3 rounded-2xl border-0 px-5 py-2.5 text-sm font-extrabold uppercase text-white sm:block lg:right-[18%]"
            style={{ backgroundColor: PALETTE.ink }}
          >
            {SLOGAN} · Gulu City
            <span
              className="absolute -bottom-1 left-6 h-3 w-3 rotate-45"
              style={{ backgroundColor: PALETTE.ink }}
            />
          </motion.div>

          <motion.p
            {...fadeUp(0.2)}
            className="font-body mt-6 max-w-lg text-sm font-semibold leading-relaxed text-[#2A2A2A] md:text-base"
          >
            Serving pork, burgers, pizza, and chicken in Gulu City. Reach out
            for orders, catering, or feedback and{" "}
            <strong className="font-bold text-[#111111]">{SLOGAN}</strong>.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Contact Info */}
          <div className="space-y-3 lg:sticky lg:top-28 lg:col-span-5">
            {INFO.map(({ icon: Icon, label, value, href }) => {
              const inner = (
                <div className="flex items-center gap-4 rounded-[2rem] border-0 bg-[#F5F5F5] p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-[#EFEFEF]">
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-0 text-[#D9FF00]"
                    style={{ backgroundColor: PALETTE.ink }}
                  >
                    <Icon size={18} strokeWidth={2.2} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-body mb-1 text-[10px] font-bold uppercase tracking-widest text-[#4A4A4A]">
                      {label}
                    </p>
                    <p
                      className="font-display break-words text-sm font-extrabold leading-tight md:text-base"
                      style={{ color: PALETTE.ink }}
                    >
                      {value}
                    </p>
                  </div>
                  {href && (
                    <ArrowRight
                      size={16}
                      strokeWidth={2.5}
                      className="shrink-0 text-[#111111]"
                    />
                  )}
                </div>
              );

              return href ? (
                <motion.a
                  key={label}
                  href={href}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={SPRING}
                  className={cx("block rounded-[2rem] border-0", focusRing)}
                >
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
              transition={SPRING}
              className={cx(
                "flex items-center justify-between rounded-[2rem] border-0 p-6",
                focusRing
              )}
              style={{ backgroundColor: PALETTE.lime, color: PALETTE.ink }}
            >
              <div>
                <p className="font-body mb-1 text-[10px] font-extrabold uppercase tracking-widest text-[#111111]">
                  Fastest way to order
                </p>
                <p className="text-lg font-black uppercase tracking-tight">
                  Chat on WhatsApp
                </p>
              </div>
              <span
                className="flex h-10 w-10 items-center justify-center rounded-full border-0"
                style={{ backgroundColor: PALETTE.ink }}
              >
                <ArrowRight
                  size={18}
                  strokeWidth={2.5}
                  className="text-[#D9FF00]"
                />
              </span>
            </motion.a>

            <div className="pt-4">
              <h2 className="mb-3 text-[11px] font-bold uppercase tracking-widest text-[#111111]">
                Follow our updates
              </h2>
              <div className="flex gap-3">
                {SOCIALS.map(({ label, Icon, href }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      href.startsWith("http") ? "noopener noreferrer" : undefined
                    }
                    aria-label={`${BRAND} on ${label}`}
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.88 }}
                    transition={SPRING}
                    className={cx(
                      "flex h-11 w-11 items-center justify-center rounded-full border-0 bg-[#F5F5F5] text-[#111111] transition-colors hover:bg-[#D9FF00]",
                      focusRing
                    )}
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
            className="rounded-[2.5rem] border-0 bg-[#F5F5F5] p-6 md:p-10 lg:col-span-7"
          >
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1, transition: SPRING }}
                  exit={{ opacity: 0 }}
                  className="flex min-h-[420px] flex-col items-center justify-center text-center"
                  role="status"
                >
                  <div
                    className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border-0 text-white"
                    style={{ backgroundColor: PALETTE.success }}
                  >
                    <Check size={30} strokeWidth={3} />
                  </div>
                  <h2 className="text-4xl font-black uppercase leading-[0.9] tracking-[-0.04em] text-[#111111] md:text-5xl">
                    Message sent
                  </h2>
                  <p className="font-body mt-4 max-w-xs text-sm font-medium leading-relaxed text-[#2A2A2A]">
                    Thanks for reaching out from Gulu City. We&apos;ll reply as
                    soon as we can. For orders, WhatsApp is quickest.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className={cx(
                      "mt-8 cursor-pointer rounded-full border-0 bg-[#111111] px-6 py-3 text-xs font-bold uppercase tracking-wide text-[#D9FF00] transition-opacity hover:opacity-90",
                      focusRing
                    )}
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.div key="form" exit={{ opacity: 0 }}>
                  <div className="mb-8">
                    <h2 className="text-4xl font-black uppercase leading-[0.9] tracking-[-0.04em] text-[#111111] md:text-5xl">
                      Send a message
                    </h2>
                    <p className="font-body mt-3 text-sm font-medium leading-relaxed text-[#4A4A4A]">
                      Fill in the fields below and our Gulu City team will reply
                      promptly.
                    </p>
                  </div>

                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6"
                    noValidate
                  >
                    <fieldset className="border-0 p-0">
                      <legend className={labelClass}>
                        What is this about?
                      </legend>
                      <div className="flex flex-wrap gap-2">
                        {TOPICS.map((t) => (
                          <label key={t} className="cursor-pointer">
                            <input
                              type="radio"
                              value={t}
                              className="peer sr-only"
                              {...register("topic")}
                            />
                            <span className="block rounded-full border-0 bg-white px-4 py-2.5 text-[11px] font-bold uppercase tracking-wide text-[#111111] transition-colors peer-checked:bg-[#D9FF00] peer-checked:text-[#111111] peer-focus-visible:ring-2 peer-focus-visible:ring-[#111111]">
                              {t}
                            </span>
                          </label>
                        ))}
                      </div>
                    </fieldset>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="firstName" className={labelClass}>
                          First name
                        </label>
                        <input
                          id="firstName"
                          type="text"
                          placeholder="John"
                          autoComplete="given-name"
                          aria-invalid={errors.firstName ? "true" : "false"}
                          className={getInputClass(errors.firstName)}
                          {...register("firstName", {
                            required: "First name is required",
                          })}
                        />
                        {errors.firstName && (
                          <p className="font-body mt-1.5 text-xs font-bold text-[#E11D1D]">
                            {errors.firstName.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="lastName" className={labelClass}>
                          Last name
                        </label>
                        <input
                          id="lastName"
                          type="text"
                          placeholder="Doe"
                          autoComplete="family-name"
                          aria-invalid={errors.lastName ? "true" : "false"}
                          className={getInputClass(errors.lastName)}
                          {...register("lastName", {
                            required: "Last name is required",
                          })}
                        />
                        {errors.lastName && (
                          <p className="font-body mt-1.5 text-xs font-bold text-[#E11D1D]">
                            {errors.lastName.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className={labelClass}>
                        Email address
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="johndoe@gmail.com"
                        autoComplete="email"
                        aria-invalid={errors.email ? "true" : "false"}
                        className={getInputClass(errors.email)}
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Enter a valid email",
                          },
                        })}
                      />
                      {errors.email && (
                        <p className="font-body mt-1.5 text-xs font-bold text-[#E11D1D]">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="message" className={labelClass}>
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        placeholder="Write your message here..."
                        aria-invalid={errors.message ? "true" : "false"}
                        className={cx(
                          getInputClass(errors.message),
                          "resize-none"
                        )}
                        {...register("message", {
                          required: "Message is required",
                          minLength: {
                            value: 10,
                            message: "Use at least 10 characters",
                          },
                        })}
                      />
                      {errors.message && (
                        <p className="font-body mt-1.5 text-xs font-bold text-[#E11D1D]">
                          {errors.message.message}
                        </p>
                      )}
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
                      <p
                        role="alert"
                        className="font-body rounded-2xl border-0 bg-white px-5 py-3 text-xs font-bold text-[#E11D1D]"
                      >
                        {submitError}
                      </p>
                    )}

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      transition={SPRING}
                      className={cx(
                        "flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border-0 px-8 py-4 text-xs font-extrabold uppercase tracking-wide disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto",
                        focusRing
                      )}
                      style={{
                        backgroundColor: PALETTE.lime,
                        color: PALETTE.ink,
                      }}
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

      {/* --- FOOTER --- */}
      <footer className="border-0 bg-white px-4 py-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-[10px] font-bold uppercase tracking-widest text-[#2A2A2A] sm:flex-row">
          <p>
            © {year} {BRAND}. {SLOGAN}. All rights reserved.
          </p>
          <Link
            to="/returnPolicy"
            className={cx(
              "rounded-full border-0 transition-colors hover:text-[#E11D1D]",
              focusRing
            )}
          >
            Return Policy
          </Link>
        </div>
      </footer>
    </div>
  );
}