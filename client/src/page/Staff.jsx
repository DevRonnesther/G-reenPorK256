import React from "react";
import { motion } from "framer-motion";

/* ═══════════════════════════════════════════════════════════
   STANDARD DESIGN TOKENS
   ═══════════════════════════════════════════════════════════ */
const BRAND_COLOR = "#D9FF00"; // Primary Action / Highlight
const DARK = "#4A0A0A";       // Primary Dark / Text
const ALERT_COLOR = "#E11D1D"; // Alert / Active states

const ease = [0.16, 1, 0.3, 1];

function Reveal({ children, delay = 0, className = "" }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease, delay }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export function Staff() {
    const team = [
        {
            name: "Green Ronnie",
            role: "Founder & CEO",
            image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
            bio: "Leading Green Pork with a vision for premium food experiences and modern service.",
        },
        {
            name: "Ella Stella",
            role: "Operations Manager",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
            bio: "Ensures smooth daily operations, quality control, and fast customer delivery.",
        },
        {
            name: "Sarah Johnson",
            role: "Creative Director",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
            bio: "Creates the brand experience and visual identity behind Green Pork.",
        },
        {
            name: "Robert Williams",
            role: "Head Chef",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
            bio: "Crafting bold flavors and premium meals with passion and creativity.",
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-4 selection:bg-[#D9FF00] selection:text-[#4A0A0A] sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
            {team.map((member, i) => (
                <Reveal key={member.name} delay={i * 0.1}>
                    {/* Clean card with solid color hover swap instead of gradients/borders */}
                    <div className="group h-full cursor-pointer overflow-hidden rounded-3xl bg-white shadow-lg transition-colors duration-300 hover:bg-[#4A0A0A]">
                        <div className="relative aspect-[4/5] overflow-hidden">
                            <img
                                src={member.image}
                                alt={member.name}
                                className="h-full w-full object-cover grayscale-[30%] transition-all duration-500 ease-out group-hover:scale-105 group-hover:grayscale-0"
                            />
                            {/* Solid dark overlay on hover instead of a gradient */}
                            <div className="absolute inset-0 bg-[#4A0A0A]/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        </div>

                        <div className="p-6">
                            <h3 className="mb-1 text-xl font-black uppercase leading-none tracking-tight text-[#4A0A0A] transition-colors duration-300 group-hover:text-white">
                                {member.name}
                            </h3>
                            {/* Role uses standard alert color by default, switches to brand color on hover */}
                            <p className="mb-4 text-[11px] font-black uppercase tracking-widest transition-colors duration-300 group-hover:text-[#D9FF00]" style={{ color: ALERT_COLOR }}>
                                {member.role}
                            </p>
                            <p className="text-sm font-medium leading-relaxed text-[#4A0A0A]/70 transition-colors duration-300 group-hover:text-white/70">
                                {member.bio}
                            </p>
                        </div>
                    </div>
                </Reveal>
            ))}
        </div>
    );
}