import React, { useState, useEffect } from "react";
const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const SingleDate = ({ date, onDateSelect, mealDate }) => {
  // useEffect(() => {
  //   return () => {
  //     setSelectedDate(1);
  //   };
  // }, []);

  // console.log(selectedDate);

  return (
    <div
      className={`flex flex-col w-16 h-16 ${
        date.getDate() === mealDate
          ? "bg-blue-600 text-white"
          : "bg-white text-blue-600 shadow-blue-200"
      } rounded shadow text-center p-2 text-xs cursor-pointer hover:bg-blue-900 hover:text-white`}
      onClick={() => {
        onDateSelect(date);
      }}
    >
      <p>{weekdays[date.getDay()]}</p>
      <h3 className="text-lg">{date.getDate()}</h3>
    </div>
  );
};

export default SingleDate;
