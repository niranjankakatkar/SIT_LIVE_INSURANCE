import React from "react";
import { Link } from "react-router-dom";

function navBar() {
  return (
    <div>
      <div className="header">
        <div className="header-left">
          <Link to="index.html" className="logo">
            <img src="assets/img/logo.png" width="35" height="35" alt="" />{" "}
            <span>Clinic</span>
          </Link>
        </div>
        <Link id="toggle_btn" to="#">
          <img src="assets/img/icons/bar-icon.svg" alt="" />
        </Link>
        <Link id="mobile_btn" className="mobile_btn float-start" to="#sidebar">
          <img src="assets/img/icons/bar-icon.svg" alt="" />
        </Link>
        <div className="top-nav-search mob-view">
          <form>
            <input
              type="text"
              className="form-control"
              placeholder="Search here"
            />
            <Link className="btn">
              <img src="assets/img/icons/search-normal.svg" alt="" />
            </Link>
          </form>
        </div>
        <ul className="nav user-menu float-end">
          <li className="nav-item dropdown d-none d-md-block">
            <Link
              to="#"
              className="dropdown-toggle nav-Link"
              data-bs-toggle="dropdown"
            >
              <img src="assets/img/icons/note-icon-02.svg" alt="" />
              <span className="pulse"></span>{" "}
            </Link>
            <div className="dropdown-menu notifications">
              <div className="topnav-dropdown-header">
                <span>Notifications</span>
              </div>
              <div className="drop-scroll"></div>
              <div className="topnav-dropdown-footer">
                <Link to="activities.html">View all Notifications</Link>
              </div>
            </div>
          </li>
          <li className="nav-item dropdown d-none d-md-block">
            <Link
              to="#"
              id="open_msg_box"
              className="hasnotifications nav-Link"
            >
              <img src="assets/img/icons/note-icon-01.svg" alt="" />
              <span className="pulse"></span>{" "}
            </Link>
          </li>
          <li className="nav-item dropdown has-arrow user-profile-list">
            <Link
              to="#"
              className="dropdown-toggle nav-Link user-Link"
              data-bs-toggle="dropdown"
              style={{ display: "flex", alignItems: "center" }}
            >
              {/* <div className="user-names">
                <h5>SIT ADMIN </h5>
                <span>Admin</span>
              </div> */}
              <span className="user-img">
                <img src="assets/img/user-06.jpg" alt="Admin" />
              </span>
            </Link>
            <div className="dropdown-menu">
              <Link className="dropdown-item" to="profile.html">
                My Profile
              </Link>
              <Link className="dropdown-item" to="edit-profile.html">
                Edit Profile
              </Link>
              <Link className="dropdown-item" to="settings.html">
                Settings
              </Link>
              <Link className="dropdown-item" to="login.html">
                Logout
              </Link>
            </div>
          </li>
          <li className="nav-item ">
            <Link to="settings.html" className="hasnotifications nav-Link">
              <img src="assets/img/icons/setting-icon-01.svg" alt="" />{" "}
            </Link>
          </li>
        </ul>
        <div className="dropdown mobile-user-menu float-end">
          <Link
            to="#"
            className="dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa-solid fa-ellipsis-vertical"></i>
          </Link>
          <div className="dropdown-menu dropdown-menu-end">
            <Link className="dropdown-item" to="profile.html">
              My Profile
            </Link>
            <Link className="dropdown-item" to="edit-profile.html">
              Edit Profile
            </Link>
            <Link className="dropdown-item" to="settings.html">
              Settings
            </Link>
            <Link className="dropdown-item" to="login.html">
              Logout
            </Link>
          </div>
        </div>
      </div>
      <div className="sidebar" id="sidebar">
        <div className="sidebar-inner slimscroll">
          <div id="sidebar-menu" className="sidebar-menu">
            <ul>
              <li className="menu-title">Main</li>
              <li className="submenu">
                <Link to="/LaboratoryDashboard">
                  <span className="menu-side">
                    <img src="assets/img/icons/menu-icon-01.svg" alt="" />
                  </span>{" "}
                  <span> Dashboard </span>{" "}
                </Link>
              </li>

              {/* <li className="submenu">
                <Link to="/Appointment">
                  <span className="menu-side">
                    <img src="assets/img/icons/menu-icon-04.svg" alt="" />
                  </span>{" "}
                  <span> Appointments </span>
                </Link>
              </li> */}
              {/* <li className="submenu">
                <Link to="/laboratory">
                  <span className="menu-side">
                    <img src="assets/img/icons/menu-icon-04.svg" alt="" />
                  </span>{" "}
                  <span> Laboratory </span>
                </Link>
              </li> */}
              <li className="submenu">
                <Link to="/assistant">
                  <span className="menu-side">
                    <img src="assets/img/icons/menu-icon-04.svg" alt="" />
                  </span>{" "}
                  <span> Assistant </span>
                </Link>
              </li>
              {/* <li className="submenu">
                <Link to="/calendar">
                  <span className="menu-side">
                    <img src="assets/img/icons/menu-icon-05.svg" alt="" />
                  </span>{" "}
                  <span> Calendar </span>{" "}
                </Link>
              </li> */}
            </ul>
            <div className="logout-btn">
              <Link to="/">
                <span className="menu-side">
                  <img src="assets/img/icons/logout.svg" alt="" />
                </span>{" "}
                <span>Logout</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default navBar;
