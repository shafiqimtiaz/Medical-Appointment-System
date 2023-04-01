import React, { useState } from "react";
import { Layout, Menu, Button } from "antd";
import "./Manager.scss";
import { ParentTable } from "./ParentTable";
import { useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";

const { Header, Content, Sider, Footer } = Layout;

export const Manager = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("2");
  const [isLogOut, setLogOut] = useState(false);

  try {
    const location = useLocation();

    let content;
    switch (selectedMenuItem) {
      case "1":
        content = (
          <ParentTable
            item={selectedMenuItem}
            accessToken={location.state.val}
          />
        );
        break;
      case "2":
        content = (
          <ParentTable
            item={selectedMenuItem}
            accessToken={location.state.val}
          />
        );
        break;
      case "3":
        content = (
          <ParentTable
            item={selectedMenuItem}
            accessToken={location.state.val}
          />
        );
        break;
      default:
        content = (
          <ParentTable
            item={selectedMenuItem}
            accessToken={location.state.val}
          />
        );
    }
    const menuItems = [
      {
        key: "1",
        label: "View Registration",
        onClick: () => setSelectedMenuItem("1"),
      },
      {
        key: "2",
        label: "View Users",
        onClick: () => setSelectedMenuItem("2"),
      },
      {
        key: "3",
        label: "Add New User",
        onClick: () => setSelectedMenuItem("3"),
      },
      {
        key: "4",
        label: "Reports",
        onClick: () => setSelectedMenuItem("4"),
      },
    ];

    function logOut() {
      setLogOut(true);
    }

    return isLogOut ? (
      <Navigate to="/" />
    ) : (
      <Layout style={{ minHeight: "100vh" }}>
        <Header>
          <div className="header-content">
            <div className="logo">Manager Dashboard</div>
            <Button type="primary" onClick={logOut}>
              Logout
            </Button>
          </div>
        </Header>
        <Layout>
          <Sider width={200} className="sidebar">
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={["2"]}
              items={menuItems}
            ></Menu>
          </Sider>
          <Layout className="main-content">
            <Content className="content">{content}</Content>
            <Footer style={{ textAlign: "center", backgroundColor: "fff" }}>
              SPM Project ©2023 Created by Group 7
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    );
  } catch (error) {
    return <Navigate to="/Admin" />;
  }
};
