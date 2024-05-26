import axiosClient from "./axiosClient";

export const DeleteCourse = async(id) => {
    const response = await axiosClient.delete(`/courses/${id}`);
    return response.data;
}

export const DeleteCurriculum = async(id) => {
    const response = await axiosClient.delete(`/curriculums/${id}`);
    return response.data;
}