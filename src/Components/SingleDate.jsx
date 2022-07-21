import React from "react";
const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const SingleDate = ({ date, onDateSelect }) => {
  return (
    <div
      className="flex flex-col w-16 h-16 bg-blue-600 text-white rounded shadow text-center p-2 text-xs cursor-pointer"
      onClick={() => onDateSelect(date)}
    >
      <p>{weekdays[date.getDay()]}</p>
      <h3 className="text-xl">{date.getDate()}</h3>
    </div>
  );
};

export default SingleDate;
