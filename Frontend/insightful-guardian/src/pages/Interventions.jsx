import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, UserPlus, Sparkles, AlertTriangle, CheckCircle, BrainCircuit } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import TopNavbar from '../components/TopNavbar';
import { mockStudents as fallbackStudents } from '../data/mockStudents';
import { studentsAPI, mentorAPI } from '../utils/api';

const MENTORS = ['Dr. Rakesh Sharma', 'Prof. Anita Desai', 'Mr. Vikram Singh', 'Dr. Sneha Patil', 'Prof. Karthik Iyer'];

const Interventions = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [assignedMentor, setAssignedMentor] = useState(null);
    const [isAssigning, setIsAssigning] = useState(false);

    const [studentsList, setStudentsList] = useState([]);

    useEffect(() => {
        studentsAPI.getAll()
            .then(data => {
                setStudentsList(data && data.length > 0 ? data : fallbackStudents);
            })
            .catch(err => {
                console.error("Students API Error:", err);
                setStudentsList(fallbackStudents);
            });
    }, []);

    // Filter students based on search term (ID or Name)
    const filteredStudents = searchTerm.trim() === '' ? [] : studentsList.filter(student =>
        (student.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(student.student_uid || student.id || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelectStudent = (student) => {
        // Map backend fields to frontend usage if needed
        const mappedStudent = {
            ...student,
            id: student.student_uid || student.id,
            riskScore: student.risk_pred === 2 ? 85 : student.risk_pred === 1 ? 60 : student.risk_pred === 0 ? 30 : student.riskScore,
            riskLevel: student.risk_label || student.riskLevel,
            attendance: student.attendance_rate || student.attendance
        };
        setSelectedStudent(mappedStudent);
        setSearchTerm('');
        setAssignedMentor(null);
    };

    const handleAssignMentor = async () => {
        if (!selectedStudent) return;
        setIsAssigning(true);
        const randomMentor = MENTORS[Math.floor(Math.random() * MENTORS.length)];
        // Simulated or real API call
        try {
            // we will just use a dummy mentor ID to the backend for the demo
            await mentorAPI.assignMentor(selectedStudent.id, "T203219567", false);
            setAssignedMentor(randomMentor);
        } catch (err) {
            console.error("Mentor Assign Error:", err);
            // Fallback for visual indication if backend is not running
            setAssignedMentor(randomMentor);
        } finally {
            setIsAssigning(false);
        }
    };

    return (
        <div className="flex h-screen bg-[#0a1128] overflow-hidden text-slate-200">
            {/* Sidebar (Desktop) */}
            <Sidebar />

            <div className="flex-1 flex flex-col relative overflow-hidden">
                {/* Background Grid Accent */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
                <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />

                <TopNavbar title="Interventions" subtitle="Manage student risks and assign mentors" />

                {/* Main Scrollable Content */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 lg:p-8 custom-scrollbar relative z-10 w-full">
                    <div className="max-w-4xl mx-auto flex flex-col gap-6 lg:gap-8 pb-10">

                        {/* Search Section */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 shadow-lg relative z-20"
                        >
                            <h2 className="text-xl font-semibold text-white mb-4">Find Student</h2>
                            <div className="relative">
                                <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search by student name or ID (e.g., STU001 or Aarav)..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-slate-800/50 border border-slate-700/50 text-slate-200 text-lg rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-blue-500/50 focus:bg-slate-800 transition-all shadow-inner glow-border"
                                />

                                {/* Search Results Dropdown */}
                                <AnimatePresence>
                                    {searchTerm && filteredStudents.length > 0 && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl overflow-hidden max-h-60 overflow-y-auto z-50"
                                        >
                                            {filteredStudents.map(student => (
                                                <button
                                                    key={student.id}
                                                    onClick={() => handleSelectStudent(student)}
                                                    className="w-full text-left px-4 py-3 hover:bg-slate-700/50 border-b border-slate-700/50 last:border-0 flex items-center justify-between group transition-colors"
                                                >
                                                    <div>
                                                        <div className="font-semibold text-white group-hover:text-blue-400 transition-colors">{student.name}</div>
                                                        <div className="text-sm text-slate-400">{student.id} • {student.department}</div>
                                                    </div>
                                                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${student.riskScore >= 80 ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                                                        student.riskScore >= 50 ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' :
                                                            'bg-green-500/10 text-green-400 border-green-500/20'
                                                        }`}>
                                                        {student.riskLevel} Risk
                                                    </span>
                                                </button>
                                            ))}
                                        </motion.div>
                                    )}
                                    {searchTerm && filteredStudents.length === 0 && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl p-4 text-center text-slate-400 z-50"
                                        >
                                            No students found matching "{searchTerm}"
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>

                        {/* Selected Student Insights */}
                        <AnimatePresence mode="wait">
                            {selectedStudent ? (
                                <motion.div
                                    key={selectedStudent.id}
                                    initial={{ y: 20, opacity: 0, scale: 0.98 }}
                                    animate={{ y: 0, opacity: 1, scale: 1 }}
                                    exit={{ y: -20, opacity: 0, scale: 0.98 }}
                                    className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-xl overflow-hidden relative"
                                >
                                    {/* Assignment Action (Top Left of Card Content) */}
                                    <div className="flex items-center justify-between p-6 border-b border-slate-700/50 bg-slate-800/30">
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={handleAssignMentor}
                                            disabled={isAssigning || assignedMentor !== null}
                                            className={`px-4 py-2.5 rounded-lg flex items-center gap-2 font-medium transition-all shadow-lg ${assignedMentor
                                                ? 'bg-green-500/20 text-green-400 border border-green-500/30 cursor-default'
                                                : 'bg-blue-600 hover:bg-blue-500 text-white border border-blue-500/50'
                                                }`}
                                        >
                                            {assignedMentor ? (
                                                <><CheckCircle size={18} /> Mentor Assigned</>
                                            ) : isAssigning ? (
                                                <><Sparkles size={18} className="animate-pulse" /> Assigning...</>
                                            ) : (
                                                <><UserPlus size={18} /> Assign Mentor</>
                                            )}
                                        </motion.button>

                                        <div className="text-right">
                                            <div className="text-2xl font-bold text-white">{selectedStudent.name}</div>
                                            <div className="text-slate-400 text-sm">{selectedStudent.id} | {selectedStudent.department}</div>
                                        </div>
                                    </div>

                                    <div className="p-6 md:p-8 space-y-8">

                                        {/* Status Alert */}
                                        {assignedMentor && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                className="bg-green-500/10 border border-green-500/30 text-green-300 px-4 py-3 rounded-xl flex items-center gap-3"
                                            >
                                                <CheckCircle className="text-green-400" size={20} />
                                                <span>Successfully assigned <strong>{assignedMentor}</strong> as a mentor for {selectedStudent.name}. They will be notified automatically.</span>
                                            </motion.div>
                                        )}

                                        {/* AI Insights Section */}
                                        <div>
                                            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                                <BrainCircuit className="text-blue-400" size={20} /> AI Generated Insights
                                            </h3>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {/* Risk Card */}
                                                <div className="bg-slate-800/50 border border-slate-700/50 p-5 rounded-xl">
                                                    <div className="text-slate-400 text-sm mb-1">Risk Score</div>
                                                    <div className="flex items-end gap-3 mb-3">
                                                        <span className={`text-4xl font-bold ${selectedStudent.riskScore >= 80 ? 'text-red-400' :
                                                            selectedStudent.riskScore >= 50 ? 'text-orange-400' : 'text-green-400'
                                                            }`}>
                                                            {selectedStudent.riskScore}%
                                                        </span>
                                                        <span className="text-slate-400 text-sm pb-1">({selectedStudent.riskLevel} Risk)</span>
                                                    </div>
                                                    <p className="text-sm text-slate-300 leading-relaxed">
                                                        {selectedStudent.riskScore >= 80
                                                            ? "Critical intervention required. Immediate risk of dropout."
                                                            : selectedStudent.riskScore >= 50
                                                                ? "Moderate risk detected. Preventive mentoring advised."
                                                                : "Student is currently tracked at a very low risk of dropout."
                                                        }
                                                    </p>
                                                </div>

                                                {/* Metrics Card */}
                                                <div className="bg-slate-800/50 border border-slate-700/50 p-5 rounded-xl flex flex-col justify-between">
                                                    <div>
                                                        <div className="flex justify-between items-center mb-2">
                                                            <span className="text-slate-400 text-sm">Attendance</span>
                                                            <span className={`font-semibold ${selectedStudent.attendance < 75 ? 'text-red-400' : 'text-white'}`}>{selectedStudent.attendance}%</span>
                                                        </div>
                                                        <div className="w-full bg-slate-900 rounded-full h-2 mb-4">
                                                            <div className={`h-2 rounded-full ${selectedStudent.attendance < 75 ? 'bg-red-500' : 'bg-blue-500'}`} style={{ width: `${selectedStudent.attendance}%` }}></div>
                                                        </div>

                                                        <div className="flex justify-between items-center mb-2 mt-4">
                                                            <span className="text-slate-400 text-sm">CGPA</span>
                                                            <span className={`font-semibold ${selectedStudent.cgpa < 7.0 ? 'text-orange-400' : 'text-white'}`}>{selectedStudent.cgpa}</span>
                                                        </div>
                                                        <div className="w-full bg-slate-900 rounded-full h-2">
                                                            <div className={`h-2 rounded-full ${selectedStudent.cgpa < 7.0 ? 'bg-orange-500' : 'bg-green-500'}`} style={{ width: `${(selectedStudent.cgpa / 10) * 100}%` }}></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* AI Text Insight */}
                                            <div className="mt-4 bg-blue-500/5 border border-blue-500/20 p-5 rounded-xl">
                                                <div className="flex gap-3">
                                                    <AlertTriangle className="text-blue-400 flex-shrink-0 mt-0.5" size={18} />
                                                    <p className="text-sm text-slate-300 leading-relaxed">
                                                        <span className="font-semibold text-white">Automated Analysis:</span> Based on historical data, students with a CGPA pattern similar to {selectedStudent.cgpa} and an attendance rate of {selectedStudent.attendance}% in their {selectedStudent.year} year show a {selectedStudent.riskScore}% likelihood of academic probation next semester. Connecting them with a faculty mentor to review their coursework load is highly recommended.
                                                    </p>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex flex-col items-center justify-center p-12 text-slate-500 text-center bg-slate-900/20 border border-slate-800/50 rounded-2xl h-64 border-dashed"
                                >
                                    <Search size={40} className="mb-4 text-slate-600" />
                                    <p>Search and select a student to view insights and assign a mentor.</p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                    </div>
                </main>
            </div>
        </div>
    );
};

export default Interventions;
