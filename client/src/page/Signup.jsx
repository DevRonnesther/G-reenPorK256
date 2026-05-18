import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { PiggyBankIcon } from "lucide-react";
import bgImage from "../assets/pexels-sejio402-29274607.jpg";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const response = await fetch("http://localhost:3001/login-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        navigate("/layout");
        setAlert({ type: "success", message: "Login successful!" });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 via-white to-red-50 px-4">

      {/* MAIN CARD */}
      <div className="w-full max-w-6xl bg-white shadow-2xl rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">

        {/* LEFT IMAGE SIDE */}
        <div className="relative hidden lg:block">
          <img
            src={bgImage}
            alt="Login"
            className="w-full h-full object-cover scale-105"
          />

          {/* overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-red-600/80 to-black/40" />

          {/* text */}
          <div className="absolute inset-0 flex items-center justify-center text-center px-6">
            <h1 className="text-white text-4xl font-extrabold leading-snug">
              Welcome Back to <br />
              <span className="text-yellow-400">GreenPork</span>
            </h1>
          </div>
        </div>

        {/* RIGHT FORM SIDE */}
        <div className="flex items-center justify-center p-6 sm:p-10 lg:p-14">

          <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">

            {/* HEADER */}
            <div className="text-center mb-10">
              <div className="w-14 h-14 mx-auto bg-red-500 text-white flex items-center justify-center rounded-2xl shadow-lg mb-4">
                GP
              </div>

              <h2 className="text-3xl font-extrabold text-gray-800">
                Login
              </h2>

              <p className="text-gray-500 text-sm mt-2">
                Access your GreenPork account
              </p>
            </div>

            {/* EMAIL */}
            <div className="mb-5">
              <label className="text-sm font-medium text-gray-700">
                Email
              </label>

              <input
                type="email"
                placeholder="johndoe@gmail.com"
                {...register("email", { required: "Email is required" })}
                className={`w-full mt-2 p-3 rounded-xl border outline-none focus:ring-2 focus:ring-red-400 transition ${errors.email ? "border-red-500" : "border-gray-200"
                  }`}
              />

              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* PASSWORD */}
            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>

              <input
                type="password"
                placeholder="********"
                {...register("password", {
                  required: "Password is required",
                })}
                className={`w-full mt-2 p-3 rounded-xl border outline-none focus:ring-2 focus:ring-red-400 transition ${errors.password ? "border-red-500" : "border-gray-200"
                  }`}
              />

              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* FORGOT */}
            <div className="text-right mb-6">
              <Link
                to="/forgot-password"
                className="text-sm text-red-500 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            {/* CTA BUTTON (IMPROVED) */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-bold text-white
              bg-gradient-to-r from-red-500 to-red-600
              hover:from-red-600 hover:to-red-700
              shadow-lg hover:shadow-red-300/40
              transition-all duration-300 active:scale-95"
            >
              {loading ? "Processing..." : "Login"}
            </button>

            {/* SIGNUP */}
            <p className="text-center text-sm text-gray-500 mt-6">
              Don’t have an account?{" "}
              <Link
                to="/Register"
                className="text-red-500 font-semibold hover:underline"
              >
                Register
              </Link>
            </p>

            {/* ALERT */}
            {alert && (
              <div className="mt-4 text-center text-green-600 text-sm">
                {alert.message}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;