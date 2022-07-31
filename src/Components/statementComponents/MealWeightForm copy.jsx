import React, { useState, useEffect } from "react";

import { db } from "../../firebase/config";

//date picker component from mui
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";

///

import { useMealFactorUpdate } from "../../hooks/useMealFactorUpdate";

const MealWeightForm = () => {
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
  const { updateData, state } = useMealFactorUpdate();
  const [value, setValue] = useState(new Date());
  const [breakfastFactor, setBreakfastFactor] = useState(0.5);
  const [lunchFactor, setLunchFactor] = useState(1);
  const [snacksFactor, setSnacksFactor] = useState(0.5);
  const [dinnerFactor, setDinnerFactor] = useState(1);
  const [breakfastMenu, setBreakfastMenu] = useState("");
  const [lunchMenu, setLunchMenu] = useState("");
  const [snacksMenu, setSnacksMenu] = useState("");
  const [dinnerMenu, setDinnerMenu] = useState("");
  const docName = `${value.getFullYear()}-${
    value.getMonth() + 1
  }-${value.getDate()}`;
  const mealFactorData = {
    date: value,
    breakfastFactor: parseFloat(breakfastFactor),
    lunchFactor: parseFloat(lunchFactor),
    snacksFactor: parseFloat(snacksFactor),
    dinnerFactor: parseFloat(dinnerFactor),
    breakfastMenu,
    lunchMenu,
    snacksMenu,
    dinnerMenu,
  };
  console.log(docName);
  // const docRef = db.collection("factor").doc(docName);
  const docRef = db
    .collection("factor")
    .doc(`${value.getFullYear()}`)
    .collection(`${monthNames[value.getMonth()]}`)
    .doc(`${value.getDate()}`);
  //   console.log(mealFactorData);

  const handleSubmit = (e) => {
    e.preventDefault();
    // const returnRef = docRef.set(mealFactorData);
    updateData(docRef, mealFactorData);
  };

  let date = "";
  if (state.document) {
    date = new Date(state.document.date.toDate()).toDateString();
    console.log(date);
  }

  return (
    <>
      <div className="mx-4 gap-4 py-4 lg:mx-32">
        <div className="md:grid gap-8 md:grid-cols-2">
          <div className="mt-4 md:mt-8 flex flex-col gap-4 bg-white p-4 rounded shadow  text-sm md:max-w-full">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <StaticDatePicker
                displayStaticWrapperAs="desktop"
                openTo="year"
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
          <div className="mt-4 md:mt-8 flex flex-col gap-4 bg-white p-4 rounded shadow  text-sm md:max-w-full">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <label className="flex flex-col" htmlFor="breakfast">
                <p>Breakfast</p>
                <div className="grid grid-cols-5 gap-4">
                  <input
                    type="text"
                    id="breakfast"
                    name="breakfast"
                    value={breakfastFactor}
                    onChange={(e) => setBreakfastFactor(e.target.value)}
                    className="py-4 pl-2 border border-blue-600 rounded hover:border-blue-900 focus:border-blue-600"
                  />
                  <input
                    type="text"
                    id="breakfast"
                    name="breakfastMenu"
                    placeholder="menu"
                    onChange={(e) => setBreakfastMenu(e.target.value)}
                    className="py-4 col-span-4 pl-2 border border-blue-600 rounded hover:border-blue-900 focus:border-blue-600"
                  />
                </div>
              </label>
              <label className="flex flex-col" htmlFor="breakfast">
                <p>Lunch</p>
                <div className="grid grid-cols-5 gap-4">
                  <input
                    type="text"
                    id="lunch"
                    name="lunch"
                    value={lunchFactor}
                    onChange={(e) => setLunchFactor(e.target.value)}
                    className="py-4 pl-2 border border-blue-600 rounded hover:border-blue-900 focus:border-blue-600"
                  />
                  <input
                    type="text"
                    id="lunch"
                    name="lunchMenu"
                    placeholder="menu"
                    onChange={(e) => setLunchMenu(e.target.value)}
                    className="py-4 col-span-4 pl-2 border border-blue-600 rounded hover:border-blue-900 focus:border-blue-600"
                  />
                </div>
              </label>
              <label className="flex flex-col" htmlFor="snacks">
                <p>Snacks</p>
                <div className="grid grid-cols-5 gap-4">
                  <input
                    type="text"
                    id="snacks"
                    name="snacks"
                    value={snacksFactor}
                    onChange={(e) => setSnacksFactor(e.target.value)}
                    className="py-4 pl-2 border border-blue-600 rounded hover:border-blue-900 focus:border-blue-600"
                  />
                  <input
                    type="text"
                    id="snacks"
                    name="snacksMenu"
                    placeholder="menu"
                    onChange={(e) => setSnacksMenu(e.target.value)}
                    className="py-4 col-span-4 pl-2 border border-blue-600 rounded hover:border-blue-900 focus:border-blue-600"
                  />
                </div>
              </label>
              <label className="flex flex-col" htmlFor="dinner">
                <p>Dinner</p>
                <div className="grid grid-cols-5 gap-4">
                  <input
                    type="text"
                    id="dinner"
                    name="dinner"
                    value={dinnerFactor}
                    onChange={(e) => setDinnerFactor(e.target.value)}
                    className="py-4 pl-2 border border-blue-600 rounded hover:border-blue-900 focus:border-blue-600"
                  />
                  <input
                    type="text"
                    id="dinner"
                    name="dinnerMenu"
                    placeholder="menu"
                    onChange={(e) => setDinnerMenu(e.target.value)}
                    className="py-4 col-span-4 pl-2 border border-blue-600 rounded hover:border-blue-900 focus:border-blue-600"
                  />
                </div>
              </label>

              <button className="bg-blue-600 text-white rounded py-4 hover:bg-blue-900">
                Submit
              </button>
            </form>
          </div>
        </div>
        {/* ///// */}

        <div className="md:grid gap-8 md:grid-cols-2">
          <div className="mt-4 md:mt-8 flex flex-col gap-4 bg-white p-4 rounded shadow  text-sm md:max-w-full">
            <h3 className="text-center text-xl">Updated Meal Factor</h3>
            <hr />

            <div className="flex flex-row justify-between px-4">
              <p>Date</p>
              <p>
                {state.document && state.document.date.toDate().toDateString()}
              </p>
            </div>
            <hr />
            <div className="flex flex-row justify-between px-4">
              <p>Breakfast</p>
              <p>{state.document && state.document.breakfastFactor}</p>
            </div>
            <hr />
            <div className="flex flex-row justify-between px-4">
              <p>Lunch</p>
              <p>{state.document && state.document.lunchFactor}</p>
            </div>
            <hr />
            <div className="flex flex-row justify-between px-4">
              <p>Snacks</p>
              <p>{state.document && state.document.snacksFactor}</p>
            </div>
            <hr />
            <div className="flex flex-row justify-between px-4">
              <p>Dinner</p>
              <p>{state.document && state.document.dinnerFactor}</p>
            </div>
          </div>
          <div></div>
        </div>
      </div>
      {/* <div className="max-w-full md:max-w-sm mx-4 lg:mx-32 my-4 md:mt-8 flex flex-col gap-4 bg-white p-4 rounded shadow  text-sm ">
        <h3 className="text-center text-xl">Updated Meal Factor</h3>
        <hr />

        <div className="flex flex-row justify-between px-4">
          <p>Date</p>
          <p>{state.document && state.document.date.toDate().toDateString()}</p>
        </div>
        <hr />
        <div className="flex flex-row justify-between px-4">
          <p>Breakfast</p>
          <p>{state.document && state.document.breakfastFactor}</p>
        </div>
        <hr />
        <div className="flex flex-row justify-between px-4">
          <p>Lunch</p>
          <p>{state.document && state.document.lunchFactor}</p>
        </div>
        <hr />
        <div className="flex flex-row justify-between px-4">
          <p>Snacks</p>
          <p>{state.document && state.document.snacksFactor}</p>
        </div>
        <hr />
        <div className="flex flex-row justify-between px-4">
          <p>Dinner</p>
          <p>{state.document && state.document.dinnerFactor}</p>
        </div>
      </div> */}
    </>
  );
};

export default MealWeightForm;
