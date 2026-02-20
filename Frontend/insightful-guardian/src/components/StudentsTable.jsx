import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import StatBadge from './StatBadge';

const StudentsTable = ({ students }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 7;

    const totalPages = Math.ceil(students.length / rowsPerPage);
    const currentData = students.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    const getRiskColor = (level) => {
        if (level === 'High') return 'bg-red-500';
        if (level === 'Medium') return 'bg-orange-500';
        return 'bg-green-500';
    };

    return (
        <div className="w-full bg-slate-900/40 border border-slate-800/60 rounded-xl backdrop-blur-md overflow-hidden flex flex-col shadow-2xl">
            {/* Table Container with Horizontal Scroll for Mobile */}
            <div className="w-full overflow-x-auto min-h-[400px]">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-800/50 sticky top-0 z-10 backdrop-blur-md border-b border-slate-700/50">
                        <tr>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Student</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Department</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Year/CGPA</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider min-w-[150px]">Attendance</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider min-w-[150px]">Risk Score</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.map((student, index) => (
                            <motion.tr
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                key={student.id}
                                className="border-b border-slate-800/40 hover:bg-slate-800/40 transition-colors group cursor-pointer"
                            >
                                {/* Student Info */}
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-indigo-500 flex items-center justify-center text-white font-semibold text-sm shadow-md">
                                            {student.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium text-slate-200 group-hover:text-blue-400 transition-colors">{student.name}</span>
                                            <span className="text-xs text-slate-500">{student.id}</span>
                                        </div>
                                    </div>
                                </td>

                                {/* Department */}
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="text-sm text-slate-300">{student.department}</span>
                                </td>

                                {/* Year & CGPA */}
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex flex-col">
                                        <span className="text-sm text-slate-300">{student.year} Year</span>
                                        <span className="text-xs font-semibold text-emerald-400 mt-0.5">{student.cgpa} CGPA</span>
                                    </div>
                                </td>

                                {/* Attendance Progress Bar */}
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center gap-3">
                                        <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-blue-500 rounded-full relative"
                                                style={{ width: `${student.attendance}%` }}
                                            >
                                                <div className="absolute inset-0 bg-white/20 w-full animate-pulse"></div>
                                            </div>
                                        </div>
                                        <span className="text-xs font-medium text-slate-300 w-8">{student.attendance}%</span>
                                    </div>
                                </td>

                                {/* Risk Progress Bar */}
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center gap-3">
                                        <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full rounded-full relative ${getRiskColor(student.riskLevel)}`}
                                                style={{ width: `${student.riskScore}%` }}
                                            >
                                            </div>
                                        </div>
                                        <span className="text-xs font-medium text-slate-300 w-8">{student.riskScore}%</span>
                                    </div>
                                </td>

                                {/* Status Badge */}
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <StatBadge status={student.riskLevel} />
                                </td>

                                {/* Action */}
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="text-slate-400 hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-blue-500/10"
                                    >
                                        <Eye size={18} />
                                    </motion.button>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>

                {currentData.length === 0 && (
                    <div className="w-full p-8 text-center text-slate-500">
                        No students found.
                    </div>
                )}
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-slate-800/60 flex items-center justify-between bg-slate-800/20">
                <span className="text-xs text-slate-400">
                    Showing <span className="text-white font-medium">{(currentPage - 1) * rowsPerPage + 1}</span> to <span className="text-white font-medium">{Math.min(currentPage * rowsPerPage, students.length)}</span> of <span className="text-white font-medium">{students.length}</span> results
                </span>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="p-1.5 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronLeft size={16} />
                    </button>
                    <div className="flex items-center gap-1">
                        {Array.from({ length: totalPages }).map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`w-7 h-7 rounded-lg text-xs font-medium transition-all ${currentPage === i + 1
                                        ? 'bg-blue-600 text-white shadow-[0_0_10px_rgba(37,99,235,0.3)] border border-blue-500'
                                        : 'text-slate-400 hover:bg-slate-800 hover:text-white border border-transparent'
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="p-1.5 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StudentsTable;
