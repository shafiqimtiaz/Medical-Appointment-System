import React, { useEffect, useState, useMemo } from "react";
import { Table, Space, Button } from "antd";
import { useSelector } from "react-redux";
import axios from "axios";

const columns = [
  {
    title: "Name",
    dataIndex: "created_by",
    key: "created_by",
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
    render: (text, record) => {
      <Space size="middle">
      <Button
        type="primary"
        style={{ backgroundColor: "yellow" }}
        onClick={() => {
        }}
      >
        Modify
      </Button>
      </Space>
    },
  },

];

export default function ListedAppointements() {
  const { currentUser } = useSelector((state) => state.user);
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointements, setFilteredAppointements] = useState([]);

  const filterData = (data) => {
    const filtered = data.filter((item) => item.active === true);
    setFilteredAppointements(filtered);
  };

  const headers = useMemo(
    () => ({ Authorization: `Bearer ${currentUser.access_token}` }),
    [currentUser.access_token]
  );

  const userId = useMemo(() => currentUser.user_id, [currentUser.user_id]);

  useEffect(() => {
    axios
      .get(`/patient/appointment/${userId}`, { headers })
      .then((res) => {
        setAppointments(res.data);
        filterData(res.data);
      })
      .catch((error) => console.log(error));
  }, [userId, headers, appointments]);

  return (
    <Table
      columns={columns}
      dataSource={filteredAppointements}
      pagination={false}
    />
  );
}
