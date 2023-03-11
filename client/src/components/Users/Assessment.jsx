import { Layout } from "antd";
import AssessmentForm from "./AssessmentForm";
import AssessmentDone from "./AssessmentDone";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
const { Content } = Layout;

export default function Assessment() {
  const { currentUser } = useSelector((state) => state.user);
  const [isDone, setIsDone] = useState(false);

  let handleResponse = (data) => {
    if (data.data.message === "no active assessment found!") setIsDone(false);
    else {
      setIsDone(data.data.active);
    }
  };
  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${currentUser.access_token}`,
    };
    axios
      .get(`/patient/assessment/findbyuserid/${currentUser.user_id}`, {
        headers,
      })
      .then((response) => {
        handleResponse(response);
      })
      .catch((error) => console.log(error));
  }, [currentUser.access_token, currentUser.user_id]);

  return (
    <Content>
      {isDone === false ? (
        <AssessmentForm isDone={isDone} setIsDone={setIsDone} />
      ) : (
        <AssessmentDone isDone={isDone} setIsDone={setIsDone} />
      )}
    </Content>
  );
}
