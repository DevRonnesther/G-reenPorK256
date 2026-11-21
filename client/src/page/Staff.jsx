import React from "react";
import { motion } from "framer-motion";

const BRAND = "Greenpork";

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

const TEAM = [
  {
    name: "Green Ronnie",
    role: "Founder & CEO",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
    bio: `Leading ${BRAND} with a vision for bold flavors, fresh ingredients, and fast service in Gulu City.`,
  },
  {
    name: "Ella Stella",
    role: "Operations Manager",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
    bio: `Ensures smooth daily kitchen prep, strict quality control, and swift ${BRAND} delivery.`,
  },
  {
    name: "Sarah Johnson",
    role: "Creative Director",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
    bio: `Shapes the bold visual identity and customer experience behind ${BRAND}.`,
  },
  {
    name: "Robert Williams",
    role: "Head Chef",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
    bio: `Crafts wood-smoked pork, burgers, pizza, and crispy chicken for ${BRAND}.`,
  },
];

export function Staff() {
  return (
    <div className="font-display grid grid-cols-1 gap-4 border-0 selection:bg-[#D9FF00] selection:text-[#111111] sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
      {TEAM.map((member, i) => (
        <motion.div
          key={member.name}
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={VIEWPORT}
          transition={{ duration: 0.65, ease: EASE, delay: i * 0.1 }}
        >
          <article className="group flex h-full flex-col overflow-hidden rounded-[2rem] border-0 bg-[#FFFFFF] transition-colors duration-300 hover:bg-[#111111]">
            <div className="relative aspect-[4/5] w-full overflow-hidden border-0 bg-[#EFEFEF]">
              <img
                src={member.image}
                alt={member.name}
                loading="lazy"
                className="h-full w-full object-cover grayscale-[25%] transition-all duration-500 ease-out group-hover:scale-105 group-hover:grayscale-0"
              />
              <div className="pointer-events-none absolute inset-0 bg-[#111111]/45 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>

            <div className="flex flex-1 flex-col justify-between p-6">
              <div>
                <h3 className="font-display mb-1 text-xl font-black uppercase leading-none tracking-tight text-[#111111] transition-colors duration-300 group-hover:text-[#FFFFFF]">
                  {member.name}
                </h3>
                <p
                  className="font-display mb-3 text-[11px] font-black uppercase tracking-widest transition-colors duration-300 group-hover:text-[#D9FF00]"
                  style={{ color: PALETTE.red }}
                >
                  {member.role}
                </p>
              </div>
              <p className="font-body text-sm font-medium leading-relaxed text-[#4A4A4A] transition-colors duration-300 group-hover:text-[#FFFFFF]/80">
                {member.bio}
              </p>
            </div>
          </article>
        </motion.div>
      ))}
    </div>
  );
}