import { Table, Button } from "antd";

export const ListUsers = (props) => {
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "License",
      dataIndex: "license",
      key: "license",
      render: (text, record) => (
        <span>{text != null ? record.license : "N/A"}</span>
      ),
    },
    {
      title: "Phone Number",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => (
        <span
          style={{ color: record.status === "Active" ? "green" : "orange" }}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button
          type="primary"
          danger
          onClick={() => props.handleDelete(record.id)}
          style={{ borderRadius: "5px" }}
          disabled={record.role !== "patient" ? true : false}
        >
          Delete
        </Button>
      ),
    },
  ];
  return <Table dataSource={props.data} columns={columns} />;
};
