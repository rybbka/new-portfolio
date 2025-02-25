/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/styles/**/*.css",
    "./app/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    // Add any classes that might be dynamically generated
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ['Suisse Intl Mono', 'monospace'],
      },
      fontWeight: {
        bold: 700,
      },
      screens: {
        'custom': '768px',
        'mobile': '736px',
      },
    },
  },
  plugins: [],
}
