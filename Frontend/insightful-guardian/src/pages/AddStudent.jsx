import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, ArrowLeft, Save, AlertCircle, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopNavbar from '../components/TopNavbar';
import { studentsAPI } from '../utils/api';

const AddStudent = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState({
        student_uid: '',
        college_code: '',
        dept_code: '',
        name: '',
        email: '',
        batch_year: new Date().getFullYear(),
        current_year: 1,
        current_semester: 1,
        attendance_rate: 0,
        avg_internal: 0,
        cgpa: 0,
        backlog_count: 0,
        fee_status: 'paid', // paid, unpaid, delayed
        normalized_engagement: 0, // 0 to 1
        scholarship_status: 'no', // yes, no
    });

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        let finalValue = value;

        // Parse numbers automatically for specified fields
        if (['student_uid', 'batch_year', 'current_year', 'current_semester', 'attendance_rate', 'backlog_count'].includes(name)) {
            finalValue = value ? parseInt(value, 10) : '';
        } else if (['avg_internal', 'cgpa', 'normalized_engagement'].includes(name)) {
            finalValue = value ? parseFloat(value) : '';
        }

        setFormData((prev) => ({
            ...prev,
            [name]: finalValue,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            await studentsAPI.addStudent(formData);
            setSuccess(true);
            setTimeout(() => {
                navigate('/students');
            }, 1500);
        } catch (err) {
            setError(err.message || 'Failed to add student');
        } finally {
            setLoading(false);
        }
    };

    const inputClass = "w-full bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors";
    const labelClass = "block text-sm font-medium text-slate-400 mb-1.5";

    return (
        <div className="flex h-screen bg-[#0a1128] overflow-hidden text-slate-200">
            <Sidebar />
            <div className="flex-1 flex flex-col relative overflow-hidden">
                {/* Background grids */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
                <div className="absolute top-[10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />

                <TopNavbar
                    title="Add Student"
                    subtitle="Register a new student for risk monitoring and prediction."
                />

                <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 lg:p-8 custom-scrollbar relative z-10 w-full">
                    <div className="max-w-4xl mx-auto flex flex-col gap-6">

                        <div className="flex items-center justify-between">
                            <button
                                type="button"
                                onClick={() => navigate('/students')}
                                className="flex items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors"
                            >
                                <ArrowLeft size={18} />
                                <span>Back to Students</span>
                            </button>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="w-full bg-slate-900/40 border border-slate-800/60 rounded-xl backdrop-blur-md overflow-hidden relative shadow-2xl"
                        >
                            <div className="h-1 w-full bg-gradient-to-r from-blue-600 to-indigo-500"></div>

                            <div className="p-6 lg:p-8">
                                <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-800">
                                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
                                        <UserPlus size={20} />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-semibold text-white">Student Information</h2>
                                        <p className="text-sm text-slate-400 mt-1">Enter academic and administrative details required for risk analysis.</p>
                                    </div>
                                </div>

                                {error && (
                                    <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 flex items-start gap-3">
                                        <AlertCircle className="text-red-400 shrink-0 mt-0.5" size={18} />
                                        <div className="text-sm text-red-200">{error}</div>
                                    </div>
                                )}

                                {success && (
                                    <div className="mb-6 p-4 rounded-lg bg-green-500/10 border border-green-500/20 flex items-start gap-3">
                                        <CheckCircle className="text-green-400 shrink-0 mt-0.5" size={18} />
                                        <div className="text-sm text-green-200">Student successfully added! Redirecting...</div>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                                    {/* Basic Identifiers */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className={labelClass}>Student UID (Number)</label>
                                            <input required type="number" min="1" name="student_uid" value={formData.student_uid} onChange={handleChange} className={inputClass} placeholder="e.g. 192837465" />
                                        </div>
                                        <div>
                                            <label className={labelClass}>Full Name</label>
                                            <input required type="text" minLength="2" maxLength="100" name="name" value={formData.name} onChange={handleChange} className={inputClass} placeholder="John Doe" />
                                        </div>
                                        <div>
                                            <label className={labelClass}>Email Address</label>
                                            <input required type="email" name="email" value={formData.email} onChange={handleChange} className={inputClass} placeholder="john.doe@college.edu" />
                                        </div>
                                        <div>
                                            <label className={labelClass}>College Code</label>
                                            <input required type="text" minLength="3" maxLength="20" name="college_code" value={formData.college_code} onChange={handleChange} className={inputClass} placeholder="e.g. COL-011" />
                                        </div>
                                        <div>
                                            <label className={labelClass}>Department Code</label>
                                            <input required type="text" minLength="2" maxLength="20" name="dept_code" value={formData.dept_code} onChange={handleChange} className={inputClass} placeholder="e.g. CSE" />
                                        </div>
                                        <div>
                                            <label className={labelClass}>Batch Year</label>
                                            <input required type="number" min="2000" max="2100" name="batch_year" value={formData.batch_year} onChange={handleChange} className={inputClass} placeholder="2025" />
                                        </div>
                                    </div>

                                    <div className="h-px w-full bg-slate-800 my-2"></div>

                                    {/* Academic Status */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div>
                                            <label className={labelClass}>Current Year (1-4)</label>
                                            <input required type="number" min="1" max="4" name="current_year" value={formData.current_year} onChange={handleChange} className={inputClass} />
                                        </div>
                                        <div>
                                            <label className={labelClass}>Current Semester (1-8)</label>
                                            <input required type="number" min="1" max="8" name="current_semester" value={formData.current_semester} onChange={handleChange} className={inputClass} />
                                        </div>
                                        <div>
                                            <label className={labelClass}>Attendance Rate (%)</label>
                                            <input required type="number" min="0" max="100" name="attendance_rate" value={formData.attendance_rate} onChange={handleChange} className={inputClass} placeholder="85" />
                                        </div>
                                        <div>
                                            <label className={labelClass}>Avg Internal Marks (0-100)</label>
                                            <input required type="number" step="0.01" min="0" max="100" name="avg_internal" value={formData.avg_internal} onChange={handleChange} className={inputClass} placeholder="75.5" />
                                        </div>
                                        <div>
                                            <label className={labelClass}>CGPA (0-10)</label>
                                            <input required type="number" step="0.01" min="0" max="10" name="cgpa" value={formData.cgpa} onChange={handleChange} className={inputClass} placeholder="8.5" />
                                        </div>
                                        <div>
                                            <label className={labelClass}>Backlog Count</label>
                                            <input required type="number" min="0" max="50" name="backlog_count" value={formData.backlog_count} onChange={handleChange} className={inputClass} placeholder="0" />
                                        </div>
                                    </div>

                                    <div className="h-px w-full bg-slate-800 my-2"></div>

                                    {/* Additional Metrics */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div>
                                            <label className={labelClass}>Fee Status</label>
                                            <select required name="fee_status" value={formData.fee_status} onChange={handleChange} className={inputClass}>
                                                <option value="paid">Paid</option>
                                                <option value="unpaid">Unpaid</option>
                                                <option value="delayed">Delayed</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className={labelClass}>Scholarship Status</label>
                                            <select required name="scholarship_status" value={formData.scholarship_status} onChange={handleChange} className={inputClass}>
                                                <option value="yes">Yes</option>
                                                <option value="no">No</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className={labelClass}>Engagement Score (0 to 1)</label>
                                            <input required type="number" step="0.01" min="0" max="1" name="normalized_engagement" value={formData.normalized_engagement} onChange={handleChange} className={inputClass} placeholder="0.85" />
                                        </div>
                                    </div>

                                    <div className="flex justify-end mt-6 gap-4">
                                        <button
                                            type="button"
                                            onClick={() => navigate('/students')}
                                            className="px-6 py-2.5 rounded-lg border border-slate-700 hover:bg-slate-800 text-slate-300 transition-colors"
                                            disabled={loading}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="flex items-center gap-2 px-8 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-500 hover:to-indigo-400 text-white font-medium shadow-[0_0_15px_rgba(37,99,235,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {loading ? (
                                                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                            ) : (
                                                <Save size={18} />
                                            )}
                                            <span>{loading ? 'Saving...' : 'Save Student'}</span>
                                        </button>
                                    </div>

                                </form>
                            </div>
                        </motion.div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AddStudent;
