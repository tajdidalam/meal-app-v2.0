import React from "react";

const OrderGuestMeal = ({ mealName, amount, inc, dec }) => {
  return (
    <div className="flex flex-row justify-between items-center p-2">
      <p>{mealName}</p>
      <div className="flex flex-row gap-1">
        <button
          className="w-8 h-8 bg-blue-600 rounded text-white"
          onClick={dec}
        >
          -
        </button>
        <div className="border rounded border-blue-300 w-8 h-8  text-center">
          <p className="self-center align-middle text-center mt-1">{amount}</p>
        </div>
        <button
          className="w-8 h-8 bg-blue-600 rounded text-white"
          onClick={inc}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default OrderGuestMeal;
