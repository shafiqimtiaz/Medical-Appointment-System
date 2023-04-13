import React, { useEffect, useState, useMemo } from "react";
import { Table, Space, Button } from "antd";
import { useSelector } from "react-redux";
import axios from "axios";
import DoctorAppointementsModal from "./DoctorAppointementsModal";

const columns = [
  {
    title: "Name",
    dataIndex: ["patients", "users", "name"],
    key: "name",
  },
  {
    title: "Date",
    dataIndex: "appointment_date",
    key: "appointment_date",
    render: (text, record) => {
      return text.substring(0, 10);
    },
  },
  {
    title: "Time",
    dataIndex: "appointment_date",
    key: "appointment_date",
    render: (text, record) => {
      return text.substring(11, 16);
    },
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <DoctorAppointementsModal record={record}/>
      </Space>
    ),
},

];

export default function DoctorListedAppointements() {
  const { currentUser } = useSelector((state) => state.user);
  const [appointments, setAppointments] = useState([]);


  const headers = useMemo(
    () => ({ Authorization: `Bearer ${currentUser.access_token}` }),
    [currentUser.access_token]
  );

  const userId = useMemo(() => currentUser.user_id, [currentUser.user_id]);

  useEffect(() => {
    axios
      .get(`/doctor/appointment`, { headers })
      .then((res) => {
        setAppointments(res.data);
      })
      .catch((error) => console.log(error));
  }, [userId, headers, appointments]);

  return (
    <Table
      columns={columns}
      dataSource={appointments}
      pagination={{pageSize:5}}
    />
  );
}
