/* eslint-disable @typescript-eslint/no-require-imports */

import { fontFamily } from "tailwindcss/defaultTheme"
import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette"
import plugin from "tailwindcss/plugin"

import type { Config } from "tailwindcss"

export default {
  content: ["./index.html", "./public/**/*.html", "./src/**/*.tsx", "./src/**/*.astro"],
  darkMode: ["class", "class"],
  theme: {
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
    extend: {
      screens: {
        xs: "360px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        "current-background": "hsl(var(--current-background))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        info: {
          DEFAULT: "hsl(var(--info))",
          foreground: "hsl(var(--info-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      fontFamily: {
        sans: ["Geist", ...fontFamily.sans],
        mono: ["Geist-Mono", ...fontFamily.mono],
        serif: ['DM Serif Display"', ...fontFamily.serif],
      },
      fontSize: {
        "2sx": ["0.625rem", { lineHeight: "1rem" }],
      },
      animation: {
        "color-image": "color-image 0.5s ease-in-out forwards",
        "uncolor-image": "uncolor-image 0.5s ease-in-out forwards",
        "tick-fade": "tick-fade 1.2s infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      keyframes: {
        "color-image": {
          "0%": {
            filter: "brightness(0)",
          },
          "100%": {
            filter: "brightness(1)",
          },
        },
        "uncolor-image": {
          "100%": {
            filter: "brightness(0)",
          },
        },
        "tick-fade": {
          "0%": {
            opacity: "1",
          },
          "100%": {
            opacity: "0.1",
          },
        },
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      zIndex: {
        "1": "1",
        "100": "100",
        "200": "200",
        "-1": "-1",
      },
      typography: {
        DEFAULT: {
          css: {
            h1: {
              fontWeight: "700",
            },
            "blockquote p:first-of-type::before": {
              content: "none",
            },
            "blockquote p:first-of-type::after": {
              content: "none",
            },
            "code::before": {
              content: "none",
            },
            "code::after": {
              content: "none",
            },
          },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwindcss-animate"),
    plugin(({ addUtilities, matchUtilities, theme }) => {
      addUtilities({
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
      })

      matchUtilities(
        {
          "reset-current-bg": (value) => ({
            "--current-background": value.match(/^hsl\((.+)\)$/)?.[1] ?? value,
          }),
        },
        {
          type: "color",
          values: flattenColorPalette(theme("colors")),
        },
      )
    }),
  ],
} satisfies Config
