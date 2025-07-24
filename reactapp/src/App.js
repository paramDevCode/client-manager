import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/logn";
import Register from "./components/register"
import Dashboard from "./components/dashboard"
import { useState } from "react";

function App() {
  const [token, setToken] = useState(null);
  return(
    <Router>
      <Routes>
        <Route path="" element={<Login setToken={setToken}/>} />
          <Route path="/register" element={<Register />} />
             <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  )
}

export default App;
