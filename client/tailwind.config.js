module.exports = {
  purge: {
    preserveHtmlElements: true,
    content: ["./src/**/*.tsx", "./src/**/*.jsx"],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      opacity: ["disabled"],
      cursor: ["disabled"],
    },
  },
  plugins: [],
};
