import React from "react";
import { Layout, Typography } from "antd";
import DoctorListedAppointements from "./DoctorListedAppointements";
import DoctorBookAppointement from "./DoctorBookAppointement";


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

export default function DoctorAppointementsTab() {
  return (
    <Content style={contentStyle}>
      <Title level={4} style={titleStyle}>
        {" "}
        Booked Appointments
      </Title>
      <DoctorListedAppointements />
      <Title level={4} style={titleStyle}>
        {" "}
        Book Appointement
        <DoctorBookAppointement/>
      </Title>
    </Content>
  );
}
