import { useContext, useState } from 'react';
import { useMutation } from 'react-query';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Flex, Form, Input, Typography } from 'antd';
import styled from 'styled-components';

import AuthContext from '../../contexts/auth/auth-context';
import { setJwt } from '../../libs/utils/localStorage';
import { login } from '../../services/auth';

const StyledForm = styled(Form)`
  min-width: 350px;
`;

const StyledContainer = styled('div')`
  border: 2px solid black;
  padding: 10px;
  border-radius: 8px;
  text-align: center;
`;

const SignIn = () => {
  const [error, setError] = useState(null);
  const { setUser } = useContext(AuthContext);
  const { mutate: _login, isLoading } = useMutation((data) => login(data.username, data.password), {
    onSuccess: (response) => {
      setUser(response.data.data.user);
      setJwt(response.data.token);
    },
    onError: () => setError('Sai mật khẩu'),
  });
  const onFinish = async (values) => {
    await _login(values);
    console.log(values);
  };

  return (
    <Flex vertical align="center">
      <Typography.Title>Trang quản lý</Typography.Title>
      <StyledContainer>
        {isLoading && <Typography.Title> loading </Typography.Title>}
        {error && <Typography.Title> Sai mật khẩu </Typography.Title>}
        <Typography.Title> Đăng nhập </Typography.Title>
        <StyledForm name="normal_login" onFinish={onFinish}>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your Username!',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
          </Form.Item>
        </StyledForm>
      </StyledContainer>
    </Flex>
  );
};

export default SignIn;
