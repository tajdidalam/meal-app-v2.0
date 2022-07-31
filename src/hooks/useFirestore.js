import { useState, useEffect, useReducer } from "react";
import { timestamp } from "../firebase/config";

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

export const useFirestore = () => {
  // console.log(year, mon, user, orderDate);
  const [state, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  //getting date time to make collection and document name
  // const months = [
  //   "January",
  //   "February",
  //   "March",
  //   "April",
  //   "May",
  //   "June",
  //   "July",
  //   "August",
  //   "September",
  //   "October",
  //   "November",
  //   "December",
  // ];
  // const date = new Date();
  //   const year = date.getFullYear();
  // const month = months[mon - 1];

  //get a reference to some kind of collection in our firestore database

  // const ref = db
  //   .collection(`${year}`)
  //   .doc(month)
  //   .collection(user)
  //   .doc(orderDate);

  //later we will use this ref to add, delete, update data into our database collection

  //dispatch if not cancelled
  // const dispatchIfNotCancelled = (action) => {
  //   if (!isCancelled) {
  //     dispatch(action);
  //   }
  // };
  const addDocument = async (ref, doc) => {
    // dispatch({ type: "PENDING" });

    try {
      const createdAt = timestamp.fromDate(new Date());
      //   const addedDocumentRef = await ref.add({ ...doc, createdAt });
      const addedDocumentRef = await ref.set({ ...doc, createdAt });
      // dispatch({
      //   type: "ADDED_DOCUMENT",
      //   payload: addedDocumentRef,
      // });
      console.log(addedDocumentRef.data());
    } catch (error) {
      // dispatch({ type: "ERROR", payload: error.message });
    }
    // useEffect(() => {

    // }, [addedDocumentRef]);
  };
  const updateDocument = async (ref, doc) => {
    dispatch({ type: "PENDING" });
    const createdAt = timestamp.fromDate(new Date());
    // try {
    //   const createdAt = timestamp.fromDate(new Date());

    //   var addedDocumentRef = await ref.set(
    //     { ...doc, createdAt },
    //     { merge: true }
    //   );
    //   console.log("Added documetn ref: ", addedDocumentRef);
    //   dispatch({
    //     type: "ADDED_DOCUMENT",
    //     payload: addedDocumentRef,
    //   });
    //   console.log(addedDocumentRef.data());
    // } catch (error) {
    //   dispatch({ type: "ERROR", payload: error.message });
    // }

    ref
      .set({ ...doc, createdAt }, { merge: true })
      .then(() => {
        dispatch({
          type: "ADDED_DOCUMENT",
          payload: ref.id,
        });
      })
      .catch((err) => {
        dispatch({ type: "ERROR", payload: err.message });
      });
  };

  // const deleteDocument = (id) => {};

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { addDocument, state, updateDocument };
};
