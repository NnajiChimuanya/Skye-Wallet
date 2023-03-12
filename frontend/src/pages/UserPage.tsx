import React, { useState, useContext, useEffect } from "react";
import { LendsqrContext } from "../context/Context";

const UserPage = () => {
  const { state } = useContext(LendsqrContext);
  const { loggedIn } = state;
  console.log(loggedIn);

  return <div>Heyyyyyyyyyyyyyyy</div>;
};

export default UserPage;
