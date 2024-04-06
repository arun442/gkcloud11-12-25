import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      "primary_color": "#000520",

      'blue': '#129DD6',
      "dark_blue": "#101635",
      "grey": "#707070",
      'purple': '#7e5bef',
      'pink': '#ff49db',
      'orange': '#ff7849',
      'green': '#13ce66',
      "white": "#ECF4FF",
      "black":"#000000",
      "normal_white": "#ffffff",
      'yellow': '#ffc82c',
      "text_grey": "#D5D5D5",
      "text_grey_one": "#B4B4B4",
      "table_border": "#DCDCDC",
      "table_font": "#E3E3E3"
    },
    fontFamily: {
      poppins: ['var(--font-poppins)'],
    },
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    }
  },
  plugins: [],
};
export default config;
