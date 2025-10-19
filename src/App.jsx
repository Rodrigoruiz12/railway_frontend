// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import InicioPage from './components/pages/InicioPage';
import ProductoPage from './components/pages/ProductoPage';
import ProductoDetallePage from './components/pages/ProductoDetallePage';
import CarritoPage from './components/pages/CarritoPage';
import EntrarPage from './components/pages/EntrarPage';
import AdminPage from './components/pages/AdminPage';
import RegistroPage from './components/pages/RegistroPage';
import BlogPage from './components/pages/BlogPage'; // 1. Importa la nueva página

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InicioPage />} />
        <Route path="/products" element={<ProductoPage />} />
        <Route path="/product/:id" element={<ProductoDetallePage />} />
        <Route path="/cart" element={<CarritoPage />} />
        <Route path="/login" element={<EntrarPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/register" element={<RegistroPage />} />
        <Route path="/blog" element={<BlogPage />} /> 
      </Routes>
    </Router>
  );
}

export default App;