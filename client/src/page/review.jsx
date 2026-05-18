import image from "../assets/bro-tim.png";
import { Quote, Star } from "lucide-react";

const clientsReview = [
  {
    clientName: "Rev . Kevin Blewett",
    reviews:
      "Having to spent hours looking for the best pork resturant i bumbed greenpork and their delicousy taste the best and the best i have ever tasted with my family and wish to come again . Shalom",
    clientImage: image,
  },
  {
    clientName: "Stella AyeroRwot",
    reviews:
      "Having to spent hours looking for the best pork resturant i bumbed greenpork and their delicousy taste the best and the best i have ever tasted with my family and wish to come again . Shalom",
    clientImage: image,
  },
  {
    clientName: "Hon. Stella",
    reviews:
      "Having to spent hours looking for the best pork resturant i bumbed greenpork and their delicousy taste the best and the best i have ever tasted with my family and wish to come again . Shalom",
    clientImage: image,
  },
];

const Review = () => {
  return (
    <div className="bg-white py-4 max-w-full">
      {/* ----------Customer Reviews------ */}
      <div className="text-center mb-6">
        <h3 className="text-3xl font-bold text-gray-900">
          We care about{" "}
          <span className="text-[#0edb0e]">Our Customers</span>
          <br className="hidden" /> Experience Too.
        </h3>
      </div>

      <div className="container mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {clientsReview.map((data, index) => (
          <div
            key={index}
            className="bg-green-100 rounded-lg p-5 shadow-sm hover:-translate-y-2 hover:bg-[#0edb0e]/20 transition-all duration-300"
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="border-2 border-dashed border-[#0edb0e] rounded-full p-[2px]">
                  <img
                    src={data.clientImage}
                    alt={data.clientName}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                </div>

                <div>
                  <p className="font-bold text-[#0edb0e]">
                    {data.clientName}
                  </p>
                  <p className="text-sm text-gray-600">
                    recently updated
                  </p>
                </div>
              </div>

              <Quote className="w-12 h-12 text-[#0edb0e]" />
            </div>

            {/* Review text */}
            <p className="text-gray-800 mb-4">
              {data.reviews}
            </p>

            {/* Stars */}
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  fill="currentColor"
                  className="w-5 h-5"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Review;
