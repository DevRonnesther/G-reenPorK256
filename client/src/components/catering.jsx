import React from 'react';

// Service data
const services = [
    {
        icon: <span>🍖</span>,
        title: "Whole Hog Roasts",
        description: "Traditional slow-roasted whole hog with crispy skin and tender meat, cooked on-site for maximum freshness."
    },
    {
        icon: <span>🎉</span>,
        title: "Event Catering",
        description: "Complete event catering solution including setup, serving, and cleanup for weddings, corporate events, and parties."
    },
    {
        icon: <span>🍽️</span>,
        title: "Side Dishes",
        description: "Complimentary side dishes including roasted vegetables, fresh salads, breads, and signature sauces."
    },
    {
        icon: <span>👨‍🍳</span>,
        title: "On-Site Cooking",
        description: "Our chefs will cook and carve the pork fresh at your venue, providing an authentic culinary experience."
    },
    {
        icon: <span>📋</span>,
        title: "Custom Menus",
        description: "Tailored menus to accommodate dietary restrictions and preferences for your special event."
    },
    {
        icon: <span>🚚</span>,
        title: "Delivery Options",
        description: "Off-premise catering with insulated delivery to maintain perfect serving temperature."
    }
];

// Menu items data
const menuItems = [
    {
        name: "Signature Roast Pork",
        description: "12-hour slow-roasted pork shoulder with our secret spice rub"
    },
    {
        name: "Crispy Pork Belly",
        description: "Double-cooked pork belly with crackling and apple compote"
    },
    {
        name: "Pulled Pork Sliders",
        description: "Tender pulled pork on mini brioche buns with coleslaw"
    },
    {
        name: "Heritage Breed Whole Hog",
        description: "Premium heritage breed pig roasted with aromatic herbs"
    }
];

// Testimonials data
const testimonials = [
    {
        quote: "The pork roast was the star of our wedding! Guests are still talking about it months later. The crispy skin and tender meat were perfection.",
        name: "Sarah & Michael",
        event: "Wedding Reception"
    },
    {
        quote: "Our corporate event catering was flawless. Professional service and the best roast pork we've ever had. Will definitely book again!",
        name: "James Thompson",
        event: "Company Annual Dinner"
    }
];

const Catering = () => {
    return (
        <div className="min-h-screen bg-green-50">
            {/* Hero Section */}
            <div className="relative bg-[#0edb0e]  max-h-64 text-white">
                <div className="container mx-auto px-4 py-24 md:py-32 flex flex-col items-center">
                    <h1 className="text-4xl md:text-6xl text-black font-bold mb-4 text-center">
                        Premium Pork Roasting Catering
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 text-center max-w-3xl">
                        Authentic slow-roasted pork for weddings, corporate events, and special occasions
                    </p>
                    <button className="bg-black hover:bg-amber-600/ text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300">
                        Book Now
                    </button>
                </div>
            </div>

            {/* Services Section */}
            <div className="container mx-auto px-4 py-16">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-4">
                        Our Catering Services
                    </h2>
                    <div className="w-24 h-1 bg-amber-500 mx-auto"></div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
                            <div className="p-6">
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                    {service.icon}
                                </div>
                                <h3 className="text-xl font-bold text-[#0edb0e] mb-2">{service.title}</h3>
                                <p className="text-gray-600">{service.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Menu Highlights */}
            <div className="bg-green-100 py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-4">
                            Menu Highlights
                        </h2>
                        <div className="w-24 h-1 bg-amber-500 mx-auto"></div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {menuItems.map((item, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48" />
                                <div className="p-4">
                                    <h3 className="text-lg font-bold text-[#0edb0e]">{item.name}</h3>
                                    <p className="text-gray-600 text-sm mt-2">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Testimonials */}
            <div className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            What Our Clients Say
                        </h2>
                        <div className="w-24 h-1 bg-amber-500 mx-auto"></div>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="mb-12">
                                <div className="text-[#0edb0e] text-5xl mb-4">"</div>
                                <p className="text-gray-700 text-lg italic mb-4">
                                    {testimonial.quote}
                                </p>
                                <div className="flex items-center">
                                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                                    <div className="ml-4">
                                        <h4 className="font-bold text-[#0edb0e]">{testimonial.name}</h4>
                                        <p className="text-gray-600">{testimonial.event}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-gray-900 to-black py-16 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Ready to Book Your Event?
                    </h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto">
                        Contact us today for a personalized quote and let us bring our premium pork roasting experience to your special occasion.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button className="bg-[#0edb0e] hover:bg-green-500  text-white font-bold py-3 px-8 rounded-full transition duration-300">
                            Request a Quote
                        </button>
                        <button className="bg-transparent hover:bg-amber-800 text-white font-bold py-3 px-8 rounded-full border-2 border-white transition duration-300">
                            Call Now: (123) 456-7890
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Catering;