import React, { useState, useEffect } from "react";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import Modal from "./Modal";
import ExpenseList from "./ExpenseList";
import axios from "axios";
import Header from "./Header";

const Expensepage = ({ email }) => {
  const [isOpen, setOpen] = useState(false);
  const [expenseList, setExpenseList] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [bal, setBal] = useState(0); // Initialize balance to 0
  const [income, setIncome] = useState("0"); 
  const [msg, setMsg] = useState(""); // Initialize message state

  // Function to fetch expenses and balance from the server
  const fetchExpenses = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/exp", { headers: { email } });
      setExpenseList(response.data.exp);

      const userBal = await axios.get("http://localhost:8000/api/v1/user/getbal", { headers: { email } });
      setBal(userBal.data.balance || 0); // Ensure balance is set correctly
    } catch (error) {
      console.error("Error fetching data:", error.response ? error.response.data : error.message);
    }
  };
  useEffect(() => {
    console.log("Balance updated to:", bal);
  }, [bal]);
  
  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleIncomeChange = (e) => {
    setIncome(e.target.value);
  };
//Adds the income to the balance amount
  const updateBalance = async () => {
    try {
      const incomeAmount = Number(income);
      if (!isNaN(incomeAmount)) {
        const newBalance = bal + incomeAmount;
        setBal(newBalance);

        // Update the balance in the backend
        await axios.patch("http://localhost:8000/api/v1/user/updateBal", { balance: newBalance }, { headers: { email } });

        // Reset income
        setIncome("0");
      }
    } catch (error) {
      console.error("Error updating balance:", error.message);
    }
  };

  const handleExpenseUpdate = async () => {
    try {
      // Fetch expenses to get the latest list
      const response = await axios.get("http://localhost:8000/api/v1/exp", { headers: { email } });
      const updatedExpenses = response.data.exp;

      if (updatedExpenses.length > 0) {
        const lastExpense = updatedExpenses[updatedExpenses.length - 1];
        const newBalance = bal - lastExpense.amount;

        if (newBalance < 0) {
          setMsg("Insufficient balance");
          setBal(0);
        } else {
          setBal(newBalance);
        }

        // Update the balance in the backend
        await axios.patch("http://localhost:8000/api/v1/user/updateBal", { balance: newBalance }, { headers: { email } });
      }
    } catch (error) {
      console.error("Error updating balance:", error.message);
    }
  };

  const handleSave = async (newExpense) => {
    try {
      await axios.post("http://localhost:8000/api/v1/exp", newExpense, { headers: { email } });
      await fetchExpenses(); // Fetch updated expense list
      await handleExpenseUpdate(); // Update balance based on updated expense list
      setOpen(false);
    } catch (error) {
      console.error("Error adding expense:", error.message);
    }
  };

  const handleUpdate = async (id, updatedExpense) => {
    try {
      // Get the current expenses and calculate the previous total
      const currentExpenses = [...expenseList];
      const prevExpense = currentExpenses.find(exp => exp._id === id);
      const prevAmount = prevExpense ? prevExpense.amount : 0;

      // Update the expense
      await axios.patch(`http://localhost:8000/api/v1/exp/${id}`, updatedExpense, { headers: { email } });

      // Fetch updated expenses
      await fetchExpenses(); 

      // Calculate new balance
      const total = expenseList.reduce((sum, item) => sum + item.amount, 0);
      const newBalance = bal + prevAmount - updatedExpense.amount;

      if (newBalance < 0) {
        setMsg("Insufficient balance");
        setBal(0);
      } else {
        setBal(newBalance);
      }

      // Update the balance in the backend
      await axios.patch("http://localhost:8000/api/v1/user/updateBal", { balance: newBalance }, { headers: { email } });
      setEditingExpense(null);
    } catch (error) {
      console.error("Error updating expense:", error.message);
    }
  };
  const handleAddExpenseClick = () => {
    if (bal > 0) {
      setMsg(""); 
      setOpen(true);
    } else {
      setMsg("Insufficient balance. You can't add an expense.");
    }
  };
  return (
    <div>
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-white p-4">
        <div className="bg-blue-400 shadow-lg rounded-lg p-8 w-full max-w-4xl h-auto mx-auto">
          <div className="grid grid-cols-2 gap-8">
            <div className="mb-4">
              <label className="block text-white text-xl font-bold mb-2" htmlFor="income">
                Income
              </label>
              <input
                id="income"
                type="number"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-indigo-700 leading-tight focus:outline-none focus:shadow-outline"
                value={income}
                onChange={handleIncomeChange}
              />
              <button
                onClick={updateBalance}
                className="mt-2 px-4 py-2 font-bold text-indigo-700 bg-white rounded-lg hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:bg-indigo-100"
              >
                Add Income
              </button>
            </div>
            <div className="mb-4">
              <label className="block text-white text-xl font-bold mb-2" htmlFor="balance">
                Balance
              </label>
              <input
                id="balance"
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-indigo-700 leading-tight focus:outline-none focus:shadow-outline"
                value={bal}
                readOnly
              />
            </div>
            <div className="flex space-x-10">
              <h1 className="text-left text-xl text-white font-bold">Expenses</h1>
              <AddCircleOutlineOutlinedIcon onClick={handleAddExpenseClick} />
            </div>
          </div>
          {msg && <p className="text-red-500">{msg}</p>}
          {isOpen && <Modal setOpen={setOpen} onSave={handleSave} />}
          <ExpenseList 
            expenseList={expenseList} 
            fetchExpenses={fetchExpenses} 
            setEditingExpense={setEditingExpense} 
            email={email}
            bal={bal}
            setBal={setBal}
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

export default Expensepage;
