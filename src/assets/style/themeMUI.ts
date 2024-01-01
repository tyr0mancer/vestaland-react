import {createTheme} from "@mui/material/styles";
import {deepmerge} from '@mui/utils';


export const COLOR_PRIMARY = '#064D0B' // ehem 394d3a
export const COLOR_SECONDARY = '#94CE98' // ehem b4f7b7
export const COLOR_TERTIARY = '#76A2A4'
export const COLOR_LIGHT = '#FFD8B7'

// https://paletton.com/#uid=32Q0u0kjomE93zhearQo9hStIcm // Basis ist #388E3E

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

