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
        pastel: {
          pink: '#FFD1DC',
          blue: '#AEC6CF',
          green: '#77DD77',
          purple: '#CBAACB',
          yellow: '#FDFD96',
          orange: '#FFB347',
          red: '#FF6961',
          mint: '#B2F7EF',
          peach: '#FFDAB9',
          lilac: '#E6E6FA',
        },
        creamWhite: '#FFFDD0', // Add cream white color here
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;
