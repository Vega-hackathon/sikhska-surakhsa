import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts';

// Shared card wrapper for aesthetics
const CardWrapper = ({ title, children, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay, ease: "easeOut" }}
        className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-xl p-5 shadow-lg flex flex-col h-full"
    >
        <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
            <div className="w-1.5 h-4 bg-blue-500 rounded-full"></div>
            {title}
        </h3>
        <div className="flex-1 w-full min-h-[250px]">
            {children}
        </div>
    </motion.div>
);

// Custom Tooltip style for premium feel
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-slate-800/90 backdrop-blur-md border border-slate-700 p-3 rounded-lg shadow-xl">
                <p className="text-slate-300 font-medium text-sm mb-2">{label}</p>
                {payload.map((entry, index) => (
                    <p key={index} className="text-sm font-semibold flex items-center gap-2" style={{ color: entry.color }}>
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></span>
                        {entry.name}: {entry.value}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

export const DonutChartCard = ({ title, data, delay }) => (
    <CardWrapper title={title} delay={delay}>
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                    verticalAlign="bottom"
                    height={36}
                    formatter={(value) => <span className="text-slate-300 text-sm ml-1">{value}</span>}
                />
            </PieChart>
        </ResponsiveContainer>
    </CardWrapper>
);

export const StackedBarChartCard = ({ title, data, delay }) => (
    <CardWrapper title={title} delay={delay}>
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                data={data}
                layout="vertical"
                margin={{ top: 0, right: 30, left: 40, bottom: 0 }}
            >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#334155" opacity={0.5} />
                <XAxis type="number" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} width={100} />
                <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} content={<CustomTooltip />} />
                <Legend
                    verticalAlign="bottom"
                    formatter={(value) => <span className="text-slate-300 text-sm ml-1">{value}</span>}
                />
                <Bar dataKey="Low" stackId="a" fill="#22c55e" radius={[2, 0, 0, 2]} maxBarSize={20} />
                <Bar dataKey="Medium" stackId="a" fill="#f97316" maxBarSize={20} />
                <Bar dataKey="High" stackId="a" fill="#ef4444" radius={[0, 2, 2, 0]} maxBarSize={20} />
            </BarChart>
        </ResponsiveContainer>
    </CardWrapper>
);

export const LineChartCard = ({ title, data, delay }) => (
    <CardWrapper title={title} delay={delay}>
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                data={data}
                margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.5} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} padding={{ left: 15, right: 15 }} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                    verticalAlign="bottom"
                    formatter={(value) => <span className="text-slate-300 text-sm ml-1">{value}</span>}
                />
                <Line type="monotone" dataKey="HighRisk" name="High Risk" stroke="#ef4444" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6, strokeWidth: 0 }} />
                <Line type="monotone" dataKey="MediumRisk" name="Medium Risk" stroke="#f97316" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6, strokeWidth: 0 }} />
                <Line type="monotone" dataKey="LowRisk" name="Low Risk" stroke="#22c55e" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6, strokeWidth: 0 }} />
            </LineChart>
        </ResponsiveContainer>
    </CardWrapper>
);
