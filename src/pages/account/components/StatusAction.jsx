import { Button } from 'antd';
import PropTypes from 'prop-types';

import useAccountAction from '../hooks/useAccountAction';

const StatusAction = ({ accountId, isLocked }) => {
  const { updateUserStatus } = useAccountAction();
  return (
    <Button onClick={() => updateUserStatus({ id: accountId, isLocked })} danger={!isLocked}>
      {isLocked ? 'Unlock' : 'Lock'}
    </Button>
  );
};

StatusAction.propTypes = {
  accountId: PropTypes.string,
  isLocked: PropTypes.bool,
};

export default StatusAction;
