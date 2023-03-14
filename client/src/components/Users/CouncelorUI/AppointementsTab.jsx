import React from "react";
import { Layout, Typography } from "antd";
import ListedAppointements from "./ListedAppointements";
import BookAppointement from "./BookAppointement";


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

export default function AppointementsTab() {
  return (
    <Content style={contentStyle}>
      <Title level={4} style={titleStyle}>
        {" "}
        Booked Appointments
      </Title>
      <ListedAppointements />
      <Title level={4} style={titleStyle}>
        {" "}
        Book Appointement
        <BookAppointement/>
      </Title>
    </Content>
  );
}
