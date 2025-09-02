import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#009000",
      },
      boxShadow: {
        hero: "0px 10px 10px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [],
} satisfies Config;
