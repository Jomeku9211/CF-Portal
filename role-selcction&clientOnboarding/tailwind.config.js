module.exports = {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        // Neutrals
        'neutral': {
          'white': '#FFFFFF',
          'lightest': '#F2F2F2',
          'lighter': '#D9D9D9',
          'light': '#B3B3B4',
          'base': '#808182',
          'dark': '#4D4E50',
          'darker': '#1B1C1E',
          'darkest': '#020305',
        },
        // San Juan (Blue Family)
        'sanjuan': {
          'lightest': '#E9ECF0',
          'lighter': '#D4D9E1',
          'light': '#6B7A97',
          'base': '#2C426B',
          'dark': '#233455',
          'darker': '#111A2A',
          'darkest': '#0D1320',
        },
        // Tango (Orange Family)
        'tango': {
          'lightest': '#FDF0E9',
          'lighter': '#FCE1D3',
          'light': '#F59665',
          'base': '#F16A23',
          'dark': '#C0541C',
          'darker': '#602A0E',
          'darkest': '#481F0A',
        },
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'ibm-plex': ['"IBM Plex Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}