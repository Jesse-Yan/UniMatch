import React from "react";
import { Chart, Line } from "bizcharts";

const LineChart = (props) => (
  <div>
    <h4>{props.title}</h4>
    <Chart
      scale={{ value: { min: 0 } }}
      padding={[10, 20, 50, 40]}
      width={600}
      height={200}
      data={props.data}
    >
      <Line
        shape="smooth"
        position="title*score"
        color="l (270) 0:rgba(255, 146, 255, 1) .5:rgba(100, 268, 255, 1) 1:rgba(215, 0, 255, 1)"
      />
    </Chart>
  </div>
);

export default LineChart;
