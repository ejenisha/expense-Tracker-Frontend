import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onSwitch, onLogin }) => {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/v1/user/login', { mail, password });
      setMessage(response.data.message);
      if (response.data.message === 'Login successful') {
        onLogin(); // Trigger login state
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage('An error occurred while logging in. ' + error.response?.data.message || 'Please try again.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Email"
        value={mail}
        onChange={(e) => setMail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {message && <p>{message}</p>}
      <p>
        Don't have an account?{' '}
        <button onClick={onSwitch}>Signup</button>
      </p>
    </div>
  );
};

export default Login;
