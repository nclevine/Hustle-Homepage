const theme = {
  breakpoints: ['40em', '52em', '64em'],
  colors: {
    dark: '#111',
    light: '#eee',
    primary: '#d21997',
    secondary: '#4F0939',
  },
  fonts: {
    body: '\'Montserrat\', sans-serif',
    heading: '\'Prompt\', sans-serif',
    monospace: 'Menlo, monospace',
  },
  fontSizes: [
    12, 14, 16, 20, 24, 32, 48, 64, 96
  ],
  fontWeights: {
    body: 400,
    bold: 600,
    sHeading: 500,
    mHeading: 700,
    lHeading: 800
  },
  lineHeights: {
    body: 1.5,
    heading: 1.25,
  },
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  sizes: {
    avatar: 48,
  },
  radii: {
    default: 4,
    circle: 99999,
  },
  shadows: {
    card: '0 0 4px rgba(0, 0, 0, .125)',
  },
  // rebass variants
  text: {
    sHeading: {
      fontFamily: 'heading',
      fontWeight: 'sHeading'
    },
    mHeading: {
      fontFamily: 'heading',
      fontWeight: 'mHeading'
    },
    lHeading: {
      fontFamily: 'heading',
      fontWeight: 'lHeading',
      fontStyle: 'italic',
      fontSize: [ 5, 6, 7 ]
    },
    display: {
      fontFamily: 'heading',
      fontWeight: 'heading',
      lineHeight: 'heading',
      fontSize: [ 5, 6, 7 ],
    },
    caps: {
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
    },
  },
  variants: {
    avatar: {
      width: 'avatar',
      height: 'avatar',
      borderRadius: 'circle',
    },
    card: {
      p: 2,
      bg: 'background',
      boxShadow: 'card',
    },
    link: {
      color: 'primary',
    },
    nav: {
      fontSize: 1,
      fontWeight: 'bold',
      display: 'inline-block',
      p: 2,
      color: 'inherit',
      textDecoration: 'none',
      ':hover,:focus,.active': {
        color: 'primary',
      }
    },
  },
  buttons: {
    primary: {
      fontSize: 2,
      fontWeight: 'bold',
      color: 'background',
      bg: 'primary',
      borderRadius: 'default',
    },
    outline: {
      variant: 'buttons.primary',
      color: 'primary',
      bg: 'transparent',
      boxShadow: 'inset 0 0 2px',
    },
    secondary: {
      variant: 'buttons.primary',
      color: 'background',
      bg: 'secondary',
    },
  },
  styles: {
    root: {
      fontFamily: 'body',
      fontWeight: 'body',
      lineHeight: 'body',
    },
  },
}

export default theme
