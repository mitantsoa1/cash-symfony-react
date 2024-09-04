/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["templates/**/*.html.twig", "assets/**/*.js", "assets/**/*.jsx"],
  theme: {
    extend: {
      fontFamily: {
        spantaran: ["Spantaran"],
      },
      backgroundColor: {
        primary: "#2f89fc ",
      },
    },
  },
  plugins: [],
};
