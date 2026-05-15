import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#fefbea",
        ivory: "#fffdf3",
        champagne: "#e7dcc3",
        sage: "#c7d0bf",
        ink: "#141744",
        navy: "#202484",
      },
      fontFamily: {
        display: [
          "Iowan Old Style",
          "Palatino Linotype",
          "Book Antiqua",
          "Georgia",
          "serif",
        ],
        body: [
          "Avenir Next",
          "Helvetica Neue",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      boxShadow: {
        card: "0 18px 40px rgba(32, 36, 132, 0.08)",
        paper: "0 14px 45px rgba(32, 36, 132, 0.07)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      letterSpacing: {
        luxe: "0.18em",
      },
      backgroundImage: {
        "soft-noise":
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='.16'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};

export default config;
