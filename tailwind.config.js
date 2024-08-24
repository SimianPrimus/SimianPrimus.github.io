/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html", // Path to your HTML file
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          // Define primary colors here
        },
        secondary: {
          // Define secondary colors here
        },
        shades: {
          "cultured-50": "#f5f5f580", // Cultured color with the hex value for the color
        },
        gradients: {
          // Define gradient colors here
        },
      },
      padding: {
        "main-xl": "155px",
        "main-lg": "100px",
        "main-md": "80px",
        "main-sm": "50px",
         24: "24px",
         48: "48px",
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
          "url('https://images.pexels.com/photos/1261728/pexels-photo-1261728.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
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
