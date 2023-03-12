import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import UserPage from "./pages/UserPage";
import Transactions from "./pages/Transactions";
import { LendsqrContext } from "./context/Context";

function App() {
  const { state } = useContext(LendsqrContext);
  const { loggedIn } = state;
  console.log(state);
  return (
    <Routes>
      <Route path="/" element={loggedIn ? <UserPage /> : <SigninPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/signin" element={<SigninPage />} />
      <Route path="/transactions" element={<Transactions />} />
    </Routes>
  );
}

export default App;
