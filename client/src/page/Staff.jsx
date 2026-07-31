import React from "react";
import { motion } from "framer-motion";

const CTA_COLOR = "#D4FF00";

export function Staff({ theme = { text: "#000000", textSoft: "#333333", textFaint: "#666666", border: "#000000", bg: "#ffffff" } }) {
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
        <section className="font-body">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {team.map((member, i) => (
                    <motion.div
                        key={member.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.08 }}
                        className="group border-2 cursor-pointer transition-colors duration-300"
                        style={{ borderColor: theme.border, backgroundColor: theme.bg, color: theme.text }}
                        whileHover={{ backgroundColor: theme.text, color: theme.bg }}
                    >
                        <div className="relative overflow-hidden aspect-[4/5] border-b-2" style={{ borderColor: theme.border }}>
                            <img
                                src={member.image}
                                alt={member.name}
                                className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ease-out"
                            />
                        </div>

                        <div className="p-6">
                            <h3 className="text-2xl font-display font-black tracking-tighter mb-2">
                                {member.name}
                            </h3>
                            <p className="font-display font-bold text-[10px] uppercase tracking-widest mb-4 transition-colors" style={{ color: theme.textFaint }}>
                                <span className="group-hover:text-[#D4FF00] transition-colors">{member.role}</span>
                            </p>
                            <p className="leading-relaxed text-sm font-body opacity-80">
                                {member.bio}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}