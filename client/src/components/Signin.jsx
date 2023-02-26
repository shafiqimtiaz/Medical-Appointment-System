import React from 'react'
import { Button, Form, Input, Typography } from 'antd';
import { Link } from 'react-router-dom';

const {mTap} = Typography;

const linkStyle = {
    color:'black',
    display:'flex',
    alignItems:'center',
    marginLeft:'-50px'
    
};

export default function Signin() {
  return (
    <Form
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 600,
      display: 'flex',
      flexDirection: 'column',
      alignContent: 'center'
    }}
    initialValues={{
      remember: true,
    }}
    autoComplete="off"
  >
    <Form.Item
      label="Username"
      name="username"
      rules={[
        {
          required: true,
          message: 'Please input your username!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Form.Item style={{display:'flex', alignItems:'center'}}>
      <Button type="primary" htmlType="submit">
        Login
      </Button>
      </Form.Item>
      <Form.Item>
      <Link to="/register">
      <mTap style={linkStyle}>
        New User? Register Here
      </mTap>
      </Link>
      </Form.Item>
      </Form.Item>
  </Form>
);}
