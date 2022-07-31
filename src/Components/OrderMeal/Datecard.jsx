import React from "react";
import SingleDate from "./SingleDate";

const Datecard = ({ date, onDateSelect, mealDate }) => {
  const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  return (
    <div className="max-w-xs mx-auto bg-white rounded drop-shadow p-4 mb-4">
      <div className="flex flex-row gap-4">
        {date.map((date, index) => {
          return (
            <SingleDate
              key={index}
              date={date}
              onDateSelect={onDateSelect}
              mealDate={mealDate}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Datecard;
