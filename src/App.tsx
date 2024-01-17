import React from "react";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

import {config} from "./util/config";
import {StateProvider} from "./util/state/StateProvider";
import {AuthProvider} from "./util/auth/AuthProvider";
import {MainRouter} from "./components/layout/MainRouter";

import {ThemeProvider} from '@mui/material/styles';
import {themeMUI} from "./assets/style/themeMUI";
import './assets/style/index.css';
import './assets/style/vestaland.css';


/**
 * Wurzelkomponente der App. Beinhaltet Routing und stellt folgende Provider bereit:
 * - AuthProvider: Verantwortlich für die Authentifizierung.
 * - StateProvider: Verwaltet den globalen Zustand der Anwendung.
 * - QueryClientProvider: Ermöglicht das Daten-Fetching und State-Management mit react-query.
 * - ThemeProvider: Definiert das Design-Theme für Material-UI-Komponenten.
 *
 * @see MainRouter Für das Haupt-Routing der Anwendung.
 */
export function App(): React.ReactElement {
  return (
    <AuthProvider>
      <StateProvider>
        <QueryClientProvider client={new QueryClient()}>
          <ThemeProvider theme={themeMUI}>
            <MainRouter/>
          </ThemeProvider>
          {config.devMode && <ReactQueryDevtools/>}
        </QueryClientProvider>
      </StateProvider>
    </AuthProvider>
  )
}
