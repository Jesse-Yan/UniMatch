import React from "react";
import {
  Chart,
  Point,
  Annotation,
  Axis,
  Coordinate,
  registerShape,
} from "bizcharts";

registerShape("point", "pointer", {
  draw(cfg, container) {
    const group = container.addGroup();
    const center = this.parsePoint({ x: 0, y: 0 });
    group.addShape("line", {
      attrs: {
        x1: center.x,
        y1: center.y,
        x2: cfg.x,
        y2: cfg.y,
        stroke: cfg.color,
        lineWidth: 5,
        lineCap: "round",
      },
    });
    group.addShape("circle", {
      attrs: {
        x: center.x,
        y: center.y,
        r: 9.75,
        stroke: cfg.color,
        lineWidth: 4.5,
        fill: "#fff",
      },
    });

    return group;
  },
});

const PercentageChart = (props) => {
  const data = [{ value: +(props.rate * 100).toFixed(2) }];
  return (
    <Chart
      height={400}
      data={data}
      padding={[0, 0, 30, 0]}
      scale={{
        value: {
          min: 0,
          max: 100,
          tickInterval: 10,
        },
      }}
      autoFit
    >
      <Coordinate
        type="polar"
        radius={0.75}
        startAngle={(-9 / 8) * Math.PI}
        endAngle={(1 / 8) * Math.PI}
      />
      <Axis name="1" />
      <Axis
        name="value"
        line={null}
        label={{
          offset: -36,
          style: {
            fontSize: 18,
            textAlign: "center",
            textBaseline: "middle",
          },
        }}
        subTickLine={{
          count: 4,
          length: -15,
        }}
        tickLine={{
          length: -24,
        }}
        grid={null}
      />
      <Point
        position="value*1"
        color="#1890FF"
        shape="pointer"
        animate={{
          appear: {
            animation: "fade-in",
          },
        }}
      />
      <Annotation.Arc
        top={false}
        start={[0, 1]}
        end={[100, 1]}
        style={{
          stroke: "#CBCBCB",
          lineWidth: 18,
          lineDash: null,
        }}
      />
      <Annotation.Arc
        start={[0, 1]}
        end={[data[0].value, 1]}
        style={{
          stroke: "#1890FF",
          lineWidth: 18,
          lineDash: null,
        }}
      />
      <Annotation.Text
        position={["50%", "85%"]}
        content={"Admission Rate"}
        style={{
          fontSize: 20,
          fill: "#545454",
          textAlign: "center",
        }}
      />
      <Annotation.Text
        position={["50%", "90%"]}
        content={`${data[0].value} %`}
        style={{
          fontSize: 36,
          fill: "#545454",
          textAlign: "center",
        }}
        offsetY={15}
      />
    </Chart>
  );
};

export default PercentageChart;
