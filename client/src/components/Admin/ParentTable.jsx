import React, { useState, useEffect, useMemo } from "react";
import { notification } from "antd";
import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";
import { ListUsers } from "./ListUsers";
import { ViewRegisters } from "./ViewRegisters";
import { AddUser } from "./AddUser";
import axios from "axios";
import Reports from "./Reports";

export const ParentTable = ({ item, accessToken }) => {
  const showError = () => {
    notification.open({
      message: "Error",
      icon: <CloseCircleTwoTone twoToneColor="#52c41a" />,
    });
  };

  const showSuccess = () => {
    notification.open({
      message: "Success",
      icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
    });
  };

  const showPatientInProgress = () => {
    notification.open({
      message: "Patient is in progress, cannot delete",
      icon: <CloseCircleTwoTone twoToneColor="#E32828" />,
    });
  };

  const headers = useMemo(
    () => ({ Authorization: `Bearer ${accessToken}` }),
    [accessToken]
  );

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/manager/deletePatient/${id}`, { headers });
      showSuccess();
    } catch (error) {
      console.error(error.response);
      showPatientInProgress();
    }
  };

  const handleAccept = async (id) => {
    try {
      await axios.put(`/manager/approveRegistration/${id}`, null, { headers });
      showSuccess();
    } catch (error) {
      console.error(error.response);
      showError();
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.delete(`manager/denyRegistration/${id}`, { headers });
      showSuccess();
    } catch (error) {
      console.error(error.response);
      showError();
    }
  };

  const handleSubmit = (id) => {
    const updatedData = data;
    setData(updatedData);
  };

  function calculateAge(dateOfBirth) {
    //console.log(dateOfBirth);
    let [year, month, day] = dateOfBirth.split("-");
    day = day.substring(0, 2);
    //console.log(year + " " + month + " " + day);
    const today = new Date();
    const birthDate = new Date(year, month - 1, day);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  }

  const getStaffStatus = (medicalStaff) => {
    if (medicalStaff === null) {
      return "Active";
    } else {
      return medicalStaff.active === true ? "Active" : "Pending";
    }
  };

  const getRole = (user) => {
    return user.role === "patient"
      ? user.role
      : user.medical_staff.type === "d"
      ? "Doctor"
      : "Counsellor";
  };

  const getLicenseNumber = (user) => {
    if (user.role === "patient") {
      return "N/A";
    }
    return user.medical_staff.license_number;
  };

  const [data, setData] = useState([]);
  //Fecth data API

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("/manager/users", { headers });
        const userArray = result.data;
        let newUserArray = [];
        userArray.map(function (user) {
          const userObj = {
            key: user.user_id,
            id: user.user_id,
            name: user.name,
            age: calculateAge(user.date_of_birth),
            number: user.phone_number,
            address: user.address,
            email: user.email,
            role: getRole(user),
            status: getStaffStatus(user.medical_staff),
            license: getLicenseNumber(user),
          };
          newUserArray.push(userObj);
          return userObj;
        });
        setData(newUserArray);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [headers, data]);

  return (
    <>
      {item === "2" ? (
        <ListUsers key="2" data={data} handleDelete={handleDelete} />
      ) : item === "1" ? (
        <ViewRegisters
          key="1"
          data={data}
          handleAccept={handleAccept}
          handleReject={handleReject}
        />
      ) : item === "3" ? (
        <AddUser key="3" handleSubmit={handleSubmit} />
      ) : item === "4" ? (
        <Reports key="4" />
      ) : (
        <p>None of the conditions are true</p>
      )}
    </>
  );
};
