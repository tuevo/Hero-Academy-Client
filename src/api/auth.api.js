import axiosClient from './axios-client';

const baseUrl = '/auth';

const userApi = {
  login: (params) => {
    const url = `${baseUrl}/login`;
    return axiosClient.post(url, params);
  }
}

export default userApi;