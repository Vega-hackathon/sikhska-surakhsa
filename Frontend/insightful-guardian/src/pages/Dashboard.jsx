import React, { useEffect, useState } from 'react';
import { Users, AlertTriangle, AlertCircle, CheckCircle } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import TopNavbar from '../components/TopNavbar';
import StatCard from '../components/StatCard';
import { DonutChartCard, StackedBarChartCard, LineChartCard } from '../components/ChartCard';
import DataTable from '../components/DataTable';
import InsightsCard from '../components/InsightsCard';
import { dashboardAPI } from '../utils/api';
import {
    riskDistributionData as mockRiskDistribution,
    departmentRiskData as mockDepartmentRisk,
    semesterTrendData as mockSemesterTrend,
    highRiskStudentsData as mockHighRiskStudents
} from '../data/mockData';
const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dashboardAPI.getStats()
            .then(data => {
                setStats(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Dashboard API Error:", err);
                setLoading(false);
            });
    }, []);

    const riskDistributionData = stats ? [
        { name: 'Low Risk', value: stats.risk_counts.LOW, color: '#22c55e' },
        { name: 'Medium Risk', value: stats.risk_counts.MEDIUM, color: '#f97316' },
        { name: 'High Risk', value: stats.risk_counts.HIGH, color: '#ef4444' },
    ] : mockRiskDistribution;

    const semesterTrendData = stats ? stats.semester_trend.map(s => ({
        name: `Sem ${s.semester}`,
        HighRisk: s.HIGH,
        MediumRisk: s.MEDIUM,
        LowRisk: s.LOW
    })) : mockSemesterTrend;

    const totalStudents = stats ? stats.total_students.toLocaleString() : "5,240";
    const highRisk = stats ? stats.risk_counts.HIGH.toLocaleString() : "482";
    const medRisk = stats ? stats.risk_counts.MEDIUM.toLocaleString() : "894";
    const lowRisk = stats ? stats.risk_counts.LOW.toLocaleString() : "3,864";

    return (
        <div className="flex h-screen bg-[#0a1128] overflow-hidden text-slate-200">
            {/* Sidebar (Desktop) */}
            <Sidebar />

            <div className="flex-1 flex flex-col relative overflow-hidden">
                {/* Background Grid Accent */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
                <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />

                <TopNavbar />

                {/* Main Scrollable Content */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 lg:p-8 custom-scrollbar relative z-10 w-full">
                    <div className="max-w-7xl mx-auto flex flex-col gap-6 lg:gap-8 pb-10">

                        {/* Stats Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                            <StatCard title="Total Students" value={totalStudents} change={2.6} icon={Users} color="blue" delay={0.1} />
                            <StatCard title="High Risk" value={highRisk} change={8.2} icon={AlertTriangle} color="red" delay={0.2} />
                            <StatCard title="Medium Risk" value={medRisk} change={1.8} icon={AlertCircle} color="orange" delay={0.3} />
                            <StatCard title="Low Risk" value={lowRisk} change={1.4} icon={CheckCircle} color="green" delay={0.4} />
                        </div>

                        {/* Charts Row */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
                            <div className="col-span-1 min-h-[350px]">
                                <DonutChartCard title="Dropout Risk Distribution" data={riskDistributionData} delay={0.3} />
                            </div>
                            <div className="col-span-1 lg:col-span-1 min-h-[350px]">
                                <StackedBarChartCard title="Risk by Department" data={mockDepartmentRisk} delay={0.4} />
                            </div>
                            <div className="col-span-1 lg:col-span-1 min-h-[350px]">
                                <LineChartCard title="Trend Over Semesters" data={semesterTrendData} delay={0.5} />
                            </div>
                        </div>

                        {/* Data Table & Insights Row */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
                            <div className="col-span-1 lg:col-span-2 min-h-[400px]">
                                <DataTable data={mockHighRiskStudents} delay={0.5} />
                            </div>
                            <div className="col-span-1 min-h-[400px]">
                                <InsightsCard delay={0.6} />
                            </div>
                        </div>

                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
