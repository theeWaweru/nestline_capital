/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          DEFAULT: "#5c8a75",
          50: "#f3f7f5",
          100: "#e6f0eb",
          200: "#c0d9cd",
          300: "#9bc2af",
          400: "#7da693",
          500: "#5c8a75",
          600: "#4a6f5f", // WCAG compliant for body text
          700: "#395449",
          800: "#273832",
          900: "#161c1c",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)"],
        body: ["var(--font-body)"],
        sans: ["var(--font-body)"],
      },
    },
  },
  plugins: [],
};
