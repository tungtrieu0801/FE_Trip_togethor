import React, { use, useEffect } from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import { login } from '../service/AuthService';
import { useNavigate } from 'react-router-dom';
import socket from '../../../configs/socketConnect';
import { userState } from '../../../state/user.state';
const { Text, Title } = Typography;

export default function LoginPage() {
  const setCurrentUserId = userState(state => state.setCurrentUserId);
  const { currentUserId } = userState();
  useEffect(() => {
    function handleConnect() {
      console.log("Connected to socket server");
    }
    function handleMessage(data) {
      console.log(data);
    }

    socket.on("connect", handleConnect);
    socket.on("message", handleMessage);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("message", handleMessage);
    };
  }, []);

  const navigate = useNavigate();
  // Hàm xử lý khi ấn đăng nhập
  const handleLogin = async (values) => {
    console.log('Login info:', values);
    const response = await login(values.phone, values.password);
    if (response.statuCode === 200) {
      setCurrentUserId(response.data.id);
      localStorage.setItem('token', response.data.accessToken);
      message.success(response.message);
      navigate('/home');
    } else {
      console.error('Đăng nhập thất bại:', response.data.message);
    }
    
  };

  return (
    <div style={{ maxWidth: 360, margin: '50px auto', padding: 24, border: '1px solid #f0f0f0', borderRadius: 8 }}>
      <Title level={3} style={{ textAlign: 'center' }}>
        Đăng Nhập
      </Title>

      <Form
        layout="vertical"
        onFinish={handleLogin}
      >
        <Form.Item
          label="Số điện thoại"
          name="phone"
          // rules={[
          //   { required: true, message: 'Vui lòng nhập email!' },
          //   { type: 'email', message: 'Email không hợp lệ!' },
          // ]}
        >
          <Input placeholder="Nhập số điện thoại" />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="password"
          // rules={[
          //   { required: true, message: 'Vui lòng nhập mật khẩu!' },
          //   { min: 6, message: 'Mật khẩu ít nhất 6 ký tự!' },
          // ]}
        >
          <Input.Password placeholder="Nhập mật khẩu" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Đăng Nhập
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}