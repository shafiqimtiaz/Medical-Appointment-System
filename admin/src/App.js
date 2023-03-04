import './App.css';
import { Manager } from './Components/Admin/Manager.jsx';
import ManagerSignIn  from './Components/Admin/ManagerSignIn';
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
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path="/Manager" element={ <Manager/> }> </Route>
            <Route path="/Admin" element={ < ManagerSignIn /> }> </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
