import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Bell, ChevronRight, User } from 'lucide-react';

const TopNavbar = ({ title, subtitle }) => {
    const [user, setUser] = useState({ name: 'User', role: 'Teacher' });
    const [notificationsOpen, setNotificationsOpen] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('shiksha_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="h-20 w-full px-6 lg:px-8 border-b border-slate-800/60 bg-slate-900/50 backdrop-blur-md flex flex-col md:flex-row items-start md:items-center justify-between sticky top-0 z-40 py-2 md:py-0"
        >
            {/* Title / Breadcrumb - Left */}
            {title ? (
                <div className="flex flex-col mb-2 md:mb-0">
                    <h1 className="text-xl font-bold text-white tracking-wide">{title}</h1>
                    {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
                </div>
            ) : (
                <div className="flex items-center gap-2 text-sm mb-2 md:mb-0">
                    <span className="text-slate-400 font-medium">Dashboard</span>
                    <ChevronRight size={16} className="text-slate-600" />
                    <span className="text-white font-medium">Overview</span>
                </div>
            )}

            {/* Search - Center */}
            <div className="hidden md:flex flex-1 max-w-md mx-8 relative group">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-400 transition-colors" />
                <input
                    type="text"
                    placeholder="Search students, departments, or insights..."
                    className="w-full bg-slate-800/50 border border-slate-700/50 text-slate-200 text-sm rounded-full pl-11 pr-4 py-2.5 focus:outline-none focus:border-blue-500/50 focus:bg-slate-800 transition-all glow-border"
                />
            </div>

            {/* Actions - Right */}
            <div className="flex items-center gap-4 lg:gap-6">
                <div className="relative">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setNotificationsOpen(!notificationsOpen)}
                        className="relative p-2 text-slate-400 hover:text-white transition-colors"
                    >
                        <Bell size={20} />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-500 border border-slate-900"></span>
                    </motion.button>

                    {notificationsOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            className="absolute right-0 top-full mt-2 w-48 bg-slate-800 border border-slate-700 rounded-lg shadow-xl p-4 z-50 flex items-center justify-center"
                        >
                            <p className="text-sm text-slate-300 font-medium">no new messages</p>
                        </motion.div>
                    )}
                </div>

                <div className="flex items-center gap-3 pl-4 border-l border-slate-800">
                    <div className="hidden sm:flex flex-col items-end">
                        <span className="text-sm font-semibold text-white">{user.name}</span>
                        <span className="text-xs text-slate-400">{user.role}</span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 p-0.5 shadow-lg shadow-blue-500/20">
                        <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center border border-slate-800">
                            <User size={18} className="text-blue-400" />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default TopNavbar;
