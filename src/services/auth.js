import axios from '../libs/utils/axios';

const LOGIN_ENDPOINT = '/admin/login';
const GETME_ENDPOINT = '/admin/me';

export const login = (username, password) => {
  return axios.post(LOGIN_ENDPOINT, { username, password });
};

export const getMe = () => axios.get(GETME_ENDPOINT);
