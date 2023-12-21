import React from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

import {MainRouter} from "./routes/MainRouter";
import {AuthProvider} from "./services/AuthProvider";

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/style/index.css';
import './assets/style/vestaland.css';

const queryClient = new QueryClient();

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <MainRouter/>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
