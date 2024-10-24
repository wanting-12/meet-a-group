import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Modal } from "../../context/Modal";
import { getSearchEvents } from "../../store/event";
import Footer from "../Footer";
import LoginForm from "../LoginFormModal/LoginForm";
import Navigation from "../Navigation";
import "./events.css";

const Events = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const history = useHistory();
  const events = Object.values(useSelector((state) => state.event.allEvents));

  const keywords = localStorage.getItem("keywords");
  const location = localStorage.getItem("location");

  const [click, setClick] = useState(false);
  const [selectEvent, setSelectEvent] = useState(true);
  const [selectGroup, setSelectGroup] = useState(false);

  useEffect(() => {
    dispatch(getSearchEvents(keywords, location));
  }, [dispatch]);

  const handleReset = async (e) => {
    e.preventDefault();

    history.push("/groups");
  };

  const handleIfLogin = (eventId) => {
    if (currentUser) {
      history.push(`/events/${eventId}`);
    } else {
      setClick(true);
    }
  };

  return (
    <>
      <Navigation window={window} event={selectEvent} group={selectGroup} />
      <div className="event-groups-body">
        <div className="event-groups-content">
          <div className="events-groups">
            <h2 className="event-link active">Events</h2>
            <h2
              // to="/groups"
              className="group-link"
              onClick={() => {
                setSelectGroup(true);
                setSelectEvent(false);
                window.scrollTo(0, 0);
                history.push("/groups");
              }}
            >
              Groups
            </h2>
          </div>
        </div>
      </div>
      {events.length === 0 && (keywords?.length > 0 || location?.length > 0) && (
        <div className="flex-column-groups">
          <div className="not-found-image">
            <img
              src="https://secure.meetupstatic.com/next/images/find/emptyResultsIcon.svg?w=384"
              alt="result not found image"
            />
          </div>
          <span className="not-found-text">
            {`Sorry, there are no events results for "${keywords}" near you.`}
          </span>
          <button className="not-found-button" onClick={handleReset}>
            See results for groups instead.
          </button>
        </div>
      )}
      {events.length == 0 && <div className="min-height"></div>}
      {events.length > 0 && (
        <div className="all-events-body">
          <div className="all-events">
            {events.map((event) => (
              <div
                className="one-event"
                key={event.id}
                onClick={() => handleIfLogin(event.id)}
              >
                <div className="one-event-link">
                  <div className="event-image">
                    <img
                      src={event.previewImage}
                      className="event-img"
                      alt="event preview image"
                    />
                    <div className="event-type">
                      <div className="event-type-icon">
                        <i className="fa-solid fa-video" />
                      </div>
                      <span>{event.type} Event</span>
                    </div>
                  </div>
                  <div className="one-event-detail">
                    <p className="event-date">
                      {new Intl.DateTimeFormat("en-US", {
                        weekday: "short",
                      })
                        .format(new Date(event.startDate))
                        .toUpperCase()}
                      ,{" "}
                      {new Intl.DateTimeFormat("en-US", {
                        month: "short",
                      })
                        .format(new Date(event.startDate))
                        .toUpperCase()}{" "}
                      · {new Date(event.startDate).getHours()} :{" "}
                      {new Date(event.startDate).getMinutes()}
                      {new Date(event.startDate).getMinutes() == 0
                        ? 0
                        : ""}{" "}
                      {new Date(event.startDate).getHours() >= 12 ? "PM" : "AM"}
                    </p>
                    <p className="event-name">{event.name}</p>
                    <p className="event-group">{event.Group.name}</p>

                    <p className="event-attendees">
                      {event.numAttending} attendees
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {!currentUser && click && (
        <Modal onClose={() => setClick(false)}>
          <LoginForm />
        </Modal>
      )}
      <Footer window={window} />
    </>
  );
};

export default Events;
