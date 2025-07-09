// src/App.tsx
// import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import DashboardLayout from './components/Layout/DashboardLayout';

import PatientsPage from './Pages/PatientsPage';
import OverviewPage from './Pages/OverviewPage';
import MapPage from './Pages/MapPage';
import DepartmentsPage from './Pages/DepartmentsPage';
import DoctorsPage from './Pages/DoctorsPage';
import HistoryPage from './Pages/HistoryPage';
import SettingsPage from './Pages/SettingsPage';

function App() { 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/patients" replace />} /> 

          <Route path="patients" element={<PatientsPage />} />
          <Route path="overview" element={<OverviewPage />} />
          <Route path="map" element={<MapPage />} />
          <Route path="departments" element={<DepartmentsPage />} />
          <Route path="doctors" element={<DoctorsPage />} />
          <Route path="history" element={<HistoryPage />} />
          <Route path="settings" element={<SettingsPage />} />

          {/* Route Catch-all cho trang 404 nếu không khớp */}
          <Route path="*" element={<div>404 Not Found</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;