import React, { useState, useEffect, useContext } from "react";
import { SkyeWalletContext } from "../context/Context";
import instance from "../Axios";
import { isInt32Array } from "util/types";

const Transactions = () => {
  const { state } = useContext(SkyeWalletContext);
  const { email, password } = state;

  const [list, setList] = useState([]);

  let data = {
    email,
    password,
  };

  useEffect(() => {
    instance
      .post("/user/getTransactions", data)
      .then((res) => {
        setList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      {list?.map((item, id) => {
        let { senderEmail, recieverEmail, recieverId, amount } = item;
        return (
          <div key={id}>{`${senderEmail} sent ${amount} to ${recieverId}`}</div>
        );
      })}
    </div>
  );
};

export default Transactions;
