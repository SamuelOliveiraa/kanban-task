/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          100: "var(--color-gray-100)",
          200: "var(--color-gray-200)",
          300: "var(--color-gray-300)",
          400: "var(--color-gray-400)",
          500: "var(--color-gray-500)",
          600: "var(--color-gray-600)",
          700: "var(--color-gray-700)",
          800: "var(--color-gray-800)",
          900: "var(--color-gray-900)",
          text: "var(--color-gray-text)",
          neutral: "var(--color-gray-neutral)",
          border: "var(--color-gray-border)"
        },
        purple: {
          100: "var(--color-purple-100)",
          200: "var(--color-purple-200)"
        },
        red: {
          200: "var(--color-red-200)",
          500: "var(--color-red-500)"
        }
      }
    }
  },
  plugins: []
};
