import React, { useEffect, useState } from 'react'

import { Table} from 'antd';
import { useSelector } from 'react-redux';
import axios from 'axios';
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
]

export default function SingleAppointement() {

  const { currentUser } = useSelector((state) => state.user);
  const [appointements, setAppointments] = useState([]);
  const [filteredAppointements, setFilteredAppointements] = useState([]);

  const headers = {
    Authorization: `Bearer ${currentUser.access_token}`
};


  const filterData = (data)=>{
    const filtered = data.filter(item => item.active === true);
    setFilteredAppointements(filtered)
  }
  useEffect(()=>{
    axios.get(`/patient/appointment/${currentUser.user_id}`, {headers}).
    then(response => response).then((res) => {setAppointments(res.data); filterData(res.data); }).catch(error=>console.log(error))
  },[appointements])

  return(
  <Table columns={columns} dataSource={filteredAppointements} pagination={false}/>  
  )
}
