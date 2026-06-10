import React, { useState } from "react";
import {
  EyeIcon,
  EyeOffIcon,
  UserIcon,
  MailIcon,
  LockIcon,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.name)
      newErrors.name = "Name is required";

    if (!formData.email)
      newErrors.email = "Email is required";

    if (
      formData.email &&
      !/\S+@\S+\.\S+/.test(formData.email)
    ) {
      newErrors.email = "Invalid email";
    }

    if (!formData.password)
      newErrors.password = "Password is required";

    if (
      formData.password &&
      formData.password.length < 6
    ) {
      newErrors.password = "Minimum 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword =
        "Confirm your password";
    }

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      newErrors.confirmPassword =
        "Passwords do not match";
    }

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
    <div
      className="
        min-h-screen
        relative
        overflow-hidden
        bg-white
        flex
        items-center
        justify-center
        px-4
        py-10
      "
    >

      {/* BACKGROUND EFFECTS */}
      <div
        className="
          absolute
          -top-32
          -left-32
          w-80
          h-80
          bg-red-500/10
          rounded-full
          blur-3xl
        "
      />

      <div
        className="
          absolute
          -bottom-32
          -right-32
          w-96
          h-96
          bg-yellow-400/10
          rounded-full
          blur-3xl
        "
      />

      {/* MAIN CARD */}
      <div
        className="
          relative
          z-10
          w-full
          max-w-6xl
          overflow-hidden
          rounded-[2rem]
          border
          border-gray-200
          shadow-[0_20px_80px_rgba(0,0,0,0.08)]
          bg-white
          grid
          lg:grid-cols-2
        "
      >

        {/* LEFT SIDE */}
        <div
          className="
            hidden
            lg:flex
            relative
            flex-col
            justify-between
            bg-gradient-to-br
            from-[#DC2626]
            via-[#B91C1C]
            to-black
            p-12
            text-white
            overflow-hidden
          "
        >

          {/* GLOW */}
          <div
            className="
              absolute
              top-0
              right-0
              w-80
              h-80
              bg-yellow-400/20
              rounded-full
              blur-3xl
            "
          />

          {/* BRAND */}
          <div className="relative z-10">

            <div
              className="
                w-16
                h-16
                rounded-2xl
                bg-white/10
                backdrop-blur-xl
                border
                border-white/20
                flex
                items-center
                justify-center
                text-2xl
                font-black
                mb-8
              "
            >
              GP
            </div>

            <span
              className="
                inline-flex
                items-center
                gap-2
                bg-white/10
                border
                border-white/20
                px-4
                py-2
                rounded-full
                text-sm
                font-semibold
                backdrop-blur-md
              "
            >
              <ShieldCheck size={16} />
              Premium Food Experience
            </span>

            <h1
              className="
                mt-8
                text-5xl
                font-black
                leading-tight
              "
            >
              Join
              <span className="block text-yellow-300">
                GreenPork
              </span>
            </h1>

            <p
              className="
                mt-6
                text-white/75
                text-lg
                leading-relaxed
                max-w-md
              "
            >
              Create your account and enjoy fast
              delivery, premium meals, exclusive
              offers, and seamless food ordering.
            </p>
          </div>

          {/* STATS */}
          <div
            className="
              relative
              z-10
              grid
              grid-cols-3
              gap-4
              mt-12
            "
          >

            <div
              className="
                bg-white/10
                backdrop-blur-xl
                border
                border-white/10
                rounded-2xl
                p-4
              "
            >
              <h3 className="text-2xl font-black">
                10K+
              </h3>

              <p className="text-sm text-white/70">
                Customers
              </p>
            </div>

            <div
              className="
                bg-white/10
                backdrop-blur-xl
                border
                border-white/10
                rounded-2xl
                p-4
              "
            >
              <h3 className="text-2xl font-black">
                Fast
              </h3>

              <p className="text-sm text-white/70">
                Delivery
              </p>
            </div>

            <div
              className="
                bg-white/10
                backdrop-blur-xl
                border
                border-white/10
                rounded-2xl
                p-4
              "
            >
              <h3 className="text-2xl font-black">
                Fresh
              </h3>

              <p className="text-sm text-white/70">
                Meals
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div
          className="
            p-6
            sm:p-10
            lg:p-14
            flex
            items-center
            justify-center
          "
        >

          <div className="w-full max-w-md">

            {/* HEADER */}
            <div className="mb-8">

              <h2
                className="
                  text-3xl
                  sm:text-4xl
                  font-black
                  text-gray-900
                "
              >
                Create Account
              </h2>

              <p
                className="
                  text-gray-500
                  mt-3
                  leading-relaxed
                "
              >
                Fill in your details to start ordering
                delicious meals from GreenPork.
              </p>
            </div>

            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* NAME */}
              <div>

                <label
                  className="
                    text-sm
                    font-semibold
                    text-gray-700
                  "
                >
                  Full Name
                </label>

                <div className="relative mt-2">

                  <UserIcon
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-gray-400
                    "
                    size={18}
                  />

                  <input
                    type="text"
                    name="name"
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="
                      w-full
                      pl-12
                      pr-4
                      py-4
                      rounded-2xl
                      border
                      border-gray-200
                      bg-gray-50/50
                      outline-none
                      transition-all
                      duration-300
                      focus:border-red-500
                      focus:ring-4
                      focus:ring-red-100
                    "
                  />
                </div>

                {errors.name && (
                  <p
                    className="
                      text-red-500
                      text-xs
                      mt-2
                    "
                  >
                    {errors.name}
                  </p>
                )}
              </div>

              {/* EMAIL */}
              <div>

                <label
                  className="
                    text-sm
                    font-semibold
                    text-gray-700
                  "
                >
                  Email Address
                </label>

                <div className="relative mt-2">

                  <MailIcon
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-gray-400
                    "
                    size={18}
                  />

                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="
                      w-full
                      pl-12
                      pr-4
                      py-4
                      rounded-2xl
                      border
                      border-gray-200
                      bg-gray-50/50
                      outline-none
                      transition-all
                      duration-300
                      focus:border-red-500
                      focus:ring-4
                      focus:ring-red-100
                    "
                  />
                </div>

                {errors.email && (
                  <p
                    className="
                      text-red-500
                      text-xs
                      mt-2
                    "
                  >
                    {errors.email}
                  </p>
                )}
              </div>

              {/* PASSWORD */}
              <div>

                <label
                  className="
                    text-sm
                    font-semibold
                    text-gray-700
                  "
                >
                  Password
                </label>

                <div className="relative mt-2">

                  <LockIcon
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-gray-400
                    "
                    size={18}
                  />

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    name="password"
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="
                      w-full
                      pl-12
                      pr-12
                      py-4
                      rounded-2xl
                      border
                      border-gray-200
                      bg-gray-50/50
                      outline-none
                      transition-all
                      duration-300
                      focus:border-red-500
                      focus:ring-4
                      focus:ring-red-100
                    "
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    className="
                      absolute
                      right-4
                      top-1/2
                      -translate-y-1/2
                      text-gray-400
                      hover:text-red-500
                      transition-colors
                    "
                  >
                    {showPassword ? (
                      <EyeOffIcon size={18} />
                    ) : (
                      <EyeIcon size={18} />
                    )}
                  </button>
                </div>

                {errors.password && (
                  <p
                    className="
                      text-red-500
                      text-xs
                      mt-2
                    "
                  >
                    {errors.password}
                  </p>
                )}
              </div>

              {/* CONFIRM PASSWORD */}
              <div>

                <label
                  className="
                    text-sm
                    font-semibold
                    text-gray-700
                  "
                >
                  Confirm Password
                </label>

                <div className="relative mt-2">

                  <LockIcon
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-gray-400
                    "
                    size={18}
                  />

                  <input
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    name="confirmPassword"
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="
                      w-full
                      pl-12
                      pr-12
                      py-4
                      rounded-2xl
                      border
                      border-gray-200
                      bg-gray-50/50
                      outline-none
                      transition-all
                      duration-300
                      focus:border-red-500
                      focus:ring-4
                      focus:ring-red-100
                    "
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                    className="
                      absolute
                      right-4
                      top-1/2
                      -translate-y-1/2
                      text-gray-400
                      hover:text-red-500
                      transition-colors
                    "
                  >
                    {showConfirmPassword ? (
                      <EyeOffIcon size={18} />
                    ) : (
                      <EyeIcon size={18} />
                    )}
                  </button>
                </div>

                {errors.confirmPassword && (
                  <p
                    className="
                      text-red-500
                      text-xs
                      mt-2
                    "
                  >
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                className="
                  group
                  w-full
                  mt-2
                  py-4
                  rounded-2xl
                  font-bold
                  text-white
                  bg-gradient-to-r
                  from-red-500
                  to-red-700
                  hover:from-red-600
                  hover:to-black
                  transition-all
                  duration-300
                  shadow-xl
                  hover:shadow-red-300/30
                  flex
                  items-center
                  justify-center
                  gap-3
                "
              >
                Create Account

                <ArrowRight
                  size={18}
                  className="
                    group-hover:translate-x-1
                    transition-transform
                  "
                />
              </button>
            </form>

            {/* FOOTER */}
            <p
              className="
                text-center
                text-sm
                text-gray-500
                mt-8
              "
            >
              Already have an account?{" "}

              <a href="/login"
                className="
                  text-red-600
                  font-bold
                  cursor-pointer
                  hover:underline
                "
              >
                Sign In
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;