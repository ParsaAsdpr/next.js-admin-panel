import React from "react";
import { Line } from 'react-chartjs-2'
import {Chart as ChartJS} from 'chart.js/auto'
import { defaults } from 'chart.js';

import chartData from "../../constants/chartsData.json"
import { LineOptions } from "../utils/chartsConfig.utils";

const LineCharts = () => {
  defaults.font.family = 'koodak';
  defaults.font.size = 20;

  const data = {
    labels: chartData.map((data) => data.day),
    datasets: [
      {
        label: "فروش امروز",
        data: chartData.map((data) => data.test),
        backgroundColor: ["#28bd63"],
        pointRadius: 5,
      }
    ]
  }

  return (
    <div className="bg-[#fff] shadow-md rounded-xl p-10">
      <Line data={data} options={LineOptions} />
    </div>
  );
};

export default LineCharts;
