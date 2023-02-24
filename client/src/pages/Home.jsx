import React from 'react'
import {Layout, Space, Image, Typography, Tabs} from 'antd'
import logo from "../assets/logo.png"
import Signin from '../components/Signin';

const {Header, Content, mContent} = Layout;
const {Title} = Typography;

const items = [
  {
    key: '1',
    label: `Patient`,
    children: <Signin/>,
  },
  {
    key: '2',
    label: `Doctor`,
    children: <Signin/>,
  },
  {
    key: '3',
    label: `Councler`,
    children: <Signin/>,
  },
];

const headerStyle = {
    textAlign: 'center',
    color: 'black',
    height: 64,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingInline: 50,
    lineHeight: '64px',
    backgroundColor: 'rgba(255, 255, 255)',
    zIndex: '5'
  };

const titleStyle = {
    padding: '10px',
    marginTop: '15px',
};
const contentStyle = {
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10px',

};
const shapeStyle = {
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: '0',
  left: '0',
  zIndex: '6',
  clipPath: 'polygon(51.3% 55.8%, 100% 100%, 0% 100%)',
  backgroundColor: '#98CCFD'
};
const mContentStyle={
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  width: '600px',
  height: '400px',
  boxShadow: ' rgba(149, 157, 165, 0.2) 0px 8px 24px',
  zIndex: '99',
  backgroundColor:'white'
}
const tabsStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  
}
  
  export default function Home() {
  return (
    <Space
    direction="vertical"
    style={{
      width: '100%',
    }}
    size={[0, 48]}
    >  
    <div style={shapeStyle}></div>
      <Header style={headerStyle}>
        <Image src={logo} preview={false}/>
        <Title level={3} style={titleStyle}> Hospital Management System</Title> 
      </Header>
      <Content style={contentStyle}>
      <mContent style={mContentStyle}>
      <Title level={4} style={titleStyle}> Sign In</Title> 
      <Tabs style={tabsStyle} defaultActiveKey="1" items={items}/>      
      </mContent>
      </Content>
  </Space>
  )
}
