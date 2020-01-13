import React, { useEffect } from "react";
import Chat from "./Chat.js";
import "./Mision.css";
import { putAPI, deleteAPI } from "./API/BasicAPI";

const Mision = props => {
  let dateElement = React.createRef();
  let dateElementModal = React.createRef();

  useEffect(() => {
    const calculateTimeLeft = setInterval(() => {
      // Get today's date and time
      let now = new Date().getTime();
      // Find the distance between now and the count down date
      const questDate = new Date(props.info.finishDate);
      let distance = questDate.getTime() - now;
      if (distance < 0 || props.info.completed === true) {
        if (dateElement.current) {
          clearInterval(calculateTimeLeft);
          dateElement.current.innerHTML = "Terminada";
          dateElementModal.current.innerHTML = "Terminada";
          setCompleted();
        }
      } else {
        // Time calculations for days, hours, minutes and seconds
        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        let timeLeft = days > 0 ? days + "d " : "";
        timeLeft = hours > 0 || days > 0 ? timeLeft + hours + "h " : timeLeft;
        timeLeft =
          minutes > 0 || hours > 0 || days > 0
            ? timeLeft + minutes + "m "
            : timeLeft;
        timeLeft =
          seconds > 0 || minutes > 0 || hours > 0 || days > 0
            ? timeLeft + seconds + "s "
            : timeLeft;
        if (dateElement.current) {
          dateElement.current.innerHTML = "Vence en: " + timeLeft;
          dateElementModal.current.innerHTML = "Vence en: " + timeLeft;
        }
      }
    }, 1000);
  }, [dateElement, dateElementModal, props.info.completed]);

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

  const setCompleted = () => {
    if (!props.info.completed) {
      props.info.completed = true;
      putQuest("No fue posible marcar la misión como completada: \n");
    }
  };

  const addPlayer = () => {
    props.info.players.push({
      _id: props.user._id,
      name: props.user.name
    });

    putQuest("No fue posible agregar el jugador a la misión: \n");

    console.log(props.info.players.length);
    console.log(props.info.maxPlayers);

    console.log(props.info.players.length === props.info.maxPlayers);
    /* eslint-disable */
    if (props.info.players.length == props.info.maxPlayers) {
      setCompleted();
    }
    /* eslint-enable */
  };

  const removePlayer = () => {
    props.info.players.splice(
      props.info.players.findIndex(player => player._id === props.user._id),
      1
    );

    putQuest("No fue posible eliminar al jugador de la misión: \n");
  };

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

    if (props.user && props.info.completed === false) {
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
        Cerrar
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

    if (props.user && props.info.completed === false) {
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

  const questNameWithoutSpaces = props.info.name.replace(/ /g, "");

  const setChat = () => {
    if (
      props.user &&
      props.info.players.findIndex(player => player._id === props.user._id) >=
        0 &&
      props.chat
    ) {
      return <Chat chat={props.chat} user={props.user} quest={props.info} />;
    } else {
      return "";
    }
  };

  return (
    <div className="Mision">
      <div className="container-fluid mision">
        <div className="nombre row">
          <div className="col-md-10">{props.info.name}</div>
          <div className="col-2">
            <img
              className="platform-logo"
              src={props.info.game.platform}
              alt="platform logo"
            ></img>
          </div>
        </div>
        <div className="row mision-row-2">
          <div className="col finish">
            <p ref={dateElement}>
              Vence el: {new Date(props.info.finishDate).toString()}
            </p>
          </div>
        </div>
        {props.user &&
        props.info.completed === false &&
        props.info.owner._id === props.user._id &&
        props.info.minPlayers <= props.info.players.length ? (
          <div className="row terminar">
            <div className="col">
              <button className="btn-terminar" onClick={setCompleted}>
                Terminar
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="row game">
          <div className="col-2">
            <img className="game-logo" src="../lol_logo.png" alt="game logo" />
          </div>
          <div className="game-col col">
            <p className="game-name">{props.info.game.name}</p>
          </div>
        </div>
        <div className="row">
          {setChat()}
          <div className="col col-jugadores">
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
          id={"modal" + questNameWithoutSpaces}
          tabIndex="-1"
          role="dialog"
          aria-labelledby={"ModalScrollable" + questNameWithoutSpaces}
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
                        id={"ModalScrollable" + questNameWithoutSpaces}
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
                <div className="container-fluid">
                  <div className="row modal-description">
                    <div className="col">
                      <p>{props.info.description}</p>
                    </div>
                  </div>
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
                    <p className="finish-modal" ref={dateElementModal}>
                      Vence el: {new Date(props.info.finishDate).toString()}
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
