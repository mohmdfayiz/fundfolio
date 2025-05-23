/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      spacing: {
        '1': '6px',
        '2': '9px',
        '3': '12px',
        '4': '16px',
        '5': '20px',
        '6': '24px',
      },
      colors: {
        green: {
          DEFAULT: "#A1C398",
          100: "#C6EBC5",
          200: "#bbf7d0"
        },
        red: {
          DEFAULT: "#FA7070",
          100: "#fee2e2",
          200: '#fecaca'
        },
        yellow: {
          DEFAULT: "#facc15",
          100: "#fef9c3",
          200: "#fef08a",
        },
        black: {
          DEFAULT: "#000",
          100: "#1E1E2D",
          200: "#232533",
        },
      },
      fontFamily: {
        pthin: ["Poppins-Thin", "sans-serif"],
        pextralight: ["Poppins-ExtraLight", "sans-serif"],
        plight: ["Poppins-Light", "sans-serif"],
        pregular: ["Poppins-Regular", "sans-serif"],
        pmedium: ["Poppins-Medium", "sans-serif"],
        psemibold: ["Poppins-SemiBold", "sans-serif"],
        pbold: ["Poppins-Bold", "sans-serif"],
        pextrabold: ["Poppins-ExtraBold", "sans-serif"],
        pblack: ["Poppins-Black", "sans-serif"],
      },
    },
  },
  plugins: [],
}

