import React, { useState } from "react";
import { X } from "lucide-react";

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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {images.map((src, index) => (
                    <div
                        key={index}
                        className="group relative aspect-square overflow-hidden cursor-pointer bg-slate-100"
                        onClick={() => setSelectedImage(src)}
                    >
                        <img
                            src={src}
                            alt={`Gallery item ${index + 1}`}
                            className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ease-out"
                            loading="lazy"
                        />

                        {/* Brutalist Hover Overlay */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <span className="bg-[#D4FF00] text-black text-xs font-display font-black uppercase tracking-widest px-4 py-2 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                View Photo
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* LIGHTBOX MODAL */}
            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black flex items-center justify-center z-50 p-4 md:p-8"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="relative max-w-5xl w-full max-h-[90vh] flex items-center justify-center">
                        <button
                            className="absolute top-0 right-0 md:-top-4 md:-right-4 bg-white text-black p-2 hover:bg-[#D4FF00] transition-colors z-10 border-2 border-black"
                            onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
                            aria-label="Close enlarged image"
                        >
                            <X className="h-5 w-5" strokeWidth={2.5} />
                        </button>

                        <img
                            src={selectedImage}
                            alt="Culinary view enlarged"
                            className="w-full h-full max-w-full max-h-[85vh] object-contain"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default Gallery;