import axios from '../libs/utils/axios';

const GETALL_CLASSROOM_ENDPOINT = '/admin/classrooms';
const GET_CLASSROOM_PARTICIPANTS_ENDPOINT = (id) => `admin/classrooms/${id}/participants`;
const UPDATE_CLASSROOM_ENDPOINT = '/admin/classrooms';

export const getAllClassroom = () => {
  return axios.get(GETALL_CLASSROOM_ENDPOINT);
};
export const getClassroomParticipant = (id) => {
  return axios.get(GET_CLASSROOM_PARTICIPANTS_ENDPOINT(id));
};

export const changeClassroomStatus = (id, active) => {
  return axios.patch(`${UPDATE_CLASSROOM_ENDPOINT}/${id}`, { active });
};
