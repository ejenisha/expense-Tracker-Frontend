import React, { useState } from 'react';
import axios from 'axios';

const Signup = ({ onSwitch, onLogin }) => {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/v1/user/signup', { mail, password });
      setMessage(response.data.msg);
      if (response.data.msg === 'User created successfully') {
        onLogin(); // Trigger login state
      }
    } catch (error) {
      console.error('Signup error:', error);
      setMessage('An error occurred while signing up. ' + error.response?.data.msg || 'Please try again.');
    }
  };

  return (
    <div>
      <h2>Signup</h2>
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
      <button onClick={handleSignup}>Signup</button>
      {message && <p>{message}</p>}
      <p>
        Already have an account?{' '}
        <button onClick={onSwitch}>Login</button>
      </p>
    </div>
  );
};

export default Signup;
