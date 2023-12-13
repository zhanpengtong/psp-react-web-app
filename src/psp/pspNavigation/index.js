import { Link, useLocation } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";
import { RiDashboard3Fill } from "react-icons/ri";
import { FaBook } from "react-icons/fa";
import { BsFillCalendar2WeekFill } from "react-icons/bs";
import { BsFillInboxFill } from "react-icons/bs";
import { AiOutlineClockCircle } from "react-icons/ai";
import { FaSlideshare } from "react-icons/fa";
import React from "react";
import "./index.css";
<script src="https://kit.fontawesome.com/e54e112e4f.js" crossorigin="anonymous"></script>

function PspNavigation() {
  const links = ["LogIn", "Register", "Profile", "Home", "Search", "Cart", "Details", "Seller"];
  const linkToIconMap = {
    Login: <RiDashboard3Fill className="wd-icon" />,
    Profile: <RiDashboard3Fill className="wd-icon" />,
    Home: <FaBook className="wd-icon" />,
    Search: <BsFillCalendar2WeekFill className="wd-icon" />,
    Cart: <BsFillInboxFill className="wd-icon" />,
    Details: <AiOutlineClockCircle className="wd-icon" />,
    Seller: <FaSlideshare className="wd-icon" />,
  };


  const { pathname } = useLocation();
  return (
    <div className="list-group wd-kanbas-navigation" style={{ }}>
      {links.map((link, index) => (
        <Link
          key={index}
          to={`/psp/${link}`}
          className={`list-group-item ${pathname.includes(link) && "active"}`}
        >
          {linkToIconMap[link]}
          <br/>
          {link}
        </Link>
      ))}
    </div>
  );
}
export default PspNavigation;