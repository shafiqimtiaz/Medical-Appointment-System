import { Table, Button } from 'antd';

export const ListUsers = (props) => {

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
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
      },
      {
        title: 'License',
        dataIndex: 'license',
        key: 'license',
        render: (text, record) => (
            <span>{text != null ? record.license : 'N/A' }</span>
          ),
      },
      {
        title: 'Phone Number',
        dataIndex: 'number',
        key: 'number',
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (text, record) => (
            <span style={{ color: record.status === "Active" ? 'green' : 'orange' }}>{text}</span>
          ),
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <Button
              type="primary"
              danger
              onClick={() => props.handleDelete(record.id)}
              style={{ borderRadius: '5px' }}
            >
              Delete
            </Button>
          ),
      },
    ];
    return (
        <Table dataSource={props.data} columns={columns} />
    )
  }
