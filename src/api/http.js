import axios from "axios";
import storage from "../storage/storage";

// const BASE_URL = "http://syu-web.test/api";
const BASE_URL = "http://192.168.100.7:8000/api";
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

    if (auth && auth.data && auth.data.token) {
      return setAuthHeaders(config, auth.data.token);
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
    return Promise.reject(error);
  }
);

export const HTTP = axios;
