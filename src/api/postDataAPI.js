import axiosClient from './axiosClient';

export const CreateCourse = async(data) => {
    const response = await axiosClient.post(`/courses/`, data);

    if (response.status === 201) {
        return response.data;
    } else {
        return "error";
    }
}

export const CreateCurriculum = async(data) => {
    const response = await axiosClient.post(`/curriculums/`, data);
    return response;
}

export const CreateCurriculumCourse = async(data) => {
    const response = await axiosClient.post(`/curriculumcourseview/`, data);
    return response;
}