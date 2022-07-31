import { useEffect, useState } from "react";
import { useGetOrderHistoryHook } from "../../hooks/useGetOrderHistoryHook";

import { db } from "../../firebase/config";
import { useAuthContext } from "../../hooks/useAuthContext";

import MealCountSummaryTable from "../../Components/statementComponents/MealCountSummaryTable";

const Statement = () => {
  const { user } = useAuthContext();
  const [orderHistory, setOrderHistory] = useState([]);

  const fetchData = async () => {
    const temp = [];
    const docRef = db
      .collection("2022")
      .doc("July")
      .collection(user.displayName);
    try {
      const data = await docRef.get();
      data.docs.map((doc) => {
        temp.push(doc.data());

        setOrderHistory(temp);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(orderHistory);

  return (
    <>
      <div className="max-w-xs pt-4 pb-2 text-center text-xl mx-auto text-blue-600 font-bold">
        Statement
      </div>
      {orderHistory && <MealCountSummaryTable orderHistory={orderHistory} />}
    </>
  );
};

export default Statement;
