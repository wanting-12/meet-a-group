import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./SignupFormPage.css";

const SignupFormPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState({});
  console.log("ddddd");

  useEffect(() => {
    const newErrors = {};
    if (firstName?.length === 0)
      newErrors.firstName = "Please provide a first name";
    if (lastName?.length === 0)
      newErrors.lastName = "Please provide a last name";
    if (email.length === 0) newErrors.email = "Please provide an email";
    if (username.length === 0)
      newErrors.noUsername = "Please provide an username";
    if (username === email) newErrors.same = "Username cannot be an email";
    if (password?.length === 0) newErrors.password = "Please set your password";
    if (confirm?.length === 0)
      newErrors.confirm = "Please confirm your password";
    if (password !== confirm)
      newErrors.samePw = "Please enter the same password";
    if (password.length < 6)
      newErrors.password = "Password must be 6 characters or more.";

    setErrors(newErrors);
  }, [firstName, lastName, username, email, password, confirm]);

  console.log("errors", errors);
  if (sessionUser) return history.push("/");
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      firstName,
      lastName,
      username,
      email,
      password,
    };

    // if (confirm !== password) {
    //   return setErrors(["Please enter the same password."]);
    // }

    // setErrors([]);
    return dispatch(sessionActions.signup(payload)).catch(async (res) => {
      const data = await res.json();
      console.log("errors", data.errors);
      if (data && data.errors) setErrors(data.errors);
    });
  };

  console.log("user ddd", errors.email);

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      {/* {errors.length > 0 && (
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
      )} */}
      <div className="signup-form-header">
        <h1 className="signup-header-h1">Finish signing up</h1>
      </div>
      <div className="signup-form-body">
        {/* <div className="body-name"> */}
        <label>
          First Name
          <input
            type="text"
            // placeholder="Username or Email"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        {errors.firstName && (
          <p className="error-detail-signup-form">{errors.firstName}</p>
        )}
        {/* </div> */}
        <label>
          Last Name
          <input
            type="text"
            // placeholder="Username or Email"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        {errors.lastName && (
          <p className="error-detail-signup-form">{errors.lastName}</p>
        )}
        <label>
          Email
          <input
            type="text"
            // placeholder="Username or Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && (
          <p className="error-detail-signup-form">{errors.email}</p>
        )}
        <label>
          Username
          <input
            type="text"
            // placeholder="Username or Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {errors.username && (
          <p className="error-detail-signup-form">{errors.username}</p>
        )}
        {errors.noUsername && (
          <p className="error-detail-signup-form">{errors.noUsername}</p>
        )}
        {errors.same && (
          <p className="error-detail-signup-form">{errors.same}</p>
        )}
        <label>
          Password
          <input
            type="password"
            // placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && (
          <p className="error-detail-signup-form">{errors.password}</p>
        )}
        <label>
          Confirm Password
          <input
            type="password"
            // placeholder="Password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
        </label>
        {errors.confirm && (
          <p className="error-detail-signup-form">{errors.confirm}</p>
        )}
        {errors.samePw && (
          <p className="error-detail-signup-form">{errors.samePw}</p>
        )}
        <button className="signup-form-button" type="submit">
          Sign Up
        </button>
      </div>
    </form>
  );
};

export default SignupFormPage;
