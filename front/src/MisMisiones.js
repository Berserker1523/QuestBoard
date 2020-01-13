import React from "react";
import "./TableroMisiones.css";
import Mision from "./Mision.js";
import "./MisMisiones.css";
import { Link } from "react-router-dom";

const MisMisiones = props => {
  const renderMisiones = () => {
    const completedQuests = props.quests.filter(
      mision => mision.completed === true
    );
    const notCompletedQuests = props.quests.filter(
      mision => mision.completed === false
    );
    const quests = [];

    notCompletedQuests.forEach((mision, i) => {
      if (
        mision.owner._id === props.user._id ||
        mision.players.findIndex(player => player._id === props.user._id) >= 0
      ) {
        const questChatIndex = props.chats.findIndex(
          chat => chat.quest_id === mision._id
        );
        const questChat = questChatIndex >= 0 ? props.chats[questChatIndex] : 0;
        quests.push(
          <div className="col-md-4" key={i}>
            <Mision info={mision} user={props.user} chat={questChat} />
          </div>
        );
      }
    });

    completedQuests.forEach((mision, i) => {
      if (
        mision.owner._id === props.user._id ||
        mision.players.findIndex(player => player._id === props.user._id) >= 0
      ) {
        const questChatIndex = props.chats.findIndex(
          chat => chat.quest_id === mision._id
        );
        const questChat = questChatIndex >= 0 ? props.chats[questChatIndex] : 0;
        quests.push(
          <div className="col-md-4" key={i + notCompletedQuests.length}>
            <Mision info={mision} user={props.user} chat={questChat} />
          </div>
        );
      }
    });

    return quests;
  };

  return (
    <div className="MisMisiones">
      <div className="container-fluid misiones">
        {props.user && props.user.ownGames.length >= 1 ? (
          <div>
            <div className="row">
              <div className="col">
                <div className="agregar-mision">
                  <Link to="crear-mision">
                    <button className="btn-crear-mision">Crear misión</button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="row">{renderMisiones()}</div>
          </div>
        ) : (
          <div className="row">
            <div className="col">
              <h2 className="error">
                Agrega un juego para poder ver sus misiones!
              </h2>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MisMisiones;
