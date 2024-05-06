import axios from "axios";

import { BASE_URL } from "./axiosClient";

export const DeleteCourse = async(id) => {
    const response = await axios.delete(`${BASE_URL}/courses/${id}`);
    return response.data;
}