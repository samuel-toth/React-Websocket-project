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
  formatXAxisTick,
  intervalMap,
  timeRanges,
  formatYAxisTick,
} from "../utils/helper";
import ChartTooltip from "./ChartTooltip";

const CryptoChart = () => {
  const { chartData, watchedCryptos } = useCryptoData();
  const [formattedData, setFormattedData] = useState([]);
  const [timeRange, setTimeRange] = useState("1m");
  const [initialTime, setInitialTime] = useState(Date.now());
  const [xAxisTicks, setXAxisTicks] = useState([]);
  const [yAxisDomain, setYAxisDomain] = useState([0, 100]);
  const [yAxisTicks, setYAxisTicks] = useState([]);

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
      title: watchedCryptos.find((crypto) => crypto.id === cryptoId).name,
    }));

    const filteredData = newData.filter(
      (crypto) => watchedCryptos.find(({ id }) => id === crypto.id)?.isCharted
    );

    setFormattedData(filteredData);

    const allPercentageChanges = formattedData.flatMap((series) =>
      series.data.map((entry) => entry.percentageChange)
    );
    const minY = Math.min(...allPercentageChanges);
    const maxY = Math.max(...allPercentageChanges);

    if (minY !== Infinity && maxY !== -Infinity) setYAxisDomain([minY, maxY]);
  }, [chartData]);

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
    setInitialTime(Date.now());
  };

  const handleScrollForward = () => {
    setInitialTime(initialTime + timeRanges[timeRange]);
  };

  const handleScrollBackward = () => {
    setInitialTime(initialTime - timeRanges[timeRange]);
  };

  return (
    <>
      <div className="select-none bg-slate-300/30 p-4 pt-6 m-6 rounded-xl backdrop-blur-lg shadow-lg">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart
            margin={{ left: 20, right: 20, top: 5 }}
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
                dx: -40,
              }}
              domain={yAxisDomain}
              ticks={yAxisTicks}
              tickFormatter={formatYAxisTick}
            />

            {watchedCryptos.some((crypto) => crypto.isCharted) &&
              chartData.length > 0 && <Tooltip content={<ChartTooltip />} />}

            <Legend />
            {formattedData.map((series) => (
              <Line
                key={series.id}
                type="linear"
                dataKey="percentageChange"
                data={series.data}
                name={series.title}
                stroke={
                  watchedCryptos.find((crypto) => crypto.id === series.id)
                    ?.color || "#8884d8"
                }
                strokeWidth={3}
                dot={false}
                isAnimationActive={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default CryptoChart;
