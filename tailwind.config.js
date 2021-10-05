module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      // keyframe: {
      //   gloom1:   0% {
      //     left: -100%;
      //   }
      //   50%,
      //   100% {
      //     left: 100%
      //   }
      // },
      colors: {
        primary_color: "var(--primary_color)",
        secundary_color: "var(--secundary_color)",
        yellow_dead_color: "var(--yellow_dead_color)",
        light_gray_color: "var(--light_gray_color)",
        orange_color: "var(--orange_color)",
        red_color: "var(--red_color)",
        green_color: "var(--green_color)",
      },
      minWidth: {
        0: "0",
        "1/4": "25%",
        "1/2": "50%",
        "3/4": "75%",
        full: "100%",
      },
      minHeight: {
        0: "0",
        "1/4": "25%",
        "1/2": "50%",
        "3/4": "75%",
        full: "100%",
      },
      maxWidth: {
        "1/4": "25%",
        "1/2": "50%",
        "3/4": "75%",
      },
      maxHeight: {
        0: "0",
        "1/4": "25%",
        "1/2": "50%",
        "3/5": "60%",
        "3/4": "75%",
        full: "100%",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
