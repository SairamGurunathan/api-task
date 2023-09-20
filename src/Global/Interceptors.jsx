import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: "https://fts-backend.onrender.com",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accesstoken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log(response);
    switch (response?.status) {
      case 200:
        toast("success");
        break;
      case 400:
        toast("Invalid email or password");
        break;
      case 401:
        console.log("401");
        const refreshToken = localStorage.getItem("refreshtoken");
        return api
          .post("/admin/refreshToken", {
            refreshtoken: refreshToken,
          })
          
          .then((res) => {
            console.log(refreshToken)
            console.log(res.data);
            if (res.status === 200) {
              const newAccessToken = res.data.accessToken;
              localStorage.setItem("accesstoken", newAccessToken);
              console.log(newAccessToken);
              res.config.headers.Authorization = `Bearer ${newAccessToken}`;
              console.log(res.data);
              return api(res.config);
            }
          });
      default:
        return response;
    }
    return response;
  },
  (error) => {
    toast.error(error);
    return Promise.reject(error);
  }
);

export default api;
