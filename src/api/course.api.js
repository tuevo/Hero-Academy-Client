import axiosClient from './axios-client';

const baseUrl = '/courses';

const courseApi = {
    getAll: (page, limit, keyword, isSortUpAscending, sortBy) => {
        let url = `${baseUrl}`;

        if (page && limit)
            url += `?page=${page}&limit=${limit}`;

        if (keyword)
            url += `&keyword=${keyword}`;

        if (!isNaN(Number(isSortUpAscending)) && sortBy)
            url += `&isSortUpAscending=${isSortUpAscending}&sortBy=${sortBy}`;

        return axiosClient.get(url);
    },
    single: (id) => {
        const url = `${baseUrl}/${id}`;
        return axiosClient.get(url);
    },
    register: (id) => {
        const url = `${baseUrl}/${id}/registrations`;
        return axiosClient.post(url);
    },
    getFeedbacks: (id, page, limit) => {
        let url = `${baseUrl}/${id}/feedbacks`;

        if (page && limit)
            url += `?page=${page}&limit=${limit}`;

        return axiosClient.get(url);
    },
    addFeedback: (id, params) => {
        const url = `${baseUrl}/${id}/feedbacks`;
        return axiosClient.post(url, params);
    },
}

export default courseApi;