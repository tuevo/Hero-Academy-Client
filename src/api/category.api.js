import axiosClient from './axios-client';

const baseUrl = '/categories';

const categoryApi = {
  add: (params) => {
    const url = `${baseUrl}`;
    return axiosClient.post(url, params);
  },
  delete: (id) => {
    const url = `${baseUrl}/${id}`;
    return axiosClient.delete(url);
  }
}

export default categoryApi;