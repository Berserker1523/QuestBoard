import React from "react";
import "./Inicio.css";

class Inicio extends React.Component {
  render() {
    return (
      <div className="Inicio">
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <img src="../Inicio.png" alt="Instrucciones quest board" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Inicio;
