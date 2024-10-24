import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import LoginFormModal from "../LoginFormModal";
// import SignupFormModal from "../SignupFormModal";
import { useEffect } from "react";
import { getGroups, getSearchGroups } from "../../store/group";
import { getSearchEvents } from "../../store/event";
import { useSearch } from "../../context/search";
import LoginSignup from "../LoginSignup";

const Navigation = ({ window, event, group }) => {
  const currentUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const { keywords, location, setKeywords, setLocation } = useSearch();

  useEffect(() => {
    setKeywords(localStorage.getItem("keywords"));
    setLocation(localStorage.getItem("location"));
  }, []);

  useEffect(() => {
    localStorage.setItem("keywords", keywords);
    localStorage.setItem("location", location);
  }, [keywords, location]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const searchGroups = await dispatch(getSearchGroups(keywords, location));
    const searchEvents = await dispatch(getSearchEvents(keywords, location));

    if (event) history.push("/events");
    else if (group) history.push("/groups");
    else if (searchEvents || searchGroups) history.push("/events");
  };

  const handleReset = async (e) => {
    e.preventDefault();

    setKeywords("");
    setLocation("");

    const reset = await dispatch(getGroups());
    if (reset) {
      window.scrollTo(0, 0);
      history.push("/groups");
    }
  };

  return (
    <div className="header-bar-sticky">
      <div className="header">
        <div className="header-left">
          {currentUser && (
            <Link to="/groups" className="home-title" onClick={handleReset}>
              MeetaGroup
            </Link>
          )}
          {!currentUser && (
            <Link
              to="/"
              className="home-title"
              onClick={() => window.scrollTo(0, 0)}
            >
              MeetaGroup
            </Link>
          )}

          <div className="header-search-bar">
            <div className="form-detail-one">
              <input
                type="text"
                // id="search-box"
                value={keywords}
                placeholder="Search for keywords"
                onChange={(e) => setKeywords(e.target.value)}
              />
            </div>
            <div className="form-detail-two">
              <input
                type="text"
                value={location}
                // id="search-box"
                placeholder="Enter location"
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <button className="search-button-flex" onClick={handleSubmit}>
              <i className="fa-solid fa-magnifying-glass" />
            </button>
          </div>
        </div>

        <div className="header-right">
          {currentUser && (
            <>
              <Link className="start-new-group" to="/groups/current/new">
                Start a new group
              </Link>
              <ProfileButton user={currentUser} />
            </>
          )}
          {!currentUser && <LoginFormModal newGroup={"newGroup"} />}
          {!currentUser && (
            <div className="user">
              <LoginSignup window={window} />
              {/* <LoginFormModal window={window} />
              <SignupFormModal window={window} /> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
