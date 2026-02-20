// Mock data for Dashboard Charts and Tables

export const riskDistributionData = [
    { name: 'Low Risk', value: 47, color: '#22c55e' }, // Green
    { name: 'Medium Risk', value: 34, color: '#f97316' }, // Orange
    { name: 'High Risk', value: 19, color: '#ef4444' }, // Red
];

export const departmentRiskData = [
    { name: 'Computer Science', Low: 400, Medium: 200, High: 50 },
    { name: 'Information Tech', Low: 350, Medium: 180, High: 70 },
    { name: 'Civil Eng.', Low: 200, Medium: 150, High: 120 },
    { name: 'Electronics', Low: 300, Medium: 120, High: 40 },
    { name: 'Mechanical', Low: 250, Medium: 190, High: 90 },
];

export const semesterTrendData = [
    { name: 'Sem 1', HighRisk: 120, MediumRisk: 250, LowRisk: 420 },
    { name: 'Sem 2', HighRisk: 140, MediumRisk: 280, LowRisk: 480 },
    { name: 'Sem 3', HighRisk: 190, MediumRisk: 300, LowRisk: 450 },
    { name: 'Sem 4', HighRisk: 230, MediumRisk: 340, LowRisk: 490 },
    { name: 'Sem 5', HighRisk: 482, MediumRisk: 894, LowRisk: 3864 }, // Past spike
    { name: 'Sem 6', HighRisk: 510, MediumRisk: 930, LowRisk: 3750 },
    { name: 'Sem 7', HighRisk: 450, MediumRisk: 820, LowRisk: 3850 },
    { name: 'Sem 8', HighRisk: 380, MediumRisk: 750, LowRisk: 3950 },
];

export const highRiskStudentsData = [
    { id: 'STU001', name: 'Aarav Patel', department: 'Civil Eng.', riskScore: 88, lastUpdated: '2 hours ago' },
    { id: 'STU002', name: 'Neha Sharma', department: 'Information Tech', riskScore: 85, lastUpdated: '5 hours ago' },
    { id: 'STU003', name: 'Rohan Gupta', department: 'Mechanical', riskScore: 81, lastUpdated: '1 day ago' },
    { id: 'STU004', name: 'Priya Singh', department: 'Computer Science', riskScore: 79, lastUpdated: '2 days ago' },
    { id: 'STU005', name: 'Aditya Desai', department: 'Civil Eng.', riskScore: 77, lastUpdated: '3 days ago' },
];
