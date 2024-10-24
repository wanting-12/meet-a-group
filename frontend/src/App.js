import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, useHistory, NavLink } from "react-router-dom";
import Groups from "./components/Groups";
import * as sessionActions from "./store/session";
import MyGroups from "./components/MyGroups";
import CreateGroup from "./components/CreateGroup";
import GroupDetails from "./components/CreateGroup/GroupDetails";
import EditGroup from "./components/CreateGroup/EditGroupForm";
import Events from "./components/Events";
import CreateEvent from "./components/CreateEvent";
import EventDetails from "./components/CreateEvent/EventDetails";
import EditEvent from "./components/CreateEvent/EditEvent";
import Home from "./components/Home";
import Navigation from "./components/Navigation";

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {isLoaded && (
        <>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/groups">
              <Groups />
            </Route>
            <Route exact path="/events">
              <Events />
            </Route>
            <Route exact path="/events/group/:groupId/new">
              <CreateEvent />
            </Route>
            <Route exact path="/events/:eventId/edit">
              <EditEvent />
            </Route>
            <Route exact path="/events/:eventId">
              <EventDetails />
            </Route>
            <Route exact path="/groups/current">
              <MyGroups />
            </Route>
            <Route exact path="/groups/current/new">
              <CreateGroup />
            </Route>
            <Route exact path="/groups/:groupId">
              <GroupDetails />
            </Route>
            <Route exact path="/groups/current/:groupId/edit">
              <EditGroup />
            </Route>
            <Route>
              {/* <Navigation /> */}
              <div className="page-not-found-container">
                <h1 className="page-not-found">Page Not Found</h1>
              </div>
            </Route>
          </Switch>
        </>
      )}
    </>
  );
}

export default App;
