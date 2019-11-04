import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = props => {
  return (
    <div className="Navbar">
      <nav className="navbar navbar-expand-lg fixed-top">
        <Link className="navbar-brand" to={props.currentUser === null ? "/" : "/tablero"}>
          <img src="../QBLogo.png" alt="Quest Board logo" className="navbar-logo"/>
        </Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            {props.currentUser  !== null ? (
              <li className="nav-item">
                <Link
                  to={"/mis-misiones"}
                  className={
                    props.paginaActual === "Tablero"
                      ? "nav-link-disabled"
                      : "nav-link"
                  }
                >
                  Mis misiones
                </Link>
              </li>
            ) : (
              ""
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;