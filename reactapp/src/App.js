import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/logn";
import { useState } from "react";

function App() {
  const [token, setToken] = useState(null);
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Login setToken={setToken}/>} />
      </Routes>
    </Router>
  )
}

export default App;
