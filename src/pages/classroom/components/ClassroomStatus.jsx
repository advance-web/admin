import { Tag } from 'antd';
import PropTypes from 'prop-types';

const ClassroomStatus = ({ active }) => {
  return <Tag color={!active ? 'volcano' : 'green'}>{active ? 'Active' : 'Inactive'}</Tag>;
};

ClassroomStatus.propTypes = {
  active: PropTypes.bool,
};

export default ClassroomStatus;
