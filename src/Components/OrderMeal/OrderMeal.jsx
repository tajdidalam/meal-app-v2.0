import React, { useState, useEffect, useRef } from "react";

import firebase from "firebase/app";
import "firebase/firestore";

import { useAuthContext } from "../../hooks/useAuthContext";
import { db, timestamp } from "../../firebase/config";
import { useFirestore } from "../../hooks/useFirestore";

import Datecard from "./Datecard";
import MealItem from "./MealItem";

const OrderMeal = () => {
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
  const { user } = useAuthContext();
  const { addDocument } = useFirestore();
  const [mealDate, setMealDate] = useState(new Date());
  // const [mealDate, setMealDate] = useState(new Date());
  const ref = db
    .collection("2022")
    .doc(`${monthNames[mealDate.getMonth()]}`)
    .collection(user.displayName)
    .doc(`${mealDate.getDate()}`);
  // const ref = db
  //   .collection("2022")
  //   .doc("July")
  //   .collection(user.displayName)
  //   .doc(
  //     `${mealDate.getFullYear()}-${
  //       mealDate.getMonth() + 1
  //     }-${mealDate.getDate()}`
  //   );
  const m = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];

  const mealByDateDbRef = db
    .collection(`${mealDate.getFullYear()}${m[mealDate.getMonth()]}`)
    .doc(`${mealDate.getDate()}`);

  const d0 = new Date();
  const d1 = new Date();
  const d2 = new Date();
  const d3 = new Date();
  const d4 = new Date();
  d0.setDate(d1.getDate() - 1);
  d2.setDate(d1.getDate() + 1);
  d3.setDate(d1.getDate() + 2);
  d4.setDate(d1.getDate() + 3);

  const dummy = [
    {
      orderDate: d0,
      breakfast: 1,
      lunch: 1,
      snacks: 0,
      dinner: 1,
    },
    {
      orderDate: d1,
      breakfast: 1,
      lunch: 1,
      snacks: 0,
      dinner: 1,
    },
    {
      orderDate: d2,
      breakfast: 0,
      lunch: 0,
      snacks: 0,
      dinner: 0,
    },
    {
      orderDate: d3,
      breakfast: 0,
      lunch: 1,
      snacks: 0,
      dinner: 1,
    },
    {
      orderDate: d4,
      breakfast: 0,
      lunch: 1,
      snacks: 1,
      dinner: 1,
    },
  ];

  const [existingMeal, setExistingMeal] = useState([]);

  const date = [d0, d1, d2, d3, d4];

  // addDocument(ref, doc);

  ////////////////////// getting data from db

  useEffect(() => {
    db.collection("2022")
      .doc(`${monthNames[mealDate.getMonth()]}`)
      .collection(user.displayName)
      .get()
      .then((querySnapshot) => {
        const temp = [];
        querySnapshot.forEach((doc) => {
          temp.push({ ...doc.data(), id: doc.id });
        });
        console.log(temp);
        setExistingMeal(temp);
        setExistingMeal(temp);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }, [mealDate.getMonth()]);

  console.log("eeeeeee:", existingMeal);

  //////////////////////

  const search = (key, inputArray) => {
    for (let i = 0; i < inputArray.length; i++) {
      if (inputArray[i].orderDate === key) {
        // if (inputArray[i].orderDate.toDateString() === key) {
        // if (inputArray[i].breakfast === key) {
        return inputArray[i];
      }
    }
  };

  // if (existingMeal) {
  //   const found = search(1, existingMeal);
  //   console.log("found is: ", found);
  // }

  const [enableBreakfast, setEnableBreakfast] = useState(false);
  const [enableLunch, setEnableLunch] = useState(false);
  const [enableSnacks, setEnableSnacks] = useState(false);
  const [enableDinner, setEnableDinner] = useState(false);

  // const found = search(mealDate.toDateString(), existingMeal);
  const found = search(mealDate.toDateString(), existingMeal);
  const _found = useRef(found).current;
  useEffect(() => {
    if (found) {
      if (found.breakfast) {
        setEnableBreakfast(true);
      } else {
        setEnableBreakfast(false);
      }
      if (found.lunch) {
        setEnableLunch(true);
      } else {
        setEnableLunch(false);
      }
      if (found.snacks) {
        setEnableSnacks(true);
      } else {
        setEnableSnacks(false);
      }
      if (found.dinner) {
        setEnableDinner(true);
      } else {
        setEnableDinner(false);
      }
    } else {
      setEnableBreakfast(false);
      setEnableLunch(false);
      setEnableSnacks(false);
      setEnableDinner(false);
    }
    // }, [_found]);
  }, [mealDate]);
  //***************************************** */
  const [selectedDate, setSelectedDate] = useState(1);
  const onDateSelect = (date) => {
    console.log(date);
    setMealDate(date);
    setSelectedDate(date.getDate());
  };
  //***************************************** */

  const setMealItem = (mealName) => {
    switch (mealName) {
      case "Breakfast":
        setEnableBreakfast(!enableBreakfast);
        break;
      case "Lunch":
        setEnableLunch(!enableLunch);
        break;
      case "Snacks":
        setEnableSnacks(!enableSnacks);
        break;
      case "Dinner":
        setEnableDinner(!enableDinner);
        break;
    }
  };

  let breakfast = 0;
  let lunch = 0;
  let snacks = 0;
  let dinner = 0;

  if (enableBreakfast) {
    breakfast = 1;
  } else {
    breakfast = 0;
  }
  if (enableLunch) {
    lunch = 1;
  } else {
    lunch = 0;
  }
  if (enableSnacks) {
    snacks = 1;
  } else {
    snacks = 0;
  }
  if (enableDinner) {
    dinner = 1;
  } else {
    dinner = 0;
  }
  const doc = {
    orderDate: mealDate.toDateString(),
    breakfast: breakfast,
    lunch: lunch,
    snacks: snacks,
    dinner: dinner,
    createdAt: timestamp.fromDate(new Date()),
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(doc);

    addDocument(ref, doc);
    // mealByDateDbRef.update({
    //   breakfast: firebase.firestore.FieldValue.arrayUnion(user.displayName),
    // });
    if (enableBreakfast) {
      mealByDateDbRef.set(
        {
          breakfast: firebase.firestore.FieldValue.arrayUnion(user.displayName),
        },
        { merge: true }
      );
    }
    if (enableLunch) {
      mealByDateDbRef.set(
        {
          lunch: firebase.firestore.FieldValue.arrayUnion(user.displayName),
        },
        { merge: true }
      );
    }
    if (enableSnacks) {
      mealByDateDbRef.set(
        {
          snacks: firebase.firestore.FieldValue.arrayUnion(user.displayName),
        },
        { merge: true }
      );
    }
    if (enableDinner) {
      mealByDateDbRef.set(
        {
          dinner: firebase.firestore.FieldValue.arrayUnion(user.displayName),
        },
        { merge: true }
      );
    }
    // mealByDateDbRef.set(
    //   {
    //     breakfast: firebase.firestore.FieldValue.arrayUnion(user.displayName),
    //     lunch: firebase.firestore.FieldValue.arrayUnion(user.displayName),
    //     snacks: firebase.firestore.FieldValue.arrayUnion(user.displayName),
    //     dinner: firebase.firestore.FieldValue.arrayUnion(user.displayName),
    //   },
    //   { merge: true }
    // );
  };

  return (
    <form onSubmit={handleSubmit}>
      <Datecard
        date={date}
        onDateSelect={onDateSelect}
        mealDate={selectedDate}
        // mealDate={mealDate.getDate()}
      />
      {/* <div className="rounded max-w-70 bg-white p-4 shadow my-4"> */}
      <div className="max-w-xs mx-auto bg-white rounded drop-shadow p-4">
        <MealItem
          mealName={"Breakfast"}
          enabled={enableBreakfast}
          setMealItem={setMealItem}
        />
        <MealItem
          mealName={"Lunch"}
          enabled={enableLunch}
          setMealItem={setMealItem}
        />
        <MealItem
          mealName={"Snacks"}
          enabled={enableSnacks}
          setMealItem={setMealItem}
        />
        <MealItem
          mealName={"Dinner"}
          enabled={enableDinner}
          setMealItem={setMealItem}
        />
        <button className="bg-blue-600 text-white text-center py-4 w-full rounded shadow mt-4 hover:bg-blue-900">
          Submit
        </button>
      </div>
    </form>
  );
};

export default OrderMeal;
