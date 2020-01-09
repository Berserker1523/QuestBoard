import React from "react";
import "./TableroMisiones.css";
import Mision from "./Mision.js";

const TableroMisiones = props => {
  const renderMisiones = () => {
    return props.quests.map((quest, i) =>
      quest.completed === false && quest.owner !== props.user._id ? (
        <div className="col-md-4" key={i}>
          <Mision info={quest} user={props.user} />
        </div>
      ) : null
    );
  };

  return (
    <div>
      {props.questsError !== "" ? (
        <p className="error">{props.questsError}</p>
      ) : (
        ""
      )}
      <div className="TableroMisiones">
        <div className="container-fluid misiones">
          {props.user && props.user.ownGames.length >= 1 ? (
            <div className="row">{renderMisiones()}</div>
          ) : (
            <div className="row">
              <h1 className="error">
                Agrega un juego para poder ver sus misiones!
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TableroMisiones;
