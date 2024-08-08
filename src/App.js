import React, { useState } from 'react';
import Signup from './components/Signup';
import Login from './components/Login';
import Expensepage from './components/Expensepage';

function App() {
  const [isSignup, setIsSignup] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState(''); // State to store the user's email

  const handleLogin = (userEmail) => {
    setEmail(userEmail);
    setIsAuthenticated(true);
  };

  if (isAuthenticated) {
    return <Expensepage email={email} />;
  }

  return (
    <div>
      {isSignup ? (
        <Signup
          onSwitch={() => setIsSignup(false)}
          onLogin={handleLogin} // Pass handleLogin to update email
        />
      ) : (
        <Login
          onSwitch={() => setIsSignup(true)}
          onLogin={handleLogin} // Pass handleLogin to update email
        />
      )}
    </div>
  );
}

export default App;
