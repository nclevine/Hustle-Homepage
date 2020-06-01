const theme = {
  breakpoints: ['30em', '40em', '52em', '64em'],
  colors: {
    dark: '#101010',
    light: '#efefef',
    gray: '#8e8e8e',
    primary: '#101010',
    primaryO1: '#10101015',
    primaryO2: '#10101030',
    primaryO3: '#10101045',
    primaryO4: '#10101060',
    primaryO5: '#10101075',
    // primary: '#d21997', 
    // primaryO1: '#d2199720',
    // primaryO2: '#d2199735',
    // primaryO3: '#d2199750',
    // primaryO4: '#d2199765',
    // primaryO5: '#d2199780',
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
    exaggerated: 40,
    circle: 99999,
  },
  shadows: {
    card: '0 0 4px rgba(0, 0, 0, .125)',
  },
  // rebass variants
  text: {
    sHeading: {
      fontFamily: 'heading',
      fontWeight: 'sHeading',
      fontSize: [ 3, 3, 4, 5 ],
      color: 'primaryO3',
      fontStyle: 'italic'
    },
    sHeadingAlt: {
      fontFamily: 'heading',
      fontWeight: 'mHeading',
      fontSize: [ 3, 3, 4, 5 ],
      color: 'primary',
    },
    mHeading: {
      fontFamily: 'heading',
      fontWeight: 'mHeading',
      fontSize: [ 4, 4, 5, 6 ],
      color: 'dark',
      textAlign: 'center'
    },
    lHeading: {
      fontFamily: 'heading',
      fontWeight: 'lHeading',
      fontStyle: 'italic',
      fontSize: [ 5, 5, 6, 7 ],
      color: 'primary',
      p: [ 20, 30, 40 ],
      textAlign: 'center'
    },
    largeCopy: {
      fontFamily: 'body',
      fontWeight: 'bold',
      fontSize: [ 2, 3, 4, 5 ],
      lineHeight: '175%',
      py: [ 20, 20, 30, 40 ],
      px: [ 40, 40, 60, 80 ]
    },
    largeCopyBullet: {
      fontFamily: 'body',
      fontWeight: 'bold',
      fontSize: [ 1, 2, 3, 4 ],
      lineHeight: '175%',
      pt: [ 10, 10, 15, 20 ],
      px: [ 80, 80, 110, 130 ]
    },
    smallCaps: {
      textTransform: 'uppercase',
      fontSize: [ '10px', '12px', '12px', '12px' ],
      fontWeight: 'bold'
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
      p: [ 2 ],
      bg: 'white',
    },
    card1: {
      variant: 'card',
      bg: 'primaryO1'
    },
    card2: {
      variant: 'card',
      bg: 'primaryO2'
    },
    card3: {
      variant: 'card',
      bg: 'primaryO3'
    },
    card4: {
      variant: 'card',
      bg: 'primaryO4'
    },
    card5: {
      variant: 'card',
      bg: 'primaryO5'
    },
    options: {
      color: 'primary',
      fontWeight: 'bold',
      fontSize: [ 10, 12, 14, 14 ],
      // bg: 'white',
      p: [ 2 ],
      transition: 'height 0.2s',
      'svg': {
        fill: 'primary'
      }
    },
    link: {
      color: 'primary',
      textDecoration: 'none',
      ':hover': {
        textDecoration: 'underline'
      }
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
    contactInput: {
      'input, select, textarea': {
        fontSize: [ 1 ],
        fontWeight: 'bold',
        borderRadius: 0,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: 'transparent',
        fontFamily: 'body',
        outline: 'none',
        transition: '0.2s',
        resize: 'none',
        bg: 'primaryO3',
        ':hover': {
          borderColor: 'primary'
        },
        '&:focus': {
          color: 'dark',
          bg: 'white',
        },
        '::placeholder': {
          textTransform: 'uppercase',
          color: 'primaryO3'
        },
      },
      'input[type=submit]': {
        textTransform: 'uppercase',
        cursor: 'pointer',
        width: '40%',
        minWidth: 'max-content',
        margin: '0 auto',
        bg: 'light',
        ':hover': {
          color: 'primary',
          bg: 'white'
        },
        ':disabled': {
          cursor: 'auto',
          color: 'primaryO3',
          bg: 'primaryO3',
          ':hover': {
            color: 'primaryO3',
            borderColor: 'transparent'
          }
        }
      }
    }
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
