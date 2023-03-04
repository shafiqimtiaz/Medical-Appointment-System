import { Table, Space, Button} from 'antd';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function OperateAppointement() {
  const { currentUser } = useSelector((state) => state.user);
  const [appointements,setAppointments] = useState([]);
  const [filteredAppointements,setFilteredAppointements] = useState([]);
  
  const headers = {
    Authorization: `Bearer ${currentUser.access_token}`
};

const handleAccept = async(record)=>{
  try {
    const res = await axios.put(`/patient/appointment/${record.appointment_id}/accept`, null, {headers})
  } catch (error) {
    
  }
}
const handleReject = async(record)=>{
  try {
    const res = axios.delete(`/patient/appointment/${record.appointment_id}/cancel`, {headers})
  } catch (error) {
    
  }
}
const columns = [
    {
      title: 'Medical Staff',
      dataIndex: 'created_by',
      key: 'created_by',
    },
    {
      title: 'Type',
      dataIndex: ['medical_staff','type'],
      key: 'type',
      render:(text,record)=>{
        return text.toUpperCase()
      }

    },
    {
      title: 'Date',
      dataIndex: 'appointment_date',
      key: 'appointment_date',
      render:(text,record)=>{
        return text.substring(0,10)
      }
    },
    {
      title: 'Time',
      dataIndex: 'appointment_date',
      key: 'appointment_date',
      render:(text,record)=>{
        return text.substring(11,16)
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type='primary' style={{backgroundColor:'green'}} onClick={()=> 
          {
            handleAccept(record)
          }
        }>Accept</Button>
          <Button type='primary' danger onClick={()=>{handleReject(record)}}>Reject</Button>
        </Space>
      ),
    },
  ];
  

  const filterData = (data)=>{
    const filtered = data.filter(item => item.active === false);
    setFilteredAppointements(filtered)
  }
  useEffect(()=>{
    axios.get(`/patient/appointment/${currentUser.user_id}`, {headers}).
    then(response => response).then((res) => {setAppointments(res.data); filterData(res.data); }).catch(error=>console.log(error))
  },[appointements])
  
    return (
      <Table columns={columns} dataSource={filteredAppointements} pagination={false}/>  
  );}
