import Home from "./pages/Home";
import Register from "./pages/Register";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/">
      <Route index element={<Home/>}/>
      <Route path="register" element={<Register/>}/>
      <Route path="dashboard" element={<Dashboard/>}/>
    </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
