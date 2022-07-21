import React, { useState } from "react";
import Datecard from "./Datecard";
import MealItem from "./MealItem";

const OrderMeal = () => {
  const [mealDate, setMealDate] = useState(new Date());
  const [enabled, setEnabled] = useState(false);
  const mealName = "Breakfast";

  const onDateSelect = (date) => {
    setMealDate(date);
  };

  const setMealItem = (mealName) => {
    setEnabled(!enabled);
  };
  return (
    <>
      <Datecard onDateSelect={onDateSelect} />
      <MealItem
        mealName={mealName}
        enabled={enabled}
        setMealItem={setMealItem}
      />
    </>
  );
};

export default OrderMeal;
