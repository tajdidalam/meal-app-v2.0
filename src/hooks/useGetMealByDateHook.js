import React from "react";
import { useState, useEffect } from "react";
import { db } from "../firebase/config";

export const useGetMealByDate = () => {
  const [dayData, setDayData] = useState({});
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

  const dataFetchFunction = async (date) => {
    // console.log("dddate: ", date.getFullYear());
    let docRef = db
      .collection(`${date.getFullYear()}${m[date.getMonth()]}`)
      .doc(`${date.getDate()}`);
    try {
      const myData = await docRef.get();
      await setDayData(myData.data());
    } catch (err) {
      console.log(err);
    }
  };

  //   const dataFetchFunction = async () => {
  //       let docRef = db.collection("july").doc("20220715");
  //   try {
  //       const myData = await docRef.get();

  //       setDayData(myData.data());
  //     }
  //    catch (error) {
  //     console.log(error);
  //   }

  //   dataFetchFunction,
  return {
    dayData,
    dataFetchFunction,
  };
};
