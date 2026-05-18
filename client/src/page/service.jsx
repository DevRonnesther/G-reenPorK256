import React from 'react';
import { ArrowBigRight, ArrowDownRightFromSquare, ArrowUpRightFromSquare, Bike, Leaf, Soup } from 'lucide-react';
import { Link } from "react-router-dom";

const Service = () => {
    return (
        <div className="grid grid-cols-1 w-full md:flex rounded-t-3xl p-2 gap-6 place-content-center">

            {/* Catering Service */}
            <div className="w-full md:w-[300px] rounded-t-2xl bg-gray-50// overflow-hidden">
                <Link to="/CateringService" className="block h-full">
                    <div className="p-2 hover:bg-gray-100//// rounded-2xl transition-colors duration-200">
                        <div className="flex gap-4">
                            <div className="w-14 h-14 bg-[#0edb0e]/10// border border-[#0edb0e]/30 rounded-full flex items-center justify-center">
                                <Soup className="h-8 w-8 text-[#0edb0e]" />
                            </div>

                            <div className="block">
                                <h3 className="text-xl text-black font-bold">
                                    Catering Service
                                </h3>
                                <p className="text-xs flex md:text-sm// text-gray-600 leading-relaxed">
                                    Book us for your dream events!
                                    <ArrowUpRightFromSquare size={16} className='ml-1' color='#0edb0e'  />
                                </p>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>

            {/* Fast Delivery */}
            <div className="w-full md:w-[300px] rounded-2xl bg-white/20 overflow-hidden">
                <Link to="/CateringService" className="block h-full">
                    <div className="p-2 hover:bg-gray-100/// transition-colors duration-200">
                        <div className="flex gap-4">
                            <div className="w-14 h-14 bg-[#0edb0e]/10// border border-[#0edb0e]/30 rounded-full flex items-center justify-center">
                                <Bike className="h-8 w-8 text-[#0edb0e]" />
                            </div>

                            <div className="block">
                                <h3 className="text-xl text-black font-bold">
                                    Fast Delivery
                                </h3>
                                <p className="text-xs md:text-sm// text-gray-600 leading-relaxed">
                                    Doorstep delivery in 30 mins
                                </p>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>

            {/* Fresh Ingredient */}
            <div className="w-full md:w-[300px] bg-white/20 rounded-2xl overflow-hidden">
                <div className="block h-full">
                    <div className="p-2 hover:bg-gray-100/// transition-colors duration-200">
                        <div className="flex gap-4">
                            <div className="w-14 h-14 bg-[#0edb0e]/10// border border-[#0edb0e]/30 rounded-full flex items-center justify-center">
                                <Leaf className="h-8 w-8 text-[#0edb0e]" />
                            </div>

                            <div className="block">
                                <h3 className="text-xl text-black font-bold">
                                    Fresh Ingredients
                                </h3>
                                <p className="text-xs md:text-sm// text-gray-600 leading-relaxed">
                                    100% Fresh organic ingredients
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Service;
