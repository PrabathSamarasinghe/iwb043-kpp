/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [{
      light: {
        "primary": "#001475",
        "secondary": "#f6d860",
        "accent": "#37cdbe",
        "neutral": "#3d4451",
        "base-100": "#ffffff",
        "base-200": "#eeeeee",
        "base-300": "#dddddd"
      },
    }, "dark"],
  },
  plugins: [require('daisyui'),],
}

