import React from "react";
import { useState } from "react";
import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from "react-icons/bs";

import datePng from "../assets/date.png";
import day from "../assets/day.png";
import breakfastImg from "../assets/breakfast.png";
import lunchImg from "../assets/lunch.png";
import snacksImg from "../assets/snacks.png";
import dinnerImg from "../assets/dinner.png";
import nodata from "../assets/no-data.svg";
import { useEffect } from "react";

const MealByDayTable = ({
  //   meals,
  dateIncrement,
  dateDecrement,

  date,
  breakfast,
  lunch,
  snacks,
  dinner,
}) => {
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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
  //   console.log(data);
  //   data.map((m) => {
  //     console.log(m);
  //   });

  return (
    <>
      <div className="flex flex-row justify-between items-center mx-4 gap-4 py-4 lg:mx-32">
        <BsFillArrowLeftCircleFill
          onClick={dateDecrement}
          className="text-3xl text-gray-400 hover:text-blue-600 cursor-pointer"
        />
        <div className="text-center">
          <p className="text-sm">Meal Order History for </p>
          <div className="text-blue-700 font-extrabold text-xl tracking-widest">
            {`${new Date(date).getDate()} ${calendarMonths[
              new Date(date).getMonth()
            ].toUpperCase()} - ${weekDays[
              new Date(date).getDay()
            ].toUpperCase()}`}
          </div>
        </div>
        <BsFillArrowRightCircleFill
          onClick={dateIncrement}
          className="text-3xl text-gray-400 hover:text-blue-600 cursor-pointer"
        />
      </div>

      <div className="bg-white rounded mx-4 lg:mx-32 p-4 shadow text-xs">
        <div className="grid grid-cols-4">
          <div>
            <img
              src={breakfastImg}
              alt="breakfast"
              className="w-8 block ml-0 mr-auto pb-4"
            />
            <hr />
            {breakfast ? (
              <p className="py-4">{breakfast.length}</p>
            ) : (
              <p className="py-4">{0}</p>
            )}
            <hr />
            {breakfast &&
              breakfast.map((m, index) => {
                return (
                  <p className="pt-4" key={index}>
                    {m.toUpperCase()}
                  </p>
                );
              })}
          </div>
          <div>
            <img
              src={lunchImg}
              alt="lunch"
              className="w-8 block ml-0 mr-auto pb-4"
            />
            <hr />
            {lunch ? (
              <p className="py-4">{lunch.length}</p>
            ) : (
              <p className="py-4">{0}</p>
            )}
            <hr />
            {lunch &&
              lunch.map((m, index) => {
                return (
                  <p className="pt-4" key={index}>
                    {m.toUpperCase()}
                  </p>
                );
              })}
          </div>
          <div>
            <img
              src={snacksImg}
              alt="snacks"
              className="w-8 block ml-0 mr-auto pb-4"
            />
            <hr />
            {snacks ? (
              <p className="py-4">{snacks.length}</p>
            ) : (
              <p className="py-4">{0}</p>
            )}
            <hr />
            {snacks &&
              snacks.map((m, index) => {
                return (
                  <p className="pt-4" key={index}>
                    {m.toUpperCase()}
                  </p>
                );
              })}
          </div>
          <div>
            <img
              src={dinnerImg}
              alt="dinner"
              className="w-8 block ml-0 mr-auto pb-4"
            />
            <hr />
            {dinner ? (
              <p className="py-4">{dinner.length}</p>
            ) : (
              <p className="py-4">{0}</p>
            )}
            <hr />
            {dinner &&
              dinner.map((m, index) => {
                return (
                  <p className="pt-4" key={index}>
                    {m.toUpperCase()}
                  </p>
                );
              })}
          </div>
        </div>

        {breakfast !== undefined &&
          breakfast.length === 0 &&
          lunch !== undefined &&
          lunch.length === 0 &&
          snacks !== undefined &&
          snacks.length === 0 &&
          dinner !== undefined &&
          dinner.length === 0 && (
            <>
              <p className="text-center pt-4">No Meal Request Yet</p>
              <img className="h-[220px] mx-auto" src={nodata} alt="no data" />
            </>
          )}
      </div>
    </>
  );
};

export default MealByDayTable;
