/** @type {import('tailwindcss').Config} */
import { nextui } from "@nextui-org/react";
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        iphoneBack: "url('/icons/tgWindow/iphoneBack.png')",
        chatBackground: "url('/icons/tgWindow/chatBackground.jpeg')",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
