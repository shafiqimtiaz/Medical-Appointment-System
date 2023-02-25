import Home from "./pages/Home";
import Register from "./pages/Register";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Manager from './Pages/ManagerPanel/Manager';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  BrowserRouter,
  Routes,
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/">
      <Route index element={<Home/>}/>
      <Route path="register" element={<Register/>}/>
      <Route path="dashboard" element={<Dashboard/>}/>
      <Route path="/Admin" element={ <Manager/> }> </Route>
    </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
