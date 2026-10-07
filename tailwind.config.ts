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
        cream: "#f4f0e8",
        ivory: "#fbf8f2",
        champagne: "#d8ccb6",
        sage: "#9ea99a",
        ink: "#101630",
        navy: "#1b2452",
      },
      fontFamily: {
        display: [
          '"Bodoni 72"',
          "Didot",
          '"Iowan Old Style"',
          '"Palatino Linotype"',
          '"Book Antiqua"',
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
        card: "0 16px 40px rgba(16, 22, 48, 0.08)",
        paper: "0 10px 30px rgba(16, 22, 48, 0.06)",
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
