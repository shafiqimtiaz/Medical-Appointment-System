import { React, useState, useEffect, useMemo } from "react";
import { Table, Button, Modal, List } from "antd";
import {
  QuestionCircleTwoTone,
  CheckCircleTwoTone,
  CloseCircleTwoTone,
} from "@ant-design/icons";
import { notification } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
import { Typography } from "antd";

const showError = () => {
  notification.open({
    message: "It seems there was an error !!",
    icon: <CloseCircleTwoTone twoToneColor="#E32828" />,
  });
};

const showSuccess = () => {
  notification.open({
    message: "The patient has been deassigned",
    icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
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
  let assessmentID;
  if (assessments.length === 0) {
    return null;
  } else {
    let activeAssessment = assessments.find((assessment) => assessment.active);
    if (activeAssessment) {
      assessmentID = activeAssessment.assessment_id;
    } else {
      assessmentID = "No active assessment";
    }
  }
  return assessmentID;
}

export default function DoctorPatients({ data, setdata }) {
  const { currentUser } = useSelector((state) => state.user);
  const [visible, setVisible] = useState(false);
  const [Patients, setPatients] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const { Title } = Typography;
  const [assessment, setAssessment] = useState([
    {
      question:
        "Over the past 2 weeks, how often have you been bothered by any of the following problems: Little interest or pleasure in doing things?",
      answer: "",
      id_: 1,
    },
    {
      question:
        "Over the past 2 weeks, how often have you been bothered by any of the following problems: Feeling down, depressed or hopless?",
      answer: "",
      id: 2,
    },
    {
      question:
        "Over the past 2 weeks, how often have you been bothered by any of the following problems: Trouble falling asleep, staying asleep, or sleeping too much?",
      answer: "",
      id: 3,
    },
    {
      question:
        "Over the past 2 weeks, how often have you been bothered by any of the following problems: Feeling tired or having little energy?",
      answer: "",
      id: 4,
    },
    {
      question:
        "Over the past 2 weeks, how often have you been bothered by any of the following problems: Poor appetite or overeating?",
      answer: "",
      id: 5,
    },
    {
      question:
        "Over the past 2 weeks, how often have you been bothered by any of the following problems: Feeling bad about yourself - or that you're a failure or have let yourself or your family down",
      answer: "",
      id: 6,
    },
    {
      question:
        "Over the past 2 weeks, how often have you been bothered by any of the following problems: Trouble concentrating on things, such as reading the newspaper or watching television?",
      answer: "",
      id: 7,
    },
    {
      question:
        "Over the past 2 weeks, how often have you been bothered by any of the following problems: Moving or speaking so slowly that other people could have noticed. Or, the opposite - being so fidgety or restless that you have been moving around a lot more than usual?",
      answer: "",
      id: 8,
    },
    {
      question:
        "Over the past 2 weeks, how often have you been bothered by any of the following problems: Thoughts that you would be better off dead or of hurting yourself in some way?",
      answer: "",
      id: 9,
    },
  ]);

  const headers = useMemo(
    () => ({ Authorization: `Bearer ${currentUser.access_token}` }),
    [currentUser.access_token]
  );

  const mapData = (dataParam) => {
    if (dataParam != null) {
      const mapped = dataParam
        .map((item) => {
          const flag = getAssessmentID(item.assessments);
          if (flag === "No active assessment") {
            //Ignore entry if patient has no active assessment
            return null;
          }
          return {
            key: item.patient_id,
            id: item.patient_id,
            name: item.users.name,
            email: item.users.email,
            age: calculateAge(item.users.date_of_birth),
            address: item.users.address,
            number: item.users.phone_number,
            assessments: getAssessmentID(item.assessments),
          };
        })
        .filter((item) => item !== null); // filter out null values
      setPatients(mapped);
      // do something with the mapped data
    } else {
      console.log("dataParam is null or undefined");
    }
  };

  useEffect(() => {
    //console.log(data);
    mapData(data);
  }, [data]);

  const fetchAnswers = async (selectedId) => {
    try {
      //console.log(selectedId + "  I fetching asnwers");
      const response = await axios.get(`doctor/assessments/${selectedId}`, {
        headers,
      });
      const { answers } = response.data;
      const updatedAnswers = answers.map((a) => a.answer);
      const updatedAssessment = assessment.map((a, index) => {
        return { ...a, answer: updatedAnswers[index] };
      });
      setAssessment(updatedAssessment);
    } catch (error) {
      //console.error(error);
      //console.log("error  " + selectedId);
      throw new Error("Failed to fetch data from API");
    }
  };

  const handleOpenModal = (selectedId) => {
    setSelectedId(selectedId);
    console.log(selectedId);
    fetchAnswers(selectedId);
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleDeny = async (selectedId, patientID) => {
    try {
      setSelectedId(selectedId);
      await axios.put(`/doctor/assessment/deactivate/${selectedId}`, null, {
        headers,
      });
      const deleteAllAppointments = await axios.delete(
        `/doctor/delete/appointment/${patientID}`,
        { headers }
      );
      console.log(deleteAllAppointments);
      showSuccess();
      //setVisible(false);
      setdata();
    } catch (error) {
      console.log(selectedId);
      console.error(error.response);
      showError();
      setVisible(false);
    }
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
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
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Phone Number",
      dataIndex: "number",
      key: "number",
    },
    {
      key: "assessments",
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <>
          <Button
            //disabled={record.assessments!=null ? false : true}
            type="primary"
            onClick={() => {
              //console.log(record.assessments);
              handleOpenModal(record.assessments);
            }}
            style={{ borderRadius: "5px" }}
          >
            Assesment
          </Button>
          <span> </span>
          <Button
            key="deny"
            type="primary"
            ghost
            danger
            // style={{
            //   borderRadius: "5px",
            //   backgroundColor: "#ff4500",
            //   borderColor: "#52c41a",
            //   color: "white",
            // }}
            onClick={() => handleDeny(record.assessments, record.id)}
          >
            Reject
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
                OK
              </Button>,
            ]}
          >
            <List
              dataSource={assessment}
              renderItem={(item) => (
                <>
                  <List.Item key={item.question}>
                    <div>
                      <QuestionCircleTwoTone />
                      <span> </span>
                      <span>{item.question}</span>
                      <List
                        dataSource={[item.answer]}
                        renderItem={(answer) => (
                          <List.Item key={item.id}>
                            <span style={{ fontWeight: "bold" }}>{answer}</span>
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

  return (
    <>
      <Title level={4} style={{ marginBottom: "10px", marginLeft: "10px" }}>
        List of Patients
      </Title>
      <Table
        dataSource={Patients}
        columns={columns}
        pagination={{ pageSize: 5 }}
      />
    </>
  );
}
