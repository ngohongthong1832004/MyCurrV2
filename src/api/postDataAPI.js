import axiosClient from './axiosClient';

export const CreateCourse = async(data) => {
    const response = await axiosClient.post(`/courses/`, data);
    return response.data;
}