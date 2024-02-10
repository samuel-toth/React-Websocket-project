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
  intervalOptions,
  formatYAxisTick,
} from "../utils/helper";
import ChartTooltip from "./ChartTooltip";
import ChartFooter from "./ChartFooter";

const CryptoChart = () => {
  const { chartData, watchedCryptos } = useCryptoData();
  const [formattedData, setFormattedData] = useState([]);
  const [initialTime, setInitialTime] = useState(Date.now());
  const [xAxisTicks, setXAxisTicks] = useState([]);
  const [yAxisDomain, setYAxisDomain] = useState([0, 100]);
  const [yAxisTicks, setYAxisTicks] = useState([]);

  const [interval, setInterval] = useState("1m");
  const [intervalOffset, setIntervalOffset] = useState(0);

  useEffect(() => {
    let selectedOption = intervalOptions.find(
      (option) => option.id === interval.id
    );
    if (!selectedOption) {
      selectedOption = intervalOptions[0];
    }

    const nTicks = 5;
    const totalDuration = selectedOption.millsecs * nTicks;
    const endTime =
      initialTime + totalDuration + intervalOffset * selectedOption.millsecs;
    const startTime = endTime - totalDuration;

    const newTicks = [];
    for (let i = 0; i <= nTicks; i++) {
      newTicks.push(startTime + i * (totalDuration / nTicks));
    }

    setXAxisTicks(newTicks);
  }, [initialTime, interval, intervalOffset]);

  useEffect(() => {
    const tempData = chartData.map(({ id, date, percentageChange, name }) => ({
      id,
      date: new Date(date).getTime(),
      percentageChange,
      name,
    }));

    const groupedData = tempData.reduce(
      (acc, { id, date, percentageChange, name }) => {
        if (!acc[id]) acc[id] = [];
        acc[id].push({ date, percentageChange, name });
        return acc;
      },
      {}
    );

    const newData = Object.keys(groupedData).map((cryptoId) => ({
      id: cryptoId,
      data: groupedData[cryptoId],
      title: watchedCryptos.find((crypto) => crypto.id === cryptoId)?.name,
    }));

    const filteredData = newData.filter(
      (crypto) => watchedCryptos.find(({ id }) => id === crypto.id)?.isCharted
    );

    setFormattedData(filteredData);
  }, [chartData, watchedCryptos]);

  useEffect(() => {
    if (
      !formattedData.length ||
      (formattedData.length === 1 && formattedData[0].data.length === 1)
    ) {
      setYAxisDomain([0, 100]);
      setYAxisTicks([0, 25, 50, 75, 100]);
      return;
    }

    const allPercentageChanges = formattedData.flatMap((series) =>
      series.data.map((entry) => entry.percentageChange)
    );
    const minY = Math.min(...allPercentageChanges);
    const maxY = Math.max(...allPercentageChanges);
    const domain = minY === maxY ? [minY - 5, maxY + 5] : [minY, maxY];
    setYAxisDomain(domain);

    const range = maxY - minY;
    const tickInterval = range / 4;
    const newTicks = Array.from(
      { length: 5 },
      (_, index) => minY + tickInterval * index
    );
    setYAxisTicks(newTicks);
  }, [formattedData]);

  const handleMoveByOffset = (offset) => {
    setIntervalOffset((prevOffset) => prevOffset + offset);
  };

  const handleIntervalChange = (newInterval) => {
    setInterval(newInterval);
  };

  return (
    <>
      <div
        className="select-none bg-slate-300/30 sm:pt-4 sm:pb-8 pr-8 pb-4
      rounded-xl sm:text-md text-xs backdrop-blur-lg shadow-lg sm:h-80 h-72
       text-slate-500 dark:text-slate-300"
      >
        <ResponsiveContainer
          width="100%"
          height="100%"
          className="dark:text-slate-400 text-slate-500"
        >
          <LineChart data={formattedData} margin={{ top: 30 }}>
            <XAxis
              dataKey="date"
              domain={["dataMin", "dataMax"]}
              type="number"
              tickFormatter={formatXAxisTick}
              scale="time"
              ticks={xAxisTicks}
              stroke="currentColor"
              strokeWidth={2}
            />
            <YAxis
              domain={yAxisDomain}
              ticks={yAxisTicks}
              tickFormatter={formatYAxisTick}
              stroke="currentColor"
              strokeWidth={2}
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
      <ChartFooter
        setInterval={handleIntervalChange}
        setIntervalOffset={handleMoveByOffset}
        interval={interval}
      />
    </>
  );
};

export default CryptoChart;
