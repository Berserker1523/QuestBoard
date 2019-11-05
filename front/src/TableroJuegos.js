import React from "react";
import "./TableroMisiones.css";
import Juego from "./Juego.js";

class TableroJuegos extends React.Component {
  constructor(props) {
    super(props);
    this.renderGames = this.renderGames.bind(this);
  }

  renderGames() {
    return this.props.games.map((game, i) => (
      <div className="col-md-4" key={i}>
        <Juego
          info={game}
          currentUser={this.props.currentUser}
          setUser={this.props.setUser}
        />
      </div>
    ));
  }

  componentDidMount() {
    this.props.GetGames();
  }

  render() {
    return (
      <div>
        {this.props.gamesError !== "" ? (
          <p className="error">{this.props.gamesError}</p>
        ) : (
          ""
        )}
        <div className="TableroMisiones">
          <div className="container-fluid misiones">
            <div className="row">{this.renderGames()}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default TableroJuegos;
