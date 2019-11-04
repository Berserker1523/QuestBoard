import React from "react";
import { Link } from "react-router-dom";
import "./TableroMisiones.css";
import Mision from "./Mision.js";
import "./MisMisiones.css";

class MisMisiones extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      misiones: [],
      usuarioActual: this.props.currentUser
    };

    this.renderMisiones = this.renderMisiones.bind(this);
  }

  componentDidMount() {
    if (this.state.usuarioActual !== null) {
      fetch("/users/" + this.state.usuarioActual.mail + "/quests")
        .then(res => res.json())
        .then(data => this.setState({ misiones: data }))
        .catch();
    }
  }

  renderMisiones() {
    return this.state.misiones.map((mision, i) => (
      <div className="col-md-4" key={i}>
        <Mision info={mision} currentUser={this.props.currentUser} />
      </div>
    ));
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
