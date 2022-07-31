import React, { useState } from "react";
import OrderMeal from "./OrderMeal";
import { useOrderMeal } from "../hooks/useOrderMeal";
import OrderDate from "./OrderDate";

const OrderMealForm = ({ initialState }) => {
  const {
    OrderBreakfast,
    OrderLunch,
    OrderSnacks,
    OrderDinner,
    handleSubmit,
    setDate,
    orderDate,
  } = useOrderMeal();

  return (
    <>
      <div className="max-w-xs mx-auto">
        <h1 className="text-gray-600 text-lg my-4">Order Meal</h1>
      </div>
      <div className="max-w-xs mx-auto bg-white rounded drop-shadow p-4">
        <p className="text-gray-600 text-sm pb-4">
          You are ordering for <br />
          {new Intl.DateTimeFormat("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }).format(orderDate)}
        </p>
        <div className="flex flex-row gap-4 py-4 ">
          <OrderDate setDate={setDate} />
        </div>
      </div>
      <div className="max-w-xs mx-auto bg-white mt-4">
        <div className="bg-white rounded drop-shadow">
          <div className="p-4">
            <OrderMeal mealName="Breakfast" handleMeal={OrderBreakfast} />
            <OrderMeal mealName="Lunch" handleMeal={OrderLunch} />
            <OrderMeal mealName="Snacks" handleMeal={OrderSnacks} />
            <OrderMeal mealName="Dinner" handleMeal={OrderDinner} />
            <div className="flex flex-row mt-4">
              <button
                className="bg-blue-600 py-4 text-white w-full rounded hover:bg-blue-900"
                onClick={handleSubmit}
              >
                SUBMIT
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderMealForm;
