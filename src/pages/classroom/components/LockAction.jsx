import { Button } from 'antd';
import PropTypes from 'prop-types';

import useClassroomAction from '../hooks/useClassroomAction';

const LockAction = ({ classroomId, active }) => {
  const { updateClassroomStatus } = useClassroomAction();
  return (
    <Button onClick={() => updateClassroomStatus({ id: classroomId, active: !active })} danger={active}>
      {!active ? 'Active' : 'Deactivate'}
    </Button>
  );
};

LockAction.propTypes = {
  classroomId: PropTypes.string,
  active: PropTypes.bool,
};

export default LockAction;
