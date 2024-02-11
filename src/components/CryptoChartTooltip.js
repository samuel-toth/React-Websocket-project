import { FaCircle } from "react-icons/fa";
import { formatDate } from "../utils/helper";

/**
 * Tooltip component for a cryptocurrency chart with formatted data.
 *
 * @param {Object} props The component props.
 * @param {boolean} props.active Indicates if the tooltip is active.
 * @param {Array} props.payload The data payload for the tooltip.
 * @param {string} props.label The label for the tooltip.
 * @returns {JSX.Element|null} CryptoChartTooltip component or null if not active.
 */
const CryptoChartTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className=" bg-slate-400/30dark:bg-slate-500/50 rounded-lg shadow-lg 
      backdrop-blur-md p-2 text-slate-700 dark:text-slate-300"
      >
        <p className="label font-semibold">{formatDate(label)}</p>
        {payload.map((crypto) => (
          <div key={crypto.dataKey} className="flex items-center">
            <FaCircle
              className="mr-2 text-xs"
              style={{ color: crypto.color }}
            />
            <p>
              <span className="font-semibold">{crypto.name}</span>:{" "}
              {parseFloat(crypto.value).toPrecision(2)}%
            </p>
          </div>
        ))}
      </div>
    );
  }

  return null;
};

export default CryptoChartTooltip;
