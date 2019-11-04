import React from "react";
import { Link } from "react-router-dom";
import "./Inicio.css";

class Inicio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: ""
    };

    this.handleEmailInput = this.handleEmailInput.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailInput(event) {
    this.setState({
      email: event.target.value
    });
  }

  handlePasswordInput(event) {
    this.setState({
      password: event.target.value
    });
  }

  handleSubmit() {
    fetch("/users/" + this.state.email)
      .then(res => res.json())
      .then(response => {
        if (this.state.password === response.password) {
          this.props.setUser(response);
          this.setState({ error: "" });
        } else {
          this.setState({
            error: "El correo electrónico o  la contraseña no son correctos"
          });
        }
      })
      .catch(err => {
        this.setState({
          error: "El correo electrónico o  la contraseña no son correctos"
        });
      });
  }

  render() {
    return (
      <div className="Inicio">
        <div className="container-fluid inicio">
          <div className="row inicio-sesion">
            <div className="form">
              {this.state.error !== "" ? (
                <p className="error">{this.state.error}</p>
              ) : (
                ""
              )}
              <label htmlFor="">
                Correo electrónico
                <br />
                <input
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleEmailInput}
                  size="35"
                />
              </label>
              <br /> <br />
              <label htmlFor="">
                Contraseña
                <br />
                <input
                  type="password"
                  name="contrasenia"
                  value={this.state.password}
                  onChange={this.handlePasswordInput}
                  size="35"
                />
              </label>
              <br /> <br />
              {/*<Link to={"/tablero"}>*/}
              <button className="btn-inicio" onClick={this.handleSubmit}>
                Iniciar sesión
              </button>
              {/*</Link>*/}
            </div>
          </div>
          <div className="row registro">
            <p>¿Aún no tienes una cuenta?</p>
            <Link className="registrar" to={"/"}>
              <p>Regístrate</p>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Inicio;
