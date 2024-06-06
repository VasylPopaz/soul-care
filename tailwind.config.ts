/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      "sm-max": { max: "374.99px" },
      md: "768px",
      lg: "1440px",
    },
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [
    ({ addComponents }) => {
      addComponents({
        ".container": {
          minWidth: "320px",
          maxWidth: "375px",
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: "18px",
          paddingRight: "18px",
          "@screen md": {
            paddingLeft: "32px",
            paddingRight: "32px",
            maxWidth: "768px",
          },
          "@screen lg": {
            paddingLeft: "100px",
            paddingRight: "100px",
            maxWidth: "1440px",
          },
        },
        ".scroll-up-btn": {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: "49",
          position: "fixed",
          bottom: "-54px",
          right: "5%",
          padding: "10px",
          border: "none",
          width: "54px",
          height: "54px",
          backgroundColor: "#2355cc",
          transition: "all 300ms ease-in-out",
          "&:hover": {
            backgroundColor: "#223f86",
          },
        },
      });
    },
  ],
};
