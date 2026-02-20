import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopNavbar from '../components/TopNavbar';
import SortBar from '../components/SortBar';
import StudentsTable from '../components/StudentsTable';
import { studentsAPI } from '../utils/api';
import { mockStudents as fallbackStudents } from '../data/mockStudents';

const Students = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSort, setCurrentSort] = useState('id');
  const [sortDirection, setSortDirection] = useState('asc');

  // ✅ SINGLE useEffect (FIXED)
  useEffect(() => {
    setLoading(true);

    const sortMap = {
      id: 'id',
      cgpa: 'gpa',
      risk: 'risk',
      attendance: 'id', // backend doesn't support attendance yet
    };

    studentsAPI
      .getAll(sortMap[currentSort] || 'id', sortDirection)
      .then((data) => {
        if (data && data.length > 0) {
          const mappedData = data.map(student => ({
            id: student.student_uid || student.id,
            name: student.name,
            department: student.dept_code || student.department,
            year: student.current_year || student.year,
            cgpa: student.cgpa,
            attendance: student.attendance_rate || student.attendance || 0,
            riskScore: student.riskScore || (student.risk_label === "HIGH" ? 85 : student.risk_label === "MEDIUM" ? 50 : 15),
            riskLevel: student.risk_label ? student.risk_label.charAt(0).toUpperCase() + student.risk_label.slice(1).toLowerCase() : student.riskLevel,
          }));
          setStudents(mappedData);
        } else {
          setStudents(fallbackStudents);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Students API Error:', err);
        setStudents(fallbackStudents);
        setLoading(false);
      });
  }, [currentSort, sortDirection]);

  // Handle sort state flip
  const handleSortChange = (sortId) => {
    if (currentSort === sortId) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setCurrentSort(sortId);
      setSortDirection('asc');
    }
  };

  // Client-side sorting fallback
  const sortedStudents = useMemo(() => {
    return [...students].sort((a, b) => {
      let valA = currentSort === 'risk' ? a.riskScore : a[currentSort];
      let valB = currentSort === 'risk' ? b.riskScore : b[currentSort];

      if (typeof valA === 'string' && typeof valB === 'string') {
        return sortDirection === 'asc'
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      }

      return sortDirection === 'asc' ? valA - valB : valB - valA;
    });
  }, [students, currentSort, sortDirection]); // ✅ also fixed missing dep

  return (
    <div className="flex h-screen bg-[#0a1128] overflow-hidden text-slate-200">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1 flex flex-col relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        <div className="absolute top-[10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />

        {/* Top Navbar */}
        <TopNavbar
          title="Students"
          subtitle="Monitor students and their dropout risk status."
        />

        {/* Main */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 lg:p-8 custom-scrollbar relative z-10 w-full">
          <div className="max-w-[1600px] mx-auto flex flex-col gap-6">
            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between w-full">
              <motion.button
                onClick={() => navigate('/add-student')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-500 hover:to-indigo-400 text-white font-medium shadow-[0_4px_15px_rgba(37,99,235,0.4)] hover:shadow-[0_4px_20px_rgba(59,130,246,0.6)] transition-all pointer-events-auto z-20 relative border border-blue-400/30 glow-border"
              >
                <Plus size={18} />
                <span>Add Student</span>
              </motion.button>

              {/* Sort Bar */}
              <SortBar
                currentSort={currentSort}
                sortDirection={sortDirection}
                onSortChange={handleSortChange}
              />
            </div>

            {/* Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full relative z-20"
            >
              <StudentsTable students={sortedStudents} />
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Students;