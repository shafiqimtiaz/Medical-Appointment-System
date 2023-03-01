import React, { useState } from 'react';
import { ListUsers } from './ListUsers';
import { ViewRegisters } from './ViewRegisters';
import { AddUser } from './AddUser';
import axios from 'axios';


export const ParentTable  = ({ item }) => {
    
    const handleDelete = (id) => {
        const updatedData = data.filter((item) => item.id !== id);
        setData(updatedData);
    };

    const handleAccept = (record) => {
        // implement logic to accept user
            alert("User Accepted");
    };
    
    //Same as delete
    const handleReject = (record) => {
        // implement logic to reject user
            alert("User Rejected");
    };

    //Fecth data API
    const [data2, setData2] = useState([]);


    const [data, setData] = useState
    ([
        {
            key: "1",
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
            key: "2",
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
            key: "3",
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
            key: "4",
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
            key: "5",
            id: '5',
            name: 'Sarah Lee',
            age: 39,
            address: '789 Broadway',
            email: 'Sarah@gmail.com',
            role: 'Doctor',
            status: 'Active',
            license: '0004',
          }
    ])
  return (
    // <TableComponent data={data} handleDelete={handleDelete} />
    //<ViewRegisters data={data} />
    <>
    {item === "2" ? (
        <ListUsers key="2" data={data} handleDelete={handleDelete} />
      ) : item === "1" ? (
        <ViewRegisters key="1" data={data} handleAccept={handleAccept} handleReject={handleReject}/>
      ) : item === "3" ? (
        <AddUser key="3" />
      ) : (
        <p>None of the conditions are true</p>
      )}
    </>
  )
}

