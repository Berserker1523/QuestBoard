import React from "react";
import { Link } from "react-router-dom";
import "./CrearMision.css";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

class Inicio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
      nombre: "",
      game: "",
      descripcion: "",
      fechaFinal: new Date(),
      minJugadores: 1,
      maxJugadores: 2,
      error: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderGamesChoice = this.renderGamesChoice.bind(this);
  }

  renderGamesChoice() {
    return this.state.games.map((game, i) => (
      <option key={i} value={game._id}>
        {game.name}
      </option>
    ));
  }

  componentDidMount() {
    fetch("/games")
      .then(res => res.json())
      .then(data => this.setState({ games: data, game: data[0]._id }))
      .catch(err => this.setState({ error: err }));
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleChange = date => {
    this.setState({
      fechaFinal: date
    });
  };

  handleSubmit(event) {
    fetch("/quests", {
      method: "POST",
      body: JSON.stringify({
        name: this.state.nombre,
        description: this.state.descripcion,
        finishDate: this.state.fechaFinal,
        maxPlayers: this.state.maxJugadores,
        minPlayers: this.state.minJugadores,
        owner: this.props.currentUser._id,
        game: this.state.game
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .catch(error => console.error("Error:", error))
      .then(response => console.log("Success:", response));
  }

  render() {
    return (
      <div className="CrearMision">
        <div className="container-fluid crear-mision">
          <div className="row informacion">
            <div className="col-md-12">
              <form>
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
                    name="game"
                    value={this.state.game}
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
                  >
                    {" "}
                  </textarea>
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
                  <button
                    type="submit"
                    className="btn-crear"
                    onClick={this.handleSubmit}
                  >
                    Crear
                  </button>
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Inicio;
