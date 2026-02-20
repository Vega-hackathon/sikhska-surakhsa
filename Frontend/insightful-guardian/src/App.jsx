import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Interventions from './pages/Interventions';
import AddStudent from './pages/AddStudent';

function App() {
    return (
        <div className="w-full min-h-screen">
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/students" element={<Students />} />
                <Route path="/add-student" element={<AddStudent />} />
                <Route path="/interventions" element={<Interventions />} />
            </Routes>
        </div>
    );
}

export default App;
