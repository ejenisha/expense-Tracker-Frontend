import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex justify-between bg-orange-800 h-20 items-center px-6">
      <h1 className="text-amber-200 text-2xl font-bold">
        Track Your Daily Expenses......
      </h1>
      <Link
        to="/expense-chart"
        className="text-amber-200 text-xl font-bold hover:text-amber-400"
      >
        View Expense Chart
      </Link>
    </div>
  );
};

export default Header;
