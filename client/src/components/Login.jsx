import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import GoogleLoginButton from './googleLogin';

const apiUrl = import.meta.env.VITE_serverUrl;
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Define the error state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/login`, { email, password });
      console.log(response.data);
      // Handle successful login (e.g., store token, redirect to dashboard)
      localStorage.setItem('token', response.data.token); // Store the token
      navigate('/users'); // Redirect to the user list/dashboard// Redirect to dashboard
    } catch (error) {
      // Improved error handling
      if (error.response) {
        console.error('Login failed:', error.response.data);
        setError(error.response.data.message || 'Login failed'); // Use setError to set the error message
      } else if (error.request) {
        console.error('No response received:', error.request);
        setError('No response from server. Please try again later.');
      } else {
        console.error('Error:', error.message);
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-lg font-bold mb-4">Login</h2>
        {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 mb-4 w-full"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 mb-4 w-full"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">Login</button>
        <GoogleLoginButton />
        <p className="mt-4 text-center bg-black">
          Don't have an account? <Link to="/signup" className="text-blue-500">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;