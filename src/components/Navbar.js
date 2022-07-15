import React from "react";
import { Link } from "react-router-dom";
// import { Link, useLocation } from "react-router-dom";

export const Navbar = () => {
  return (
    <>
      <nav className="main-navbar">
        <div className="container-nav">
          <div className="img-area">
            <Link to="/">
              <img
                className="editorImg"
                id="editorImg"
                src="Code On Your Own.png"
                alt="Logo"
              />
            </Link>
          </div>
          <div className="sections">
            <Link className="links" id="linksText" to="/about">
              About
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};
