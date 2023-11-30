import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const DonutChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const width = 100;
    const height = 100;
    const radius = Math.min(width, height) / 2;

    const svg = d3
      .select(chartRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const color = d3
      .scaleOrdinal()
      .domain(data.map((d) => d.label))
      .range(["#0AC8B9", "#005A82"]); // Green for wins, Red for losses

    // Sort the data based on the label to ensure consistent order
    data.sort((a, b) => a.label.localeCompare(b.label));

    const pie = d3.pie().value((d) => d.value);

    const arc = d3
      .arc()
      .innerRadius(radius - 20) // Adjust the inner radius to control the ring thickness
      .outerRadius(radius);

    const arcs = svg
      .selectAll("arc")
      .data(pie(data))
      .enter()
      .append("g")
      .attr("class", "arc");

    arcs
      .append("path")
      .attr("fill", (d) => color(d.data.label))
      .transition()
      .duration(800) // Animation duration in milliseconds
      .attrTween("d", (d) => {
        const interpolate = d3.interpolate(d.startAngle, d.endAngle);
        return (t) => {
          d.endAngle = interpolate(t);
          return arc(d);
        };
      });
  }, [data]);

  return <svg ref={chartRef} />;
};

export default DonutChart;
