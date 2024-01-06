import { Tag } from 'antd';
import PropTypes from 'prop-types';

const AccountProvider = ({ provider }) => {
  let color;
  switch (provider) {
    case 'facebook':
      color = 'blue';
      break;
    case 'google':
      color = 'volcano';
      break;

    default:
      color = 'green';
      break;
  }
  return <Tag color={color}>{provider}</Tag>;
};

AccountProvider.propTypes = {
  provider: PropTypes.string,
};

export default AccountProvider;
