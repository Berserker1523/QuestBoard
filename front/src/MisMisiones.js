import React from "react";
import { Link } from "react-router-dom";
import "./TableroMisiones.css";
import Mision from "./Mision.js";
import "./MisMisiones.css";

class MisMisiones extends React.Component {
  constructor(props) {
    super(props);

    this.renderMisiones = this.renderMisiones.bind(this);
  }

  renderMisiones() {
    return this.props.quests.map((mision, i) => {
      if (
        mision.owner._id === this.props.user._id ||
        mision.players.findIndex(
          player => player._id === this.props.user._id
        ) >= 0
      ) {
        return (
          <div className="col-md-4" key={i}>
            <Mision info={mision} user={this.props.user} />
          </div>
        );
      } else {
        return "";
      }
    });
  }

  render() {
    return (
      <div className="MisMisiones">
        <div className="container-fluid misiones">
          <div className="row">
            <div className="col-md-12">
              <div className="agregar-mision">
                <Link to="crear-mision">
                  <button className="btn-crear-mision">Crear misión</button>
                </Link>
              </div>
            </div>
          </div>
          <div className="row">{this.renderMisiones()}</div>
        </div>
      </div>
    );
  }
}

export default MisMisiones;
