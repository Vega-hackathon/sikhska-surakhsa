import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const useParallax = (strength = 50) => {
    const ref = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!ref.current) return;
            const { clientX, clientY } = e;
            const xPos = (clientX / window.innerWidth - 0.5) * strength;
            const yPos = (clientY / window.innerHeight - 0.5) * strength;

            gsap.to(ref.current, {
                x: xPos,
                y: yPos,
                duration: 1,
                ease: "power2.out"
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [strength]);

    return ref;
};
