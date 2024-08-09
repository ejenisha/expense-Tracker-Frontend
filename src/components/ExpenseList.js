import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import "./ExpenseList.css";
import axios from "axios";

const ExpenseList = ({ expenseList, fetchExpenses, setEditingExpense, email,bal }) => {

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8000/api/v1/exp/${id}`, { headers: { email } });
    fetchExpenses();
    // Update balance after deleting an expense
  };

  const total = expenseList.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div>
      {Array.isArray(expenseList) && expenseList.length > 0 ? (
        expenseList.map((item, index) => {
          return (
            <div
              key={index}
              className="bg-amber-200 text-orange-800 text-xl rounded cardheight grid grid-cols-6 gap-3 justify-center items-center mb-4"
            >
              <div>{item.categories}</div>
              <div>{formatDate(item.date)}</div>
              <div>{item.description}</div>
              <div>{item.amount}</div>
              <div>
                <EditIcon 
                  className="cursor-pointer" 
                  onClick={() => setEditingExpense(item)} 
                />
              </div>
              <div>
                <CloseIcon 
                  className="cursor-pointer" 
                  onClick={() => handleDelete(item._id)} 
                />
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-orange-800">No expenses available</p>
      )}
      <div className="flex justify-between">
      <h2 className="text-right mr-20 text-orange-800 text-xl font-bold">Total Amount: {total+bal}</h2>
      <h2 className="text-right mr-20 text-orange-800 text-xl font-bold">Amount Spent: {total}</h2>
      </div>
    </div>
  );
};

export default ExpenseList;
