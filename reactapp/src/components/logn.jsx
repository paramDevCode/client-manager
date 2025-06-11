import React, { useState } from 'react'
import axios from 'axios';

const Login = ({ setToken }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
  const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });
  console.log(response.data); // Debugging step to verify response
  setToken(response.data.token);
} catch (error) {
  console.error("Login error:", error.response ? error.response.data : error.message);
  setError("Invalid credentials. Please try again.");
}
 
    }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );

}
export default Login;
