import React from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

import {MainRouter} from "./routes/MainRouter";
import {AuthProvider} from "./services/auth/AuthProvider";
import {GlobalContextProvider} from "./services/contexts/GlobalContextProvider";

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/style/index.css';
import './assets/style/vestaland.css';
import './assets/style/startseite.css';

const queryClient = new QueryClient();

function App() {
  return (
    <AuthProvider>
      <GlobalContextProvider>
        <QueryClientProvider client={queryClient}>
          <MainRouter/>
          {/*<ReactQueryDevtools/>*/}
        </QueryClientProvider>
      </GlobalContextProvider>
    </AuthProvider>
  );
}

export default App;
