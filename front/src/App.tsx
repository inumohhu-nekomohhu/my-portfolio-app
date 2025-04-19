// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import InventoryForm from './components/inventory/InventoryForm';
import InventoryPage from "./pages/InventoryPage";
import RecipeSearch from './components/RecipeSearch';
import SignUpForm from './components/auth/SignUpForm';
//import ScreenCheck from './components/ScreenCheck';
import RequireAuth from './utils/RequireAuth'; 
import Logout from './components/auth/Logout'; 

const App: React.FC = () => {
  console.log("本番でのAPI URLは:", import.meta.env.VITE_API_URL);

  return (
    <BrowserRouter>
      <Routes>
        {/* 認証不要ページ */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/" element={<Login/>} />
        <Route path="/logout" element={<Logout />} />
        

        {/* 認証が必要なページ */}
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/inventory/new"
          element={
            <RequireAuth>
              <InventoryForm />
            </RequireAuth>
          }
        />
        <Route
          path="/inventory"
          element={
            <RequireAuth>
              <InventoryPage />
            </RequireAuth>
          }
        />
        <Route
          path="/recipes/search"
          element={
            <RequireAuth>
              <RecipeSearch />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
