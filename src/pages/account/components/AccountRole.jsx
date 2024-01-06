import { Tag } from 'antd';
import PropTypes from 'prop-types';

const AccountRole = ({ role }) => {
  return <Tag color={role === 'teacher' ? 'volcano' : 'green'}>{role}</Tag>;
};

AccountRole.propTypes = {
  role: PropTypes.string,
};

export default AccountRole;
