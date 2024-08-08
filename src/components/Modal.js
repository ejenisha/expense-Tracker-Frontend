import React, { useState, useEffect } from "react";
import Dropdown from "react-dropdown";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Modal = ({ setOpen, onSave, expense }) => {
  const [selectedDate, setSelectedDate] = useState(expense?.date || null);
  const [description, setDescription] = useState(expense?.description || "");
  const [selectedCategory, setSelectedCategory] = useState(expense?.categories || "");
  const [amount, setAmount] = useState(expense?.amount || "");
  const options = ["Food", "Hospital", "Home", "Others"];

  useEffect(() => {
    if (expense) {
      setSelectedDate(new Date(expense.date));
      setDescription(expense.description);
      setSelectedCategory(expense.categories);
      setAmount(expense.amount);
    }
  }, [expense]);

  const handleSelect = (selectedOption) => {
    setSelectedCategory(selectedOption.value);
  };

  const postExp = async () => {
    const newExpense = {
      categories: selectedCategory,
      date: selectedDate,
      description: description,
      amount: parseFloat(amount),
    };

    try {
      await onSave(newExpense); // Call onSave with the new expense data
      setOpen(false); // Close the modal after saving
    } catch (error) {
      console.error("Error adding expense:", error.message);
    }
  };

  return (
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-gray-50 px-4 py-3 h-96">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <label className="block text-orange-800 text-sm font-bold mb-2">Categories</label>
                  <Dropdown
                    options={options}
                    onChange={handleSelect}
                    value={selectedCategory}
                    placeholder="Select an option"
                    className="block w-full px-3 py-2 bg-white text-gray-700 placeholder-gray-400 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-orange-800 text-sm font-bold mb-2">Date</label>
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    className="block w-full px-3 py-2 text-gray-700 placeholder-gray-400 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholderText="Select a date"
                  />
                </div>
                <div>
                  <label className="block text-orange-800 text-sm font-bold mb-2">Description</label>
                  <textarea
                    rows="4"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="block w-full rounded-lg border border-gray-300 focus:outline-none focus:border-gray-300 px-2"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-orange-800 text-sm font-bold mb-2">Amount</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="block w-full rounded-lg border border-gray-300 focus:outline-none focus:border-gray-300 px-2 h-10"
                  />
                </div>
              </div>
              <div className="flex justify-center items-center mt-10">
                <button className="h-10 border font-bold text-xl  border-gray-300 w-20 rounded bg-amber-200 text-orange-800" onClick={postExp}>Save</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
