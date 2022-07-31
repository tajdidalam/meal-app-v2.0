import React from "react";
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useOrderGuestMeal = () => {
  const [guestBreakfast, setGuestBreakfast] = useState(0);
  const [guestLunch, setGuestLunch] = useState(0);
  const [guestSnacks, setGuestSnacks] = useState(0);
  const [guestDinner, setGuestDinner] = useState(0);
  const today = new Date();
  const [orderDate, setOrderDate] = useState(today);
  const { user } = useAuthContext();
  const setDate = (date) => {
    setOrderDate(date);
  };
  const OrderGuestBreakfastI = () => {
    setGuestBreakfast(guestBreakfast + 1);
  };
  const OrderGuestBreakfastD = () => {
    if (guestBreakfast > 0) {
      setGuestBreakfast(guestBreakfast - 1);
    }
  };
  const OrderGuestLunchI = () => {
    setGuestLunch(guestLunch + 1);
  };
  const OrderGuestLunchD = () => {
    if (guestLunch > 0) {
      setGuestLunch(guestLunch - 1);
    }
  };
  const OrderGuestSnacksI = () => {
    setGuestSnacks(guestSnacks + 1);
  };
  const OrderGuestSnacksD = () => {
    if (guestSnacks > 0) {
      setGuestSnacks(guestSnacks - 1);
    }
  };
  const OrderGuestDinnerI = () => {
    setGuestDinner(guestDinner + 1);
  };
  const OrderGuestDinnerD = () => {
    if (guestDinner > 0) {
      setGuestDinner(guestDinner - 1);
    }
  };

  const handleSubmit = () => {
    const guestMeal = {
      orderDate,
      guestBreakfast,
      guestLunch,
      guestSnacks,
      guestDinner,
      user: user.displayName,
    };
  };

  return {
    guestBreakfast,
    guestLunch,
    guestSnacks,
    guestDinner,
    OrderGuestBreakfastI,
    OrderGuestBreakfastD,
    OrderGuestLunchI,
    OrderGuestLunchD,
    OrderGuestSnacksI,
    OrderGuestSnacksD,
    OrderGuestDinnerI,
    OrderGuestDinnerD,
    handleSubmit,
    setDate,
    orderDate,
  };
};
