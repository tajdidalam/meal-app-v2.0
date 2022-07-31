import React, { useState, useEffect } from "react";
import { db } from "../../firebase/config";
import { useTotalMeal } from "./useTotalMeal";

const TotalExpTotalMeal = (date) => {
  const [expense, setExpense] = useState(0);
  const { orderHistory } = useTotalMeal();
  console.log(orderHistory);
  let totalExpense = 0;

  const year = date.getFullYear();
  const month = date.getMonth();

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

  useEffect(() => {
    db.collection("expenses")
      .doc(`${year}`)
      .collection(`${monthNames[month]}`)
      .get()
      .then((docs) => {
        docs.forEach((doc) => {
          let tempDoc = doc.data();
          Object.keys(tempDoc).map((key, index) => {
            if (tempDoc[key].amount) {
              totalExpense += parseFloat(tempDoc[key].amount);
              //   console.log(tempDoc[key].amount);
            }
          });
          //   console.log(doc.id, " => ", doc.data());
        });
        console.log("====> ", totalExpense);
        setExpense(totalExpense);
      })
      .catch((err) => console.log(err));
  }, [expense]);

  console.log("expense ", expense);

  //************************************************ */

  return <div>TotalExpTotalMeal</div>;
};

export default TotalExpTotalMeal;
