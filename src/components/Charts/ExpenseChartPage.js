import React from 'react';
import ExpenseBarChart from './ExpenseBarChart';
import ExpensePieChart from './ExpensePieChart';

const ExpenseChartPage = ({ email }) => {
  return (
    <div>
      <h1 className='text-center font-bold text-indigo-700'>Expenses of {email}</h1>
    <div className="flex flex-col items-center justify-center h-screen p-4">
     
      <div className="flex flex-wrap justify-center w-full max-w-6xl">
        <div className="w-full md:w-1/2 p-4 flex justify-center">
          <ExpensePieChart email={email} />
        </div>
        <div className="w-full md:w-1/2 p-4 flex justify-center">
          <ExpenseBarChart email={email} />
        </div>
      </div>
    </div>
    </div>
  );
};

export default ExpenseChartPage;
