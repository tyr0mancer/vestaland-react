import {createTheme} from "@mui/material/styles";

export const themeMUI = createTheme({
  palette: {
    primary: {
      main: '#394d3a',
    },
    secondary: {
      main: '#b4f7b7',
    }
  },
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
