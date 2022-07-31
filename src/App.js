import React from "react";
import Footer from "./Components/Footer";
//importing components from react router to implement url based component rendering.
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

//import authContext to use authIsReady value to conditionally render components
import { useAuthContext } from "./hooks/useAuthContext";

//garding users to go to routes based on authentication state.

//importing components
import Home from "./pages/home/Home";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import Navbar from "./Components/Navbar";
import GuestMeal from "./pages/guestMeal/GuestMeal";
import OrderHistory from "./pages/orderHistory/OrderHistory";
import MealByDay from "./pages/mealByDay/MealByDay";
import Statement from "./pages/statement/Statement";
import MealFactor from "./pages/MealFactor";
import UserDashboard from "./pages/UserDashboard";
import Expenses from "./pages/Expenses";

const App = () => {
  const { authIsReady, user } = useAuthContext();

  return (
    <div className="bg-slate-50 text-slate-600 flex flex-col h-screen justify-between">
      <div className="bg-slate-50">
        {authIsReady && (
          <BrowserRouter>
            <Navbar />
            <Switch>
              <Route exact path="/">
                {!user && <Redirect to="/login" />}
                {user && <Home />}
              </Route>
              <Route path="/signup">
                {!user && <Signup />}
                {user && <Redirect to="/" />}
              </Route>
              <Route path="/login">
                {!user && <Login />}
                {user && <Redirect to="/" />}
              </Route>
              <Route path="/guest-meal">
                {!user && <Redirect to="/login" />}
                {user && <GuestMeal />}
              </Route>
              <Route path={`/${user.displayName.toLowerCase()}`}>
                {!user && <Redirect to="/login" />}
                {user && <UserDashboard />}
              </Route>
              <Route path="/order-history">
                {!user && <Redirect to="/login" />}
                {user && <OrderHistory />}
              </Route>
              <Route path="/meal-by-day">
                {!user && <Redirect to="/login" />}
                {user && <MealByDay />}
              </Route>
              <Route path="/statement">
                {!user && <Redirect to="/login" />}
                {user && <Statement />}
              </Route>
              <Route path="/meal-factor">
                {!user && <Redirect to="/login" />}
                {user && <MealFactor />}
              </Route>
              <Route path="/expenses">
                {!user && <Redirect to="/login" />}
                {user && <Expenses />}
              </Route>
            </Switch>
          </BrowserRouter>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default App;
