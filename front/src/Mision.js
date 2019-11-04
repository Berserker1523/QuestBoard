import React from "react";
import "./Mision.css";

const Mision = props => {
  return (
    <div className="Mision">
      <div className="container-fluid mision">
        <div className="row nombre">{props.info.name}</div>
        <div className="row descripcion">
          <p>{props.info.description}</p>
        </div>
        <div className="row jugadores">
          jugadores {props.info.players.length + 1} / {props.info.maxPlayers}
        </div>
        <div className="row botones">
          <button className="btn-rechazar">Rechazar</button>
          <button className="btn-unirse">Unirse</button>
        </div>
      </div>
    </div>
  );
};

export default Mision;
