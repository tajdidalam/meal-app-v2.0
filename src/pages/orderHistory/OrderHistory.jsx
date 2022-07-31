import React from "react";
import { useState, useEffect } from "react";
import { db } from "../../firebase/config";
import { useAuthContext } from "../../hooks/useAuthContext";

import OrderHistoryTable from "../../Components/OrderHistoryTable";

const OrderHistory = () => {
  const { user } = useAuthContext();

  const date = new Date();
  //   const month = date.getMonth();
  const [month, setMonth] = useState(date.getMonth());
  const year = date.getFullYear();
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
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const mealMonth = calendarMonths[month];

  const monthIncrement = () => {
    if (month < 11) {
      setMonth(month + 1);
    }
  };
  const monthDecrement = () => {
    if (month > 0) {
      setMonth(month - 1);
    }
  };

  const [meals, setMeals] = useState([]);
  const historyFetch = async () => {
    try {
      let mealHistory = [];
      const fetchMeals = await db
        .collection(`${year}`)
        .doc(`${mealMonth}`)
        .collection(user.displayName)
        .get();

      fetchMeals.docs.map((doc) => {
        let newData = {
          orderDate: doc.data().orderDate,
          breakfast: doc.data().breakfast,
          lunch: doc.data().lunch,
          snacks: doc.data().snacks,
          dinner: doc.data().dinner,
        };
        mealHistory.push(newData);
      });
      setMeals(mealHistory);
    } catch (error) {
      console.log(error);
    }
  };

  //***************** */

  useEffect(() => {
    historyFetch();
  }, [month]);

  return (
    <div className="pb-8">
      <OrderHistoryTable
        meals={meals}
        mealMonth={mealMonth}
        year={year}
        monthIncrement={monthIncrement}
        monthDecrement={monthDecrement}
      />
    </div>
  );
};

export default OrderHistory;
