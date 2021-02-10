import axiosClient from './axios-client';

const baseUrl = '/lecturers/courses';

const lecturerCourseApi = {
    getAll: (page, limit) => {
        let url = `${baseUrl}`;

        if (page && limit)
            url += `?page=${page}&limit=${limit}`;

        return axiosClient.get(url);
    }
}

export default lecturerCourseApi;