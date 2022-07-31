import React, { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

import { useFirestore } from "../hooks/useFirestore";
import { db } from "../firebase/config";
import { useEffect } from "react";

const UserDashboard = () => {
  const { updateDocument, state } = useFirestore();
  const { user } = useAuthContext();
  const [deposit, setDeposit] = useState(0);
  const date = new Date();
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
  const docRef = db
    .collection("fuel")
    .doc(`${date.getFullYear()}`)
    .collection(`${monthNames[date.getMonth()]}`)
    .doc(`${user.displayName}`);
  let temp = 0;
  useEffect(() => {
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          temp = doc.data();

          setDeposit(temp.Deposit);
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateDocument(docRef, { Deposit: parseFloat(deposit) });
  };

  return (
    <>
      <div className="mx-auto py-8 max-w-xs flex flex-col gap-2 text-gray-600">
        <div className="flex flex-row gap-2 items-center">
          <p className="text-4xl">&#128075; </p>
          <p className="text-xl">
            Hi {user.displayName}! Welcome to your dashboard.
          </p>
        </div>
        <div className="mt-4 md:mt-8 flex flex-col gap-4 bg-white p-4 rounded shadow h-fit  text-sm md:max-w-full">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <h2 className="text-base">
              Deposit of {monthNames[date.getMonth()]}, {date.getFullYear()}
            </h2>
            <label className="flex flex-col" htmlFor="breakfast">
              <p>
                Amount in <span className="pr-2">&#2547;</span>
              </p>
              <input
                type="text"
                id="deposit"
                name="deposit"
                value={deposit}
                onChange={(e) => setDeposit(e.target.value)}
                className="py-4 pl-2 border border-blue-600 rounded hover:border-blue-900 focus:border-blue-600"
              />
            </label>
            <button className="bg-blue-600 text-white rounded py-4 hover:bg-blue-900">
              Submit
            </button>
          </form>
        </div>
        {/* //************************* */}
        {state.document && (
          <div className="mt-4 md:mt-8 flex flex-col gap-4 bg-white p-4 rounded shadow h-fit  text-sm md:max-w-full">
            <p>
              <span className="pr-2">&#2547;</span>
              {new Intl.NumberFormat("en-IN", {
                maximumSignificantDigits: 3,
              }).format(deposit)}{" "}
              just added to your {monthNames[date.getMonth()]} account
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default UserDashboard;
