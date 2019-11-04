import React from "react";
import { Link } from "react-router-dom";
import "./Mision.css";

class Mision extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: this.props.info,
    }
  }

  render() {
    /*console.log("Usuario componente Inicio: " + this.props.currentUser);*/
    return (
      <div className="Mision">
        <div className="container-fluid mision">
          <div className="row nombre">
            nombre
          </div>
          <div className="row descripcion">
            descripcion
          </div>
          <div className="row jugadores">
            jugadores
          </div>
          <div className="row botones">
              <button className="btn-rechazar">Rechazar</button>
              <button className="btn-unirse">Unirse</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Mision;