import React, { useState, useContext } from "react";
import { LendsqrContext } from "../context/Context";
import { Link, useNavigate } from "react-router-dom";
import instance from "../Axios";

const SigninPage = () => {
  const { state, dispatch } = useContext(LendsqrContext);
  const [email, setEmail] = useState<string | number>("");
  const [password, setPassword] = useState<string | number>("");
  const [showPassword, setShowPassword] =
    useState<React.SetStateAction<boolean>>(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  //Sending the request
  const handleLogin = (e: React.ChangeEvent<any>) => {
    e.preventDefault();
  };

  return (
    <div className="login">
      <h2>Signin</h2>
      {errorMessage && (
        <div className="main-paragraph">
          <p style={{ color: "red" }}>{errorMessage}</p>
        </div>
      )}
      <div className="form-container">
        <form className="form">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="email"
            type={"text"}
            placeholder="Email"
          />

          <div className="password-container">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              className="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
            />
            <div className="toggle" onClick={togglePassword}>
              SHOW
            </div>
          </div>

          <p>
            Don't have an account?
            <Link className="link" to="/signup">
              Sign up
            </Link>
          </p>

          <button
            onClick={(e: React.ChangeEvent<any>) => {
              dispatch({ type: "SET_LOGIN", payload: true });
            }}
            className="button"
          >
            LOG IN
          </button>
        </form>
      </div>
    </div>
  );
};

export default SigninPage;
