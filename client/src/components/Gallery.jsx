import React, { useState } from "react";
import { X } from "lucide-react";

const Gallery = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const images = [
        "https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1500595046743-cd271d694d30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1516054575922-f0b8eeadec1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1560493676-04071c5f467b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    ];

    return (
        <section className="py-24 bg-[#fafafa]">
            <div className="max-w-7xl mx-auto px-5">a

                {/* IMAGES GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                    {images.map((src, index) => (
                        <div
                            key={index}
                            className="group relative aspect-square overflow-hidden rounded-[2rem] bg-stone-100 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
                            onClick={() => setSelectedImage(src)}
                        >
                            {/* Image Zoom Hover Effect */}
                            <img
                                src={src}
                                alt={`Gallery item ${index + 1}`}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                loading="lazy"
                            />

                            {/* Semi-transparent hover overlay */}
                            <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <span className="bg-white/95 backdrop-blur-sm text-stone-900 text-xs font-bold px-4 py-2 rounded-xl shadow-md transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                    View Photo
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* LIGHTBOX MODAL */}
            {selectedImage && (
                <div className="fixed inset-0 bg-stone-950/90 backdrop-blur-md flex items-center justify-center z-50 p-4">
                    <div className="relative max-w-4xl w-full max-h-[85vh] overflow-hidden rounded-2xl flex items-center justify-center">
                        <button
                            className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-stone-900 rounded-full p-2.5 hover:bg-white shadow-lg transition-colors z-10"
                            onClick={() => setSelectedImage(null)}
                            aria-label="Close enlarged image"
                        >
                            <X className="h-5 w-5" />
                        </button>

                        <img
                            src={selectedImage}
                            alt="Culinary view enlarged"
                            className="w-auto h-auto max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
                        />
                    </div>
                </div>
            )}
        </section>
    );
};

export default Gallery;