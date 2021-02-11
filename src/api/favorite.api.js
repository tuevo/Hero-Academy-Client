import axiosClient from './axios-client';

const baseUrl = '/favorites';

const favoriteApi = {
    getAll: () => {
        let url = `${baseUrl}`;

        return axiosClient.get(url);
    }
}

export default favoriteApi;