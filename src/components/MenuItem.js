import React from "react";
import { NavLink } from "react-router-dom";

export default function MenuItem({ name, link }) {
  return (
    <li className="nav-item">
      {true ? (
        <NavLink exact to={link} className="nav-link" activeClassName="active">
          {name}
        </NavLink>
      ) : (
        <NavLink to={link} className="nav-link" activeClassName="active">
          {name}
        </NavLink>
      )}
    </li>
  );
}
