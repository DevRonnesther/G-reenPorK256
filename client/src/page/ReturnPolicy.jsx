import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Truck,
  ArrowRight,
  ShoppingBasket,
  Flame,
} from "lucide-react";

const BRAND = "Greenpork";
const SLOGAN = "Eat Fresh. Live Happy";
const PHONE_DISPLAY = "+256 776 464 823";
const PHONE_LINK = "tel:+256776464823";
const EMAIL = "greenporkie@gmail.com";

const PALETTE = {
  lime: "#D9FF00",
  red: "#E11D1D",
  wordRed: "#FF8F7A",
  ink: "#111111",
  charcoal: "#2A2A2A",
  muted: "#4A4A4A",
  surface: "#F5F5F5",
  surfaceHover: "#EFEFEF",
  white: "#FFFFFF",
};

const RETURN_RULES = [
  {
    icon: AlertCircle,
    title: "Perishable Products",
    text: "Due to hygiene and food safety regulations, freshly prepared pork, burgers, pizza, and chicken cannot be returned or exchanged after delivery has been completed.",
    highlight: null,
    after: null,
  },
  {
    icon: CheckCircle2,
    title: "Damaged or Incorrect Orders",
    text: "Please inspect your delivery promptly. Contact us within ",
    highlight: "24 hours",
    after:
      " of dispatch if your order is incorrect, damaged, or below quality standards.",
  },
  {
    icon: Clock,
    title: "Refund Processing",
    text: "Approved refunds are credited to your original payment method or local mobile money wallet within ",
    highlight: "3–5 business days",
    after: ".",
  },
];

const ASSURANCES = [
  {
    icon: ShieldCheck,
    title: "Food Safety Assurance",
    text: "All cuts and prepared dishes—pork, burgers, pizza, and chicken—are handled under strict hygienic and sanitary standards.",
  },
  {
    icon: Truck,
    title: "Gulu City Delivery Guidelines",
    text: "Our local dispatch works rapidly to keep orders hot and fresh. Please share clear physical landmarks in Gulu City to prevent delays.",
  },
];

const SUPPORT = [
  {
    icon: Phone,
    label: "Phone Desk",
    value: PHONE_DISPLAY,
    href: PHONE_LINK,
  },
  {
    icon: Mail,
    label: "Email Support",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
  },
  {
    icon: MapPin,
    label: "Service Hub",
    value: "Gulu City, Uganda",
    href: null,
  },
];

const SPRING = { type: "spring", stiffness: 220, damping: 26 };
const EASE = [0.16, 1, 0.3, 1];
const VIEWPORT = { once: true, margin: "-60px" };

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

const revealProps = (delay = 0) => ({
  initial: { opacity: 0, y: 20, filter: "blur(6px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: VIEWPORT,
  transition: { duration: 0.65, ease: EASE, delay },
});

function Eyebrow({ children }) {
  return (
    <span className="mb-5 inline-flex items-center gap-2 rounded-full border-0 bg-[#111111] px-4 py-2 text-[11px] font-bold uppercase tracking-wide text-[#D9FF00]">
      <Flame size={13} strokeWidth={2.5} />
      <span>{children}</span>
    </span>
  );
}

function IconBadge({ icon: Icon, size = "md" }) {
  const box = size === "lg" ? "h-14 w-14" : "h-11 w-11";
  return (
    <div
      className={cx(
        box,
        "flex shrink-0 items-center justify-center rounded-full border-0 text-[#D9FF00]"
      )}
      style={{ backgroundColor: PALETTE.ink }}
    >
      <Icon size={size === "lg" ? 22 : 18} strokeWidth={2.2} />
    </div>
  );
}

function Mark({ children }) {
  return (
    <strong
      className="rounded-md border-0 px-1.5 py-0.5 font-black"
      style={{ backgroundColor: PALETTE.lime, color: PALETTE.ink }}
    >
      {children}
    </strong>
  );
}

export default function ReturnPolicy() {
  const year = new Date().getFullYear();

  return (
    <div className="font-display relative min-h-screen w-full overflow-hidden border-0 bg-[#FFFFFF] text-[#111111] selection:bg-[#D9FF00] selection:text-[#111111]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap');
        .font-display { font-family: 'Archivo', sans-serif; }
        .font-body { font-family: 'Inter', sans-serif; }
      `}</style>

      {/* HEADER */}
      <header className="relative mx-auto max-w-7xl px-4 pb-12 pt-28 lg:px-12 lg:pt-36">
        <div className="relative z-10">
          <motion.div {...fadeUp(0)} className="hidden">
            <Eyebrow>
              {BRAND} · {SLOGAN}
            </Eyebrow>
          </motion.div>

          <div className="relative">
            <motion.h1
              {...fadeUp(0.05)}
              className="font-black uppercase leading-[0.82] tracking-[-0.04em]"
              style={{
                color: PALETTE.red,
                fontSize: "clamp(4rem, 16vw, 12rem)",
              }}
            >
              Return <br /> Policy
            </motion.h1>

            <motion.div
              {...fadeUp(0.3)}
              className="absolute bottom-[6%] right-[3%] z-20 hidden -rotate-3 rounded-2xl border-0 px-5 py-2.5 text-sm font-extrabold uppercase text-[#FFFFFF] sm:block lg:right-[22%]"
              style={{ backgroundColor: PALETTE.ink }}
            >
              24-hour claims window
              <span
                className="absolute -bottom-1 left-6 h-3 w-3 rotate-45"
                style={{ backgroundColor: PALETTE.ink }}
              />
            </motion.div>

            <motion.div
              {...fadeUp(0.4)}
              className="absolute right-[3%] top-[8%] z-20 hidden rounded-full border-0 px-5 py-2.5 text-sm font-extrabold uppercase sm:block lg:right-[8%]"
              style={{ backgroundColor: PALETTE.lime, color: PALETTE.ink }}
            >
              Refunds in 3–5 days
            </motion.div>
          </div>

          <motion.div
            {...fadeUp(0.2)}
            className="mt-8 flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between"
          >
            <p className="font-body max-w-xl text-sm font-semibold leading-relaxed text-[#2A2A2A] md:text-base">
              We maintain strict quality and hygiene across our pork, burgers,
              pizza, and chicken in Gulu City. Review our guidelines on returns,
              cancellations, and delivery protection.
            </p>

            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={SPRING}
            >
              <Link
                to="/Products"
                className={cx(
                  "flex items-center gap-2 rounded-full border-0 px-6 py-3.5 text-xs font-extrabold uppercase tracking-wide",
                  focusRing
                )}
                style={{ backgroundColor: PALETTE.lime, color: PALETTE.ink }}
              >
                <ShoppingBasket size={14} strokeWidth={2.5} />
                <span>Browse Menu</span>
                <ArrowRight size={14} strokeWidth={2.5} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </header>

      {/* MAIN */}
      <main className="mx-auto max-w-7xl px-4 pb-8 pt-8 lg:px-12">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
          {/* LEFT: RETURNS AND REFUNDS */}
          <section className="lg:col-span-7">
            <motion.div {...revealProps()} className="mb-8 flex items-center gap-4">
              <IconBadge icon={CheckCircle2} size="lg" />
              <div>
                <p className="font-body text-[10px] font-bold uppercase tracking-widest text-[#4A4A4A]">
                  Section 01
                </p>
                <h2 className="mt-1 text-3xl font-black uppercase leading-none tracking-[-0.04em] text-[#111111] md:text-4xl">
                  Returns &amp; Refunds
                </h2>
              </div>
            </motion.div>

            <div className="space-y-4">
              {RETURN_RULES.map((rule, i) => (
                <motion.div
                  key={rule.title}
                  {...revealProps(i * 0.1)}
                  className="flex items-start gap-5 rounded-[2.5rem] border-0 bg-[#F5F5F5] p-6 transition-colors duration-300 hover:bg-[#EFEFEF] md:p-8"
                >
                  <IconBadge icon={rule.icon} />
                  <div>
                    <h3 className="mb-2 text-lg font-black uppercase tracking-tight text-[#111111]">
                      {rule.title}
                    </h3>
                    <p className="font-body text-sm font-medium leading-relaxed text-[#2A2A2A]">
                      {rule.text}
                      {rule.highlight && <Mark>{rule.highlight}</Mark>}
                      {rule.after}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* RIGHT: CANCELLATION + ASSURANCE */}
          <div className="space-y-4 lg:sticky lg:top-28 lg:col-span-5">
            <motion.section
              {...revealProps()}
              className="relative overflow-hidden rounded-[2.5rem] border-0 p-8 text-[#FFFFFF] md:p-10"
              style={{ backgroundColor: PALETTE.ink }}
            >
              <div className="relative z-10">
                <div className="mb-6 flex items-center gap-4">
                  <IconBadge icon={Clock} size="lg" />
                  <div>
                    <p className="font-body text-[10px] font-bold uppercase tracking-widest text-[#D9FF00]">
                      Section 02
                    </p>
                    <h2 className="mt-1 text-2xl font-black uppercase leading-none tracking-[-0.04em] text-[#FFFFFF]">
                      Cancellation Policy
                    </h2>
                  </div>
                </div>
                <p className="font-body text-sm font-medium leading-relaxed text-[#FFFFFF]/90">
                  Orders may be canceled before <Mark>8:00 AM</Mark> on your
                  scheduled day of delivery. Once kitchen preparation begins,
                  cancellations cannot be accommodated.
                </p>
              </div>
            </motion.section>

            <motion.section
              {...revealProps(0.1)}
              className="space-y-7 rounded-[2.5rem] border-0 bg-[#F5F5F5] p-8 md:p-10"
            >
              {ASSURANCES.map((a) => (
                <div key={a.title} className="flex gap-4">
                  <IconBadge icon={a.icon} />
                  <div>
                    <h3 className="mb-1.5 text-base font-black uppercase tracking-tight text-[#111111]">
                      {a.title}
                    </h3>
                    <p className="font-body text-xs font-medium leading-relaxed text-[#2A2A2A]">
                      {a.text}
                    </p>
                  </div>
                </div>
              ))}
            </motion.section>
          </div>
        </div>

        {/* HELP DESK */}
        <motion.section
          {...revealProps()}
          className="relative mt-20 overflow-hidden rounded-[2.5rem] border-0 px-6 py-14 md:px-12 md:py-20"
          style={{ backgroundColor: PALETTE.red }}>
          <div className="relative z-10">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <Eyebrow>Help Desk</Eyebrow>
              <h2
                className="font-black uppercase leading-[0.85] tracking-[-0.04em]"
                style={{
                  color: PALETTE.wordRed,
                  fontSize: "clamp(2.75rem, 9vw, 6rem)",
                }}
              >
                Need Delivery <br /> Assistance?
              </h2>
              <p className="font-body mx-auto mt-6 max-w-lg text-sm font-semibold leading-relaxed text-[#FFFFFF] md:text-base">
                Reach out to our Gulu City support team for direct inquiries
                regarding orders, refunds, or food quality concerns.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {SUPPORT.map(({ icon, label, value, href }) => {
                const card = (
                  <div className="flex h-full flex-col justify-between gap-6 rounded-[2rem] border-0 bg-[#FFFFFF] p-6 transition-colors duration-300 hover:bg-[#F5F5F5]">
                    <IconBadge icon={icon} size="lg" />
                    <div>
                      <h3 className="font-body mb-2 text-[10px] font-bold uppercase tracking-widest text-[#4A4A4A]">
                        {label}
                      </h3>
                      <p
                        className="break-words text-base font-extrabold leading-tight"
                        style={{ color: PALETTE.ink }}
                      >
                        {value}
                      </p>
                    </div>
                  </div>
                );
                return href ? (
                  <motion.a
                    key={label}
                    href={href}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    transition={SPRING}
                    className={cx("block rounded-[2rem] border-0", focusRing)}
                  >
                    {card}
                  </motion.a>
                ) : (
                  <div key={label}>{card}</div>
                );
              })}
            </div>
          </div>
        </motion.section>
      </main>

      {/* FOOTER */}
      <footer className="mt-16 border-0 bg-[#FFFFFF] px-4 py-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-[10px] font-bold uppercase tracking-widest text-[#2A2A2A] sm:flex-row">
          <p>
            © {year} {BRAND}. {SLOGAN}. All rights reserved.
          </p>
          <p>Pork · Burgers · Pizza · Chicken · Gulu City</p>
        </div>
      </footer>
    </div>
  );
}