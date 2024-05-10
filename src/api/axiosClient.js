import axios from 'axios';

export const BASE_URL = "https://2bc9-116-110-42-244.ngrok-free.app";


export const axiosClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const loginAPI = async(param) => {
    const data = await axiosClient.post("/login/", param);
    localStorage.setItem("token", data.data.token);
    const userInfo = await getUser();
    localStorage.setItem("user", JSON.stringify(userInfo.data));
};

export const getUser = async() => {
    return axiosClient.get("/get-user/");
}

export const register = async(data) => {
    return axiosClient.post("/register", data);
}

axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Token ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);
export default axiosClient;