import React from 'react';
import { Link } from 'react-router-dom';
import { LaptopOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
const { Sider } = Layout;

const items = [
  { icon: UserOutlined, label: 'Account', path: '/account' },
  { icon: LaptopOutlined, label: 'Classroom', path: '/classroom' },
];

const Navigation = () => {
  return (
    <Sider width={200}>
      <Menu
        mode="inline"
        style={{
          height: '100%',
          borderRight: 0,
        }}
      >
        {items.map((item, index) => (
          <Menu.Item key={index} icon={React.createElement(item.icon)}>
            <Link to={item.path}> {item.label} </Link>
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};

export default Navigation;
