import { useMutation, useQueryClient } from 'react-query';
import PropTypes from 'prop-types';

import { changeClassroomStatus } from '../../../services/classroom';

const useClassroomAction = () => {
  const queryClient = useQueryClient();
  const { isLoading, mutate: updateClassroomStatus } = useMutation({
    mutationFn: (data) => {
      return changeClassroomStatus(data.id, data.active);
    },
    onSuccess: (data) => {
      queryClient.setQueryData('classrooms', (oldClassrooms) => {
        console.log(oldClassrooms);
        const newClassroom = data.data.data;
        const updatedClassroomIndex = oldClassrooms.findIndex((classroom) => classroom._id === newClassroom._id);
        oldClassrooms[updatedClassroomIndex] = {
          ...oldClassrooms[updatedClassroomIndex],
          active: newClassroom.active,
        };
        return [...oldClassrooms];
      });
    },
  });
  return {
    updateClassroomStatus,
    isLoading,
  };
};

useClassroomAction.propTypes = {
  onSuccess: PropTypes.func,
};

export default useClassroomAction;
