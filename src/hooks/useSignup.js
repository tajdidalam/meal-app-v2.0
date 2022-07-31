import { auth } from "../firebase/config";
import { useState, useEffect } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  //we will monitor two states, if the process is pending and if there is any error. When the user is trying to sign up, we will set the pending state to true. it there is any error from the firebase, we will set the error state to error.
  //based on these two staes we will set some custom logic in the signup component.
  const [isCancelled, setIsCancelled] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, displayName) => {
    //when we invok the function we first reset the error state. this reset will crear any error history from the previous invoking of this function (if there were any error). so if we want to retry sign up, the error from the previous attemp must be reset. otherwise this attemp to invoke the singup method will fail
    setError(null);
    setIsPending(true);
    try {
      const response = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      //we take the response back from the firebase after using createUserWithEmailAndPassword method to a variable named response

      //if for any reason, we are unable to reach the firebase with the signup imformation, we need to create an error and show it to the user
      if (!response) {
        throw new Error(
          "Can not complete the signup process. Please try again."
        );
      }

      //now we will update the displayName property to the user object stored in firestore authentication
      await response.user.updateProfile({ displayName });

      //use dispatch function to update the state inside the context using the login user
      dispatch({ type: "LOGIN", payload: response.user });

      //if everything is successfull, we need to update our states

      setError(null);
      setIsPending(false);
    } catch (error) {
      setError(error.message);
      setIsPending(false);
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { signup, isPending, error };
};
