import React from "react";
import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from "react-icons/bs";

import date from "../assets/date.png";
import day from "../assets/day.png";
import breakfast from "../assets/breakfast.png";
import lunch from "../assets/lunch.png";
import snacks from "../assets/snacks.png";
import dinner from "../assets/dinner.png";

const OrderHistoryTable = ({
  meals,
  monthIncrement,
  monthDecrement,
  mealMonth,
  year,
}) => {
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  meals.map((meal) => {
    console.log(meal.orderDate);
  });

  return (
    <>
      <div className="flex flex-row justify-between items-center mx-4 gap-4 py-4 lg:mx-32">
        <BsFillArrowLeftCircleFill
          onClick={monthDecrement}
          className="text-3xl text-gray-400 hover:text-blue-600"
        />
        <div className="text-center">
          <p className="text-sm">Meal Order History for </p>
          <div className="text-blue-700 font-extrabold text-xl tracking-widest">
            {mealMonth.toUpperCase()}, {year}
          </div>
        </div>
        <BsFillArrowRightCircleFill
          onClick={monthIncrement}
          className="text-3xl text-gray-400 hover:text-blue-600"
        />
      </div>
      <div className="bg-white border shadow rounded mx-4 lg:mx-32 px-4 pb-4">
        <table className="table-auto text-sm w-full">
          <thead className=" rounded-t">
            <tr className="border-b py-4 rounded-t">
              <th className="py-4 w-[16%] text-right">
                <img
                  src={date}
                  alt="date"
                  className="w-8 block ml-auto mr-auto"
                />
              </th>
              <th className="py-4 w-[16%] text-right">
                <img
                  src={day}
                  alt="day"
                  className="w-8 block ml-auto mr-auto"
                />
              </th>
              <th className="py-4 w-1/5 text-right">
                <img
                  src={breakfast}
                  alt="breakfast"
                  className="w-8 block ml-auto mr-auto"
                />
              </th>
              <th className="py-4 w-[16%] text-right">
                <img
                  src={lunch}
                  alt="lunch"
                  className="w-8 block ml-auto mr-auto"
                />
              </th>
              <th className="py-4 w-[16%] text-right">
                <img
                  src={snacks}
                  alt="snacks"
                  className="w-8 block ml-auto mr-auto"
                />
              </th>
              <th className="py-4 w-[16%] text-right">
                <img
                  src={dinner}
                  alt="dinner"
                  className="w-8 block ml-auto mr-auto"
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {meals.map((meal, index) => {
              return (
                <tr key={index} className="border-b py-4 rounded-t">
                  <td className="py-4 text-center w-[16%]">
                    {new Date(meal.orderDate).getDate()}
                  </td>
                  <td className="py-4 text-center w-[16%]">
                    {weekDays[new Date(meal.orderDate).getDay()]}
                  </td>
                  <td className="py-4 text-center w-1/5">{meal.breakfast}</td>
                  <td className="py-4 text-center w-[16%]">{meal.lunch}</td>
                  <td className="py-4 text-center w-[16%]">{meal.snacks}</td>
                  <td className="py-4 text-center w-[16%]">{meal.dinner}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OrderHistoryTable;
