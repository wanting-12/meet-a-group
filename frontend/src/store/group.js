import { csrfFetch } from "./csrf";
import { createImg } from "./image";
import { requestMembership } from "./member";

const LOAD = "groups/getGroups";
const LOAD_ONE = "groups/getOneGroup";
const CREATE = "groups/createGroup";
const REMOVE = "groups/removeGroup";
const EDIT = "groups/editGroup";

// the action creator for loading groups
const load = (groups) => {
  return {
    type: LOAD,
    groups,
  };
};

// load group by id
const loadOne = (group) => {
  return {
    type: LOAD_ONE,
    group,
  };
};

// create a group
const create = (group) => {
  return {
    type: CREATE,
    group,
  };
};

// remove a group by id
const remove = (groupId) => {
  return {
    type: REMOVE,
    groupId,
  };
};

// edit a group
const edit = (group) => {
  return {
    type: EDIT,
    group,
  };
};

// thunk action creator for loading all groups;
export const getGroups = () => async (dispatch) => {
  const response = await fetch("/api/groups");
  if (response.ok) {
    const groups = await response.json();
    dispatch(load(groups.Groups));
    return groups;
  }
};

// thunk: loading all groups with filter;
export const getSearchGroups = (keywords, location) => async (dispatch) => {
  const response = await fetch("/api/groups/");

  if (response.ok) {
    const groups = await response.json();

    let searchResult = groups.Groups.filter((group) => {
      if (keywords?.length > 0 && location?.length > 0) {
        return (
          group.name
            .toLowerCase()
            .split(/([_\W])/)
            .includes(keywords.toLowerCase()) &&
          group.city.toLowerCase() === location.toLowerCase()
        );
      } else if (keywords?.length > 0) {
        return group.name
          .toLowerCase()
          .split(/([_\W])/)
          .includes(keywords.toLowerCase());
      } else if (location?.length > 0) {
        return group.city.toLowerCase() === location.toLowerCase();
      } else {
        return group;
      }
    });
    await dispatch(load(searchResult));
    return searchResult;
  }
};

// thunk: get details of a group from an id:
export const getGroupById = (groupId) => async (dispatch) => {
  const response = await fetch(`/api/groups/${groupId}`);

  if (response.ok) {
    const group = await response.json();
    await dispatch(loadOne(group));
    return group;
  }
};

// thunk action creator: get group by userid;
export const getGroupByUserThunk = () => async (dispatch) => {
  const response = await csrfFetch("/api/groups/current");

  if (response.ok) {
    const groups = await response.json();
    await dispatch(load(groups.Groups));
    return groups;
  }
};

// thunk action creator for creating a group;
export const createGroup = (group, image) => async (dispatch) => {
  const response = await csrfFetch("/api/groups", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(group),
  });

  if (response.ok) {
    const groupData = await response.json();
    const groupId = groupData.id;
    dispatch(create(group));
    dispatch(createImg(image, groupId));
    dispatch(requestMembership(groupId));
    return groupData;
  }
};

//Edit a group action thunk;
export const editGroupThunk = (group, groupId) => async (dispatch) => {
  const response = await csrfFetch(`/api/groups/${groupId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(group),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(edit(data));
    return data;
  }
};

// Delete a group aciton thunk;
export const removeGroup = (groupId) => async (dispatch) => {
  const response = await csrfFetch(`/api/groups/${groupId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(remove(groupId));
    return data;
  }
};

// defined the initial state
const initialState = { allGroups: {}, singleGroup: {} };

// groups reducer
const groupsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case LOAD:
      newState = { allGroups: {}, singleGroup: {} };
      const allGroups = {};
      action.groups.forEach((group) => {
        allGroups[group.id] = group;
      });
      newState.allGroups = allGroups;
      return newState;
    case LOAD_ONE:
      newState = { allGroups: {}, singleGroup: {} };
      const singleGroup = {};
      singleGroup[action.group.id] = action.group;
      newState.singleGroup = singleGroup;
      return newState;
    case CREATE:
      newState = { allGroups: {}, singleGroup: {} };
      newState.singleGroup[action.group.id] = action.group;
      return newState;
    case EDIT:
      newState = { ...state };
      newState.singleGroup = action.group;
      return newState;
    case REMOVE:
      newState = { ...state };
      delete newState.singleGroup[action.groupId];
      return newState;
    default:
      return state;
  }
};

export default groupsReducer;
