import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

// IMAGES
import FreshPork from "../assets/freshporke.png";
// import FreshPork from "../assets/pngwing.com (23).png";
// import PorkStake from "../assets/ChatGPT Image Apr 18, 2026, 04_21_59 PM.png";
import PorkStake from "../assets/PremiumPlate.png";
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

// ─── Animation keyframes injected once into <head> ───────────────────────────
const ANIMATION_STYLES = `
@keyframes heroImgEnterRight {
    0%   { opacity: 0; transform: translateX(80px) scale(0.85) rotate(6deg); }
    100% { opacity: 1; transform: translateX(0)    scale(1)    rotate(0deg); }
}
@keyframes heroImgEnterLeft {
    0%   { opacity: 0; transform: translateX(-80px) scale(0.85) rotate(-6deg); }
    100% { opacity: 1; transform: translateX(0)     scale(1)    rotate(0deg); }
}
@keyframes heroBgTitleReveal {
    0%   { opacity: 0; transform: scale(1.15) translateY(16px); letter-spacing: 0.25em; }
    100% { opacity: 1; transform: scale(1)    translateY(0);    letter-spacing: 0.04em; }
}
@keyframes heroFadeUp {
    0%   { opacity: 0; transform: translateY(30px); }
    100% { opacity: 1; transform: translateY(0); }
}
@keyframes heroBadgePop {
    0%   { opacity: 0; transform: scale(0.4) rotate(-10deg); }
    70%  { transform: scale(1.15) rotate(2deg); }
    100% { opacity: 1; transform: scale(1) rotate(0deg); }
}
@keyframes heroRingPulse {
    0%, 100% { transform: translate(-50%, -50%) scale(0.88); opacity: 0.06; }
    50%       { transform: translate(-50%, -50%) scale(1.12); opacity: 0.14; }
}
@keyframes heroImgFloat {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-14px); }
}
@keyframes heroSocialFadeIn {
    0%   { opacity: 0; transform: translateX(20px); }
    100% { opacity: 1; transform: translateX(0); }
}
`;

// Inject styles once
if (typeof document !== "undefined" && !document.getElementById("hero-anim-styles")) {
    const styleTag = document.createElement("style");
    styleTag.id = "hero-anim-styles";
    styleTag.innerHTML = ANIMATION_STYLES;
    document.head.appendChild(styleTag);
}

const hero = () => {
    const year = new Date().getFullYear();
    const [current, setCurrent] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [imgDir, setImgDir] = useState("right"); // "right" | "left"
    const [animKey, setAnimKey] = useState(0);     // bump to retrigger animations

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
            setCurrent((prev) => {
                setImgDir("right");
                setAnimKey((k) => k + 1);
                return (prev + 1) % slides.length;
            });
        }, 5000);

        return () => clearInterval(interval);
    }, [isPaused, slides.length]);

    // NEXT SLIDE
    const nextSlide = () => {
        setImgDir("right");
        setAnimKey((k) => k + 1);
        setCurrent((prev) => (prev + 1) % slides.length);
    };

    // PREVIOUS SLIDE
    const prevSlide = () => {
        setImgDir("left");
        setAnimKey((k) => k + 1);
        setCurrent((prev) =>
            prev === 0 ? slides.length - 1 : prev - 1
        );
    };

    // ── Animation styles (inline, keyed so they retrigger on every slide change) ──

    // Background ghost title

    // Food image — direction-aware entrance + continuous float after
    const imgAnimStyle = {
        animation: `${imgDir === "right" ? "heroImgEnterRight" : "heroImgEnterLeft"} 0.55s cubic-bezier(0.16,1,0.3,1) both, heroImgFloat 4s ease-in-out 0.6s infinite`,
    };

    // Staggered content entrance (delay each piece)
    const badgeAnim = { animation: `heroBadgePop 0.45s cubic-bezier(0.34,1.56,0.64,1) 0.05s both` };
    const ratingAnim = { animation: `heroFadeUp 0.45s cubic-bezier(0.16,1,0.3,1) 0.15s both` };
    const titleAnim = { animation: `heroFadeUp 0.45s cubic-bezier(0.16,1,0.3,1) 0.22s both` };
    const priceAnim = { animation: `heroFadeUp 0.5s  cubic-bezier(0.16,1,0.3,1) 0.30s both` };
    const btnAnim = { animation: `heroFadeUp 0.5s  cubic-bezier(0.16,1,0.3,1) 0.40s both` };
    const socialAnim = (i) => ({ animation: `heroSocialFadeIn 0.4s cubic-bezier(0.16,1,0.3,1) ${0.1 + i * 0.1}s both` });

    return (
        <div

            className="absolute bg-white inset-0"

            style={{
                background: `
        radial-gradient(
          circle 900px at 50% 120px,
          #FF3B30 0%,
          #E10600 25%,
          #3d0000 65%,
          #2B0000 100%
        )
      `,

            }}

        /* className="absolute overflow-hidden inset-0"
        style={{
            background: "linear-gradient(145deg, #1a0000 0%, #3d0000 40%, #7c1010 75%, #c0392b 100%)",

        }} */
        >
            <div
                className="relative w-full h-screen backdrop-blur-none bg-black/10   overflow-hidden"

            >
                {/* ── Pulsing ambient rings (pure CSS, no layout change) ── */}
                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        width: "380px",
                        height: "380px",
                        borderRadius: "50%",
                        border: "1.5px solid rgba(255,255,255,0.15)",
                        pointerEvents: "none",
                        zIndex: 1,
                        animation: "heroRingPulse 3.5s ease-in-out infinite",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        width: "520px",
                        height: "520px",
                        borderRadius: "50%",
                        border: "1px solid rgba(255,255,255,0.07)",
                        pointerEvents: "none",
                        zIndex: 1,
                        animation: "heroRingPulse 3.5s ease-in-out 1s infinite",
                    }}
                />

                {/* nav bar */}
                <div>
                    <Navbar />
                </div>
                <div
                    className="md:flex bg-black/10 absolute top-0 min-h-screen backdrop-blur-xl md:flex-row  bg-black///  w-full   flex flex-col items-center justify-center overflow-hidden"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    {/* ARROWS */}
                    <div className="absolute md:flex hidden  gap-3 right-5 top-12// md:right-20 md:bottom-40 z-50">
                        <button
                            onClick={prevSlide}
                            className="
            bg-black/30
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
            bg-black/30
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
                        className="absolute block   md:flex sm:flex sm: justify-center items-center gap-4 md:right-18 right-2 md:bottom-10 z-50 space-y-3 bottom-20  -translate-y-1/2 bg-black/80// backdrop-blur-xl// shadow-md// text-white  hidden// p-3 rounded-full shadow//"
                    >
                        <span style={socialAnim(0)}><Twitter size={25} /></span>
                        <span className="my-2" style={socialAnim(1)}><Facebook size={25} /></span>
                        <span style={socialAnim(2)}><FaTiktok size={25} /></span>
                    </div>


                    <div className=" absolute top-24 md:top-20 sm:top-10 left-0 right-0 flex justify-center items-center" style={{ zIndex: 3 }}>

                        {/* Radial glow behind image */}
                        {/* <div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                background: "radial-gradient(ellipse 60% 60% at 70% 55%, rgba(249,115,22,0.25) 0%, transparent 70%)",
                            }}
                        /> */}
                        {/* Radial glow behind image */}
                        <div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                background: "radial-gradient(ellipse 60% 60% at 70% 55%, rgba(249,115,22,0.25) 0%, transparent 70%)",
                            }}
                        />
                        {/* IMAGE — retrigger animation on every slide change via key */}
                        <img
                            key={`img-${animKey}`}
                            data-aos={slides[current].dataaos}
                            src={slides[current].image}
                            alt={slides[current].title}
                            style={{
                                filter: "drop-shadow(0 20px 40px rgba(249,115,22,0.35))",
                                ...imgAnimStyle,
                            }}
                            className="w-100  h-100 md:w-130 md:h-130 sm:w-80 sm:h-80 object-contain drop-shadow-3xl transition-all duration-700 ease-in-out hover:scale-105"
                        />
                    </div>

                    {/* CONTENT */}
                    <div className="mt-0     text-center flex flex-col  px-4">

                        {/* TITLE */}
                        <h1
                            key={`title-${animKey}`}
                            className="text-5xl hidden font-serif md:block md:text-[120px] sm:text-[60px]  uppercase text-[white]/90 font-extrabold"
                            style={{ animation: `heroFadeUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.05s both` }}
                        >
                            {slides[current].title}
                        </h1>

                        {/* DESCRIPTION */}
                        <p className="mt-2 absolute top-20 hidden sm:hidden// md:top-10 md:block// left-80 text-xl leading-relaxed text-black/80 font-medium">
                            {slides[current].description}
                        </p>

                        {/* RATING */}
                        <div
                            key={`rating-${animKey}`}
                            className="flex justify-center absolute left-20 sm:bottom-70 bottom-74 items-center mt-3"
                            style={ratingAnim}
                        >
                            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                            <span className="ml-2 text-white">
                                {slides[current].rating}
                            </span>

                            {/* DISCOUNT */}
                            <span
                                key={`badge-${animKey}`}
                                className="text-white text-sm ml-2 font-bold px-2 py-1 rounded-full"
                                style={{ backgroundColor: COLORS.secondary, ...badgeAnim }}
                            >
                                -20% off
                            </span>
                        </div>

                        {/* PRICE */}
                        <div
                            className="mt-4 absolute  left-18 sm:bottom-20 bottom-22 flex flex-col justify-center items-center gap-3"
                        >
                            <h1
                                key={`title-sm-${animKey}`}
                                className="capitalize text-yellow-500 sm:hidden// md:block font-extrabold"
                                style={titleAnim}
                            >
                                {slides[current].title}
                            </h1>
                            <div
                                key={`price-${animKey}`}
                                className="block"
                                style={priceAnim}
                            >
                                <p
                                    className="text-4xl text-white/80 font-black"
                                >
                                    {slides[current].price}
                                </p>

                                <p className="line-through text-2xl  text-gray-400">
                                    {slides[current].oldPrice}
                                </p>
                            </div>

                            {/* ORDERING BUTTON */}
                            <button
                                key={`btn-${animKey}`}
                                onClick={() => {
                                    const message = `I want to order ${slides[current].title} at ${slides[current].price}`;

                                    window.open(
                                        `https://wa.me/2567XXXXXXXX?text=${encodeURIComponent(message)}`,
                                        "_blank"
                                    );
                                }}
                                style={btnAnim}
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
                        </div>

                        {/* DOTS */}
                        <div className="flex flex-col justify-center absolute bottom-20 -left-2 mt-4 gap-2">
                            {slides.map((_, index) => (
                                <div
                                    key={index}
                                    onClick={() => {
                                        setImgDir(index > current ? "right" : "left");
                                        setAnimKey((k) => k + 1);
                                        setCurrent(index);
                                    }}
                                    className="w-8 h-2 rounded-full  cursor-pointer"
                                    style={{
                                        backgroundColor:
                                            current === index
                                                ? COLORS.secondary
                                                : "#fff",
                                        transition: "background-color 0.3s ease",
                                    }}
                                />
                            ))}
                        </div>

                        {/* ---- copyright policy ----- */}
                        <footer className=" absolute bottom-8 md:bottom-2 left-0 right-0   w-full  bg-transparent border-none border-gray-100">
                            <div className="mx-auto px-4 ">
                                <div className="">
                                    <div className="flex place-items-center justify-center items-center gap-4">
                                        <p className="text-white/90 font-semibold md:text-base  leading-2 text-sm">
                                            &copy; {year} GREENBites.
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