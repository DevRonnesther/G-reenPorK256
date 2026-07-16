import React from "react";

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
        <section className="relative py-24 px-6 overflow-hidden bg-white">

            {/* BACKGROUND EFFECTS */}
            <div className="absolute top-0 left-0 w-80 h-80 bg-[#0edb0e]/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-50/40 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">

                {/* TEAM GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

                    {team.map((member, index) => (
                        <div
                            key={index}
                            className="group bg-white rounded-[2rem] overflow-hidden shadow-xl shadow-stone-100/40 hover:shadow-2xl hover:shadow-stone-200/50 hover:-translate-y-1.5 transition-all duration-500"
                        >

                            {/* IMAGE */}
                            <div className="relative overflow-hidden aspect-[4/5]">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                />
                            </div>

                            {/* CONTENT */}
                            <div className="p-6">
                                <h3 className="text-xl font-extrabold text-stone-900 tracking-tight">
                                    {member.name}
                                </h3>

                                <p className="text-[#0edb0e] font-semibold text-sm mt-1">
                                    {member.role}
                                </p>

                                <p className="text-stone-500 leading-relaxed text-sm mt-4">
                                    {member.bio}
                                </p>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}