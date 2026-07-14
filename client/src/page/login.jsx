import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import {
  PiggyBankIcon,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

import bgImage from "../assets/pexels-pedrofurtadoo-30500753.jpg";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:3001/login-user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        navigate("/layout");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen h-full bg-[#FAFAFA] overflow-hidden flex items-center justify-center lg:px-4 lg:py-10">

      {/* PREMIUM BACKGROUND */}
      <div className="absolute inset-0 -z-10">

        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-red-100 blur-[140px]" />

        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-orange-100 blur-[140px]" />
      </div>

      {/* MAIN CARD */}
      <div className="w-full min-h-screen lg:min-h-0 lg:max-w-7xl bg-white lg:border lg:border-gray-200 rounded-none lg:rounded-[40px] overflow-hidden lg:shadow-2xl grid grid-cols-1 lg:grid-cols-2">

        {/* LEFT SIDE — desktop only */}
        <div className="relative hidden lg:flex overflow-hidden">

          <img
            src={bgImage}
            alt="GreenPork"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-red-900/50 to-red-600/40" />

          {/* CONTENT */}
          <div className="relative z-10 flex flex-col justify-between p-14 text-white w-full">

            {/* TOP */}
            <div>

              <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center mb-8">

                <PiggyBankIcon className="w-8 h-8 text-white" />
              </div>

              <p className="uppercase tracking-[4px] text-sm text-red-200 font-bold mb-5">
                Welcome Back
              </p>

              <h1 className="text-6xl font-black leading-tight">

                Premium Food
                <span className="block text-red-400">
                  Experience
                </span>
              </h1>

              <p className="mt-8 text-white/80 text-lg leading-relaxed max-w-md">
                Login to continue ordering fresh meals,
                premium pork dishes, and fast delivery
                from GreenPork.
              </p>
            </div>

            {/* BOTTOM FEATURES */}
            <div className="space-y-5">

              <div className="flex items-center gap-4 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-4">

                <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-red-300" />
                </div>

                <div>
                  <h4 className="font-bold text-lg">
                    Secure Login
                  </h4>

                  <p className="text-white/70 text-sm">
                    Your information is always protected.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-4">

                <div className="w-12 h-12 rounded-xl bg-orange-400/20 flex items-center justify-center">
                  <ArrowRight className="w-6 h-6 text-orange-300" />
                </div>

                <div>
                  <h4 className="font-bold text-lg">
                    Fast Ordering
                  </h4>

                  <p className="text-white/70 text-sm">
                    Continue where you left off instantly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE / MOBILE FORM SCREEN */}
        <div className="flex flex-col min-h-screen lg:min-h-0 lg:items-center lg:justify-center px-6 py-8 sm:px-10 lg:p-14">

          {/* MOBILE-ONLY COMPACT BRAND STRIP — fills the identity the hidden left panel carries on desktop */}
          <div className="flex lg:hidden items-center gap-3 mb-8">
            <div className="w-11 h-11 rounded-xl bg-red-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-red-200">
              <PiggyBankIcon className="text-white w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[2px] text-red-500">Welcome Back</p>
              <p className="text-sm font-bold text-gray-900 -mt-0.5">GreenPork</p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-md mx-auto flex-1 lg:flex-none flex flex-col justify-center"
          >

            {/* HEADER */}
            <div className="mb-8 lg:mb-10">

              <div className="hidden lg:flex justify-center mb-6">

                <div className="w-16 h-16 rounded-2xl bg-red-600 flex items-center justify-center shadow-xl">

                  <PiggyBankIcon className="text-white w-8 h-8" />
                </div>
              </div>

              <h2 className="text-3xl lg:text-4xl font-black text-gray-900 text-center lg:text-center">
                Sign In
              </h2>

              <p className="text-center text-gray-500 mt-3 lg:mt-4 text-base lg:text-lg">
                Welcome back to GreenPork
              </p>
            </div>

            {/* EMAIL */}
            <div className="mb-5 lg:mb-6">

              <label className="text-sm font-bold text-gray-700 mb-3 block">
                Email Address
              </label>

              <input
                type="email"
                placeholder="you@example.com"
                {...register("email", {
                  required: "Email is required",
                })}
                className={`w-full px-5 py-4 rounded-2xl border bg-gray-50 outline-none transition-all duration-300 focus:ring-4 focus:ring-red-100 focus:border-red-500 ${errors.email
                  ? "border-red-500"
                  : "border-gray-200"
                  }`}
              />

              {errors.email && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* PASSWORD */}
            <div className="mb-5">

              <label className="text-sm font-bold text-gray-700 mb-3 block">
                Password
              </label>

              <div className="relative">

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className={`w-full px-5 py-4 rounded-2xl border bg-gray-50 outline-none transition-all duration-300 focus:ring-4 focus:ring-red-100 focus:border-red-500 ${errors.password
                    ? "border-red-500"
                    : "border-gray-200"
                    }`}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>

              {errors.password && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* OPTIONS */}
            <div className="flex items-center justify-between mb-8 flex-wrap gap-3">

              <label className="flex items-center gap-3 text-gray-500 text-sm">

                <input
                  type="checkbox"
                  className="accent-red-600 w-4 h-4"
                />

                Remember me
              </label>

              <Link
                to="/forgot-password"
                className="text-red-600 hover:text-red-700 font-semibold text-sm transition-colors"
              >
                Forgot Password?
              </Link>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-4 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-red-300/40 hover:scale-[1.01] disabled:opacity-60 flex items-center justify-center gap-3"
            >
              {loading ? (
                "Logging in..."
              ) : (
                <>
                  Login
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            {/* DIVIDER */}
            <div className="relative my-8">

              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>

              <div className="relative flex justify-center">
                <span className="bg-white px-4 text-gray-400 text-sm">
                  GreenPork
                </span>
              </div>
            </div>

            {/* SIGNUP */}
            <p className="text-center text-gray-500 text-sm pb-2 lg:pb-0">

              Don’t have an account?{" "}

              <Link
                to="/Register"
                className="text-red-600 font-bold hover:text-red-700 transition-colors"
              >
                Create Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;