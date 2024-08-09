import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex justify-between bg-blue-400 h-20 items-center px-6">
      <h1 className="text-white text-2xl font-bold">
        Track Your Daily Expenses......
      </h1>
      <Link
        to="/expense-chart"
        className="text-white  text-xl font-bold hover:text-white "
      >
        View Expense Chart
      </Link>
    </div>
  );
};

export default Header;
