import React from "react";
import { motion } from "framer-motion";

// ─── Design Tokens (Synced with Hero.jsx Light Mode) ──────────────────────
const DEFAULT_THEME = {
    text: "#0a0a0a",
    textSoft: "rgba(10,10,10,0.75)",
    textFaint: "rgba(10,10,10,0.5)",
    panel: "rgba(255,255,255,0.6)",
    panelStrong: "rgba(255,255,255,0.8)",
    border: "rgba(10,10,10,0.06)"
};

const GREEN = "#0edb0e";
const GOLD = "#facc15";

const glassStyle = (t) => ({
    backgroundColor: t.panel,
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    border: `1px solid ${t.border}`,
    boxShadow: "0 8px 30px rgba(0,0,0,0.04)"
});

export function Staff({ theme = DEFAULT_THEME }) {
    const team = [
        {
            name: "Green Ronnie", role: "Founder & CEO",
            image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
            bio: "Leading GreenPork with a vision for premium food experiences and modern service.",
        },
        {
            name: "Ella Stella", role: "Operations Manager",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
            bio: "Ensures smooth daily operations, quality control, and fast customer delivery.",
        },
        {
            name: "Sarah Johnson", role: "Creative Director",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
            bio: "Creates the brand experience and visual identity behind GreenPork.",
        },
        {
            name: "Robert Williams", role: "Head Chef",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
            bio: "Crafting bold flavors and premium meals with passion and creativity.",
        },
    ];

    return (
        <section className="relative py-12 font-body">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {team.map((member, i) => (
                        <motion.div
                            key={member.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.08 }}
                            whileHover={{ y: -6 }}
                            className="group rounded-[2rem] overflow-hidden transition-all duration-300"
                            style={glassStyle(theme)}
                        >
                            <div className="relative overflow-hidden aspect-[4/5]">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                />
                                {/* Fade image into the white card background at the bottom */}
                                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 60%, rgba(255,255,255,0.8) 100%)" }} />
                            </div>

                            <div className="p-6 relative -mt-12 z-10">
                                <h3 className="text-xl font-display font-extrabold tracking-tight" style={{ color: theme.text }}>
                                    {member.name}
                                </h3>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: GREEN }}></span>
                                    <p className="font-ui font-semibold text-sm" style={{ color: GREEN }}>
                                        {member.role}
                                    </p>
                                </div>
                                <p className="leading-relaxed text-sm mt-4 font-body" style={{ color: theme.textSoft }}>
                                    {member.bio}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}