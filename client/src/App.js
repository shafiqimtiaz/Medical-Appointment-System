import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  BrowserRouter,
  Routes,
} from "react-router-dom";
import Dashboard from './Pages/Dashboard';
import Home from './Pages/Home';
import Register from './Pages/Register';
import Manager from './Pages/ManagerPanel/Manager';


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
