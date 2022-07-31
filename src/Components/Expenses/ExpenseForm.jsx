import React, { useState } from "react";

const ExpenseForm = ({ handleSubmit, initialState }) => {
  const [inputs, setInputs] = useState([initialState]);

  const addExpense = () => {
    setInputs([...inputs, { amount: 0, item: "" }]);
  };
  const handleInputsChange = (e, index) => {
    const { name, value } = e.target;
    const temp = [...inputs];
    temp[index][name] = value;
    setInputs(temp);
  };
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(inputs);
          setInputs([{ amount: 0, item: "" }]);
        }}
      >
        <div className="flex flex-col gap-4">
          {inputs.map((input, index) => {
            return (
              <div key={index}>
                <label className="flex flex-col" htmlFor="amount">
                  <p>Amount</p>

                  <input
                    type="text"
                    id="amount"
                    name="amount"
                    value={input.amount}
                    onChange={(e) => {
                      handleInputsChange(e, index);
                    }}
                    className="py-4 pl-2 border border-blue-600 rounded hover:border-blue-900 focus:border-blue-600"
                  />
                </label>
                <label className="flex flex-col" htmlFor="items">
                  <p>Items</p>

                  <input
                    type="text"
                    id="item"
                    name="item"
                    value={input.item}
                    onChange={(e) => {
                      handleInputsChange(e, index);
                    }}
                    className="py-4 pl-2 border border-blue-600 rounded hover:border-blue-900 focus:border-blue-600"
                  />
                </label>
              </div>
            );
          })}

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={(e) => {
                e.preventDefault();
                addExpense();
              }}
              className="bg-white border border-blue-600 text-blue-600 text-center py-4 w-full rounded shadow mt-4 hover:bg-blue-900 hover:text-white"
            >
              Add More
            </button>
            <button className="bg-blue-600 text-white text-center py-4 w-full rounded shadow mt-4 hover:bg-blue-900">
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default ExpenseForm;
