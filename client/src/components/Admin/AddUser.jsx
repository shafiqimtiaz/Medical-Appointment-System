import React from 'react';
import moment from "moment";
import { Form, Input, Button, Typography,DatePicker } from "antd";
import NOTIFICATION_DETAILS from "./Constants";
import showNotification from "./showNotification";
import acceptPatient from './AddUserWithBackEnd';


export const AddUser = (props) => {
    const [form] = Form.useForm();
    const { Title, Text } = Typography;

    const disabledDateCheck = (date)=>{
        if(date && date > moment().endOf("day")){
          return true;
        }
        if(date && date > moment().subtract(18, "years")){
          return true
        }
        
        return false
      }
    


    const handleFormSubmit = () => {
		form.validateFields()
			.then((values) => {

                // console.log(`hello world`);
                // console.log(values);

                const patient = {
                    name : values.name,
                    address: values.address,
                    email: values.email,
                    password: values.password,
                    role: 'patient',
                    date_of_birth: values.dob,
                    phone_number: values.number
                };

                acceptPatient(patient);
                showNotification("success", NOTIFICATION_DETAILS.success);
                form.resetFields();
                props.handleSubmit();
                   
			})
			.catch((errorInfo) => {
                showNotification("error", NOTIFICATION_DETAILS.error);
            });
	};

    return (
        <div>
            <Title // Form's Title
                level={3}
                style={{
                marginBottom: 0,
                paddingTop: 20,
                paddingLeft: 30,
                paddingRight: 30,
                textAlign: 'left',
                }} 
            >
                Add Patient
            </Title>
            <div style={{ textAlign: "left" }}>
            <Text // Form's Description
                type="secondary"
                style={{
                paddingLeft: 30,
                paddingRight: 30,
                textAlign: 'left',
                }}
            >
                Add Patient Information
            </Text>
            </div>

            {/* Ant Design's Form Component starts */}
            <Form
                name="add-patient"
                layout="vertical"
                form={form}
                wrapperCol={{
                    span: 6,
                }}
                style={{
                    marginTop: 20,
                    paddingBottom: 10,
                    paddingLeft: 30,
                    paddingRight: 30,
                }}
            >
                <Form.Item // Form Item (Name)
                    label="Name"
                    name="name"
                    required
                    tooltip="This is a required field"
                    rules={[
                        {
                        required: true,
                        message: "Please enter your name!",
                        },
                    ]}
                    >
                    <Input placeholder="Name" />
                </Form.Item>
                <Form.Item // Form Item (Email)
                    label="Email"
                    name="email"
                    required
                    tooltip="This is a required field"
                    rules={[
                        {
                        required: true,
                        message: "Please enter your email!",
                        type: "email",
                        },
                    ]}
                    >
                    <Input placeholder="Email" />
                </Form.Item>
                <Form.Item // Form Item (Passowrd)
                    label="Password"
                    name="password"
                    required
                    tooltip="This is a required field"
                    rules={[
                        {
                        required: true,
                        message: "Please enter your password!",
                        },
                    ]}
                    >
                    <Input.Password placeholder="Password" />
                </Form.Item>
                <Form.Item // Form Item (Date of birth)
                    label="Date of Birth"
                    name="dob"
                    required
                    tooltip="This is a required field"
                    style={{ textAlign: 'left' }}
                    rules={[
                        {
                        required: true,
                        message: "Please enter your date of birth!",
                        },
                    ]}
                    >
                    <DatePicker disabledDate={disabledDateCheck}/>
                </Form.Item>
                <Form.Item // Form Item (Address)
                    label="Address"
                    name="address"
                    required
                    tooltip="This is a required field"
                    rules={[
                        {
                        required: true,
                        message: "Please enter your address!",
                        },
                    ]}
                    >
                    <Input placeholder="Address" />
                </Form.Item>
                <Form.Item // Form Item (Phone number)
                    label="Number"
                    name="number"
                    required
                    tooltip="This is a required field"
                    rules={[
                        {
                        required: true,
                        message: "Please enter your Phone Number!",
                        },
                    ]}
                    >
                    <Input placeholder="Phone Number" />
                </Form.Item>
                <Form.Item // Form Item (Submit Button)
                style={{ textAlign: 'left' }}
                >
                    <Button type="primary" onClick={handleFormSubmit}>Submit</Button>
                </Form.Item>
            </Form>
        </div>
    );
};



//Name
//Email
//Passowrd
//Address
//Date of Birth 
//Health Condition
//User Id by default incremented
//Role by Default is Patient 