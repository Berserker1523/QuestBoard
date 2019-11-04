import React from "react";
import { Link } from "react-router-dom";
import "./CrearMision.css";

class Inicio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: '',
      descripcion: '',
      fechaInicial: '',
      fechaFinal: '',
      minJugadores: 1,
      maxJugadores: 2,
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
  }

  render() {
    /*console.log("Usuario componente Inicio: " + this.props.currentUser);*/
    return (
      <div className="CrearMision">
        <div className="container-fluid crear-mision">
          <div className="row informacion">
            <form>
              <label htmlFor="">
                <input type="text" name="nombre" value={this.state.email} onChange={this.handleInputChange} size="50"/>
              </label>
              <br/> <br/>
              <label htmlFor="">
                Descripcion
                <br/>
                <input type="text" name="descripcion" value={this.state.descripcion} onChange={this.handleInputChange} size="35"/>
              </label>
              <br/>
              <label htmlFor="">
                Número mínimo y máximo de jugadores
                <br/>
                <input type="number" name="minJugadores" value={this.state.minJugadores} onChange={this.handleInputChange} size="5"/>
                -
                <input type="number" name="maxJugadores" value={this.state.maxJugadores} onChange={this.handleInputChange} size="5"/>
              </label>
              <br/>
              <label htmlFor="">
                Fecha de inicio
                <br/>
                <input type="text" name="fechaInicial" value={this.state.fechaInicial} onChange={this.handleInputChange} size="35"/>
              </label>
              <label htmlFor="">
                Fecha de fin
                <br/>
                <input type="text" name="fechaFinal" value={this.state.fechaFinal} onChange={this.handleInputChange} size="35"/>
              </label>
              <br/> <br/>
              <Link to={"/mis-misiones"}>
                <button type="submit" className="btn-crear" onClick={this.handleSubmit}>Crear</button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Inicio;
