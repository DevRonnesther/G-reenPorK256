import React from "react";
import {
  AlertCircle,
  CheckCircle2,
  Clock3,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Truck,
} from "lucide-react";

const ReturnPolicy = () => {
  const year = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-white overflow-hidden">

      {/* HERO */}
      

      {/* CONTENT */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 py-16">

        <div className="grid gap-8">

          {/* RETURNS */}
          <section className="bg-white border border-gray-100 rounded-[2rem] shadow-lg p-8">

            <div className="flex items-center gap-4 mb-8">

              <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="text-green-600" />
              </div>

              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-gray-400 font-bold">
                  Section 01
                </p>

                <h2 className="text-3xl font-black text-gray-900">
                  Returns & Refunds
                </h2>
              </div>
            </div>

            <div className="space-y-5">

              <div className="bg-red-50 border border-red-100 rounded-2xl p-5 flex gap-4">

                <AlertCircle className="text-red-600 shrink-0 mt-1" />

                <div>
                  <h4 className="font-bold text-gray-900 mb-2">
                    Perishable Products
                  </h4>

                  <p className="text-gray-600 leading-relaxed">
                    Due to hygiene and food safety reasons,
                    food products cannot be returned after delivery.
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 flex gap-4">

                <CheckCircle2 className="text-blue-600 shrink-0 mt-1" />

                <div>
                  <h4 className="font-bold text-gray-900 mb-2">
                    Damaged or Incorrect Orders
                  </h4>

                  <p className="text-gray-600 leading-relaxed">
                    Contact us within <strong>24 hours</strong>
                    if your order is incorrect, damaged,
                    or below quality standards.
                  </p>
                </div>
              </div>

              <div className="bg-green-50 border border-green-100 rounded-2xl p-5">

                <h4 className="font-bold text-gray-900 mb-2">
                  Refund Processing
                </h4>

                <p className="text-gray-600 leading-relaxed">
                  Approved refunds are processed within
                  <strong> 3–5 business days</strong>.
                </p>
              </div>
            </div>
          </section>

          {/* CANCELLATION */}
          <section className="bg-black text-white rounded-[2rem] p-8 shadow-xl">

            <div className="flex items-center gap-4 mb-6">

              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
                <Clock3 className="text-yellow-300" />
              </div>

              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-gray-500 font-bold">
                  Section 02
                </p>

                <h2 className="text-3xl font-black">
                  Cancellation Policy
                </h2>
              </div>
            </div>

            <div className="bg-white/10 border border-white/10 rounded-2xl p-6">

              <p className="text-gray-300 leading-relaxed">
                Orders may be canceled before
                <strong className="text-yellow-300">
                  {" "}8:00 AM{" "}
                </strong>
                on the delivery day. Once preparation begins,
                cancellations may not be possible.
              </p>
            </div>
          </section>

          {/* FOOD SAFETY + DELIVERY */}
          <div className="grid lg:grid-cols-2 gap-8">

            {/* FOOD SAFETY */}
            <section className="bg-white border border-gray-100 rounded-[2rem] shadow-lg p-8">

              <div className="flex items-center gap-4 mb-6">

                <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center">
                  <ShieldCheck className="text-purple-600" />
                </div>

                <h2 className="text-3xl font-black text-gray-900">
                  Food Safety
                </h2>
              </div>

              <div className="space-y-4">

                <div className="bg-purple-50 rounded-2xl p-5">
                  <p className="text-gray-600 leading-relaxed">
                    All meals are prepared under strict hygiene
                    and quality standards.
                  </p>
                </div>

                <div className="bg-red-50 rounded-2xl p-5">
                  <p className="text-gray-600 leading-relaxed">
                    Contact us immediately if you receive spoiled
                    or contaminated products.
                  </p>
                </div>
              </div>
            </section>

            {/* DELIVERY */}
            <section className="bg-white border border-gray-100 rounded-[2rem] shadow-lg p-8">

              <div className="flex items-center gap-4 mb-6">

                <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">
                  <Truck className="text-blue-600" />
                </div>

                <h2 className="text-3xl font-black text-gray-900">
                  Delivery Issues
                </h2>
              </div>

              <div className="space-y-4">

                <div className="bg-blue-50 rounded-2xl p-5">
                  <p className="text-gray-600 leading-relaxed">
                    We work quickly to resolve delivery delays
                    and order issues fairly.
                  </p>
                </div>

                <div className="bg-yellow-50 rounded-2xl p-5">
                  <p className="text-gray-600 leading-relaxed">
                    Customers must provide accurate delivery details
                    to avoid delays or extra charges.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>

        
        {/* CONTACT */}
        <section className="mt-16 bg-gradient-to-br from-black to-[#111827] rounded-[2.5rem] text-white overflow-hidden">

          <div className="px-8  md:px-12 py-14">

            <div className="text-center mb-12">

              <h2 className="text-4xl font-black mb-4">
                Need Help?
              </h2>

              <p className="text-gray-300 max-w-2xl mx-auto">
                Contact our support team for refunds,
                delivery concerns, or food-related issues.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">

              <div className="bg-white/10 border border-white/10 rounded-3xl p-6">

                <Phone className="text-yellow-300 mb-4" />

                <h4 className="text-xl font-bold mb-2">
                  Phone
                </h4>

                <p className="text-gray-300">
                  +256 776 464 823
                </p>
              </div>

              <div className="bg-white/10 border border-white/10 rounded-3xl p-6">

                <Mail className="text-yellow-300 mb-4" />

                <h4 className="text-xl font-bold mb-2">
                  Email
                </h4>

                <p className="text-gray-300 break-all">
                  greenporkie@gmail.com
                </p>
              </div>

              <div className="bg-white/10 border border-white/10 rounded-3xl p-6">

                <MapPin className="text-yellow-300 mb-4" />

                <h4 className="text-xl font-bold mb-2">
                  Location
                </h4>

                <p className="text-gray-300">
                  Kampala, Uganda
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-gray-100 bg-white">

        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <div className="w-12 hidden h-12 rounded-2xl bg-red-600 flex// items-center justify-center text-white font-black">
              GP
            </div>

            <div>
              <h4 className="font-bold hidden text-gray-900">
                GreenPork
              </h4>

              <p className="text-sm text-gray-500">
                © {year} All Rights Reserved
              </p>
            </div>
          </div>

          <p className="text-sm text-gray-500">
            Premium Food • Fast Delivery • Trusted Service
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ReturnPolicy;