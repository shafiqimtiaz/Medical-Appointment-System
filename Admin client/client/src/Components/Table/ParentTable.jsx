import React, { useState } from 'react';
import { TableComponent } from './Table';
import { ViewRegisters } from './ViewRegisters';


export const ParentTable  = ({ item }) => {
    const handleDelete = (id) => {
        const updatedData = data.filter((item) => item.id !== id);
        setData(updatedData);
    };

    const [data, setData] = useState
    ([
        {
            id: '1',
            name: 'John Doe',
            age: 32,
            address: '123 Main St',
            email: 'John@gmail.com',
            role: 'Patient',
            status: 'Active',
            license: null,
          },
          {
            id: '2',
            name: 'Jane Smith',
            age: 26,
            address: '456 Park Ave',
            email: 'Jane@gmail.com',
            role: 'Doctor',
            status: 'Active',
            license: '0001',
          },
          {
            id: '3',
            name: 'Bob Johnson',
            age: 45,
            address: '789 Broadway',
            email: 'Bob@gmail.com',
            role: 'Counsler',
            status: 'Pending',
            license: '0002',
          },
          {
            id: '4',
            name: 'Mary Johnson',
            age: 28,
            address: '789 Broadway',
            email: 'Mary@gmail.com',
            role: 'Counsler',
            status: 'Active',
            license: '0003',
          },
          {
            id: '5',
            name: 'Sarah Lee',
            age: 39,
            address: '789 Broadway',
            email: 'Sarah@gmail.com',
            role: 'Doctor',
            status: 'Active',
            license: '0004',
          },
          {
            id: '6',
            name: 'David Kim',
            age: 47,
            address: '123 Main St',
            email: 'David@gmail.com',
            role: 'Patient',
            status: 'Pending',
            license: null,
          },
          {
            id: '7',
            name: 'Alice Smith',
            age: 54,
            address: '456 Park Ave',
            email: 'Alice@gmail.com',
            role: 'Doctor',
            status: 'Active',
            license: '0005',
          },
          {
            id: '8',
            name: 'Robert Lee',
            age: 32,
            address: '789 Broadway',
            email: 'Robert@gmail.com',
            role: 'Counsler',
            status: 'Active',
            license: '0006',
          },
          {
            id: '9',
            name: 'Alex Kim',
            age: 28,
            address: '123 Main St',
            email: 'Alex@gmail.com',
            role: 'Patient',
            status: 'Active',
            license: null,
          },
          {
            id: '10',
            name: 'Tom Johnson',
            age: 42,
            address: '456 Park Ave',
            email: 'Tom@gmail.com',
            role: 'Doctor',
            status: 'Pending',
            license: '0007',
          },
        {
        id: '11',
        name: 'Karen Johnson',
        age: 38,
        address: '456 Pine St',
        email: "karen@gmail.com",
        role:"Patient",
        status:"Inactive",
        license:null,

        },
        {
            id: '12',
            name: 'David Lee',
            age: 27,
            address: '789 Maple Ave',
            email: "david@gmail.com",
            role:"Doctor",
            status:"Active",
            license:"0003"
        },
        {
            id: '13',
            name: 'Sarah Adams',
            age: 29,
            address: '789 Oak St',
            email: "sarah@gmail.com",
            role:"Counselor",
            status:"Active",
            license:"0004"

        },
        {
            id: '14',
            name: 'Jackie Chan',
            age: 58,
            address: '123 Pine St',
            email: "jackie@gmail.com",
            role:"Patient",
            status:"Active",
            license:null,

        },
        {
            id: '15',
            name: 'Maggie Kim',
            age: 36,
            address: '456 Maple Ave',
            email: "maggie@gmail.com",
            role:"Doctor",
            status:"Inactive",
            license:"0005"
        },
        {
            id: '16',
            name: 'Tom Johnson',
            age: 51,
            address: '789 Oak St',
            email: "tom@gmail.com",
            role:"Counselor",
            status:"Pending",
            license:"0006"

        },
        {
            id: '17',
            name: 'Lucas Wong',
            age: 24,
            address: '123 Elm St',
            email: "lucas@gmail.com",
            role:"Patient",
            status:"Active",
            license:null,

        },
        {
            id: '18',
            name: 'Emma Wilson',
            age: 29,
            address: '456 Pine St',
            email: "emma@gmail.com",
            role:"Doctor",
            status:"Active",
            license:"0007"
        },
        {
            id: '19',
            name: 'Michael Brown',
            age: 46,
            address: '789 Broadway',
            email: "michael@gmail.com",
            role:"Counselor",
            status:"Inactive",
            license:"0008"

        },
        {
            id: '20',
            name: 'Leah Taylor',
            age: 34,
            address: '123 Elm St',
            email: "leah@gmail.com",
            role:"Patient",
            status:"Pending",
            license:null,
            },
    ])
  return (
    // <TableComponent data={data} handleDelete={handleDelete} />
    //<ViewRegisters data={data} />
    <>
    {item === "2" ? (
        <TableComponent data={data} handleDelete={handleDelete} />
      ) : item === "1" ? (
        <ViewRegisters data={data} />
      ) : item === "3" ? (
        <p>Add user</p>
      ) : (
        <p>None of the conditions are true</p>
      )}
    </>
  )
}
