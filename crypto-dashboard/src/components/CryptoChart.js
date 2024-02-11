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
import {
  formatXAxisTick,
  intervalOptions,
  formatYAxisTick,
  roundTimeToNearestTenSeconds,
} from "../utils/helper";
import ChartTooltip from "./CryptoChartTooltip";
import CryptoChartButtons from "./CryptoChartButtons";

/**
 * Chart component displaying watchlisted cryptocurrencies data over time.
 *
 * @param {Object} props The component props.
 * @param {Array} props.cryptos The list of cryptocurrencies with data to be displayed.
 * @returns {JSX.Element} CryptoChart component.
 */
const CryptoChart = ({ cryptos }) => {
  const [formattedData, setFormattedData] = useState([]);
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
      Date.now() + totalDuration + intervalOffset * selectedOption.millsecs;
    const startTime = endTime - totalDuration;

    const newTicks = [];
    for (let i = 0; i <= nTicks; i++) {
      newTicks.push(startTime + i * (totalDuration / nTicks));
    }

    setXAxisTicks(newTicks);
  }, [interval, intervalOffset]);

  useEffect(() => {
    const newData = cryptos.reduce((acc, crypto) => {
      crypto.data.forEach((dataPoint) => {
        const roundedDate = roundTimeToNearestTenSeconds(dataPoint.date);

        const existingEntry = acc.find((entry) => entry.date === roundedDate);
        if (existingEntry) {
          existingEntry[crypto.name] = dataPoint.percentageChange;
        } else {
          acc.push({
            date: dataPoint.date,
            [crypto.name]: dataPoint.percentageChange,
          });
        }
      });
      return acc;
    }, []);

    setFormattedData(newData);
  }, [cryptos]);

  useEffect(() => {
    if (!formattedData.length || formattedData.length === 1) {
      setYAxisDomain([0, 100]);
      setYAxisTicks([0, 25, 50, 75, 100]);
      return;
    }

    const allPercentageChanges = cryptos.flatMap((crypto) =>
      crypto.data.map((dataPoint) => dataPoint.percentageChange)
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
    <div>
      <div
        className="select-none bg-slate-300/30 mt-4 sm:pt-4 sm:pb-8 pr-8 pb-4
      rounded-xl sm:text-md text-xs backdrop-blur-lg shadow-lg sm:h-96 h-72
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
            <Tooltip content={<ChartTooltip />} />
            <Legend />
            {cryptos
              .filter((crypto) => crypto.isCharted)
              .map((crypto) => (
                <Line
                  key={crypto.id}
                  type="linear"
                  dataKey={crypto.name}
                  stroke={crypto.color || "#8884d8"}
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={false}
                />
              ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
      <CryptoChartButtons
        setInterval={handleIntervalChange}
        setIntervalOffset={handleMoveByOffset}
        interval={interval}
      />
    </div>
  );
};

export default CryptoChart;
