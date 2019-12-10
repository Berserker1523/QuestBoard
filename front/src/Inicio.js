import React from "react";
import { Link } from "react-router-dom";
import "./Inicio.css";
import Mision from "./Mision.js";

class Inicio extends React.Component {
  constructor(props) {
    super(props);
  }

  renderMisiones() {
    return this.props.quests.map((mision, i) => {
        return (
          <div className="col-md-4" key={i}>
            <Mision info={mision} currentUser={this.props.currentUser} />
          </div>
        );
      } 
    );
  }

  render() {
    return (
      <div className="Inicio">
        <div className="container-fluid misiones">
          <div className="row">
            {this.renderMisiones()}
          </div>
        </div>
      </div>
    );
  }
}

export default Inicio;
