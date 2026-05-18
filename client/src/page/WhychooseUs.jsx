import React from 'react';
import { FaUtensils, FaLeaf, FaAward, FaHeart, FaClock, FaStar } from 'react-icons/fa';
import { GiMonsteraLeaf } from "react-icons/gi";
import { LuHeart } from "react-icons/lu";
import { FaRegClock } from "react-icons/fa";
import { CiStar } from "react-icons/ci";

const WhyChooseUs = () => {
  const features = [
    // {
    //   icon: <FaUtensils className="w-8 h-8" />,
    //   title: "Authentic Cuisine",
    //   description: "Traditional recipes passed down through generations, prepared with love and care."
    // },
    {
      icon: <GiMonsteraLeaf className="w-20 h-20 bg-green-100/" />,
      title: "Fresh Ingredients",
      description: "We source only the freshest local ingredients for maximum flavor and quality."
    },
    // {
    //   icon: <FaAward className="w-8 h-8" />,
    //   title: "Award-Winning Chef",
    //   description: "Our head chef brings 20+ years of culinary excellence to your dining experience."
    // },
    {
      icon: <LuHeart className="w-20 h-20 bg-green-100/" />,
      title: "Passionate Service",
      description: "Our staff is dedicated to making your visit memorable and enjoyable."
    },
    {
      icon: <FaRegClock className="w-20 h-20 bg-green-100/" />,
      title: "Quick Service",
      description: "Enjoy delicious meals without long waits - perfect for lunch breaks."
    }
    // ,
    // {
    //   icon: <CiStar className="w-20 h-20 bg-green-100/" />,
    //   title: "Consistent Quality",
    //   description: "Every dish meets our high standards, every time you visit."
    // }
  ];

  return (
    <section className="">
      <div className=" mx-auto ">
        <div className="text-center mb">
          <div className="place-items-center">
            <div className="w-10 h-2 bg-[#0edb0e] rounded-full mx-auto "></div>
            <h2 className="text-lg font-medium text-black mb-1">Why Dine With Us</h2>
          </div>
          <p className="text-lg font-medium  mx-auto">
            Discover what makes our restaurant the preferred choice for food lovers
          </p>
        </div>
        
        <div className="grid mt-8 bg-[#0edb0e]/ mb-4    grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4">
          {features.map((feature, index) => (
            <div 
              key={index}
              className=" group bg-[#0edb0e]/ p-2  rounded-2xl hover:bg-white/20 place-items-center "
            >
              <div className="bg-[#0ebd0e]/80 rounded-full flex justify-center items-center  p-2">
                <h3 className='text-black'>
                  {feature.icon}
                </h3>
                
              </div>
              <h3 className="text-xl font-semibold text-black  m-2">{feature.title}</h3>
              <p className="text-gray-700 text-center">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* <div className="mt-12 text-center">
          <button className="px-8 py-3 bg-amber-600 text-white font-medium rounded-full hover:bg-amber-700 transition-colors duration-300 shadow-lg hover:shadow-xl">
            Reserve Your Table
          </button>
        </div> */}
      </div>
    </section>
  );
};

export default WhyChooseUs;