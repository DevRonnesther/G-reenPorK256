import React from "react";
import {
  Phone,
  Clock3,
  MapPin,
  Users,
  Award,
  Leaf,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

import { Link } from "react-router-dom";
import { Testimonials } from "../components/Testimonials";
import { Staff } from "./Staff";
import { Gallery } from "../components/Gallery";

import BannerBg from "../assets/pngwing.com (21).png";
import Bike from "../assets/DeliveryBike.png";

const About = () => {
  const year = new Date().getFullYear();

  return (
    <div className="w-full bg-[#FAFAFA] overflow-hidden">

      {/* PREMIUM BACKGROUND */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-red-100 blur-[140px]" />

        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-orange-100 blur-[140px]" />
      </div>

      {/* HERO SECTION */}
      <section className="relative py-24 px-6 md:px-12 lg:px-20">

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

          {/* IMAGE */}
          <div className="relative flex justify-center">

            {/* GLOW */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-200 to-orange-100 blur-3xl rounded-full scale-90 opacity-70" />

            {/* IMAGE CARD */}
            <div className="relative bg-white border border-gray-200 rounded-[40px] p-6 shadow-2xl">

              <img
                src={BannerBg}
                alt="GreenPork"
                className="w-full max-w-xl object-contain rounded-[30px]"
              />

              {/* FLOATING BADGE */}
              <div className="absolute -bottom-6 -right-6 bg-red-600 text-white px-6 py-4 rounded-3xl shadow-2xl">

                <p className="text-xs uppercase tracking-[3px] opacity-80">
                  Premium
                </p>

                <h4 className="font-black text-lg">
                  Quality Pork 🍖
                </h4>
              </div>
            </div>
          </div>

          {/* CONTENT */}
          <div>

            <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-5 py-2 rounded-full text-sm font-bold mb-6">
              🔥 About GreenPork
            </div>

            <h1 className="text-5xl md:text-6xl font-black leading-tight text-gray-900">

              Crafted With Passion,
              <span className="text-red-600 block">
                Served With Excellence
              </span>
            </h1>

            <div className="w-28 h-1.5 bg-gradient-to-r from-red-600 to-orange-400 rounded-full mt-8 mb-8" />

            <p className="text-gray-600 leading-relaxed text-lg mb-6">
              GreenPork delivers premium pork meals crafted with
              freshness, bold flavor, and modern culinary creativity.
              Every meal is prepared using carefully selected ingredients
              to create unforgettable dining experiences.
            </p>

            <p className="text-gray-500 leading-relaxed mb-10">
              What started as a passion for quality food has become a
              destination where families and food lovers enjoy rich
              flavors, fast delivery, and premium service every day.
            </p>

            {/* FEATURES */}
            <div className="grid sm:grid-cols-2 gap-5">

              <div className="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">

                <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center mb-4">
                  <Leaf className="text-red-600 w-7 h-7" />
                </div>

                <h3 className="font-black text-xl mb-2">
                  Fresh Ingredients
                </h3>

                <p className="text-gray-500 text-sm leading-relaxed">
                  Carefully selected premium meat and ingredients
                  sourced fresh daily.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">

                <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center mb-4">
                  <Award className="text-orange-500 w-7 h-7" />
                </div>

                <h3 className="font-black text-xl mb-2">
                  Premium Quality
                </h3>

                <p className="text-gray-500 text-sm leading-relaxed">
                  Exceptional preparation standards with bold
                  unforgettable flavor.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="py-20 px-6">

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-16">

            <p className="text-red-600 font-bold tracking-[3px] uppercase text-sm">
              Our Values
            </p>

            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-4">
              Why Customers Love Us
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-7">

            {[
              {
                icon: <Leaf className="w-8 h-8" />,
                title: "Fresh Ingredients",
                text: "Only premium farm-fresh ingredients prepared daily.",
                bg: "bg-red-100",
                color: "text-red-600",
              },
              {
                icon: <ShieldCheck className="w-8 h-8" />,
                title: "Trusted Quality",
                text: "Prepared with hygiene, care and consistent quality.",
                bg: "bg-orange-100",
                color: "text-orange-500",
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Community",
                text: "Creating memorable dining moments for families.",
                bg: "bg-yellow-100",
                color: "text-yellow-500",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-[32px] p-8 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >

                <div
                  className={`w-16 h-16 rounded-2xl ${item.bg} flex items-center justify-center mb-6 ${item.color}`}
                >
                  {item.icon}
                </div>

                <h3 className="text-2xl font-black text-gray-900 mb-4">
                  {item.title}
                </h3>

                <p className="text-gray-500 leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="py-20">

        <div className="text-center mb-14">

          <p className="text-red-600 font-bold tracking-[3px] uppercase text-sm">
            Experts
          </p>

          <h2 className="text-4xl font-black text-gray-900 mt-3">
            Meet Our Team
          </h2>
        </div>

        <Staff />
      </section>

      {/* TESTIMONIALS */}
      <section className="py-10">
        <Testimonials />
      </section>

      {/* GALLERY */}
      <section className="py-10">
        <Gallery />
      </section>

      {/* DELIVERY SECTION */}
      <section className="py-24 px-6">

        <div className="max-w-7xl mx-auto">

          <div className="bg-white border border-gray-200 rounded-[50px] overflow-hidden shadow-2xl">

            <div className="grid lg:grid-cols-2 items-center">

              {/* LEFT */}
              <div className="relative bg-gradient-to-br from-red-600 to-red-700 min-h-[500px] flex items-center justify-center overflow-hidden">

                <div className="absolute w-[500px] h-[500px] border-[40px] border-white/10 rounded-full" />

                <img
                  src={Bike}
                  alt="Delivery Bike"
                  className="relative z-10 w-full max-w-xl object-contain"
                />
              </div>

              {/* RIGHT */}
              <div className="p-10 md:p-16">

                <p className="text-red-600 font-bold tracking-[3px] uppercase text-sm mb-4">
                  Fast Delivery
                </p>

                <h2 className="text-5xl font-black text-gray-900 leading-tight mb-6">

                  Fresh Food Delivered
                  <span className="text-red-600 block">
                    In 30 Minutes
                  </span>
                </h2>

                <p className="text-gray-500 leading-relaxed text-lg mb-10">
                  We guarantee fast and reliable delivery so your meals
                  arrive hot, fresh, and ready to enjoy anytime.
                </p>

                <a
                  href="#"
                  className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-8 py-5 rounded-2xl font-black text-lg transition-all shadow-xl hover:scale-[1.02]"
                >
                  Order Now
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="py-24 px-6">

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-16">

            <p className="text-red-600 font-bold tracking-[3px] uppercase text-sm">
              Contact Us
            </p>

            <h2 className="text-5xl font-black text-gray-900 mt-4">
              Get In Touch
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">

            {/* CONTACT CARDS */}
            <div className="space-y-6">

              {[
                {
                  icon: <MapPin className="w-7 h-7" />,
                  title: "Location",
                  desc: "123 Pork Avenue, Gulu City",
                  bg: "bg-red-100",
                  color: "text-red-600",
                },
                {
                  icon: <Phone className="w-7 h-7" />,
                  title: "Phone Number",
                  desc: "+(256) 776-464-823",
                  bg: "bg-green-100",
                  color: "text-green-600",
                },
                {
                  icon: <Clock3 className="w-7 h-7" />,
                  title: "Opening Hours",
                  desc: "Monday - Sunday • 10 AM - 10 PM",
                  bg: "bg-yellow-100",
                  color: "text-yellow-500",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white border border-gray-200 rounded-[32px] p-7 flex items-start gap-5 shadow-sm hover:shadow-xl transition-all duration-300"
                >

                  <div
                    className={`w-16 h-16 rounded-2xl ${item.bg} flex items-center justify-center ${item.color}`}
                  >
                    {item.icon}
                  </div>

                  <div>
                    <h3 className="text-2xl font-black text-gray-900 mb-2">
                      {item.title}
                    </h3>

                    <p className="text-gray-500 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* MAP */}
            <div className="rounded-[40px] overflow-hidden border border-gray-200 shadow-2xl bg-white">

              <iframe
                src="https://www.google.com/maps/embed?pb="
                className="w-full h-[500px]"
                loading="lazy"
                title="Map"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-200 py-8">

        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-5">

          <p className="text-gray-500 text-sm">
            © {year} GreenPork. All rights reserved.
          </p>

          <Link
            to="/returnPolicy"
            className="text-red-600 font-bold hover:text-red-700 transition-all"
          >
            Return Policy
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default About;