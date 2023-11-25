import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'minixl': '400px', // => @media (min-width: 640px) { ... }
      'mini': '480px', // => @media (min-width: 640px) { ... }
      'sm': '640px', // => @media (min-width: 640px) { ... }
      'md': '768px', // => @media (min-width: 768px) { ... }
      'lg': '1024px', // => @media (min-width: 1024px) { ... }
      'xl': '1280px', // => @media (min-width: 1280px) { ... }
    },
    extend: {
      backgroundImage : {
        'svgTopHead' : "url('/images/nav-edge.svg')",
      },
      colors:{
          sidebar:{
              text: '#9899ac',
              svgHover: '#009ef7',
              bgHover: '#1B1B28',
          },
          body: {
              light: '#F0F0F6',
          },
          white: {
              DEFAULT: '#ffffff',
              active: '#F5F8FA',
          },
          primary: {
              DEFAULT: '#057DCD',
              active: '#1E3D58',
              light: '#C3E0E5',
              medium: '#41729F',
          },
          light: {
              DEFAULT: '#F5F8FA',
              active: '#eff2f5',
              white: '#ffffff',
          },
          success: {
              DEFAULT: '#50CD89',
              active: '#47be7e',
              light: '#E8FFF3',
          },
          info: {
              DEFAULT: '#7239EA',
              active: '#5014d0',
              light: '#F8F5FF',
          },
          warning: {
              DEFAULT: '#FFC700',
              active: '#f1bc00',
              light: '#FFF8DD',
          },
          danger: {
              DEFAULT: '#F1416C',
              active: '#d9214e',
              light: '#FFF5F8',
          },
          dark: {
              DEFAULT: '#181C32',
              active: '#131628',
              light: '#EFF2F5',
          },
      },
  },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require("daisyui")
  ],
}
export default config
