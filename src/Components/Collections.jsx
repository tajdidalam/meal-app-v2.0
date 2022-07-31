import React from "react";
import { db } from "../firebase/config";

const Collections = () => {
  const func = async () => {
    try {
      const docRef = await db
        .collection("2022")
        .doc("July")
        .collection("palash")
        .get();

      docRef.docs.map((doc) => {
        let newData = {
          orderDate: doc.data().orderDate.toDate(),
          breakfast: doc.data().breakfast,
          lunch: doc.data().lunch,
          snacks: doc.data().snacks,
          dinner: doc.data().dinner,
        };
        console.log(newData);
      });
      console.log(docRef.data());
      console.log(docRef.data().createdAt.toDate());
      const mm = docRef.data().createdAt.toDate().getMonth() + 1;
      const dd = docRef.data().createdAt.toDate().getDate();
      console.log(`${dd}-${mm}`);
    } catch (err) {
      console.log(err);
    }
  };

  return <div onClick={func}>Collections</div>;
};

export default Collections;
