/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html", // Path to your HTML file
  ],
  theme: {
    extend: {
      padding: {
        "main-xl": "155px",
        "main-lg": "100px",
        "main-md": "80px",
        "main-sm": "50px",
        "24": "24px",
      },
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
          ".p-main": {
            "@screen sm": {
              padding: "50px",
            },
            "@screen md": {
              padding: "80px",
            },
            "@screen lg": {
              padding: "100px",
            },
            "@screen xl": {
              padding: "155px",
            },
          },
        },
      };
      addUtilities(newUtilities, ["responsive"]);
    },
  ],
};
