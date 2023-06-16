import { Button, DatePicker, Form, Input, Select, notification } from "antd";
import { CheckCircleTwoTone, MinusCircleTwoTone } from '@ant-design/icons';
import { useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import axios from "axios";

import { useNavigate } from "react-router-dom";

const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
export default function SignUp({ user }) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDOB] = useState(null);
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [regNumber, setRegNumber] = useState("");
  const navigate = useNavigate();
  const role = user.label;

  const openNotification = () => {
    notification.open({
      message: "You can successfully log in!",
      icon: <CheckCircleTwoTone twoToneColor="#52c41a"/>
    });
  };
  const approveNotification = () => {
    notification.open({
      message: "Please wait until the manager approves your registration",
      icon: <MinusCircleTwoTone twoToneColor="#FDBA1A"/>
    });
  };

  const handleDateChange = (date) => {
    setDOB(date);
  };

  const disabledDateCheck = (date)=>{
    if(date && date > moment().endOf("day")){
      return true;
    }
    if(date && date > moment().subtract(18, "years")){
      return true
    }
    
    return false
  }
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      let newUser = null;

      if (role === "doctor") {
        newUser = {
          name: name,
          address: address,
          date_of_birth: dob,
          phone_number: number,
          email: email,
          password: password,
          role: "medical_staff",
          license_number: regNumber,
          type: "d",
        };
      } else if (role === "counselor") {
        newUser = {
          name: name,
          address: address,
          date_of_birth: dob,
          phone_number: number,
          email: email,
          password: password,
          role: "medical_staff",
          license_number: regNumber,
          type: "c",
        };
      } else {
        newUser = {
          name: name,
          address: address,
          date_of_birth: dob,
          phone_number: number,
          email: email,
          password: password,
          role: role,
        };
      }
      const res = await axios.post("/auth/registration", newUser);
      if (role !== "patient") {
        approveNotification();
        navigate("/");
      } else {
        openNotification();
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [form] = Form.useForm();
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="1">+1</Option>
      </Select>
    </Form.Item>
  );
  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      initialValues={{
        prefix: "1",
      }}
      style={{
        maxWidth: 600,
      }}
      scrollToFirstError
    >
      <Form.Item
        name="name"
        label="Name"
        rules={[
          {
            required: true,
            message: "Please input your name!",
            whitespace: true,
          },
        ]}
      >
        <Input onChange={(e) => setName(e.target.value)} />
      </Form.Item>
      <Form.Item
        name="adress"
        label="Address"
        rules={[
          {
            required: true,
            message: "Please input your address!",
            whitespace: true,
          },
        ]}
      >
        <Input onChange={(e) => setAddress(e.target.value)} />
      </Form.Item>
      <Form.Item
        name="date"
        label="Date of birth"
        rules={[
          {
            required: true,
            message: "Please input your date of birth",
          },
        ]}
      >
        <DatePicker onChange={handleDateChange} value={dob} disabledDate={disabledDateCheck} />
      </Form.Item>

      <Form.Item
        name="phone"
        label="Phone Number"
        rules={[
          {
            required: true,
            message: "Please input your phone number!",
          },
        ]}
      >
        <Input
          onChange={(e) => setNumber(e.target.value)}
          addonBefore={prefixSelector}
          style={{
            width: "100%",
          }}
        />
      </Form.Item>
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ]}
      >
        <Input onChange={(e) => setEmail(e.target.value)} />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
        hasFeedback
      >
        <Input.Password onChange={(e) => setPassword(e.target.value)} />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm "
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The two passwords that you entered do not match!")
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      {user.label === "counselor" ? (
        <Form.Item
          name="crn"
          label="CRN"
          rules={[
            {
              required: true,
              message: "Please input your CRN!",
              whitespace: true,
            },
          ]}
        >
          <Input onChange={(e) => setRegNumber(e.target.value)} />
        </Form.Item>
      ) : user.label === "doctor" ? (
        <Form.Item
          name="drn"
          label="DRN"
          rules={[
            {
              required: true,
              message: "Please input your DRN!",
              whitespace: true,
            },
          ]}
        >
          <Input onChange={(e) => setRegNumber(e.target.value)} />
        </Form.Item>
      ) : (
        <></>
      )}

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" onClick={handleSubmit}>
          Register
        </Button>
        <Button type="secondary">
          <Link to="/">Cancel</Link>
        </Button>
      </Form.Item>
    </Form>
  );
}
