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
      colors: {
        primary: {
          50: "#EBFCFF",
          100: "#DAF6FA",
          200: "#B1F2FA",
          300: "#79E1ED",
          400: "#34C7D9",
          500: "#00AABE",
          600: "#0090A1",
          700: "#006D7A",
          800: "#004B54",
          900: "#003238",
        },
        facebook: "#1877f2",
        twitter: "#1da1f2",
        linkedin: "#0b78b7",
        telegram: "#1392d1",
        discord: "#6378c5",
        github: "#333333",
      },
      spacing: {
        full: "100%",
      },
      fontFamily: {
        sans: ["Geist", ...fontFamily.sans],
        mono: ["Geist-Mono", ...fontFamily.mono],
        serif: ['"DM Serif Display"', ...fontFamily.serif],
      },
      fontSize: {
        "2sx": ["0.625rem", { lineHeight: "1rem" }],
      },
      maxWidth: () => ({
        ...spacing,
      }),
      minWidth: {
        xxs: "12rem",
        xs: "20rem",
      },
      dropShadow: {
        light: ["0 16px 10px rgba(200, 200, 200, 0.20)", "0 8px 4px rgba(200, 200, 200, 0.10)"],
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
