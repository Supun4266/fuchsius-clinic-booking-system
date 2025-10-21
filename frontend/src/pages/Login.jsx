import React from "react";

const Login = () => {
  return (
    <div className="min-h-screen bg-[#F7FAFC] flex flex-col font-inter">
      {/* Header */}
      <header className="w-full h-[65px] flex justify-between items-center border-b border-[#E5E8EB] px-6 md:px-10 py-3">
        {/* Left Logo Section */}
        <div className="flex items-center gap-3">
          <div className="w-4 h-4"></div>
          <h1 className="text-[#0D141C] font-bold text-[18px]">FUCHSIUS Clinic</h1>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-9 text-[#0D141C] font-medium text-[14px]">
            <li className="cursor-pointer hover:text-[#1280ED] transition">Home</li>
            <li className="cursor-pointer hover:text-[#1280ED] transition">Services</li>
            <li className="cursor-pointer hover:text-[#1280ED] transition">Doctors</li>
            <li className="cursor-pointer hover:text-[#1280ED] transition">Contact</li>
          </ul>
          <button className="bg-[#E8EDF2] text-[#0D141C] font-bold text-[14px] rounded-lg px-4 py-2 hover:bg-[#d8e0e9] transition">
            Sign Up
          </button>
        </nav>

        {/* Mobile Menu Button (optional visual only) */}
        <button className="md:hidden border border-[#CFDBE8] px-3 py-1 rounded text-[#0D141C] text-sm">
          ☰
        </button>
      </header>

      {/* Main Login Section */}
      <main className="flex flex-col items-center justify-center flex-1 px-4 py-10">
        <div className="w-full max-w-[480px] text-center">
          {/* Title */}
          <h2 className="text-[#0D141C] text-[28px] font-bold mb-6">
            Welcome Back
          </h2>

          {/* Email Field */}
          <div className="mb-4 text-left">
            <label className="block text-[#0D141C] font-medium text-[16px] mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter  your email"
              className="w-full border border-[#CFDBE8] bg-[#F7FAFC] rounded-lg p-3 text-[16px] text-[#4D7399] placeholder-[#4D7399] outline-none focus:ring-2 focus:ring-[#1280ED]"
            />
          </div>

          {/* Password Field */}
          <div className="mb-2 text-left">
            <label className="block text-[#0D141C] font-medium text-[16px] mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter  your password"
              className="w-full border border-[#CFDBE8] bg-[#F7FAFC] rounded-lg p-3 text-[16px] text-[#4D7399] placeholder-[#4D7399] outline-none focus:ring-2 focus:ring-[#1280ED]"
            />
          </div>

          {/* Forgot Password */}
          <div className="text-right text-[#4D7399] text-[14px] mb-4 cursor-pointer hover:text-[#1280ED] transition">
            Forgot Password?
          </div>

          {/* Login Button */}
          <button className="w-full bg-[#1280ED] text-[#F7FAFC] font-bold text-[14px] py-2 rounded-lg hover:bg-[#0f6bcc] transition">
            Login
          </button>

          {/* Sign Up link */}
          <p className="text-center text-[#4D7399] text-[14px] mt-4">
            Don’t have an account?{" "}
            <span className="cursor-pointer text-[#1280ED] font-medium hover:underline">
              Sign Up
            </span>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Login;
