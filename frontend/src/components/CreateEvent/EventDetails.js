import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useHistory, useParams } from "react-router-dom";
import {
  changeStatusThunk,
  deleteAttendanceThunk,
  getAllAttendees,
  getAttendStatus,
  requestAttendance,
} from "../../store/attendence";
import { getEventById, deleteEvent } from "../../store/event";
import { getGroupById } from "../../store/group";
import { getStatusThunk } from "../../store/member";
import Footer from "../Footer";
import Navigation from "../Navigation";
import "./EventDetails.css";

const EventDetails = () => {
  const { eventId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoaded, setLoaded] = useState(false);
  const [isLoaded1, setLoaded1] = useState(false);

  const currentUser = useSelector((state) => state.session.user);

  const event = Object.values(
    useSelector((state) => state.event.singleEvent)
  )[0];

  const group = Object.values(
    useSelector((state) => state.group.singleGroup)
  )[0];

  const status = useSelector((state) => state.member.status);
  let attendees = useSelector((state) => state.attendee.allAttendees);
  const attendStatus = useSelector((state) => state.attendee.status);
  console.log(attendStatus);
  useEffect(() => {
    dispatch(getAllAttendees(eventId))
      .then(() => dispatch(getAttendStatus(eventId)))
      .then(() => dispatch(getEventById(eventId)))
      .then(() => setLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getGroupById(event?.groupId))
      .then(() => dispatch(getStatusThunk(event?.groupId)))
      .then(() => setLoaded1(true));

    // add event to re-render
  }, [dispatch, event]);

  if (!currentUser) return <Redirect to="/" />;

  const handleDelete = async (e) => {
    e.preventDefault();
    const deleted = await dispatch(deleteEvent(eventId));
    if (deleted) return history.push(`/groups/current`);
  };

  const handleAttendEvent = async (e) => {
    e.preventDefault();
    await dispatch(requestAttendance(eventId));
    await dispatch(getAttendStatus(eventId));
  };

  const handleJoinGroup = () => {
    history.push(`/groups/${group.id}`);
  };

  const handleChangeAttendance = async (updates) => {
    await dispatch(changeStatusThunk(eventId, updates));
    await dispatch(getAttendStatus(eventId));
    await dispatch(getAllAttendees(eventId));
  };

  const handleLeaveEvent = async () => {
    await dispatch(deleteAttendanceThunk(eventId, currentUser.id));
    await dispatch(getAttendStatus(eventId));
    await dispatch(getAllAttendees(eventId));
  };

  let newStartDate;
  let newEndDate;
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let memberStatus;
  let pendingStatus;

  let eventMember = false;
  let host = false;
  let cohost = false;
  let pending = false;

  if (isLoaded && currentUser) {
    newStartDate = new Date(event.startDate);
    newEndDate = new Date(event.endDate);
    pending = attendStatus[0]?.status === "pending" ? true : false;

    // console.log(newStartDate.getMinutes(), newEndDate.getMinutes() === 0);
    attendees = Object.values(attendees);
    // console.log(
    //   attendees.filter((attendee) => attendee.id === currentUser.id),
    //   currentUser
    // );
    eventMember =
      attendees.filter((attendee) => attendee.id === currentUser.id).length > 0
        ? true
        : false;

    // pending =
    //   attendees.filter((attendee) => attendee.Attendances.status === "pending")
    //     .length > 0
    //     ? true
    //     : false;
    // console.log("eventMember", pending);
    if (status?.length > 0) {
      host = status[0].status === "host" ? true : false;
      cohost = status[0].status === "co-host" ? true : false;
      // eventMember =
      //   status[0].status === "member" || host || cohost ? true : false;
      // pending = status[0].status === "pending" ? true : false;
    }

    memberStatus = attendees
      .filter((attendee) => attendee.Attendances.status !== "pending")
      .sort((a, b) => a.firstName - b.firstName);
    pendingStatus = attendees
      .filter((attendee) => attendee.Attendances.status === "pending")
      .sort((a, b) => a.firstName - b.firstName);
  }

  if (!event || !group) return null;

  // console.log(eventMember, pending, host, attendees);
  return (
    isLoaded &&
    isLoaded1 && (
      <>
        <Navigation window={window} />
        <div className="event-details-flex">
          <div className="event-details-top">
            <div className="event-details-top-title">
              <h1>{event.name}</h1>
              {host && (
                <div className="top-title-edit-delete">
                  <Link className="edit-link" to={`/events/${eventId}/edit/`}>
                    Edit
                  </Link>

                  <button
                    className="top-title-delete-button"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="event-details-middle-flex">
            <div className="event-details-middle-details">
              <div className="event-detail-flex">
                <div className="event-detail-left-flex">
                  <div className="event-detail-img">
                    <img
                      src={`${event.EventImages[0].url}`}
                      onError={(e) => {
                        e.currentTarget.src = "/event.png";
                      }}
                      alt="event preview image"
                    />
                  </div>
                  <div className="event-detail-text">
                    <div className="event-detail-text-top-flex">
                      <h2>Details</h2>
                    </div>
                    <div className="event-detail-text-bottom">
                      <p>{event.description}</p>
                    </div>
                  </div>
                  <div className="event-detail-attendees">
                    <div className="event-detail-attendees-title-flex">
                      <h2>Attendees ({memberStatus.length})</h2>
                    </div>

                    <div className="card-detail-grid">
                      {memberStatus.map((attendee) => (
                        <div key={attendee.id} className="card-detail-flex">
                          <div className="card-detail-img">
                            <div className="card-detail-image">
                              {attendee.lastName[0]}
                              {attendee.firstName[0]}
                            </div>
                          </div>
                          <div className="card-detail-name">
                            {attendee.firstName} {attendee.lastName[0]}.
                          </div>
                          <div className="card-detail-status">
                            {attendee.Attendances.status === "host"
                              ? "Organizer"
                              : attendee.Attendances.status}
                          </div>
                          <div className="card-detail-status">
                            {host &&
                              attendee.Attendances.status === "member" && (
                                <button
                                  className="status-change-button"
                                  onClick={() =>
                                    handleChangeAttendance({
                                      userId: attendee.id,
                                      status: "co-host",
                                    })
                                  }
                                >
                                  change to co-host
                                </button>
                              )}
                          </div>
                        </div>
                      ))}
                      {(host || cohost) &&
                        pendingStatus.map((attendee) => (
                          <div key={attendee.id} className="card-detail-flex">
                            <div className="card-detail-img">
                              <div className="card-detail-image">
                                {attendee.lastName[0]}
                                {attendee.firstName[0]}
                              </div>
                            </div>
                            <div className="card-detail-name">
                              {attendee.firstName} {attendee.lastName[0]}.
                            </div>
                            <div className="card-detail-status">
                              {attendee.Attendances.status === "host"
                                ? "Organizer"
                                : attendee.Attendances.status}
                            </div>
                            <div className="card-detail-status">
                              {(host || cohost) && (
                                <button
                                  className="status-change-button"
                                  onClick={() =>
                                    handleChangeAttendance({
                                      userId: attendee.id,
                                      status: "member",
                                    })
                                  }
                                >
                                  change to member
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="event-detail-photos">
                    <div className="event-detail-photos-title-flex">
                      <h2>Photos ({event.EventImages.length})</h2>
                    </div>
                    <div className="event-detail-photos-grid">
                      {event.EventImages.map((img) => (
                        <img
                          key={img.id}
                          src={img.url}
                          onError={(e) => {
                            e.currentTarget.src = "/event.png";
                          }}
                          alt="event"
                        />
                      ))}
                      {event.EventImages.length === 2 && (
                        <div className="sample-photo-flex">
                          <i className="fa-solid fa-camera" />
                        </div>
                      )}
                      {event.EventImages.length === 1 && (
                        <>
                          <div className="sample-photo-flex">
                            <i className="fa-solid fa-camera" />
                          </div>
                          <div className="sample-photo-flex">
                            <i className="fa-solid fa-camera" />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="event-detail-right">
                  <div className="event-detail-right-sticky">
                    <div className="right-group-info">
                      <Link
                        to={`/groups/${group?.id}`}
                        className="group-info-link"
                      >
                        <div className="group-info-link-flex">
                          <div className="group-info-img">
                            <img
                              src={group.GroupImages[0].url}
                              alt="group preview image"
                              onError={(e) => {
                                e.currentTarget.src = "/group.webp";
                              }}
                            />
                          </div>
                          <div className="group-info-text">
                            <div className="group-info-title">{group.name}</div>
                            <div className="group-info-privacy-flex">
                              <span>
                                {group.private === true ? "Private" : "Public"}{" "}
                                group
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>

                    <div className="right-event-info">
                      <div className="right-event-info-bottom">
                        <div className="event-info-bottom-one-flex">
                          <i className="fa-regular fa-clock" />
                          <div className="event-info-time">
                            <div>
                              {days[newStartDate.getDay()]},{" "}
                              {new Intl.DateTimeFormat("en-US", {
                                month: "long",
                              }).format(newStartDate)}{" "}
                              {newStartDate.getDate()},{" "}
                              {newStartDate.getFullYear()} at{" "}
                              {newStartDate.getHours()} :{" "}
                              {newStartDate.getMinutes()}
                              {newStartDate.getMinutes() == 0 ? 0 : ""}{" "}
                              {newStartDate.getHours() >= 12 ? "PM" : "AM"} to
                            </div>
                            <div>
                              {days[newEndDate.getDay()]},{" "}
                              {new Intl.DateTimeFormat("en-US", {
                                month: "long",
                              }).format(newEndDate)}{" "}
                              {newEndDate.getDate()}, {newEndDate.getFullYear()}{" "}
                              at {newEndDate.getHours()} :{" "}
                              {newEndDate.getMinutes()}
                              {newEndDate.getMinutes() == 0 ? 0 : ""}{" "}
                              {newEndDate.getHours() >= 12 ? "PM" : "AM"}
                            </div>
                          </div>
                        </div>

                        <div className="event-info-bottom-two-flex">
                          <i className="fa-solid fa-location-dot" />
                          <div className="event-info-type">
                            <p>
                              {event.Venue.address} · {event.Venue.city},{" "}
                              {event.Venue.state}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="event-details-bottom-sticky">
            <div className="event-details-bottom-text flex-between">
              <div className="buttom-text-flex">
                <div className="text-event-time">
                  <div className="time-font">
                    {new Intl.DateTimeFormat("en-US", {
                      weekday: "short",
                    })
                      .format(newStartDate)
                      .toUpperCase()}
                    ,{" "}
                    {new Intl.DateTimeFormat("en-US", {
                      month: "short",
                    })
                      .format(newStartDate)
                      .toUpperCase()}{" "}
                    {newStartDate.getDate()} · {newStartDate.getHours()} :{" "}
                    {newStartDate.getMinutes()}
                    {newStartDate.getMinutes() == 0 ? 0 : ""}{" "}
                    {newStartDate.getHours() >= 12 ? "PM" : "AM"}
                  </div>
                </div>
                <div className="text-event-title">
                  <p>
                    {event.Venue.city}, {event.name}
                  </p>
                </div>
              </div>
              <div className="bottom-right-flex">
                <div className="price">
                  {event.price === 0 ? "FREE" : `$${event.price}`}
                </div>

                {(status.length <= 0 || status[0].status === "pending") && (
                  <button className="attend-button" onClick={handleJoinGroup}>
                    Join the group to attend
                  </button>
                )}
                {/* {!eventMember && !pending && status.length > 0 && ( */}
                <div className="flex-column">
                  {!eventMember &&
                    !pending &&
                    status.length > 0 &&
                    status[0].status !== "pending" && (
                      <button
                        className="attend-button"
                        onClick={handleAttendEvent}
                      >
                        Attend
                      </button>
                    )}
                  {eventMember && (
                    <span className="attend-status">
                      You are{" "}
                      {attendStatus[0].status === "member"
                        ? "a member"
                        : `the ${attendStatus[0].status}`}
                    </span>
                  )}
                </div>
                <div className="flex-column">
                  {(eventMember || pending) && !host && (
                    // status[0].status !== "pending" && (

                    <button
                      className="attend-button"
                      onClick={handleLeaveEvent}
                    >
                      Leave the event
                    </button>
                  )}
                  {pending && (
                    <span className="attend-status">
                      Your request is pending
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer window={window} />
      </>
    )
  );
};

export default EventDetails;
