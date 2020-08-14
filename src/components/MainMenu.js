import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { selectToken } from "../store/user/selectors";
import { logOut } from "../store/user/actions";
import MenuItem from "./MenuItem";

export default function MainMenu() {
  const token = useSelector(selectToken);
  const dispatch = useDispatch();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo01"
        aria-controls="navbarTogglerDemo01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
        <Link className="navbar-brand" to="/">
          Calorie Buddy
        </Link>

        {token ? (
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <MenuItem name="Dashboard" link="/" />
            <MenuItem name="Logs" link="/logs" />
            <MenuItem name="Budget" link="/budget" />
            <MenuItem name="Weight" link="/weight" />
            <MenuItem name="Settings" link="/settings" />
            <li className="nav-item">
              <Link
                to="/"
                className="nav-link"
                onClick={() => dispatch(logOut())}
              >
                Log Out
              </Link>
            </li>
          </ul>
        ) : (
          ""
        )}
      </div>
    </nav>
  );
}
