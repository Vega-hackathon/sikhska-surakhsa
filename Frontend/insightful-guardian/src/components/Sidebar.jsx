import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { Shield, LayoutDashboard, Users, Zap, TrendingUp, AlertCircle, FileText, Settings, LogOut, Sun, Moon } from 'lucide-react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import logoLight from '../resources/logo_light.jpeg';
import logoDark from '../resources/vega_logo.png';

const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Users, label: 'Students', path: '/students' },
    { icon: AlertCircle, label: 'Interventions', path: '/interventions' },
    { icon: Settings, label: 'Settings', path: '/settings' },
];

const Sidebar = () => {
    const sidebarRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();
    const [settingsOpen, setSettingsOpen] = React.useState(false);
    const [isLightMode, setIsLightMode] = React.useState(() => document.documentElement.classList.contains('light-mode'));

    const toggleTheme = (mode) => {
        if (mode === 'light') {
            document.documentElement.classList.add('light-mode');
            setIsLightMode(true);
        } else {
            document.documentElement.classList.remove('light-mode');
            setIsLightMode(false);
        }
    };

    useEffect(() => {
        // Subtle slide in animation on load
        gsap.fromTo(sidebarRef.current,
            { x: -50, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
        );
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('shiksha_user');
        navigate('/');
    };

    return (
        <div
            ref={sidebarRef}
            className="w-64 h-screen hidden lg:flex flex-col bg-slate-900 border-r border-slate-800 text-slate-300 flex-shrink-0 sticky top-0"
        >
            {/* Logo Area */}
            <div className="h-20 flex items-center gap-3 px-6 border-b border-slate-800">
                <img src={isLightMode ? logoDark : logoLight} alt="Shiksha Suraksha Logo" className="h-7 w-auto drop-shadow-[0_0_8px_rgba(59,130,246,0.6)] object-contain" />
                <div className="flex flex-col">
                    <span className="font-bold text-lg text-white tracking-wide leading-tight">Shiksha Suraksha</span>
                    <span className="text-[10px] text-slate-400 font-medium">Student Dropout Risk Prediction System</span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-6 px-4 flex flex-col gap-2 overflow-y-auto custom-scrollbar">
                {navItems.map((item) => {
                    const isActive = location.pathname.startsWith(item.path);
                    if (item.label === 'Settings') {
                        return (
                            <div key={item.label} className="w-full block relative">
                                <motion.button
                                    onClick={() => setSettingsOpen(!settingsOpen)}
                                    whileHover={{ scale: 1.02, x: 4 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-300 w-full text-left hover:bg-slate-800 hover:text-white border border-transparent`}
                                >
                                    <div className="flex items-center gap-3">
                                        <item.icon size={20} className="text-slate-400" />
                                        <span className="font-medium text-sm">Settings</span>
                                    </div>
                                </motion.button>
                                {settingsOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0, y: -10 }}
                                        animate={{ opacity: 1, height: 'auto', y: 0 }}
                                        className="ml-8 mt-1 mb-2 space-y-1 bg-slate-800/50 rounded-lg p-2 border border-slate-700/50"
                                    >
                                        <button
                                            onClick={() => toggleTheme('light')}
                                            className={`flex items-center gap-2 w-full px-3 py-2 rounded-md text-sm transition-colors ${isLightMode ? 'bg-blue-500/20 text-blue-400 font-medium' : 'text-slate-400 hover:text-white hover:bg-slate-700/50'}`}
                                        >
                                            <Sun size={16} /> Light Mode
                                        </button>
                                        <button
                                            onClick={() => toggleTheme('dark')}
                                            className={`flex items-center gap-2 w-full px-3 py-2 rounded-md text-sm transition-colors ${!isLightMode ? 'bg-blue-500/20 text-blue-400 font-medium' : 'text-slate-400 hover:text-white hover:bg-slate-700/50'}`}
                                        >
                                            <Moon size={16} /> Dark Mode
                                        </button>
                                    </motion.div>
                                )}
                            </div>
                        );
                    }

                    return (
                        <Link to={item.path} key={item.label} className="w-full block">
                            <motion.div
                                whileHover={{ scale: 1.02, x: 4 }}
                                whileTap={{ scale: 0.98 }}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 w-full text-left ${isActive
                                    ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20 shadow-[0_0_15px_rgba(37,99,235,0.15)] glow-border'
                                    : 'hover:bg-slate-800 hover:text-white border border-transparent'
                                    }`}
                            >
                                <item.icon size={20} className={isActive ? 'text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]' : 'text-slate-400'} />
                                <span className={`font-medium text-sm ${isActive ? 'drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]' : ''}`}>{item.label}</span>
                            </motion.div>
                        </Link>
                    );
                })}
            </nav>

            {/* Footer / Profile */}
            <div className="p-4 border-t border-slate-800">
                <motion.button
                    onClick={handleLogout}
                    whileHover={{ scale: 1.02, backgroundColor: "rgba(239, 68, 68, 0.1)" }}
                    className="flex justify-between items-center w-full px-4 py-3 rounded-lg text-slate-400 hover:text-red-400 transition-colors"
                >
                    <span className="font-medium text-sm">Logout</span>
                    <LogOut size={18} />
                </motion.button>
            </div>
        </div>
    );
};

export default Sidebar;
