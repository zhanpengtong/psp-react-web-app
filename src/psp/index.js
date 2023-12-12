import Home from "./home";
import Cart from "./cart";
import Details from "./details";
import Login from "./login";
import Profile from "./profile";
import Register from "./register";
import Search from "./search";
import Seller from "./seller";
import PspNavigation from "./pspNavigation";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function Psp() {
  return (
    <Router>
      <div className="d-flex">
        <PspNavigation />
        <div >
          <Routes>
            <Route path="/psp/login" element={<Login />} />
            <Route path="/psp/register" element={<Register />} />
            <Route path="/psp/profile" element={<Profile />} />
            <Route path="/psp/home" element={<Home />} />
            <Route path="/psp/search" element={<Search />} />
            <Route path="/psp/cart" element={<Cart />} />
            <Route path="/psp/details" element={<Details />} />
            <Route path="/psp/seller" element={<Seller />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
export default Psp;