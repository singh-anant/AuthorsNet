import React, { useContext, useRef } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { FaBars, FaTimes } from "react-icons/fa";
const Navbar = () => {
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };
  const { currentUser, logout } = useContext(AuthContext);
  return (
    <div className="navbar">
      <div className="logo">
        <Link className="logo" to="/">
          <h1>BlogIO</h1>
        </Link>
      </div>
      <div className="container" ref={navRef}>
        <Link className="link" to="/?cat=art">
          ART
        </Link>

        <Link className="link" to="/?cat=technology">
          TECHNOLOGY
        </Link>

        <Link className="link" to="/?cat=design">
          DESIGN
        </Link>
        <Link className="link" to="/?cat=food">
          FOOD
        </Link>
        <div className="auth">
          <span>{currentUser?.username}</span>
          {currentUser ? (
            <span onClick={logout}>Logout</span>
          ) : (
            <Link className="link" to="/login">
              Login
            </Link>
          )}
          <span className="write">
            <Link className="link" to="/write">
              Write
            </Link>
          </span>
        </div>

        {/* </div> */}

        <button className="navbtn closebtn" onClick={showNavbar}>
          <FaTimes />
        </button>
      </div>
      <button className="navbtn" onClick={showNavbar}>
        <FaBars />
      </button>
    </div>
  );
};

export default Navbar;
