import './App.css';
import { Manager } from './Components/Admin/Manager.jsx';
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
            <Route path="/Admin" element={ <Manager/> }> </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
