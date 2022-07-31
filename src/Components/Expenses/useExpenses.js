import React, { useState, useEffect } from "react";
import { db } from "../../firebase/config";

export const useExpenses = (date) => {
  const [data, setData] = useState({});

  const monthNames = [
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

  let temp = [];
  useEffect(() => {
    db.collection("expenses")
      .doc(`${date.getFullYear()}`)
      .collection(`${monthNames[date.getMonth()]}`)
      .doc(`${date.getDate()}`)
      .get()
      .then((doc) => {
        setData(doc.data());
      })
      .catch((err) => console.log(err));
  }, [date]);

  return { data };
};
