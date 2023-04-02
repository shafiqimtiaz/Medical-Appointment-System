import { React, useEffect, useState, useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useLocation } from "react-router-dom";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Reports() {
  const [line, setLine] = useState({});

  // const location = useLocation();

  // const accessToken = location.state.val;

  // const headers = useMemo(
  //   () => ({ Authorization: `Bearer ${accessToken}}` }),
  //   [accessToken]
  // );

  // fetch data but doesnt work
  // useEffect(() => {
  //   axios
  //     .get("/manager/assessment/stats", { headers })
  //     .then((response) => setLine(response.data))
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }, []);

  const sample_data = [
    {
      assessment_id: 7,
      active: false,
      created_at: "2023-03-29T00:49:49.630Z",
      updated_at: "2023-04-02T20:08:55.765Z",
      patient_id: 7,
      medical_staff_id: 9,
      medical_staff: {
        type: "c",
      },
    },
    {
      assessment_id: 8,
      active: false,
      created_at: "2023-03-31T04:01:35.723Z",
      updated_at: "2023-04-01T10:00:12.432Z",
      patient_id: 7,
      medical_staff_id: 10,
      medical_staff: {
        type: "d",
      },
    },
  ];

  // post-process data
  let sample_hour = sample_data.map((item) => {
    let currTime = new Date();
    let date = new Date(item.updated_at);
    console.log(currTime, date);
    if (date.getDate() === currTime.getDate()) {
      return date.getHours();
    }
    return false;
  });

  console.log(sample_hour);

  const dataHour = {
    labels: [
      "00",
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23",
    ],
    datasets: [
      {
        label: "Dataset 1",
        // data: labels.map(() =>
        //   faker.datatype.number({ min: -1000, max: 1000 })
        // ),
        data: [1, 4, 3, 12, 6, 10],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Dataset 2",
        // data: labels.map(() =>
        //   faker.datatype.number({ min: -1000, max: 1000 })
        // ),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const dataWeek = {};

  const dataMonth = {};

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };

  return (
    <div>
      <Line options={options} data={dataHour} />
      {/* <Line options={options} data={dataWeek} /> */}
      {/* <Line options={options} data={dataMonth} /> */}
    </div>
  );
}
