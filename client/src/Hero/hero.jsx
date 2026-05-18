import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// IMAGES
import FreshPork from "../assets/pngwing.com (23).png";
import PorkStake from "../assets/pngwing.com (21).png";
// import PorkStake from "../assets/pngwing.com (21).png";
import Burger from "../assets/Burger.png";
import Pizza from "../assets/pizza(17).png";
import Chicken from "../assets/pngwing.com (25).png";

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
    ShoppingBag,
    ShoppingBasket,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import Navbar from "../components/Navbar/Navbar";
import { FaTiktok } from "react-icons/fa6";
import About from "../page/Abouts";

const hero = () => {
    const year = new Date().getFullYear();
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
            dataaos: "fade-up",
            description:
                "Roasted pork with fried cassava, salad, chapati, and bananas.",
        },
        {
            title: "Classic Beef Burger",
            image: Burger,
            price: "UGX 10,000",
            oldPrice: "UGX 12,000",
            rating: 4.7,
            dataaos: "fade-down",
            description:
                "Juicy grilled beef patty layered with fresh lettuce, cheese, tomatoes and creamy sauce.",
        },
        {
            title: "Classic Chicken Pizza",
            image: Pizza,
            price: "UGX 10,000",
            oldPrice: "UGX 12,000",
            rating: 4.7,
            dataaos: "zoom-in",
            description:
                "Juicy grilled beef patty layered with fresh lettuce, cheese, tomatoes and creamy sauce.",
        },
        {
            title: "Fresh Organic Pork",
            image: FreshPork,
            price: "UGX 16,000",
            oldPrice: "UGX 18,000",
            rating: 4.5,
            dataaos: "flip-left",
            description:
                "Premium farm fresh pork cuts, hygienically prepared and ready for your favorite recipes.",
        },
        {
            title: "Crispy Spicy Chicken",
            image: Chicken,
            price: "UGX 55,000",
            oldPrice: "UGX 78,000",
            rating: 4.5,
            dataaos: "flip-left",
            description:
                "Premium farm fresh pork cuts, hygienically prepared and ready for your favorite recipes.",
        },
    ];

    // AUTO SLIDE
    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [isPaused, slides.length]);

    // NEXT SLIDE
    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % slides.length);
    };

    // PREVIOUS SLIDE
    const prevSlide = () => {
        setCurrent((prev) =>
            prev === 0 ? slides.length - 1 : prev - 1
        );
    };

    return (
        <div className="overflow-hidden">
            <div
                className="relative w-full h-screen  overflow-hidden//"
                
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
                    <div className="absolute flex gap-3 right-5 md:right-20 bottom-10 z-50">
                        <button
                            onClick={prevSlide}
                            className="
            bg-white/20
            hover:bg-white/40
            backdrop-blur-md
            text-white
            p-3
            rounded-full
            transition-all
            duration-300
            shadow-lg
        "
                        >
                            <ChevronLeft size={32} />
                        </button>

                        <button
                            onClick={nextSlide}
                            className="
            bg-white/20
            hover:bg-white/40
            backdrop-blur-md
            text-white
            p-3
            rounded-full
            transition-all
            duration-300
            shadow-lg
        "
                        >
                            <ChevronRight size={32} />
                        </button>
                    </div>
                    {/* Social Media */}
                    <div
                        className="absolute block  md:flex sm:flex sm: justify-center items-center gap-4 md:right-18 right-10  space-y-3 bottom-20 text-black -translate-y-1/2 bg-black/80// backdrop-blur-xl// shadow-md// text-white  hidden// p-3 rounded-full shadow//"
                    >
                        <Twitter size={25} text-white />
                        <Facebook size={25} text-white />
                        <FaTiktok size={25} text-white />
                    </div>
                    <div className="w-1/2// absolute top-30 sm:top-10 left-0 right-0 flex justify-center items-center">
                        <div
                            className="absolute inset-0 pointer-events-none"
                        /* style={{
                            background: "radial-gradient(circle at 50% 50%, rgba(249,115,22,0.15), transparent 60%)",
                            animation: "pulseGlow 4s ease-in-out infinite"
                        }} */
                        />
                        {/* IMAGE */}
                        <img
                            data-aos={slides[current].dataaos}
                            src={slides[current].image}
                            alt={slides[current].title}
                            style={{
                                filter: "drop-shadow(0 20px 40px rgba(249,115,22,0.35))"
                            }}
                            className="h-[300px]// sm:h-[300px]  transition-all md:min-h-[450px]  object-contain drop-shadow-3xl transition-all// duration-700 ease-in-out hover:scale-105"
                        />
                    </div>

                    {/* CONTENT */}
                    <div className="mt-6 max-w-300    text-center flex flex-col  px-4">

                        {/* TITLE */}
                        <h1
                            className="text-5xl md:text-[120px] sm:text-[60px]  uppercase text-[white]/80 font-extrabold"
                        // style={{ color: COLORS.secondary }}
                        >
                            {slides[current].title}
                        </h1>

                        {/* DESCRIPTION */}
                        <p className="mt-2 absolute top-20 hidden sm:hidden// md:top-10 md:block// left-80 text-xl leading-relaxed text-black/80 font-medium">
                            {slides[current].description}
                        </p>

                        {/* FEATURES */}
                        <div className="flex// hidden justify-center mt-3 gap-6 text-sm text-gray-600">
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
                        <div className="flex justify-center absolute left-20 bottom-70 items-center mt-3">
                            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                            <span className="ml-2 text-white/80">
                                {slides[current].rating}
                            </span>

                            {/* DISCOUNT */}
                            <span
                                className="text-white text-sm ml-2 font-bold px-2 py-1 rounded-full"
                                style={{ backgroundColor: COLORS.secondary }}
                            >
                                -20% off
                            </span>
                        </div>

                        {/* PRICE */}
                        <div className="mt-4 absolute  left-18 bottom-20 flex flex-col justify-center items-center gap-3">
                            <h1
                                className="capitalize text-yellow-500 sm:hidden md:block font-extrabold"
                            // style={{ color: COLORS.secondary }}
                            >
                                {slides[current].title}
                            </h1>
                            <div className="block">
                                <p
                                    className="text-4xl text-white/80 font-black"
                                // style={{ color: COLORS.success }}
                                >
                                    {slides[current].price}
                                </p>

                                <p className="line-through text-2xl  text-gray-400">
                                    {slides[current].oldPrice}
                                </p>
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
                                className="
        group
        mt-2
        bg-white
        rounded-full
        px-3
        py-2.5
        flex
        items-center
        gap-3
        shadow-2xl
        hover:scale-105
        hover:shadow-red-500/20
        transition-all
        duration-300
        border
        border-white/20
        backdrop-blur-xl
    "
                            >

                                {/* ICON */}
                                <div
                                    style={{ backgroundColor: COLORS.secondary }}
                                    className="
            h-12
            w-12
            rounded-full
            flex
            items-center
            justify-center
            shadow-md
            group-hover:rotate-6
            transition-transform
            duration-300
        "
                                >
                                    <ShoppingBasket
                                        size={22}
                                        className="text-white"
                                    />
                                </div>

                                {/* TEXT */}
                                <div className="flex flex-col items-start leading-tight">

                                    <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold">
                                        Fast Delivery
                                    </span>

                                    <p className="text-[#DC2626] text-lg font-extrabold">
                                        Order Now
                                    </p>
                                </div>

                                {/* ARROW */}
                                <ArrowRight
                                    size={20}
                                    className="
            text-[#DC2626]
            group-hover:translate-x-1
            transition-transform
            duration-300
        "
                                />
                            </button>
                            {/* <button
                                onClick={() => {
                                    const message = `I want to order ${slides[current].title} at ${slides[current].price}`;
                                    window.open(
                                        `https://wa.me/2567XXXXXXXX?text=${encodeURIComponent(message)}`,
                                        "_blank"
                                    );
                                }}
                                className="mt-4// absolute// bottom-34// left-20// bg-white text-[#D1D5DB] w-full  md:p-2.5 font-medium  text-white// py-2.5// rounded-full flex justify-center items-center gap-2 font-black// transition-all hover:scale-105 shadow-xl"

                            >
                                <div
                                    style={{ backgroundColor: COLORS.secondary }}
                                    className="bg-white// h-10 w-16 flex items-center  justify-center rounded-full">
                                    <ShoppingBasket className="text-[#D1D5DB]" />
                                </div>
                                <p className="text-[#DC2626]">
                                    Order Now
                                </p>
                            </button> */}
                        </div>



                        {/* DOTS */}
                        <div className="flex flex-col justify-center absolute top-20 -left-2 mt-4 gap-2">
                            {slides.map((_, index) => (
                                <div
                                    key={index}
                                    onClick={() => setCurrent(index)}
                                    className="w-8 h-2 rounded-full// rounded-none cursor-pointer"
                                    style={{
                                        backgroundColor:
                                            current === index
                                                ? COLORS.secondary
                                                : "#fff",
                                    }}
                                />
                            ))}
                        </div>

                        {/* ---- copyright policy ----- */}
                        <footer className=" absolute bottom-14 left-0 right-0   w-full  bg-transparent border-none border-gray-100">
                            <div className="mx-auto px-4 ">
                                <div className="">
                                    <div className="flex place-items-center justify-center items-center gap-4">
                                        <p className="text-white md:text-base  leading-2  font-medium   text-sm">
                                            &copy; {year} GREENPORK
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </footer>
                    </div>
                </div>
            </div>

            {/* <About  /> */}
        </div>


    );
};

export default hero;