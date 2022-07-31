import React from "react";
import { useState } from "react";

//import useSignup hook. then we will extract signup function from useSignup custom hoot. This function takes email and password and calls createUserWithEmailAndPassword method from firebase auth to sign up the user.
import { useSignup } from "../../hooks/useSignup";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  //extract the signup function from useSignup hook
  const { signup, isPending, error } = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();

    //use the signup method with the email and passowed to signup user
    signup(email, password, displayName);
  };

  return (
    <>
      <div className="max-w-xs mx-auto mt-8 flex flex-col gap-4 bg-white p-4 rounded shadow  text-sm">
        <h1 className="text-3xl font-bold">Sign Up</h1>
        <p className="text-slate-400">Please sign up to start ordering meal</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col">
            <span>Name</span>
            <input
              type="text"
              value={displayName}
              placeholder="Frank Abagnale"
              onChange={(e) => setDisplayName(e.target.value)}
              className="py-4 pl-2 border border-blue-600 rounded hover:border-blue-900 focus:border-blue-600"
            />
          </label>
          <label className="flex flex-col">
            <span>Email</span>
            <input
              type="email"
              value={email}
              placeholder="catchme@ifyoucan.com"
              onChange={(e) => setEmail(e.target.value)}
              className="py-4 pl-2 border border-blue-600 rounded hover:border-blue-900 focus:border-blue-600"
            />
          </label>
          <label className="flex flex-col">
            <span>Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="py-4 pl-2 border border-blue-600 rounded hover:border-blue-900 focus:border-blue-600"
            />
          </label>
          {!isPending && (
            <button className="bg-blue-600 text-white rounded py-4 hover:bg-blue-900">
              Submit
            </button>
          )}
          {isPending && (
            <button disabled className="bg-gray-600 text-white rounded py-4 ">
              loading...
            </button>
          )}
        </form>
      </div>
      {error && (
        <div className="max-w-xs mx-auto mt-8 flex flex-col gap-4 bg-red-600 text-white font-bold p-4 rounded shadow  text-sm">
          <p>{error}</p>
        </div>
      )}
    </>
  );
};

export default Signup;
