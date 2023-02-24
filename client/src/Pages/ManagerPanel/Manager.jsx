import React, { useState } from 'react';
import { Layout, Menu, Button} from 'antd';
import './Manager.scss';
import { ParentTable, ViewRegisters, TableComponent } from '../../Components/Table/ParentTable';

const { Header, Content, Sider, Footer } = Layout;


function Manager() {
    const [selectedMenuItem, setSelectedMenuItem] = useState("2");
    let content;
    switch (selectedMenuItem) {
      case "1":
        content = <ParentTable item={selectedMenuItem} />;
        break;
      case "2":
        content = <ParentTable item={selectedMenuItem}/>;
        break;
      case "3":
        content = <div>Add user</div>;
        break;
      default:
        content = <ParentTable item={selectedMenuItem}/>;
    }
    return (
    <Layout style={{ minHeight: '100vh' }}>
        <Header>
            <div className="header-content">
            <div className="logo">Admin Dashboard</div>
            <Button className="logout-btn" type="text">Logout</Button>
            </div>
        </Header>
        <Layout>
            <Sider width={200} className="sidebar">
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['2']}>
                    <Menu.Item key="2" onClick={() => setSelectedMenuItem("2")}>View Users</Menu.Item>
                    <Menu.Item key="1" onClick={() => setSelectedMenuItem("1")}>View registers</Menu.Item>
                    <Menu.Item key="3" onClick={() => setSelectedMenuItem("3")}>Add new user</Menu.Item>
                </Menu>
            </Sider>
            <Layout className="main-content">
                <Content className="content">
                    {content}
                </Content>
                <Footer>Footer</Footer>
            </Layout>
        </Layout>
    </Layout>
);
}

export default Manager;
