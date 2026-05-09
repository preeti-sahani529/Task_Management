import React, { useState } from "react";
import { showToast } from "../helper/showToast";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      localStorage.setItem("token", responseData.token);

      showToast("success", responseData.message);

      navigate("/");
    } catch (error) {
      showToast("error", error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900">
      <div className="w-full max-w-5xl grid md:grid-cols-2 rounded-3xl overflow-hidden border border-white/10 shadow-2xl backdrop-blur-xl">

        {/* Left Section */}
        <div className="hidden md:flex flex-col justify-center p-10 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 backdrop-blur-xl border-r border-white/10">
          <div className="mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg mb-6">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  d="M9 12l2 2 4-4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <h1 className="text-5xl font-bold text-white mb-4">
              TaskFlow
            </h1>

            <p className="text-lg text-gray-300 leading-relaxed">
              Organize your work, manage deadlines, and stay productive effortlessly.
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="bg-white/10 backdrop-blur-xl p-8 md:p-12">
          <div className="max-w-md mx-auto">
            <h2 className="text-3xl font-bold text-white mb-2">
              Welcome Back
            </h2>

            <p className="text-gray-300 mb-8">
              Sign in to continue managing your tasks.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleInput}
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-2xl bg-white/10 border border-white/20 px-5 py-4 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-400 transition"
                />
              </div>

              <div>
                <input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInput}
                  placeholder="Enter your password"
                  className="w-full rounded-2xl bg-white/10 border border-white/20 px-5 py-4 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-400 transition"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-lg hover:scale-[1.02] transition duration-300"
              >
                Sign In
              </button>
            </form>

            <p className="text-gray-300 mt-8 text-center">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="text-indigo-300 font-medium hover:text-white transition"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;