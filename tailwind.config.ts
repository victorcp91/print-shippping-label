import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eff8ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#2884c7", // Main color
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
          950: "#082f49",
        },

        neutral: {
          50: "#f9fafb", // Light background
          100: "#f3f4f6",
          200: "#e5e7eb", // Light borders
          300: "#d1d5db", // Dividers
          400: "#9ca3af", // Tertiary text
          500: "#6b7280", // Secondary text
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937", // Dark text
          900: "#111827",
          950: "#030712",
        },

        background: {
          primary: "#ffffff", // Pure white
          secondary: "#f9fafb", // Very light gray for secondary areas
        },

        text: {
          primary: "#1f2937", // Main dark text
          secondary: "#6b7280", // Secondary text
          tertiary: "#9ca3af", // Tertiary/placeholder text
          accent: "#2884c7", // Accent text (links, etc)
        },

        border: {
          light: "#e5e7eb", // Light borders
          default: "#d1d5db", // Default borders
          dark: "#9ca3af", // Dark borders
        },
      },

      spacing: {
        "18": "4.5rem", // 72px
        "88": "22rem", // 352px
        "112": "28rem", // 448px
        "128": "32rem", // 512px
        "144": "36rem", // 576px
        "160": "40rem", // 640px
        "176": "44rem", // 704px
        "192": "48rem", // 768px
        "208": "52rem", // 832px
        "224": "56rem", // 896px
        "240": "60rem", // 960px
        "256": "64rem", // 1024px (main container width)
      },

      maxWidth: {
        container: "64rem", // 1024px - main container
        "container-lg": "90rem", // 1440px - large container for big screens
        content: "62rem", // 992px - content area
        narrow: "36rem", // 576px - narrow content
      },

      borderRadius: {
        xs: "2px",
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "24px",
        full: "9999px",
      },

      boxShadow: {
        sm: "0 1px 2px rgba(0, 0, 0, 0.05)",
        md: "0 4px 6px rgba(0, 0, 0, 0.05)",
        lg: "0 10px 15px rgba(0, 0, 0, 0.05)",
        card: "0 1px 2px rgba(0, 0, 0, 0.05)", // Specific shadow for cards
      },

      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }], // 12px
        sm: ["0.875rem", { lineHeight: "1.25rem" }], // 14px
        base: ["1rem", { lineHeight: "1.5rem" }], // 16px
        lg: ["1.125rem", { lineHeight: "1.75rem" }], // 18px
        xl: ["1.25rem", { lineHeight: "1.75rem" }], // 20px
        "2xl": ["1.5rem", { lineHeight: "2rem" }], // 24px
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }], // 30px
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }], // 36px
      },

      fontWeight: {
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
      },

      transitionDuration: {
        "150": "150ms",
        "200": "200ms",
        "300": "300ms",
      },

      gridTemplateColumns: {
        header: "1fr auto",
        form: "repeat(auto-fit, minmax(280px, 1fr))",
        steps: "repeat(3, 1fr)",
      },

      opacity: {
        "15": "0.15",
        "35": "0.35",
        "65": "0.65",
      },
    },
  },
  plugins: [],
} satisfies Config;
