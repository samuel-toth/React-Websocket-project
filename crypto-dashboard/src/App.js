import './App.css';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import { DashboardProvider } from './contexts/DashboardContext';


function App() {
  return (
    <DashboardProvider>
      <Header />
      <Dashboard />
  </DashboardProvider>
  );
}

export default App;
