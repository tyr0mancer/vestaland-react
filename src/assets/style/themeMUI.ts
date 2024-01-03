import {createTheme} from "@mui/material/styles";
import {deepmerge} from '@mui/utils';


export const COLOR_PRIMARY = '#004400'
export const COLOR_SECONDARY = '#B8F5BA'
export const COLOR_TERTIARY = '#669999'
export const COLOR_LIGHT = '#E2FBFB'

export const COLOR_WARNING = '#FF0000'


// https://paletton.com/#uid=52P0u0k7UUa3cZA5wXlaiQ5cFL3

const footerTheme = createTheme({
  components: {
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          backgroundColor: COLOR_SECONDARY,
        },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            color: COLOR_PRIMARY,
          },
          '&.Mui-disabled': {
            color: '#aaa',
          },
        },
      },
    },
  },
});

export const colorTheme = createTheme({
  palette: {
    primary: {
      main: COLOR_PRIMARY,
    },
    secondary: {
      main: COLOR_SECONDARY,
    },
    warning: {
      main: COLOR_WARNING,
    }
  },
  typography: {
    h1: {
      fontSize: '2.6rem',
    },
    h2: {
      fontSize: '2.1rem',
    },
    h3: {
      fontSize: '1.7rem',
    },
    h4: {
      fontSize: '1.4rem',
    },
    h5: {
      fontSize: '1.2rem',
    },
    h6: {
      fontSize: '1.1rem',
    },
  }
});


export const themeMUI = createTheme(deepmerge(footerTheme, colorTheme));

