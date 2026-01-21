/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Här lägger vi till dina egna färger
      colors: {
        brand: {
          green: "#02ACA7",
          navy: "#003C71",
        },
      },
      // Här kopplar vi typsnitten till CSS-variablerna från layout.tsx
      fontFamily: {
        serif: ["var(--font-roboto-serif)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
        logo: ["Bahnschrift", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;