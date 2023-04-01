import { Button, Form, DatePicker, notification, Modal } from "antd";
import axios from "axios";
import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

export default function DoctorAppointementsModal({ record }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [date, setDate] = useState("");

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
      message:
        "It seems there was an error when trying to modify an appointement",
      placement: "top",
    });
  };

  const deleteNotification = () => {
    notification.open({
      message:
        "Your appointement has been deleted!",
      placement: "top",
    });
  };


  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    let editedDate = new Date(date);
    editedDate.setHours(editedDate.getHours() - 4);
    try {
      let appointement = {
        appointmentDate: editedDate,
      };
      await axios.put(
        `/doctor/appointment/modify/${record.appointment_id}`,
        appointement,
        { headers }
      );
      appointementNotification();
      setIsModalOpen(false);
    } catch (error) {
      errorNotification();
    }
  };
  const handleCancel = async() => {
    try{
    await axios.delete(`/doctor/appointment/delete/${record.appointment_id}`, {headers});
    setIsModalOpen(false);
    deleteNotification()
    }
    catch(error){
      errorNotification();
    }
  };

  const handleDateChange = (date) => {
    setDate(date);
  };

  const formRef = React.useRef(null);
  return (
    <>
      <Button
        type="primary"
        style={{ backgroundColor: "orange" }}
        onClick={showModal}
      >
        Modify
      </Button>
      <Modal
        cancelText="Delete Appointment"
        okText="Submit"
        cancelButtonProps={{
          type: "primary",
          danger: true,
        }}
        title="Modify Appointment"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          {...layout}
          ref={formRef}
          name="control-ref"
          style={{
            maxWidth: 600,
            marginTop: 50,
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
            <DatePicker
              showTime
              minuteStep={15}
              hourStep={1}
              format="YYYY/MM/DD HH:mm"
              onChange={handleDateChange}
              value={date}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
