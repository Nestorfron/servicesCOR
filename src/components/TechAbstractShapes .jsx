import React,{ useEffect, useRef } from "react";
import { motion } from "framer-motion";


export const TechAbstractShapes = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Function to draw a circuit
    const drawCircuit = (x, y, size) => {
      ctx.strokeStyle = "rgba(15, 108, 167, 0.1)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + size, y);
      ctx.lineTo(x + size, y + size);
      ctx.stroke();

      // Circuit node
      ctx.fillStyle = "rgba(3, 74, 166, 0.2)";
      ctx.beginPath();
      ctx.arc(x + size, y + size, 4, 0, Math.PI * 2);
      ctx.fill();
    };

    // Draw multiple circuits
    for (let i = 0; i < 15; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const size = Math.random() * 50 + 30;
      drawCircuit(x, y, size);
    }
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Canvas for circuits */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Decorative tech shapes */}
      <div className="absolute inset-0">
        {/* Animated hexagons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          className="absolute top-20 right-40"
        >
          <svg width="100" height="100" viewBox="0 0 100 100">
            <path
              d="M50 0L93.3 25V75L50 100L6.7 75V25L50 0Z"
              className="fill-[#034AA6]"
            />
          </svg>
        </motion.div>

         {/* Connection lines */}
         <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.1 }}>
          <motion.path
            d="M0,50 Q25,30 50,50 T100,50"
            stroke="#034AA6"
            strokeWidth="2"
            fill="none"
            strokeDasharray="5,5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.path
            d="M0,70 Q25,50 50,70 T100,70"
            stroke="#0F6CA7"
            strokeWidth="2"
            fill="none"
            strokeDasharray="5,5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
          />
        </svg>

        {/* Dot matrix */}
        <div className="absolute top-1/4 left-1/4 grid grid-cols-6 gap-4 opacity-20">
          {Array.from({ length: 24 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0.2 }}
              animate={{ opacity: 0.8 }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
                delay: i * 0.1,
              }}
              className="w-2 h-2 rounded-full bg-[#0F6CA7]"
            />
          ))}
        </div>

       

        {/* Rotating tech symbols */}
        <div className="absolute bottom-20 right-20">
          <motion.div
            animate={{
              rotate: [0, 90, 180, 270, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="w-40 h-40 border-4 border-[#034AA6] rounded-lg opacity-10"
            style={{ transform: "rotate(45deg)" }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-1/2 h-1/2 border-2 border-[#0F6CA7] rounded-full" />
            </div>
          </motion.div>
        </div>

        {/* Binary code animation */}
        <div className="absolute top-0 right-0 opacity-10 font-mono text-xs overflow-hidden h-40 w-20">
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: -20 }}
              animate={{ y: 200 }}
              transition={{
                duration: 10,
                repeat: Infinity,
                delay: i * 0.5,
              }}
              className="text-[#034AA6]"
            >
              {Math.random() > 0.5 ? "1" : "0"}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
