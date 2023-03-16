import { React, useState } from 'react';
import { Table, Button, Modal, List } from 'antd';
import { QuestionCircleTwoTone } from '@ant-design/icons'

const data = [
  {
    "id": 1,
    "name": "John Smith",
    "email": "john.smith@example.com",
    "age": 30,
    "address": "123 Main St, Anytown USA",
    "number": "(555) 555-1234"
  },
  {
    "id": 2,
    "name": "Jane Doe",
    "email": "jane.doe@example.com",
    "age": 25,
    "address": "456 Elm St, Anytown USA",
    "number": "(555) 555-5678"
  },
  {
    "id": 3,
    "name": "Bob Johnson",
    "email": "bob.johnson@example.com",
    "age": 40,
    "address": "789 Oak St, Anytown USA",
    "number": "(555) 555-9012"
  },
  {
    "id": 4,
    "name": "Linda Garcia",
    "email": "linda.garcia@example.com",
    "age": 32,
    "address": "789 Oak St, Anytown USA",
    "number": "(555) 555-2468"
  },
  {
    "id": 5,
    "name": "Michael Chen",
    "email": "michael.chen@example.com",
    "age": 41,
    "address": "222 Maple St, Anytown USA",
    "number": "(555) 555-3690"
  },
  {
    "id": 6,
    "name": "Grace Lee",
    "email": "grace.lee@example.com",
    "age": 26,
    "address": "101 Cherry Lane, Anytown USA",
    "number": "(555) 555-1357"
  },
  {
    "id": 7,
    "name": "Daniel Park",
    "email": "daniel.park@example.com",
    "age": 33,
    "address": "555 Oak St, Anytown USA",
    "number": "(555) 555-9012"
  },
  {
    "id": 8,
    "name": "Michelle Wong",
    "email": "michelle.wong@example.com",
    "age": 29,
    "address": "777 Main St, Anytown USA",
    "number": "(555) 555-5678"
  }
]


export default function PendingPatients() {

  const [visible, setVisible] = useState(false);
  //const [data2, setData] = useState(null);

  const handleOpenModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const [assesment, setData] = useState([
    { question: "Over the past 2 weeks, how often have you been bothered by any of the following problems: Little interest or pleasure in doing things?", answer: 25 },
    { question: "Over the past 2 weeks, how often have you been bothered by any of the following problems: Feeling down, depressed or hopless?" , answer: 30 },
    { question: "Over the past 2 weeks, how often have you been bothered by any of the following problems: Trouble falling asleep, staying asleep, or sleeping too much?", answer: 40 },
    { question: "Over the past 2 weeks, how often have you been bothered by any of the following problems: Feeling tired or having little energy?", answer: 25 },
    { question: "Over the past 2 weeks, how often have you been bothered by any of the following problems: Poor appetite or overeating?", answer: 25 },
    { question: "Over the past 2 weeks, how often have you been bothered by any of the following problems: Feeling bad about yourself - or that you're a failure or have let yourself or your family down",answer: 25 },
    { question: "Over the past 2 weeks, how often have you been bothered by any of the following problems: Trouble concentrating on things, such as reading the newspaper or watching television?",answer: 25 },
    { question: "Over the past 2 weeks, how often have you been bothered by any of the following problems: Moving or speaking so slowly that other people could have noticed. Or, the opposite - being so fidgety or restless that you have been moving around a lot more than usual?",answer: 25 },
    { question: "Over the past 2 weeks, how often have you been bothered by any of the following problems: Thoughts that you would be better off dead or of hurting yourself in some way?",answer: 25 },
  ]);

  // const fetchData = async () => {
  //   const response = await fetch('https://example.com/api/data');
  //   const data = await response.json();
  //   setData(data);
  // };

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Phone Number',
      dataIndex: 'number',
      key: 'number',
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <>
          <Button
            type="primary"
            onClick={() => {
              handleOpenModal();
            }}
            style={{ borderRadius: '5px' }}
          >
            Assesment
          </Button>
          <Modal
            title="Assesment"
            open={visible}
            onOk={handleOk}
            onCancel={handleOk}
            mask={false}
            width={1000}
          >
            <List
              dataSource={assesment}
              renderItem={item => (
                <>
                  <List.Item>
                  <div>
                      <QuestionCircleTwoTone />
                      <span>  </span>
                      <span>{item.question}</span>
                      <List
                        dataSource={[item.answer]}
                        renderItem={answer => (
                          <List.Item>
                            <span style={{fontWeight: 'bold' }} >{answer}</span>
                          </List.Item>
                        )}
                      />
                    </div>
                  </List.Item>
                </>
              )}
            />
          </Modal>
        </>
        ),
    },
  ];

  return (
    <>
    <Table dataSource={data} columns={columns} pagination={{pageSize:4}}/>
    </>
  )
}


