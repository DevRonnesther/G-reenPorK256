import React from 'react'
import { Link } from "react-router-dom"

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div>
      {/* ---- copyright policy ----- */}
      <footer className=" absolute bottom-0 hidden md:flex// w-full bg-white// bg-transparent border-none border-gray-100">
        <div className="mx-auto px-4 ">
          <div className="inline-block sm:flex md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <p className="text-black md:text-xs leading-2  font-medium   text-sm">
                &copy; {year} GreenPork - All Rights Reserved
              </p>
            </div>
            <div className="flex items-center gap-6">
              <Link to="/returnPolicy">
                <button className="text-[#DC2626] text-center text-sm hover:text-[#0edb0e] font-bold transition-colors">
                  Return Policy
                </button>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
