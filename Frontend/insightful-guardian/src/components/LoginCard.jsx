import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import InputField from './InputField';
import logoLight from '../resources/logo_light.jpeg';
import logoDark from '../resources/vega_logo.png';
import { authAPI } from '../utils/api';

const LoginCard = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const isLightMode = document.documentElement.classList.contains('light-mode');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Please enter both email and password.');
            return;
        }

        setIsLoading(true);

        try {
            const data = await authAPI.login(email, password);
            localStorage.setItem('shiksha_user', JSON.stringify({
                name: data.teacher.name,
                role: 'Teacher',
                email: data.teacher.email,
                teacher_uid: data.teacher.teacher_uid,
                token: data.access_token
            }));
            navigate('/dashboard');
        } catch (err) {
            setError(err.message || 'Failed to connect to authentication server. Is the backend running?');
            setIsLoading(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0, scale: 0.95, y: 30 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1], // Custom spring ease
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full max-w-md"
        >
            <div className="relative overflow-hidden rounded-2xl p-8 sm:p-10 w-full text-white bg-slate-900/40 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] group transition-all duration-500">

                {/* Subtle Shimmer background */}
                <div className="absolute top-0 left-[-150%] right-[-150%] bottom-0 transform -skew-x-[30deg] bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer pointer-events-none" />

                {/* Card Header */}
                <div className="flex flex-col items-center text-center mb-8 pb-4 border-b border-white/10">
                    <motion.div
                        variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }}
                        className="flex items-center gap-2 mb-4"
                    >
                        <img src={isLightMode ? logoDark : logoLight} alt="Shiksha Suraksha Logo" className="h-8 w-auto drop-shadow-md object-contain" />
                        <span className="font-semibold tracking-wide text-slate-200">Shiksha Suraksha</span>
                    </motion.div>
                    <motion.h3
                        variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                        className="text-2xl font-bold tracking-tight text-white drop-shadow"
                    >
                        Sign in to your workspace
                    </motion.h3>
                </div>

                {/* Form Fields */}
                <form className="flex flex-col gap-5" onSubmit={handleLogin}>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-red-500/10 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg text-sm text-center"
                        >
                            {error}
                        </motion.div>
                    )}

                    <InputField
                        label="Email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <InputField
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />


                    {/* Options Row */}
                    <motion.div
                        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                        className="flex items-center justify-between text-sm mt-1"
                    >
                        <label className="flex items-center gap-2.5 cursor-pointer group/check">
                            <input type="checkbox" className="w-4 h-4 rounded border-slate-600 bg-slate-800/80 text-blue-500 focus:ring-blue-500/50 focus:ring-offset-0 cursor-pointer transition-colors accent-blue-500" />
                            <span className="text-slate-300 font-medium group-hover/check:text-white transition-colors">Remember me</span>
                        </label>
                        <a href="#" className="text-blue-400 font-medium hover:text-blue-300 hover:underline decoration-blue-400/50 underline-offset-4 transition-all">
                            Forgot password?
                        </a>
                    </motion.div>

                    {/* Buttons */}
                    <motion.div
                        variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                        className="flex flex-col gap-3 mt-4"
                    >
                        <motion.button
                            type="submit"
                            disabled={isLoading}
                            whileHover={isLoading ? {} : { scale: 1.015 }}
                            whileTap={isLoading ? {} : { scale: 0.985 }}
                            className="w-full py-3.5 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-medium shadow-[0_4px_15px_rgba(37,99,235,0.4)] hover:shadow-[0_4px_20px_rgba(59,130,246,0.6)] transition-all flex items-center justify-center border border-blue-400/30 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? <Loader2 className="animate-spin" size={20} /> : 'Sign In'}
                        </motion.button>


                    </motion.div>
                </form>

                {/* Footer Text */}
                <motion.p
                    variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                    className="text-center text-xs text-slate-400 font-medium mt-8 pt-4 border-t border-white/10"
                >
                    Contact your admin for credentials.
                </motion.p>
            </div>
        </motion.div>
    );
};

export default LoginCard;
