import React, { useEffect } from "react";
import * as client from "../client";
import { useNavigate } from "react-router-dom";

function Signout() {
  const navigate = useNavigate();
  const signout = async () => {
    const status = await client.signout();
    navigate("/psp/login");
  };

  useEffect(() => {
    signout();
  }, []);

}
export default Signout;
