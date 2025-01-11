import React from "react";
import { Link, useNavigate } from "react-router-dom";

function NavBar() {
  // Retrieve user role from sessionStorage
  const userRole = sessionStorage.getItem("post");
  const navigate = useNavigate();

  return (
    <div>
      <div className="header">
        <div className="header-left">
          <Link to="/dashboard" className="logo">
            <img src="assets/img/logo.png" width="35" height="35" alt="" />
            <span>Clinic</span>
          </Link>
        </div>
        <Link id="toggle_btn" to="#">
          <img src="assets/img/icons/bar-icon.svg" alt="" />
        </Link>
        <Link id="mobile_btn" className="mobile_btn float-start" to="#sidebar">
          <img src="assets/img/icons/bar-icon.svg" alt="" />
        </Link>
        <ul className="nav user-menu float-end">
          <li className="nav-item dropdown has-arrow user-profile-list">
            <Link
              to="#"
              className="dropdown-toggle nav-Link user-Link"
              data-bs-toggle="dropdown"
              style={{ display: "flex", alignItems: "center" }}
            >
              <span className="user-img">
                <img src="assets/img/user-06.jpg" alt="Admin" />
              </span>
            </Link>
            <div className="dropdown-menu">
              <Link className="dropdown-item" to="/profile">
                My Profile
              </Link>
              <Link className="dropdown-item" to="/">
                Logout
              </Link>
            </div>
          </li>
        </ul>
      </div>

      <div className="sidebar" id="sidebar">
        <div className="sidebar-inner slimscroll">
          <div id="sidebar-menu" className="sidebar-menu">
            <ul>
              <li className="menu-title">Main {userRole}</li>
              {/* Admin Role */}
              {userRole === "Admin" && (
                <>
                  <li className="submenu">
                    <Link to="/Dashboard">
                      <span className="menu-side">
                        <img src="assets/img/icons/menu-icon-01.svg" alt="" />
                      </span>{" "}
                      <span> Dashboard </span>{" "}
                    </Link>
                  </li>
                  <li className="submenu">
                    <Link to="/Appointment">
                      <span className="menu-side">
                        <img src="assets/img/icons/menu-icon-04.svg" alt="" />
                      </span>{" "}
                      <span> Appointments </span>
                    </Link>
                  </li>
                  <li className="submenu">
                    <Link to="/laboratory">
                      <span className="menu-side">
                        <img src="assets/img/icons/menu-icon-04.svg" alt="" />
                      </span>{" "}
                      <span> Diagnostic Centre </span>
                    </Link>
                  </li>
                  <li className="submenu">
                    <Link to="/assistant">
                      <span className="menu-side">
                        <img src="assets/img/icons/menu-icon-04.svg" alt="" />
                      </span>{" "}
                      <span> Technician </span>
                    </Link>
                  </li>
                  <li className="submenu">
                    <Link to="/calendar">
                      <span className="menu-side">
                        <img src="assets/img/icons/menu-icon-05.svg" alt="" />
                      </span>{" "}
                      <span> Calendar </span>{" "}
                    </Link>
                  </li>
                </>
              )}

              {/* Laboratory Role */}
              {userRole === "laboratory" && (
                <>
                  <li className="submenu">
                    <Link to="/Dashboard">
                      <span className="menu-side">
                        <img src="assets/img/icons/menu-icon-01.svg" alt="" />
                      </span>{" "}
                      <span> Dashboard </span>{" "}
                    </Link>
                  </li>
                  <li className="submenu">
                    <Link to="/assistant">
                      <span className="menu-side">
                        <img src="assets/img/icons/menu-icon-04.svg" alt="" />
                      </span>{" "}
                      <span> Technician </span>
                    </Link>
                  </li>
                </>
              )}
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

export default NavBar;
