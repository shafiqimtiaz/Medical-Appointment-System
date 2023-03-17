import { Button, Form, Select, DatePicker, notification, Modal } from 'antd';
import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
export default function AppointementModal({record}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { currentUser } = useSelector((state) => state.user);
    const [date,setDate] = useState("");

    const headers = useMemo(
        () => ({ Authorization: `Bearer ${currentUser.access_token}` }),
        [currentUser.access_token]
      );  

      const appointementNotification = () => {
        notification.open({
          message: "Your appointement has been successfully modified!",
          placement: "top",
        });
      };
      const errorNotification = () => {
        notification.open({
          message: "It seems there was an error when trying to modify an appointement",
          placement: "top",
        });
      };
        

    const showModal = () => {
      setIsModalOpen(true);
    };
    const handleOk = async() => {
        try {
            let appointement = {
                appointmentDate: new Date(date)
            }
            const res = await axios.put(`/counselor/appointment/modify/${record.appointment_id}`, appointement, {headers})
            appointementNotification();
            setIsModalOpen(false);
        } catch (error) {
            errorNotification()
        }
    };
    const handleCancel = () => {
      setIsModalOpen(false);
    };
  
    const handleDateChange = (date) => {
      setDate(date);
    };
  
    const formRef = React.useRef(null);
    return (
      <>
        <Button type="primary" style={{backgroundColor: "orange"}} onClick={showModal}>
          Modify
        </Button>
        <Modal title="Modify Appointment" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
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
        label="Select Date & Time"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <DatePicker showTime onChange={handleDateChange} value={date}/>
      </Form.Item>
       </Form>
        </Modal>
      </>
    );}
