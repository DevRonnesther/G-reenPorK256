import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

/* ═══════════════════════════════════════════════════════════
   STANDARD DESIGN TOKENS
   ═══════════════════════════════════════════════════════════ */
const BRAND_COLOR = "#D9FF00"; // Primary Action / Highlight
const DARK = "#4A0A0A";       // Primary Dark / Text

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

export default function Gallery() {
    const [selectedImage, setSelectedImage] = useState(null);

    const images = [
        "https://images.unsplash.com/photo-1516253593875-bd7052fbc5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1500595046743-cd271d694d30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1516054575922-f0b8eeadec1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1560493676-04071c5f467b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    ];

    return (
        <>
            <div className="grid grid-cols-2 gap-4 selection:bg-[#D9FF00] selection:text-[#4A0A0A] md:grid-cols-3 md:gap-6">
                {images.map((src, i) => (
                    <Reveal key={src} delay={i * 0.08}>
                        <div
                            className="group relative aspect-square cursor-pointer overflow-hidden rounded-2xl bg-[#4A0A0A]/[0.03]"
                            onClick={() => setSelectedImage(src)}
                        >
                            <img
                                src={src}
                                alt={`Gallery item ${i + 1}`}
                                className="h-full w-full object-cover grayscale-[20%] transition-all duration-500 ease-out group-hover:scale-105 group-hover:grayscale-0"
                                loading="lazy"
                            />

                            <div className="absolute inset-0 flex items-center justify-center bg-[#4A0A0A]/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                {/* View Photo pill uses standard brand color */}
                                <span
                                    className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-wide translate-y-2 transition-all duration-300 group-hover:translate-y-0"
                                    style={{ backgroundColor: BRAND_COLOR, color: DARK }}
                                >
                                    View Photo
                                </span>
                            </div>
                        </div>
                    </Reveal>
                ))}
            </div>

            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-[#4A0A0A]/90 p-4 backdrop-blur-md md:p-8"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.3, ease }}
                            className="relative flex max-h-[90vh] w-full max-w-5xl items-center justify-center"
                        >
                            <button
                                className="absolute right-0 top-0 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#4A0A0A] shadow-lg transition-colors hover:bg-[#D9FF00] hover:text-[#4A0A0A] md:-right-4 md:-top-4"
                                onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
                                aria-label="Close enlarged image"
                            >
                                <X className="h-5 w-5" strokeWidth={2.5} />
                            </button>

                            <img
                                src={selectedImage}
                                alt="Culinary view enlarged"
                                className="max-h-[85vh] w-full max-w-full rounded-2xl object-contain shadow-2xl"
                                onClick={(e) => e.stopPropagation()}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}