import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const colors = ["blue", "green", "red"];

const MultiSeriesChart = ({ data }) => {
  const ref = useRef();

  useEffect(() => {
    const margin = { top: 10, right: 30, bottom: 30, left: 40 };
    const width = 400 - margin.left - margin.right;
    const height = 200 - margin.top - margin.bottom;

    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const g = svg
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear()
      .domain(d3.extent(data, d => d[0]))
      .range([0, width]);

    const allValues = data.flatMap(d => d[1]).filter(v => v !== null);
    const y = d3.scaleLinear()
      .domain([d3.min(allValues), d3.max(allValues)])
      .range([height, 0]);

    g.append("g").attr("transform", `translate(0,${height})`).call(d3.axisBottom(x));
    g.append("g").call(d3.axisLeft(y));

    for (let i = 0; i < 3; i++) {
      const seriesData = data
        .map(d => [d[0], d[1][i]])
        .filter(d => d[1] !== null);

      const line = d3.line()
        .x(d => x(d[0]))
        .y(d => y(d[1]));

      g.append("path")
        .datum(seriesData)
        .attr("fill", "none")
        .attr("stroke", colors[i])
        .attr("stroke-width", 2)
        .attr("d", line);
    }
  }, [data]);

  return <svg ref={ref}></svg>;
};

export default MultiSeriesChart;
