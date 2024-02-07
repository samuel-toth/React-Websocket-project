import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
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
  return `${date.toLocaleDateString("sk-SK")} ${date.toLocaleTimeString(
    "sk-SK"
  )}`;
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip" style={{ backgroundColor: "#fff", padding: "5px", border: "1px solid #ccc" }}>
        <p className="label">{formatDate(label)}</p>
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



const CryptoChart = () => {
  const { chartData, cryptos } = useDashboard();
  const [formattedData, setFormattedData] = useState([]);
  const [timeRange, setTimeRange] = useState("1m");
  const [initialTime] = useState(Date.now());
  const [xAxisTicks, setXAxisTicks] = useState([]);

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
    const tempData = chartData.map(({ id, date, percentageChange, name }) => ({
      id,
      date: new Date(date).getTime(),
      percentageChange,
      name,
    }));

    const groupedData = tempData.reduce((acc, { id, date, percentageChange, name }) => {
      if (!acc[id]) {
        acc[id] = [];
      }
      acc[id].push({ date, percentageChange, name });
      return acc;
    }, {});

    const newData = Object.keys(groupedData).map((cryptoId) => ({
      id: cryptoId,
      data: groupedData[cryptoId],
      title: cryptos.find((crypto) => crypto.id === cryptoId).name,
    }));

    setFormattedData(newData);
  }, [chartData]);

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
    <div style={{ width: "100%", height: 400, zIndex: 5 }}>
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
          <YAxis
            label={{
              value: "Percentage Change",
              angle: -90,
              position: "insideLeft",
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          {formattedData.map((series, idx) => (
            <Line
              key={idx}
              type="linear"
              dataKey="percentageChange"
              data={series.data}
              name={series.title}
              stroke={
                cryptos.find((crypto) => crypto.id === series.id)?.color ||
                "#8884d8"
              }
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
          ))}
        </LineChart>
        <div className="text-red-200">
          {Object.keys(timeRanges).map((range) => (
            <button
              key={range}
              onClick={() => handleTimeRangeChange(range)}
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
