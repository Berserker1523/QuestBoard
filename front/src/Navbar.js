import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = props => {
  return (
    <div className="Navbar">
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
        <a className="navbar-brand">
          <Link
            to={props.currentUser === null ? "/" : "/tablero"}
          >
            <img
              src="../QBLogo.png"
              alt="Quest Board logo"
              className="navbar-logo"
            />
          </Link>
        </a>
        <button
          className="navbar-toggler" 
          type="button" 
          data-toggle="collapse" 
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
          <ul className="navbar-nav">
            {props.currentUser !== null ? (
              <li className="nav-item">
                <Link
                  to={"/mis-misiones"}
                  className={
                    props.paginaActual !== "Mis misiones"
                      ? "nav-link-disabled"
                      : "nav-link active"
                  }
                >
                  Mis misiones
                </Link>
              </li>
            ) : (
              ""
            )}
            {props.currentUser !== null ? (
              <li className="nav-item">
                <Link
                  to={"/perfil"}
                  className={
                    props.paginaActual !== "Perfil"
                      ? "nav-link-disabled"
                      : "nav-link active"
                  }
                >
                  Perfil
                </Link>
              </li>
            ) : (
              ""
            )}
            {props.currentUser !== null ? (
              <li className="nav-item">
                <Link
                  to={"/juegos"}
                  className={
                    props.paginaActual !== "Juegos"
                      ? "nav-link-disabled"
                      : "nav-link active"
                  }
                >
                  Juegos
                </Link>
              </li>
            ) : (
              ""
            )}
            {props.currentUser === null ? (
              <li className="nav-item">
                <a className="nav-link my-2 my-sm-0" href="http://localhost:3001/auth/login">Incia sesión</a>
              </li>
            ) : (
              ""
            )}
            {props.currentUser !== null ? (
              <li className="nav-item">
                <a className="nav-link-disabled" href="http://localhost:3001/auth/logout">Cerrar sesión</a>
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
