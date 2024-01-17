import axios from 'axios';
import {config} from "../config";
import {AUTH_NO_TOKEN_ERROR_MESSAGE} from "../../shared-types/config";

// wird nur verwendet, um das auth token zu erneuern
const refreshClient = axios.create({
  baseURL: config.apiBaseUrl,
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
    if (config.devMode)
      console.log('API Response', response)
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    /*
        401 bedeutet das Auth Token ist abgelaufen oder es wurde keins mitgesendet
        (z.B. durch Browser-Refresh oder Fensterwechsel),
        daher einmaliger Aufruf der myConfig.tokenRefreshUrl.
    */
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      if (error.response.data.message === AUTH_NO_TOKEN_ERROR_MESSAGE) {
        return Promise.reject('');
      }

      // Endlosschleife verhindern
      originalRequest._retry = true;
      return tryRefreshToken(originalRequest)
    }

    /*
        400 bedeutet: ZOD Schema wurde nicht validiert. Informiere Enduser
    */
    if (error.response?.status === 400) {
      handleError(error.response.data);
    }

    /*
        In anderen Fällen lediglich console.error()
    */
    console.error(error.response.data)
    return Promise.reject(error);
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
export function handleError(error: any) {
  // @todo sanity checks etc.
  // console.error('handleError', error)
  window.dispatchEvent(new CustomEvent('api-error', {detail: error}));
}


/**
 * Verwende Refresh-Client und rufe /auth/refresh API-Route auf.
 * Falls ein HTTP-only cookie für den API Server im Browser gesetzt wurde, wird ein neues Auth-Token zurückgesendet.
 *
 * @param originalRequest Ursprüngliche Anfrage, die danach mit neuem Header nochmal gestellt wird
*/
export function tryRefreshToken(originalRequest: any) {

  refreshClient.post(config.apiBaseUrl + config.tokenRefreshUrl)
    .then(response => {
      // Neues Auth-Token dann im Header des Axios apiClients setzen
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${response.data.authtoken}`;

      // Und den ursprünglich abgelehnten API-Call mit neuem Token zurück geben, damit er ausgeführt werden kann
      originalRequest.headers['Authorization'] = `Bearer ${response.data.authtoken}`;
      return apiClient(originalRequest);
    })
    .catch(error => console.error('Error while trying to refresh Token', error.response || error))

}
