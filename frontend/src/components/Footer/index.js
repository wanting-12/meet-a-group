import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
// import LoginFormModal from "../LoginFormModal";
// import SignupFormModal from "../SignupFormModal";
import * as sessionActions from "../../store/session";
import "./Footer.css";
import LoginSignup from "../LoginSignup";

const Footer = ({ window }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector((state) => state.session.user);

  const handleLogout = async (e) => {
    e.preventDefault();
    const logout = await dispatch(sessionActions.logout());
    if (logout) {
      window.scrollTo(0, 0);
      history.push("/");
    }
  };

  return (
    <footer className="main-footer">
      <div className="footer-container">
        <div className="footer-one-flex">
          <div className="footer-one-detail">
            Create your own Meetup group.
            {currentUser && (
              <Link
                to="/groups/current/new"
                className="get-started"
                onClick={() => window.scrollTo(0, 0)}
              >
                Get Started
              </Link>
            )}
            {!currentUser && <LoginSignup newGroup={"getStarted"} />}
          </div>
        </div>
        <div className="footer-two-flex">
          <div className="footer-detail">
            <span className="footer-title">Your Account</span>
            <ul className="footer-list">
              {currentUser && (
                <>
                  <li>
                    <Link
                      to="/groups/current"
                      className="source-link"
                      onClick={() => window.scrollTo(0, 0)}
                    >
                      Your groups
                    </Link>
                  </li>
                  <li className="icon-logout">
                    <button
                      className="icon-logout-button-footer"
                      onClick={handleLogout}
                    >
                      Log out
                    </button>
                  </li>
                </>
              )}
              {!currentUser && (
                <>
                  <li>
                    <LoginSignup newGroup={"footerSignup"} window={window} />
                  </li>
                  <li>
                    <LoginSignup newGroup={"footerLogin"} window={window} />
                  </li>
                </>
              )}
            </ul>
          </div>
          <div className="footer-detail">
            <span className="footer-title">Discover</span>
            <ul className="footer-list">
              <li>
                <Link
                  to="/groups"
                  className="source-link"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Groups
                </Link>
              </li>
              <li>
                <Link
                  to="/events"
                  className="source-link"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Events
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-three-flex">
          <div className="flex s-b mtb-12">
            <div className="footer-left">
              <div className="developer flex center">
                <div className="developer-text">Developer </div>
                <div className="developer-text">Wanting Lu</div>
                <a
                  className="flex center mr-12 ml-8 cursor"
                  href="https://www.linkedin.com/in/wantinglu/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    className="de-profile-svg"
                    xmlnx="http://www.w3.org/2000/svg"
                    viewBox="0 0 72 72"
                  >
                    <path
                      d="M 8 72 L 64 72 C 68.4183 72 72 68.4183 72 64 L 72 8 C 72 3.58172 68.4183 -8.11625e-16 64 0 L 8 0 C 3.58172 8.11625e-16 -5.41083e-16 3.58172 0 8 L 0 64 C 5.41083e-16 68.4183 3.58172 72 8 72 Z"
                      fill="rgb(0, 126, 187)"
                    ></path>
                    <path
                      d="M 62 62 L 51.3156 62 L 51.3156 43.8021 C 51.3156 38.8128 49.4198 36.0245 45.4707 36.0245 C 41.1746 36.0245 38.9301 38.9261 38.9301 43.8021 L 38.9301 62 L 28.6333 62 L 28.6333 27.3333 L 38.9301 27.3333 L 38.9301 32.0029 C 38.9301 32.0029 42.026 26.2742 49.3826 26.2742 C 56.7357 26.2742 62 30.7645 62 40.0512 L 62 62 Z M 16.3493 22.794 C 12.8421 22.794 10 19.9297 10 16.397 C 10 12.8644 12.8421 10 16.3493 10 C 19.8566 10 22.697 12.8644 22.697 16.397 C 22.697 19.9297 19.8566 22.794 16.3493 22.794 Z M 11.0326 62 L 21.7694 62 L 21.7694 27.3333 L 11.0326 27.3333 L 11.0326 62 Z"
                      fill="rgb(255,255,255)"
                    ></path>
                  </svg>
                </a>
                <a
                  className="github-click"
                  href="https://github.com/Winnie-1201"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    className="de-profile-svg"
                    viewBox="0 0 24 24"
                    xmlnx="http://www.w3.org/2000/svg"
                  >
                    <path fill="none" d="M 0 0 h 24 v 24 H 0 Z"></path>
                    <path d="M 12 2 C 6.475 2 2 6.475 2 12 a 9.994 9.994 0 0 0 6.838 9.488 c 0.5 0.087 0.687 -0.213 0.687 -0.476 c 0 -0.237 -0.013 -1.024 -0.013 -1.862 c -2.512 0.463 -3.162 -0.612 -3.362 -1.175 c -0.113 -0.288 -0.6 -1.175 -1.025 -1.413 c -0.35 -0.187 -0.85 -0.65 -0.013 -0.662 c 0.788 -0.013 1.35 0.725 1.538 1.025 c 0.9 1.512 2.338 1.087 2.912 0.825 c 0.088 -0.65 0.35 -1.087 0.638 -1.337 c -2.225 -0.25 -4.55 -1.113 -4.55 -4.938 c 0 -1.088 0.387 -1.987 1.025 -2.688 c -0.1 -0.25 -0.45 -1.275 0.1 -2.65 c 0 0 0.837 -0.262 2.75 1.026 a 9.28 9.28 0 0 1 2.5 -0.338 c 0.85 0 1.7 0.112 2.5 0.337 c 1.912 -1.3 2.75 -1.024 2.75 -1.024 c 0.55 1.375 0.2 2.4 0.1 2.65 c 0.637 0.7 1.025 1.587 1.025 2.687 c 0 3.838 -2.337 4.688 -4.562 4.938 c 0.362 0.312 0.675 0.912 0.675 1.85 c 0 1.337 -0.013 2.412 -0.013 2.75 c 0 0.262 0.188 0.574 0.688 0.474 A 10.016 10.016 0 0 0 22 12 c 0 -5.525 -4.475 -10 -10 -10 Z"></path>
                  </svg>
                  <span className="github">GitHub</span>
                </a>
              </div>
            </div>
            <div className="footer-right"></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
