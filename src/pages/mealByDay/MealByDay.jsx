import React from "react";
import { useState, useEffect } from "react";
import { db } from "../../firebase/config";
import { useAuthContext } from "../../hooks/useAuthContext";

import MealByDayTable from "../../Components/MealByDayTable";

import { useGetMealByDate } from "../../hooks/useGetMealByDateHook";

const MealByDay = () => {
  const { user } = useAuthContext();
  const [date, setDate] = useState(new Date());
  // const [date, setDate] = useState(new Date().getTime());
  const { dataFetchFunction, dayData } = useGetMealByDate();
  // const [breakfast, setBreakfast] = useState([]);
  // const [lunch, setLunch] = useState([]);
  // const [shacks, setSnacks] = useState([]);
  // const [dinner, setDinner] = useState([]);
  useEffect(() => {
    dataFetchFunction(date);
    // setBreakfast(dayData.breakfast);
  }, [date]);

  // console.log(breakfast);

  // const [componentData, setComponentData] = useState({
  //   breakfast: [],
  //   lunch: [],
  //   snacks: [],
  //   dinner: [],
  // });

  // useEffect(() => {
  //   setComponentData(dayData);
  //   setBreakfast(componentData.breakfast);
  //   console.log(breakfast);
  // }, []);

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

  const dateIncrement = () => {
    const temp = new Date(date);
    temp.setDate(temp.getDate() + 1);
    setDate(temp);
  };
  // console.log(date);
  const dateDecrement = () => {
    const temp = new Date(date);
    temp.setDate(temp.getDate() - 1);
    setDate(temp);
  };

  //   var docRef = db.collection("july").doc("20220715");

  //   docRef
  //     .get()
  //     .then((doc) => {
  //       if (doc.exists) {
  //         console.log("Document data:", doc.data());
  //       } else {
  //         // doc.data() will be undefined in this case
  //         console.log("No such document!");
  //       }
  //     })
  //     .catch((error) => {
  //       console.log("Error getting document:", error);
  //     });

  //   let docRef = db.collection("july").doc("20220715");

  //   const [dayData, setDayData] = useState({});
  //   try {
  //     const DataFetchFunction = async () => {
  //       const myData = await docRef.get();
  //       useEffect(() => {
  //         setDayData(myData.data());
  //       }, []);
  //       //   console.log(myData.data());
  //     };
  // } catch (error) {
  //     console.log(error);
  // }

  // DataFetchFunction();
  //   console.log(dayData);
  // console.log(dayData);

  return (
    <>
      {/* {dayData && ( */}
      <MealByDayTable
        breakfast={dayData !== undefined ? dayData.breakfast : []}
        lunch={dayData !== undefined ? dayData.lunch : []}
        snacks={dayData !== undefined ? dayData.snacks : []}
        dinner={dayData !== undefined ? dayData.dinner : []}
        date={date}
        dateIncrement={dateIncrement}
        dateDecrement={dateDecrement}
      />
      {/* )} */}
    </>
  );
};

export default MealByDay;
