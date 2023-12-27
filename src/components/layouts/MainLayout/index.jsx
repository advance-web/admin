import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';

import Content from './Content';
import Header from './Header';
import Navigation from './Navigation';

const MainLayout = () => {
  return (
    <Layout>
      <Header />
      <Layout>
        <Navigation />
        <Layout
          style={{
            padding: '0 24px 24px',
          }}
        >
          <Content>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
