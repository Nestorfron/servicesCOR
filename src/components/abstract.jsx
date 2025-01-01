import React from "react";
export const AbstractShapes = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
    
      {/* Líneas decorativas */}
      {/* <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path
          d="M0,50 Q25,30 50,50 T100,50"
          className="stroke-[#FFFF] stroke-2 fill-none opacity-20"
          strokeDasharray="5,5"
        />
        <path
          d="M0,70 Q25,50 50,70 T100,70"
          className="stroke-[#FFFF] stroke-2 fill-none opacity-20"
          strokeDasharray="5,5"
        />
      </svg> */}

      {/* Formas geométricas */}
      <div className="absolute top-20 right-20 w-40 h-40 border-4 border-[#FFFF] rounded-lg opacity-20 animate-spin-slow" 
        style={{ transform: 'rotate(45deg)' }} 
      />
      <div className="absolute bottom-20 left-20 w-40 h-40 border-4 border-[#FFFF] rounded-full opacity-20 animate-pulse" />
    </div>
  )
}

