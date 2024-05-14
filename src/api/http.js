import axios from "axios";
import storage from "../storage/storage";
import { BASE_URL } from "../../env";

axios.defaults.baseURL = BASE_URL;

const setAuthHeaders = (config, authToken) => {
  let contentType = "application/json";

  if (config.headers && config.headers["Custom-Content-Type"]) {
    contentType = config.headers["Custom-Content-Type"];
    delete config.headers["Custom-Content-Type"];
  }

  config.headers["Content-Type"] = contentType;
  config.headers["Accept"] = "application/json";
  if (authToken) {
    config.headers["Authorization"] = `Bearer ${authToken}`;
  }

  return config;
};

axios.interceptors.request.use(async (config) => {
  try {
    const auth = await storage.load({ key: "authState" });
    if (auth && auth.token) {
      return setAuthHeaders(config, auth.token);
    } else {
      return setAuthHeaders(config, null);
    }
  } catch (error) {
    return setAuthHeaders(config, null);
  }
});

//For Unauthorized response handler
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      storage.remove({ key: "authState" });
    }
    return Promise.reject(error);
  }
);

export const HTTP = axios;
