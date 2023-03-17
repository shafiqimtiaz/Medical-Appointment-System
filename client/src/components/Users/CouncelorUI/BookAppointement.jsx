import { Button, Form, Select, DatePicker, notification } from 'antd';
import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

export default function BookAppointement() {
  const { currentUser } = useSelector((state) => state.user);
  const [patients,setPatients] = useState([]);
  const [patient,setPatient] = useState("")
  const [date,setDate] = useState("");
  const [id, setId] = useState(0);

  const headers = useMemo(
    () => ({ Authorization: `Bearer ${currentUser.access_token}` }),
    [currentUser.access_token]
  );

  const appointementNotification = () => {
    notification.open({
      message: "Your appointement has been successfully booked!",
      placement: "top",
    });
  };
  const errorNotification = () => {
    notification.open({
      message: "It seems there was an error when trying to book an appointement",
      placement: "top",
    });
  };



  const handleDateChange = (date) => {
    setDate(date);
  };

  const handleAppointement = async() =>{
    let appointement = null;
    try {
      appointement = {
        patient_Id: parseInt(id.key),
        medicalStaff_Id: currentUser.user_id,
        appointmentDate: new Date(date)
      }
    const res = await axios.post("/counselor/appointment", appointement, {headers})
    appointementNotification();

    }
    catch(error){
      errorNotification()
    }

  }

  useEffect(()=>{
    axios
    .get("/counselor/patients", { headers })
    .then((response) => response)
    .then((res) => {
      setPatients(res.data);
    })
    .catch((error) => console.log(error));

  },[])

  const formRef = React.useRef(null);
  return (
    
    <Form
      {...layout}
      ref={formRef}
      name="control-ref"
      style={{
        maxWidth: 600,
        marginTop: 50
      }}
    >
      <Form.Item
        name="date"
        label="Select Date & Time"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <DatePicker showTime onChange={handleDateChange} value={date}/>
      </Form.Item>
      <Form.Item
        name="patient"
        label="Patient"
        rules={[
          {
            required: true,
          },
        ]}
      >
      <Select onChange={(value,key)=> {setId(key); setPatient(value)}}>
      {patients.map(patient =>(  
      <Select.Option key={patient.patient_id} value={patient.user.name} >{patient.user.name}</Select.Option> 
      ))}     
      </Select>
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" onClick={handleAppointement}>
          Book
        </Button>
      </Form.Item>
    </Form>
  );}
