import axios from 'axios';
import { BASE_URL } from './axiosClient';

export const CreateCourse = async(data) => {
    const response = await axios.post(`${BASE_URL}/courses/`, data);
    return response.data;
}