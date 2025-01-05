import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const apiUrl = import.meta.env.VITE_serverUrl;

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(`${apiUrl}/register`, { email, password });
      console.log(response.data);
      // Handle successful registration
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-lg font-bold mb-4">Sign Up</h2>
        {error && <p className="text-red-500">{error}</p>}
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
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">Sign Up</button>
        <p className="mt-4 text-center bg-black">
          Login again? <Link to="/" className="text-blue-500"><u>Login</u></Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
