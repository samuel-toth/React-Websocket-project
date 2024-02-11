import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";
import { useDashboard } from "./contexts/DashboardContext";
import { useCryptoData } from "./contexts/CryptoDataContext";
import { Toaster } from "react-hot-toast";
import { TW_CLASSES } from "./utils/constants";

const App = () => {
  const { setCurrency, searchTerm, setSearchTerm, darkMode, toggleDarkMode } =
    useDashboard();
  const { refreshData, regenerateAllColors } = useCryptoData();

  return (
    <>
      <Sidebar
        setCurrency={setCurrency}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        refreshData={refreshData}
        regenerateColors={regenerateAllColors}
      />
      <Dashboard />
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        gutter={10}
        duration={4000}
        toastOptions={{
          style: {
            background: darkMode
              ? TW_CLASSES.SLATE_500_HEX
              : TW_CLASSES.SLATE_400_HEX,
            color: darkMode
              ? TW_CLASSES.SLATE_400_HEX
              : TW_CLASSES.SLATE_100_HEX,
            fontSize: "0.9rem",
          },
        }}
      />
    </>
  );
};

export default App;
