import React, { useState, useEffect } from "react";

import { db } from "../../firebase/config";

//date picker component from mui
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";

///

import { useMealFactorUpdate } from "../../hooks/useMealFactorUpdate";

const MealWeightForm = () => {
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
  const { updateData, state } = useMealFactorUpdate();
  const [value, setValue] = useState(new Date());
  const [breakfastFactor, setBreakfastFactor] = useState(0.5);
  const [lunchFactor, setLunchFactor] = useState(1);
  const [snacksFactor, setSnacksFactor] = useState(0.5);
  const [dinnerFactor, setDinnerFactor] = useState(1);
  const [breakfastMenu, setBreakfastMenu] = useState("");
  const [lunchMenu, setLunchMenu] = useState("");
  const [snacksMenu, setSnacksMenu] = useState("");
  const [dinnerMenu, setDinnerMenu] = useState("");
  const [xbreakfastFactor, setXBreakfastFactor] = useState(0.5);
  const [xlunchFactor, setXLunchFactor] = useState(1);
  const [xsnacksFactor, setXSnacksFactor] = useState(0.5);
  const [xdinnerFactor, setXDinnerFactor] = useState(1);
  const [xbreakfastMenu, setXBreakfastMenu] = useState("");
  const [xlunchMenu, setXLunchMenu] = useState("");
  const [xsnacksMenu, setXSnacksMenu] = useState("");
  const [xdinnerMenu, setXDinnerMenu] = useState("");
  const [sameForAll, setSameForAll] = useState(false);
  const [withoutBeafSpecial, setWithoutBeafSpecial] = useState(false);
  const [beafUser, setBeafUser] = useState(null);
  const [noBeafUser, setNoBeafUser] = useState(null);

  console.log("same for all: ", sameForAll);
  console.log("without beaf special: ", withoutBeafSpecial);
  const docName = `${value.getFullYear()}-${
    value.getMonth() + 1
  }-${value.getDate()}`;
  const mealFactorData = {
    date: value,
    breakfastFactor: parseFloat(breakfastFactor),
    lunchFactor: parseFloat(lunchFactor),
    snacksFactor: parseFloat(snacksFactor),
    dinnerFactor: parseFloat(dinnerFactor),
    breakfastMenu,
    lunchMenu,
    snacksMenu,
    dinnerMenu,
  };
  const withoutBeafMealFactorData = {
    date: value,
    breakfastFactor: parseFloat(xbreakfastFactor),
    lunchFactor: parseFloat(xlunchFactor),
    snacksFactor: parseFloat(xsnacksFactor),
    dinnerFactor: parseFloat(xdinnerFactor),
    breakfastMenu: xbreakfastMenu,
    lunchMenu: xlunchMenu,
    snacksMenu: xsnacksMenu,
    dinnerMenu: xdinnerMenu,
  };
  console.log(docName);
  // const docRef = db.collection("factor").doc(docName);
  const docRef = db
    .collection("factor")
    .doc(`${value.getFullYear()}`)
    .collection(`${monthNames[value.getMonth()]}`)
    .doc(`${value.getDate()}`);
  //   console.log(mealFactorData);

  const handleSubmit = (e) => {
    e.preventDefault();
    // const returnRef = docRef.set(mealFactorData);
    // updateData(docRef, mealFactorData); ***************************
    // const documentReference = db
    //   .collection(`${value.getFullYear()}`)
    //   .doc(`${monthNames[value.getMonth()]}`)
    //   .collection(beaf[0])
    //   .doc(`${value.getDate()}`);

    // updateData(documentReference, mealFactorData);

    // updating the doc for every user based on meal type

    if (!sameForAll && !withoutBeafSpecial) {
      beafUser.forEach((user) => {
        db.collection(`${value.getFullYear()}`)
          .doc(`${monthNames[value.getMonth()]}`)
          .collection(`${user}`)
          .doc(`${value.getDate()}`)
          .set({ ...mealFactorData }, { merge: true })
          .then(() => {
            console.log("Document successfully updated!");
          })
          .catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
          });
      });
      console.log("saaassss");
      noBeafUser.forEach((user) => {
        db.collection(`${value.getFullYear()}`)
          .doc(`${monthNames[value.getMonth()]}`)
          .collection(`${user}`)
          .doc(`${value.getDate()}`)
          .set({ ...mealFactorData }, { merge: true })
          .then(() => {
            console.log("Document successfully updated!");
          })
          .catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
          });
      });
    }

    if (sameForAll) {
      beafUser.forEach((user) => {
        db.collection(`${value.getFullYear()}`)
          .doc(`${monthNames[value.getMonth()]}`)
          .collection(`${user}`)
          .doc(`${value.getDate()}`)
          .set({ ...mealFactorData }, { merge: true })
          .then(() => {
            console.log("Document successfully updated!");
          })
          .catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
          });
      });
      console.log("saaassss");
      noBeafUser.forEach((user) => {
        db.collection(`${value.getFullYear()}`)
          .doc(`${monthNames[value.getMonth()]}`)
          .collection(`${user}`)
          .doc(`${value.getDate()}`)
          .set({ ...mealFactorData }, { merge: true })
          .then(() => {
            console.log("Document successfully updated!");
          })
          .catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
          });
      });
    } else if (withoutBeafSpecial) {
      beafUser.forEach((user) => {
        const ref = db
          .collection(`${value.getFullYear()}`)
          .doc(`${monthNames[value.getMonth()]}`)
          .collection(`${user}`)
          .doc(`${value.getDate()}`);

        if (ref) {
          ref
            .set({ ...mealFactorData }, { merge: true })
            .then(() => {
              console.log("Document successfully updated!");
            })
            .catch((error) => {
              // The document probably doesn't exist.
              console.error("Error updating document: ", error);
            });
          console.log("xxxxxxxxxxxxxx");
        }
      });
      noBeafUser.forEach((user) => {
        const ref = db
          .collection(`${value.getFullYear()}`)
          .doc(`${monthNames[value.getMonth()]}`)
          .collection(`${user}`)
          .doc(`${value.getDate()}`);

        if (ref) {
          ref
            .set({ ...withoutBeafMealFactorData }, { merge: true })
            .then(() => {
              console.log("Document successfully updated!");
            })
            .catch((error) => {
              // The document probably doesn't exist.
              console.error("Error updating document: ", error);
            });
          console.log("yyyyyyyy");
        }
      });
      console.log(mealFactorData);
      console.log(withoutBeafMealFactorData);
    }
  };

  let date = "";
  if (state.document) {
    date = new Date(state.document.date.toDate()).toDateString();
    console.log(date);
  }

  let beaf = [];
  let nobeaf = [];
  useEffect(() => {
    db.collection("user")
      .doc("user")
      .collection("beaf")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, " => ", doc.data());
          if (!beaf.includes(doc.id)) {
            beaf.push(doc.id);
          }
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
    db.collection("user")
      .doc("user")
      .collection("no-beaf")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, " => ", doc.data());
          if (!nobeaf.includes(doc.id)) {
            nobeaf.push(doc.id);
          }
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
    console.log(beaf);
    console.log(nobeaf);
    setBeafUser(beaf);
    setNoBeafUser(nobeaf);
  }, []);

  console.log("beaf: ", beaf);
  console.log("nobeaf: ", nobeaf);
  console.log("Beaf user: ", beafUser);
  console.log("No Beaf User: ", noBeafUser);

  return (
    <>
      <div className="mx-4 gap-4 py-4 lg:mx-32">
        <div className="md:grid gap-8 md:grid-cols-2">
          <div>
            <div className="mt-4 md:mt-8 flex flex-col gap-4 bg-white p-4 rounded shadow  text-sm md:max-w-full">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <StaticDatePicker
                  displayStaticWrapperAs="desktop"
                  openTo="day"
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
            {/* <div className="md:grid gap-8 md:grid-cols-2"> */}
            <div className="mt-4 md:mt-8 flex flex-col gap-4 bg-white p-4 rounded shadow  text-sm md:max-w-full">
              <h3 className="text-center text-xl">Updated Meal Factor</h3>
              <hr />

              <div className="flex flex-row justify-between px-4">
                <p>Date</p>
                <p>
                  {state.document &&
                    state.document.date.toDate().toDateString()}
                </p>
              </div>
              <hr />
              <div className="flex flex-row justify-between px-4">
                <p>Breakfast</p>
                <p>{state.document && state.document.breakfastFactor}</p>
              </div>
              <hr />
              <div className="flex flex-row justify-between px-4">
                <p>Lunch</p>
                <p>{state.document && state.document.lunchFactor}</p>
              </div>
              <hr />
              <div className="flex flex-row justify-between px-4">
                <p>Snacks</p>
                <p>{state.document && state.document.snacksFactor}</p>
              </div>
              <hr />
              <div className="flex flex-row justify-between px-4">
                <p>Dinner</p>
                <p>{state.document && state.document.dinnerFactor}</p>
              </div>
            </div>
            {/* </div> */}
          </div>

          <div className="mt-4 md:mt-8 flex flex-col gap-4 bg-white p-4 rounded shadow h-fit  text-sm md:max-w-full">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <label className="flex flex-col" htmlFor="breakfast">
                <p>Breakfast</p>
                <div className="grid grid-cols-5 gap-4">
                  <input
                    type="text"
                    id="breakfast"
                    name="breakfast"
                    value={breakfastFactor}
                    onChange={(e) => setBreakfastFactor(e.target.value)}
                    className="py-4 pl-2 border border-blue-600 rounded hover:border-blue-900 focus:border-blue-600"
                  />
                  <input
                    type="text"
                    id="breakfast"
                    name="breakfastMenu"
                    placeholder="menu"
                    onChange={(e) => setBreakfastMenu(e.target.value)}
                    className="py-4 col-span-4 pl-2 border border-blue-600 rounded hover:border-blue-900 focus:border-blue-600"
                  />
                </div>
              </label>
              <label className="flex flex-col" htmlFor="breakfast">
                <p>Lunch</p>
                <div className="grid grid-cols-5 gap-4">
                  <input
                    type="text"
                    id="lunch"
                    name="lunch"
                    value={lunchFactor}
                    onChange={(e) => setLunchFactor(e.target.value)}
                    className="py-4 pl-2 border border-blue-600 rounded hover:border-blue-900 focus:border-blue-600"
                  />
                  <input
                    type="text"
                    id="lunch"
                    name="lunchMenu"
                    placeholder="menu"
                    onChange={(e) => setLunchMenu(e.target.value)}
                    className="py-4 col-span-4 pl-2 border border-blue-600 rounded hover:border-blue-900 focus:border-blue-600"
                  />
                </div>
              </label>
              <label className="flex flex-col" htmlFor="snacks">
                <p>Snacks</p>
                <div className="grid grid-cols-5 gap-4">
                  <input
                    type="text"
                    id="snacks"
                    name="snacks"
                    value={snacksFactor}
                    onChange={(e) => setSnacksFactor(e.target.value)}
                    className="py-4 pl-2 border border-blue-600 rounded hover:border-blue-900 focus:border-blue-600"
                  />
                  <input
                    type="text"
                    id="snacks"
                    name="snacksMenu"
                    placeholder="menu"
                    onChange={(e) => setSnacksMenu(e.target.value)}
                    className="py-4 col-span-4 pl-2 border border-blue-600 rounded hover:border-blue-900 focus:border-blue-600"
                  />
                </div>
              </label>
              <label className="flex flex-col" htmlFor="dinner">
                <p>Dinner</p>
                <div className="grid grid-cols-5 gap-4">
                  <input
                    type="text"
                    id="dinner"
                    name="dinner"
                    value={dinnerFactor}
                    onChange={(e) => setDinnerFactor(e.target.value)}
                    className="py-4 pl-2 border border-blue-600 rounded hover:border-blue-900 focus:border-blue-600"
                  />
                  <input
                    type="text"
                    id="dinner"
                    name="dinnerMenu"
                    placeholder="menu"
                    onChange={(e) => setDinnerMenu(e.target.value)}
                    className="py-4 col-span-4 pl-2 border border-blue-600 rounded hover:border-blue-900 focus:border-blue-600"
                  />
                </div>
              </label>
              {withoutBeafSpecial && (
                <div>
                  <hr />
                  <h3 className="text-xl py-4">
                    Without Beaf Meal Special Meal Factor
                  </h3>
                  <label className="flex flex-col" htmlFor="xbreakfast">
                    <p>Breakfast</p>
                    <div className="grid grid-cols-5 gap-4">
                      <input
                        type="text"
                        id="xbreakfast"
                        name="xbreakfast"
                        value={xbreakfastFactor}
                        onChange={(e) => setXBreakfastFactor(e.target.value)}
                        className="py-4 pl-2 border border-blue-600 rounded hover:border-blue-900 focus:border-blue-600"
                      />
                      <input
                        type="text"
                        id="xbreakfast"
                        name="xbreakfastMenu"
                        placeholder="menu"
                        onChange={(e) => setXBreakfastMenu(e.target.value)}
                        className="py-4 col-span-4 pl-2 border border-blue-600 rounded hover:border-blue-900 focus:border-blue-600"
                      />
                    </div>
                  </label>
                  <label className="flex flex-col" htmlFor="xlunch">
                    <p>Lunch</p>
                    <div className="grid grid-cols-5 gap-4">
                      <input
                        type="text"
                        id="xlunch"
                        name="xlunch"
                        value={xlunchFactor}
                        onChange={(e) => setXLunchFactor(e.target.value)}
                        className="py-4 pl-2 border border-blue-600 rounded hover:border-blue-900 focus:border-blue-600"
                      />
                      <input
                        type="text"
                        id="xlunch"
                        name="xlunchMenu"
                        placeholder="menu"
                        onChange={(e) => setXLunchMenu(e.target.value)}
                        className="py-4 col-span-4 pl-2 border border-blue-600 rounded hover:border-blue-900 focus:border-blue-600"
                      />
                    </div>
                  </label>
                  <label className="flex flex-col" htmlFor="xsnacks">
                    <p>Snacks</p>
                    <div className="grid grid-cols-5 gap-4">
                      <input
                        type="text"
                        id="xsnacks"
                        name="xsnacks"
                        value={xsnacksFactor}
                        onChange={(e) => setXSnacksFactor(e.target.value)}
                        className="py-4 pl-2 border border-blue-600 rounded hover:border-blue-900 focus:border-blue-600"
                      />
                      <input
                        type="text"
                        id="xsnacks"
                        name="xsnacksMenu"
                        placeholder="menu"
                        onChange={(e) => setXSnacksMenu(e.target.value)}
                        className="py-4 col-span-4 pl-2 border border-blue-600 rounded hover:border-blue-900 focus:border-blue-600"
                      />
                    </div>
                  </label>
                  <label className="flex flex-col" htmlFor="xdinner">
                    <p>Dinner</p>
                    <div className="grid grid-cols-5 gap-4">
                      <input
                        type="text"
                        id="xdinner"
                        name="xdinner"
                        value={xdinnerFactor}
                        onChange={(e) => setXDinnerFactor(e.target.value)}
                        className="py-4 pl-2 border border-blue-600 rounded hover:border-blue-900 focus:border-blue-600"
                      />
                      <input
                        type="text"
                        id="xdinner"
                        name="xdinnerMenu"
                        placeholder="menu"
                        onChange={(e) => setXDinnerMenu(e.target.value)}
                        className="py-4 col-span-4 pl-2 border border-blue-600 rounded hover:border-blue-900 focus:border-blue-600"
                      />
                    </div>
                  </label>
                </div>
              )}
              {!withoutBeafSpecial && (
                <label className="flex flex-row" htmlFor="beaf-meal">
                  {/* <div className="grid grid-cols-5 gap-4"> */}
                  <input
                    type="checkbox"
                    name="same-for-all"
                    id="same-for-app"
                    className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                    onChange={() => setSameForAll(!sameForAll)}
                  />
                  <span className="pl-4">Same for all</span>
                  {/* </div>s */}
                </label>
              )}
              {!sameForAll && (
                <label className="flex flex-row" htmlFor="beaf-meal">
                  {/* <div className="grid grid-cols-5 gap-4"> */}
                  <input
                    type="checkbox"
                    name="without-beaf-special"
                    id="without-beaf-special"
                    className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                    onChange={() => setWithoutBeafSpecial(!withoutBeafSpecial)}
                  />
                  <span className="pl-4">Without beaf special</span>
                  {/* </div>s */}
                </label>
              )}

              <button className="bg-blue-600 text-white rounded py-4 hover:bg-blue-900">
                Submit
              </button>
            </form>
          </div>
        </div>
        {/* ///// */}
      </div>
    </>
  );
};

export default MealWeightForm;
