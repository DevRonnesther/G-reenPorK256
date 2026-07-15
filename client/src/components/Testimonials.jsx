import React from "react";
import { MessageSquareQuote, Star, Check } from "lucide-react";

const Testimonials = () => {
    const testimonials = [
        {
            quote:
                "GreenPork completely changed my expectations for premium food delivery. The taste, freshness, and presentation are outstanding.",
            author: "Maria Rodriguez",
            title: "Restaurant Owner",
            image:
                "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
        },
        {
            quote:
                "As a chef, quality matters to me. GreenPork consistently delivers rich flavor, fast service, and exceptional customer care.",
            author: "Thomas Lee",
            title: "Executive Chef",
            image:
                "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
        },
        {
            quote:
                "Every order feels premium. From the packaging to the taste, GreenPork delivers an experience worth coming back for.",
            author: "Emily Watson",
            title: "Food Critic",
            image:
                "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
        },
    ];

    return (
        <section className="relative py-24 overflow-hidden bg-white">

            {/* BACKGROUND DECORATIVE EFFECTS */}
            <div className="absolute top-0 left-0 w-80 h-80 bg-red-50/50 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-50/30 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

                    {/* LEFT COLUMN: STICKY BRAND OVERVIEW & TRUST BADGE */}
                    <div className="lg:col-span-5 lg:sticky lg:top-12 space-y-6">
                        <div>
                            <span className="inline-flex items-center gap-2 text-red-600 text-xs font-bold uppercase tracking-[0.15em] mb-4">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-600" aria-hidden="true" />
                                Customer Reviews
                            </span>

                            <h2 className="text-4xl md:text-5xl font-extrabold text-stone-900 tracking-tight leading-[1.1] mt-1">
                                What Our Clients <span className="text-red-600">Say About Us</span>
                            </h2>
                        </div>

                        <p className="text-stone-500 text-base leading-relaxed max-w-md">
                            Trusted by food lovers, chefs, and families who enjoy premium taste,
                            quality service, and unforgettable culinary experiences across the country.
                        </p>

                        {/* Unique Border-free Trust Metric Card */}
                        <div className="bg-stone-50/70 rounded-[1.5rem] p-6 max-w-md flex items-center gap-5">
                            <div className="text-center">
                                <span className="text-4xl font-extrabold text-stone-900">4.9</span>
                                <div className="flex items-center gap-0.5 mt-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={11} className="fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>
                            </div>
                            <div className="h-10 w-px bg-stone-200" aria-hidden="true" />
                            <p className="text-xs text-stone-500 leading-normal font-medium">
                                Based on 1,500+ direct client reviews and local catering experiences.
                            </p>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: ASYMMETRIC STAGGERED DECK */}
                    <div className="lg:col-span-7 space-y-8 pb-6">

                        {/* 1. Featured Testimonial (Large Premium Card) */}
                        <div className="bg-stone-900 text-white rounded-[2.5rem] p-8 md:p-10 shadow-2xl shadow-stone-900/10 hover:-translate-y-1 transition-all duration-300">
                            <div className="flex items-center justify-between mb-8">
                                <div className="w-12 h-12 rounded-xl bg-red-600 flex items-center justify-center">
                                    <MessageSquareQuote className="text-white" size={20} />
                                </div>
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 text-stone-200 rounded-full text-[10px] font-bold tracking-wider uppercase backdrop-blur-sm">
                                    <Check size={12} strokeWidth={3} className="text-yellow-400" /> Featured Review
                                </span>
                            </div>

                            <p className="text-stone-200 leading-relaxed text-base md:text-lg mb-8 italic">
                                “{testimonials[0].quote}”
                            </p>

                            <div className="flex items-center gap-4">
                                <img
                                    src={testimonials[0].image}
                                    alt={testimonials[0].author}
                                    className="w-14 h-14 rounded-2xl object-cover"
                                />
                                <div>
                                    <h4 className="text-base font-bold text-white leading-tight">
                                        {testimonials[0].author}
                                    </h4>
                                    <p className="text-xs text-yellow-400 font-semibold mt-0.5">
                                        {testimonials[0].title}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Staggered Sub-Grid for Reviews 2 & 3 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                            {/* 2. Secondary Testimonial (Left) */}
                            <div className="bg-stone-50/70 hover:bg-stone-50 rounded-[2rem] p-8 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                                        <MessageSquareQuote className="text-red-600" size={16} />
                                    </div>
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full text-[9px] font-bold tracking-wider uppercase">
                                        <Check size={10} strokeWidth={3} /> Verified
                                    </span>
                                </div>

                                <p className="text-stone-600 leading-relaxed text-sm mb-6">
                                    “{testimonials[1].quote}”
                                </p>

                                <div className="flex items-center gap-3">
                                    <img
                                        src={testimonials[1].image}
                                        alt={testimonials[1].author}
                                        className="w-11 h-11 rounded-xl object-cover"
                                    />
                                    <div>
                                        <h4 className="text-sm font-bold text-stone-900 leading-tight">
                                            {testimonials[1].author}
                                        </h4>
                                        <p className="text-[11px] text-red-600 font-semibold mt-0.5">
                                            {testimonials[1].title}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* 3. Secondary Testimonial (Right - Staggered Offset) */}
                            <div className="bg-stone-50/70 hover:bg-stone-50 rounded-[2rem] p-8 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 lg:translate-y-6">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                                        <MessageSquareQuote className="text-red-600" size={16} />
                                    </div>
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full text-[9px] font-bold tracking-wider uppercase">
                                        <Check size={10} strokeWidth={3} /> Verified
                                    </span>
                                </div>

                                <p className="text-stone-600 leading-relaxed text-sm mb-6">
                                    “{testimonials[2].quote}”
                                </p>

                                <div className="flex items-center gap-3">
                                    <img
                                        src={testimonials[2].image}
                                        alt={testimonials[2].author}
                                        className="w-11 h-11 rounded-xl object-cover"
                                    />
                                    <div>
                                        <h4 className="text-sm font-bold text-stone-900 leading-tight">
                                            {testimonials[2].author}
                                        </h4>
                                        <p className="text-[11px] text-red-600 font-semibold mt-0.5">
                                            {testimonials[2].title}
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
};

export default Testimonials;