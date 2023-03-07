import React, { useEffect, useState, useMemo } from "react";

import { Table } from "antd";
import { useSelector } from "react-redux";
import axios from "axios";
const columns = [
  {
    title: "Medical Staff",
    dataIndex: "created_by",
    key: "created_by",
  },
  {
    title: "Type",
    dataIndex: ["medical_staff", "type"],
    key: "type",
    render: (text, record) => {
      return text.toUpperCase();
    },
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
];

export default function SingleAppointement() {
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
