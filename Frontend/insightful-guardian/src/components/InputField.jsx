import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

const InputField = ({ label, type = 'text', placeholder, icon: Icon, value, onChange }) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const isSelect = type === 'select';
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

    return (
        <motion.div
            className="flex flex-col gap-1.5 w-full"
            variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 }
            }}
        >
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</label>
            <div className="relative group glow-border rounded-lg transition-all duration-300">

                {isSelect ? (
                    <select className="w-full bg-white/50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700/50 rounded-lg px-4 py-3 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none backdrop-blur-sm transition-colors text-sm appearance-none">
                        <option>Admin</option>
                        <option>Teacher</option>
                        <option>Student</option>
                    </select>
                ) : (
                    <input
                        type={inputType}
                        className="w-full bg-white/50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700/50 rounded-lg px-4 py-3 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none backdrop-blur-sm transition-colors text-sm"
                        placeholder={placeholder}
                        value={value}
                        onChange={onChange}
                    />
                )}

                {Icon && !isPassword && !isSelect && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                        <Icon size={18} />
                    </div>
                )}

                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white transition-colors"
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                )}

                {isSelect && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default InputField;
