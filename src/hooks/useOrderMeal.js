import React, { useEffect } from "react";
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

//import useFirestore hoot to add data to the firestore database
import { useFirestore } from "./useFirestore";

//inside code will be deleted
import { db } from "../firebase/config";
//till here

export const useOrderMeal = () => {
  const [breakfast, setBreakfast] = useState(0);
  const [lunch, setLunch] = useState(0);
  const [snacks, setSnacks] = useState(0);
  const [dinner, setDinner] = useState(0);
  const today = new Date();
  const [orderDate, setOrderDate] = useState(today);
  const { user } = useAuthContext();

  let year = orderDate.getFullYear();
  let mon = orderDate.getMonth() + 1;
  let day = orderDate.getDate();
  let docName = year + "-" + mon + "-" + day;
  //changed the docname

  const { addDocument, state } = useFirestore(
    year,
    mon,
    user.displayName,
    docName
  );
  const setDate = (date) => {
    setOrderDate(date);
  };

  const OrderBreakfast = (b) => {
    if (b === 0) {
      if (breakfast === 0) {
        setBreakfast(breakfast + 1);
      } else {
        setBreakfast(breakfast - 1);
      }
    } else {
      if (breakfast === 0) {
        setBreakfast(breakfast + 1);
      } else {
        setBreakfast(breakfast - 1);
      }
    }
    console.log("bbbbbbbbbbbbbbbb", b);
    console.log("breakfast", breakfast);
  };
  const OrderLunch = (l) => {
    if (l === 0) {
      if (lunch === 0) {
        setLunch(lunch + 1);
      } else {
        setLunch(lunch - 1);
      }
    } else {
      if (lunch === 0) {
        setLunch(lunch + 1);
      } else {
        setLunch(lunch - 1);
      }
    }

    console.log("lllllllllllllllll", l);
    console.log("lunch", lunch);
  };
  // const OrderBreakfast = () => {
  //   if (breakfast === 0) {
  //     setBreakfast(breakfast + 1);
  //   } else {
  //     setBreakfast(breakfast - 1);
  //   }
  // };
  // const OrderLunch = () => {
  //   if (lunch === 0) {
  //     setLunch(lunch + 1);
  //   } else {
  //     setLunch(lunch - 1);
  //   }
  // };
  const OrderSnacks = () => {
    if (snacks === 0) {
      setSnacks(snacks + 1);
    } else {
      setSnacks(snacks - 1);
    }
  };
  const OrderDinner = () => {
    if (dinner === 0) {
      setDinner(dinner + 1);
    } else {
      setDinner(dinner - 1);
    }
  };

  const handleSubmit = () => {
    const meal = {
      orderDate,
      breakfast,
      lunch,
      snacks,
      dinner,
      user: user.displayName,
    };
    addDocument({ ...meal });
  };

  return {
    breakfast,
    lunch,
    snacks,
    dinner,
    OrderBreakfast,
    OrderLunch,
    OrderSnacks,
    OrderDinner,
    handleSubmit,
    setDate,
    orderDate,
  };
};
