import axiosClient from './axios-client';

const baseUrl = '/category-clusters';

const categoryClusterApi = {
  getAll: (page, limit) => {
    let url = `${baseUrl}`;

    if (page && limit)
      url += `?page=${page}&limit=${limit}`;

    return axiosClient.get(url);
  },
  add: (params) => {
    const url = `${baseUrl}`;
    return axiosClient.post(url, params);
  }
}

export default categoryClusterApi;