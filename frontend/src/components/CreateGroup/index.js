// import { nanoid } from 'nanoid';
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import GroupForm from "./GroupForm";
import React from "react";

const CreateGroup = () => {
  const currUser = useSelector((state) => state.session.user);

  if (currUser === null) {
    return <Redirect to="/" />;
  }
  const group = {
    organizerId: currUser.id,
    name: "",
    about: "",
    type: "",
    private: "",
    city: "",
    state: "",
  };
  return <GroupForm group={group} formType="Create Group" />;
};

export default CreateGroup;
