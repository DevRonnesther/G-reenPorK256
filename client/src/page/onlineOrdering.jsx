import { Link } from "react-router-dom";
import React, { useState } from "react";
import { BikeIcon, Heart, ShoppingCart, Star, Plus, Minus, Check, Clock, Sparkles, TrendingUp } from "lucide-react";
import Meat from "../assets/pexels-n-voitkevich-8939267.jpg";
import Pizza from "../assets/Pizza.png";
import FreshPork from "../assets/freskpork.png";

import {
  Leaf,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Phone,
  Mail,
  MapPin,
  Eye,
  Coffee,
} from "lucide-react";

const CateringService = () => {
  const services = [
    {
      id: 1,
      name: "Corporate Events",
      description: "Professional catering for meetings and conferences",
      image:
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 2,
      name: "Weddings",
      description: "Elegant menus tailored to your special day",
      image:
        "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 3,
      name: "Private Parties",
      description: "Custom solutions for intimate gatherings",
      image:
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 4,
      name: "Food Delivery",
      description: "Gourmet meals delivered to your office or home",
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
  ];

  const galleryImages = [
    "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1556911220-ef412ae179a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1490818387583-1baba5e638af?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  ];

  const year = new Date().getFullYear();

  return (
    <div className="font-sans bg-gray-200">
      {/* Header */}
      <header className="relative text-white overflow-hidden">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#0ebd0e] via-[#0ca90c] to-[#0a8f0a]">
          <div className="absolute hidden inset-0 bg-black/20"></div>

          {/* Background Image */}
          <div className="absolute hidden// inset-0 opacity-30">
            <img src={Meat} className="w-full h-full object-cover" alt="" />
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 hidden w-96 h-96 bg-[#0ebd0e]/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 hidden left-0 w-96 h-96 bg-[#0ebd0e]/10 rounded-full blur-3xl"></div>

          <div className="relative hidden// container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-4xl mx-auto text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full mb-6 border border-white/20">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-300 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-400"></span>
                </span>
                <span className="text-white text-sm font-medium flex items-center gap-2">
                  Book Now . Get Discount %
                  <BikeIcon className="w-4 hidden h-4" />
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                <span className="block text-orange-300 mb-2">Exceptional Catering Experiences</span>

              </h1>

              {/* Subheading */}
              <p className="text-base md:text-2xl text-white/90 max-w-2xl mx-auto mb-8 leading-relaxed">
                Savory Events crafted with passion and served with perfection for your special occasions
              </p>

              {/* Features */}
              <div className="flex// hidden flex-wrap justify-center gap-4 md:gap-6">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-[#0edb0e]">
                  <Sparkles className="w-4 h-4 text-[#0edb0e]" />
                  <span className="text-[#0edb0e] text-sm font-medium">Premium Quality</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-[#0edb0e]">
                  <Clock className="w-4 h-4 text-[#0edb0e]" />
                  <span className="text-[#0edb0e] text-sm font-medium">Quick Delivery</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-[#0edb0e]">
                  <TrendingUp className="w-4 h-4 text-[#0edb0e]" />
                  <span className="text-[#0edb0e] text-sm font-medium">Best Prices</span>
                </div>
              </div>
            </div>
          </div>

          {/* Wave Divider */}
          <div className="absolute hidden// bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" className="w-full h-12 md:h-20">
              <path fill="#ffffff" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
            </svg>
          </div>

          {/* ring */}
          <div className="absolute top-0">
            <div className="relative w-[300px] h-[300px] place-items-center// overflow-hidden ">
              <div className="h-90 w-90 bg-orange-500// absolute -left-30 -top-40 bg-transparent  rounded-full border-50 border-white/30"></div>
            </div>
          </div>

          <div className="absolute bottom-0">
            <div className="relative w-[300px] h-[300px] place-items-center// overflow-hidden ">
              <div className="h-90 w-90 bg-orange-500// absolute right-0 top-40 bg-transparent  rounded-full border-50 border-white/30"></div>
            </div>
          </div>
        </div>


      </header>

      {/* Services */}
      <section id="services" className="py-20 bg-white relative">
        <div className="container mx-auto px-6 text-center mb-16">
          <Coffee className="text-[#0edb0e] mb-4 h-10 w-10 mx-auto" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Our Services
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Premium catering solutions for all your special events and occasions
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden transform hover:-translate-y-2"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover transition duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {service.name}
                  </h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 text-center mb-16">
          <Eye className="text-[#0edb0e] mb-4 h-10 w-10 mx-auto" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Our Creations
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our culinary masterpieces from recent events
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {galleryImages.map((img, index) => (
              <div
                key={index}
                className="relative group overflow-hidden rounded-xl"
              >
                <img
                  src={img}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-64 object-cover transform transition duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-900 to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-end p-6">
                  <h3 className="text-white text-xl font-bold">Event Showcase</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 bg-green-50">
        <div className="container mx-auto px-6 max-w-5xl bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 bg-gray-950 text-white p-10">
              <h2 className="text-3xl font-bold mb-6">Contact Information</h2>

              <div className="space-y-6 mb-10">
                <div className="flex items-start">
                  <MapPin className="text-[#0edb0e] mt-1 mr-4" />
                  <div>
                    <h3 className="font-bold">Our Location</h3>
                    <p>123 Culinary Avenue, Foodie District</p>
                    <p>New York, NY 10001</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="text-[#0edb0e] mt-1 mr-4" />
                  <div>
                    <h3 className="font-bold">Phone</h3>
                    <p>(555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="text-[#0edb0e] mt-1 mr-4" />
                  <div>
                    <h3 className="font-bold">Email</h3>
                    <p>info@greenporkiesavoryevents.com</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-bold mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a className="bg-[#0edb0e]/20 hover:bg-[#0edb0e] w-10 h-10 rounded-full flex items-center justify-center">
                    <Facebook className="w-5 h-5 text-white" />
                  </a>
                  <a className="bg-[#0edb0e]/20 hover:bg-[#0edb0e] w-10 h-10 rounded-full flex items-center justify-center">
                    <Twitter className="w-5 h-5 text-white" />
                  </a>
                  <a className="bg-[#0edb0e]/20 hover:bg-[#0edb0e] w-10 h-10 rounded-full flex items-center justify-center">
                    <Instagram className="w-5 h-5 text-white" />
                  </a>
                  <a className="bg-[#0edb0e]/20 hover:bg-[#0edb0e] w-10 h-10 rounded-full flex items-center justify-center">
                    <Linkedin className="w-5 h-5 text-white" />
                  </a>
                </div>
              </div>
            </div>

            <div className="md:w-1/2 p-10">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Get In Touch</h2>
              <p className="text-gray-600 mb-8">
                Ready to plan your event? Contact us for a custom quote and menu consultation
              </p>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="p-4 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="p-4 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="p-4 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <select className="p-4 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500">
                    <option>Event Type</option>
                    <option>Wedding</option>
                    <option>Corporate</option>
                    <option>Private Party</option>
                    <option>Other</option>
                  </select>
                </div>

                <textarea
                  placeholder="Tell us about your event..."
                  rows="4"
                  className="w-full p-4 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                ></textarea>

                <button
                  type="submit"
                  className="w-full bg-[#0edb0e] hover:bg-black text-white font-bold py-4 px-8 rounded-lg transition duration-300"
                >
                  Request Quote
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-0 hidden w-full bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm">&copy; {year} Greenpork - All Rights Reserved</p>
          <div className="flex items-center gap-6">
            <Link to="/returnPolicy">
              <button className="text-[#0edb0e] hover:text-green-700 font-medium transition-colors">
                Return Policy
              </button>
            </Link>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
              Available for orders
            </div>
          </div>
        </div>
        <div className="h-1 bg-gradient-to-r from-[#0edb0e] via-green-500 to-emerald-400"></div>
      </footer>
    </div>
  );
};

export default CateringService;
