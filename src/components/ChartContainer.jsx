import React from "react";
import SingleSeriesChart from "./SingleSeriesChart";
import MultiSeriesChart from "./MultiSeriesChart";

const ChartContainer = ({ title, data }) => {
  const isMultiSeries = Array.isArray(data[0][1]);

  return (
    <div style={{ marginBottom: 40 }}>
      <h3>{title}</h3>
      {isMultiSeries ? (
        <MultiSeriesChart data={data} />
      ) : (
        <SingleSeriesChart data={data} />
      )}
    </div>
  );
};

export default ChartContainer;
