import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Signup from './components/LoginSignup/Signup';
import Login from './components/LoginSignup/Login';
import Expensepage from './components/Expenses/Expensepage';
import ExpenseChartPage from './components/Charts/ExpenseChartPage';

function App() {
  const [isSignup, setIsSignup] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState(''); // State to store the user's email

  const handleLogin = (userEmail) => {
    setEmail(userEmail);
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <Routes>
        {isAuthenticated ? (
          <>
            <Route path="/expenses" element={<Expensepage email={email} />} />
            <Route path="/expense-chart" element={<ExpenseChartPage email={email} />} />
            <Route path="*" element={<Navigate to="/expenses" />} />
          </>
        ) : (
          <Route
            path="*"
            element={
              isSignup ? (
                <Signup
                  onSwitch={() => setIsSignup(false)}
                  onLogin={handleLogin} // Pass handleLogin to update email
                />
              ) : (
                <Login
                  onSwitch={() => setIsSignup(true)}
                  onLogin={handleLogin} // Pass handleLogin to update email
                />
              )
            }
          />
        )}
      </Routes>
    </Router>
  );
}

export default App;
