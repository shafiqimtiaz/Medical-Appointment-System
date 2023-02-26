import React from 'react'
import Mainmenu from '../Components/Mainmenu.jsx';
import { Layout, Button, Typography } from 'antd';
const { Header } = Layout;
const {Title} = Typography;


const headerStyle = {
    textAlign: 'center',
    height: 60,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingInline: 50,
    lineHeight: '64px',
    backgroundColor: '#111d2c',
    
  };
  const titleStyle = {
    padding: '10px',
    marginTop: '15px',
    color: 'white'
};


export default function Dashboard() {
  return (
    <>   
    <Header style={headerStyle}>
    <Title level={5} style={titleStyle}> Hello Patient</Title>
    <Button type="primary">
            Log out
     </Button>
    </Header>
    <Mainmenu/>
    </>

  )
}
