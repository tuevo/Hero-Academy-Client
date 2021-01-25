import axiosClient from './axios-client';

const baseUrl = '/users';

const userApi = {
  single: () => {
    const url = `${baseUrl}/`;
    return axiosClient.get(url);
  }
}

export default userApi;