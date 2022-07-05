import React from "react";
import { Chart, Interval, Tooltip } from "bizcharts";

const BarChart = (props) => {
  return (
    <div>
      <h4>{props.title}</h4>
      <Chart
        width={600}
        height={200}
        data={props.data}
        interactions={["active-region"]}
        padding={[30, 30, 30, 50]}
      >
        <Interval position="title*score" />
        <Tooltip shared />
      </Chart>
    </div>
  );
};

export default BarChart;
