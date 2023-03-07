import { Table, Button } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

export const ViewRegisters = (props) => {

    //const [statusFilter, setStatusFilter] = useState('All'); // initialize status filter to show all entries

    const filteredData = props.data.filter(item => item.status === 'Pending');

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
        title: 'Phone Number',
        dataIndex: 'number',
        key: 'number',
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
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (text, record) => (
            <span style={{ color: record.status === "Active" ? 'green' : 'orange' }}>{text === "Pending" ? record.status : null }</span>
          ),
      },
      {
        title: 'Actions',
        key: 'actions',
        render: (text, record) => (
            <div>
              <Button
                icon={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
                style={{ color: '#52c41a', background: 'none', border: 'none' }}
                onMouseEnter={(e) => (e.target.style.color = '#8aff8a')}
                onMouseLeave={(e) => (e.target.style.color = '#52c41a')}
                onClick={() => props.handleAccept(record.id)}
              />
              <Button
                icon={<CloseCircleOutlined style={{ color: '#f5222d' }} />}
                style={{ color: '#f5222d', background: 'none', border: 'none' }}
                onMouseEnter={(e) => (e.target.style.color = '#ff8a8a')}
                onMouseLeave={(e) => (e.target.style.color = '#f5222d')}
                onClick={() => props.handleReject(record.id)}
                
              />
            </div>
          ),
      },
    ];
    return (
        <Table dataSource={filteredData} columns={columns} />
    )
  }
