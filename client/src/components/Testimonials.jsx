import React from "react";
import {
    MessageSquareQuote,
    Star,
    ArrowUpRight,
} from "lucide-react";

export function Testimonials() {
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
        <section className="relative py-24 overflow-hidden bg-[#fafafa]">

            {/* BACKGROUND EFFECTS */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-red-100 rounded-full blur-3xl opacity-40" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-yellow-100 rounded-full blur-3xl opacity-50" />

            <div className="max-w-7xl mx-auto px-4 relative z-10">

                {/* HEADER */}
                <div className="text-center mb-16">

                    <span className="inline-flex items-center gap-2 bg-red-50 border border-red-100 text-red-600 px-5 py-2 rounded-full text-sm font-semibold">
                        💬 Customer Reviews
                    </span>

                    <h2 className="mt-6 text-4xl md:text-5xl font-black text-gray-900 leading-tight">
                        What Our Clients
                        <span className="text-red-600"> Say About Us</span>
                    </h2>

                    <p className="max-w-2xl mx-auto mt-5 text-gray-500 text-lg leading-relaxed">
                        Trusted by food lovers, chefs, and families who enjoy premium taste,
                        quality service, and unforgettable experiences.
                    </p>
                </div>

                {/* TESTIMONIAL GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="group relative overflow-hidden bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                        >

                            {/* TOP GLOW */}
                            <div className="absolute top-0  right-0 w-40 h-40 bg-red-100 rounded-full blur-3xl opacity-40 group-hover:opacity-70 transition-all duration-500" />

                            {/* QUOTE ICON */}
                            <div className="relative z-10 flex items-center justify-between mb-8">

                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center shadow-lg">
                                    <MessageSquareQuote className="text-white" size={28} />
                                </div>

                                <button className="w-11 h-11 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-red-600 hover:text-white transition-all duration-300">
                                    <ArrowUpRight size={18} />
                                </button>
                            </div>

                            {/* STARS */}
                            <div className="flex items-center gap-1 mb-6 relative z-10">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={18}
                                        className="fill-yellow-400 text-yellow-400"
                                    />
                                ))}
                            </div>

                            {/* QUOTE */}
                            <p className="text-gray-600 leading-relaxed text-[15px] mb-8 relative z-10">
                                “{testimonial.quote}”
                            </p>

                            {/* USER */}
                            <div className="flex items-center gap-4 relative z-10">

                                <div className="relative">
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.author}
                                        className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-md"
                                    />

                                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full" />
                                </div>

                                <div>
                                    <h4 className="text-lg font-bold text-gray-900">
                                        {testimonial.author}
                                    </h4>

                                    <p className="text-sm text-red-600 font-medium">
                                        {testimonial.title}
                                    </p>
                                </div>
                            </div>

                            {/* BORDER EFFECT */}
                            <div className="absolute inset-0 rounded-[2rem] border-2 border-transparent group-hover:border-red-100 transition-all duration-500 pointer-events-none" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}