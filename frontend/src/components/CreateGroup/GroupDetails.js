import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { getEventByGroup } from "../../store/event";
import { getGroupById, removeGroup } from "../../store/group";
import {
  changeStatusThunk,
  deleteMembershipThunk,
  getAllMembers,
  getStatusThunk,
  requestMembership,
} from "../../store/member";
import Footer from "../Footer";
import Navigation from "../Navigation";
import "./GroupDetails.css";
// import axios from "axios";
import { deleteAttendanceThunk } from "../../store/attendence";

// function checkImage(path) {
//   axios
//     .get(path)
//     .then(() => {
//       return true;
//     })
//     .catch(() => {
//       return false;
//     });
// }

// const defaultImg =
//   "https://lh3.googleusercontent.com/p/AF1QipNVlM5lo7fIJrmvjN4EOrTMiQjDgDyTfw7ATdV6=s1360-w1360-h1020";
// new Promise(resolve => {
//   const img = new Image()
//   img.onload = () => resolve({path, status: "ok"});
//   img.onerror = () => resolve({path, status: "error"})

//   img.src = path;
// })

function getRandomColor() {
  var letters = "ABCDEF0123456789";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const GroupDetails = () => {
  const { groupId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const [showAbout, setAbout] = useState(true);
  const [showEvents, setEvents] = useState(false);
  const [showMembers, setMembers] = useState(false);
  const [showAllMembers, setAllMembers] = useState(true);
  const [showLeader, setLeader] = useState(false);
  const [isLoaded, setLoaded] = useState(false);

  const group = Object.values(
    useSelector((state) => state.group.singleGroup)
  )[0];
  const members = useSelector((state) => state.member.allMembers);
  const currentUser = useSelector((state) => state.session.user);
  const events = Object.values(useSelector((state) => state.event.allEvents));
  const status = useSelector((state) => state.member.status);

  useEffect(() => {
    dispatch(getAllMembers(groupId))
      .then(() => dispatch(getStatusThunk(groupId)))
      .then(() => dispatch(getEventByGroup(groupId)))
      .then(() => dispatch(getGroupById(groupId)))
      .then(() => setLoaded(true));
  }, [dispatch]);

  if (!group) return null;
  const handleDelete = async (e) => {
    e.preventDefault();
    const deleted = await dispatch(removeGroup(groupId));
    if (deleted) return history.push("/groups/current");
  };

  const handleJoinGroup = async (e) => {
    e.preventDefault();
    await dispatch(requestMembership(groupId));
    await dispatch(getStatusThunk(groupId));
  };

  const handleDeleteMembership = async (e) => {
    e.preventDefault();
    await dispatch(deleteMembershipThunk(groupId, currentUser.id));
    await dispatch(getStatusThunk(groupId));
    await dispatch(getAllMembers(groupId));
    for (let i = 0; i < events.length; i++) {
      await dispatch(deleteAttendanceThunk(events[i].id, currentUser.id));
    }
  };

  const handleChangeMembership = async (updates) => {
    await dispatch(changeStatusThunk(groupId, updates));
    await dispatch(getStatusThunk(groupId));
    await dispatch(getAllMembers(groupId));
  };

  let allMembers;
  let memberStatus;
  let pendingStatus;
  let privateGroup;

  let groupMember = false;
  let host = false;
  let cohost = false;
  let pending = false;
  let leaders = [];
  if (isLoaded) {
    // check if current user is the host or cohost of the group
    // only host / cohost can see the member with pending;
    if (status?.length > 0) {
      host = status[0].status === "host" ? true : false;
      cohost = status[0].status === "co-host" ? true : false;
      // check if the current user is the group member;
      // only group member can see the member list
      groupMember =
        status[0].status === "member" || host || cohost ? true : false;

      // check if the current user request to join the group yet;
      pending = status[0].status === "pending" ? true : false;
    }
    allMembers = Object.values(members);
    leaders = allMembers.filter(
      (member) =>
        member.Membership.status === "host" ||
        member.Membership.status === "co-host"
    );

    leaders = leaders.sort((a, b) => b.Membership.status - a.Membership.status);

    memberStatus = allMembers
      .filter((member) => member.Membership.status === "member")
      .sort((a, b) => a.firstName - b.firstName);
    pendingStatus = allMembers
      .filter((member) => member.Membership.status === "pending")
      .sort((a, b) => a.firstName - b.firstName);

    privateGroup = group.private;
  }

  return (
    isLoaded && (
      <>
        <Navigation window={window} />
        <div className="group-details-container">
          <div className="group-details-body">
            <div className="group-detail-page">
              <div className="top-detail">
                <div className="group-detail-image flex-grow-three">
                  <img
                    src={`${group?.GroupImages[0].url}`}
                    onError={(e) => {
                      e.currentTarget.src = "/group.webp";
                    }}
                    // src={
                    //   checkImage(group?.GroupImages[0].url)
                    //     ? group?.GroupImages[0].url
                    //     : defaultImg
                    // }
                    className="group-detail-img"
                  />
                </div>
                <div className="group-detail flex-grow-two">
                  <h1 className="group-detial-name">{group.name}</h1>
                  <p className="group-detail-location">
                    {group.city}, {group.state}
                  </p>
                  <p className="group-detail-type">
                    {allMembers.length - pendingStatus.length} members{" "}
                    {group.private === true ? "Private" : "Public"} group
                  </p>
                  <p className="group-detail-host">
                    Organized by{" "}
                    <span className="group-detail-firstname">
                      {group.Organizer.firstName} {group.Organizer.lastName[0]}.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="middle-bar-container">
            <div className="margin-auto">
              <div className="group-detail-middle-bar">
                <div className="group-detail-middle-bar-left">
                  <ul className="middle-bar">
                    <li>
                      <button
                        className={`button-about${
                          showAbout === true ? "-color" : ""
                        } button-details`}
                        onClick={() => {
                          setEvents(false);
                          setAbout(true);
                          setAllMembers(false);
                          setMembers(false);
                        }}
                      >
                        About
                      </button>
                    </li>
                    <li>
                      <button
                        className={`button-events${
                          showEvents === true ? "-color" : ""
                        } button-details`}
                        onClick={() => {
                          setEvents(true);
                          setAbout(false);
                          setAllMembers(false);
                          setMembers(false);
                        }}
                      >
                        Events
                      </button>
                    </li>
                    <li>
                      <button
                        className={`button-events${
                          showMembers === true ? "-color" : ""
                        } button-details`}
                        onClick={() => {
                          setEvents(false);
                          setAbout(false);
                          setMembers(true);
                          setAllMembers(true);
                        }}
                      >
                        Members
                      </button>
                    </li>
                    {host && (
                      <li>
                        <Link
                          className="edit-group"
                          to={`/groups/current/${groupId}/edit`}
                        >
                          <p>Edit</p>
                        </Link>
                      </li>
                    )}
                    {host && (
                      <li>
                        <button
                          onClick={handleDelete}
                          className="group-detail-delete-button"
                        >
                          Delete
                        </button>
                      </li>
                    )}
                  </ul>
                </div>

                <div className="group-detail-middle-bar-right">
                  <ul className="middle-bar">
                    {!groupMember && !pending && (
                      <li>
                        <button
                          className="request-to-join"
                          onClick={handleJoinGroup}
                        >
                          Request to Join
                        </button>
                      </li>
                    )}
                    {(groupMember || pending) && (
                      <li>
                        {/* <> */}
                        {!host && (
                          <button
                            className="leave-group request-to-join"
                            onClick={handleDeleteMembership}
                          >
                            <span>Leave the group</span>
                          </button>
                        )}

                        {host && <p>You are the host</p>}
                      </li>
                    )}
                    {pending && (
                      <li className="pending-status">
                        Your member status: {status[0].status}
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="group-detail-hidden-container">
            <div className="group-detail-hidden">
              {showAbout && (
                <div className="group-detail-hidden-about">
                  <div className="group-detail-left flex-grow-one">
                    <div className="group-detail-about">
                      <h2>
                        <span>What we're about</span>
                      </h2>
                      <div className="group-about-overflow">
                        <p>{group?.about}</p>
                      </div>
                    </div>
                  </div>
                  <div className="group-detail-right flex-grow-two">
                    <h3 className="group-detail-organizer">Organizer</h3>
                    <p className="organizer-first-name">
                      {group?.Organizer.firstName}
                    </p>
                  </div>
                </div>
              )}

              {showEvents && (
                <div className="group-detail-hidden-events">
                  {/* <div className="hidden-events-left"> */}
                  <div className="hidden-events-top">
                    <h3>Upcoming events:</h3>
                    <div className="hidden-events-link">
                      {currentUser && currentUser.id === group.organizerId && (
                        <Link
                          className="hidden-events-link-text"
                          to={`/events/group/${group.id}/new`}
                        >
                          Create new event
                        </Link>
                      )}
                    </div>
                  </div>
                  <div className="all-events-group-detail">
                    {events?.map((event) => (
                      <div key={event.id} className="event-detail-group-detail">
                        <div className="events-show">
                          <div className="events-show-pics">
                            <img
                              src={event?.previewImage}
                              alt="event preview image"
                              onError={(e) => {
                                e.currentTarget.src = "/event.png";
                              }}
                            />
                          </div>
                          <div className="events-show-details">
                            <h2>{event.name}</h2>
                            <p className="event-city">{event.Venue?.city}</p>
                            <div className="events-details-link">
                              click
                              <Link
                                className="events-details-link-text"
                                to={`/events/${event.id}`}
                              >
                                {" "}
                                here{" "}
                              </Link>
                              to see more details
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {showEvents && events.length === 0 && (
                    <>
                      <p>There is no event in this group yet</p>
                    </>
                  )}
                </div>
              )}

              {showMembers && (
                <div className="group-detail-members">
                  <div className="flex flex-row">
                    <div className="flex flex-column sticky-member">
                      <nav className="padding-left-top-bottom">
                        <ul>
                          <li
                            className={`all-members${
                              showAllMembers === true ? "-color" : ""
                            }`}
                          >
                            <div className="flex member-number">
                              <button
                                className={`all-members${
                                  showAllMembers === true ? "-color" : ""
                                }`}
                                onClick={() => {
                                  setAllMembers(true);
                                  setLeader(false);
                                }}
                              >
                                All members
                              </button>
                              <p
                                className={`all-members${
                                  showAllMembers === true ? "-color" : ""
                                }`}
                              >
                                {allMembers?.length}
                              </p>
                            </div>
                          </li>
                          <li
                            className={`leadership${
                              showLeader === true ? "-color" : ""
                            }`}
                          >
                            <div className="flex member-number">
                              <button
                                className={`leadership${
                                  showLeader === true ? "-color" : ""
                                }`}
                                onClick={() => {
                                  setAllMembers(false);
                                  setLeader(true);
                                }}
                              >
                                Leadership team
                              </button>
                              <p
                                className={`leadership${
                                  showLeader === true ? "-color" : ""
                                }`}
                              >
                                {leaders.length}
                              </p>
                            </div>
                          </li>
                        </ul>
                      </nav>
                    </div>
                    <div className="member-right">
                      {(!privateGroup || (privateGroup && groupMember)) &&
                        showAllMembers && (
                          <ul className="flex flex-column member-right-detail">
                            {leaders?.map((member) => (
                              <li key={member.id} className="member-name">
                                {/* <div className="member-name"> */}
                                <div
                                  className="member-image"
                                  style={{
                                    backgroundColor: getRandomColor(),
                                  }}
                                >
                                  <span>
                                    {member.firstName[0]}
                                    {member.lastName[0]}
                                  </span>
                                </div>
                                <div className="member-status">
                                  <span>
                                    {member.firstName} {member.lastName}
                                  </span>
                                  <p>{member.Membership.status}</p>
                                </div>
                              </li>
                            ))}
                            {memberStatus?.map((member) => (
                              <li key={member.id} className="member-name">
                                <div
                                  className="member-image"
                                  style={{
                                    backgroundColor: getRandomColor(),
                                  }}
                                >
                                  <span>
                                    {member.firstName[0]}
                                    {member.lastName[0]}
                                  </span>
                                </div>
                                <div className="member-status">
                                  <span>
                                    {member.firstName} {member.lastName}
                                  </span>
                                  <div className="status-change">
                                    <p>{member.Membership.status}</p>
                                    {host && (
                                      <button
                                        className="status-change-button"
                                        onClick={() =>
                                          handleChangeMembership({
                                            memberId: member.id,
                                            status: "co-host",
                                          })
                                        }
                                      >
                                        Change to co-host
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </li>
                            ))}

                            {(host || cohost) &&
                              pendingStatus?.map((member) => (
                                <li key={member.id} className="member-name">
                                  <div
                                    className="member-image"
                                    style={{
                                      backgroundColor: getRandomColor(),
                                    }}
                                  >
                                    <span>
                                      {member.firstName[0]}
                                      {member.lastName[0]}
                                    </span>
                                  </div>
                                  <div className="member-status">
                                    <span>
                                      {member.firstName} {member.lastName}
                                    </span>
                                    <div className="status-change">
                                      <p>{member.Membership.status}</p>
                                      <button
                                        className="status-change-button"
                                        onClick={() =>
                                          handleChangeMembership({
                                            memberId: member.id,
                                            status: "member",
                                          })
                                        }
                                      >
                                        Change to member
                                      </button>
                                    </div>
                                  </div>
                                  {/* </div> */}
                                </li>
                              ))}
                          </ul>
                        )}
                      {privateGroup &&
                        !groupMember &&
                        (showAllMembers || showLeader) && (
                          <div className="flex flex-column no-current-user">
                            <div className="member-right-icon">
                              <i className="fa-solid fa-user-lock" />
                            </div>
                            <div className="member-right-text">
                              <h1>This content is available only to members</h1>
                              <span>
                                You can still join the group to learn more
                              </span>
                            </div>
                          </div>
                        )}
                      {!privateGroup && showLeader && (
                        <ul className="flex flex-column member-right-detail">
                          {leaders.map((leader) => (
                            <li key={leader.id} className="member-name">
                              <div
                                className="member-image"
                                style={{
                                  backgroundColor: getRandomColor(),
                                }}
                              >
                                <span>
                                  {leader.firstName[0]}
                                  {leader.lastName[0]}
                                </span>
                              </div>
                              <div className="member-status">
                                <span>
                                  {leader.firstName} {leader.lastName}
                                </span>
                                <p>{leader.Membership.status}</p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <Footer window={window} />
      </>
    )
  );
};

export default GroupDetails;
