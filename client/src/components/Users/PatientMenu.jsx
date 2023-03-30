import React, { useState } from "react";
import { Layout, Menu } from "antd";
import Assessment from "./Assessment";
import FullAppointment from "./FullAppointment";
const { Content, Sider } = Layout;

const menuStyle = {
  height: "100vh",
  marginTop: "20px",
};

const patientItems = [
  {
    key: "1",
    label: `Assessments`,
  },
  {
    key: "2",
    label: `Appointments`,
  },
];


export default function PatientMenu() {
  const [content, setContent] = useState("Assessments");

  return (
    <Layout>
      <Sider breakpoint="lg" collapsedWidth="0">
        <div className="logo" />
        <Menu
          selectable
          onSelect={({ key }) => {
            setContent(patientItems[key - 1].label);
          }}
          style={menuStyle}
          theme="dark"
          mode="inline"
          items={patientItems}
        />
      </Sider>
      {content === "Assessments" ? (
        <Content>
          <Assessment />
        </Content>
      ) : (
        <Content>
          <FullAppointment />
        </Content>
      )}
    </Layout>
  );
}
