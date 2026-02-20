import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { Lightbulb, ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const InsightsCard = ({ delay = 0 }) => {
    const glowRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Subtle GSAP pulse glow
        gsap.to(glowRef.current, {
            opacity: 0.8,
            scale: 1.05,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay, ease: "easeOut" }}
            className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-xl overflow-hidden shadow-lg relative h-full flex flex-col"
        >
            {/* Animated Glow Background */}
            <div ref={glowRef} className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/20 rounded-full blur-[80px] pointer-events-none" />

            <div className="p-6 relative z-10 flex-1 flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20 text-white">
                        <Lightbulb size={20} />
                    </div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        AI Insights <Sparkles size={16} className="text-blue-400" />
                    </h3>
                </div>

                <div className="space-y-4 flex-1">
                    <div className="bg-slate-800/40 border border-slate-700/50 rounded-lg p-4">
                        <p className="text-slate-300 text-sm leading-relaxed">
                            <span className="font-semibold text-white">Critical Trend Detected:</span> The dropout risk in <span className="text-red-400 font-medium">Semester 5</span> for the <span className="text-white font-medium">Civil Engineering</span> department has spiked by 12% in the last month.
                        </p>
                    </div>

                    <div className="bg-slate-800/40 border border-slate-700/50 rounded-lg p-4">
                        <p className="text-slate-300 text-sm leading-relaxed">
                            <span className="font-semibold text-blue-400">Suggested Action:</span> Schedule 1-on-1 mentorship sessions for the top 50 high-risk students and review core module workloads. Target targeted financial-aid surveys to the identified cohort.
                        </p>
                    </div>
                </div>

                <div className="mt-8">
                    <motion.button
                        onClick={() => navigate('/interventions')}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3.5 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-medium shadow-[0_4px_15px_rgba(37,99,235,0.4)] hover:shadow-[0_4px_20px_rgba(59,130,246,0.6)] transition-all flex items-center justify-center gap-2 border border-blue-400/30"
                    >
                        Review Interventions <ArrowRight size={18} />
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};

export default InsightsCard;
