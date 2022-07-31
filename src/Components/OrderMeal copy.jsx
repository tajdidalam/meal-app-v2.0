import React, { useEffect, useState } from "react";

const OrderMeal = ({ mealName, handleMeal, initialState }) => {
  const [checked, setChecked] = useState(false);
  let property = 1;

  const handleToggle = () => {
    setChecked(!checked);
    console.log("toggled");
  };
  useEffect(() => {
    if (initialState) {
      if (initialState === 1) {
        console.log(initialState);
        setChecked(true);
      } else {
        console.log(initialState);
        setChecked(false);
      }
    }
  }, [initialState]);
  console.log("the value of checked is now", checked);

  return (
    <div className="flex flex-row justify-between items-center">
      <p>{mealName}</p>
      <div className="form-control">
        <label className="label cursor-pointer">
          <input
            type="checkbox"
            className="toggle toggle-primary checked:bg-blue-600"
            onClick={handleMeal}
            // onClick={() => {
            //   handleMeal();
            //   handleToggle();
            // }}
            onChange={handleToggle}
            checked={checked}
          />
        </label>
      </div>
    </div>
  );
};

export default OrderMeal;
