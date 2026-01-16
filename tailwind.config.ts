import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        calendar: {
          border: "hsl(var(--calendar-border))",
          header: "hsl(var(--calendar-header))",
          weekend: "hsl(var(--calendar-weekend))",
        },
        booking: {
          confirmed: "hsl(var(--booking-confirmed))",
          "confirmed-border": "hsl(var(--booking-confirmed-border))",
          "confirmed-text": "hsl(var(--booking-confirmed-text))",
          pending: "hsl(var(--booking-pending))",
          "pending-border": "hsl(var(--booking-pending-border))",
          "pending-text": "hsl(var(--booking-pending-text))",
          staying: "hsl(var(--booking-staying))",
          "staying-border": "hsl(var(--booking-staying-border))",
          "staying-text": "hsl(var(--booking-staying-text))",
          checkout: "hsl(var(--booking-checkout))",
          "checkout-border": "hsl(var(--booking-checkout-border))",
          "checkout-text": "hsl(var(--booking-checkout-text))",
          maintenance: "hsl(var(--booking-maintenance))",
          "maintenance-border": "hsl(var(--booking-maintenance-border))",
          "maintenance-text": "hsl(var(--booking-maintenance-text))",
        },
      },
      boxShadow: {
        calendar: "0 4px 20px -2px hsl(220 13% 91% / 0.8)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
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
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
