import axios from "axios";
import { BASE_URL } from "./axiosClient";

// get all
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

// get id
export const getUserById = async(id) => {
    const response = await axios.get(`${BASE_URL}/users/${id}`);
    return response.data;
};

export const getCourseById = async(id) => {
    const response = await axios.get(`${BASE_URL}/courses/${id}`);
    return response.data;
}

export const getCurriculumById = async(id) => {
    const response = await axios.get(`${BASE_URL}/curriculums/${id}`);
    return response.data;
}