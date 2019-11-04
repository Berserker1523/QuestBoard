import React from "react";
import { Link } from "react-router-dom";
import "./TableroMisiones.css";
import Mision from "./Mision.js"

class TableroMisiones extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      misiones: ["holi", "holi", "holi", "holi", "holi", "holi", "holi", "holi", "holi", "holi",],
      usuarioActual: this.props.currentUser,
    }
  }

  renderMisiones() {
    return this.state.misiones.map(
      (mision,i) => <div className="col-md-4"><Mision info={mision} key={i} /></div>);
  }

  render() {
    /*console.log("Usuario componente Inicio: " + this.props.currentUser);*/
    return (
      <div className="TableroMisiones">
        <div className="container-fluid misiones">
          <div className="row">
            {this.renderMisiones()}
          </div>
        </div>
      </div>
    );
  }
}

export default TableroMisiones;
