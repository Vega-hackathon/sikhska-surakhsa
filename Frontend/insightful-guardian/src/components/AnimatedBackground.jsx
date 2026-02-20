import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const AnimatedBackground = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Create particles
        const particleCount = 60;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'absolute rounded-full bg-white/30';

            const size = Math.random() * 3 + 1;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;

            container.appendChild(particle);

            // Animate particle floating
            gsap.to(particle, {
                y: `-=${Math.random() * 150 + 50}`,
                x: `+=${(Math.random() - 0.5) * 80}`,
                opacity: Math.random() * 0.6 + 0.1,
                duration: Math.random() * 15 + 15,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: -Math.random() * 20
            });
        }

        return () => {
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }
        };
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {/* Deep space background base */}
            <div className="absolute inset-0 bg-[#0a1128]" />

            {/* Subtle sweeping gradients simulating the image */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-transparent to-blue-600/20" />
            <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-blue-500/10 blur-[150px]" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-500/10 blur-[150px]" />

            {/* Abstract light waves / sweeps */}
            <div className="absolute top-[20%] left-[-20%] w-[140%] h-[20%] bg-white/5 rotate-[-15deg] blur-[80px]" />
            <div className="absolute bottom-[20%] right-[-20%] w-[140%] h-[20%] bg-blue-400/5 rotate-[-15deg] blur-[80px]" />

            {/* GSAP Particles */}
            <div ref={containerRef} className="absolute inset-0" />
        </div>
    );
};

export default AnimatedBackground;
