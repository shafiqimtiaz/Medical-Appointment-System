import React from 'react'
import {Layout, Space, Tabs, Typography } from 'antd'
import SignUp from '../components/Users/SignUp';

const {Content} = Layout
const {Title} = Typography;

const itemsReg = [
  {
    key: '1',
    label: `Patient`,
    children: <SignUp user={{label : "patient"}}/>,
  },
  {
    key: '2',
    label: `Doctor`,
    children: <SignUp user={{label : "doctor"}}/>,
  },
  {
    key: '3',
    label: `Counselor`,
    children: <SignUp user={{label : "counselor"}}/>,
  },
];


const shapeStyle = {
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: '0',
  left: '0',
  zIndex: '-1',
  clipPath: ' polygon(0% 0%, 33% 0%, 55% 100%, 0% 100%)',
  backgroundColor: '#112a45',
  '@media (max-width: 500px)': {
    display: 'none'
  }
  
};
const wrapperStyle = {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  width: '500px',
  height: '100%',
  boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;',
  zIndex: '9',
  backgroundColor:'white'

};
const tabsStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  
}
const titleStyle = {
  padding: '10px',
  '@media (max-width: 500px)': {
    fontSize: '12px'
  }

};


export default function Register() {
  return (
    <Space
    direction="vertical"
    style={{
      width: '100%',
      alignItems: 'center',
    }}
    size={[0, 48]}
    >  
    <div style={shapeStyle}></div>
    <Content style={wrapperStyle}>
    <Title level={4} style={titleStyle}> Register</Title> 
    <Tabs centered style={tabsStyle} defaultActiveKey="1" items={itemsReg}/>      
    </Content>

  </Space>
  )
}
