import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import { AppContextProvider } from "./contexts/AppContextProvider";

function App() {
  return (
    <AppContextProvider>
      <Header />
      <Dashboard />
    </AppContextProvider>
  );
}

export default App;
