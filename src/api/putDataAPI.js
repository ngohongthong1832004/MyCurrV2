import axiosClient from "./axiosClient";


// edit by id 
export const putUser = async(id, data) => {
    const response = await axiosClient.put(`/users/${id}`, data);
    return response.data;
};

export const putCourse = async(id, data) => {
    const response = await axiosClient.put(`/courses/${id}`, data);
    return response.data;
}

export const putCurriculum = async(id, data) => {
    const response = await axiosClient.put(`/curriculums/${id}`, data);
    return response.data;
}