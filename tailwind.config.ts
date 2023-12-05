module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [require("daisyui"), require("tailwind-scrollbar")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#2db7b5",

          secondary: "#df2fe2",

          accent: "#d0e589",

          neutral: "#141424",

          "base-100": "#27224f",

          info: "#88d1e7",

          success: "#126946",

          warning: "#b48113",

          error: "#fc241d",
        },
      },
    ],
  },
};
