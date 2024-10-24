import { getAllAttendees, requestAttendance } from "./attendence";
import { csrfFetch } from "./csrf";
import { createEventImage } from "./image";

export const LOAD_EVENTS = "events/getEvents";
export const LOAD_ONE = "events/getOneEvent";
export const CREATE_EVENT = "events/createEvent";
export const REMOVE_EVENT = "events/removeEvent";
export const EDIT = "events/editEvent";
export const LOAD_ONE_GROUP = "events/getEventsByGroup";

const load = (events) => {
  return {
    type: LOAD_EVENTS,
    events,
  };
};

// load group by id
const loadOne = (event) => {
  return {
    type: LOAD_ONE,
    event,
  };
};

// create a group
const create = (event) => {
  return {
    type: CREATE_EVENT,
    event,
  };
};

// remove a group by id
const remove = (eventId) => {
  return {
    type: REMOVE_EVENT,
    eventId,
  };
};

// edit a group
const edit = (event) => {
  return {
    type: EDIT,
    event,
  };
};

// get all events thunk
export const getEvents = () => async (dispatch) => {
  const response = await fetch("/api/events");

  if (response.ok) {
    const events = await response.json();
    dispatch(load(events.Events));
    return events;
  }
};

// thunk: loading all groups with filter;
export const getSearchEvents = (keywords, location) => async (dispatch) => {
  const response = await fetch("/api/events/");

  if (response.ok) {
    const events = await response.json();

    let searchResult = events.Events.filter((event) => {
      if (keywords.length > 0 && location.length > 0) {
        return (
          event.name
            .toLowerCase()
            .split(/([_\W])/)
            .includes(keywords.toLowerCase()) &&
          event.Venue.city.toLowerCase() === location.toLowerCase()
        );
      } else if (keywords.length > 0) {
        return event.name
          .toLowerCase()
          .split(/([_\W])/)
          .includes(keywords.toLowerCase());
      } else if (location.length > 0) {
        return event.Venue.city.toLowerCase() === location.toLowerCase();
      } else {
        return event;
      }
    });
    await dispatch(load(searchResult));
    return searchResult;
  }
};

// get event by eventId thunk;
export const getEventById = (eventId) => async (dispatch) => {
  const response = await fetch(`/api/events/${eventId}`);

  if (response.ok) {
    const event = await response.json();
    dispatch(loadOne(event));
    return event;
  }
};

// edit event by id thunk
export const editEvent = (event) => async (dispatch) => {
  const response = await csrfFetch(`/api/events/${event.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  });

  if (response.ok) {
    const event = await response.json();
    dispatch(edit(event));
    return event;
  }
};

// delete event by id thunk;
export const deleteEvent = (eventId) => async (dispatch) => {
  const response = await csrfFetch(`/api/events/${eventId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(remove(eventId));
    return response.ok;
  }
};

// get an event by groupId thunk
export const getEventByGroup = (groupId) => async (dispatch) => {
  const response = await csrfFetch(`/api/groups/${groupId}/events`);

  if (response.ok) {
    const events = await response.json();
    dispatch(load(events.Events));
    return events;
  }
};

// edit an event for a group by groupId thunk;
export const createEvent = (event, groupId, image) => async (dispatch) => {
  const response = await csrfFetch(`/api/groups/${groupId}/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  });

  if (response.ok) {
    const event = await response.json();
    const eventId = event.id;
    await dispatch(create(event));
    await dispatch(createEventImage(image, eventId));
    await dispatch(requestAttendance(eventId));
    await dispatch(getAllAttendees());
    return event;
  }
};

const initialState = { allEvents: {}, singleEvent: {} };

const eventsReducer = (state = initialState, action) => {
  let newEvents;
  switch (action.type) {
    case LOAD_EVENTS:
      newEvents = { allEvents: {}, singleEvent: {} };
      const allEvents = {};
      action.events.forEach((event) => {
        allEvents[event.id] = { ...event };
      });
      newEvents.allEvents = { ...allEvents };
      return newEvents;
    case LOAD_ONE:
      newEvents = { allEvents: {}, singleEvent: {} };
      const singleEvent = {};
      singleEvent[action.event.id] = action.event;
      newEvents.singleEvent = singleEvent;
      return newEvents;

    case CREATE_EVENT:
      const newEvent = { allEvents: {}, singleEvent: {} };
      newEvent.singleEvent[action.event.id] = action.event;
      return newEvent;
    case EDIT:
      newEvents = { ...state };
      newEvents.singleEvent = action.event;
      return newEvents;
    case REMOVE_EVENT:
      newEvents = { ...state };
      delete newEvents.singleEvent[action.eventId];
      return newEvents;
    default:
      return state;
  }
};
export default eventsReducer;
