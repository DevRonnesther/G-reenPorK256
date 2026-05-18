import React, { useState } from "react";
import {
  EyeIcon,
  EyeOffIcon,
  UserIcon,
  MailIcon,
  LockIcon,
} from "lucide-react";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email";

    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password.length < 6)
      newErrors.password = "Minimum 6 characters";

    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("REGISTER DATA:", formData);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 via-white to-red-50 px-4">

      {/* CARD */}
      <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-6 sm:p-8 border border-gray-100">

        {/* HEADER */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto bg-red-500 text-white flex items-center justify-center rounded-2xl shadow-lg mb-4">
            GP
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800">
            Create Account
          </h1>

          <p className="text-gray-500 text-sm mt-2">
            Join GreenPork for fast food ordering
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* NAME */}
          <div>
            <label className="text-sm font-medium text-gray-700">Name</label>
            <div className="relative mt-1">
              <UserIcon className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                name="name"
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-400 outline-none"
                placeholder="Full Name"
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <div className="relative mt-1">
              <MailIcon className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                name="email"
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-400 outline-none"
                placeholder="you@example.com"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm font-medium text-gray-700">Password</label>
            <div className="relative mt-1">
              <LockIcon className="absolute left-3 top-3 text-gray-400" size={18} />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={handleChange}
                className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-400 outline-none"
                placeholder="Password"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400"
              >
                {showPassword ? (
                  <EyeOffIcon size={18} />
                ) : (
                  <EyeIcon size={18} />
                )}
              </button>
            </div>

            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Confirm Password
            </label>

            <div className="relative mt-1">
              <LockIcon className="absolute left-3 top-3 text-gray-400" size={18} />

              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                onChange={handleChange}
                className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-400 outline-none"
                placeholder="Confirm Password"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="absolute right-3 top-3 text-gray-400"
              >
                {showConfirmPassword ? (
                  <EyeOffIcon size={18} />
                ) : (
                  <EyeIcon size={18} />
                )}
              </button>
            </div>

            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* CTA BUTTON (IMPROVED) */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl font-bold text-white
            bg-gradient-to-r from-red-500 to-red-600
            hover:from-red-600 hover:to-red-700
            shadow-lg hover:shadow-red-300/40
            transition-all duration-300 active:scale-95"
          >
            Create Account
          </button>

        </form>

        {/* FOOTER */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <span className="text-red-500 font-semibold cursor-pointer hover:underline">
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;