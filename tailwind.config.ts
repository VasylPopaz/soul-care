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
      colors: {
        color30: "var(--color-30)",
        bodyBgColor: "var(--body-bg-color)",
        secBgColor: "var(--sec-bg-color)",
        thirdBgColor: "var(--third-bg-color)",
        primaryTextColor: "var(--primary-text-color)",
        secTextColor: "var(--sec-text-color)",
        aboutTextColor: "var(--about-text-color)",
        borderColor: "var(--border-color)",
        accentColor: "var(--accent-color)",
        accentHoverColor: "var(--accent-hover-color)",
        reviewBgColor: "var(--review-bg-color)",
        firstGradColor: "var(--first-grad-color)",
        secondGradColor: "var(--second-grad-color)",
        datePickerBgColor: "var(--date-picker-bg-color)",
        datePickerText: "var(--date-picker-text-color)",
        datePickerActive: "var(--date-picker-active)",
        iconStrokeColor: "var(--icon-stroke-color)",
        iconFillColor: "var(--icon-fill-color)",
        iconBgColor: "var(--icon-bg-color)",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      boxShadow: {
        "custom-inset": "0 20px 69px 0 rgba(0, 0, 0, 0.07)",
      },
    },
  },
  corePlugins: {
    container: false,
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
            paddingLeft: "128px",
            paddingRight: "128px",
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
