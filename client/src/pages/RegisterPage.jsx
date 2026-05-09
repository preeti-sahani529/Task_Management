import React, { useState } from "react";
import { showToast } from "../helper/showToast";
import { useNavigate, Link } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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
        `${import.meta.env.VITE_API_BASE_URL}/auth/register`,
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

      showToast("success", responseData.message);
      navigate("/login");
    } catch (error) {
      showToast("error", error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl bg-white/10 border border-white/10 backdrop-blur-xl p-8 shadow-2xl">
        <h1 className="text-3xl font-bold text-white mb-6">Create Account</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            name="name"
            value={formData.name}
            onChange={handleInput}
            placeholder="Full Name"
            className="w-full rounded-2xl bg-white/10 border border-white/20 px-4 py-3 text-white"
          />

          <input
            name="email"
            value={formData.email}
            onChange={handleInput}
            placeholder="Email"
            className="w-full rounded-2xl bg-white/10 border border-white/20 px-4 py-3 text-white"
          />

          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInput}
            placeholder="Password"
            className="w-full rounded-2xl bg-white/10 border border-white/20 px-4 py-3 text-white"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold"
          >
            Register
          </button>
        </form>

        <p className="text-gray-300 mt-6 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-300">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;