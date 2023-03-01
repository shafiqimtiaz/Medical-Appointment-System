import React, { useState, useEffect } from 'react';
import { ListUsers } from './ListUsers';
import { ViewRegisters } from './ViewRegisters';
import { AddUser } from './AddUser';
import axios from 'axios';

//import { useSelector } from 'react-redux';

export const ParentTable  = ({ item }) => {
  
    // const handleDelete = (id) => {
        
    //     setData(updatedData);
    // };
    const handleDelete = async (id) => {
      try {
        const headers = {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJlbWFpbCI6Im1hbmFnZXJAc3BtLmNvbSIsInJvbGUiOiJtYW5hZ2VyIiwiaWF0IjoxNjc3NjgzNzkzLCJleHAiOjE2Nzc3NzAxOTN9.V0lhFAkcw3COpB6NU6hmdDVVl01XP6hkpgMRKz6tcys'
        };
        await axios.delete(`manager/deletePatient/${id}`,{headers});
        //const updatedData = data;
        //setData(updatedData);
      } catch (error) {
        console.error(error);
      }
    }

    const handleSubmit = (id) => {
      const updatedData = data;
      setData(updatedData);
  };

    const handleAccept = (record) => {
        // implement logic to accept user
            alert("User Accepted");
    };

    function calculateAge(dateOfBirth) {
      //console.log(dateOfBirth);
      let [year, month, day] = dateOfBirth.split('-');
      day = day.substring(0,2);
      console.log(year + " " + month + " " + day);
      const today = new Date();
      const birthDate = new Date(year, month - 1, day);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    }
    
    const getStaffStatus = (medicalStaff) =>{

      if(medicalStaff === null || medicalStaff === NaN){
        return 'Active';
      }else{
        return medicalStaff.active === true ? 'Active' : 'Pending';
      }
    }
    
    //Same as delete
    const handleReject = (record) => {
        // implement logic to reject user
            alert("User Rejected");
    };
    const [data, setData] = useState([]);
    //Fecth data API
    try {
      const headers = {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJlbWFpbCI6Im1hbmFnZXJAc3BtLmNvbSIsInJvbGUiOiJtYW5hZ2VyIiwiaWF0IjoxNjc3NjgzNzkzLCJleHAiOjE2Nzc3NzAxOTN9.V0lhFAkcw3COpB6NU6hmdDVVl01XP6hkpgMRKz6tcys'
      };
    useEffect(()=>{
      const fetchData = async () => {
        const result = await axios.get('/manager/getallusers',{headers});
        const userArray = result.data;
        let newUserArray= [];
        userArray.map(function(user){

          const userObj = {
            key: user.user_id,
            id: user.user_id,
            name: user.name,
            age: calculateAge(user.date_of_birth),
            number: user.phone_number,
            address: user.address,
            email: user.email,
            role: user.role,
            status: getStaffStatus(user.medical_staff),
            license: null,

          }
          newUserArray.push(userObj);
        });
        setData(newUserArray);
      };
        fetchData();
      }, [handleSubmit,handleDelete]);
    }
    catch (error)
    {
      console.log(error)
    }
    
  return (
    // <TableComponent data={data} handleDelete={handleDelete} />
    //<ViewRegisters data={data} />
    <>
    {item === "2" ? (
        <ListUsers key="2" data={data} handleDelete={handleDelete} />
      ) : item === "1" ? (
        <ViewRegisters key="1" data={data} handleAccept={handleAccept} handleReject={handleReject}/>
      ) : item === "3" ? (
        <AddUser key="3" handleSubmit={handleSubmit}/>
      ) : (
        <p>None of the conditions are true</p>
      )}
    </>
  )
}

