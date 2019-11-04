import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = props => {
  return (
    <div className="Navbar">
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
        <Link className="navbar-brand" to={props.currentUser === null ? "/" : "/tablero"}>
          <img src="../QBLogo.png" alt="Quest Board logo" className="navbar-logo"/>
        </Link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ">
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
            {props.currentUser  !== null ? (
              <li className="nav-item">
                <Link
                  to={"/chats"}
                  className={
                    props.paginaActual === "Tablero"
                      ? "nav-link-disabled"
                      : "nav-link"
                  }
                >
                  Chats
                </Link>
              </li>
            ) : (
              ""
            )}
            {props.currentUser  !== null ? (
              <li className="nav-item">
                <Link
                  to={"/perfil"}
                  className={
                    props.paginaActual === "Tablero"
                      ? "nav-link-disabled"
                      : "nav-link"
                  }
                >
                  Perfil
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