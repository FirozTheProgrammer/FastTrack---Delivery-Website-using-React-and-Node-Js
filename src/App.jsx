import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import UserRequest from './pages/UserRequest';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/request" element={<UserRequest />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
