import axiosClient from './axios-client';

const baseUrl = '/students';

const studentApi = {
  getAll: (page, limit) => {
    let url = `${baseUrl}`;

    if (page && limit)
      url += `?page=${page}&limit=${limit}`;

    return axiosClient.get(url);
  }
}

export default studentApi;