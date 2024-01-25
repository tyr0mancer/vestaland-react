import axios, {AxiosResponse} from 'axios';
import {config} from "../config";
import {AUTH_NO_TOKEN_ERROR_MESSAGE} from "../../shared-types/config";

// wird nur verwendet, um das auth token zu erneuern
const refreshClient = axios.create({
  baseURL: config.authBaseUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  }
});


/**
 * Axios Client
 * Setzt baseUrl aus config und handhabt Fehlermeldungen und abgelaufene Auth Token
 */
export const apiClient = axios.create({
  baseURL: config.apiBaseUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  }
});

apiClient.interceptors.response.use(
  (response) => {
    if (config.logApi)
      console.log('API Response', response)
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    console.log('status', error.response?.status)

    switch (error.response?.status) {

      /*
          401 bedeutet das Auth Token ist abgelaufen oder es wurde keins mitgesendet
          (z.B. durch Browser-Refresh oder Fensterwechsel),
          daher einmaliger Aufruf der myConfig.tokenRefreshUrl.
      */
      case 401 :
        if (originalRequest._retry) {
          handleApiError(error);
          break
        }

        if (error.response.data.message === AUTH_NO_TOKEN_ERROR_MESSAGE) {
          return Promise.reject('');
        }

        // Endlosschleife verhindern und Token Refresh (führt den Call dann mit neuem Header aus)
        originalRequest._retry = true;
        return tryRefreshToken(originalRequest)

      /*
          400 bedeutet meist ungültige Validierung
      */
      case 400 :
        handleError(error.response?.data);
        break


      /*
        In anderen Fällen lediglich console.error()
      */
      default :
        console.error(error.response.data)
        return Promise.reject(error);
    }

  }
);


/**
 * Sendet den Fehler als Event an das window Objekt.
 * <Custom Alert /> greift die Meldung auf und zeigt den Fehler dann an.
 * State-Management mittels dispatch() nicht möglich, da Fehler außerhalb des ContextProviders auftreten können
 *
 * @see CustomAlerts
 *
 * @param error
 */
export function handleApiError(error: AxiosResponse) {
  console.error('handleError', error)
  window.dispatchEvent(new CustomEvent('api-error', {detail: error}));
}


export function handleError(error: any) {
  // @todo sanity checks etc.
  console.error('handleError', error)
  window.dispatchEvent(new CustomEvent('api-error', {detail: error}));
}


/**
 * Verwende Refresh-Client und rufe /auth/refresh API-Route auf.
 * Falls ein HTTP-only cookie für den API Server im Browser gesetzt wurde, wird ein neues Auth-Token zurückgesendet.
 *
 * @param originalRequest Ursprüngliche Anfrage, die danach mit neuem Header nochmal gestellt wird
 */
export function tryRefreshToken(originalRequest: any) {

  refreshClient.post(config.tokenRefreshPath)
    .then(response => {
      // Neues Auth-Token dann im Header des Axios apiClients setzen
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${response.data.authtoken}`;

      // Und den ursprünglich abgelehnten API-Call mit neuem Token zurück geben, damit er ausgeführt werden kann
      originalRequest.headers['Authorization'] = `Bearer ${response.data.authtoken}`;
      return apiClient(originalRequest);
    })
    .catch(error => console.error('Error while trying to refresh Token', error.response || error))

}
