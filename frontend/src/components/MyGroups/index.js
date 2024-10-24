import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { getGroupByUserThunk } from "../../store/group";
import Footer from "../Footer";
import Navigation from "../Navigation";
import "./MyGroups.css";

const MyGroups = () => {
  const currUser = useSelector((state) => state.session.user);
  const groups = Object.values(useSelector((state) => state.group.allGroups));

  const [showJoinedGroups, setJoinGroups] = useState(false);
  const [showHostedGroups, setHostGroups] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGroupByUserThunk());
  }, [dispatch]);

  if (currUser === null) {
    return <Redirect to="/" />;
  }

  const hostGroups = groups.filter(
    (group) => group.organizerId === currUser.id
  );
  const joinedGroups = groups.filter(
    (group) => group.organizerId !== currUser.id
  );

  return (
    <>
      <Navigation window={window} />
      {!groups.length > 0 && (
        <div className="mygroup-nogroup">
          <p>You don't have any group yet.</p>
          <Link className="create-group-nav-link" to="/groups/current/new">
            Go to create your first group!
          </Link>
        </div>
      )}
      {groups.length > 0 && (
        <div className="mygroups-body">
          <div className="mygroups-header">
            <h2
              onClick={() => {
                setHostGroups(true);
                setJoinGroups(false);
                window.scrollTo(0, 0);
              }}
              className={`${
                showHostedGroups === true ? "change-color" : ""
              } margin-right`}
            >
              Groups hosted
            </h2>
            <h2
              onClick={() => {
                setHostGroups(false);
                setJoinGroups(true);
                window.scrollTo(0, 0);
              }}
              className={`${
                showJoinedGroups === true ? "change-color" : ""
              } margin-right`}
            >
              Groups joined
            </h2>
            <div className="group-nav-link">
              <Link className="nav-link-text" to="/groups/current/new">
                Create a new groups
              </Link>
            </div>
          </div>
          {showHostedGroups && (
            <div className="groups-detail-container">
              <div className="mygroups-detail">
                {hostGroups.map((group) => (
                  <div className="mygroup-info" key={group.name}>
                    <div className="mygroup-image">
                      <img
                        className="mygroup-img"
                        src={`${group?.previewImage}`}
                        onError={(e) => {
                          e.currentTarget.src = "/group.webp";
                        }}
                      />
                    </div>
                    <div className="text-detail">
                      <p className="mygroup-name">{group.name}</p>
                      <p>
                        Click{" "}
                        <Link
                          className="mygroup-nav-link"
                          to={`/groups/${group.id}`}
                        >
                          here
                        </Link>{" "}
                        to see more details.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {showJoinedGroups && joinedGroups.length > 0 && (
            <div className="mygroups-detail">
              {joinedGroups.map((group) => (
                <div className="mygroup-info" key={group.name}>
                  <div className="mygroup-image">
                    <img
                      className="mygroup-img"
                      src={`${group?.previewImage}`}
                      onError={(e) => {
                        e.currentTarget.src = "/group.webp";
                      }}
                    />
                  </div>
                  <div className="text-detail">
                    <p className="mygroup-name">{group.name}</p>
                    <p>
                      Click{" "}
                      <Link
                        className="mygroup-nav-link"
                        to={`/groups/${group.id}`}
                      >
                        here
                      </Link>{" "}
                      to see more details.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
          {showJoinedGroups && joinedGroups.length === 0 && (
            <div className="no-joined-groups">
              <p className="no-joined-text">
                You have not joined any groups yet
              </p>
              <p className="no-joined-text">
                Click
                <Link to="/groups" className="to-groups-link">
                  {" "}
                  here{" "}
                </Link>
                to join!
              </p>
            </div>
          )}
        </div>
      )}

      <Footer window={window} />
    </>
  );
};

export default MyGroups;
