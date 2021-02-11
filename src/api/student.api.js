import axiosClient from './axios-client';

const baseUrl = '/students';

const studentApi = {
  getAll: (page, limit) => {
    let url = `${baseUrl}`;

    if (page && limit)
      url += `?page=${page}&limit=${limit}`;

    return axiosClient.get(url);
  },
  delete: (id) => {
    const url = `${baseUrl}/${id}`;
    return axiosClient.delete(url);
  },
}

export default studentApi;