import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";

import "./ProfileButton.css";

const ProfileButton = ({ user }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const onClick = (e) => {
    e.preventDefault();
    setOpenMenu(true);
  };

  useEffect(() => {
    if (!openMenu) return;

    const closeMenu = () => {
      setOpenMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [openMenu]);

  const handleLogout = async (e) => {
    e.preventDefault();
    const logout = await dispatch(sessionActions.logout());

    if (logout.ok) history.push("/");
  };

  return (
    <>
      <div className="icon-container">
        <button className="header-bar-icon-button" onClick={onClick}>
          <div className="button-detail">{user.firstName[0]}</div>
        </button>
        {openMenu && (
          <ul className="icon-detail">
            <li className="icon-username">{user.username}</li>
            <li className="icon-email">{user.email}</li>
            <li className="icon-groups-link">
              <NavLink
                className="icon-groups-navlink"
                exact
                to={`/groups/current`}
              >
                Your groups
              </NavLink>
            </li>
            <li className="icon-logout-header">
              <button
                className="icon-logout-button-header"
                onClick={handleLogout}
              >
                Log Out
              </button>
            </li>
          </ul>
        )}
      </div>
    </>
  );
};

export default ProfileButton;
