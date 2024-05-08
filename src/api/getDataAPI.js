import axiosClient from "./axiosClient";

// get all
export const getUser = async() => {
    const response = await axiosClient.get(`/users/`);
    return response.data;
};

export const getCourse = async() => {
    const response = await axiosClient.get(`/courses/`);
    return response.data;
}

export const getCurriculum = async() => {
    const response = await axiosClient.get(`/curriculums/`);
    return response.data;
}

// get id
export const getUserById = async(id) => {
    const response = await axiosClient.get(`/users/${id}`);
    return response.data;
};

export const getCourseById = async(id) => {
    const response = await axiosClient.get(`/courses/${id}`);
    return response.data;
}

export const getCurriculumById = async(id) => {
    const response = await axiosClient.get(`/curriculums/${id}`);
    return response.data;
}