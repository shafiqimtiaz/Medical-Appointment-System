import React from 'react';
import { Form, Input, Button, Typography,DatePicker } from "antd";

export const AddUser = () => {
    const [form] = Form.useForm();
    const { Title, Text } = Typography;
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
                    <DatePicker/>
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
                    <Button type="primary">Submit</Button>
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