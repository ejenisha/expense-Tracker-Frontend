import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';

const ExpensePieChart = ({ email }) => {
  const [categoryData, setCategoryData] = useState({ categories: [], percentages: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/exp", { headers: { email } });
        const expenses = response.data.exp;

        // Calculate the total expenses per category
        const categoryTotals = expenses.reduce((acc, expense) => {
          acc[expense.categories] = (acc[expense.categories] || 0) + expense.amount;
          return acc;
        }, {});

        // Calculate the percentage of each category
        const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);
        const categories = Object.keys(categoryTotals);
        const percentages = categories.map(category => (categoryTotals[category] / totalAmount) * 100);

        setCategoryData({ categories, percentages });
      } catch (error) {
        console.error('Error fetching expense data:', error);
      }
    };
    fetchData();
  }, [email]);

  const pieSeries = categoryData.percentages;
  const pieOptions = {
    labels: categoryData.categories,
    chart: {
      type: 'pie',
    },
    legend: {
      position: 'bottom'
    },
    colors: ['#FF4560', '#00E396', '#FEB019', '#775DD0', '#0090FF'], // Add more colors as needed
  };

  return (
    <div className="w-full flex flex-col justify-center">
      <h1 className='text-center text-indigo-700 font-bold'>Percentage of Expense for Each category</h1>
      <Chart options={pieOptions} series={pieSeries} type="pie" width="90%" height="500" />
    </div>
  );
};

export default ExpensePieChart;
