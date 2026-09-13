import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        museum: {
          ivory: "#F6F1E7",
          ivoryLight: "#FCF9F3",
          parchment: "#E9DDC8",
          parchmentDark: "#DECDB4",
          stone: "#D8CCB6",
          stoneLight: "#E4D9C7",
          border: "rgba(109, 102, 93, 0.2)",
          borderLight: "rgba(109, 102, 93, 0.12)",
          textPrimary: "#252321",
          textSecondary: "#6D665D",
          textMuted: "#8C8377",
          terracotta: "#8B3F32",
          terracottaDark: "#732F24",
          romanRed: "#9B4539",
          antiqueGold: "#A9854A",
          bronze: "#806746",
          olive: "#68745A",
          oceanBlue: "#355D68",
          softSky: "#B7C7C8",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        display: ["var(--font-cinzel)", "Cinzel", "serif"],
        sans: ["Calibri", "Candara", "Segoe UI", "-apple-system", "BlinkMacSystemFont", "Roboto", "sans-serif"],
      },
      letterSpacing: {
        archival: "0.2em",
        editorial: "0.15em",
        widest: "0.25em",
      },
      boxShadow: {
        museum: "0 10px 30px -5px rgba(37, 35, 33, 0.08), 0 4px 12px -2px rgba(37, 35, 33, 0.04)",
        card: "0 4px 20px rgba(37, 35, 33, 0.06)",
        hover: "0 14px 35px rgba(139, 63, 50, 0.12)",
      },
    },
  },
  plugins: [],
};
export default config;
