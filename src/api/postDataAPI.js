import axiosClient from './axiosClient';

export const CreateCourse = async(data) => {
    const response = await axiosClient.post(`/courses/`, data);
    return response.data;
}

export const CreateCurriculum = async(data) => {
    const response = await axiosClient.post(`/curriculums/`, data);
    return response.data;
}

export const CreateCurriculumCourse = async(data) => {
    const response = await axiosClient.post(`/curriculumcourseview/`, data);
    return response.data;
}