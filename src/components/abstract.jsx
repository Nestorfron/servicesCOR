import React from "react";

export const AbstractShapes = () => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Círculos decorativos */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#034AA6] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#0F6CA7] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-[#034AA6] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
        
        {/* Líneas decorativas */}
        <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path
            d="M0,50 Q25,30 50,50 T100,50"
            className="stroke-[#034AA6] stroke-2 fill-none opacity-20"
            strokeDasharray="5,5"
          />
          <path
            d="M0,70 Q25,50 50,70 T100,70"
            className="stroke-[#0F6CA7] stroke-2 fill-none opacity-20"
            strokeDasharray="5,5"
          />
        </svg>
  
        {/* Formas geométricas */}
        <div className="absolute top-20 right-20 w-40 h-40 border-4 border-[#034AA6] rounded-lg opacity-20 animate-spin-slow" 
          style={{ transform: 'rotate(45deg)' }} 
        />
        <div className="absolute bottom-20 left-20 w-40 h-40 border-4 border-[#0F6CA7] rounded-full opacity-20 animate-pulse" />
      </div>
    )
  }
  
  