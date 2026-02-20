import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpDown } from 'lucide-react';

const sortOptions = [
    { id: 'id', label: 'ID' },
    { id: 'riskScore', label: 'Risk' },
    { id: 'cgpa', label: 'CGPA' },
    { id: 'attendance', label: 'Attendance' },
];

const SortBar = ({ currentSort, sortDirection, onSortChange }) => {
    return (
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-xl w-full sm:w-auto mt-4 sm:mt-0">
            <span className="text-slate-400 text-sm font-medium px-3 hidden sm:block">Sort by:</span>

            <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
                {sortOptions.map((option) => {
                    const isActive = currentSort === option.id;

                    return (
                        <motion.button
                            key={option.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => onSortChange(option.id)}
                            className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${isActive
                                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-[0_0_10px_rgba(37,99,235,0.1)]'
                                : 'bg-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
                                }`}
                        >
                            {option.label}
                            {isActive && (
                                <ArrowUpDown
                                    size={14}
                                    className={`transition-transform duration-300 ${sortDirection === 'desc' ? 'rotate-180' : ''}`}
                                />
                            )}
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );
};

export default SortBar;
