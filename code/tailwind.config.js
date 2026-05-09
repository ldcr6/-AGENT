module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: '#165DFF',
          secondary: '#7B61FF',
          success: '#00B42A',
          warning: '#FF7D00',
          danger: '#F53F3F',
          dark: '#1D2129',
          'dark-2': '#4E5969',
          'dark-3': '#86909C',
          'light-1': '#F2F3F5',
          'light-2': '#E5E6EB',
          'light-3': '#C9CDD4',
        },
        fontFamily: {
          inter: ['Inter', 'system-ui', 'sans-serif'],
        },
      },
    },
    plugins: [],
  }