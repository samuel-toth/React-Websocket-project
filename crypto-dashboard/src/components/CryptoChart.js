import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianAxis,
} from "recharts";
import { useDashboard } from "../contexts/DashboardContext";

const timeRanges = {
  "1m": 60 * 1000,
  "5m": 5 * 60 * 1000,
  "15m": 15 * 60 * 1000,
  "30m": 30 * 60 * 1000,
  "60m": 60 * 60 * 1000,
};

const intervalMap = {
  "1m": 15 * 1000, // Every 15 seconds for 1 minute
  "5m": 30 * 1000, // Every 30 seconds for 5 minutes
  "15m": 1 * 60 * 1000, // Every 1 minute for 15 minutes
  "30m": 2 * 60 * 1000, // Every 2 minutes for 30 minutes
  "60m": 5 * 60 * 1000, // Every 5 minutes for 60 minutes
};

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return `${date.toLocaleDateString("sk-SK")} ${date.toLocaleTimeString("sk-SK")}`;
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip" style={{ backgroundColor: "#fff", padding: "5px", border: "1px solid #ccc" }}>
        <p className="label">{`Time: ${formatDate(label)}`}</p>
        {payload.map((crypto) => (
          <p key={crypto.dataKey} className="label" style={{ color: crypto.color }}>
            {`${crypto.name}: ${crypto.value}%`}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

const capitalizeWords = (str) =>
  str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

const getRandomColor = () =>
  "#" + Math.floor(Math.random() * 16777215).toString(16);

const CryptoChart = () => {
  const { chartData } = useDashboard();
  const [formattedData, setFormattedData] = useState([]);
  const [timeRange, setTimeRange] = useState("1m"); // Default time range is 1 minute
  const [initialTime] = useState(Date.now()); // Initial time is the time when the component is mounted
  const [xAxisTicks, setXAxisTicks] = useState([]);
  const [colors, setColors] = useState({});

  useEffect(() => {
    const interval = intervalMap[timeRange];
    const endTime = initialTime + timeRanges[timeRange];
    const ticks = [];

    for (let time = initialTime; time <= endTime; time += interval) {
      ticks.push(time);
    }

    setXAxisTicks(ticks);
  }, [timeRange]);

  useEffect(() => {
    const newColors = { ...colors };
    const tempData = chartData.map(({ id, date, percentageChange }) => {
      if (!newColors[id]) {
        newColors[id] = getRandomColor();
      }
      return { id, date: new Date(date).getTime(), percentageChange };
    });

    const groupedData = tempData.reduce((acc, { id, date, percentageChange }) => {
      if (!acc[id]) {
        acc[id] = [];
      }
      acc[id].push({ date, percentageChange });
      return acc;
    }, {});

    const newData = Object.keys(groupedData).map((cryptoId) => ({
      id: capitalizeWords(cryptoId),
      data: groupedData[cryptoId],
    }));

    setColors(newColors);
    setFormattedData(newData);
  }, [chartData, colors]);

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
  };

  const formatXAxisTick = (tick) => {
    return new Date(tick).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div style={{ width: "100%", height: 400, zInde: 5 }}>
      <ResponsiveContainer>
        <LineChart
          width={500}
          height={300}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          data={formattedData}
        >
          <XAxis
            dataKey="date"
            domain={["dataMin", "dataMax"]}
            type="number"
            tickFormatter={formatXAxisTick}
            scale="time"
            ticks={xAxisTicks}
          />
          <CartesianAxis scale="log" /> {/* Logarithmic scale for Y axis */}

          <YAxis label={{ value: "Percentage Change", angle: -90, position: 'insideLeft' }} /> {/* Added label for Y axis */}
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          {formattedData.map((series, idx) => (
            <Line
              key={idx}
              type="linear"
              dataKey="percentageChange"
              data={series.data}
              name={series.id}
              stroke={colors[series.id.toLowerCase()] || '#8884d8'}
              strokeWidth={2}
              dot={false}
              isAnimationActive={true}
            />
          ))}
        </LineChart>
        <div>
          {Object.keys(timeRanges).map((range) => (
            <button
              key={range}
              onClick={() => handleTimeRangeChange(range)}
              style={{ margin: "0 5px" }}
            >
              {range.toUpperCase()}
            </button>
          ))}
        </div>
      </ResponsiveContainer>
    </div>
  );
};

export default CryptoChart;
