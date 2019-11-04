import React from "react";
import { Link } from "react-router-dom";
import "./Inicio.css";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      mail: "",
      password: "",
      age: "",
      country: "Colombia",
      error: ""
    };

    this.handleNameInput = this.handleNameInput.bind(this);
    this.handleMailInput = this.handleMailInput.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
    this.handleAgeInput = this.handleAgeInput.bind(this);
    this.handleCountryInput = this.handleCountryInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameInput(event) {
    this.setState({
      name: event.target.value
    });
  }

  handleMailInput(event) {
    this.setState({
      mail: event.target.value
    });
  }

  handlePasswordInput(event) {
    this.setState({
      password: event.target.value
    });
  }

  handleAgeInput(event) {
    this.setState({
      age: Number(event.target.value)
    });
  }

  handleCountryInput(event) {
    this.setState({
      country: event.target.value
    });
  }

  handleSubmit() {
    fetch("/users/", {
      method: "POST",
      body: JSON.stringify({
        name: this.state.name,
        mail: this.state.mail,
        password: this.state.password,
        age: this.state.age,
        country: this.state.country,
        avatar: null
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(response => {
        this.props.setUser(response);
        this.setState({ error: "" });
      })
      .catch(err => {
        this.setState({
          error: "No fue posible crear el usuario, inténtelo nuevamente"
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
                Nombre de usuario
                <br />
                <input
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleNameInput}
                  size="35"
                />
              </label>
              <br /> <br />
              <label htmlFor="">
                Correo electrónico
                <br />
                <input
                  type="email"
                  name="email"
                  value={this.state.mail}
                  onChange={this.handleMailInput}
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
              <label htmlFor="">
                Edad
                <br />
                <input
                  type="text"
                  name="age"
                  value={this.state.age}
                  onChange={this.handleAgeInput}
                  size="35"
                />
              </label>
              <br /> <br />
              <button className="btn-inicio" onClick={this.handleSubmit}>
                Registrarse
              </button>
            </div>
          </div>
          <div className="row registro">
            <p>¿Ya tienes una cuenta?</p>
            <Link className="registrar" to={"/"}>
              <p>Inicia sesión</p>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
