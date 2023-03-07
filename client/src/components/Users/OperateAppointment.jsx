import { Table, Space, Button } from "antd";
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function OperateAppointement() {
  const { currentUser } = useSelector((state) => state.user);
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointements, setFilteredAppointements] = useState([]);

  const headers = useMemo(
    () => ({ Authorization: `Bearer ${currentUser.access_token}` }),
    [currentUser.access_token]
  );

  const userId = useMemo(() => currentUser.user_id, [currentUser.user_id]);

  const filterData = (data) => {
    const filtered = data.filter((item) => item.active === false);
    setFilteredAppointements(filtered);
  };

  useEffect(() => {
    axios
      .get(`/patient/appointment/${userId}`, { headers })
      .then((response) => response)
      .then((res) => {
        setAppointments(res.data);
        filterData(res.data);
      })
      .catch((error) => console.log(error));
  }, [userId, headers, appointments]);

  const handleAccept = async (record) => {
    await axios
      .put(`/patient/appointment/${record.appointment_id}/accept`, null, {
        headers,
      })
      .then((response) => response)
      .catch((error) => console.log(error));
  };

  const handleReject = async (record) => {
    axios
      .delete(`/patient/appointment/${record.appointment_id}/cancel`, {
        headers,
      })
      .then((response) => response)
      .catch((error) => console.log(error));
  };

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
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            style={{ backgroundColor: "green" }}
            onClick={() => {
              handleAccept(record);
            }}
          >
            Accept
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => {
              handleReject(record);
            }}
          >
            Reject
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={filteredAppointements}
      pagination={false}
    />
  );
}
