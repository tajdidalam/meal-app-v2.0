import React from "react";
import SingleDate from "./SingleDate";

const Datecard = ({ onDateSelect }) => {
  const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const d0 = new Date();
  const d1 = new Date();
  const d2 = new Date();
  const d3 = new Date();
  const d4 = new Date();
  d0.setDate(d1.getDate() - 1);
  d2.setDate(d1.getDate() + 1);
  d3.setDate(d1.getDate() + 2);
  d4.setDate(d1.getDate() + 3);

  const date = [d0, d1, d2, d3, d4];

  return (
    <div className="flex flex-row gap-4">
      {date.map((date, index) => {
        return (
          <SingleDate key={index} date={date} onDateSelect={onDateSelect} />
        );
      })}
    </div>
  );
};

export default Datecard;
