import axiosClient from './axios-client';

const baseUrl = '/categories';

const categoryApi = {
  add: (params) => {
    const url = `${baseUrl}`;
    return axiosClient.post(url, params);
  }
}

export default categoryApi;