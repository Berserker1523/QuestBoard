import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = props => {

  const login = () => {
    fetch("/auth/login", {
      method: "GET",
      mode: 'cors',
      headers: {
        "Content-Type": "application/json"
      }
    });
  };

  const logout = () => {
    fetch("/auth/logout", {
      method: "GET",
      mode: 'cors',
      headers: {
        "Content-Type": "application/json"
      }
    });
  };

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
                <button className="nav-link my-2 my-sm-0" onClick={login}>Incia sesión</button>
              </li>
            ) : (
              ""
            )}
            {props.currentUser !== null ? (
              <li className="nav-item">
                <button className="nav-link-disabled" onClick={logout}>Cerrar sesión</button>
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
