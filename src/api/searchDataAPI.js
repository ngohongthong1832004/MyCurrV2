import axiosClient from "./axiosClient";

export const searchCourseAPI = async(data) => {
    const response = await axiosClient.post("/searchcourse/", data);
    return response.data;
};

export const searchUserAPI = async(data) => {
    const response = await axiosClient.post("/searchuser/", data);
    return response.data;
};

export const searchcurrAPI = async(data) => {
    const response = await axiosClient.post("/searchcurr/", data);
    return response.data;
};