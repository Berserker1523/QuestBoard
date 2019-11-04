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
        mision.owner === this.props.currentUser._id ||
        mision.players.findIndex(id => id === this.props.currentUser._id) >= 0
      ) {
        return (
          <div className="col-md-4" key={i}>
            <Mision info={mision} currentUser={this.props.currentUser} />
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
            <div className="col-md-4">
              <div className="agregar-mision">
                <Link to="crear-mision">
                  <img
                    className="plus-icon"
                    src="https://icon-library.net/images/white-plus-icon/white-plus-icon-3.jpg"
                    alt="Agregar misión"
                  />
                </Link>
              </div>
            </div>
            {this.renderMisiones()}
          </div>
        </div>
      </div>
    );
  }
}

export default MisMisiones;
