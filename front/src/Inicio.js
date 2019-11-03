import React from "react";
import { Link } from "react-router-dom";
import "./Inicio.css";

class Inicio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apodo: '',
      contrasenia: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    /*console.log("Usuario componente Inicio: " + this.props.currentUser);*/
    return (
      <div className="Inicio">
        <div className="container-fluid inicio">
          <div className="row inicio-sesion">
            <form>
              <label htmlFor="">
                Nombre de usuario
                <br/>
                <input type="text" name="apodo" value={this.state.apodo} onChange={this.handleInputChange} size="35"/>
              </label>
              <br/> <br/>
              <label htmlFor="">
                Contraseña
                <br/>
                <input type="password" name="contrasenia" value={this.state.contrasenia} onChange={this.handleInputChange} size="35"/>
              </label>
              <br/> <br/>
              <Link to={"/tablero"}>
                <button type="submit" className="btn-inicio">Iniciar sesión</button>
              </Link>
            </form>
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
