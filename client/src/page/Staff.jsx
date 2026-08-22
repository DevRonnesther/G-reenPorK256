import React from "react";
import { motion } from "framer-motion";

// ─── Centralized GreenPork Design Tokens ──────────────────────────────────────
const BRAND = {
    red: "#D90404",       // --brand-red
    lime: "#D4FF00",      // --brand-lime
    white: "#FFFFFF",     // --brand-white
    dark: "#2E0101",      // --brand-dark
};

// ─── GSAP-like Stagger Config ─────────────────────────────────────────────────
const ease = [0.22, 1, 0.36, 1];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
};

const item = {
    hidden: { opacity: 0, y: 50, clipPath: "inset(100% 0 0 0)" },
    show: {
        opacity: 1,
        y: 0,
        clipPath: "inset(0% 0 0 0)",
        transition: { duration: 0.9, ease }
    }
};

const imgReveal = {
    hidden: { scale: 1.3 },
    show: {
        scale: 1,
        transition: { duration: 1.2, ease }
    }
};

export function Staff({
    theme = {
        text: BRAND.dark,
        textSoft: "rgba(46,1,1,0.8)",
        textFaint: "rgba(46,1,1,0.6)",
        border: BRAND.dark,
        bg: BRAND.white
    }
}) {
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
        <motion.section
            className="font-body"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {team.map((member, i) => (
                    <motion.div
                        key={member.name}
                        variants={item}
                        className="group border-2 cursor-pointer transition-colors duration-300 overflow-hidden relative"
                        style={{ borderColor: theme.border, backgroundColor: theme.bg, color: theme.text }}
                        whileHover={{ backgroundColor: theme.text, color: theme.bg }}
                    >
                        <div className="relative overflow-hidden aspect-[4/5] border-b-2" style={{ borderColor: theme.border }}>
                            <motion.img
                                variants={imgReveal}
                                src={member.image}
                                alt={member.name}
                                className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ease-out"
                            />

                            {/* Premium scroll/hover overlay wipe */}
                            <div
                                className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6"
                                style={{ background: `linear-gradient(to top, ${BRAND.dark} 10%, transparent 100%)` }}
                            >
                                <p className="text-sm font-body text-[#FFFFFF] translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out delay-100">
                                    {member.bio}
                                </p>
                            </div>
                        </div>

                        <div className="p-6 relative z-20">
                            <h3 className="text-2xl font-display font-black tracking-tighter mb-2">
                                {member.name}
                            </h3>
                            <p className="font-display font-bold text-[10px] uppercase tracking-widest mb-4 transition-colors" style={{ color: theme.textFaint }}>
                                <span
                                    className="transition-colors duration-300"
                                    style={{ ['--tw-text-opacity']: 1 }}
                                >
                                    <span className="group-hover:text-[#D4FF00] transition-colors duration-300">
                                        {member.role}
                                    </span>
                                </span>
                            </p>

                            {/* Desktop Bio (always visible) */}
                            <p className="leading-relaxed text-sm font-body opacity-80 lg:hidden">
                                {member.bio}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
}