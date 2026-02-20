import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RiskBadge = ({ score }) => {
    let colorClass = 'bg-green-500/10 text-green-400 border-green-500/20';
    let label = 'Low';

    if (score >= 80) {
        colorClass = 'bg-red-500/10 text-red-400 border-red-500/20';
        label = 'High';
    } else if (score >= 50) {
        colorClass = 'bg-orange-500/10 text-orange-400 border-orange-500/20';
        label = 'Medium';
    }

    return (
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${colorClass}`}>
            {label} ({score}%)
        </span>
    );
};

const DataTable = ({ data, delay = 0 }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const filteredData = data.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.department.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay, ease: "easeOut" }}
            className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-xl shadow-lg overflow-hidden flex flex-col h-full"
        >
            {/* Header */}
            <div className="p-5 border-b border-slate-700/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h3 className="text-white font-semibold flex items-center gap-2">
                    <div className="w-1.5 h-4 bg-red-500 rounded-full"></div>
                    High-Risk Students
                </h3>

                <div className="relative w-full sm:w-auto">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search students..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full sm:w-64 bg-slate-800/50 border border-slate-700/50 text-slate-200 text-sm rounded-lg pl-9 pr-4 py-2 focus:outline-none focus:border-red-500/50 transition-colors"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto flex-1 custom-scrollbar">
                <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead>
                        <tr className="bg-slate-800/30 text-slate-400 text-sm uppercase tracking-wider">
                            <th className="px-6 py-4 font-medium">Name</th>
                            <th className="px-6 py-4 font-medium">Department</th>
                            <th className="px-6 py-4 font-medium">Risk Level</th>
                            <th className="px-6 py-4 font-medium">Last Updated</th>
                            <th className="px-6 py-4 font-medium text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50 text-sm">
                        {filteredData.map((student, idx) => (
                            <motion.tr
                                key={student.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: delay + (idx * 0.1) }}
                                className="group hover:bg-slate-800/50 transition-colors"
                            >
                                <td className="px-6 py-4">
                                    <div className="font-medium text-slate-200">{student.name}</div>
                                    <div className="text-xs text-slate-500">{student.id}</div>
                                </td>
                                <td className="px-6 py-4 text-slate-300">{student.department}</td>
                                <td className="px-6 py-4"><RiskBadge score={student.riskScore} /></td>
                                <td className="px-6 py-4 text-slate-400">{student.lastUpdated}</td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors group-hover:underline decoration-blue-400/50 underline-offset-4">
                                        View
                                    </button>
                                </td>
                            </motion.tr>
                        ))}
                        {filteredData.length === 0 && (
                            <tr>
                                <td colSpan="5" className="px-6 py-8 text-center text-slate-500">
                                    No records found matching your search.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-700/50 bg-slate-800/20 text-center">
                <button
                    onClick={() => navigate('/students')}
                    className="text-slate-400 hover:text-white text-sm font-medium transition-colors flex items-center justify-center gap-1 mx-auto"
                >
                    View All Students <ChevronRight size={16} />
                </button>
            </div>
        </motion.div>
    );
};

export default DataTable;
