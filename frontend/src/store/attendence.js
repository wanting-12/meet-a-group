import { csrfFetch } from "./csrf";

const GET = "attendence/allAttendees";
const STATUS = "attendee/getStatus";

// action creator: get all members
const get = (attendees) => {
  return {
    type: GET,
    attendees,
  };
};

const getStatus = (status) => {
  return {
    type: STATUS,
    status,
  };
};

// thunk: get all attendees by eventId
export const getAllAttendees = (eventId) => async (dispatch) => {
  const response = await fetch(`/api/events/${eventId}/attendees`);
  const attendees = await response.json();

  if (response.ok) {
    await dispatch(get(attendees.Attendees));
    console.log("all attent: in thunk", attendees.Attendees);
    return attendees.Attendees;
  } else {
    return attendees;
  }
};

// thunk: get current user's attendance status;
export const getAttendStatus = (eventId) => async (dispatch) => {
  console.log("eventId", eventId);
  const response = await csrfFetch(`/api/events/${eventId}/status`);
  console.log("responese: ----", response);
  if (response.ok) {
    const status = await response.json();
    console.log("status in thunk", status);
    await dispatch(getStatus(status));
  }
};

// thunk: request attendance for an event specified by id;
export const requestAttendance = (eventId) => async (dispatch) => {
  const response = await csrfFetch(`/api/events/${eventId}/attendance`, {
    method: "POST",
  });
  const attendee = await response.json();
  if (response.ok) {
    console.log("eeeee", attendee);
    await dispatch(getAllAttendees(eventId));
    return attendee;
  }
};

// thunk: change the status for specified group by id;
export const changeStatusThunk = (eventId, updates) => async (dispatch) => {
  const response = await csrfFetch(`/api/events/${eventId}/attendance`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
  });

  if (response.ok) {
    await dispatch(getAllAttendees(eventId));
  }
};

// thunk: delete membership to a group specified by id
export const deleteAttendanceThunk =
  (eventId, memberId) => async (dispatch) => {
    const response = await csrfFetch(`/api/events/${eventId}/attendance`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ memberId }),
    });

    if (response.ok) {
      await dispatch(getAllAttendees(eventId));
    }
  };

// reducer
const attendeeReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case GET:
      const allAttendees = {};
      action.attendees.forEach((attendee) => {
        allAttendees[attendee.id] = attendee;
      });
      newState = { ...state, allAttendees: allAttendees };
      return newState;
    case STATUS:
      newState = { ...state, status: action.status };
      console.log("agettting in reducer", newState);
      return newState;
    default:
      return state;
  }
};

export default attendeeReducer;
