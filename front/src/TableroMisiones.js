import React from "react";
import { Link } from "react-router-dom";
import "./TableroMisiones.css";
import Mision from "./Mision.js"

class TableroMisiones extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      misiones: ["holi"],
    }
  }

  renderMisiones() {
    return this.state.misiones.map(
      (mision,i) => <Mision info={mision} key={i} />);
  }

  render() {
    /*console.log("Usuario componente Inicio: " + this.props.currentUser);*/
    return (
      <div className="TableroMisiones">
        {this.renderMisiones()}
      </div>
    );
  }
}

export default TableroMisiones;
