import React, { useState } from "react";
import { Typography, Radio, Space, Button, Layout, notification } from "antd";
import { CloseCircleTwoTone } from "@ant-design/icons";
import axios from "axios";
import { useSelector } from "react-redux";
const { Text } = Typography;
const { Content, Footer } = Layout;

const textStyle = {
  paddingBottom: "10px",
  fontSize: "16px",
  fontWeight: "700",
};

const contentStyle = {
  display: "flex",
  marginTop: "10px",
  flexDirection: "column",
  marginLeft: "50px",
  marginRight: "20px",
  paddingBottom: "20px",
  gap: "10px",
};

const footerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export default function AssessmentForum({ isDone, setIsDone }) {
  const errorNotification = () => {
    notification.open({
      message: "Please answer all the questions",
      icon: <CloseCircleTwoTone twoToneColor="#E32828" />,
    });
  };

  const { currentUser } = useSelector((state) => state.user);

  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [answer3, setAnswer3] = useState("");
  const [answer4, setAnswer4] = useState("");
  const [answer5, setAnswer5] = useState("");
  const [answer6, setAnswer6] = useState("");
  const [answer7, setAnswer7] = useState("");
  const [answer8, setAnswer8] = useState("");
  const [answer9, setAnswer9] = useState("");

  const answers = [
    answer1,
    answer2,
    answer3,
    answer4,
    answer5,
    answer6,
    answer7,
    answer8,
    answer9,
  ];

  const isAnyAnswerEmpty = answers.some((answer) => answer === "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isAnyAnswerEmpty) errorNotification();
    else {
      try {
        const patient = {
          patient_id: currentUser.user_id,
          answers: [
            { question: 1, answer: answer1 },
            { question: 2, answer: answer2 },
            { question: 3, answer: answer3 },
            { question: 4, answer: answer4 },
            { question: 5, answer: answer5 },
            { question: 6, answer: answer6 },
            { question: 7, answer: answer7 },
            { question: 8, answer: answer8 },
            { question: 9, answer: answer9 },
          ],
        };
        const headers = {
          Authorization: `Bearer ${currentUser.access_token}`,
        };
        const res = await axios.post("/patient/assessment", patient, {
          headers,
        });
        setIsDone(res.data.active);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Content style={contentStyle}>
      <Text style={textStyle}>
        Over the past 2 weeks, how often have you been bothered by any of the
        following problems: Little interest or pleasure in doing things?
      </Text>
      <Radio.Group onChange={(e) => setAnswer1(e.target.value)}>
        <Space direction="vertical">
          <Radio value={"Not At All"}>Not At all</Radio>
          <Radio value={"Several Days"}>Several Days</Radio>
          <Radio value={"More Than Half the Days"}>
            More Than Half the Days
          </Radio>
          <Radio value={"Nearly Every Day"}>Nearly Every Day</Radio>
        </Space>
      </Radio.Group>
      <Text style={textStyle}>
        Over the past 2 weeks, how often have you been bothered by any of the
        following problems: Feeling down, depressed or hopless?
      </Text>
      <Radio.Group onChange={(e) => setAnswer2(e.target.value)}>
        <Space direction="vertical">
          <Radio value={"Not At All"}>Not At all</Radio>
          <Radio value={"Several Days"}>Several Days</Radio>
          <Radio value={"More Than Half the Days"}>
            More Than Half the Days
          </Radio>
          <Radio value={"Nearly Every Day"}>Nearly Every Day</Radio>
        </Space>
      </Radio.Group>
      <Text style={textStyle}>
        Over the past 2 weeks, how often have you been bothered by any of the
        following problems: Trouble falling asleep, staying asleep, or sleeping
        too much?
      </Text>
      <Radio.Group onChange={(e) => setAnswer3(e.target.value)}>
        <Space direction="vertical">
          <Radio value={"Not At All"}>Not At all</Radio>
          <Radio value={"Several Days"}>Several Days</Radio>
          <Radio value={"More Than Half the Days"}>
            More Than Half the Days
          </Radio>
          <Radio value={"Nearly Every Day"}>Nearly Every Day</Radio>
        </Space>
      </Radio.Group>
      <Text style={textStyle}>
        Over the past 2 weeks, how often have you been bothered by any of the
        following problems: Feeling tired or having little energy?
      </Text>
      <Radio.Group onChange={(e) => setAnswer4(e.target.value)}>
        <Space direction="vertical">
          <Radio value={"Not At All"}>Not At all</Radio>
          <Radio value={"Several Days"}>Several Days</Radio>
          <Radio value={"More Than Half the Days"}>
            More Than Half the Days
          </Radio>
          <Radio value={"Nearly Every Day"}>Nearly Every Day</Radio>
        </Space>
      </Radio.Group>
      <Text style={textStyle}>
        Over the past 2 weeks, how often have you been bothered by any of the
        following problems: Poor appetite or overeating?
      </Text>
      <Radio.Group onChange={(e) => setAnswer5(e.target.value)}>
        <Space direction="vertical">
          <Radio value={"Not At All"}>Not At all</Radio>
          <Radio value={"Several Days"}>Several Days</Radio>
          <Radio value={"More Than Half the Days"}>
            More Than Half the Days
          </Radio>
          <Radio value={"Nearly Every Day"}>Nearly Every Day</Radio>
        </Space>
      </Radio.Group>
      <Text style={textStyle}>
        Over the past 2 weeks, how often have you been bothered by any of the
        following problems: Feeling bad about yourself - or that you're a
        failure or have let yourself or your family down?
      </Text>
      <Radio.Group onChange={(e) => setAnswer6(e.target.value)}>
        <Space direction="vertical">
          <Radio value={"Not At All"}>Not At all</Radio>
          <Radio value={"Several Days"}>Several Days</Radio>
          <Radio value={"More Than Half the Days"}>
            More Than Half the Days
          </Radio>
          <Radio value={"Nearly Every Day"}>Nearly Every Day</Radio>
        </Space>
      </Radio.Group>
      <Text style={textStyle}>
        Over the past 2 weeks, how often have you been bothered by any of the
        following problems: Trouble concentrating on things, such as reading the
        newspaper or watching television?
      </Text>
      <Radio.Group onChange={(e) => setAnswer7(e.target.value)}>
        <Space direction="vertical">
          <Radio value={"Not At All"}>Not At all</Radio>
          <Radio value={"Several Days"}>Several Days</Radio>
          <Radio value={"More Than Half the Days"}>
            More Than Half the Days
          </Radio>
          <Radio value={"Nearly Every Day"}>Nearly Every Day</Radio>
        </Space>
      </Radio.Group>
      <Text style={textStyle}>
        Over the past 2 weeks, how often have you been bothered by any of the
        following problems: Moving or speaking so slowly that other people could
        have noticed. Or, the opposite - being so fidgety or restless that you
        have been moving around a lot more than usual?
      </Text>
      <Radio.Group onChange={(e) => setAnswer8(e.target.value)}>
        <Space direction="vertical">
          <Radio value={"Not At All"}>Not At all</Radio>
          <Radio value={"Several Days"}>Several Days</Radio>
          <Radio value={"More Than Half the Days"}>
            More Than Half the Days
          </Radio>
          <Radio value={"Nearly Every Day"}>Nearly Every Day</Radio>
        </Space>
      </Radio.Group>
      <Text style={textStyle}>
        Over the past 2 weeks, how often have you been bothered by any of the
        following problems: Thoughts that you would be better off dead or of
        hurting yourself in some way?
      </Text>
      <Radio.Group onChange={(e) => setAnswer9(e.target.value)}>
        <Space direction="vertical">
          <Radio value={"Not At All"}>Not At all</Radio>
          <Radio value={"Several Days"}>Several Days</Radio>
          <Radio value={"More Than Half the Days"}>
            More Than Half the Days
          </Radio>
          <Radio value={"Nearly Every Day"}>Nearly Every Day</Radio>
        </Space>
      </Radio.Group>
      <Footer style={footerStyle}>
        <Button type="primary" size="large" onClick={handleSubmit}>
          {" "}
          Submit
        </Button>
      </Footer>
    </Content>
  );
}
