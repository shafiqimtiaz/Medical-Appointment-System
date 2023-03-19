import { React, useState, useEffect, useMemo } from 'react';
import { Table, Button, Modal, List } from 'antd';
import { QuestionCircleTwoTone, CheckCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { notification } from "antd";
//import {ParentTable} from "/Users/hadi/Desktop/Concordia/Soen6841/SPM_6841_Project/client/src/components/Admin/ParentTable.jsx"
import axios from "axios";
import { useSelector } from "react-redux";


//Fetch all patients and add them to table
//Activate button if assement is true 

const showError = () => {
  notification.open({
    message: "Error !!",
    placement: "top",
  });
};

const showSuccess = () => {
  notification.open({
    message: "Success !!",
    placement: "top",
  });
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

function getAssessmentID(assessments) {
  let assessmentID = null;
  if (assessments.length === 0) {
    return null;
  } 
  else {
    assessments.forEach((assessment) => {
      if (assessment.active === true && assessment.medical_staff_id === null) {
        assessmentID = assessment.assessment_id;
      }
      else if(assessment.active === true && assessment.medical_staff_id !== null)
      {
        assessmentID =  "Assigned";
      }
    });
  }
  return assessmentID;
}



export default function PendingPatients({accessToken}) {

  const { currentUser } = useSelector((state) => state.user);
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [assessment, setAssessment] = useState([
    { question: "Over the past 2 weeks, how often have you been bothered by any of the following problems: Little interest or pleasure in doing things?", answer: "" ,id_ :1},
    { question: "Over the past 2 weeks, how often have you been bothered by any of the following problems: Feeling down, depressed or hopless?" , answer: "",id :2 },
    { question: "Over the past 2 weeks, how often have you been bothered by any of the following problems: Trouble falling asleep, staying asleep, or sleeping too much?", answer: "",id:3 },
    { question: "Over the past 2 weeks, how often have you been bothered by any of the following problems: Feeling tired or having little energy?", answer: "",id:4 },
    { question: "Over the past 2 weeks, how often have you been bothered by any of the following problems: Poor appetite or overeating?", answer: "",id:5 },
    { question: "Over the past 2 weeks, how often have you been bothered by any of the following problems: Feeling bad about yourself - or that you're a failure or have let yourself or your family down",answer: "",id:6 },
    { question: "Over the past 2 weeks, how often have you been bothered by any of the following problems: Trouble concentrating on things, such as reading the newspaper or watching television?",answer: "",id:7 },
    { question: "Over the past 2 weeks, how often have you been bothered by any of the following problems: Moving or speaking so slowly that other people could have noticed. Or, the opposite - being so fidgety or restless that you have been moving around a lot more than usual?",answer: "",id:8 },
    { question: "Over the past 2 weeks, how often have you been bothered by any of the following problems: Thoughts that you would be better off dead or of hurting yourself in some way?",answer: "",id:9 },
  ]);

  const [counserlorData, setCounselorData] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState();
  const [doctorsVisibility, setDoctorsVisibility] = useState(false);
  const [doctorsData, setDoctorsData] = useState([]);
  const [patientSelected, setPatientSelected] = useState();
  const [patientWithAssessment, setPatientWithAssessment] = useState([]);
  

  const headers = useMemo(
    () => ({ Authorization: `Bearer ${currentUser.access_token}` }),
    [currentUser.access_token]
  );


  //Fetching data
  const mapData = (data) => {
    const mapped = data.map((item) => {
      const flag = getAssessmentID(item.assessments);
      if(flag==="Assigned") //Ignore entry if patient is already assigned
      {
        return null;
      }
      return {
        key:item.patient_id,
        id: item.patient_id,
        name: item.user.name,
        email: item.user.email,
        age: calculateAge(item.user.date_of_birth),
        address: item.user.address,
        number: item.user.phone_number,
        assessments: getAssessmentID(item.assessments),
      };
    }).filter(item => item !== null);; // filter out null values
    setData(mapped);
  };
  
  useEffect(() => {
    axios
      .get(`/counselor/patients`, { headers })
      .then((res) => {
        //console.log(res.data)
        mapData(res.data);
      })
      .catch((error) => console.log(error));
  }, [headers,data]);
  ///////



  const fetchAnswers = async (selectedId) => {
    try {
        const response = await axios.get(`counselor/assessments/${selectedId}`,{ headers });
        const { answers } = response.data;
        const updatedAnswers = answers.map(a => a.answer);
        const updatedAssessment = assessment.map((a, index) => {
          return { ...a, answer: updatedAnswers[index] };
        });
        setAssessment(updatedAssessment);
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch data from API');
    }
  };


  const handleOpenModal = (selectedId,record) => {
    setSelectedId(selectedId)
    fetchAnswers(selectedId);
    setSelectedRecord(record);
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  useEffect(() => {}, [counserlorData]);

  const addCounselorData =  (record) => {
    const checkIfRecordConsists = counserlorData.filter((item) => {
      return item.id === record.id;
    })
    if(checkIfRecordConsists.length == 0){
      setCounselorData([...counserlorData,record]);
    }
    
  }

  const handleApprove = async (record) => {
    try {
      await axios.put(`/counselor/assessments/approve/${selectedId}`, null,{ headers });
      showSuccess();
      setVisible(false);
      addCounselorData(selectedRecord);

      const obj = {
          patientId: selectedRecord.id,
          assessmentId: selectedId
      }

      let check = false;
      patientWithAssessment.map((item) => {
        console.log(`${item.patientId} ${obj.patientId}`);
        if(item.patientId == obj.patientId){
          item.assessmentId = obj.assessmentId;
          check = true;
        }
      })
      if(check === false){
        patientWithAssessment.push(obj);
      }
      
      setPatientWithAssessment(patientWithAssessment);
      console.log(patientWithAssessment);
      
    } catch (error) {
      console.error(error.response);
      showError();
      setVisible(false);
    }
  };
  const handleDeny = async (id) => {
    try {
      await axios.delete(`counselor/assessments/delete/${selectedId}`, { headers });
      showSuccess();
      setVisible(false);
    } catch (error) {
      console.error(error.response);
      showError();
      setVisible(false);
    }
  };
  
  const handleAddDoctor = async (patientRecord) => {

    try{
      const response = await axios.get(`counselor/doctors`, {headers});
      const listOfDoctors = await response.data;

      setDoctorsData([]);
      let doctorsList = [];
      listOfDoctors.map((item) => {
        if(item.active === true){
         // console.log(item)

          const doctRec = {

            key:item.medical_staff_id,
            id: item.medical_staff_id,
            name: item.users.name,
            email: item.users.email,
            age: calculateAge(item.users.date_of_birth),
            address: item.users.address,
            number: item.users.phone_number,
          }

          doctorsList.push(doctRec);
        }
        
      });
      //doctorsData.push(doctRec);
      setDoctorsData(doctorsList);
      setDoctorsVisibility(true);
      removeRecord(patientRecord)

    }catch(error){
      console.log(error.response);
      showError();
    }
    
  };

  

  const showNotification = (type, details) => {
    notification[type]({
      message: details.message,
      description: details.description
    });
  };
  const handleVisibilityForDoctorModal = () => {
    setDoctorsVisibility(false);
  }
  
  const  AssignDoctor = async (doctorRecord) => {

    try{
      //console.log(patientWithAssessment);
      const getRecord = patientWithAssessment.filter((item)=>{

        return item.patientId === patientSelected.id
      });
      console.log(getRecord);

      const reqBody = {
        assessment_id:getRecord[0].assessmentId,
        medical_staff_id: doctorRecord.id
      }
     console.log(reqBody);

      const response = await axios.put(`/counselor/assessments/assign`, reqBody,{ headers });
      console.log(response);

      const NOTIFICATION_DETAILS = {
        success: {
          message: "Assigned",
          description: `${doctorRecord.name} has been Assigned ${patientSelected.name}`
        }
      }

      showNotification("success",NOTIFICATION_DETAILS.success);
      setDoctorsVisibility(false);
      removeRecord(patientSelected.id);
    }catch(error){
      console.log(error.response);
      showError();
    }
    
  }

  const removeRecord = (id) => {
    const updatedRecords = counserlorData.filter((record) => record.id !== id);
    setCounselorData(updatedRecords);
  };

  const membersOfTable = [
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
      title: 'Phone Number',
      dataIndex: 'number',
      key: 'number',
    }
  ]

  const columns = [
    ...membersOfTable,
    {
      key: 'assessments',
    },
    {
      title: 'Action',
      key: 'action',
      render: (record) => (        
        <>
          <Button
            disabled={record.assessments!=null ? false : true}
            type="primary"
            onClick={() => {
              handleOpenModal(record.assessments,record);
            }}
            style={{ borderRadius: '5px' }}
          >
            Assesment
          </Button>
          <Modal
            title="Assesment"
            open={visible}
            onOk={handleOk}
            onCancel={handleOk}
            mask={false}
            width={1000}
            footer={[
              <Button key="back" onClick={handleOk}>
                Cancel
              </Button>,
              <Button key="deny" type="primary" danger onClick={() => handleDeny()} style={{ borderRadius: '5px' }}>
                Deny
              </Button>,
              <Button key="approve" type="primary" onClick={() => handleApprove()} style={{ borderRadius: '5px' }}>
                Approve
              </Button>,
            ]}
          >
            <List
              dataSource={assessment}
              renderItem={item => (
                <>
                  <List.Item key={item.question}>
                  <div>
                      <QuestionCircleTwoTone />
                      <span>  </span>
                      <span>{item.question}</span>
                      <List
                        dataSource={[item.answer]}
                        renderItem={answer => (
                          <List.Item key={item.id}>
                            <span style={{fontWeight: 'bold' }} >{answer}</span>
                          </List.Item>
                        )}
                      />
                    </div>
                  </List.Item>
                </>
              )}
            />
          </Modal>
        </>
        ),
    },
  ];

  const doctorDataTable = [
    ...membersOfTable,
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button key="approve" type="primary" 
          onClick={() => {
            AssignDoctor(record)
          }} 
          style={{ borderRadius: '5px' }}>
                Assign
          </Button>
        </>
      ),
    },
  ]

  
  const upperTable = [
    ...membersOfTable,
    {
      title: 'Action',
      key: 'action',
      render: (record) => (        
        <>
          <Button 
          icon={<PlusOutlined />} style={{ background: 'none', border: 'none' }}
          onClick={() => {
              setPatientSelected({
                name:record.name,
                id: record.id
                });
              handleAddDoctor(record);
            }}
          >
          </Button>

          <Button
                icon={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
                style={{ color: '#52c41a', background: 'none', border: 'none' }}
                onMouseEnter={(e) => (e.target.style.color = '#8aff8a')}
                onMouseLeave={(e) => (e.target.style.color = '#52c41a')} 

          />

          <Modal
              title="Doctors"
              open={doctorsVisibility}
              mask={false}
              width={1000}
              footer={[
                <Button key="back" onClick={handleVisibilityForDoctorModal}>Cancel</Button>
              ]}
          >

          <Table dataSource={doctorsData} columns={doctorDataTable} pagination={{pageSize:4}}/>

          </Modal>

        </>
        ),
    },
  ];

  return (
    <>
    <Table dataSource={counserlorData} columns={upperTable} pagination={{pageSize:4}}/>
    <Table dataSource={data} columns={columns} pagination={{pageSize:4}}/>
    </>
  )
}


