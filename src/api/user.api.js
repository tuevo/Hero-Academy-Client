import axiosClient from './axios-client';

const baseUrl = '/users';

const userApi = {
  signIn: (params) => {
    const url = `${baseUrl}/login`;
    return axiosClient.post(url, params);
  }
}

export default userApi;