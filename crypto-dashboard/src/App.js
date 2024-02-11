import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";
import { useDashboard } from "./contexts/DashboardContext";
import { useCryptoData } from "./contexts/CryptoDataContext";
import { Toaster } from "react-hot-toast";

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
            background: darkMode ? "#64748b" : "#94a3b8", // Colors slate-500 and slate-400
            color: darkMode ? "#94a3b8" : "#f1f5f9", // Colors slate-400 and slate-100
            fontSize: "0.9rem",
          },
        }}
      />
    </>
  );
};

export default App;
