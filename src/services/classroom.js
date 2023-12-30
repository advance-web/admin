import axios from '../libs/utils/axios';

const GETALL_CLASSROOM_ENDPOINT = '/admin/classrooms';
const GET_CLASSROOM_PARTICIPANTS_ENDPOINT = (id) => `admin/classrooms/${id}/participants`;

export const getAllClassroom = () => {
  return axios.get(GETALL_CLASSROOM_ENDPOINT);
};
export const getClassroomParticipant = (id) => {
  return axios.get(GET_CLASSROOM_PARTICIPANTS_ENDPOINT(id));
};
