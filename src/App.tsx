import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Nav from "./components/Nav";
import ProdutosPage from "./pages/Products";
import Login from "./pages/Login";
import ProductsForm from "./pages/ProductsForm";

const App: React.FC = () => {
  const menuItems = [
    { label: "Home", route: "/login" },
    { label: "Produtos", route: "/produtos" },
    { label: "Cadastro", route: "/cadastro" },
  ];

  const [isAuthenticated, setAuthenticated] = useState(false);

  const handleLoginSuccess = () => {
    setAuthenticated(true);
  };

  return (
    <BrowserRouter>
      <div>
        {isAuthenticated && <Nav menuItems={menuItems} />}
        <Routes>
          <Route
            path="/login"
            element={<Login onLoginSuccess={handleLoginSuccess} />}
          />
          {isAuthenticated ? (
            <>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/produtos" element={<ProdutosPage />} />
              <Route path="/cadastro" element={<ProductsForm />} />
            </>
          ) : (
            <Route path="/" element={<Navigate to="/login" replace />} />
          )}
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
