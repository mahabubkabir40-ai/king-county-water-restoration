import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#08101E",
          900: "#0F172A",
          800: "#1E293B",
          700: "#334155",
        },
        emergency: {
          600: "#EA580C",
          700: "#C2410C",
          500: "#F97316",
          50: "#FFF7ED",
        },
      },
    },
  },
  plugins: [],
};

export default config;
