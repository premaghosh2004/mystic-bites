// tailwind.config.js
import animate from 'tailwindcss-animate';
import forms from '@tailwindcss/forms';

export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
     screens: {
    xs: "375px",   // iPhone SE
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },
    extend: {
      colors: {
        vampireBlack: "#0b0b0b",
        bloodRed: "#8B0000",
        crimsonRed: "#dc143c",
        duskPurple: "#1f1a2e",
        boneWhite: "#e5e5e5",
        fogGray: "#2e2e2e",
      },
      fontFamily: {
        gothic: ["'Cinzel Decorative'", "cursive"],
        spooky: ["'UnifrakturCook'", "serif"],
      },
      animation: {
        fade: "fadeIn 2s ease-in-out",
        flicker: "flicker 1.5s infinite alternate",
        pulseSlow: "pulse 3s infinite",
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        flicker: {
          '0%': { opacity: 1 },
          '50%': { opacity: 0.8 },
          '100%': { opacity: 1 },
        },
      },
      boxShadow: {
        blood: "0 0 15px rgba(139, 0, 0, 0.6)",
        vampire: "0 0 20px rgba(220, 20, 60, 0.5)",
      },
      backgroundImage: {
        vampireFog: "url('https://i.ibb.co/Hzj8Pnz/vampire-fog.png')",
        bloodSpatter: "url('https://i.ibb.co/tqyx7TZ/blood-texture.jpg')",
      },
    },
  },
  plugins: [animate, forms],
};
