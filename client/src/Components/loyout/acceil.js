import React from "react";
import Side from "../../side/Navbar";
import { useSelector } from "react-redux";
import Nav from "../../side/SideUser";

const Acceil = () => {
  const user = useSelector((state) => state.userReducer.user);
 
  const isAdmin=(user.role==="admin superieur")

  if (isAdmin) {
    return (
      <div>
        <Side />
     
      </div>
    );
  } else {
    return (
      <div>
        <Nav />
      
      </div>
    );
  }
};

export default Acceil;
