import React, { useState } from 'react'
import { Button, Form, DatePicker, TimePicker, TreeSelect} from 'antd';

const data = [
    {
     value: 'Shafiq Imtiaz',
     title: 'Shafiq Imtiaz'   
    },
    {
     value: 'Shafiq Imtiaz',
     title: 'Shafiq Imtiaz'   
    },
    {
     value: 'Shafiq Imtiaz',
     title: 'Shafiq Imtiaz'   
    },
   ]


export default function BookApointement() {
    const [form] = Form.useForm();
    const [formLayout, setFormLayout] = useState('horizontal');
    const onFormLayoutChange = ({ layout }) => {
      setFormLayout(layout);
    };
    const formItemLayout =
      formLayout === 'vertical'
        ? {
            labelCol: {
              span: 4,
            },
            wrapperCol: {
              span: 14,
            },
          }
        : null;
    const buttonItemLayout =
      formLayout === 'vertical'
        ? {
            wrapperCol: {
              span: 14,
              offset: 4,
            },
          }
        : null;
    return (
      <Form
        {...formItemLayout}
        layout={formLayout}
        form={form}
        initialValues={{
          layout: formLayout,
        }}
        onValuesChange={onFormLayoutChange}
        style={{
          maxWidth: 600,
          marginLeft: '50px',
        }}
      >
        <Form.Item label="Doctor Name">
            <TreeSelect treeData={data}/>
        </Form.Item>
        <Form.Item label="Date">
            <DatePicker/>
        </Form.Item>
        <Form.Item label="Time">
            <TimePicker size=''/>
        </Form.Item>
        <Form.Item {...buttonItemLayout}>
          <Button type="primary">Book Appointement</Button>
        </Form.Item>
      </Form>
  );}
