import axios from "axios";

let isRefreshing = false;
let failedQueue: any[] = [];

interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  image: string;
}

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = localStorage.getItem("refreshToken");
      const user: User | null = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user") as string)
        : null;
      if (!refreshToken) {
        // Router.push("/sign-in");
        window.location.href = "/sign-in";
        return Promise.reject(error);
      }

      try {
        const url = process.env.NEXT_PUBLIC_BASE_URL + "/auth/refresh-token";
        const response = await axios.post(url, {
          userId: user?.id,
          refreshToken,
        });

        const { accessToken: newAccessToken } = response.data;
        localStorage.setItem("accessToken", newAccessToken);

        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        localStorage.clear();
        // Router.push("/sign-in");
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
