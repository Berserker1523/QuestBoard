import React from "react";
import "./Mision.css";
import { useState } from "react";

const Juego = props => {
  const [showInput, setShowInput] = useState(false);
  const [summonerName, setSummonerName] = useState("");

  const setButtons = () => {
    if (
      props.currentUser &&
      props.currentUser.ownGames.findIndex(game => game === props.info._id) >= 0
    ) {
      return null;
    } else {
      return (
        <button className="btn-unirse" onClick={() => setShowInput(!showInput)}>
          Unirse al juego
        </button>
      );
    }
  };

  const handleSummonerInput = event => {
    setSummonerName(event.target.value);
  };

  const joinPlayer = () => {
    props.currentUser.ownGames.push(props.info._id);
    fetch("/users/" + props.currentUser._id, {
      method: "PUT",
      body: JSON.stringify({
        name: props.currentUser.name,
        mail: props.currentUser.mail,
        password: props.currentUser.password,
        age: props.currentUser.age,
        avatar: props.currentUser.avatar,
        country: props.currentUser.country,
        ownQuests: props.currentUser.ownQuests,
        activeQuests: props.currentUser.activeQuests,
        completedQuests: props.currentUser.completedQuests,
        ownGames: props.currentUser.ownGames
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(() => {
      fetch(
        `/user_game/lol/user/${props.currentUser}/summoner/${summonerName}`,
        {
          method: "POST"
        }
      ).then(() => {
        fetch("/users/" + props.currentUser.mail)
          .then(res => res.json())
          .then(response => {
            props.setUser(response);
          });
      });
    });
  };

  const onKeyPress = e => {
    if (e.key === "Enter") {
      joinPlayer();
    }
  };

  return (
    <div className="Mision">
      <div className="container-fluid mision">
        <div className="row nombre">{props.info.name}</div>
        <div className="row descripcion">
          <p>{props.info.description}</p>
        </div>
        {showInput ? (
          <label htmlFor="">
            Ingrese su summoner name
            <br />
            <input
              type="text"
              name="name"
              value={summonerName}
              onChange={handleSummonerInput}
              size="35"
              onKeyPress={onKeyPress}
            />
          </label>
        ) : (
          <div className="row botones">{setButtons()}</div>
        )}
      </div>
    </div>
  );
};

export default Juego;
