import axios from "axios";
import { BASE_URL } from "./axiosClient";


// edit by id 
export const putUser = async(id, data) => {
    const response = await axios.put(`${BASE_URL}/users/${id}`, data);
    return response.data;
};

export const putCourse = async(id, data) => {
    const response = await axios.put(`${BASE_URL}/courses/${id}`, data);
    return response.data;
}

export const putCurriculum = async(id, data) => {
    const response = await axios.put(`${BASE_URL}/curriculums/${id}`, data);
    return response.data;
}