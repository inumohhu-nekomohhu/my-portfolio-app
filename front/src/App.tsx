// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login'; // Login.tsx のパスに合わせる
import Dashboard from './components/dashboard/Dashboard'; 
import ScreenCheck from './components/ScreenCheck';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<ScreenCheck />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
