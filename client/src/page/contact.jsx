import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import {
  MapPin, Mail, ArrowLeft, Phone,
  Send, Clock3, Facebook, Instagram,
  MessageCircle, ArrowRight, Flame,
} from "lucide-react";

// ─── Eyebrow label (matches About page pattern) ───────────────────────────────
const Eyebrow = ({ children }) => (
  <p className="inline-flex items-center gap-1.5 text-red-500 text-xs font-black uppercase tracking-[3px] mb-3">
    <span className="w-4 h-0.5 bg-red-500 rounded-full" />
    {children}
    <span className="w-4 h-0.5 bg-red-500 rounded-full" />
  </p>
);

// ─── Reusable contact info row ─────────────────────────────────────────────────
const InfoRow = ({ icon, iconBg, iconColor, label, value, href }) => {
  const Inner = (
    <div className="flex items-center gap-4">
      <div className={`w-11 h-11 rounded-2xl ${iconBg} flex items-center justify-center ${iconColor} shrink-0`}>
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5">{label}</p>
        <p className="font-bold text-gray-900 text-sm leading-tight truncate">{value}</p>
      </div>
      {href && <ArrowRight size={14} className="text-gray-300 ml-auto shrink-0" />}
    </div>
  );

  const cls = "block bg-gray-50 hover:bg-gray-100 border border-gray-100 rounded-2xl px-4 py-3.5 transition-all duration-200";

  return href ? (
    <a href={href} className={cls}>{Inner}</a>
  ) : (
    <div className={cls}>{Inner}</div>
  );
};

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    alert("Message sent!");
    reset();
  };

  // Shared input classes
  const inputBase =
    "w-full px-5 py-4 rounded-2xl border bg-gray-50 text-gray-900 outline-none transition-all duration-200 focus:ring-4 focus:ring-red-100 focus:border-red-400 placeholder:text-gray-400 text-sm font-medium";

  return (
    <div className="min-h-screen bg-white overflow-hidden">

      {/* ── Ambient blobs ── */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-red-100/50 blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 w-[480px] h-[480px] rounded-full bg-orange-100/50 blur-[120px]" />
      </div>

      {/* ──────────────────────────────────────────────────────────────────────────
          PAGE HERO — dark brand header, keeps visual consistency with About/Hero
      ────────────────────────────────────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden pt-6 pb-16 px-6"
        style={{
          background: "linear-gradient(145deg, #1a0000 0%, #3d0000 40%, #7c1010 75%, #c0392b 100%)",
        }}
      >
        {/* Glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 50% 70% at 80% 50%, rgba(249,115,22,0.2) 0%, transparent 70%)" }}
        />
        {/* Rings */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[280, 440, 600].map((s) => (
            <div key={s} className="absolute rounded-full border border-white/5"
              style={{ width: s, height: s, top: "50%", right: "-100px", transform: "translateY(-50%)" }} />
          ))}
        </div>

        {/* Back link */}
        <div className="relative z-10 max-w-7xl mx-auto mb-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors group"
          >
            <div className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all">
              <ArrowLeft size={17} />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest hidden sm:inline">Back to home</span>
          </Link>
        </div>

        {/* Header copy */}
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white/70 text-xs font-bold uppercase tracking-[2px] px-4 py-2 rounded-full mb-5">
            <Flame size={13} className="text-orange-400" />
            Contact Us
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight mb-4">
            We'd Love to Hear{" "}
            <span className="text-orange-400">From You</span>
          </h1>
          <p className="text-white/55 text-lg max-w-xl mx-auto leading-relaxed">
            Questions, feedback, or a quick order — reach out and
            we'll get back to you fast.
          </p>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────────────────────
          MAIN CONTENT
      ────────────────────────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* ── CONTACT FORM (2/3 width) ── */}
          <div className="lg:col-span-2 bg-white border border-gray-100 shadow-xl rounded-3xl p-8 md:p-12">
            <div className="mb-8">
              <Eyebrow>Send a Message</Eyebrow>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900">Let's Talk</h2>
              <p className="text-gray-400 mt-2 text-sm">Fill in the form and we'll reply as soon as possible.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

              {/* Name row */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">First Name</label>
                  <input
                    type="text"
                    placeholder="John"
                    className={`${inputBase} ${errors.firstName ? "border-red-400" : "border-gray-200"}`}
                    {...register("firstName", { required: "Required" })}
                  />
                  {errors.firstName && <p className="mt-1.5 text-xs text-red-500 font-semibold">{errors.firstName.message}</p>}
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Last Name</label>
                  <input
                    type="text"
                    placeholder="Doe"
                    className={`${inputBase} ${errors.lastName ? "border-red-400" : "border-gray-200"}`}
                    {...register("lastName", { required: "Required" })}
                  />
                  {errors.lastName && <p className="mt-1.5 text-xs text-red-500 font-semibold">{errors.lastName.message}</p>}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Email Address</label>
                <input
                  type="email"
                  placeholder="johndoe@gmail.com"
                  className={`${inputBase} ${errors.email ? "border-red-400" : "border-gray-200"}`}
                  {...register("email", {
                    required: "Required",
                    pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email" },
                  })}
                />
                {errors.email && <p className="mt-1.5 text-xs text-red-500 font-semibold">{errors.email.message}</p>}
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Message</label>
                <textarea
                  rows={6}
                  placeholder="Write your message here..."
                  className={`${inputBase} resize-none ${errors.message ? "border-red-400" : "border-gray-200"}`}
                  {...register("message", {
                    required: "Required",
                    minLength: { value: 10, message: "At least 10 characters" },
                  })}
                />
                {errors.message && <p className="mt-1.5 text-xs text-red-500 font-semibold">{errors.message.message}</p>}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="group inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white font-black px-8 py-4 rounded-2xl shadow-xl shadow-red-600/25 hover:shadow-red-600/35 hover:scale-[1.02] transition-all duration-200"
              >
                Send Message
                <Send size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </form>
          </div>

          {/* ── SIDEBAR ── */}
          <div className="flex flex-col gap-6">

            {/* Contact info card */}
            <div className="bg-white border border-gray-100 shadow-xl rounded-3xl p-7">
              <Eyebrow>Reach Us</Eyebrow>
              <h3 className="text-2xl font-black text-gray-900 mb-5">Contact Info</h3>
              <div className="space-y-3">
                <InfoRow
                  icon={<Phone size={17} />}
                  iconBg="bg-emerald-100" iconColor="text-emerald-600"
                  label="Phone" value="+256 776-464-823"
                  href="tel:+256776464823"
                />
                <InfoRow
                  icon={<Mail size={17} />}
                  iconBg="bg-red-100" iconColor="text-red-600"
                  label="Email" value="greenporkie@gmail.com"
                  href="mailto:greenporkie@gmail.com"
                />
                <InfoRow
                  icon={<MapPin size={17} />}
                  iconBg="bg-amber-100" iconColor="text-amber-500"
                  label="Location" value="Gulu City, Uganda"
                />
                <InfoRow
                  icon={<Clock3 size={17} />}
                  iconBg="bg-gray-100" iconColor="text-gray-600"
                  label="Hours" value="Mon – Sun · 10 AM – 10 PM"
                />
              </div>
            </div>

            {/* WhatsApp CTA — most direct conversion path */}
            <a
              href="https://wa.me/256776464823"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between bg-red-600 hover:bg-red-700 text-white rounded-3xl px-7 py-5 shadow-xl shadow-red-600/25 hover:scale-[1.01] transition-all duration-200"
            >
              <div>
                <p className="text-[10px] uppercase tracking-widest text-white/60 mb-0.5">Fastest way to order</p>
                <p className="font-black text-lg">Chat on WhatsApp</p>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center">
                <ArrowRight size={18} />
              </div>
            </a>

            {/* Socials */}
            <div className="bg-white border border-gray-100 shadow-xl rounded-3xl p-7">
              <h3 className="text-lg font-black text-gray-900 mb-4">Follow Us</h3>
              <div className="flex gap-3">
                {[
                  { href: "#", Icon: Facebook, bg: "bg-blue-50  hover:bg-blue-100", color: "text-blue-600" },
                  { href: "#", Icon: Instagram, bg: "bg-pink-50  hover:bg-pink-100", color: "text-pink-600" },
                  { href: "#", Icon: MessageCircle, bg: "bg-green-50 hover:bg-green-100", color: "text-green-600" },
                ].map(({ href, Icon, bg, color }, i) => (
                  <a
                    key={i}
                    href={href}
                    className={`w-12 h-12 rounded-2xl ${bg} flex items-center justify-center hover:scale-110 transition-all duration-200`}
                  >
                    <Icon size={19} className={color} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-100 py-7 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-sm">
              <span className="text-white text-xs select-none">🔥</span>
            </div>
            <p className="text-gray-400 text-sm font-medium">© {new Date().getFullYear()} GREENBites. All rights reserved.</p>
          </div>
          <Link to="/returnPolicy" className="text-sm font-bold text-red-600 hover:text-red-700 transition-colors">
            Return Policy
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Contact;