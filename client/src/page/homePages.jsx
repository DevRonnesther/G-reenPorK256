// HOME HERO
import React, { useState } from "react";
import { Link } from "react-router-dom";

// IMAGES
import LeafImg from "../assets/pngwing.com (3).png";
import Pepper from "../assets/banana.png";
import Tomato from "../assets/tomato.png";
import Apple from "../assets/apple.png";
import Porkies from "../assets/PikPng.com_png-restaurant_5027947.png";

// PAGES
import Service from "./service";
import About from "./Abouts";

// LUCIDE ICONS
import {
    Facebook,
    Instagram,
    ShieldCheck,
    Truck,
    MessageCircle,
    Music2,
    Leaf,
    Star,
    ShoppingCart,
    Store,
    BadgePercent,
    AlarmClock
} from "lucide-react";

const hero = () => {
    const [current, setCurrent] = useState(0);

    const slides = [
        {
            title: "Roasted Skewed Pork",
            image:
                "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=800",
            price: "UGX 6,000",
            oldPrice: "UGX 8,000",
            rating: 4.4,
            description:
                "Succulent roasted pork served with golden fried cassava, fresh garden salad, warm chapati, and sweet banana slices.",
        },
        {
            title: "Classic Beef Burger",
            image:
                "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800",
            price: "UGX 10,000",
            oldPrice: "UGX 12,000",
            rating: 4.7,
            description:
                "Juicy grilled beef patty layered with fresh lettuce, cheese, tomatoes and creamy sauce.",
        },
        {
            title: "Fresh Organic Pork",
            image:
                "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800",
            price: "UGX 15,000",
            oldPrice: "UGX 18,000",
            rating: 4.5,
            description:
                "Premium farm fresh pork cuts, hygienically prepared and ready for your favorite recipes.",
        },
    ];
    const year = new Date().getFullYear();

    return (
        <div>
            <div className="relative hidden md:flex flex-col items-center h-[85vh]">

                <div className="absolute hidden inset-0 bg-[radial-gradient(circle_at_bottom,#77dd77_0%,#0ca50c_30%,#068506_60%,#096a09_100%)]"></div>
                <div className="absolute hidden inset-0 backdrop-blur-lg blur-2xl"></div>

                <div
                    data-aos="fade-up"
                    className="w-full absolute inset-0 z-10 place-items-center"
                >

                    {/* Desktop Content */}
                    <div className="place-items-center justify-between items-center gap-8 p-8 flex">

                        {/* Social Icons */}
                        <div className="inline-block relative bg-white/70 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 py-3 p-2 text-white space-y-4">
                            <Facebook className="w-8 h-8 text-[#0606b6]" />
                            <Music2 className="w-8 h-8 text-black" />
                            <Instagram className="w-8 h-8 text-[#db410e]" />
                        </div>

                        {/* Text Section */}
                        <div className="max-w-[400px] rounded-[60%_40%_30%_70%/60%_30%_70%_40%] place-items-center">

                            <div>
                                <h3 className="text-6xl italic font-black capitalize">
                                    We deliver{" "}
                                    <span className="text-[#0edb0e]">
                                        delicious & healthy
                                    </span>
                                    pork
                                </h3>

                                {/* FEATURES */}
                                <div className="flex mt-8 flex-wrap gap-6 text-sm text-gray-600">
                                    <div className="flex items-center gap-2">
                                        <Truck className="w-4 h-4 text-green-600" />
                                        Fast 30min Delivery
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <ShieldCheck className="w-4 h-4 text-green-600" />
                                        Quality Guaranteed
                                    </div>
                                </div>

                                <p className="text-white flex gap-2 items-center text-xs font-medium">
                                    <Leaf className="text-xl" />
                                    100 % Organic Fresh ingredients, unforgettable flavors
                                </p>
                            </div>

                            {/* Price Card */}
                            <div className="relative mt-4">
                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-500 rounded-2xl blur-xl opacity-30"></div>

                                <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 overflow-hidden">
                                    <div className="flex items-center gap-2 justify-between p-2">

                                        <div className="flex items-center gap-6 pl-4">
                                            <div className="flex flex-col">
                                                <div className="flex items-baseline gap-2">
                                                    <span className="text-sm font-black bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                                                        UGX 6,000
                                                    </span>
                                                    <span className="text-sm text-gray-400 line-through font-medium">
                                                        UGX 8,000
                                                    </span>
                                                </div>

                                                <div className="flex items-center gap-2 mt-1">
                                                    <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold px-2.5 py-0.5 rounded-full shadow-md">
                                                        -20%
                                                    </div>
                                                    <span className="text-xs text-emerald-600 font-semibold">
                                                        Limited Time
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <button className="group relative bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 text-white font-bold px-4 py-3 rounded-xl flex items-center gap-3 transition-all duration-300 shadow-lg hover:scale-105">
                                            <ShoppingCart className="w-5 h-5" />
                                            <span className="text-base">Order Now</span>
                                        </button>

                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Image Section */}
                        <div className="flex">

                            <div>
                                <img
                                    src={Tomato}
                                    className="w-[250px] hidden absolute -bottom-12 left-0"
                                    alt=""
                                    loading="lazy"
                                />

                                <img
                                    src={Pepper}
                                    className="w-[100px] hidden absolute bottom-0 right-0"
                                    alt=""
                                    loading="lazy"
                                />

                                <div className="h-24 w-24 absolute top-7">
                                    <Link
                                        to="/menu"
                                        className="bg-white rounded-[60%_40%_30%_70%/60%_30%_70%_40%] shadow-2xl w-28 h-28 flex items-center justify-center hover:scale-110 transition-all duration-300 group"
                                    >
                                        <div className="text-center">
                                            <div className="flex gap-2">
                                                <h3 className="text-2xl font-bold text-red-600 group-hover:text-green-600">
                                                    <BadgePercent className="w-10 h-10 text-[#0edb0e]" />
                                                    <span className="block text-xs font-bold text-[#0edb0e] group-hover:text-green-600">
                                                        OFF Today
                                                    </span>
                                                    🎉20%
                                                </h3>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>

                            <div className="max-w-lg">
                                <img
                                    data-aos="fade-up"
                                    src={Porkies}
                                    className="relative w-full mt-14"
                                    alt=""
                                    loading="lazy"
                                />
                            </div>

                            <div data-aos="fade-left">
                                <img
                                    src={Apple}
                                    className="absolute -bottom-10"
                                    alt=""
                                    loading="lazy"
                                />
                                <img
                                    src={LeafImg}
                                    className="w-[450px] rounded-3xl"
                                    alt=""
                                    loading="lazy"
                                />
                            </div>

                        </div>
                    </div>

                    {/* Service */}
                    <div className="absolute bottom-0 rounded-t-3xl">
                        <Service />
                    </div>

                </div>
            </div>

            {/* MOBILE SECTION */}
            <div className="relative md:hidden min-h-[90vh] overflow-hidden flex items-center justify-center bg-white">
                <div className="relative z-10 w-full max-w-md flex flex-col items-center">

                    {/* IMAGE */}
                    <img
                        src={slides[current].image}
                        alt={slides[current].title}
                        loading="lazy"
                        className="object-contain absolute top-10 drop-shadow-2xl transition-all duration-500"
                    />

                    {/* SLIDER DOTS */}
                    <div className="absolute bottom-28 flex gap-3 z-20">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrent(index)}
                                className={`w-3 h-3 rounded-full transition-all ${current === index
                                    ? "bg-green-600 scale-110"
                                    : "bg-gray-300"
                                    }`}
                            />
                        ))}
                    </div>

                    {/* CONTENT CARD */}
                    <div className="p-4 mt-72 flex-col justify-center items-center h-[70vh] w-full shadow-md">

                        <h1 className="text-2xl font-bold text-black">
                            {slides[current].title}
                        </h1>

                        {/* FEATURES */}
                        <div className="flex mt-2 flex-wrap gap-6 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                                <Truck className="w-4 h-4 text-green-600" />
                                Fast 30min Delivery
                            </div>
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4 text-green-600" />
                                Quality Guaranteed
                            </div>
                        </div>

                        {/* RATING */}
                        <div className="flex items-center gap-1.5 mt-3">
                            {[...Array(4)].map((_, i) => (
                                <Star
                                    key={i}
                                    className="w-6 h-6 fill-yellow-400 text-yellow-400"
                                />
                            ))}
                            <span className="ml-2 bg-gray-100 p-2 rounded-2xl font-semibold text-gray-500">
                                {slides[current].rating}
                            </span>
                        </div>

                        {/* DESCRIPTION */}
                        <p className="text-black text-base mt-3">
                            {slides[current].description}
                        </p>

                        <p className="font-semibold text-gray-600 text-base mt-3">
                            Ingredient
                        </p>

                        <div className="flex items-center gap-2 mt-1">
                            <AlarmClock className="w-4 h-4 text-green-600" />
                            Cooking in 25 Minutes
                        </div>

                        {/* PRICING */}
                        <div className="flex items-center justify-between mt-4">
                            <div>
                                <span className="text-2xl font-black text-green-600">
                                    {slides[current].price}
                                </span>
                                <span className="ml-2 font-bold text-gray-400 line-through">
                                    {slides[current].oldPrice}
                                </span>
                            </div>

                            <span className="bg-orange-500 text-white text-base font-bold px-3 py-1 rounded-full shadow">
                                -20%
                            </span>
                        </div>

                        {/* BUTTON */}
                        <button className="mt-3 w-full flex items-center justify-center gap-3 bg-[#0edb0e] text-white py-3 rounded-2xl font-bold text-lg transition-all hover:scale-105 shadow-xl">
                            <ShoppingCart className="w-6 h-6" />
                            Add to Cart
                        </button>

                        {/* SOCIAL ICONS */}
                        <div className="mt-4 flex justify-center">
                            <div className="flex w-40 bg-white/30 shadow-2xl backdrop-blur-2xl border border-gray-200 rounded-3xl gap-4 p-2 justify-center">
                                <Facebook className="w-6 h-6 text-gray-400" />
                                <Music2 className="w-6 h-6 text-gray-400" />
                                <Instagram className="w-6 h-6 text-gray-400" />
                                <MessageCircle className="w-6 h-6 text-gray-400" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default hero;

// PREMIUM HERO LANDING PAGE import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// IMAGES
import FreshPork from "../assets/freshporke.png";
import PorkStake from "../assets/pngwing.com (21).png";
import Burger from "../assets/Burger.png";
import Pizza from "../assets/pngwing.com (13).png";

// ICONS
import {
    ShieldCheck,
    Truck,
    Star,
    ShoppingCart,
    ArrowRight,
    ArrowLeft,
    Twitter,
    Facebook,
    StarHalf,
} from "lucide-react";
import Navbar from "../components/Navbar/Navbar";
import { FaTiktok } from "react-icons/fa6";

const hero = () => {
    const [current, setCurrent] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // 🔥 BRAND COLORS
    const COLORS = {
        primary: "#F97316",   // Orange
        secondary: "#DC2626", // Red
        accent: "#FACC15",    // Yellow
        success: "#0edb0e",   // Green
    };

    const slides = [
        {
            title: "Roasted Skewed Pork",
            image: PorkStake,
            price: "UGX 6,000",
            oldPrice: "UGX 8,000",
            rating: 4.4,
            description:
                "Roasted pork with fried cassava, salad, chapati, and bananas.",
        },
        {
            title: "Classic Chicken Pizza",
            image: Pizza,
            price: "UGX 10,000",
            oldPrice: "UGX 12,000",
            rating: 4.7,
            description:
                "Juicy grilled beef patty layered with fresh lettuce, cheese, tomatoes and creamy sauce.",
        },
        {
            title: "Classic Beef Burger",
            image: Burger,
            price: "UGX 10,000",
            oldPrice: "UGX 12,000",
            rating: 4.7,
            description:
                "Juicy grilled beef patty layered with fresh lettuce, cheese, tomatoes and creamy sauce.",
        },
        {
            title: "Fresh Organic Pork",
            image: FreshPork,
            price: "UGX 16,000",
            oldPrice: "UGX 18,000",
            rating: 4.5,
            description:
                "Premium farm fresh pork cuts, hygienically prepared and ready for your favorite recipes.",
        },
    ];

    // AUTO SLIDE
    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [isPaused, slides.length]);

    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrent((prev) =>
            prev === 0 ? slides.length - 1 : prev - 1
        );
    };

    return (
        <div
            className="relative w-full h-[90vh]// h-screen "
            /* style={{
                background: `
      radial-gradient(circle at 50% 40%, rgba(249,115,22,0.25) 0%, rgba(249,115,22,0.12) 20%, transparent 45%),
      radial-gradient(circle at 20% 20%, rgba(22,163,74,0.25) 0%, transparent 40%),
      radial-gradient(circle at 80% 80%, rgba(0,0,0,0.9) 0%, #020617 70%)
    `
            }} */
            style={{
                background: "radial-gradient(circle at center, #FF3B30 0%, #E10600 25%, #8B0000 55%, #2B0000 100%)",
            }}
        >
            {/* nav bar */}
            <div>
                <Navbar />
            </div>
            <div
                className="md:flex md:flex-row absolute top-10 bg-black///  w-full h-screen  flex flex-col items-center justify-center overflow-hidden"

                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >



                {/* ARROWS */}
                <button
                    onClick={prevSlide}
                    className="absolute left-20 top-20 text-black -translate-y-1/2 bg-white/80 hidden// p-3 rounded-full shadow"
                >
                    <ArrowLeft />
                </button>

                <button
                    onClick={nextSlide}
                    className="absolute left-34 top-20 text-black -translate-y-1/2 bg-white/80 hidden// p-3 rounded-full shadow"
                >
                    <ArrowRight />
                </button>
                {/* Social Media */}
                <div
                    onClick={nextSlide}
                    className="absolute flex justify-center items-center gap-4 left-18 space-y-3 bottom-20 text-black -translate-y-1/2 bg-black/80// backdrop-blur-xl// shadow-md// text-white  hidden// p-3 rounded-full shadow//"
                >
                    <Twitter size={25} text-white />
                    <Facebook size={25} text-white />
                    <FaTiktok size={25} text-white />
                </div>
                <div className="w-1/2// absolute top-30 left-100  flex justify-center items-center">
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background: "radial-gradient(circle at 50% 50%, rgba(249,115,22,0.15), transparent 60%)",
                            animation: "pulseGlow 4s ease-in-out infinite"
                        }}
                    />
                    {/* IMAGE */}
                    <img
                        src={slides[current].image}
                        alt={slides[current].title}
                        style={{
                            filter: "drop-shadow(0 20px 40px rgba(249,115,22,0.35))"
                        }}
                        className="h-[300px] md:min-h-[450px]  object-contain drop-shadow-2xl transition-all duration-700 ease-in-out hover:scale-105"
                    />
                </div>

                {/* CONTENT */}
                <div className="mt-6 w-1/2//   text-center flex flex-col  px-4">

                    {/* TITLE */}
                    <h1
                        className="text-2xl md:text-[120px]  uppercase text-white/80 font-extrabold"
                    // style={{ color: COLORS.secondary }}
                    >
                        {slides[current].title}
                    </h1>

                    {/* DESCRIPTION */}
                    <p className="mt-2 absolute top-20 left-80 text-xl leading-relaxed text-black/80 font-medium">
                        {slides[current].description}
                    </p>

                    {/* FEATURES */}
                    <div className="flex justify-center mt-3 gap-6 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                            <Truck style={{ color: COLORS.success }} />
                            Fast Delivery
                        </div>
                        <div className="flex items-center gap-2">
                            <ShieldCheck style={{ color: COLORS.success }} />
                            Quality Guaranteed
                        </div>
                    </div>

                    {/* RATING */}
                    <div className="flex justify-center items-center mt-3">
                        <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                        <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                        <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                        <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                        <StarHalf className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                        <span className="ml-2">
                            {slides[current].rating}
                        </span>
                    </div>

                    {/* PRICE */}
                    <div className="mt-4 absolute right-18 bottom-50 flex justify-center items-center gap-3">

                        <div className="block">
                            <p
                                className="text-4xl font-bold"
                            // style={{ color: COLORS.success }}
                            >
                                {slides[current].price}
                            </p>

                            <p className="line-through text-2xl  text-gray-400">
                                {slides[current].oldPrice}
                            </p>
                        </div>

                        {/* DISCOUNT */}
                        <span
                            className="text-white text-sm font-bold px-2 py-1 rounded-full"
                            style={{ backgroundColor: COLORS.secondary }}
                        >
                            -20% off
                        </span>
                    </div>

                    {/* BUTTON */}
                    <button
                        onClick={() => {
                            const message = `I want to order ${slides[current].title} at ${slides[current].price}`;
                            window.open(
                                `https://wa.me/2567XXXXXXXX?text=${encodeURIComponent(message)}`,
                                "_blank"
                            );
                        }}
                        className="mt-4 absolute bottom-30 right-20 w-full md:w-[220px] md:px-12  text-white py-3 rounded-full flex justify-center items-center gap-2 font-black transition-all hover:scale-105 shadow-xl"
                        style={{ backgroundColor: COLORS.primary }}
                    >
                        <ShoppingCart />
                        BUY NOW
                    </button>

                    {/* DOTS */}
                    <div className="flex justify-center mt-4 gap-2">
                        {slides.map((_, index) => (
                            <div
                                key={index}
                                onClick={() => setCurrent(index)}
                                className="w-6 h-3 rounded-full cursor-pointer"
                                style={{
                                    backgroundColor:
                                        current === index
                                            ? COLORS.primary
                                            : "#D1D5DB",
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>

    );
};

export default hero;
