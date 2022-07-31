import React, { useEffect, useState } from "react";

const ShowExpensesData = ({ data, date }) => {
  const [dataToShow, setDataToShow] = useState(data);

  useEffect(() => {
    setDataToShow(data);
  }, [data]);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let x = 0;
  if (dataToShow && dataToShow !== "") {
    let tempTotal = 0.0;
    Object.keys(dataToShow).map((key, index) => {
      if (dataToShow[key].amount) {
        tempTotal += parseFloat(dataToShow[key].amount);
      }
    });

    x = tempTotal;
  }

  return (
    <>
      {dataToShow && dataToShow !== "" && (
        <div className="mt-4 md:mt-8 flex flex-col gap-4   text-sm md:max-w-full">
          <h3 className="text-center text-xl">
            {monthNames[date.getMonth()]} {date.getDate()}, {date.getFullYear()}
          </h3>
          <hr />

          {Object.keys(dataToShow).map((key, index) => {
            return (
              <div className="flex flex-row justify-between px-4" key={index}>
                <p>{dataToShow[key].item}</p>
                {dataToShow[key].amount && (
                  <p>
                    <span className="pr-2">&#2547;</span>
                    {new Intl.NumberFormat("en-IN", {
                      maximumSignificantDigits: 3,
                    }).format(dataToShow[key].amount)}
                  </p>
                )}
              </div>
            );
          })}
          <hr />
          <div className="flex flex-row justify-between px-4">
            <p>Total</p>
            <p>
              <span className="pr-2">&#2547;</span>
              {new Intl.NumberFormat("en-IN", {
                maximumSignificantDigits: 3,
              }).format(x)}
            </p>
          </div>
        </div>
      )}
      {!dataToShow && (
        <div className="mt-4 md:mt-8 flex flex-col gap-4   text-sm md:max-w-full">
          <h3 className="text-center text-xl">
            {monthNames[date.getMonth()]} {date.getDate()}, {date.getFullYear()}
          </h3>
          <hr />
          <p className="text-center">No expense data for this date</p>
        </div>
      )}
    </>
  );
};

export default ShowExpensesData;
