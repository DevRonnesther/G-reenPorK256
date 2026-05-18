import React from "react";

function CurvedTextSVG() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-72 h-72">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {/* circle path (invisible) */}
          <defs>
            {/* full circle path */}
            <path 
              id="circlePath" 
              d="M100,100 m-70,0 a70,70 0 1,1 140,0 a70,70 0 1,1 -140,0" 
            />
            {/* small arc example (comment above out & use this instead if you want arc only)
            <path id="arcPath" d="M30,100 A70,70 0 0,1 170,100" />
            */}
          </defs>
          
          {/* optional guide (circle) - uncomment to show */}
          {/* <use href="#circlePath" fill="none" stroke="#e5e7eb" strokeWidth="1" /> */}
          
          {/* text on path */}
          <text className="text-2xl font-extrabold" dy="-8">
            <textPath href="#circlePath" startOffset="50%" textAnchor="middle">
              Join Us Live
            </textPath>
          </text>
        </svg>
      </div>
    </div>
  );
}

export default  CurvedTextSVG;