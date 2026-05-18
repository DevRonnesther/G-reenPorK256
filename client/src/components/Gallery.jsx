import React, { useState } from 'react'
import { Image, X } from 'lucide-react'

export function Gallery() {
    const [selectedImage, setSelectedImage] = useState(null)
    const images = [
        'https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1500595046743-cd271d694d30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1516054575922-f0b8eeadec1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1560493676-04071c5f467b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    ]
    return (
        <div className="py-12 bg-gradient-to-r from-green-50 to-gray-50">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center mb-12">
                    {/* <Image className="h-10 w-10 text-[#0edb0e] mb-4" /> */}
                    <h2 className="text-3xl font-bold text-black text-center">
                        Our Gallery
                    </h2>
                    {/* <div className="w-20 h-1 bg-[#0edb0e] mt-4"></div> */}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {images.map((src, index) => (
                        <div
                            key={index}
                            className="aspect-square overflow-hidden rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                            onClick={() => setSelectedImage(src)}
                        >
                            <img
                                src={src}
                                alt={`Gallery image ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>
            {selectedImage && (
                <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
                    <div className="relative max-w-4xl w-full">
                        <button
                            className="absolute top-2 right-2 bg-white rounded-full p-2 hover:bg-gray-200"
                            onClick={() => setSelectedImage(null)}
                        >
                            <X className="h-6 w-6" />
                        </button>
                        <img
                            src={selectedImage}
                            alt="Enlarged view"
                            className="w-full h-auto rounded-lg"
                        />
                    </div>
                </div>
            )}
        </div>
    )
}
