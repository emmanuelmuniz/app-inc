import {nextui} from '@nextui-org/theme';
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/(button|date-picker|divider|input|navbar|select|table|ripple|spinner|calendar|date-input|popover|listbox|scroll-shadow|checkbox|spacer).js"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    fontFamily: {
      'display': ['"Oswald']
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'gunmetal': '#022b3a',
      'teal': '#1f7a8c',
      'teal-hover': '#3392A5',
      'columbia-blue': '#bfdbf7',
      'lavender': '#D1DBFC',
      'silver': '#ecebff',
      'bubble-gum': '#ff77e9',
      'bermuda': '#78dcca',
      'ghost-white': '#E8EBFF'
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;
