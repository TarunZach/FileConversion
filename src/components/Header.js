import React from "react";
import "./css/main.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <nav className="main-nav">
        <h2 className="title">File Conversion</h2>

        <ul className="main-menu">
          <li>
            <Link className="navlink" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="navlink" to="/">
              Excel to PPT/PDF
            </Link>
          </li>
          <li>
            <Link className="navlink" to="candidate">
              Form to PDF
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Header;
