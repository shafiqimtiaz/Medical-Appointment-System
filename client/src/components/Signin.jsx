import React, { useState } from 'react'
import { Button, Form, Input, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { loginFailure, loginStart, loginSuccess } from '../redux/userSlice'
const {mTap} = Typography;

const linkStyle = {
    color:'black',
    display:'flex',
    alignItems:'center',
    marginLeft:'-50px'
    
};

export default function Signin() {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const handleLogIn = async(e) =>{
    e.preventDefault();
    dispatch(loginStart());
    let user = null;
    try {
      user = {
        email: email,
        password: password,
      }
      const res = await axios.post("/auth/login",user)
      dispatch(loginSuccess(res.data));
      navigate('/dashboard');
    } catch (error) {
      dispatch(loginFailure);
    }
  }

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
      label="Email"
      name="email"
      rules={[
        {
          required: true,
          message: 'Please input your email!',
        },
      ]}
    >
      <Input onChange={e=>setEmail(e.target.value)}/>
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
      <Input.Password onChange={e=>setPassword(e.target.value)}/>
    </Form.Item>

    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Form.Item style={{display:'flex', alignItems:'center'}}>
      <Button type="primary" onClick={handleLogIn}>
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
