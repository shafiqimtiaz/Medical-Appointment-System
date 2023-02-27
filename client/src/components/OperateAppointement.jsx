import { Table, Space, Button} from 'antd';

export default function BookApointement() {

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
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type='primary' style={{backgroundColor:'green'}} onClick={()=> console.log(record)}>Accept</Button>
          <Button type='primary' danger onClick={()=> console.log(record)}>Reject</Button>
        </Space>
      ),
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
  
    return (
      <Table columns={columns} dataSource={data} pagination={false}/>  
  );}
