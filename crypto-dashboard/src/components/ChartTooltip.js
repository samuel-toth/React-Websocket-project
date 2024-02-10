import { FaCircle } from "react-icons/fa";
import { formatDate } from "../utils/helper";

const ChartTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className=" bg-slate-400/30 dark:bg-slate-200/30 rounded-lg shadow-lg backdrop-blur-md p-2 text-slate-700 dark:text-slate-300">
        <p className="label font-semibold">{formatDate(label)}</p>
        {payload.map((crypto) => (
          <div key={crypto.dataKey + crypto.name} className="flex items-center">
            <FaCircle
              className="mr-2 text-xs"
              style={{ color: crypto.color }}
            />
            <p>
              <span className="font-semibold">{crypto.name}</span>: {parseFloat(crypto.value).toPrecision(2)}%
            </p>
          </div>
        ))}
      </div>
    );
  }

  return null;
};

export default ChartTooltip;
