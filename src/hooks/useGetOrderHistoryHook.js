import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

// export const mealHistoryReducer = (state, action) => {
//   switch (action.type) {
//     case "ADD":
//       return [action.payload];
//     default:
//       return state;
//   }
// };

export const useGetOrderHistoryHook = () => {
  const { user } = useAuthContext();
  let mealMonth = new Date();
  const monthName = [
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

  //   const [state, dispatch] = useReducer(mealHistoryReducer, []);

  //   let docRef = db
  //     .collection(`${mealMonth.getFullYear()}`)
  //     .doc(`${monthName[mealMonth.getMonth()]}`)
  //     .collection(user.displayName);

  const [orderHistory, setOrderHistory] = useState([]);
  //   let docData = [];

  const fetchData = async () => {
    const docRef = db
      .collection("2022")
      .doc("July")
      .collection(user.displayName);
    const data = await docRef.get();
    data.docs.forEach((doc) => {
      setOrderHistory([...orderHistory, doc.data()]);
    });
    console.log(orderHistory);
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(orderHistory);

  //   useEffect(() => {
  //     docRef
  //       .get()
  //       .then((querySnapshot) => {
  //         querySnapshot.forEach((doc) => {
  //           docData = [...docData, doc.data()];
  //           //   dispatch({ type: "ADD", payload: docData });
  //           console.log(docData);
  //           return docData;
  //         });
  //       })
  //       .catch((error) => console.log(error));
  //   }, []);

  return { orderHistory };
};
