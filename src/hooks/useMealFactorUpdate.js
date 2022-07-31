import React, { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";

export const useMealFactorUpdate = () => {
  const initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null,
  };

  const firestoreReducer = (state, action) => {
    switch (action.type) {
      case "PENDING":
        return { isPending: true, document: null, error: null, success: false };
      case "ADDED_DOCUMENT":
        return {
          isPending: false,
          document: action.payload,
          error: null,
          success: true,
        };
      case "ERROR":
        return {
          isPending: false,
          document: null,
          error: action.payload,
          success: false,
        };
      default:
        return state;
    }
  };

  // console.log(year, mon, user, orderDate);
  const [state, dispatch] = useReducer(firestoreReducer, initialState);

  //dispatch if not cancelled

  //   const updateData = (docRef, dataToUpdate) => {
  //     dispatch({ type: "PENDING" });

  //     docRef
  //       .set(dataToUpdate)
  //       .then((returnRef) => {
  //         console.log(returnRef.id);
  //       })
  //       .catch((error) => {
  //         dispatchIfNotCancelled({ type: "ERROR", payload: error.message });
  //       });
  //   };

  const updateData = async (docRef, dataToUpdate) => {
    dispatch({ type: "PENDING" });

    try {
      await docRef.set(dataToUpdate);
      const returnRef = await docRef.get();

      console.log(returnRef.data());

      dispatch({
        type: "ADDED_DOCUMENT",
        payload: returnRef.data(),
      });
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.message });
    }
  };
  // const updateData = async (docRef, dataToUpdate) => {
  //   dispatch({ type: "PENDING" });
  //   try {
  //     const returnRef = await docRef.set(dataToUpdate);

  //     console.log(returnRef);
  //     dispatchIfNotCancelled({
  //       type: "ADDED_DOCUMENT",
  //       payload: returnRef,
  //     });
  //   } catch (error) {
  //     dispatchIfNotCancelled({ type: "ERROR", payload: error.message });
  //   }
  // };
  //   useEffect(() => {
  //     return () => setIsCancelled(true);
  //   }, []);
  return { updateData, state };
};
