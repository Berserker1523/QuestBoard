import React from "react";
import "./Mision.css";
import { Link } from "react-router-dom";
//import Popup from "reactjs-popup";
import { putAPI, deleteAPI } from "./API/BasicAPI";

const Mision = props => {
  const deleteQuest = () => {
    deleteAPI("/quests/" + props.info._id).catch(err =>
      console.error("No fue posible eliminar la misión: \n" + err)
    );
  };

  const putQuest = err_msg => {
    putAPI("/quests/" + props.info._id, {
      name: props.info.name,
      description: props.info.description,
      startDate: props.info.startDate,
      finishDate: props.info.finishDate,
      minPlayers: props.info.minPlayers,
      maxPlayers: props.info.maxPlayers,
      completed: props.info.completed,
      owner: props.info.owner,
      players: props.info.players,
      game: props.info.game
    }).catch(err => console.error(err_msg + err));
  };

  const addPlayer = () => {
    props.info.players.push({
      _id: props.user._id,
      name: props.user.name
    });

    putQuest("No fue posible agregar el jugador a la misión: \n");
  };

  const removePlayer = () => {
    props.info.players.splice(
      props.info.players.findIndex(player => player._id === props.user._id),
      1
    );

    putQuest("No fue posible eliminar al jugador de la misión: \n");
  };

  /*var chatId = "";
  const updateChat = () => {
    const users = [];

    props.info.players.forEach(player => {
      users.push({ user_id: player, user_name: "default" });
    });

    users.push({ user_id: props.info.owner, user_name: "default" });

    if (props.info.players.length + 1 === props.info.maxPlayers) {
      console.log("chat creation");
      fetch("/chats", {
        method: "POST", // or 'PUT'
        body: JSON.stringify({
          name: props.info.name,
          quest: props.info._id,
          users: users,
          messages: []
        }),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .catch(error => console.error("Error:", error))
        .then(response => {
          console.log("Success:", response);
          chatId = "something";
        });
    }

    if (chatId !== "" && !add) {
    }
  };*/

  const setPlayersColor = () => {
    const currentPlayers = props.info.players.length;
    if (currentPlayers < props.info.minPlayers) {
      return { color: "yellow" };
    } else if (
      currentPlayers >= props.info.minPlayers &&
      currentPlayers < props.info.maxPlayers
    ) {
      return { color: "green" };
    } else {
      return { color: "red" };
    }
  };

  const setButtons = () => {
    const btn_read_more = (
      <button
        type="button"
        data-toggle="modal"
        data-target={"#modal" + props.info.name.replace(/ /g, "")}
        className="btn-mas-info"
      >
        Leer más
      </button>
    );

    const btn_join = (
      <button className="btn-unirse" onClick={addPlayer}>
        Unirse
      </button>
    );

    const btn_delete = (
      <button className="btn-eliminar" onClick={deleteQuest}>
        Eliminar
      </button>
    );

    const btn_discard = (
      <button className="btn-rechazar" onClick={removePlayer}>
        Rechazar
      </button>
    );

    if (props.user) {
      if (props.info.owner._id === props.user._id) {
        return (
          <div className="row botones">
            <div className="col col-btn">{btn_read_more}</div>
            <div className="col col-btn">{btn_delete}</div>
          </div>
        );
      } else if (
        props.info.players.findIndex(player => player._id === props.user._id) >=
        0
      ) {
        return (
          <div className="row botones">
            <div className="col col-btn">{btn_read_more}</div>
            <div className="col col-btn">{btn_discard}</div>
          </div>
        );
      } else if (props.info.players.length <= props.info.maxPlayers) {
        return (
          <div className="row botones">
            <div className="col col-btn">{btn_read_more}</div>
            <div className="col col-btn">{btn_join}</div>
          </div>
        );
      }
    } else {
      return <div className="row botones">{btn_read_more}</div>;
    }
  };

  const setButtonsModal = () => {
    let botones;

    const btn_close = (
      <button
        type="button"
        className="btn btn-secondary miptobtn"
        data-dismiss="modal"
      >
        Close
      </button>
    );

    const btn_join = (
      <button className="btn-unirse" onClick={addPlayer}>
        Unirse
      </button>
    );

    const btn_delete = (
      <button
        className="btn-eliminar"
        data-dismiss="modal"
        onClick={deleteQuest}
      >
        Eliminar
      </button>
    );

    const btn_discard = (
      <button
        className="btn-rechazar"
        data-dismiss="modal"
        onClick={removePlayer}
      >
        Rechazar
      </button>
    );

    if (props.user) {
      if (props.info.owner._id === props.user._id) {
        botones = btn_delete;
      } else if (
        props.info.players.findIndex(player => player._id === props.user._id) >=
        0
      ) {
        botones = btn_discard;
      } else if (props.info.players.length <= props.info.maxPlayers) {
        botones = btn_join;
      }
    }

    return (
      <div>
        <div className="row">{botones}</div>
        <div className="row">
          <div className="col-10"></div>
          <div className="col modal-btn-close">{btn_close}</div>
        </div>
      </div>
    );
  };

  const renderPlayers = () => {
    return props.info.players.map((player, i) => {
      return (
        <div className="col" key={i}>
          <p>{player.name}</p>
        </div>
      );
    });
  };

  return (
    <div className="Mision">
      <div className="container-fluid mision">
        <div className="nombre row">
          <div className="col-md-10">{props.info.name}</div>
          {props.user && props.info.players.length === props.info.maxPlayers ? (
            props.info.players.findIndex(id => id === props.user._id) >= 0 ? (
              <div className="col-md-2">
                <Link to="chats">
                  <img
                    src="../chat.png"
                    alt="Chat logo"
                    className="quest-info-logo"
                  />
                </Link>
              </div>
            ) : (
              ""
            )
          ) : (
            ""
          )}
          <div className="col-2">
            <img
              className="platform-logo"
              src={props.info.game.platform}
              alt="platform logo"
            ></img>
          </div>
        </div>
        <div className="row">
          <div className="col finish">
            <p>Vence el: {props.info.finishDate}</p>
          </div>
        </div>
        <div className="row game">
          <div className="col-2">
            <img className="game-logo" src="../lol_logo.png" alt="game logo" />
          </div>
          <div className="game-col col">
            <p className="game-name">League of Legends</p>
          </div>
        </div>
        <div className="row jugadores">
          <div className="col">
            <p>
              <span id="current-players" style={setPlayersColor()}>
                {props.info.players.length}
              </span>{" "}
              / {props.info.maxPlayers} Jugadores
            </p>
          </div>
        </div>
        {setButtons()}
        {/* ----------------- MODAL ------------------------------*/}
        <div
          className="modal fade"
          id={"modal" + props.info.name.replace(/ /g, "")}
          tabIndex="-1"
          role="dialog"
          aria-labelledby={
            "ModalScrollable" + props.info.name.replace(/ /g, "")
          }
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-scrollable" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col">
                      <h5
                        className="modal-title"
                        id={
                          "ModalScrollable" + props.info.name.replace(/ /g, "")
                        }
                      >
                        {props.info.name}
                      </h5>
                    </div>
                    <div className="col-2">
                      <img
                        className="platform-logo-modal"
                        src={props.info.game.platform}
                        alt="platform logo"
                      ></img>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p className="modal-description">{props.info.description}</p>
                <div className="container-fluid">
                  <div className="row game row-modal-body">
                    <div className="col-2">
                      <img
                        className="game-logo"
                        src="../lol_logo.png"
                        alt="game logo"
                      />
                    </div>
                    <div className="game-col col">
                      <p className="game-name-modal">League of Legends</p>
                    </div>
                  </div>
                  <div className="row jugadores-modal">
                    <div className="col">
                      <p>
                        <span id="current-players" style={setPlayersColor()}>
                          {props.info.players.length}
                        </span>{" "}
                        / {props.info.maxPlayers} Jugadores
                      </p>
                    </div>
                  </div>
                  <div className="row disp-jugadores-modal">
                    {renderPlayers()}
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <div className="container-fluid">
                  <div className="row">
                    <p className="finish-modal">
                      Falta: {props.info.finishDate}
                    </p>
                  </div>
                  {setButtonsModal()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mision;
