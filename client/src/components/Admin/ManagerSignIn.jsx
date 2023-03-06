import React, { useState } from "react";
import { Layout, Space, Typography, Form, Button, Input } from "antd";
import axios from "axios";
import { Manager } from "./Manager.jsx";
import { useNavigate, Link } from "react-router-dom";

const { Header, Content } = Layout;
const { Title } = Typography;

const headerStyle = {
  textAlign: "center",
  color: "black",
  height: 64,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  paddingInline: 50,
  lineHeight: "64px",
  backgroundColor: "rgba(255, 255, 255)",
  zIndex: "5",
};

const titleStyle = {
  padding: "10px",
  marginTop: "15px",
};
const contentStyle = {
  textAlign: "center",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "10px",
};
const shapeStyle = {
  width: "100%",
  height: "100%",
  position: "absolute",
  top: "0",
  left: "0",
  zIndex: "6",
  clipPath: "polygon(51.3% 55.8%, 100% 100%, 0% 100%)",
  backgroundColor: "#112a45",
};
const mContentStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  width: "600px",
  height: "400px",
  boxShadow: " rgba(149, 157, 165, 0.2) 0px 8px 24px",
  zIndex: "99",
  backgroundColor: "white",
};
// return form with fields and check
let access_token = null;
function FormHelper(props) {
  const [form] = Form.useForm();

  const acceptSignIn = async (user) => {
    try {
      let response = await axios.post("auth/login", user);
      if (response.data.message === "user not found!") {
        console.log(response);
      } else {
        console.log(response);
        access_token = response.data.access_token;
        props.checkVal();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleManagerSubmit = () => {
    form.validateFields().then((values) => {
      const user = {
        email: values.username,
        password: values.password,
      };
      acceptSignIn(user);
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
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
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
            message: "Please input your username!",
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
            message: "Please input your password!",
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
        <Form.Item style={{ display: "flex", alignItems: "center" }}>
          <Button
            type="primary"
            onClick={handleManagerSubmit}
            htmlType="submit"
          >
            Login
          </Button>
        </Form.Item>
      </Form.Item>
    </Form>
  );
}

function ManagerSignIn() {
  const [val, setVal] = useState(false);
  const navigate = useNavigate();
  function handleChange() {
    const updatedVal = true;
    setVal(updatedVal);
  }
  return val ? (
    navigate("/Manager", { state: { val: access_token } })
  ) : (
    <Space
      direction="vertical"
      style={{
        width: "100%",
      }}
      size={[0, 48]}
    >
      <div style={shapeStyle}></div>
      <Header style={headerStyle}>
        <Title level={3} style={titleStyle}>
          {" "}
          Hospital Management System
        </Title>
      </Header>
      <Content style={contentStyle}>
        <mContent style={mContentStyle}>
          <Title level={4} style={titleStyle}>
            {" "}
            Manager's Sign In
          </Title>
          <FormHelper checkVal={handleChange} />
          <Link to="/">
            <mTap>Back to User Login</mTap>
          </Link>
        </mContent>
      </Content>
    </Space>
  );
}

export default ManagerSignIn;