import { csrfFetch } from "./csrf";

const LOAD = "user/loadSession";
const REMOVE = "user/removeSession";

// regular action creator returning the current user information
const load = (user) => {
  return {
    type: LOAD,
    user,
  };
};

const remove = () => {
  return {
    type: REMOVE,
  };
};

// thunk action for login;
export const loginSession = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch("/api/session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      credential,
      password,
    }),
  });

  if (response.ok) {
    const user = await response.json();
    dispatch(load(user));
    return response;
  }
};

// thunk action for restoring current user session;
export const restoreUser = () => async (dispatch) => {
  const response = await fetch("/api/session");

  if (response.ok) {
    const user = await response.json();
    dispatch(load(user));
    return response;
  }
};

// thunk action for signing up a new user
export const signup = (user) => async (dispatch) => {
  const { firstName, lastName, email, username, password } = user;
  const response = await csrfFetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      username,
      password,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(load(data));
    return response;
  }
};

// thunk action for logout a user
export const logout = () => async (dispatch) => {
  const response = await csrfFetch("/api/session", {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(remove());
    return response;
  }
};

// define the initial state
const initialState = { user: null };

// define the session reducer;
const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case LOAD:
      newState = { ...state };
      newState.user = action.user;
      return newState;
    case REMOVE:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;
