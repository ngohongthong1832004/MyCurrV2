import axios from "axios";
import { BASE_URL } from "./axiosClient";


export const getUser = async() => {
    const response = await axios.get(`${BASE_URL}/users/`);
    return response.data;
};

export const getCourse = async() => {
    const response = await axios.get(`${BASE_URL}/courses/`);
    return response.data;
}

export const getCurriculum = async() => {
    const response = await axios.get(`${BASE_URL}/curriculums/`);
    return response.data;
}