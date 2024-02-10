import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";
import { useDashboard } from "./contexts/DashboardContext";
import { useCryptoData } from "./contexts/CryptoDataContext";

function App() {
  const { setCurrency, searchTerm, setSearchTerm, darkMode, toggleDarkMode } =
    useDashboard();
  const { refreshData } = useCryptoData();

  return (
    <>
      <Sidebar
        setCurrency={setCurrency}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        refreshData={refreshData}
      />
      <Dashboard />
    </>
  );
}

export default App;
