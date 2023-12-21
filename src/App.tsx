import {QueryClient, QueryClientProvider} from 'react-query';
import React from "react";
import {MainRouter} from "./routes/router";
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
