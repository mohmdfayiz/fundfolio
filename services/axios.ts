import axios from "axios";
import { getToken, setToken } from "@/utils/token";
import { globalLogout } from "@/utils/authUtils";

const env = process.env.EXPO_PUBLIC_NODE_ENV
const development = process.env.EXPO_PUBLIC_DEV_URL
const production = process.env.EXPO_PUBLIC_PROD_URL

const axiosInstance = axios.create({
  baseURL: env === "development" ? development : production,
  headers: {
    "Content-Type": "application/json",
  },
})

axiosInstance.interceptors.request.use(async (config) => {
  const accessToken = await getToken('accessToken');
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {

    const originalRequest = error.config;

    // If the error is not a 401 or it's a request to sign in or logout, reject immediately
    if (error.response.status !== 401 || originalRequest.url === '/auth/signin' || originalRequest.url === '/auth/logout') {
      return Promise.reject(error);
    }

    // Handle 401 errors and retry with refreshed token
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = await getToken('refreshToken');
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        const { data } = await axios.post(`${env === "development" ? development : production}/auth/refresh-token`, { refreshToken });
        const newAccessToken = data.accessToken;

        await setToken('accessToken', newAccessToken);
        if (data.refreshToken) {
          await setToken('refreshToken', data.refreshToken);
        }

        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // console.error('Token refresh failed:', refreshError);
        // Perform logout if refresh fails
        try {
          const refreshToken = await getToken('refreshToken');
          if (refreshToken) {
            await axios.post(`${env === 'development' ? development : production}/auth/logout`, { refreshToken });
          }
        } catch (logoutError) {
          console.error('Logout failed:', logoutError);
        } finally {
          await globalLogout();
        }
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;