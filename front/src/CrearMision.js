import "date-fns";
import React from "react";
import { Link } from "react-router-dom";
import "./CrearMision.css";
import { postAPI } from "./API/BasicAPI";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";

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

  handleDateChange = date => {
    console.log("Llegue handle Date Change");
    console.log(date);
    this.setState({
      finishDate: date
    });
  };

  handleSubmit = event => {
    const gameIndex = this.props.games.findIndex(game => {
      return game._id === this.state.game;
    });
    const game = this.props.games[gameIndex];

    const owner = {
      _id: this.props.currentUser._id,
      name: this.props.currentUser.name
    };

    const players = [owner];

    postAPI("/quests", {
      name: this.state.name,
      description: this.state.description,
      finishDate: this.state.finishDate,
      minPlayers: this.state.minPlayers,
      maxPlayers: this.state.maxPlayers,
      owner: owner,
      players: players,
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
    console.log(this.state.finishDate);
    return (
      <div className="CrearMision">
        <div className="container-fluid crear-mision form">
          <div className="row form-row">
            <div className="col">
              <label htmlFor="nombre"> Nombre de la misión </label>
              <br />
              <input
                id="nombre"
                name="name"
                type="text"
                className="quest-name"
                value={this.state.nombre}
                onChange={this.handleInputChange}
                maxLength="28"
              />
            </div>
          </div>
          <div className="row form-row">
            <div className="col">
              <label htmlFor="juego"> Juego </label>
              <br />
              <select
                id="juego"
                className="juego"
                value={this.state.game}
                name="game"
                onChange={this.handleInputChange}
              >
                {this.renderGamesChoice()}
              </select>
            </div>
          </div>
          <div className="row form-row">
            <div className="col">
              <label htmlFor="descripcion"> Descripción </label>
              <br />
              <textarea
                id="descripcion"
                value={this.state.descripcion}
                onChange={this.handleInputChange}
                name="description"
                className="form-textarea"
              />
            </div>
          </div>
          <div className="row form-row">
            <div className="col">
              <label htmlFor="minJugadores">Mínimo y máximo de jugadores</label>
              <br />
              <input
                type="number"
                min="1"
                id="minJugadores"
                value={this.state.minJugadores}
                onChange={this.handleInputChange}
                name="minPlayers"
              />
              -
              <input
                type="number"
                id="maxJugadores"
                value={this.state.maxJugadores}
                onChange={this.handleInputChange}
                name="maxPlayers"
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label htmlFor="">Fecha de finalización</label>
              <br />
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  format="dd/MM/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  value={this.state.finishDate}
                  onChange={this.handleDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date"
                  }}
                />
              </MuiPickersUtilsProvider>
            </div>
          </div>
          <div className="row form-row">
            <div className="col">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardTimePicker
                  margin="normal"
                  id="time-picker"
                  value={this.state.finishDate}
                  onChange={this.handleDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change time"
                  }}
                />
              </MuiPickersUtilsProvider>
            </div>
          </div>
          <div className="row">
            <div className="col">
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
