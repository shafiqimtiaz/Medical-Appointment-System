import React from 'react'
import {Layout, Typography} from 'antd'
import SingleAppointement from './SingleAppointement';
import BookApointement from './BookApointement';

const  {Content} = Layout;
const {Title} = Typography;

const contentStyle = {
  display: 'flex',
  marginTop: '10px',
  flexDirection: 'column',
};
const titleStyle = {
  padding: '10px',
  marginTop: '15px',
};

export default function Appointement() {
  return (
    <Content style={contentStyle}>
        <Title level={4} style={titleStyle}> Booked Appointements</Title> 
        <SingleAppointement/>
        <Title level={4} style={titleStyle}> Book New Appointement</Title> 
        <BookApointement/>
    </Content>
  )
}
