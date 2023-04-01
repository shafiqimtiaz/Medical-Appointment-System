import React, { useState } from "react";
import { Layout, Menu } from "antd";
import DoctorPatientsTab from "./DoctorPatientsTab";
import DoctorAppointementsTab from "./DoctorAppointementsTab";
const { Content, Sider } = Layout;

const menuStyle = {
  height: "100vh",
  marginTop: "20px",
};

const counselorItems = [
  {
    key: "1",
    label: `Patients`,
  },
  {
    key: "2",
    label: `Appointments`,
  },
];


export default function DoctorMenu() {
  const [content, setContent] = useState("Patients");

  return (
    <Layout>
      <Sider breakpoint="lg" collapsedWidth="0">
        <div className="logo" />
        <Menu
          selectable
          onSelect={({ key }) => {
            setContent(counselorItems[key - 1].label);
          }}
          style={menuStyle}
          theme="dark"
          mode="inline"
          items={counselorItems}
        />
      </Sider>
      {content === "Patients" ? (
        <Content>
          <DoctorPatientsTab/>
        </Content>
      ) : (
        <Content>
          <DoctorAppointementsTab/>
        </Content>
      )}
    </Layout>
  );
}
