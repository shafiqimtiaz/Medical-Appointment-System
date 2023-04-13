import { Button, Form, DatePicker, notification, Modal } from "antd";
import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";
import axios from "axios";
import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
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
      icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
    });
  };
  const errorNotification = () => {
    notification.open({
      message:
        "It seems there was an error when trying to modify an appointement",
      icon: <CloseCircleTwoTone twoToneColor="#E32828" />,
    });
  };

  const deleteNotification = () => {
    notification.open({
      message: "Your appointement has been cancelled",
      icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
    });
  };
  const disabledDateCheck = (date) => {
    if (date && date < moment().endOf("day")) {
      return true;
    }
    return false;
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
  const handleCancel = async () => {
    try {
      await axios.delete(
        `/doctor/appointment/delete/${record.appointment_id}`,
        { headers }
      );
      setIsModalOpen(false);
      deleteNotification();
    } catch (error) {
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
        title="Modify Appointment"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <>
            <Button type="primary" danger="true" onClick={handleCancel}>
              Cancel Appointment
            </Button>

            <Button type="primary" onClick={handleOk}>
              Submit
            </Button>
          </>,
        ]}
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
              disabledDate={disabledDateCheck}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
