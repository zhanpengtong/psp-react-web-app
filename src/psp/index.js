import Home from "./home";
import Cart from "./cart";
import Details from "./details";
import Login from "./login";
import Profile from "./profile";
import Register from "./register";
import Search from "./search";
import Seller from "./seller";
import Alluser from "./profile/allUser";
import EditUser from "./profile/editUser";
import PspNavigation from "./pspNavigation";
import Signout from "./signout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function Psp() {
  return (
    <Router>
      <div className="d-flex">
        <div >
          <PspNavigation />
        </div>
        <div className="col">
        <Routes>
            <Route path="/psp/login" element={<Login />} />
            <Route path="/psp/register" element={<Register />} />
            <Route path="/psp/profile" element={<Profile />} />
            <Route path="/psp/profile/:id" element={<Profile />} />
            <Route path="/psp/home" element={<Home />} />
            <Route path="/psp/search" element={<Search />} />
            <Route path="/psp/cart" element={<Cart />} />
            <Route path="/psp/details/:id" element={<Details />} />
            <Route path="/psp/seller" element={<Seller />} />
            <Route path="/psp/profile/allUser" element={<Alluser />} />
            <Route path="/psp/profile/editUser" element={<EditUser />} />
            <Route path="/psp/search/:searchTerm" element={<Search />} />
            <Route path="/psp/signout" element={<Signout />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
export default Psp;