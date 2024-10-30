import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { useEffect } from "react";
import Register from "./pages/Register";

export default function App() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/login");
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}
