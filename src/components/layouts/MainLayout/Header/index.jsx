import { useContext } from 'react';
import { Button, Flex, Layout, Typography } from 'antd';

import AuthContext from '../../../../contexts/auth/auth-context';
import { removeJwt } from '../../../../libs/utils/localStorage';

const { Header: AntHeader } = Layout;

const Header = () => {
  const { user, setUser } = useContext(AuthContext);
  console.log(user);
  const handleLogout = () => {
    setUser(null);
    removeJwt();
  };
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
          <Typography.Text style={{ color: '#fff', marginRight: '10px' }}>{user?.name}</Typography.Text>
          <Button onClick={handleLogout}>Đăng Xuất</Button>
        </div>
      </Flex>
    </AntHeader>
  );
};

export default Header;
