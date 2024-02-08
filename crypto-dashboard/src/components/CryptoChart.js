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
import { useCryptoData } from "../contexts/CryptoDataContext";
import {
  formatDate,
  formatXAxisTick,
  intervalMap,
  timeRanges,
} from "../utils/helper";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="custom-tooltip"
        style={{
          backgroundColor: "#fff",
          padding: "5px",
          border: "1px solid #ccc",
        }}
      >
        <p className="label">{formatDate(label)}</p>
        {payload.map((crypto) => (
          <p
            key={crypto.dataKey}
            className="label"
            style={{ color: crypto.color }}
          >
            {`${crypto.name}: ${crypto.value}%`}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

const CryptoChart = () => {
  const { chartData, cryptos } = useCryptoData();
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
  }, [initialTime, timeRange]);

  useEffect(() => {
    const tempData = chartData.map(({ id, date, percentageChange, name }) => ({
      id,
      date: new Date(date).getTime(),
      percentageChange,
      name,
    }));

    const groupedData = tempData.reduce(
      (acc, { id, date, percentageChange, name }) => {
        if (!acc[id]) {
          acc[id] = [];
        }
        acc[id].push({ date, percentageChange, name });
        return acc;
      },
      {}
    );

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

  return (
    <div style={{ width: "100%", height: 400, zIndex: 5 }}>
      <ResponsiveContainer className="w-full h-96">
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
            <button key={range} onClick={() => handleTimeRangeChange(range)}>
              {range.toUpperCase()}
            </button>
          ))}
        </div>
      </ResponsiveContainer>
    </div>
  );
};

export default CryptoChart;
