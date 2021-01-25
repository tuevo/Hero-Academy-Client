import axios from 'axios';
import queryString from 'query-string';
import { localStorageItems } from 'constants/local-storage.constant';
import { httpStatus } from 'helpers/httpStatus';

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'content-type': 'application/json'
  },
  paramsSerializer: params => queryString.stringify(params)
});

axiosClient.interceptors.request.use(async (config) => {
  const accessToken = localStorage.getItem(localStorageItems.ACCESS_TOKEN.name) || null;
  if (accessToken)
    config.headers['accessToken'] = accessToken;

  return config;
});

axiosClient.interceptors.response.use((response) => {
  if (response && response.data)
    return response.data;

  return response;
}, (error) => {
  if (error.response && error.response.data) {

    if (error.response.data.status === httpStatus.UNAUTHORIZED)
      window.location.reload();

    throw error.response.data;
  }

  throw error;
});

export default axiosClient;