import axios from '../libs/utils/axios';

const GETALL_USER_ENDPOINT = '/admin/users';
const UPDATE_USER_ENDPOINT = (id) => `/admin/users/${id}`;

export const getAllUser = () => {
  return axios.get(GETALL_USER_ENDPOINT);
};

export const changeAccountStatus = (id, isLocked) => {
  return axios.patch(UPDATE_USER_ENDPOINT(id), { isLocked });
};
