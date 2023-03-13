import React, { useContext } from "react";
import { SkyeWalletContext } from "../context/Context";
import { Link } from "react-router-dom";

const UserPage = () => {
  const { state } = useContext(SkyeWalletContext);
  const { name, email, phoneNumber, paymentId } = state;

  return (
    <div>
      <h2>Name : {name}</h2>
      <h4>
        <i>email : {email}</i>
      </h4>
      <h4>phoneNumber : {phoneNumber}</h4>

      <div>
        <h3>Payment Ids</h3>
        {paymentId.map((id, key) => (
          <h5 key={key}>{id}</h5>
        ))}
      </div>

      <p>
        y
        <Link className="link" to="/transactions">
          View transaction history
        </Link>
      </p>
    </div>
  );
};

export default UserPage;
