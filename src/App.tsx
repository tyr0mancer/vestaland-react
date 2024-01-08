import React from "react";

import {StateProvider} from "./util/state/StateProvider";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {AuthProvider} from "./util/auth/AuthProvider";
import {MainRouter} from "./components/layout/MainRouter";

import {ThemeProvider} from '@mui/material/styles';
import {themeMUI} from "./assets/style/themeMUI";
import './assets/style/index.css';
import './assets/style/vestaland.css';

function App() {
  return (
    <AuthProvider>
      <StateProvider>
        <QueryClientProvider client={new QueryClient()}>
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
