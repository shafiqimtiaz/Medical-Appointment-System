import React from "react";
import { Layout, Typography } from "antd";
import SingleAppointment from "./SingleAppointment";
import OperateAppointments from "./OperateAppointment";

const { Content } = Layout;
const { Title } = Typography;

const contentStyle = {
  display: "flex",
  marginTop: "10px",
  flexDirection: "column",
};
const titleStyle = {
  padding: "10px",
  marginTop: "15px",
};

export default function FullAppointment() {
  return (
    <Content style={contentStyle}>
      <Title level={4} style={titleStyle}>
        {" "}
        Booked Appointments
      </Title>
      <SingleAppointment />
      <Title level={4} style={titleStyle}>
        {" "}
        Accept / Reject Appointments
      </Title>
      <OperateAppointments />
    </Content>
  );
}
