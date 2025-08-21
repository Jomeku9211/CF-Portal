export default {content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
      colors: {
        // Neutrals
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
        // San Juan (Blue Family)
        sanjuan: {
          lightest: '#E9ECF0',
          lighter: '#D4D9E1',
          light: '#6B7A97',
          base: '#2C426B',
          dark: '#233455',
          darker: '#111A2A',
          darkest: '#0D1320',
        },
        // Tango (Orange Family)
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
      fontSize: {
        'text-large': ['1.25rem', { lineHeight: '150%' }],
        'text-medium': ['1.125rem', { lineHeight: '150%' }],
        'text-regular': ['1rem', { lineHeight: '150%' }],
        'text-small': ['0.875rem', { lineHeight: '150%' }],
        'text-tiny': ['0.75rem', { lineHeight: '150%' }],
      },
      fontWeight: {
        'extra-bold': 800,
        bold: 700,
        'semi-bold': 600,
        medium: 500,
        normal: 400,
        light: 300,
      },
    },
  },
}