import React, { useState, useEffect } from "react";
import { useOrderMeal } from "../hooks/useOrderMeal";
// import OrderMeal from "./OrderMeal";
const OrderDate = ({ initialState }) => {
  const {
    OrderBreakfast,
    OrderLunch,
    OrderSnacks,
    OrderDinner,
    handleSubmit,
    setDate,
    orderDate,
  } = useOrderMeal();

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

  //********************************* */

  /// Finding data from database response
  const thisDate = new Date().toDateString();
  const a = new Date();
  a.setDate(new Date().getDate() - 1);
  const thisDateMinus1 = a.toDateString();
  const b = new Date();
  b.setDate(new Date().getDate() + 1);
  const thisDatePlus1 = b.toDateString();
  const c = new Date();
  c.setDate(new Date().getDate() + 2);
  const thisDatePlus2 = c.toDateString();
  const d = new Date();
  d.setDate(new Date().getDate() + 3);
  const thisDatePlus3 = d.toDateString();

  const search = (key, inputArray) => {
    for (let i = 0; i < inputArray.length; i++) {
      if (inputArray[i].orderDate.toDateString() === key) {
        return inputArray[i];
      }
    }
  };

  const found0 = search(thisDateMinus1, initialState);
  const found1 = search(thisDate, initialState);
  const found2 = search(thisDatePlus1, initialState);
  const found3 = search(thisDatePlus2, initialState);
  const found4 = search(thisDatePlus3, initialState);

  const found = {
    found0,
    found1,
    found2,
    found3,
    found4,
  };

  let processState = {
    thisDateMinus1: {
      orderDate: thisDateMinus1,
      breakfast: 0,
      lunch: 0,
      snacks: 0,
      dinner: 0,
    },
    thisDate: {
      orderDate: thisDate,
      breakfast: 0,
      lunch: 0,
      snacks: 0,
      dinner: 0,
    },
    thisDatePlus1: {
      orderDate: thisDatePlus1,
      breakfast: 0,
      lunch: 0,
      snacks: 0,
      dinner: 0,
    },
    thisDatePlus2: {
      orderDate: thisDatePlus2,
      breakfast: 0,
      lunch: 0,
      snacks: 0,
      dinner: 0,
    },
    thisDatePlus3: {
      orderDate: thisDatePlus3,
      breakfast: 0,
      lunch: 0,
      snacks: 0,
      dinner: 0,
    },
  };

  const tempInitialState = { ...processState };

  useEffect(() => {
    if (found0) {
      let initialState0 = found0;
      processState = { ...processState, thisDateMinus1: initialState0 };
      // dispatch({ type: "UPDATED0", payload: found0 });
      console.log(processState);
    }
    if (found1) {
      let initialState1 = found1;
      processState = { ...processState, thisDate: initialState1 };
      // dispatch({ type: "UPDATED1", payload: found1 });
      console.log(processState);
    }
    if (found2) {
      let initialState2 = found2;
      processState = { ...processState, thisDatePlus1: initialState2 };
      // dispatch({ type: "UPDATED2", payload: found2 });
      console.log(processState);
    }
    if (found3) {
      let initialState3 = found3;
      processState = { ...processState, thisDatePlus2: initialState3 };
      // dispatch({ type: "UPDATED3", payload: found3 });
      console.log("the data:", processState);
    }
    if (found4) {
      let initialState4 = found4;
      processState = { ...processState, thisDatePlus3: initialState4 };
      // dispatch({ type: "UPDATED4", payload: found4 });
      console.log("the data:", processState);
    }
  }, [found]);

  useEffect(() => {
    console.log("Outside useEffect", processState);
    console.log(orderDate.toDateString());
  });

  //********************************* */

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
        </div>
      </div>
      <div className="max-w-xs mx-auto bg-white mt-4">
        <div className="bg-white rounded drop-shadow">
          <div className="p-4">
            {/* <OrderMeal mealName="Breakfast" handleMeal={OrderBreakfast} /> */}
            {/* <OrderMeal mealName="Lunch" handleMeal={OrderLunch} />
            <OrderMeal mealName="Snacks" handleMeal={OrderSnacks} />
            <OrderMeal mealName="Dinner" handleMeal={OrderDinner} /> */}
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
      <div>
        {
          processState.thisDate.orderDate === orderDate.toDateString() && (
            <div>
              {/* <OrderMeal
                mealName="Breakfast"
                initialState={processState.thisDate.breakfast}
                handleMeal={() =>
                  OrderBreakfast(processState.thisDate.breakfast)
                }
              />
              <OrderMeal
                mealName="Lunch"
                initialState={processState.thisDate.lunch}
                handleMeal={() => OrderLunch(processState.thisDate.lunch)}
              /> */}
            </div>
          )
          // orderDate.toDateString() ===
          // processState.thisDate.orderDate.toDateString() ? (
          //   <p>True</p>
          // ) : (
          //   <p>False</p>
          // )
        }
      </div>
    </>
  );
};

export default OrderDate;
