import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api"
});

/* Request interceptor (adds JWT token) */

api.interceptors.request.use((config) => {

  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;

});


/* Response interceptor (handles errors globally) */

api.interceptors.response.use(

  (response) => {
    return response;
  },

  (error) => {

    if (error.response && error.response.status === 401) {

      console.log("Session expired. Logging out...");

      localStorage.removeItem("token");

      window.location.href = "/login";

    }

    return Promise.reject(error);

  }

);

export default api;