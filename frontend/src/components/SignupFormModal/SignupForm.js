import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./SignupForm.css";

const checkValidName = (name) => {
  // console.log(name.split("").filter((el) => !isNaN(el)))
  return name.split("").filter((el) => !isNaN(el)).length > 0;
};

const SignupForm = ({ window, setLogin }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [submit, setSubmit] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const newErrors = {};

    if (firstName && checkValidName(firstName))
      newErrors.validFirstName = "Please provide a valid first name";
    if (lastName && checkValidName(lastName))
      newErrors.validLastName = "Please provide a valid last name";
    // if (firstName && firstName.length === 0)
    //   newErrors.firstName = "Please provide a first name";
    // if (lastName && lastName?.length === 0)
    //   newErrors.lastName = "Please provide a last name";
    // if (email && email.length === 0)
    //   newErrors.email = "Please provide an email";
    // if (username && username.length === 0)
    //   newErrors.username = "Please provide an username";
    if (
      (username && email && username === email) ||
      username.split("").includes("@")
    )
      newErrors.same = "Username cannot be an email";

    // if (password && password.length === 0)
    //   newErrors.password = "Please set your password";
    // if (confirm && confirm.length === 0)
    //   newErrors.confirm = "Please confirm your password";
    if (password && confirm && password !== confirm)
      newErrors.samePw = "Please enter the same password";
    if (password && password.length < 6)
      newErrors.password = "Password must be 6 characters or more.";
    if (email && !email.split("").includes("@"))
      newErrors.validEmail = "Please provide a valid email.";
    if (username && username.length < 6)
      newErrors.validUsername = "Username needs to be 6 characters or more";

    setSubmit(false);
    setErrors(newErrors);
  }, [firstName, lastName, username, email, password, confirm]);

  if (sessionUser) return history.push("/");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmit(true);

    const payload = {
      firstName,
      lastName,
      username,
      email,
      password,
    };

    // console.log("goin first");
    // if (confirm !== password) {
    //   return setErrors(["Please enter the same password."]);
    // }

    // setErrors([]);
    // dispatch(sessionActions.signup(payload));
    return dispatch(sessionActions.signup(payload)).catch(async (res) => {
      const data = await res.json();
      // console.log(data.errors);
      if (data && data.errors) {
        setErrors(data.errors);
      }
    });
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <div className="signup-form-header">
        <h1 className="signup-header-h1">Sign up</h1>
        <p>
          Already a member?
          <span onClick={() => setLogin(true)} className="member-yet">
            {" "}
            Login
          </span>
        </p>
      </div>
      <div className="signup-form-body">
        <label>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            // onClick={() => setEnterFirstName(true)}
            required
          />
        </label>
        {errors.validFirstName && (
          <p className="error-detail-signup-form">{errors.validFirstName}</p>
        )}
        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        {errors.validLastName && (
          <p className="error-detail-signup-form">{errors.validLastName}</p>
        )}
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && (
          <p className="error-detail-signup-form">{errors.email}</p>
        )}
        {errors.validEmail && (
          <p className="error-detail-signup-form">{errors.validEmail}</p>
        )}
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {/* {errors.username && (
          <p className="error-detail-signup-form">{errors.username}</p>
        )} */}
        {errors.same && (
          <p className="error-detail-signup-form">{errors.same}</p>
        )}
        {errors.validUsername && (
          <p className="error-detail-signup-form">{errors.validUsername}</p>
        )}
        {submit && errors.validUsername && (
          <p className="error-detail-signup-form">{errors.validUsername}</p>
        )}
        {errors.username && (
          <p className="error-detail-signup-form">{errors.username}</p>
        )}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && (
          <p className="error-detail-signup-form">{errors.password}</p>
        )}
        {/* {submit && errors.password && (
          <p className="error-detail-signup-form">{errors.password}</p>
        )} */}
        <label>
          Confirm Password
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
        </label>
        {/* {errors.confirm && (
          <p className="error-detail-signup-form">{errors.confirm}</p>
        )} */}
        {errors.samePw && (
          <p className="error-detail-signup-form">{errors.samePw}</p>
        )}
        <button
          className="signup-form-button"
          type="submit"
          onClick={() => window.scrollTo(0, 0)}
        >
          Sign Up
        </button>
      </div>
    </form>
  );
};

export default SignupForm;
