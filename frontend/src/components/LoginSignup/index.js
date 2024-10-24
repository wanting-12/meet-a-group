import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import LoginForm from "../LoginFormModal/LoginForm";
import SignupForm from "../SignupFormModal/SignupForm";

export default function LoginSignup({ window, newGroup }) {
  const [showModal, setShowModal] = useState(false);
  const [login, setLogin] = useState(false);

  return (
    <>
      {newGroup === "newGroup" && (
        <button
          onClick={() => {
            setShowModal(true);
            setLogin(true);
          }}
          className="start-new-group"
        >
          Start a new group
        </button>
      )}

      {newGroup === "newGroupHome" && (
        <button
          onClick={() => {
            setShowModal(true);
            setLogin(true);
          }}
          className="start-new-group-home"
        >
          Start a new group
        </button>
      )}

      {newGroup === "home-login" && (
        <button
          onClick={() => {
            setShowModal(true);
            setLogin(true);
          }}
          className="join-meetagroup"
        >
          Join MeetaGroup
        </button>
      )}

      {newGroup === "footerLogin" && (
        <button
          onClick={() => {
            setShowModal(true);
            setLogin(true);
          }}
          className="source-link"
        >
          Log in
        </button>
      )}

      {newGroup === "getStarted" && (
        <button
          onClick={() => {
            setShowModal(true);
            setLogin(true);
          }}
          className="get-started"
        >
          Get Started
        </button>
      )}

      {newGroup === "footerSignup" && (
        <button
          onClick={() => {
            setShowModal(true);
            setLogin(false);
          }}
          className="source-link"
        >
          Sign up
        </button>
      )}
      {!newGroup && (
        <>
          <button
            onClick={() => {
              setShowModal(true);
              setLogin(true);
            }}
            className="login-button"
          >
            Log in
          </button>
          <button
            onClick={() => {
              setShowModal(true);
              setLogin(false);
            }}
            className="login-button"
          >
            Sign up
          </button>
        </>
      )}

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          {login ? (
            <LoginForm window={window} login={login} setLogin={setLogin} />
          ) : (
            <SignupForm window={window} login={login} setLogin={setLogin} />
          )}
        </Modal>
      )}
    </>
  );
}
