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
          zIndex: "49",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "fixed",
          bottom: "-60px",
          right: "20px",
          padding: "5px",
          border: "none",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          backgroundColor: "var(--accent-color)",
          transition: "all 300ms ease-in",
          "&:hover::after": {
            transformOrigin: "bottom",
            transform: "scaleX(1)",
          },
          "&:focus::after": {
            transformOrigin: "bottom",
            transform: "scaleX(1)",
          },
          "&::after": {
            zIndex: "-1",
            content: "''",
            position: "absolute",
            left: "0",
            bottom: "0",
            borderRadius: "50%",
            width: "100%",
            height: "100%",
            backgroundColor: "var(--accent-hover-color)",
            transition: "transform 700ms",
            transformOrigin: "top",
            transform: "scaleY(0)",
          },
        },
      });
    },
  ],
};
