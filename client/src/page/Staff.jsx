import React from "react";
import { Linkedin, Instagram, ArrowUpRight } from "lucide-react";

export function Staff() {
    const team = [
        {
            name: "Green Ronnie",
            role: "Founder & CEO",
            image:
                "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
            bio: "Leading GreenPork with a vision for premium food experiences and modern service.",
        },
        {
            name: "Ella Stella",
            role: "Operations Manager",
            image:
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
            bio: "Ensures smooth daily operations, quality control, and fast customer delivery.",
        },
        {
            name: "Sarah Johnson",
            role: "Creative Director",
            image:
                "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
            bio: "Creates the brand experience and visual identity behind GreenPork.",
        },
        {
            name: "Robert Williams",
            role: "Head Chef",
            image:
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
            bio: "Crafting bold flavors and premium meals with passion and creativity.",
        },
    ];

    return (
        <section className="relative py-24 px-4 overflow-hidden bg-white">

            {/* BACKGROUND EFFECTS */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-red-100 rounded-full blur-3xl opacity-40" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-yellow-100 rounded-full blur-3xl opacity-50" />

            <div className="max-w-7xl mx-auto relative z-10">

                {/* HEADER */}
                <div className="text-center hidden mb-16">
                    <span className="inline-flex items-center gap-2 bg-red-50 border border-red-100 text-red-600 px-5 py-2 rounded-full text-sm font-semibold">
                        ✨ Meet Our Team
                    </span>

                    <h2 className="mt-6 text-4xl md:text-5xl font-black text-gray-900">
                        The People Behind
                        <span className="text-red-600"> GreenPork</span>
                    </h2>

                    <p className="max-w-2xl mx-auto mt-5 text-gray-500 text-lg leading-relaxed">
                        Passionate professionals committed to delivering premium food,
                        excellent service, and unforgettable customer experiences.
                    </p>
                </div>

                {/* TEAM GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

                    {team.map((member, index) => (
                        <div
                            key={index}
                            className="group relative bg-white border border-gray-100 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                        >

                            {/* IMAGE */}
                            <div className="relative overflow-hidden">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-[340px] object-cover group-hover:scale-105 transition-transform duration-700"
                                />

                                {/* OVERLAY */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                                {/* SOCIAL ICONS */}
                                <div className="absolute top-5 right-5 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500">
                                    <button className="w-11 h-11 rounded-2xl bg-white/90 backdrop-blur-md flex items-center justify-center hover:bg-red-600 hover:text-white transition-all">
                                        <Instagram size={18} />
                                    </button>

                                    <button className="w-11 h-11 rounded-2xl bg-white/90 backdrop-blur-md flex items-center justify-center hover:bg-red-600 hover:text-white transition-all">
                                        <Linkedin size={18} />
                                    </button>
                                </div>

                                {/* ROLE */}
                                <div className="absolute bottom-5 left-5">
                                    <span className="bg-yellow-400 text-black px-4 py-2 rounded-full text-xs font-bold shadow-lg">
                                        {member.role}
                                    </span>
                                </div>
                            </div>

                            {/* CONTENT */}
                            <div className="p-6">

                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900">
                                            {member.name}
                                        </h3>

                                        <p className="text-red-600 font-medium text-sm mt-1">
                                            {member.role}
                                        </p>
                                    </div>

                                    <button className="w-11 h-11 rounded-2xl bg-gray-100 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                                        <ArrowUpRight size={18} />
                                    </button>
                                </div>

                                <p className="text-gray-500 leading-relaxed text-sm">
                                    {member.bio}
                                </p>
                            </div>

                            {/* HOVER BORDER */}
                            <div className="absolute inset-0 rounded-[2rem] border-2 border-transparent group-hover:border-red-100 transition-all duration-500 pointer-events-none" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}