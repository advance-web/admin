import { Button, Flex, Layout, Typography } from 'antd';

const { Header: AntHeader } = Layout;

const Header = () => {
  return (
    <AntHeader
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Flex style={{ width: '100%' }} align="center" justify="space-between">
        <Typography.Text style={{ color: '#fff', fontSize: '32px' }}>Admin</Typography.Text>
        <div>
          <Typography.Text style={{ color: '#fff', marginRight: '10px' }}>Thịnh Lê</Typography.Text>
          <Button>Đăng Xuất</Button>
        </div>
      </Flex>
    </AntHeader>
  );
};

export default Header;
