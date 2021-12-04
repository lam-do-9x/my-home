module.exports = {
  mode: "jit",
  purge: {
    content: ["pages/**/*.{js,ts,jsx,tsx}", "components/**/*.{js,ts,jsx,tsx}"],
    options: {
      safelist: ["bg-gray-200", "bg-green-200", "bg-yellow-200", "bg-red-200"],
    },
  },
  darkMode: false,
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
  important: true,
};
