import React from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

import {MainRouter} from "./MainRouter";
import {AuthProvider} from "./services/auth/AuthProvider";
import {StateProvider} from "./services/contexts/StateProvider";
import {ThemeProvider} from '@mui/material/styles';

import {themeMUI} from "./assets/style/themeMUI";
import './assets/style/index.css';
import './assets/style/vestaland.css';

const queryClient = new QueryClient();

function App() {
  return (
    <AuthProvider>
      <StateProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={themeMUI}>
            <MainRouter/>
          </ThemeProvider>
          {/*<ReactQueryDevtools/>*/}
        </QueryClientProvider>
      </StateProvider>
    </AuthProvider>
  );
}

export default App;
