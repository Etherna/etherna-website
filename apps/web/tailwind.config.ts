import { fontFamily, spacing } from "tailwindcss/defaultTheme"
import plugin from "tailwindcss/plugin"

import type { Config } from "tailwindcss"

export default {
  content: ["./index.html", "./public/**/*.html", "./src/**/*.tsx", "./src/**/*.astro"],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        xs: "360px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          lg: "1.25rem",
        },
        screens: {
          sm: "640px",
          md: "768px",
          lg: "1024px",
        },
      },
      fontFamily: {
        sans: ["Geist", ...fontFamily.sans],
        mono: ["Geist-Mono", ...fontFamily.mono],
        serif: ['"DM Serif Display"', ...fontFamily.serif],
      },
      fontSize: {
        "2sx": ["0.625rem", { lineHeight: "1rem" }],
      },
      animation: {
        "color-image": "color-image 0.5s ease-in-out forwards",
        "uncolor-image": "uncolor-image 0.5s ease-in-out forwards",
      },
      keyframes: {
        "color-image": {
          "0%": { filter: "brightness(0)" },
          "100%": { filter: "brightness(1)" },
        },
        "uncolor-image": {
          "100%": { filter: "brightness(0)" },
        },
      },
      zIndex: {
        "-1": "-1",
        1: "1",
        100: "100",
        200: "200",
      },
      // Plugins
      typography: {
        DEFAULT: {
          css: {
            h1: { fontWeight: "700" },
            "blockquote p:first-of-type::before": { content: "none" },
            "blockquote p:first-of-type::after": { content: "none" },
            "code::before": { content: "none" },
            "code::after": { content: "none" },
          },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    plugin(({ addUtilities }) => {
      const utils = {
        ".absolute-center": {
          position: "absolute",
          left: "50%",
          top: "50%",
          "--tw-translate-x": "-50%",
          "--tw-translate-y": "-50%",
          transform: "var(--tw-transform)",
        },
        ".text-gradient": {
          color: "transparent",
          background: "linear-gradient(0deg, #151515 0%, #9d9d9d 100%)",
          "-webkit-background-clip": "text",
          "-webkit-text-fill-color": "transparent",
        },
      }
      addUtilities(utils)
    }),
  ],
} satisfies Config
