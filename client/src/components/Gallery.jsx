import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

// ─── Centralized GreenPork Design Tokens ──────────────────────────────────────
const BRAND = {
    red: "#D90404",      // --brand-red
    lime: "#D4FF00",      // --brand-lime
    white: "#FFFFFF",     // --brand-white
    dark: "#2E0101",      // --brand-dark
};

// ─── GSAP-like Stagger Config ─────────────────────────────────────────────────
const ease = [0.22, 1, 0.36, 1];

const containerStagger = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
};

const itemReveal = {
    hidden: { opacity: 0, y: 50, clipPath: "inset(100% 0 0 0)" },
    show: {
        opacity: 1,
        y: 0,
        clipPath: "inset(0% 0 0 0)",
        transition: { duration: 0.8, ease }
    }
};

const imgReveal = {
    hidden: { scale: 1.3 },
    show: {
        scale: 1,
        transition: { duration: 1.2, ease }
    }
};

const Gallery = () => {
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
            {/* IMAGES GRID */}
            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
                variants={containerStagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
            >
                {images.map((src, index) => (
                    <motion.div
                        key={index}
                        variants={itemReveal}
                        className="group relative aspect-square overflow-hidden cursor-pointer bg-[#2E0101]/5"
                        onClick={() => setSelectedImage(src)}
                    >
                        <motion.img
                            variants={imgReveal}
                            src={src}
                            alt={`Gallery item ${index + 1}`}
                            className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ease-out"
                            loading="lazy"
                        />

                        {/* Brutalist Hover Overlay */}
                        <div className="absolute inset-0 bg-[#2E0101]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <span className="bg-[#D4FF00] text-[#2E0101] text-xs font-display font-black uppercase tracking-widest px-4 py-2 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                View Photo
                            </span>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* LIGHTBOX MODAL */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-[#2E0101]/90 backdrop-blur-sm flex items-center justify-center z-50 p-4 md:p-8"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.3, ease }}
                            className="relative max-w-5xl w-full max-h-[90vh] flex items-center justify-center"
                        >
                            <button
                                className="absolute top-0 right-0 md:-top-4 md:-right-4 bg-[#FFFFFF] text-[#2E0101] p-2 hover:bg-[#D4FF00] transition-colors z-10 border-2 border-[#2E0101]"
                                onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
                                aria-label="Close enlarged image"
                            >
                                <X className="h-5 w-5" strokeWidth={2.5} />
                            </button>

                            <img
                                src={selectedImage}
                                alt="Culinary view enlarged"
                                className="w-full h-full max-w-full max-h-[85vh] object-contain shadow-2xl"
                                onClick={(e) => e.stopPropagation()}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Gallery;