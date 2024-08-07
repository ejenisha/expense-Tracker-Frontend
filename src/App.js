import React, { useState } from 'react';
import Signup from './components/Signup';
import Login from './components/Login';
import Expensepage from './components/Expensepage';

function App() {
  const [isSignup, setIsSignup] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (isAuthenticated) {
    return <Expensepage />;
  }

  return (
    <div>
      {isSignup ? (
        <Signup onSwitch={() => setIsSignup(false)} onLogin={() => setIsAuthenticated(true)} />
      ) : (
        <Login onSwitch={() => setIsSignup(true)} onLogin={() => setIsAuthenticated(true)} />
      )}
    </div>
  );
}

export default App;
