import { Table, Space, Button} from 'antd';

const columns = [
  {
    title: 'Doctor/Counselor',
    dataIndex: 'dc',
    key: 'dc',
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
        <Button type='primary' style={{backgroundColor:'green'}}>Accept</Button>
        <Button type='primary' danger>Reject</Button>
      </Space>
    ),
  },
];
const data = [
  {
    key: '1',
    dc: 'Shafiq Imtiaz',
    date: '12th December',
    time: '12:00 PM',

  },
  {
    key: '2',
    dc: 'Shafiq Imtiaz',
    date: '12th December',
    time: '12:00 PM',
  },
  {
    key: '3',
    dc: 'Shafiq Imtiaz',
    date: '12th December',
    time: '12:00 PM',
  },
];

export default function BookApointement() {
    return (
      <Table columns={columns} dataSource={data} pagination={false}/>  
  );}
