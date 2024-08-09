import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';

const ExpenseBarChart = ({ email }) => {
  const [expenseData, setExpenseData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/exp", { headers: { email } });
        const expenses = response.data.exp;

        // Ensure we have valid dates
        const validExpenses = expenses.map(exp => ({
          ...exp,
          date: exp.date ? new Date(exp.date).toLocaleDateString() : 'Unknown Date'
        }));

        setExpenseData(validExpenses);
      } catch (error) {
        console.error('Error fetching expense data:', error);
      }
    };
    fetchData();
  }, [email]);

  const barSeries = [
    {
      name: "Expense Amount",
      data: expenseData.map(exp => exp.amount),
    }
  ];

  const barOptions = {
    chart: {
      id: "expense-bar-chart",
    },
    xaxis: {
      categories: expenseData.map(exp => exp.date),
    },
    legend: {
      position: 'bottom'
    },
  };

  return (
    <div className="w-full flex flex-col justify-center">
      <h1 className='text-center text-indigo-700 font-bold'>Expenses Made in the Day</h1>
      <Chart options={barOptions} series={barSeries} type="bar" width="90%" height="500" />
    </div>
  );
};

export default ExpenseBarChart;
