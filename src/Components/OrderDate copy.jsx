import React, { useState } from "react";

const OrderDate = ({ setDate }) => {
  const today = new Date();
  const date = new Date();
  const yesterday = new Date();
  const tomorrow = new Date();
  const dayAfterTomorrow = new Date();
  const thirdDay = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  tomorrow.setDate(tomorrow.getDate() + 1);
  dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
  thirdDay.setDate(thirdDay.getDate() + 3);

  const selectedStyle = "bg-blue-600 text-white";
  const defaultStyle = "bg-white text-blue-600";
  const [myStyle, setMyStyle] = useState(defaultStyle);
  const [x, setX] = useState(2);

  return (
    <>
      <div
        className={`w-12 h-12 pt-1 rounded  drop-shadow cursor-pointer ${
          x === 1 ? selectedStyle : defaultStyle
        } hover:bg-blue-900 hover:text-white`}
        onClick={() => {
          setDate(yesterday);
          setX(1);
        }}
      >
        <div className="flex flex-col">
          <p className="text-xs mx-auto">
            {new Intl.DateTimeFormat("en-US", {
              weekday: "short",
            })
              .format(yesterday)
              .toUpperCase()}
          </p>
          <p className="text-base mx-auto">
            {new Intl.DateTimeFormat("en-US", {
              day: "numeric",
            }).format(yesterday)}
          </p>
        </div>
      </div>
      <div
        className={`w-12 h-12 pt-1 rounded  drop-shadow cursor-pointer ${
          x === 2 ? selectedStyle : defaultStyle
        } hover:bg-blue-900 hover:text-white`}
        //   onClick={() => {
        //     // setOrderDate(yesterday);
        //     // setMyStyle(selectedStyle);
        //     setX(1);
        //   }}
        onClick={() => {
          setDate(today);
          setX(2);
        }}
      >
        <div className="flex flex-col">
          <p className="text-xs mx-auto">
            {new Intl.DateTimeFormat("en-US", {
              weekday: "short",
            })
              .format(today)
              .toUpperCase()}
          </p>
          <p className="text-base mx-auto">
            {new Intl.DateTimeFormat("en-US", {
              day: "numeric",
            }).format(today)}
          </p>
        </div>
      </div>
      <div
        className={`w-12 h-12 pt-1 rounded  drop-shadow cursor-pointer ${
          x === 3 ? selectedStyle : defaultStyle
        } hover:bg-blue-900 hover:text-white`}
        onClick={() => {
          setDate(tomorrow);
          setX(3);
        }}
      >
        <div className="flex flex-col">
          <p className="text-xs mx-auto">
            {new Intl.DateTimeFormat("en-US", {
              weekday: "short",
            })
              .format(tomorrow)
              .toUpperCase()}
          </p>
          <p className="text-base mx-auto">
            {new Intl.DateTimeFormat("en-US", {
              day: "numeric",
            }).format(tomorrow)}
          </p>
        </div>
      </div>
      <div
        className={`w-12 h-12 pt-1 rounded  drop-shadow cursor-pointer ${
          x === 4 ? selectedStyle : defaultStyle
        } hover:bg-blue-900 hover:text-white`}
        onClick={() => {
          setDate(dayAfterTomorrow);
          setX(4);
        }}
      >
        <div className="flex flex-col">
          <p className="text-xs mx-auto">
            {new Intl.DateTimeFormat("en-US", {
              weekday: "short",
            })
              .format(dayAfterTomorrow)
              .toUpperCase()}
          </p>
          <p className="text-base mx-auto">
            {new Intl.DateTimeFormat("en-US", {
              day: "numeric",
            }).format(dayAfterTomorrow)}
          </p>
        </div>
      </div>
      <div
        className={`w-12 h-12 pt-1 rounded  drop-shadow cursor-pointer ${
          x === 5 ? selectedStyle : defaultStyle
        } hover:bg-blue-900 hover:text-white`}
        onClick={() => {
          setDate(thirdDay);
          setX(5);
        }}
      >
        <div className="flex flex-col">
          <p className="text-xs mx-auto">
            {new Intl.DateTimeFormat("en-US", {
              weekday: "short",
            })
              .format(thirdDay)
              .toUpperCase()}
          </p>
          <p className="text-base mx-auto">
            {new Intl.DateTimeFormat("en-US", {
              day: "numeric",
            }).format(thirdDay)}
          </p>
        </div>
      </div>
    </>
  );
};

export default OrderDate;
