import React from 'react'
import {Layout, Space, Typography, Form, Button, Input} from 'antd'
import axios from 'axios'

const {Header, Content} = Layout;
const {Title} = Typography;

// return form with fields and check
function FormHelper() {

    const [form] = Form.useForm();

    const handleManagerSubmit = () => {
        form.validateFields()
            .then(async (values) => {
    
                const user = {
                    username: values.username,
                    password: values.password
                };
    
                const res = await axios.post('http://localhost:3001/api/v1/auth/login',user);
                console.log(res);
    
                
                   
            })
            .catch((errorInfo) => {
                
            });
    };


    return (
      <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      form={form}
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
            <Button type="primary"  onClick = {handleManagerSubmit} htmlType="submit">
            Login
            </Button>
        </Form.Item>
        </Form.Item>
    </Form>
  );}

const headerStyle = {
    textAlign: 'center',
    color: 'black',
    height: 64,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingInline: 50,
    lineHeight: '64px',
    backgroundColor: 'rgba(255, 255, 255)',
    zIndex: '5'
  };

const titleStyle = {
    padding: '10px',
    marginTop: '15px',
};
const contentStyle = {
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10px',

};
const shapeStyle = {
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: '0',
  left: '0',
  zIndex: '6',
  clipPath: 'polygon(51.3% 55.8%, 100% 100%, 0% 100%)',
  backgroundColor: '#112a45'
};
const mContentStyle={
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  width: '600px',
  height: '400px',
  boxShadow: ' rgba(149, 157, 165, 0.2) 0px 8px 24px',
  zIndex: '99',
  backgroundColor:'white'
}
  
 function ManagerSignIn() {
  return (
    <Space
    direction="vertical"
    style={{
      width: '100%',
    }}
    size={[0, 48]}
    >  
    <div style={shapeStyle}></div>
      <Header style={headerStyle}>
        <Title level={3} style={titleStyle}> Hospital Management System</Title> 
      </Header>
      <Content style={contentStyle}>
      <mContent style={mContentStyle}>
      <Title level={4} style={titleStyle}> Manager's Sign In</Title> 
      <FormHelper />
      </mContent>
      </Content>
  </Space>
  )
}

export default ManagerSignIn;