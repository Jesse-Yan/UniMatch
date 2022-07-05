import React from "react";
import {
  Chart,
  Axis,
  Tooltip,
  Interval,
  Interaction,
  Coordinate,
} from "bizcharts";

const cols = {
  percent: {
    formatter: (val) => {
      val = (val * 100).toFixed(2) + "%";
      return val;
    },
  },
};

const PieChart = (props) => (
  <div>
    <h4>{props.title}</h4>
    <Chart height={300} width={400} data={props.data} scale={cols}>
      <Coordinate type="theta" radius={0.75} />
      <Tooltip showTitle={false} />
      <Axis visible={false} />
      <Interval
        position="percent"
        adjust="stack"
        color="item"
        style={{
          lineWidth: 1,
          stroke: "#fff",
        }}
        label={[
          "count",
          {
            content: (data) => {
              return `${data.item}: ${(data.percent * 100).toFixed(2)}%`;
            },
          },
        ]}
      />
      <Interaction type="element-single-selected" />
    </Chart>
  </div>
);

export default PieChart;
