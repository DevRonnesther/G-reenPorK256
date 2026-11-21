import React from "react";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import image from "../assets/bro-tim.png";

const BRAND = "Greenpork";
const SLOGAN = "Crave the difference";

const PALETTE = {
  red: "#E11D1D",
  lime: "#D9FF00",
  ink: "#111111",
  charcoal: "#2A2A2A",
  muted: "#4A4A4A",
  surface: "#F5F5F5",
  surfaceHover: "#EFEFEF",
  white: "#FFFFFF",
};

const EASE = [0.16, 1, 0.3, 1];
const VIEWPORT = { once: true, margin: "-60px" };

const CLIENTS_REVIEW = [
  {
    id: "kevin-blewett",
    clientName: "Rev. Kevin Blewett",
    reviews:
      "Having spent hours looking for the best pork restaurant, I bumped into Greenpork and their delicious taste is the best I have ever tasted with my family. We wish to come again. Shalom.",
    clientImage: image,
  },
  {
    id: "stella-ayerorwot",
    clientName: "Stella AyeroRwot",
    reviews:
      "Having spent hours looking for the best pork restaurant, I bumped into Greenpork and their delicious taste is the best I have ever tasted with my family and wish to come again. Shalom.",
    clientImage: image,
  },
  {
    id: "hon-stella",
    clientName: "Hon. Stella",
    reviews:
      "Having spent hours looking for the best pork restaurant, I bumped into Greenpork and their delicious taste is the best I have ever tasted with my family and wish to come again. Shalom.",
    clientImage: image,
  },
];

const Review = () => {
  return (
    <div className="font-display w-full max-w-full border-0 bg-transparent py-2 text-[#111111] selection:bg-[#D9FF00] selection:text-[#111111]">
      <div className="mb-8 flex flex-col items-center text-center">
        <span className="mb-3 inline-block rounded-full border-0 bg-[#111111] px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-[#D9FF00]">
          {BRAND} · {SLOGAN}
        </span>
        <h3 className="font-display text-3xl font-black uppercase leading-none tracking-tight text-[#111111] sm:text-4xl">
          We Care About <span style={{ color: PALETTE.red }}>Our Customers</span>
        </h3>
      </div>

      <div className="mx-auto grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
        {CLIENTS_REVIEW.map((data, index) => (
          <motion.article
            key={data.id}
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={VIEWPORT}
            transition={{ duration: 0.65, ease: EASE, delay: index * 0.1 }}
            className="group flex h-full flex-col justify-between rounded-[2rem] border-0 bg-[#FFFFFF] p-6 transition-colors duration-300 hover:bg-[#111111]"
          >
            <div>
              <div className="mb-4 flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full border-0 bg-[#F5F5F5]">
                    <img
                      src={data.clientImage}
                      alt={data.clientName}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div>
                    <p
                      className="font-display text-sm font-black uppercase tracking-tight transition-colors duration-300 group-hover:text-[#D9FF00]"
                      style={{ color: PALETTE.red }}
                    >
                      {data.clientName}
                    </p>
                    <p className="font-body text-xs font-medium text-[#4A4A4A] transition-colors duration-300 group-hover:text-[#FFFFFF]/70">
                      Recently updated
                    </p>
                  </div>
                </div>

                <Quote
                  className="h-8 w-8 shrink-0 transition-colors duration-300 group-hover:text-[#D9FF00]"
                  style={{ color: PALETTE.red }}
                />
              </div>

              <p className="font-body mb-6 text-sm font-medium leading-relaxed text-[#2A2A2A] transition-colors duration-300 group-hover:text-[#FFFFFF]/85">
                {data.reviews}
              </p>
            </div>

            <div className="flex items-center gap-1" aria-label="5 out of 5 stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  fill="currentColor"
                  className="h-4 w-4 transition-colors duration-300 group-hover:text-[#D9FF00]"
                  style={{ color: PALETTE.red }}
                />
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
};

export default Review;