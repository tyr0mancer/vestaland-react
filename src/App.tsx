import {QueryClient, QueryClientProvider} from 'react-query';
import React from "react";
import {MainRouter} from "./routes/router";
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/style/index.css';
import './assets/style/vestaland.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MainRouter/>
    </QueryClientProvider>
  );
}

export default App;
