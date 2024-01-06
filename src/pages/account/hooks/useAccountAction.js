import { useMutation, useQueryClient } from 'react-query';
import PropTypes from 'prop-types';

import { changeAccountStatus } from '../../../services/account';

const useAccountAction = () => {
  const queryClient = useQueryClient();
  const { isLoading, mutate: updateUserStatus } = useMutation({
    mutationFn: (data) => {
      return changeAccountStatus(data.id, !data.isLocked);
    },
    onSuccess: (data) => {
      queryClient.setQueryData('users', (oldUsers) => {
        const newUser = data.data.data;
        const updatedUserIndex = oldUsers.findIndex((user) => user._id === newUser._id);
        oldUsers[updatedUserIndex] = {
          ...oldUsers[updatedUserIndex],
          isLocked: newUser.isLocked,
        };
        return [...oldUsers];
      });
    },
  });
  return {
    updateUserStatus,
    isLoading,
  };
};

useAccountAction.propTypes = {
  onSuccess: PropTypes.func,
};

export default useAccountAction;
