import React from "react";
import { Layout } from "antd";
import { useSelector } from "react-redux";
import CouncelorMenu from "./CouncelorUI/CounselorMenu";
import PatientMenu from "./PatientMenu";
import DoctorMenu from "./DoctorUI/DoctorMenu";



export default function Mainmenu() {
  const { currentUser } = useSelector((state) => state.user);


  return (
    <Layout>
      {currentUser.type === "c" ? (
        <CouncelorMenu/>
      ) : 
      currentUser.type === "d" ? (
        <DoctorMenu/>
      ) :
      (
        <PatientMenu/>
      )}
    </Layout>
  );
}
