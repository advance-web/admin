import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Flex, Form, Input, Typography } from 'antd';
import styled from 'styled-components';

const StyledForm = styled(Form)`
  min-width: 350px;
`;

const StyledContainer = styled('div')`
  border: 2px solid black;
  padding: 10px;
  border-radius: 8px;
`;

const SignIn = () => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (
    <Flex vertical align="center">
      <StyledContainer>
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
