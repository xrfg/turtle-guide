import React from "react";
import { Link } from "react-router-dom";

const Account = ({ user }) => {
  return (
    <div className="container">
      <div className="row gap-4">
        <div style={{ height: "10rem" }} className="bg-info col p-2">
          <Link to="/events">Events</Link>
        </div>

        <div className="bg-info col p-2">
          <Link to="/about-admin">Admin Page</Link>
        </div>
      </div>
    </div>
  );
};

export default Account;
