import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';

const ExpensePieChart = ({ email }) => {
  const [categoryData, setCategoryData] = useState({ categories: [], percentages: [] });

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:8000/api/v1/exp", { headers: { email } });
      const expenses = response.data.exp;

      // Calculate the total expenses per category
      const categoryTotals = expenses.reduce((acc, expense) => {
        acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
        return acc;
      }, {});
      console.log(categoryData)
      // Calculate the percentage of each category
      const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);
      const categories = Object.keys(categoryTotals);
      const percentages = categories.map(category => (categoryTotals[category] / totalAmount) * 100);

      setCategoryData({ categories, percentages });
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
    <div className="w-full flex items-center justify-center">
      <Chart options={pieOptions} series={pieSeries} type="pie" width="80%" height="80%" />
    </div>
  );
};

export default ExpensePieChart;
