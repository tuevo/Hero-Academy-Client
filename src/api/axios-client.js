import axios from 'axios';
import queryString from 'query-string';
import { localStorageItems } from 'constants/local-storage.constant';

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'content-type': 'application/json',
    'token': localStorage.getItem(localStorageItems.ACCESS_TOKEN.name)
  },
  paramsSerializer: params => queryString.stringify(params)
});

axiosClient.interceptors.request.use(async (config) => {
  // Handle token here...
  return config;
});

axiosClient.interceptors.response.use((response) => {
  if (response && response.data)
    return response.data;

  return response;
}, (error) => {
  // Handle error
  if (error.response && error.response.data)
    throw error.response.data;

  throw error;
});

export default axiosClient;