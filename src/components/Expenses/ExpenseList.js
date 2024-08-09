import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import "./ExpenseList.css";
import axios from "axios";

const ExpenseList = ({ expenseList, fetchExpenses, setEditingExpense, email,bal,setBal }) => {

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const handleDelete = async (id) => {
    try {
      const expenseToDelete = expenseList.find(exp => exp._id === id);
      if (expenseToDelete) {
        await axios.delete(`http://localhost:8000/api/v1/exp/${id}`, { headers: { email } });
        await fetchExpenses();
  
        const deletedAmount = expenseToDelete.amount;
        setBal(prevBal => {
          const updatedBalance = prevBal + deletedAmount; // Add the deleted amount back to the balance
         
          axios.patch("http://localhost:8000/api/v1/user/updateBal", { balance: updatedBalance }, { headers: { email } });
          return updatedBalance;
        });
        await fetchExpenses();
      }
    } catch (error) {
      console.error("Error deleting expense:", error.message);
    }
  };

  const total = expenseList.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div>
      {Array.isArray(expenseList) && expenseList.length > 0 ? (
        expenseList.map((item, index) => {
          return (
            <div
            key={index}
            className="bg-white text-indigo-700 text-xl rounded cardheight grid grid-cols-6 gap-4 items-center mb-4"
          >
            <div className="flex justify-center">{item.categories}</div>
            <div className="flex justify-center">{formatDate(item.date)}</div>
            <div className="flex justify-center">{item.description}</div>
            <div className="flex justify-center">{item.amount}</div>
            <div className="flex justify-center">
              <EditIcon 
                className="cursor-pointer" 
                onClick={() => setEditingExpense(item)} 
              />
            </div>
            <div className="flex justify-center">
              <CloseIcon 
                className="cursor-pointer" 
                onClick={() => handleDelete(item._id)} 
              />
            </div>
          </div>
          
          
          );
        })
      ) : (
        <p className="text-white">No expenses available</p>
      )}
      <div className="flex justify-between">
      <h2 className="text-right mr-20 text-white text-xl font-bold">Total Amount: {total+bal}</h2>
      <h2 className="text-right mr-20 text-white text-xl font-bold">Amount Spent: {total}</h2>
      </div>
    </div>
  );
};

export default ExpenseList;
