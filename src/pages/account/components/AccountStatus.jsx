import { Tag } from 'antd';
import PropTypes from 'prop-types';

const AccountStatus = ({ isLocked }) => {
  return <Tag color={isLocked ? 'volcano' : 'green'}>{isLocked ? 'Locked' : 'OK'}</Tag>;
};

AccountStatus.propTypes = {
  isLocked: PropTypes.bool,
};

export default AccountStatus;
