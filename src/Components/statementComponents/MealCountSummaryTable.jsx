import React from "react";

const MealCountSummaryTable = ({ orderHistory }) => {
  const temp = [...orderHistory];
  console.log("temp: ", temp);

  const monthSummary = {
    breakfast: 0,
    lunch: 0,
    snacks: 0,
    dinner: 0,
    total: 0,
    breakfastAfterFactor: 0,
    lunchAfterFactor: 0,
    snacksAfterFactor: 0,
    dinnerAfterFactor: 0,
    totalMealAfterFactor: 0,
  };
  temp.map((i) => {
    monthSummary.breakfast += i.breakfast;
    monthSummary.lunch += i.lunch;
    monthSummary.snacks += i.snacks;
    monthSummary.dinner += i.dinner;
    if (i.breakfastFactor) {
      monthSummary.breakfastAfterFactor += i.breakfast * i.breakfastFactor;
    } else {
      monthSummary.breakfastAfterFactor += i.breakfast * 0.5;
    }
    if (i.lunchFactor) {
      monthSummary.lunchAfterFactor += i.lunch * i.lunchFactor;
    } else {
      monthSummary.lunchAfterFactor += i.lunch * 1;
    }
    if (i.snacksFactor) {
      monthSummary.snacksAfterFactor += i.snacks * i.snacksFactor;
    } else {
      monthSummary.snacksAfterFactor += i.snacks * 0.5;
    }
    if (i.dinnerFactor) {
      monthSummary.dinnerAfterFactor += i.dinner * i.dinnerFactor;
    } else {
      monthSummary.dinnerAfterFactor += i.dinner * 1;
    }
  });
  monthSummary.total =
    monthSummary.breakfast +
    monthSummary.lunch +
    monthSummary.snacks +
    monthSummary.dinner;

  monthSummary.totalMealAfterFactor =
    monthSummary.breakfastAfterFactor +
    monthSummary.lunchAfterFactor +
    monthSummary.snacksAfterFactor +
    monthSummary.dinnerAfterFactor;
  console.log(monthSummary.breakfast);

  const calendarMonths = [
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
  return (
    <>
      <div className="bg-white rounded shadow mx-auto p-4 max-w-xs flex flex-col gap-2 text-gray-600">
        <div className="flex flex-row justify-between ">
          <p>Item</p>
          <p>Total</p>
        </div>
        <hr className="text-blue-600" />
        <div className="flex flex-row justify-between">
          <p>Breakfast</p>
          <p>{monthSummary.breakfast}</p>
        </div>
        <div className="flex flex-row justify-between">
          <p>Lunch</p>
          <p>{monthSummary.lunch}</p>
        </div>
        <div className="flex flex-row justify-between">
          <p>Snacks</p>
          <p>{monthSummary.snacks}</p>
        </div>
        <div className="flex flex-row justify-between">
          <p>Dinner</p>
          <p>{monthSummary.dinner}</p>
        </div>
        <hr />
        <div className="flex flex-row justify-between">
          <p>Total Quantity</p>
          <p>{monthSummary.total}</p>
        </div>
        <div className="flex flex-row justify-between">
          <p>Total Meal After Factor</p>
          <p>{monthSummary.totalMealAfterFactor}</p>
        </div>
        <div className="flex flex-row justify-between">
          <p className="pl-4">
            <span className="pr-4">x</span> per meal cost
          </p>
          <p>
            <span className="pr-2">&#2547;</span>
            {monthSummary.total}
          </p>
        </div>
        <hr />
        <div className="flex flex-row justify-between">
          <p>Total Meal Cost</p>
          <p>
            <span className="pr-2">&#2547;</span>
            {monthSummary.total}
          </p>
        </div>
      </div>
      {/* ///////////////// */}
      <h2 className="max-w-xs mx-auto text-center pt-6 pb-2 text-xl text-blue-600 font-bold">
        Balance
      </h2>
      <div className="max-w-xs bg-white rounded shadow mx-auto p-4 flex flex-col gap-2 text-gray-600">
        <div className="flex flex-row justify-between ">
          <p>
            Deposite of{" "}
            {temp[0] &&
              calendarMonths[new Date(temp[0].orderDate).getMonth() + 1]}
          </p>
          <p>
            <span className="pr-2">&#2547;</span>
            {monthSummary.total}
          </p>
        </div>
        <div className="flex flex-row justify-between ">
          <p>Previous Balance</p>
          <p>
            <span className="pr-2">&#2547;</span>
            {monthSummary.total}
          </p>
        </div>
        <div className="flex flex-row justify-between ">
          <p className="pl-2">
            <span className="pr-4">-</span> Total Meal Cost
          </p>
          <p>
            <span className="pr-2">&#2547;</span>
            {monthSummary.total}
          </p>
        </div>
        <hr />
        <div className="flex flex-row justify-between ">
          <p className="pl-2">Total Balance</p>
          <p>
            <span className="pr-2">&#2547;</span>
            {monthSummary.total}
          </p>
        </div>
      </div>
    </>
  );
};

export default MealCountSummaryTable;
