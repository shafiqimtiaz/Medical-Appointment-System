import React from 'react'

import { Table, Space, Button} from 'antd';
const columns = [
  {
    title: 'Doctor',
    dataIndex: 'doctor',
    key: 'doctor',
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
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
    <Button type="primary" danger>
        Delete
     </Button>
      </Space>
    ),
  },
];
const data = [
  {
    key: '1',
    doctor: 'Shafiq Imtiaz',
    date: '12th December',
    time: '12:00 PM',

  },
  {
    key: '2',
    doctor: 'Shafiq Imtiaz',
    date: '12th December',
    time: '12:00 PM',
  },
  {
    key: '3',
    doctor: 'Shafiq Imtiaz',
    date: '12th December',
    time: '12:00 PM',
  },
];
export default function SingleAppointement() {
  return(
  <Table columns={columns} dataSource={data} pagination={false}/>  
  )
}
