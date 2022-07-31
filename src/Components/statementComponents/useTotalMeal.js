import React, { useState, useEffect } from "react";
import { db } from "../../firebase/config";
export const useTotalMeal = (date) => {
  const [mealAmount, setMealAmount] = useState(0);
  console.log(date);

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

  const totalMeal = {
    breakfast: 0,
    lunch: 0,
    snacks: 0,
    dinner: 0,
    total: 0,
  };

  let controller = 0;
  useEffect(() => {
    db.collection("user")
      .doc("all-user")
      .get()
      .then((doc) => {
        doc.data().users.map((user) => {
          db.collection(`${year}`)
            .doc(`${monthNames[month]}`)
            .collection(user)
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                let i = doc.data();
                if (i.breakfast) {
                  if (i.breakfastFactor) {
                    totalMeal.breakfast += i.breakfast * i.breakfastFactor;
                  } else {
                    totalMeal.breakfast += i.breakfast * 0.5;
                  }
                }
                if (i.lunch) {
                  if (i.lunchFactor) {
                    totalMeal.lunch += i.lunch * i.lunchFactor;
                  } else {
                    totalMeal.lunch += i.lunch * 1;
                  }
                }
                if (i.snacks) {
                  if (i.snacksFactor) {
                    totalMeal.snacks += i.snacks * i.snacksFactor;
                  } else {
                    totalMeal.snacks += i.snacks * 0.5;
                  }
                }
                if (i.dinner) {
                  if (i.dinnerFactor) {
                    totalMeal.dinner += i.dinner * i.dinnerFactor;
                  } else {
                    totalMeal.dinner += i.dinner * 1;
                  }
                }

                totalMeal.total =
                  totalMeal.breakfast +
                  totalMeal.lunch +
                  totalMeal.snacks +
                  totalMeal.dinner;

                setMealAmount(totalMeal.total);
              });
            });
        });
      });
    console.log("lllllllllllllllllllll", totalMeal.total);
    controller = 1;
  }, [month]);

  return { mealAmount };
};
