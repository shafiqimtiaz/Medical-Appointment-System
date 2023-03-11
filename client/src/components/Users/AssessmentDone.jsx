import React from "react";
import { Layout, Typography, Button } from "antd";
import { useSelector } from "react-redux";
import axios from "axios";
const { Text } = Typography;
const { Content } = Layout;

const contentStyle = {
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  justifyContent: "center",
  alignItems: "center",
};
const titleStyle = {
  fontSize: "48px",
};
const subStyle = {
  fontSize: "24px",
};
const wordStyle = {
  fontSize: "18px",
};
const buttonStyle = {
  marginTop: "50px",
};

export default function AssessmentDone({ isDone, setIsDone }) {
  const { currentUser } = useSelector((state) => state.user);

  const handleClick = async (e) => {
    const handleDelete = (data, { headers }) => {
      axios.delete(`patient/assessment/${data.data.assessment_id}/cancel`, {
        headers,
      });
      setIsDone(!data.data.active);
    };
    e.preventDefault();
    try {
      const headers = {
        Authorization: `Bearer ${currentUser.access_token}`,
      };
      axios
        .get(`patient/assessment/findbyuserid/${currentUser.user_id}`, {
          headers,
        })
        .then((response) => response)
        .then((data) => handleDelete(data, { headers }))
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Content style={contentStyle}>
      <Text style={titleStyle}>Hi {currentUser.name}</Text>
      <br />
      <Text style={subStyle}>
        You have successfuly completed the assessment
      </Text>
      <br />
      <Text style={wordStyle}>To attempt the assessment agian</Text>
      <br />
      <Text style={wordStyle}>Click on the button Below!</Text>
      <Button style={buttonStyle} type="primary" onClick={handleClick}>
        Redo Assessment
      </Button>
    </Content>
  );
}
