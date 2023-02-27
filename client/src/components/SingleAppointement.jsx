import React from 'react'

import { Table} from 'antd';
const columns = [
  {
    title: 'Medical Staff',
    dataIndex: 'medical_staff',
    key: 'medical_staff',
},
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Time',
    dataIndex: 'time',
    key: 'time',
  },
];
const data = [
  {
    key: '1',
    medical_staff: 'Shafiq Imtiaz',
    type: 'D',
    date: '12th December',
    time: '12:00 PM',

  },
  {
    key: '2',
    medical_staff: 'Shafiq Imtiaz',
    type: 'D',
    date: '12th December',
    time: '12:00 PM',
  },
  {
    key: '3',
    medical_staff: 'Shafiq Imtiaz',
    type: 'C',
    date: '12th December',
    time: '12:00 PM',
  },
];
export default function SingleAppointement() {
  return(
  <Table columns={columns} dataSource={data} pagination={false}/>  
  )
}
