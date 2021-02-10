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
    }
}

export default courseApi;