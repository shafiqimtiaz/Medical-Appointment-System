import { React, useState, useEffect, useMemo, useCallback } from 'react';
import axios from "axios";
import { useSelector } from "react-redux";
import DoctorPatients from './DoctorPatients';

export default function DoctorPatientsTab() {

  const [data, setData] = useState(null);
  //console.log(data);
  const { currentUser } = useSelector((state) => state.user);

  const headers = useMemo( () => ({ Authorization: `Bearer ${currentUser.access_token}` }),
  [currentUser.access_token]
  );

    
  useEffect(() => {
    getPatients();
  }, []);

  const getPatients = async () => {
    await axios
      .get("/doctor/patients", { headers })
      .then((response) => response)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => console.log(error));
  };

  // const handleDataChange = useCallback(() => {
  //   // Do nothing, but trigger a re-render
  //   setData(data => [...data]);
  // }, []);

  function datachanged()
  {
    console.log("Data changed - Parent component")
    getPatients()
    //setData(data => [...data]);
  }


  return (
    <DoctorPatients data = {data} setdata={datachanged} ></DoctorPatients>
  )
}

