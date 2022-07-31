import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
//in this hook, we import useContext to use the context. we also import the context we created. we will consume the context using usecontext method

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  //the context is now an object same as the value we declared in the AuthContextProvider component. the object has all the states and the dispatch function {...state, dispatch}
  if (!context) {
    throw Error("Context is not availableeeeeeeee.");
  }
  return context;
};
