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
      "light_blue":"#e2f0f6",
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
      "text_grey_one": "#E2E2E2",
      "table_border": "#DCDCDC",
      "table_font": "#E3E3E3",
      "light_green":"#8FC23E",
      "secondary_yellow":"#FCDC30",
      "scroll_green":"#5FEF5C",
      "red":"#C70039"
    },
    fontFamily: {
      poppins: ['var(--font-poppins)'],
    },
    extend: {
        keyframes: {
        marquee: {
          '0%': { transform: 'translateX(10%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      animation: {
        marquee: 'marquee 60s linear infinite',
      },
      height: {
        'home': 'calc(100vh - 96px)',
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    }
  },
  plugins: [
    function ({ addUtilities }:{ addUtilities:any }) {
      addUtilities({
        '.custom-scrollbar': {
          '&::-webkit-scrollbar': {
            width: '12px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f1f1',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#129DD6',
            borderRadius: '10px',
            border: '3px solid #f1f1f1',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#555',
          },
        },
      }, ['responsive']);
    },
  ],
};
export default config;
