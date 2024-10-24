import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import SignupForm from "./SignupForm";
import "./SignupForm.css";

function SignupFormModal({ prop, window }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {prop === "footerSignup" && (
        <button onClick={() => setShowModal(true)} className="source-link">
          Sign up
        </button>
      )}
      {!prop && (
        <button onClick={() => setShowModal(true)} className="signup-button">
          Sign up
        </button>
      )}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupForm window={window} />
        </Modal>
      )}
    </>
  );
}

export default SignupFormModal;
