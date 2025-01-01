import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export const TechAbstractShapes = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Configuración de partículas
    const particles = [];
    const particleCount = 50;
    const connectionDistance = 100;
    const colors = ['#034AA6', '#0F6CA7'];

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 2;
        this.speedY = (Math.random() - 0.5) * 2;
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    // Crear partículas
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Función para dibujar conexiones entre partículas
    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * 0.5;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(3, 74, 166, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    // Animación
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Actualizar y dibujar partículas
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Dibujar conexiones
      drawConnections();

      requestAnimationFrame(animate);
    };

    animate();

    // Responsive
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Canvas para partículas y conexiones */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* Elementos decorativos adicionales */}
      <div className="absolute inset-0">
        {/* Hexágonos tecnológicos */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="absolute top-20 right-40"
        >
          <svg width="120" height="120" viewBox="0 0 120 120">
            <path
              d="M60 10L110 35V85L60 110L10 85V35L60 10Z"
              className="fill-[#034AA6]"
            />
          </svg>
        </motion.div>

        {/* Circuitos animados */}
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.1 }}>
          <motion.path
            d="M20,50 L40,50 L60,30 L80,70 L100,50"
            stroke="#0F6CA7"
            strokeWidth="2"
            fill="none"
            strokeDasharray="5,5"
            initial={{ pathLength: 0, opacity: 0.2 }}
            animate={{ pathLength: 1, opacity: 0.8 }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.path
            d="M20,70 L40,70 L60,90 L80,50 L100,70"
            stroke="#034AA6"
            strokeWidth="2"
            fill="none"
            strokeDasharray="5,5"
            initial={{ pathLength: 0, opacity: 0.2 }}
            animate={{ pathLength: 1, opacity: 0.8 }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
              delay: 1.5
            }}
          />
        </svg>

        {/* Matriz de puntos pulsante */}
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
                delay: i * 0.1
              }}
              className="w-2 h-2 rounded-full bg-[#0F6CA7]"
            />
          ))}
        </div>

        {/* Ondas digitales */}
        <motion.div
          className="absolute bottom-20 left-20 right-20 h-px bg-gradient-to-r from-transparent via-[#034AA6] to-transparent"
          animate={{
            scaleX: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Código binario animado */}
        <div className="absolute top-0 right-0 opacity-10 font-mono text-xs overflow-hidden h-40 w-20">
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: -20 }}
              animate={{ y: 200 }}
              transition={{
                duration: 10,
                repeat: Infinity,
                delay: i * 0.5
              }}
              className="text-[#034AA6]"
            >
              {Math.random() > 0.5 ? '1' : '0'}
            </motion.div>
          ))}
        </div>

        {/* Nodos de conexión */}
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full bg-[#0F6CA7]"
            style={{
              top: `${20 + i * 15}%`,
              left: `${10 + i * 20}%`,
              opacity: 0.2
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.5
            }}
          />
        ))}
      </div>
    </div>
  );
};
  
  