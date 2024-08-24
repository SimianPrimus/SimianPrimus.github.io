/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html", // Path to your HTML file
  ],
  theme: {
    extend: {
      animation: {
        slidein: "slidein 100s infinite alternate forwards",
      },
      keyframes: {
        slidein: {
          from: { backgroundPosition: "top", backgroundSize: "3000px" },
          to: { backgroundPosition: "-100px 0px", backgroundSize: "2750px" },
        },
      },
      backgroundImage: {
        "custom-image":
          "url('https://static.pexels.com/photos/414171/pexels-photo-414171.jpeg')",
      },
      fontFamily: {
        "source-code-pro": ["'Source Code Pro'", "monospace"],
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".hide-scrollbar": {
          /* Hide scrollbar for IE, Edge, and Firefox */
          "-ms-overflow-style": "none" /* IE and Edge */,
          "scrollbar-width": "none" /* Firefox */,
          /* Hide scrollbar for Chrome, Safari, and Opera */
          "&::-webkit-scrollbar": {
            display: "none",
          },
          overflow: "hidden" /* Hide both vertical and horizontal scrollbars */,
          overflowX: "hidden" /* Specifically hide horizontal scrollbar */,
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
