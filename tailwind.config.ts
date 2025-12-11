import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
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
  		xl: '1440px'
  	},
  	colors: {
  		primary_color: '#00051F',
  		blue: '#129DD6',
  		light_blue: '#e2f0f6',
  		dark_blue: '#101635',
  		grey: '#707070',
  		purple: '#7e5bef',
  		pink: '#ff49db',
  		orange: '#ff7849',
  		green: '#13ce66',
  		white: '#ECF4FF',
  		black: '#000000',
  		normal_white: '#ffffff',
  		yellow: '#ffc82c',
  		text_grey: '#D5D5D5',
  		text_grey_one: '#E2E2E2',
  		table_border: '#DCDCDC',
  		table_font: '#E3E3E3',
  		light_green: '#8FC23E',
  		secondary_yellow: '#FCDC30',
  		scroll_green: '#5FEF5C',
  		red: '#C70039'
  	},
  	fontFamily: {
  		poppins: ['var(--font-poppins)']
  	},
  	extend: {
  		keyframes: {
  			marquee: {
  				'0%': {
  					transform: 'translateX(100vw)'
  				},
  				'100%': {
  					transform: 'translateX(-0vw)'
  				},
  				from: {
  					transform: 'translateX(0)'
  				},
  				to: {
  					transform: 'translateX(calc(-100% - var(--gap)))'
  				}
  			},
  			'marquee-vertical': {
  				from: {
  					transform: 'translateY(0)'
  				},
  				to: {
  					transform: 'translateY(calc(-100% - var(--gap)))'
  				}
  			},
  			'border-beam': {
  				'100%': {
  					'offset-distance': '100%'
  				}
  			},
  			ripple: {
  				'0%, 100%': {
  					transform: 'translate(-50%, -50%) scale(1)'
  				},
  				'50%': {
  					transform: 'translate(-50%, -50%) scale(0.9)'
  				}
  			}
  		},
  		animation: {
  			marquee: 'marquee var(--duration) infinite linear',
  			'marquee-vertical': 'marquee-vertical var(--duration) linear infinite',
  			'border-beam': 'border-beam calc(var(--duration)*1s) infinite linear',
  			ripple: 'ripple var(--duration,2s) ease calc(var(--i, 0)*.2s) infinite'
  		},
  		height: {
  			home: 'calc(100vh - 150px)'
  		},
  		spacing: {
  			'128': '32rem',
  			'144': '36rem'
  		},
  		borderRadius: {
  			'4xl': '2rem',
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
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
		'.custom-scrollbar1': {
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#555',
            borderRadius: '10px',
            // border: '3px solid #f1f1f1',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#555',
          },
        },
		'.custom-scrollbar2': {
          '&::-webkit-scrollbar': {
            width: '3px',
			height:"5px"
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#555',
            borderRadius: '10px',
            // border: '3px solid #f1f1f1',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#555',
          },
        },
      }, ['responsive']);
    },
      require("tailwindcss-animate")
],
};
export default config;
