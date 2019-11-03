import React from "react";
import Navbar from "./Navbar.js";
import { Link } from "react-router-dom";
import "./Inicio.css";

class Inicio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    /*console.log("Usuario componente Inicio: " + this.props.currentUser);*/
    return (
      <div className="Inicio">
        <Navbar />
        <div className="inicio-sesion">
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="">
              Nombre de usuario:
              <br/>
              <input type="text" value={this.state.value} onChange={this.handleChange}/>
            </label>
            <br/>
            <label htmlFor="">
              Contraseña:
              <br/>
              <input type="password"/>
            </label>
          </form>
        </div>
      </div>
    );
  }
}

export default Inicio;
