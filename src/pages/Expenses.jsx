import React, { useState, useEffect } from "react";

import { useExpenses } from "../Components/Expenses/useExpenses";

import { RiAlarmWarningLine } from "react-icons/ri";

import { db } from "../firebase/config";
import { useFirestore } from "../hooks/useFirestore";

//date picker component from mui
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";

///
import ExpenseForm from "../Components/Expenses/ExpenseForm";
import ShowExpensesData from "../Components/Expenses/ShowExpensesData";

import { useTotalMeal } from "../Components/statementComponents/useTotalMeal";
import { useTotalExpense } from "../Components/statementComponents/useTotalExpense";

const Expenses = () => {
  const { addDocument } = useFirestore();
  const [date, setDate] = useState(new Date());
  const { mealAmount } = useTotalMeal(date);
  console.log("number of meal from parent component: ", mealAmount);

  const { expense } = useTotalExpense(date);
  console.log(expense);
  const initialState = { amount: 0, item: "" };
  const { data } = useExpenses(date);

  const [expenseDataToWrite, setExpenseDateToWrite] = useState(null);

  const handleSubmit = (inputs) => {
    db.collection("expenses")
      .doc(`${date.getFullYear()}`)
      .collection(`${monthNames[date.getMonth()]}`)
      .doc(`${date.getDate()}`)
      .set({ ...inputs, createdAt: date });
  };
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [perMealCostAddedMessage, setPerMealCostAddedMessage] = useState(null);

  const writePerMealCost = () => {
    let perMealCost = mealAmount / expense;
    const doc = {
      totalMeal: mealAmount,
      totalExpense: expense,
      perMealCost: perMealCost,
    };
    const ref = db
      .collection(`${date.getFullYear()}`)
      .doc(`${monthNames[date.getMonth()]}`);
    addDocument(ref, doc);
    setPerMealCostAddedMessage("Per meal cost updated successfully.");
  };

  return (
    <>
      <div className="mx-4 gap-4 py-4 lg:mx-32">
        <div className="md:grid gap-8 md:grid-cols-2">
          <div>
            <div className="mt-4 md:mt-8 flex flex-col gap-4 bg-white p-4 rounded shadow  text-sm md:max-w-full">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <StaticDatePicker
                  displayStaticWrapperAs="desktop"
                  openTo="day"
                  value={date}
                  onChange={(newValue) => {
                    setDate(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
            <div className="mt-4 md:mt-8 flex flex-col gap-4 bg-white p-4 rounded shadow  text-sm md:max-w-full">
              <ShowExpensesData data={data} date={date} />
            </div>
            <div className="mt-4 md:mt-8 flex flex-col gap-4 bg-white p-4 rounded shadow  text-sm md:max-w-full">
              <h3 className="text-xl text-center">Update per meal cost</h3>
              <button
                className="flex flex-row items-center justify-center bg-red-600 text-white py-4  rounded shadow"
                onClick={writePerMealCost}
              >
                <RiAlarmWarningLine /> <p className="pl-2">Updates</p>
              </button>
              <p className="text-red-500 text-center">
                Warning: This function causes huge database load. So it is
                advised to use it carefully
              </p>
              <p className="text-lg text-blue-600 text-center">
                {perMealCostAddedMessage}
              </p>
            </div>
          </div>

          <div className="mt-4 md:mt-8 h-fit flex flex-col gap-4 bg-white p-4 rounded shadow  text-sm md:max-w-full">
            <ExpenseForm
              handleSubmit={handleSubmit}
              initialState={initialState}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Expenses;
