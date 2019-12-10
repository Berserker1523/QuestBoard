import React from "react";
import "./Mision.css";

const Mision = props => {
  const deleteQuest = () => {
    fetch("/quests/" + props.info._id, {
      method: "DELETE"
    });
  };
  let add = false;
  const updateQuest = () => {
    if (add) {
      props.info.players.push(props.currentUser._id);
    } else {
      props.info.players.splice(
        props.info.players.findIndex(id => id === props.currentUser._id),
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

  const updateChat = () => {
    const users=props.info.players;
    users.push(props.info.owner);
    if(props.info.players.length+1===props.info.maxPlayers) {
      console.log("chat creation");
      fetch("/chats", {
      method: "POST", // or 'PUT'
      body: JSON.stringify({
        name: props.info.name,
        quest: props.info._id,
        users: users,
        messages: [],
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .catch(error => console.error("Error:", error))
      .then(response => console.log("Success:", response));
    }

    if (!add) {
      
    }
  };

  const setButtons = () => {
    if (props.currentUser && props.info.owner === props.currentUser._id) {
      return (
        <button className="btn-eliminar" onClick={deleteQuest}>
          Eliminar
        </button>
      );
    } else if (
      props.currentUser &&
      props.info.players.findIndex(id => id === props.currentUser._id) >= 0
    ) {
      add = false;
      return (
        <button className="btn-rechazar" onClick={updateQuest}>
          Rechazar
        </button>
      );
    } else {
      add = true;
      return (
        <button className="btn-unirse" onClick={updateQuest}>
          Unirse
        </button>
      );
    }
  };

  return (
    <div className="Mision">
      <div className="container-fluid mision">
        <div className="row nombre">{props.info.name}</div>
        <div className="row descripcion">
          <p>{props.info.description}</p>
        </div>
        <div className="row jugadores">
          {props.info.players.length + 1} / {props.info.maxPlayers} jugadores
        </div>
        <div className="row botones">{setButtons()}</div>
      </div>
    </div>
  );
};

export default Mision;
