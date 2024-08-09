import React, { useState } from 'react';
import axios from 'axios';
import 'tailwindcss/tailwind.css';

const Signup = ({ onSwitch, onLogin }) => {
  const [email, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/v1/user/signup', { email, password });
      setMessage(response.data.msg);
     
      if (response.data.msg === 'User created successfully') {
        onLogin(email); // Trigger login state
      }
    } catch (error) {
      console.error('Signup error:', error);
      setMessage('An error occurred while signing up. ' + (error.response?.data.msg || 'Please try again.'));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-400">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center text-indigo-700">Signup</h2>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-indigo-700">Email</label>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setMail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-indigo-700">Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={handleSignup}
          className="w-full px-4 py-2 font-bold text-indigo-700 bg-blue-400 rounded-lg hover:bg-blue-100 focus:outline-none focus:ring-2 focus:bg-blue-100"
        >
          Signup
        </button>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{' '}
          <button onClick={onSwitch} className="font-bold text-indigo-700 hover:underline">
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
