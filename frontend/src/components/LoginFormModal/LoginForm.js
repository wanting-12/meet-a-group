import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import "./LoginForm.css";
import { Redirect } from "react-router-dom";
// import SignupFormModal from "../SignupFormModal";
// import { Modal } from "../../context/Modal";

const LoginForm = ({ window, login, setLogin }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  // const [signup, setSignup] = useState(false);
  const [errors, setErrors] = useState([]);

  const [enterUsername, setEnterUsername] = useState(false);

  if (sessionUser) {
    return <Redirect to="/groups" />;
  }

  const getCredential = (e) => setCredential(e.target.value);
  const getPassword = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors([]);
    return dispatch(
      sessionActions.loginSession({ credential, password })
    ).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
  };

  return (
    <>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-form-header">
          <div className="login-form-icon">
            <i className="fa-solid fa-cannabis fa-xl" />
          </div>
          <h1 className="login-header-h1">Log in</h1>
          <p>
            Not a member yet?
            <span onClick={() => setLogin(false)} className="member-yet">
              {" "}
              Sign up
            </span>
          </p>
        </div>
        <label>
          Username or email
          <input
            type="text"
            value={credential}
            onChange={getCredential}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={getPassword}
            required
          />
          {errors.length > 0 && (
            <ul className="error-messages">
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
          )}
        </label>
        {/* <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul> */}
        <button
          className="login-form-button"
          type="submit"
          onClick={() => window.scrollTo(0, 0)}
        >
          Log in
        </button>
        <button
          className="login-form-button"
          type="submit"
          onClick={() => {
            setCredential("demo@user.io");
            setPassword("password");
            window.scrollTo(0, 0);
          }}
        >
          Demo user1
        </button>
        <button
          className="login-form-button"
          type="submit"
          onClick={() => {
            setCredential("user1@user.io");
            setPassword("password2");
            window.scrollTo(0, 0);
          }}
        >
          Demo user2
        </button>
      </form>
    </>
  );
};

export default LoginForm;
