import React from "react";
import { useForm } from "react-hook-form";
import {
  MapPin,
  Mail,
  Phone,
  Send,
  Clock3,
  Facebook,
  Instagram,
  MessageCircle,
  ArrowRight,
} from "lucide-react";

import Leaf from "../assets/pngwing.com (11).png";

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    alert("Message sent successfully!");
    reset();
  };

  return (
    <section className="relative overflow-hidden bg-[#FAFAFA] py-24 px-4 sm:px-6 lg:px-12 min-h-screen">

      {/* PREMIUM BACKGROUND */}
      <div className="absolute inset-0 -z-10">

        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-red-100 blur-[140px]" />

        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-orange-100 blur-[140px]" />
      </div>

      {/* LEAF DECOR */}
      <div className="absolute top-10 right-0 opacity-[0.04] hidden lg:block">
        <img
          src={Leaf}
          alt="Leaf"
          className="w-[420px] object-contain"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* HEADER */}
        <div className="text-center mb-20">

          <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-5 py-2 rounded-full text-sm font-bold mb-6">
            Contact GreenPork
          </div>

          <h1 className="text-5xl md:text-4xl font-black text-gray-900 leading-tight">

            We'd Love To Hear
            <span className="text-red-600 block">
              From You
            </span>
          </h1>

          <div className="w-28 h-1.5 bg-gradient-to-r from-red-600 to-orange-400 rounded-full mx-auto mt-8 mb-8" />

          <p className="text-gray-500 max-w-3xl mx-auto text-lg leading-relaxed">
            Have questions, feedback, or want to place an order?
            Reach out anytime and our team will respond quickly
            with premium support and assistance.
          </p>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* CONTACT FORM */}
          <div className="lg:col-span-2 bg-white border border-gray-200 shadow-2xl rounded-[40px] p-6 md:p-10">

            <div className="mb-10">

              <p className="text-red-600 font-bold tracking-[3px] uppercase text-sm mb-4">
                Send Message
              </p>

              <h2 className="text-4xl font-black text-gray-900">
                Let's Talk
              </h2>

              <p className="text-gray-500 mt-3 text-lg">
                Fill in the form below and we'll get back to you
                as soon as possible.
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-7"
            >

              {/* NAMES */}
              <div className="grid md:grid-cols-2 gap-6">

                {/* FIRST NAME */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    First Name
                  </label>

                  <input
                    type="text"
                    placeholder="John"
                    className={`w-full px-5 py-4 rounded-2xl border bg-gray-50 outline-none transition-all duration-300 focus:ring-4 focus:ring-red-100 focus:border-red-500 ${errors.firstName
                        ? "border-red-500"
                        : "border-gray-200"
                      }`}
                    {...register("firstName", {
                      required: "First name is required",
                    })}
                  />

                  {errors.firstName && (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                {/* LAST NAME */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    Last Name
                  </label>

                  <input
                    type="text"
                    placeholder="Doe"
                    className={`w-full px-5 py-4 rounded-2xl border bg-gray-50 outline-none transition-all duration-300 focus:ring-4 focus:ring-red-100 focus:border-red-500 ${errors.lastName
                        ? "border-red-500"
                        : "border-gray-200"
                      }`}
                    {...register("lastName", {
                      required: "Last name is required",
                    })}
                  />

                  {errors.lastName && (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              {/* EMAIL */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="johndoe@gmail.com"
                  className={`w-full px-5 py-4 rounded-2xl border bg-gray-50 outline-none transition-all duration-300 focus:ring-4 focus:ring-red-100 focus:border-red-500 ${errors.email
                      ? "border-red-500"
                      : "border-gray-200"
                    }`}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value:
                        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />

                {errors.email && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* MESSAGE */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Message
                </label>

                <textarea
                  rows="7"
                  placeholder="Write your message here..."
                  className={`w-full px-5 py-4 rounded-2xl border bg-gray-50 outline-none resize-none transition-all duration-300 focus:ring-4 focus:ring-red-100 focus:border-red-500 ${errors.message
                      ? "border-red-500"
                      : "border-gray-200"
                    }`}
                  {...register("message", {
                    required: "Message is required",
                    minLength: {
                      value: 10,
                      message:
                        "Message must be at least 10 characters",
                    },
                  })}
                />

                {errors.message && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                className="group inline-flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 text-white font-black px-8 py-5 rounded-2xl shadow-xl hover:shadow-red-300/40 transition-all duration-300 hover:scale-[1.02]"
              >
                Send Message

                <Send
                  size={18}
                  className="group-hover:translate-x-1 transition-transform duration-300"
                />
              </button>
            </form>
          </div>

          {/* SIDEBAR */}
          <div className="space-y-8">

            {/* CONTACT INFO */}
            <div className="bg-white border border-gray-200 shadow-2xl rounded-[40px] p-8">

              <div className="mb-8">

                <p className="text-red-600 font-bold tracking-[3px] uppercase text-sm mb-4">
                  Contact Info
                </p>

                <h3 className="text-3xl font-black text-gray-900">
                  Get In Touch
                </h3>
              </div>

              <div className="space-y-6">

                {/* PHONE */}
                <div className="flex items-start gap-4 bg-gray-50 rounded-3xl p-5 hover:shadow-lg transition-all">

                  <div className="bg-green-100 p-4 rounded-2xl">
                    <Phone className="text-green-600" />
                  </div>

                  <div>
                    <h4 className="font-black text-gray-900 text-lg mb-1">
                      Phone
                    </h4>

                    <a
                      href="tel:+256776464823"
                      className="text-gray-500 hover:text-green-600 transition-colors"
                    >
                      +256 776-464-823
                    </a>
                  </div>
                </div>

                {/* EMAIL */}
                <div className="flex items-start gap-4 bg-gray-50 rounded-3xl p-5 hover:shadow-lg transition-all">

                  <div className="bg-red-100 p-4 rounded-2xl">
                    <Mail className="text-red-600" />
                  </div>

                  <div>
                    <h4 className="font-black text-gray-900 text-lg mb-1">
                      Email
                    </h4>

                    <a
                      href="mailto:greenporkie@gmail.com"
                      className="text-gray-500 hover:text-red-600 transition-colors"
                    >
                      greenporkie@gmail.com
                    </a>
                  </div>
                </div>

                {/* ADDRESS */}
                <div className="flex items-start gap-4 bg-gray-50 rounded-3xl p-5 hover:shadow-lg transition-all">

                  <div className="bg-yellow-100 p-4 rounded-2xl">
                    <MapPin className="text-yellow-600" />
                  </div>

                  <div>
                    <h4 className="font-black text-gray-900 text-lg mb-1">
                      Location
                    </h4>

                    <p className="text-gray-500">
                      Gulu City, Uganda
                    </p>
                  </div>
                </div>

                {/* HOURS */}
                <div className="flex items-start gap-4 bg-gray-50 rounded-3xl p-5 hover:shadow-lg transition-all">

                  <div className="bg-black/10 p-4 rounded-2xl">
                    <Clock3 className="text-black" />
                  </div>

                  <div>
                    <h4 className="font-black text-gray-900 text-lg mb-1">
                      Opening Hours
                    </h4>

                    <p className="text-gray-500">
                      Mon - Sun • 10AM - 10PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            

            {/* SOCIALS */}
            <div className="bg-white border border-gray-200 shadow-2xl rounded-[40px] p-8">

              <h3 className="text-2xl font-black text-gray-900 mb-6">
                Follow Us
              </h3>

              <div className="flex items-center gap-4">

                <a
                  href="#"
                  className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center hover:scale-110 transition-transform duration-300"
                >
                  <Facebook className="text-blue-600" />
                </a>

                <a
                  href="#"
                  className="w-16 h-16 rounded-2xl bg-pink-100 flex items-center justify-center hover:scale-110 transition-transform duration-300"
                >
                  <Instagram className="text-pink-600" />
                </a>

                <a
                  href="#"
                  className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center hover:scale-110 transition-transform duration-300"
                >
                  <MessageCircle className="text-green-600" />
                </a>
              </div>
            </div>
          </div>
            {/* NEWSLETTER */}
            <div className="relative hidden// flex  overflow-hidden bg-gradient-to-br from-red-600 to-red-700 text-white rounded-[40px] p-8 shadow-2xl">

              <div className="absolute top-0 right-0 w-52 h-52 bg-white/10 rounded-full blur-3xl" />

              <div className="relative z-10">

                <p className="text-red-100 font-bold tracking-[3px] uppercase text-sm mb-4">
                  Newsletter
                </p>

                <h3 className="text-3xl font-black mb-4">
                  Stay Updated
                </h3>

                <p className="text-red-100 leading-relaxed mb-6">
                  Subscribe to receive updates, promotions,
                  discounts, and exclusive offers from GreenPork.
                </p>

                <form className="space-y-4">

                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-5 py-4 rounded-2xl bg-white text-black outline-none"
                  />

                  <button
                    type="submit"
                    className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-black py-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    Subscribe Now

                    <ArrowRight className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;