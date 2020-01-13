import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = props => {
  console.log("Navbar:");
  console.log(props.backURL);
  return (
    <div className="Navbar">
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
        <Link
          className="navbar-brand"
          to={props.currentUser === null ? "/" : "/tablero"}
        >
          <img
            src="../questBoardLogo.jpeg"
            alt="Quest Board logo"
            className="navbar-logo"
          />
        </Link>

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

        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav">
            {props.currentUser !== null ? (
              <li className="nav-item needPadding">
                {props.location.pathname !== "/mis-misiones" ? (
                  <Link to={"/mis-misiones"} className="nav-link2">
                    Mis misiones
                  </Link>
                ) : (
                  <a
                    className="nav-link-disabled"
                    href="/"
                    tabIndex="-1"
                    aria-disabled="true"
                  >
                    Mis misiones
                  </a>
                )}
              </li>
            ) : (
              ""
            )}

            {props.currentUser !== null ? (
              <li className="nav-item needPadding">
                {props.location.pathname !== "/juegos" ? (
                  <Link to={"/juegos"} className="nav-link2">
                    Juegos
                  </Link>
                ) : (
                  <a
                    className="nav-link-disabled"
                    href="/"
                    tabIndex="-1"
                    aria-disabled="true"
                  >
                    Juegos
                  </a>
                )}
              </li>
            ) : (
              ""
            )}
            {props.currentUser === null ? (
              <li className="nav-item">
                <a
                  className="nav-link my-2 my-sm-0"
                  href={props.backURL + "/auth/login"}
                >
                  Inicia sesión
                </a>
              </li>
            ) : (
              ""
            )}
            {props.currentUser !== null ? (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="/"
                  id="navbarDropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {props.currentUser.name}
                </a>
                <div
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  {/*<Link
                    to={"/perfil"}
                    className={
                      props.paginaActual !== "Perfil"
                        ? "dropdown-item nav-link-disabled"
                        : "dropdown-item nav-link active"
                    }
                  >
                    Perfil
                  </Link>*/}
                  <a
                    className="dropdown-item disabled"
                    href="/"
                    tabIndex="-1"
                    aria-disabled="true"
                  >
                    Perfil
                  </a>
                  <a
                    className="dropdown-item nav-link2"
                    href={props.backURL + "/auth/logout"}
                  >
                    Cerrar sesión
                  </a>
                </div>
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
