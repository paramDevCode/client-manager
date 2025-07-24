import React, { useState } from 'react';
import axios from 'axios';
import{Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
 const Login = ({ setToken }) => {
  const navigate = useNavigate(); // ✅ Correct usage of hook at top level

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const API_URL = process.env.REACT_APP_API_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });
      console.log(response.data); // ✅ Confirm login
      setToken(response.data.token);
      navigate('/dashboard'); // ✅ Redirect to dashboard
    } catch (error) {
      console.error('Login error:', error.response ? error.response.data : error.message);
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
     <div className="flex items-center justify-center min-h-screen bg-gray-100">
  <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
    <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
      >
        Login
      </button>
       <p className="text-left">
  <Link to="/Register" className="text-blue-600 hover:underline">
    Register
  </Link>
</p>

      <p className='text-right'><a >Forgot password</a></p>
    </form>
    {error && (
      <p className="text-red-600 text-sm mt-4 text-center">{error}</p>
    )}
  </div>
</div>

  );
};

export default Login;
