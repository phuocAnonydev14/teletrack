import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        rankTagBg: 'var(--rank-tag-bg)',
        textContrast: 'hsl(var(--text-contrast))',
        homeMenuBg: 'hsl(var(--home-menu-bg))',
        tableBg: 'hsl(var(--table-bg))',
        tableBorder: 'hsl(var(--table-border))',
        tableRowEven: 'hsl(var(--table-row-even))',
        tableRowOdd: 'hsl(var(--table-row-odd))',
        inputBg: 'hsl(var(--input-bg))',
        appInfoBg: 'hsl(var(--app-info-bg))',
        appInfoMetric: 'hsl(var(--app-info-metric))',
        appInfoButton: 'hsl(var(--app-info-button))',
        analysisBg: 'hsl(var(--analysis-bg))',
        analysisForeground: 'hsl(var(--analysis-foreground))',
        tooltipBg: 'hsla(var(--tooltip-bg))',
        statsBg: 'hsl(var(--stats-bg))',
      },
      backgroundImage: {
        btnPrimary: 'var(--btn-primary)',
        btnPrimaryHover: 'var(--btn-primary-hover)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
