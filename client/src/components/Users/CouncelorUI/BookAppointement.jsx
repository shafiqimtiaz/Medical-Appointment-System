import { Button, Form, Select, TimePicker, DatePicker } from 'antd';
import React from 'react';
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};
export default function BookAppointement() {
  const formRef = React.useRef(null);
  return (
    <Form
      {...layout}
      ref={formRef}
      name="control-ref"
      style={{
        maxWidth: 600,
        marginTop: 50
      }}
    >
      <Form.Item
        name="date"
        label="Select Date"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <DatePicker/>
      </Form.Item>
      <Form.Item
        name="time"
        label="Time"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <TimePicker/>
      </Form.Item>
      <Form.Item
        name="patient"
        label="Patient"
        rules={[
          {
            required: true,
          },
        ]}
      >
      <Select>
      <Select.Option value="demo">Demo</Select.Option>      
      </Select>
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary">
          Book
        </Button>
      </Form.Item>
    </Form>
  );}
