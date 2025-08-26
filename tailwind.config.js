/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
        xl: '2.5rem',
        '2xl': '3rem',
      },
    },
    extend: {
      colors: {
        neutral: {
          white: '#FFFFFF',
          lightest: '#F2F2F2',
          lighter: '#D9D9D9',
          light: '#B3B3B4',
          base: '#808182',
          dark: '#4D4E50',
          darker: '#1B1C1E',
          darkest: '#020305',
        },
        sanjuan: {
          lightest: '#E9ECF0',
          lighter: '#D4D9E1',
          light: '#6B7A97',
          base: '#2C426B',
          dark: '#233455',
          darker: '#111A2A',
          darkest: '#0D1320',
        },
        tango: {
          lightest: '#FDF0E9',
          lighter: '#FCE1D3',
          light: '#F59665',
          base: '#F16A23',
          dark: '#C0541C',
          darker: '#602A0E',
          darkest: '#481F0A',
        },
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'ibm-plex-sans': ['IBM_Plex_Sans', 'sans-serif'],
      },
      borderRadius: {
        'xl': '0.875rem',
        '2xl': '1rem',
      },
      boxShadow: {
        card: '0 2px 10px rgba(0,0,0,0.06)',
      },
    },
  },
  plugins: [],
};
