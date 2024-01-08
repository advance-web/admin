import React from 'react';
import { Link } from 'react-router-dom';
import { FileExcelOutlined, HeatMapOutlined, LaptopOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
const { Sider } = Layout;

const items = [
  { icon: UserOutlined, label: 'Account', path: '/account' },
  { icon: LaptopOutlined, label: 'Classroom', path: '/classroom' },
  { icon: HeatMapOutlined, label: 'Mapping Id student', path: '/mapping-id-student' },
  { icon: FileExcelOutlined, label: 'Import list students', path: '/import-excel-list-students' },
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
