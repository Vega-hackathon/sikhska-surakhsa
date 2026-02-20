import React from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import { useParallax } from '../hooks/useParallax';
import logoLight from '../resources/logo_light.jpeg';
import logoDark from '../resources/vega_logo.png';

const HeroSection = () => {
    const laptopRef = useParallax(20);
    const robotRef = useParallax(40);

    // We assume hero section on landing page doesn't currently have a theme toggle, but respects the global class if present.
    const isLightMode = document.documentElement.classList.contains('light-mode');

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-white flex flex-col items-center lg:items-start text-center lg:text-left pt-10 lg:pt-0"
        >
            {/* Logo Row */}
            <motion.div variants={itemVariants} className="flex items-center gap-3 mb-10 lg:mb-16">
                <img src={isLightMode ? logoDark : logoLight} alt="Shiksha Suraksha Logo" className="h-8 w-auto drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                <h1 className="text-2xl lg:text-3xl font-semibold tracking-wide">Shiksha Suraksha</h1>
            </motion.div>

            {/* Main Headline */}
            <motion.h2
                variants={itemVariants}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight max-w-lg tracking-tight"
            >
                Predict early. <br className="hidden lg:block" /> Support smarter.
            </motion.h2>

            {/* Description */}
            <motion.p
                variants={itemVariants}
                className="text-lg sm:text-xl text-blue-100/90 mb-12 max-w-md font-light leading-relaxed drop-shadow-sm"
            >
                AI-powered analytics to detect student dropout risk early and help institutions intervene proactively.
            </motion.p>

            {/* Visual Area - HTML/CSS Placeholders for premium feel without images */}
            <motion.div variants={itemVariants} className="relative w-full max-w-lg h-64 lg:h-80 mt-4 hidden md:block">

                {/* Laptop Placeholder */}
                <div ref={laptopRef} className="absolute inset-x-4 sm:inset-x-0 bottom-0 top-10 rounded-t-xl bg-gradient-to-t from-slate-900 to-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-slate-700/50 p-2 transform -rotate-1 perspective-1000 z-10 flex flex-col">
                    {/* Screen content */}
                    <div className="w-full h-full bg-slate-950 rounded-t border border-slate-800 relative overflow-hidden flex flex-col">
                        {/* Toolbar */}
                        <div className="h-6 bg-slate-900 flex items-center px-3 gap-1.5 border-b border-slate-800">
                            <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                            <div className="ml-4 h-2 w-24 bg-slate-800 rounded"></div>
                        </div>
                        {/* Dashboard Content Mock */}
                        <div className="flex-1 p-4 grid grid-cols-3 gap-3">
                            <div className="col-span-3 h-1/3 bg-gradient-to-r from-blue-900/40 to-indigo-900/40 rounded border border-blue-500/20 shadow-inner flex p-3 px-4 gap-6 items-center">
                                <div className="h-full w-20 bg-blue-500/20 rounded-full border border-blue-500/30"></div>
                                <div className="flex flex-col gap-2 flex-1">
                                    <div className="h-3 w-1/3 bg-slate-700 rounded-full"></div>
                                    <div className="h-2 w-full bg-slate-800 rounded-full"></div>
                                </div>
                            </div>
                            <div className="col-span-1 h-full bg-slate-900 rounded border border-slate-800 p-2 flex flex-col gap-2">
                                <div className="h-2 w-1/2 bg-slate-800 rounded-full"></div>
                                <div className="w-full aspect-square rounded-full border-4 border-slate-800 border-t-red-500 border-r-yellow-500 border-l-blue-500 border-b-green-500 mx-auto mt-2 opacity-80"></div>
                            </div>
                            <div className="col-span-2 h-full bg-slate-900 rounded border border-slate-800 p-3 flex flex-col gap-2">
                                <div className="flex justify-between w-full">
                                    <div className="h-2 w-1/4 bg-slate-800 rounded-full"></div>
                                    <div className="h-2 w-1/5 bg-slate-800 rounded-full"></div>
                                </div>
                                <div className="h-4 w-full bg-red-500/20 rounded mt-1 border border-red-500/20"></div>
                                <div className="h-4 w-full bg-yellow-500/20 rounded border border-yellow-500/20"></div>
                                <div className="h-4 w-full bg-green-500/20 rounded border border-green-500/20"></div>
                            </div>
                        </div>
                    </div>
                    <div className="h-2 w-full bg-slate-700 rounded-b mt-2 shadow-lg"></div>
                </div>

                {/* Robot Placeholder */}
                <div ref={robotRef} className="absolute -right-6 lg:-right-12 top-0 w-28 h-32 z-20">
                    <motion.div
                        animate={{ y: [0, -15, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="w-full h-full drop-shadow-2xl flex flex-col items-center justify-center relative"
                    >
                        {/* Robot Head */}
                        <div className="w-16 h-14 bg-gradient-to-b from-white to-slate-200 rounded-[2rem] rounded-b-[1.5rem] shadow-[0_0_20px_rgba(255,255,255,0.4)] flex flex-col items-center justify-center border-b-[3px] border-slate-300 relative z-10">
                            <div className="w-11 h-6 bg-slate-900 rounded-xl flex items-center justify-center gap-3 px-1 shadow-inner relative overflow-hidden border border-slate-800">
                                <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,1)] animate-pulse"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,1)] animate-pulse"></div>
                                {/* Screen reflection */}
                                <div className="absolute top-0 right-0 w-full h-1/2 bg-white/10 rounded-b-full"></div>
                            </div>
                            {/* Antenna */}
                            <div className="absolute -top-3 w-1.5 h-3 bg-slate-300 rounded-t"></div>
                        </div>
                        {/* Robot Body */}
                        <div className="w-10 h-8 bg-gradient-to-b from-slate-100 to-slate-200 mt-1 rounded-full shadow-inner relative flex justify-center border border-slate-300 border-t-0 p-1">
                            <div className="w-4 h-4 rounded-full bg-slate-800 relative overflow-hidden flex items-center justify-center mt-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
                            </div>
                        </div>

                        {/* Float energy rings */}
                        <div className="absolute -bottom-2 w-16 h-2 bg-cyan-400/40 rounded-full blur-md"></div>
                    </motion.div>
                </div>

            </motion.div>
        </motion.div>
    );
};

export default HeroSection;
