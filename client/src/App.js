import "./App.css";
import Home from "./pages/Home";
import Register from "./pages/Register";
import { Manager } from "./components/Admin/Manager";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="manager" element={<Manager />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
