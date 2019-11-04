import React from "react";
import { Link } from "react-router-dom";
import "./TableroMisiones.css";
import Mision from "./Mision.js";

class TableroMisiones extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      misiones: [],
      usuarioActual: this.props.currentUser,
    }
  }

  renderMisiones() {
    fetch("/quests")
      .then(res => res.json())
      .then(data => this.setState({misiones: data}))
      .catch();

    return this.state.misiones.map(
      (mision,i) => (mision.completed === false
        ? <div className="col-md-4"><Mision info={mision} key={i} /></div>
        : <div className="col-md-0"></div>));
  }

  render() {
    return (
      <div>
        {this.props.currentUser !== null ?
        <div className="TableroMisiones">
          <div className="container-fluid misiones">
            <div className="row">
              {this.renderMisiones()}
            </div>
          </div>
        </div>
        : <Link to={"/"}> <p>Ese usuario no existe, por favor ingrese de nuevo </p> </Link>
        }
      </div>
    );
  }
}

export default TableroMisiones;
