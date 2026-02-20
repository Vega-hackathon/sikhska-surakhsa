import React from 'react';
import HeroSection from '../components/HeroSection';
import LoginCard from '../components/LoginCard';
import AnimatedBackground from '../components/AnimatedBackground';

const Login = () => {
    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-primary-dark">
            <AnimatedBackground />

            {/* Main Content Container */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-24">

                {/* Left Side: Hero Section */}
                <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
                    <HeroSection />
                </div>

                {/* Right Side: Login Card */}
                <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                    <LoginCard />
                </div>

            </div>
        </div>
    );
};

export default Login;
