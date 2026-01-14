import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@project-v-redone/ui';
import { LandingPage } from './pages/LandingPage';
import { DashboardLayout } from './components/DashboardLayout';
import { Analytics } from './pages/Analytics';
import { AddPackage } from './pages/AddPackage';
import { ManagePackages } from './pages/ManagePackages';
import { SystemTests } from './pages/Tests';
import { Restricted } from './pages/Restricted';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Analytics />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="add-package" element={<AddPackage />} />
            <Route path="manage-packages" element={<ManagePackages />} />
            <Route path="tests" element={<SystemTests />} />
            <Route path="restricted" element={<Restricted />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
