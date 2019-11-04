import React from "react";
import "./Mision.css";

const Mision = props => {
  const deleteQuest = () => {
    fetch("/quests/" + props.info._id, {
      method: "DELETE"
    });
  };

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

        {props.currentUser && props.info.owner === props.currentUser._id ? (
          <div className="row botones">
            <button className="btn-eliminar" onClick={deleteQuest}>
              Eliminar
            </button>
          </div>
        ) : (
          <div className="row botones">
            <button className="btn-rechazar">Rechazar</button>
            <button className="btn-unirse">Unirse</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Mision;
