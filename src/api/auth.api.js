import axiosClient from './axios-client';

const baseUrl = '/auth';

const authApi = {
  login: (params) => {
    const url = `${baseUrl}/login`;
    return axiosClient.post(url, params);
  },
  refresh: (params) => {
    const url = `${baseUrl}/refresh`;
    return axiosClient.post(url, params);
  }
}

export default authApi;