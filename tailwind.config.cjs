/** @type {import('tailwindcss').Config} */

// import defaultTheme from "tailwindcss/defaultTheme";
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "450px",
        // ...defaultTheme.screens,
      },
      colors: {
        primary: {
          light: "#80C6FD",
          base: "#3692D9",
          dark: "#3692D9",
          highlight: "#80C6FD",
        },
        secondary: {
          light: "#889AFD",
          base: "#627AFA",
          dark: "#425ADD",
          highlight: "#889AFD",
        },
        success: {
          light: "#6CFFA2",
          base: "#6CFFA2",
          dark: "#6CFFA2",
          highlight: "#70FF89",
        },
        warning: {
          light: "#FBBC04",
          base: "#FBBC04",
          dark: "#FBBC04",
          highlight: "#FFD976",
        },
        error: {
          light: "#FF3B12",
          base: "#FF3B12",
          dark: "#FF3B12",
          highlight: "#FF7A70",
        },
        info: {
          light: "#1E4EFF",
          base: "#1E4EFF",
          dark: "#1E4EFF",
          highlight: "#819CFF",
        },
        white: "#f5f5f5",
        black: "#161616",
      },
    },
    fontFamily: {
      sans: ["Lato", "Inter", "sans-serif"],
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio", "@tailwindcss/forms")],
};
