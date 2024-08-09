import React from 'react';
import ExpenseBarChart from './ExpenseBarChart';
import ExpensePieChart from './ExpensePieChart';

const ExpenseChartPage = ({ email }) => {
  return (
    <div className="flex h-screen">
      <div className="w-1/2">
        <ExpensePieChart email={email} />
      </div>
      <div className="w-1/2">
        <ExpenseBarChart email={email} />
      </div>
    </div>
  );
};

export default ExpenseChartPage;
