import React from "react";
import "./TableroMisiones.css";
import Mision from "./Mision.js";

class TableroMisiones extends React.Component {
  constructor(props) {
    super(props);
    this.renderMisiones = this.renderMisiones.bind(this);
  }

  renderMisiones() {
    return this.props.quests.map((mision, i) =>
      mision.completed === false ? (
        <div className="col-md-4" key={i}>
          <Mision info={mision} currentUser={this.props.currentUser} />
        </div>
      ) : null
    );
  }

  componentDidMount() {
    this.props.GetQuests();
  }

  render() {
    console.log(this.props.currentUser.ownGames.length);
    return (
      <div>
        {this.props.questsError !== "" ? (
          <p className="error">{this.props.questsError}</p>
        ) : (
          ""
        )}
        <div className="TableroMisiones">
          <div className="container-fluid misiones">
            {this.props.currentUser &&
            this.props.currentUser.ownGames.length >= 1 ? (
              <div className="row">{this.renderMisiones()}</div>
            ) : (
              <div className="row">
                <h1 className="error">
                  Agrega un juego para poder ver sus misiones!
                </h1>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default TableroMisiones;
