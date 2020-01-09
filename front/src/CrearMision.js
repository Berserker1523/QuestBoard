import React from "react";
import { Link } from "react-router-dom";
import "./CrearMision.css";
import DatePicker from "react-datepicker";
import { postAPI } from "./API/BasicAPI";

import "react-datepicker/dist/react-datepicker.css";

class Inicio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      game: this.props.games[0]._id,
      description: "",
      finishDate: new Date(),
      minPlayers: 1,
      maxPlayers: 2,
      error: ""
    };
  }

  renderGamesChoice = () => {
    return this.props.games.map((game, i) => (
      <option key={i} value={game._id}>
        {game.name}
      </option>
    ));
  };

  handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  };

  handleChange = date => {
    this.setState({
      fechaFinal: date
    });
  };

  handleSubmit = event => {
    const gameIndex = this.props.games.findIndex(game => {
      return game._id === this.state.game;
    });
    const game = this.props.games[gameIndex];
    postAPI("/quests", {
      name: this.state.nombre,
      description: this.state.descripcion,
      finishDate: this.state.fechaFinal,
      maxPlayers: this.state.maxJugadores,
      minPlayers: this.state.minJugadores,
      owner: this.props.currentUser._id,
      game: game
    })
      .then(response => {
        console.log("Mision creada con exito:", response);
      })
      .catch(error => {
        this.props.setQuestsError(
          "Hubo un error al crear la misión, por favor inténtelo nuevamente."
        );
        console.error("Hubo un error al crear la mision:", error);
      });
  };

  render() {
    return (
      <div className="CrearMision">
        <div className="container-fluid crear-mision">
          {this.state.error !== "" ? (
            <p className="error">{this.state.error}</p>
          ) : (
            ""
          )}
          <div className="row informacion">
            <div className="col-md-12 form">
              <label htmlFor="">
                <input
                  type="text"
                  className="nombre"
                  name="nombre"
                  value={this.state.nombre}
                  onChange={this.handleInputChange}
                  placeholder="Nombre de la misión..."
                />
              </label>
              <br />
              <label htmlFor="">
                Juego
                <br />
                <select
                  className="juego"
                  value={this.state.game}
                  name="game"
                  onChange={this.handleInputChange}
                  placeholder="Juego de la misión..."
                >
                  {this.renderGamesChoice()}
                </select>
              </label>
              <br />
              <label htmlFor="">
                Descripción
                <br />
                <textarea
                  name="descripcion"
                  value={this.state.descripcion}
                  onChange={this.handleInputChange}
                  placeholder="Escribe algo.."
                />
              </label>
              <br />
              <label htmlFor="">
                Número mínimo y máximo de jugadores
                <br />
                <input
                  type="number"
                  name="minJugadores"
                  value={this.state.minJugadores}
                  onChange={this.handleInputChange}
                />
                -
                <input
                  type="number"
                  name="maxJugadores"
                  value={this.state.maxJugadores}
                  onChange={this.handleInputChange}
                />
              </label>
              <br />
              <label htmlFor="">
                Fecha de fin
                <br />
                <DatePicker
                  name="fechaFinal"
                  value={this.state.fechaFinal}
                  selected={this.state.fechaFinal}
                  onChange={this.handleChange}
                />
              </label>
              <br /> <br />
              <Link to={"/mis-misiones"}>
                <button className="btn-crear" onClick={this.handleSubmit}>
                  Crear
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Inicio;
