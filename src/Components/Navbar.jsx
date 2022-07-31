import React from "react";
import { Link } from "react-router-dom";
import { HiCurrencyBangladeshi } from "react-icons/hi";

//we import useState to implement sidebar open functions
import { useState } from "react";

//to implement the logout function in the navbar, we are going to import useAuthContext and the useLogout hook that we created. the hook is going to give us a logout function that we are going to call onClick the logout button in the navbar.
//we are also going to show the name of the logged in user name in the navbar component. thus the useAuthContext custom hook was imported. this hook gives us a user object. the object has a name property. we are going to use this imformation in out navbar component.
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

//importing icon
import { IoMdClose } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { AiOutlineTeam } from "react-icons/ai";
import { MdOutlineAccountCircle } from "react-icons/md";
import { RiMenu3Line } from "react-icons/ri";
import { GiMeal } from "react-icons/gi";
import { SiGoogleanalytics } from "react-icons/si";
import { HiOutlineAdjustments } from "react-icons/hi";
import { TiPointOfInterestOutline } from "react-icons/ti";

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { logout } = useLogout();
  const { user } = useAuthContext();

  //sidebar open button function for navigation drawer button
  const sidebarOpenHandler = () => {
    setSidebarOpen(true);
  };

  //sidebar close button function
  const sidebarCloseHandler = () => {
    setSidebarOpen(false);
  };
  const logoutHandler = () => {
    logout();
    sidebarCloseHandler();
  };
  return (
    <>
      <nav className="bg-blue-600 text-white sticky z-50 top-0 h-16 ">
        <ul className="flex flex-row mx-4 gap-4 py-4 lg:mx-32 items-center ">
          <li className="mr-auto">
            {/* <Link to="/">油食品</Link> */}
            <Link to="/" className="cursor-pointer">
              <TiPointOfInterestOutline className="text-3xl" />
            </Link>
          </li>
          {/* {user && <li>{user.displayName}</li>} */}
          {!user && (
            <>
              <li>
                <Link
                  className="hover:font-bold hover:text-blue-100"
                  to="/signup"
                >
                  Sign Up
                </Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </>
          )}
          {/* <li>
            <button onClick={logout}>Logout</button>
          </li> */}
          {user && (
            <li
              onClick={sidebarOpenHandler}
              className="cursor-pointer block w-8 h-8 items-center p-2"
            >
              <RiMenu3Line />
            </li>
          )}
        </ul>
      </nav>
      {/* {sidebarOpen && ( */}
      <>
        {sidebarOpen && (
          <div
            className={`bg-indigo-50 opacity-50 w-screen h-screen fixed z-50 top-0 left-0 ease-in-out duration-300`}
            onClick={sidebarCloseHandler}
          ></div>
        )}
        <div
          className={`${
            sidebarOpen ? "translate-x-0 " : "translate-x-full"
          } ease-in-out duration-300 ml-auto mr-0 bg-white shadow h-screen fixed z-50 right-0 top-0 w-80`}
        >
          {/* <div className="w-14"> */}
          <button
            className="py-4 h-16 px-4 flex w-full items-center"
            onClick={sidebarCloseHandler}
          >
            <IoMdClose />
          </button>
          {/* </div> */}
          <ul className="flex flex-col gap-2 p-4 w-xs">
            {user && (
              <>
                <li
                  // className="w-xs flex flex-row gap-2 items-center hover:text-blue-600 cursor-pointer"
                  onClick={sidebarCloseHandler}
                >
                  <Link
                    className="flex flex-row gap-2 items-center hover:text-blue-600 cursor-pointer"
                    to={`/${user.displayName.toLowerCase()}`}
                  >
                    <MdOutlineAccountCircle />
                    {user.displayName}
                  </Link>
                </li>
                <hr />
              </>
            )}
            <li onClick={sidebarCloseHandler}>
              <Link
                className="flex flex-row gap-2 items-center hover:text-blue-600 cursor-pointer"
                to="/guest-meal"
              >
                <AiOutlineTeam />
                Guest Meal
              </Link>
            </li>
            <hr />
            <li onClick={sidebarCloseHandler}>
              <Link
                className="flex flex-row gap-2 items-center hover:text-blue-600 cursor-pointer"
                to="/order-history"
              >
                <GiMeal />
                Order History
              </Link>
            </li>
            <hr />
            <li onClick={sidebarCloseHandler}>
              <Link
                className="flex flex-row gap-2 items-center hover:text-blue-600 cursor-pointer"
                to="/statement"
              >
                <MdOutlineAccountBalanceWallet />
                Statement
              </Link>
            </li>
            <hr />
            <li
              className="flex flex-row gap-2 items-center hover:text-blue-600 cursor-pointer"
              onClick={logoutHandler}
            >
              <MdLogout />
              Logout
            </li>
            <hr />
            <li onClick={sidebarCloseHandler}>
              <Link
                className="flex flex-row gap-2 items-center hover:text-blue-600 cursor-pointer"
                to="/meal-by-day"
              >
                <SiGoogleanalytics />
                Meal By Day
              </Link>
            </li>
            <hr />
            <li onClick={sidebarCloseHandler}>
              <Link
                className="flex flex-row gap-2 items-center hover:text-blue-600 cursor-pointer"
                to="/meal-factor"
              >
                <HiOutlineAdjustments />
                Meal Factor
              </Link>
            </li>
            <hr />
            <li onClick={sidebarCloseHandler}>
              <Link
                className="flex flex-row gap-2 items-center hover:text-blue-600 cursor-pointer"
                to="/expenses"
              >
                <HiCurrencyBangladeshi />
                Expenses
              </Link>
            </li>
          </ul>
        </div>
      </>
      {/* )} */}
    </>
  );
};

export default Navbar;
