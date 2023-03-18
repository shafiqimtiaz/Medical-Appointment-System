import React from "react";
import { Layout, Typography } from "antd";
import PatientsInfo from "./PatientsInfo";
import PendingPatients from "./PendingPatients";


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

export default function PatientsTab() {
  return (
    <Content style={contentStyle}>
      <Title level={4} style={titleStyle}>
        {" "}
        Assigned Patients
        All Patients
        <PendingPatients/>
      </Title>
    </Content>
  );
}
