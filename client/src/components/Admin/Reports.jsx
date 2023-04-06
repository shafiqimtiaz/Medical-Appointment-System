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
import { Button } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

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
  const [data, setData] = useState();

  const todaysData = new Array(24).fill(0);
  const weeksData = new Array(7).fill(0);
  const monthsData = new Array(12).fill(0);

  const { currentUser } = useSelector((state) => state.user);

  const headers = useMemo(
    () => ({ Authorization: `Bearer ${currentUser.access_token}` }),
    [currentUser.access_token]
  );

  useEffect(() => {
    axios
      .get("manager/assessment/stats", { headers })
      .then((response) => response)
      .then((res) => {
        setData(res.data);
        // todaysData = new Array(24).fill(0);
        // weeksData = new Array(7).fill(0);
        // monthsData = new Array(12).fill(0);
        setTodaysData(data);
        setWeeksData(data);
        setMonthsData(data);
      })
      .catch((error) => console.log(error));
  }, [headers]);

  // post-process data
  const setTodaysData = (data) => {
    if (data) {
      data.map((item) => {
        let currTime = new Date();
        let date = new Date(item.updated_at);
        if (
          date.getDate() === currTime.getDate() &&
          date.getMonth() === currTime.getMonth() &&
          date.getFullYear() === currTime.getFullYear()
        ) {
          todaysData[date.getHours()] = todaysData[date.getHours()] + 1;
        }
        return false;
      });
      return todaysData;
    } else return false;
  };

  let previousDateOne = new Date();
  previousDateOne.setDate(previousDateOne.getDate() - 1);
  let previousDateTwo = new Date();
  previousDateTwo.setDate(previousDateTwo.getDate() - 2);
  let previousDateThree = new Date();
  previousDateThree.setDate(previousDateThree.getDate() - 3);
  let previousDateFour = new Date();
  previousDateFour.setDate(previousDateFour.getDate() - 4);
  let previousDateFive = new Date();
  previousDateFive.setDate(previousDateFive.getDate() - 5);
  let previousDateSix = new Date();
  previousDateSix.setDate(previousDateSix.getDate() - 6);

  const setWeeksData = (data) => {
    if (data) {
      data.map((item) => {
        let currTime = new Date();
        let date = new Date(item.updated_at);
        if (
          date.getDate() === currTime.getDate() &&
          date.getMonth() === currTime.getMonth() &&
          date.getFullYear() === currTime.getFullYear()
        ) {
          weeksData[6] = weeksData[6] + 1;
        } else if (
          date.getDate() === previousDateOne.getDate() &&
          date.getMonth() === currTime.getMonth() &&
          date.getFullYear() === currTime.getFullYear()
        ) {
          weeksData[5] = weeksData[5] + 1;
        } else if (
          date.getDate() === previousDateTwo.getDate() &&
          date.getMonth() === currTime.getMonth() &&
          date.getFullYear() === currTime.getFullYear()
        ) {
          weeksData[4] = weeksData[4] + 1;
        } else if (
          date.getDate() === previousDateThree.getDate() &&
          date.getMonth() === currTime.getMonth() &&
          date.getFullYear() === currTime.getFullYear()
        ) {
          weeksData[3] = weeksData[3] + 1;
        } else if (
          date.getDate() === previousDateFour.getDate() &&
          date.getMonth() === currTime.getMonth() &&
          date.getFullYear() === currTime.getFullYear()
        ) {
          weeksData[2] = weeksData[2] + 1;
        } else if (
          date.getDate() === previousDateFive.getDate() &&
          date.getMonth() === currTime.getMonth() &&
          date.getFullYear() === currTime.getFullYear()
        ) {
          weeksData[1] = weeksData[1] + 1;
        } else if (
          date.getDate() === previousDateSix.getDate() &&
          date.getMonth() === currTime.getMonth() &&
          date.getFullYear() === currTime.getFullYear()
        ) {
          weeksData[0] = weeksData[0] + 1;
        }
        return false;
      });
      return weeksData;
    } else return false;
  };

  const setMonthsData = (data) => {
    if (data) {
      data.map((item) => {
        let currTime = new Date();
        let date = new Date(item.updated_at);
        if (
          date.getMonth() === 0 &&
          date.getFullYear() === currTime.getFullYear()
        ) {
          monthsData[0] = monthsData[0] + 1;
        } else if (
          date.getMonth() === 1 &&
          date.getFullYear() === currTime.getFullYear()
        ) {
          monthsData[1] = monthsData[1] + 1;
        } else if (
          date.getMonth() === 2 &&
          date.getFullYear() === currTime.getFullYear()
        ) {
          monthsData[2] = monthsData[2] + 1;
        } else if (
          date.getMonth() === 3 &&
          date.getFullYear() === currTime.getFullYear()
        ) {
          monthsData[3] = monthsData[3] + 1;
        } else if (
          date.getMonth() === 4 &&
          date.getFullYear() === currTime.getFullYear()
        ) {
          monthsData[4] = monthsData[4] + 1;
        } else if (
          date.getMonth() === 5 &&
          date.getFullYear() === currTime.getFullYear()
        ) {
          monthsData[5] = monthsData[5] + 1;
        } else if (
          date.getMonth() === 6 &&
          date.getFullYear() === currTime.getFullYear()
        ) {
          monthsData[6] = monthsData[6] + 1;
        } else if (
          date.getMonth() === 7 &&
          date.getFullYear() === currTime.getFullYear()
        ) {
          monthsData[7] = monthsData[7] + 1;
        } else if (
          date.getMonth() === 8 &&
          date.getFullYear() === currTime.getFullYear()
        ) {
          monthsData[8] = monthsData[8] + 1;
        } else if (
          date.getMonth() === 9 &&
          date.getFullYear() === currTime.getFullYear()
        ) {
          monthsData[9] = monthsData[9] + 1;
        } else if (
          date.getMonth() === 10 &&
          date.getFullYear() === currTime.getFullYear()
        ) {
          monthsData[10] = monthsData[10] + 1;
        } else if (
          date.getMonth() === 11 &&
          date.getFullYear() === currTime.getFullYear()
        ) {
          monthsData[11] = monthsData[11] + 1;
        } else if (
          date.getMonth() === 12 &&
          date.getFullYear() === currTime.getFullYear()
        ) {
          monthsData[12] = monthsData[12] + 1;
        }
        return false;
      });
      return monthsData;
    } else return false;
  };

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
        label: "Patients",
        data: setTodaysData(data),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const dataWeek = {
    labels: [
      previousDateSix.toDateString(),
      previousDateFive.toDateString(),
      previousDateFour.toDateString(),
      previousDateThree.toDateString(),
      previousDateTwo.toDateString(),
      previousDateOne.toDateString(),
      new Date().toDateString(),
    ],
    datasets: [
      {
        label: "Patients",
        data: setWeeksData(data),
        borderColor: "rgba(0, 101, 255)",
        backgroundColor: "rgba(0, 101, 255, 0.5)",
      },
    ],
  };

  const dataMonth = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Patients",
        data: setMonthsData(data),
        borderColor: "rgba(0, 181, 0)",
        backgroundColor: "rgba(0, 181, 0, 0.5)",
      },
    ],
  };

  const optionsDay = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: "Number of Patients Processed - Today (24 Hours)",
        font: {
          size: 20,
        },
        padding: {
          top: 30,
          bottom: 30
        },
      },
    },
  };

  const optionsWeek = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: "Number of Patients Processed - Last 7 Days",
        font: {
          size: 20,
        },
        padding: {
          top: 30,
          bottom: 30
        },
      },
    },
  };

  const optionsMonth = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: "Number of Patients Processed - Per Month this Year",
        font: {
          size: 20,
        },
        padding: {
          top: 30,
          bottom: 30
        },
      },
    },
  };

  const printReport = () => {
    const pdf = new jsPDF("l", "pt", "letter");
    const prints = document.querySelector("#prints");

    html2canvas(prints).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      pdf.addImage(imgData, "PNG", 15, 0, 775, 600);
      pdf.save("reports");
    });
  };

  return (
    <div>
      <Button type="primary" onClick={printReport}>
        Print
      </Button>
      <br />
      <div id="prints">
        <Line options={optionsDay} height={75} data={dataHour} />
        <br />
        <Line options={optionsWeek} height={75} data={dataWeek} />
        <br />
        <Line options={optionsMonth} height={75} data={dataMonth} />
      </div>
    </div>
  );
}
