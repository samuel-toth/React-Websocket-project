import { FaCircle } from "react-icons/fa";
import { formatDate } from "../utils/helper";

const ChartTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className=" bg-slate-200/30 rounded-lg shadow-lg backdrop-blur-md p-2">
        <p className="label">{formatDate(label)}</p>
        {payload.map((crypto) => (
          <div key={crypto.dataKey + crypto.name} className="flex items-center">
            <FaCircle
              className="mr-2 text-xs"
              style={{ color: crypto.color }}
            />
            <p>
              {crypto.name}: {parseFloat(crypto.value).toPrecision(2)}%
            </p>
          </div>
        ))}
      </div>
    );
  }

  return null;
};

export default ChartTooltip;
