import React from 'react';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, change, icon: Icon, color = 'blue', delay = 0 }) => {
    const isPositive = change > 0;

    // Mapping colors for the top accent line and icon background
    const colorMap = {
        blue: 'border-t-blue-500 bg-blue-500/10 text-blue-500',
        red: 'border-t-red-500 bg-red-500/10 text-red-500',
        orange: 'border-t-orange-500 bg-orange-500/10 text-orange-500',
        green: 'border-t-green-500 bg-green-500/10 text-green-500',
    };

    const accentBorder = colorMap[color].split(' ')[0];
    const iconStyle = colorMap[color].split(' ').slice(1).join(' ');

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay, ease: "easeOut" }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className={`relative bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 shadow-lg overflow-hidden border-t-2 ${accentBorder}`}
        >
            <div className="flex justify-between items-start">
                <div>
                    <h4 className="text-slate-400 font-medium text-sm mb-2">{title}</h4>
                    <h2 className="text-3xl font-bold text-white tracking-tight">{value}</h2>
                </div>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${iconStyle}`}>
                    <Icon size={24} />
                </div>
            </div>

            <div className="mt-4 flex items-center gap-2">
                <span className={`text-sm font-semibold flex items-center gap-1 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                    {isPositive ? '+' : '-'}{Math.abs(change)}%
                </span>
                <span className="text-xs text-slate-500">vs last month</span>
            </div>
        </motion.div>
    );
};

export default StatCard;
