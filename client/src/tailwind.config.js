/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      /* backgroundImage: {
        "green-radial":
          "radial-gradient(circle at 30% 30%, #16A34A 0%, #0f5132 50%, #052e16 100%)",
      }, */
      colors: {
        "primary-200": "#ffbf00",
        "primary-100": "#ffc929",
        "secondary-200": "#00b050",
        "secondary-100": "#0b1a78",
      },
      fontFamily: {
        display: ["Montserrat", "sans-serif"], // For big headers
        body: ["Inter", "sans-serif"], // For descriptions and UI
      },
    },
  },
  plugins: [],
};
