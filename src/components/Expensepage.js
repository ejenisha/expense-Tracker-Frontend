import React, { useState, useEffect } from "react";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import Modal from "./Modal";
import ExpenseList from "./ExpenseList";
import axios from "axios";
import Header from "./Header";

const ExpensePage = ({ email }) => {
  const [isOpen, setOpen] = useState(false);
  const [expenseList, setExpenseList] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);

  // Function to fetch expenses from the server
  const fetchExpenses = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/exp", { headers: { email } });
      setExpenseList(response.data.exp);
    } catch (error) {
      console.error("Error fetching data:", error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [email]);

  const handleSave = async (newExpense) => {
    try {
      await axios.post("http://localhost:8000/api/v1/exp", newExpense, { headers: { email } });
      // Refetch expenses to get the updated list
      fetchExpenses();
      setOpen(false);
    } catch (error) {
      console.error("Error adding expense:", error.message);
    }
  };

  const handleUpdate = async (id, updatedExpense) => {
    try {
      await axios.patch(`http://localhost:8000/api/v1/exp/${id}`, updatedExpense, { headers: { email } });
      // Refetch expenses to get the updated list
      fetchExpenses();
      setEditingExpense(null);
    } catch (error) {
      console.error("Error updating expense:", error.message);
    }
  };

  return (
    <div>
      <Header/>
      <div className="flex items-center justify-center min-h-screen bg-amber-200 p-4">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl h-auto mx-auto">
          <div className="grid grid-cols-2 gap-8">
            <div className="mb-4">
              <label className="block text-orange-800 text-xl font-bold mb-2" htmlFor="income">
                Income
              </label>
              <input
                id="income"
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <p className="text-right text-xs text-orange-800">Add Income</p>
            </div>
            <div className="mb-4">
              <label className="block text-orange-800 text-xl font-bold mb-2" htmlFor="balance">
                Balance
              </label>
              <input
                id="balance"
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex space-x-10">
              <h1 className="text-left text-xl text-orange-800 font-bold">Expenses</h1>
              <AddCircleOutlineOutlinedIcon onClick={() => setOpen(true)} />
            </div>
          </div>
          {isOpen && <Modal setOpen={setOpen} onSave={handleSave} />}
          <ExpenseList 
            expenseList={expenseList} 
            fetchExpenses={fetchExpenses} 
            setEditingExpense={setEditingExpense} 
            email={email}
          />
          {editingExpense && (
            <Modal
              setOpen={setOpen}
              onSave={(updatedExpense) => handleUpdate(editingExpense._id, updatedExpense)}
              expense={editingExpense}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpensePage;
