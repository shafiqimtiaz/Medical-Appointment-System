import React, { useState } from "react";
import { Layout, Menu } from "antd";
import PatientsTab from "./PatientsTab";
import AppointementsTab from "./AppointementsTab";
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


export default function CouncelorMenu() {
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
          <PatientsTab/>
        </Content>
      ) : (
        <Content>
          <AppointementsTab/>
        </Content>
      )}
    </Layout>
  );
}
