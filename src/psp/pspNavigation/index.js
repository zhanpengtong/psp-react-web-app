import { Link, useLocation } from "react-router-dom";
import React from "react";
import "./index.css";

function PspNavigation() {
  const links = ["login", "register", "profile", "home", "search", "cart", "details", "seller"];
  const { pathname } = useLocation();
  return (
    <ul className="list-group wd-kanbas-navigation" style={{ width: 150 }}>
      {links.map((link, index) => (
        <li>
          <Link
            key={index}
            to={`/psp/${link}`}
            className={`list-group-item ${pathname.includes(link) && "active"}`}>
            {link}
          </Link>
        </li>
      ))}
    </ul>
  );
}
export default PspNavigation;