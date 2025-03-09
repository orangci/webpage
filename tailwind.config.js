/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./**/*.{html,js}"],
  theme: {
    fontFamily: {
      sans: ['Lexend, sans-serif'],
      serif: ['Merriweather, serif'],
      mono: ['"Martian Mono", monospace']
    },
    listStyleType: {
      none: 'none',
      disc: 'disc',
      decimal: 'decimal',
      square: 'square',
      roman: 'lower-roman',
    },
    extend: {
      backgroundImage: {
        'ug-peach': 'linear-gradient(to top right, #fab387, #FE640B)',
        'ug-rosewater': 'linear-gradient(to top right, #f5e0dc, #DC8A78)',
        'ug-flamingo': 'linear-gradient(to top right, #f2cdcd, #DD7878)',
        'ug-pink': 'linear-gradient(to top right, #f5c2e7, #EA76CB)',
        'ug-mauve': 'linear-gradient(to top right, #cba6f7, #8839EF)',
        'ug-red': 'linear-gradient(to top right, #f38ba8, #D20F39)',
        'ug-maroon': 'linear-gradient(to top right, #eba0ac, #E64553)',
        'ug-yellow': 'linear-gradient(to top right, #f9e2af, #DF8E1D)',
        'ug-green': 'linear-gradient(to top right, #a6e3a1, #40A02B)',
        'ug-teal': 'linear-gradient(to top right, #94e2d5, #179299)',
        'ug-sky': 'linear-gradient(to top right, #89dceb, #04A5E5)',
        'ug-sapphire': 'linear-gradient(to top right, #74c7ec, #209FB5)',
        'ug-blue': 'linear-gradient(to top right, #89b4fa, #1E66F5)',
        'ug-lavender': 'linear-gradient(to top right, #b4befe, #7287FD)',
        'ug-text': 'linear-gradient(to top right, #cdd6f4, #4C4F69)',
        'ug-subtext1': 'linear-gradient(to top right, #bac2de, #5C5F77)',
        'ug-subtext0': 'linear-gradient(to top right, #a6adc8, #6C6F85)',
        'ug-overlay2': 'linear-gradient(to top right, #9399b2, #7C7F93)',
        'ug-overlay1': 'linear-gradient(to top right, #7f849c, #8C8FA1)',
        'ug-overlay0': 'linear-gradient(to top right, #6c7086, #9CA0B0)',
        'ug-surface2': 'linear-gradient(to top right, #585b70, #ACB0BE)',
        'ug-surface1': 'linear-gradient(to top right, #45475a, #BCC0CC)',
        'ug-surface0': 'linear-gradient(to top right, #313244, #CCD0DA)',
        'ug-base': 'linear-gradient(to top right, #1e1e2e, #EFF1F5)',
        'ug-mantle': 'linear-gradient(to top right, #181825, #E6E9EF)',
        'ug-crust': 'linear-gradient(to top right, #11111b, #DCE0E8)',
      },
      colors: {
        crosewater: '#f5e0dc',
        cflamingo: '#f2cdcd',
        cpink: '#f5c2e7',
        cmauve: '#cba6f7',
        cred: '#f38ba8',
        cmaroon: '#eba0ac',
        cpeach: '#fab387',
        cyellow: '#f9e2af',
        cgreen: '#a6e3a1',
        cteal: '#94e2d5',
        csky: '#89dceb',
        csapphire: '#74c7ec',
        cblue: '#89b4fa',
        clavender: '#b4befe',
        ctext: '#cdd6f4',
        csubtext1: '#bac2de',
        csubtext0: '#a6adc8',
        coverlay2: '#9399b2',
        coverlay1: '#7f849c',
        coverlay0: '#6c7086',
        csurface2: '#585b70',
        csurface1: '#45475a',
        csurface0: '#313244',
        cbase: '#1e1e2e',
        cmantle: '#181825',
        ccrust: '#11111b',
        // below is latte
        drosewater: '#dc8a78',
        dflamingo: '#dd7878',
        dpink: '#ea76cb',
        dmauve: '#8839ef',
        dred: '#d20f39',
        dmaroon: '#e64553',
        dpeach: '#fe640b',
        dyellow: '#df8e1d',
        dgreen: '#40a02b',
        dteal: '#179299',
        dsky: '#04a5e5',
        dsapphire: '#209fb5',
        dblue: '#1e66f5',
        dlavender: '#7287fd',
        dtext: '#4c4f69',
        dsubtext1: '#5c5f77',
        dsubtext0: '#6c6f85',
        doverlay2: '#7c7f93',
        doverlay1: '#8c8fa1',
        doverlay0: '#9ca0b0',
        dsurface2: '#acb0be',
        dsurface1: '#bcc0cc',
        dsurface0: '#ccd0da',
        dbase: '#eff1f5',
        dmantle: '#e6e9ef',
        dcrust: '#dce0e8',
      },
    },
  },
  plugins: [],
}
