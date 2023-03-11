import "./App.css";
import Home from "./pages/Home";
import Register from "./pages/Register";
import { Manager } from "./components/Admin/Manager.jsx";
import ManagerSignIn from "./components/Admin/ManagerSignIn";
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
          <Route path="admin" element={<ManagerSignIn />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
