import { Link, useLocation } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { GrAddCircle } from "react-icons/gr";
import { HiOutlineHome } from "react-icons/hi";
import { FaSearch } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { SiSellfy } from "react-icons/si";
import {FiLogOut } from "react-icons/fi";
import React from "react";
import "./index.css";
<script src="https://kit.fontawesome.com/e54e112e4f.js" crossorigin="anonymous"></script>

function PspNavigation() {
  const links = ["LogIn", "Register", "Profile", "Home", "Search", "Cart", "Seller", "Signout"];
  const linkToIconMap = {
    LogIn: <FiLogIn className="wd-icon" />,
    Register: <GrAddCircle className="wd-icon" />,
    Profile: <CgProfile className="wd-icon" />,
    Home: <HiOutlineHome className="wd-icon" />,
    Search: <FaSearch className="wd-icon" />,
    Cart: <FiShoppingCart className="wd-icon" />,
    Seller: <SiSellfy className="wd-icon" />,
    Signout: <FiLogOut className="wd-icon" />,
  };


  const { pathname } = useLocation();
  return (
    <div className="list-group wd-navigation" style={{ width: 150 }}>
      {links.map((link, index) => (
        <Link
          key={index}
          to={`/psp/${link}`}
          className={`list-group-item ${pathname.includes(link) && "active"}`}
        >
          {linkToIconMap[link]}
          {link}
        </Link>
      ))}
    </div>
  );
}
export default PspNavigation;