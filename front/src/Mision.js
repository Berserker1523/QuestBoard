import React from "react";
import "./Mision.css";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";

const Mision = props => {
  const deleteQuest = () => {
    fetch("/quests/" + props.info._id, {
      method: "DELETE"
    });
  };
  let add = false;
  const updateQuest = () => {
    if (add) {
      props.info.players.push(props.user._id);
    } else {
      props.info.players.splice(
        props.info.players.findIndex(id => id === props.user._id),
        1
      );
    }
    fetch("/quests/" + props.info._id, {
      method: "PUT",
      body: JSON.stringify({
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
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });

    updateChat();
  };
  var chatId = "";
  const updateChat = () => {
    const users = [];

    props.info.players.map(player => {
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
  };

  const setPlayersColor = () => {
    const currentPlayers = props.info.players.length + 1;
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
    if (props.user) {
      if (props.info.owner === props.user._id) {
        return (
          <div className="row botones">
            <div className="col col-btn">
              <button
                type="button"
                data-toggle="modal"
                data-target={"#modal" + props.info.name.replace(/ /g, "")}
                className="btn-mas-info"
              >
                Leer más
              </button>
            </div>
            <div className="col col-btn">
              <button className="btn-eliminar" onClick={deleteQuest}>
                Eliminar
              </button>
            </div>
          </div>
        );
      } else if (
        props.info.players.findIndex(id => id === props.user._id) >= 0
      ) {
        add = false;
        return (
          <div className="row botones">
            <div className="col col-btn">
              <button
                type="button"
                data-toggle="modal"
                data-target={"#modal" + props.info.name.replace(/ /g, "")}
                className="btn-mas-info"
              >
                Leer más
              </button>
            </div>
            <div className="col col-btn">
              <button className="btn-rechazar" onClick={updateQuest}>
                Rechazar
              </button>
            </div>
          </div>
        );
      } else if (props.info.players.length + 1 !== props.info.maxPlayers) {
        add = true;
        return (
          <div className="row botones">
            <div className="col col-btn">
              <button
                type="button"
                data-toggle="modal"
                data-target={"#modal" + props.info.name.replace(/ /g, "")}
                className="btn-mas-info"
              >
                Leer más
              </button>
            </div>
            <div className="col col-btn">
              <button className="btn-unirse" onClick={updateQuest}>
                Unirse
              </button>
            </div>
          </div>
        );
      }
    } else {
      return (
        <div className="row botones">
          <button
            type="button"
            data-toggle="modal"
            data-target={"#modal" + props.info.name.replace(/ /g, "")}
            className="btn-mas-info"
          >
            Leer más
          </button>
        </div>
      );
    }
  };

  const setButtonsModal = () => {
    let botones;
    if (props.user) {
      if (props.info.owner === props.user._id) {
        botones = (
          <button className="btn-eliminar" onClick={deleteQuest}>
            Eliminar
          </button>
        );
      } else if (
        props.info.players.findIndex(id => id === props.user._id) >= 0
      ) {
        add = false;
        botones = (
          <button className="btn-rechazar" onClick={updateQuest}>
            Rechazar
          </button>
        );
      } else if (props.info.players.length + 1 !== props.info.maxPlayers) {
        add = true;
        botones = (
          <button className="btn-unirse" onClick={updateQuest}>
            Unirse
          </button>
        );
      }
    }

    return (
      <div className="row">
        {botones}
        <button
          type="button"
          className="btn btn-secondary miptobtn"
          data-dismiss="modal"
        >
          Close
        </button>
      </div>
    );
  };

  const renderPlayers = () => {
    return props.info.players.map((player, i) => {
      return (
        <div className="col">
          <p>{player}</p>
        </div>
      );
    });
  };

  return (
    <div className="Mision">
      <div className="container-fluid mision">
        <div className="nombre row">
          <div className="col-md-10">{props.info.name}</div>
          {props.user &&
          props.info.players.length + 1 === props.info.maxPlayers ? (
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
                {props.info.players.length + 1}
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
          tabindex="-1"
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
                          {props.info.players.length + 1}
                        </span>{" "}
                        / {props.info.maxPlayers} Jugadores
                      </p>
                    </div>
                  </div>
                  <div className="row disp-jugadores-modal">
                    <div className="col">
                      <p>{props.info.owner}</p>
                    </div>
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
