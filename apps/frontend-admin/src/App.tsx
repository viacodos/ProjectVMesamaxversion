import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@project-v-redone/ui';
import { LandingPage } from './pages/LandingPage';
import { DashboardLayout } from './components/DashboardLayout';
import { Analytics } from './pages/Analytics';
import { AddPackage } from './pages/AddPackage';
import { ManagePackages } from './pages/ManagePackages';
import { SystemTests } from './pages/Tests';
import { Restricted } from './pages/Restricted';
import { Profile } from './pages/Profile';
import { Overview } from './pages/Overview';

function App() {
  return (
    <ThemeProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Overview />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="add-package" element={<AddPackage />} />
            <Route path="manage-packages" element={<ManagePackages />} />
            <Route path="tests" element={<SystemTests />} />
            <Route path="restricted" element={<Restricted />} />
          </Route>
          <Route path="/profile" element={<DashboardLayout />}>
            <Route index element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
