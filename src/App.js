import React, { useEffect, useState } from "react";
import ChartContainer from "./components/ChartContainer";

function App() {
  const [charts, setCharts] = useState([]);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => setCharts(data))
      .catch((err) => console.error("Failed to load data:", err));
  }, []);

  return (
    <div style={{ padding: 24 }}>
      {charts.map((chart, i) => (
        <ChartContainer key={i} title={chart.title} data={chart.data} />
      ))}
    </div>
  );
}

export default App;
