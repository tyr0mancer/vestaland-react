import { createTheme } from "@mui/material/styles";

/**
 * Farbkonstanten
 * @see https://paletton.com/#uid=52P0u0k7UUa3cZA5wXlaiQ5cFL3
 */
export const colors = {
  primary: '#004400',
  secondary: '#B8F5BA',
  tertiary: '#0D4D4D',
  light: '#E2FBFB',
  warning: '#8B0000',
  disabled: '#aaa'
}

export const componentsTheme = createTheme({
  components: {

    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          backgroundColor: colors.secondary,
        },
      },
    },

    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            color: colors.primary,
          },
          '&.Mui-disabled': {
            color: colors.disabled,
          },
        },
      },
    },



    MuiPaper: {
      styleOverrides: {
        root: {
          padding: '0px 5px',
        },
      },
    },

  },
})

/**
 * Farbschema für das Hauptthema
 * Stellt Primär-, Sekundär- und Warnfarben ein und definiert die Typografie.
 */
export const colorTheme = createTheme({
  palette: {
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondary,
    },
    warning: {
      main: colors.warning,
    }
  },
  typography: {
    h1: { fontSize: '2.6rem' },
    h2: { fontSize: '2.1rem' },
    h3: { fontSize: '1.7rem' },
    h4: { fontSize: '1.4rem' },
    h5: { fontSize: '1.2rem' },
    h6: { fontSize: '1.1rem' },
  }
})

/**
 * Kombiniertes MUI-Thema vereint obige Themes in ein Objekt
 */
export const themeMUI = createTheme({
  ...colorTheme,
  components: {
    ...colorTheme.components,
    ...componentsTheme.components,
  }
})
