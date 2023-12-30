import {createTheme} from "@mui/material/styles";
import { deepmerge } from '@mui/utils';



const footerTheme = createTheme({
  components: {
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          backgroundColor: '#b4f7b7',
        },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            color: '#394d3a',
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
      main: '#394d3a',
    },
    secondary: {
      main: '#b4f7b7',
    }
  }
});


export const themeMUI = createTheme(deepmerge(footerTheme, colorTheme));

