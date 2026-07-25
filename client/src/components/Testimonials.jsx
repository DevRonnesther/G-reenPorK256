import React from "react";
import { motion } from "framer-motion";
import { MessageSquareQuote, Star, Check } from "lucide-react";

// ─── Design Tokens (falls back to Hero.jsx's light brand slide if no theme prop is passed) ─
const DEFAULT_THEME = {
    bgFrom: "#0edb0e", bgTo: "#0bb00b", text: "#ffffff",
    textSoft: "rgba(255,255,255,0.85)", textFaint: "rgba(255,255,255,0.55)",
    panel: "rgba(255,255,255,0.12)", panelStrong: "rgba(255,255,255,0.22)",
};
const GOLD = "#facc15";
const glassStyle = (t) => ({ backgroundColor: t.panel, backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" });

const Eyebrow = ({ children, theme }) => (
    <span className="inline-flex items-center gap-2.5 text-[11px] font-ui font-semibold uppercase tracking-[0.25em] mb-4" style={{ color: theme.textSoft }}>
        <motion.span
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: theme.text, boxShadow: `0 0 8px ${theme.text}` }}
            animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden="true"
        />
        Customer Reviews
    </span>
);

const Testimonials = ({ theme = DEFAULT_THEME }) => {
    const testimonials = [
        {
            quote: "GreenPork completely changed my expectations for premium food delivery. The taste, freshness, and presentation are outstanding.",
            author: "Maria Rodriguez", title: "Restaurant Owner",
            image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
        },
        {
            quote: "As a chef, quality matters to me. GreenPork consistently delivers rich flavor, fast service, and exceptional customer care.",
            author: "Thomas Lee", title: "Executive Chef",
            image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
        },
        {
            quote: "Every order feels premium. From the packaging to the taste, GreenPork delivers an experience worth coming back for.",
            author: "Emily Watson", title: "Food Critic",
            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
        },
    ];

    return (
        <section className="relative py-24 px-6 font-body">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

                    {/* LEFT COLUMN: STICKY BRAND OVERVIEW & TRUST BADGE */}
                    <div className="lg:col-span-5 lg:sticky lg:top-12 space-y-6">
                        <div>
                            <Eyebrow theme={theme} />
                            <h2 className="text-4xl md:text-5xl font-display font-black tracking-tight leading-[1.1] mt-1" style={{ color: theme.text }}>
                                What Our Clients <span style={{ color: GOLD }}>Say About Us</span>
                            </h2>
                        </div>

                        <p className="text-base leading-relaxed max-w-md font-body" style={{ color: theme.textSoft }}>
                            Trusted by food lovers, chefs, and families who enjoy premium taste,
                            quality service, and unforgettable culinary experiences across the country.
                        </p>

                        {/* Trust Metric Card */}
                        <div className="rounded-[1.5rem] p-6 max-w-md flex items-center gap-5" style={glassStyle(theme)}>
                            <div className="text-center">
                                <span className="text-4xl font-display font-black" style={{ color: theme.text }}>4.9</span>
                                <div className="flex items-center gap-0.5 mt-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={11} style={{ fill: GOLD, color: GOLD }} />
                                    ))}
                                </div>
                            </div>
                            <div className="h-10 w-px" style={{ backgroundColor: theme.panelStrong }} aria-hidden="true" />
                            <p className="text-xs leading-normal font-ui font-medium" style={{ color: theme.textSoft }}>
                                Based on 1,500+ direct client reviews and local catering experiences.
                            </p>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: ASYMMETRIC STAGGERED DECK */}
                    <div className="lg:col-span-7 space-y-8 pb-6">

                        {/* 1. Featured Testimonial — inverted (solid theme.text) so it pops off the gradient */}
                        <motion.div
                            whileHover={{ y: -4 }}
                            className="rounded-[2.5rem] p-8 md:p-10 shadow-2xl transition-all duration-300"
                            style={{ backgroundColor: theme.text, color: theme.bgTo }}
                        >
                            <div className="flex items-center justify-between mb-8">
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: theme.bgTo }}>
                                    <MessageSquareQuote style={{ color: theme.text }} size={20} />
                                </div>
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-ui font-bold tracking-wider uppercase" style={{ backgroundColor: `${theme.bgTo}15`, color: theme.bgTo }}>
                                    <Check size={12} strokeWidth={3} style={{ color: GOLD }} /> Featured Review
                                </span>
                            </div>

                            <p className="leading-relaxed text-base md:text-lg mb-8 italic font-body opacity-90">
                                "{testimonials[0].quote}"
                            </p>

                            <div className="flex items-center gap-4">
                                <img src={testimonials[0].image} alt={testimonials[0].author} className="w-14 h-14 rounded-2xl object-cover" />
                                <div>
                                    <h4 className="text-base font-display font-bold leading-tight">{testimonials[0].author}</h4>
                                    <p className="text-xs font-ui font-semibold mt-0.5" style={{ color: theme.bgTo, opacity: 0.7 }}>{testimonials[0].title}</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Staggered Sub-Grid for Reviews 2 & 3 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {[testimonials[1], testimonials[2]].map((t, i) => (
                                <motion.div
                                    key={t.author}
                                    whileHover={{ y: -4 }}
                                    className={`rounded-[2rem] p-8 transition-all duration-300 ${i === 1 ? "lg:translate-y-6" : ""}`}
                                    style={glassStyle(theme)}
                                >
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: theme.panelStrong }}>
                                            <MessageSquareQuote style={{ color: theme.text }} size={16} />
                                        </div>
                                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-ui font-bold tracking-wider uppercase" style={{ backgroundColor: theme.panelStrong, color: theme.text }}>
                                            <Check size={10} strokeWidth={3} /> Verified
                                        </span>
                                    </div>

                                    <p className="leading-relaxed text-sm mb-6 font-body" style={{ color: theme.textSoft }}>"{t.quote}"</p>

                                    <div className="flex items-center gap-3">
                                        <img src={t.image} alt={t.author} className="w-11 h-11 rounded-xl object-cover" />
                                        <div>
                                            <h4 className="text-sm font-display font-bold leading-tight" style={{ color: theme.text }}>{t.author}</h4>
                                            <p className="text-[11px] font-ui font-semibold mt-0.5" style={{ color: GOLD }}>{t.title}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;