import React from 'react'
import Mainmenu from '../components/Users/Mainmenu'
import { Layout, Button, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
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
  const { currentUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout =()=>{
    dispatch(logout())
    navigate("/")
  }
  return (
    <>   
    <Header style={headerStyle}>
    <Title level={5} style={titleStyle}> Hello {currentUser.name}</Title>
    <Button type="primary" onClick={handleLogout}>
            Log out
     </Button>
    </Header>
    <Mainmenu/>
    </>

  )
}
