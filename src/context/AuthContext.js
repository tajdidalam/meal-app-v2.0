import { createContext, useEffect } from "react";
import { useReducer } from "react"; //the reducer is imported because we will use the reducer to maintain and update the state value the context is providing to the children components
import { auth } from "../firebase/config";

export const AuthContext = createContext();

//let us now define the authReducer function what controls the state
export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    case "AUTH_IS_READY":
      return { ...state, user: action.payload, authIsReady: true };
    default:
      return state;
  }
};

//it creates a new context which is stored in the AuthContext. We are exporting it to use in other components.

//We will not provide the AuthContext directly to the children components. But we will create a provider component which will wrap the components that we want to provide the state to through the context

export const AuthContextProvider = ({ children }) => {
  //we now create the state the context will provide to its children using reducer
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false,
  });

  //use useEffect to check if there is any login user. We check it by requesting the firebase with onAuthStateChanged() method. This method is going to return us a user who is logged in or a null value to user not logged in. we then update out state based on the response and then conditionally render the components based on authIsReady value
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      dispatch({ type: "AUTH_IS_READY", payload: user });
      unsubscribe();
    });
  }, []);
  // console.log("Loggede in user:", state);
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
