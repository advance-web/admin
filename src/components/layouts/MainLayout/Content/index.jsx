import { Layout } from 'antd';
const { Content: AntContent } = Layout;
import PropTypes from 'prop-types';

const Content = ({ children }) => {
  return <AntContent>{children}</AntContent>;
};

Content.propTypes = {
  children: PropTypes.node,
};

export default Content;
