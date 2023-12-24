import React from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

import {MainRouter} from "./routes/MainRouter";
import {AuthProvider} from "./services/auth/AuthProvider";
import {StateProvider} from "./services/contexts/StateProvider";

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/style/index.css';
import './assets/style/vestaland.css';
import './assets/style/startseite.css';

const queryClient = new QueryClient();

function App() {
  return (
    <AuthProvider>
      <StateProvider>
        <QueryClientProvider client={queryClient}>
          <MainRouter/>
          {/*<ReactQueryDevtools/>*/}
        </QueryClientProvider>
      </StateProvider>
    </AuthProvider>
  );
}

export default App;
