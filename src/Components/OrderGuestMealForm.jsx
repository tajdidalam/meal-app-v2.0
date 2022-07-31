import React, { useState } from "react";
import OrderGuestMeal from "./OrderGuestMeal";
import { useOrderGuestMeal } from "../hooks/useOrderGuestMeal";
import OrderDate from "./OrderDate";

const OrderGuestMealForm = () => {
  const {
    guestBreakfast,
    guestLunch,
    guestDinner,
    guestSnacks,
    OrderGuestBreakfastI,
    OrderGuestBreakfastD,
    OrderGuestLunchI,
    OrderGuestLunchD,
    OrderGuestSnacksI,
    OrderGuestSnacksD,
    OrderGuestDinnerI,
    OrderGuestDinnerD,
    handleSubmit,
    setDate,
    orderDate,
  } = useOrderGuestMeal();

  return (
    <>
      <div className="max-w-xs mx-auto">
        <h1 className="text-gray-600 text-lg my-4">Order Guest Meal</h1>
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
            <OrderGuestMeal
              mealName="Breakfast"
              amount={guestBreakfast}
              inc={OrderGuestBreakfastI}
              dec={OrderGuestBreakfastD}
            />
            <OrderGuestMeal
              mealName="Lunch"
              amount={guestLunch}
              inc={OrderGuestLunchI}
              dec={OrderGuestLunchD}
            />
            <OrderGuestMeal
              mealName="Snacks"
              amount={guestSnacks}
              inc={OrderGuestSnacksI}
              dec={OrderGuestSnacksD}
            />
            <OrderGuestMeal
              mealName="Dinner"
              amount={guestDinner}
              inc={OrderGuestDinnerI}
              dec={OrderGuestDinnerD}
            />
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

export default OrderGuestMealForm;
